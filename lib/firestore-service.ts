// Firestore Database Service
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Product, CartItem, Order } from './api'

// ==================== PRODUCTS ====================

const productsCollection = collection(db, 'products')

export async function getAllProducts(): Promise<Product[]> {
    const snapshot = await getDocs(productsCollection)
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
    const docRef = doc(db, 'products', id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
        return null
    }

    return {
        id: snapshot.id,
        ...snapshot.data(),
    } as Product
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<string> {
    const docRef = await addDoc(productsCollection, product)
    return docRef.id
}

// ==================== USER CARTS ====================

export async function getUserCart(userId: string): Promise<CartItem[]> {
    const docRef = doc(db, 'carts', userId)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
        return []
    }

    return snapshot.data().items as CartItem[]
}

export async function updateUserCart(userId: string, items: CartItem[]): Promise<void> {
    const docRef = doc(db, 'carts', userId)
    await setDoc(docRef, { items, updatedAt: Timestamp.now() }, { merge: true })
}

export async function clearUserCart(userId: string): Promise<void> {
    const docRef = doc(db, 'carts', userId)
    await setDoc(docRef, { items: [], updatedAt: Timestamp.now() })
}

// ==================== ORDERS ====================

export interface OrderData {
    items: CartItem[]
    total: number
    shippingAddress?: {
        name: string
        address: string
        city: string
        postalCode: string
        country: string
    }
    paymentMethod?: string
}

export async function createOrder(userId: string, orderData: OrderData): Promise<string> {
    const ordersCollection = collection(db, 'orders')
    const docRef = await addDoc(ordersCollection, {
        userId,
        ...orderData,
        status: 'pending',
        createdAt: Timestamp.now(),
    })
    return docRef.id
}

export async function getUserOrders(userId: string): Promise<Order[]> {
    const ordersCollection = collection(db, 'orders')
    const q = query(
        ordersCollection,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    })) as Order[]
}

export async function getOrderById(orderId: string): Promise<Order | null> {
    const docRef = doc(db, 'orders', orderId)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
        return null
    }

    return {
        id: snapshot.id,
        ...snapshot.data(),
        createdAt: snapshot.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    } as Order
}

// ==================== USER PROFILES ====================

export interface UserProfile {
    email: string
    name?: string
    createdAt: Timestamp
}

export async function createUserProfile(userId: string, email: string, name?: string): Promise<void> {
    const docRef = doc(db, 'users', userId)
    await setDoc(docRef, {
        email,
        name: name || email.split('@')[0],
        createdAt: Timestamp.now(),
    })
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const docRef = doc(db, 'users', userId)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
        return null
    }

    return snapshot.data() as UserProfile
}
