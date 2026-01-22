'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import type { Product, CartItem, User } from '@/lib/api'
import { onAuthChange, signOut as firebaseSignOut, FirebaseUser } from '@/lib/auth-service'
import { getUserCart, updateUserCart, clearUserCart as clearFirestoreCart } from '@/lib/firestore-service'

// State types
interface StoreState {
  user: User | null
  firebaseUser: FirebaseUser | null
  isAuthenticated: boolean
  cart: CartItem[]
  cartCount: number
  isLoading: boolean
}

// Action types
type StoreAction =
  | { type: 'SET_USER'; payload: { user: User | null; firebaseUser: FirebaseUser | null } }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'UPDATE_CART_ITEM'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGOUT' }

// Initial state
const initialState: StoreState = {
  user: null,
  firebaseUser: null,
  isAuthenticated: false,
  cart: [],
  cartCount: 0,
  isLoading: true,
}

// Reducer
function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        firebaseUser: action.payload.firebaseUser,
        isAuthenticated: !!action.payload.user,
      }
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload,
        cartCount: action.payload.reduce((sum, item) => sum + item.quantity, 0),
      }
    case 'ADD_TO_CART': {
      const existingItemIndex = state.cart.findIndex(
        item => item.productId === action.payload.product.id
      )

      let newCart: CartItem[]
      if (existingItemIndex > -1) {
        newCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}`,
          productId: action.payload.product.id,
          product: action.payload.product,
          quantity: action.payload.quantity,
        }
        newCart = [...state.cart, newItem]
      }

      return {
        ...state,
        cart: newCart,
        cartCount: newCart.reduce((sum, item) => sum + item.quantity, 0),
      }
    }
    case 'UPDATE_CART_ITEM': {
      const newCart = state.cart.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0)

      return {
        ...state,
        cart: newCart,
        cartCount: newCart.reduce((sum, item) => sum + item.quantity, 0),
      }
    }
    case 'REMOVE_FROM_CART': {
      const newCart = state.cart.filter(item => item.productId !== action.payload)
      return {
        ...state,
        cart: newCart,
        cartCount: newCart.reduce((sum, item) => sum + item.quantity, 0),
      }
    }
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        cartCount: 0,
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        firebaseUser: null,
        isAuthenticated: false,
        cart: [],
        cartCount: 0,
      }
    default:
      return state
  }
}

// Context
interface StoreContextType extends StoreState {
  login: (user: User, firebaseUser: FirebaseUser) => void
  logout: () => Promise<void>
  addToCart: (product: Product, quantity?: number) => void
  updateCartItem: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  getCartTotal: () => number
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

// Provider
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState)

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
        }
        dispatch({ type: 'SET_USER', payload: { user, firebaseUser } })

        // Load cart from Firestore for authenticated users
        try {
          const firestoreCart = await getUserCart(firebaseUser.uid)
          if (firestoreCart.length > 0) {
            dispatch({ type: 'SET_CART', payload: firestoreCart })
          } else {
            // If Firestore cart is empty, check localStorage for guest cart
            const savedCart = localStorage.getItem('cart')
            if (savedCart) {
              const localCart = JSON.parse(savedCart)
              dispatch({ type: 'SET_CART', payload: localCart })
              // Sync guest cart to Firestore
              await updateUserCart(firebaseUser.uid, localCart)
              localStorage.removeItem('cart')
            }
          }
        } catch (error) {
          console.error('Error loading cart:', error)
        }
      } else {
        dispatch({ type: 'SET_USER', payload: { user: null, firebaseUser: null } })
        // Load cart from localStorage for guest users
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          try {
            const cart = JSON.parse(savedCart)
            dispatch({ type: 'SET_CART', payload: cart })
          } catch {
            localStorage.removeItem('cart')
          }
        }
      }
      dispatch({ type: 'SET_LOADING', payload: false })
    })

    return () => unsubscribe()
  }, [])

  // Persist cart changes
  useEffect(() => {
    if (!state.isLoading) {
      if (state.isAuthenticated && state.firebaseUser) {
        // Sync cart to Firestore for authenticated users
        updateUserCart(state.firebaseUser.uid, state.cart).catch(console.error)
      } else {
        // Use localStorage for guest users
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    }
  }, [state.cart, state.isLoading, state.isAuthenticated, state.firebaseUser])

  const login = useCallback((user: User, firebaseUser: FirebaseUser) => {
    dispatch({ type: 'SET_USER', payload: { user, firebaseUser } })
  }, [])

  const logout = useCallback(async () => {
    try {
      await firebaseSignOut()
      localStorage.removeItem('cart')
      dispatch({ type: 'LOGOUT' })
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }, [])

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } })
  }, [])

  const updateCartItem = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_ITEM', payload: { productId, quantity } })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }, [])

  const clearCart = useCallback(async () => {
    dispatch({ type: 'CLEAR_CART' })
    if (state.firebaseUser) {
      await clearFirestoreCart(state.firebaseUser.uid).catch(console.error)
    }
  }, [state.firebaseUser])

  const getCartTotal = useCallback(() => {
    return state.cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  }, [state.cart])

  return (
    <StoreContext.Provider
      value={{
        ...state,
        login,
        logout,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

// Hook
export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
