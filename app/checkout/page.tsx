'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useStore } from '@/contexts/store-context'
import { createOrder } from '@/lib/firestore-service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, Loader2, Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, getCartTotal, clearCart, isLoading, firebaseUser } = useStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const subtotal = getCartTotal()
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal + shipping

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    try {
      let orderId: string

      // Create order in Firestore if user is authenticated
      if (firebaseUser) {
        orderId = await createOrder(firebaseUser.uid, {
          items: cart,
          total: total,
          shippingAddress: {
            name: 'Demo User',
            address: '123 Demo Street',
            city: 'Demo City',
            postalCode: '12345',
            country: 'United States',
          },
          paymentMethod: 'demo',
        })
      } else {
        // Generate local order ID for guest checkout
        orderId = 'ORD-' + Date.now().toString(36).toUpperCase()
      }

      // Store order ID for success page
      sessionStorage.setItem('lastOrderId', orderId)
      sessionStorage.setItem('lastOrderTotal', total.toFixed(2))
      sessionStorage.setItem('lastOrderItems', JSON.stringify(cart))

      // Show confirmation modal
      setShowConfirmation(true)

      // Clear cart and redirect after delay
      setTimeout(() => {
        clearCart()
        router.push('/order-success')
      }, 1500)
    } catch (error) {
      console.error('Error creating order:', error)
      // Still proceed with local order on error
      const orderId = 'ORD-' + Date.now().toString(36).toUpperCase()
      sessionStorage.setItem('lastOrderId', orderId)
      sessionStorage.setItem('lastOrderTotal', total.toFixed(2))
      sessionStorage.setItem('lastOrderItems', JSON.stringify(cart))

      setShowConfirmation(true)
      setTimeout(() => {
        clearCart()
        router.push('/order-success')
      }, 1500)
    }
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Empty Cart State
  if (cart.length === 0 && !showConfirmation) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="rounded-full bg-muted p-6">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="mt-6 text-xl font-semibold text-foreground">
            Your cart is empty
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Add some items to your cart before checking out.
          </p>
          <Link href="/products" className="mt-6">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-md animate-in fade-in zoom-in">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-foreground">
                  Order Confirmed!
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Your order has been placed successfully. Redirecting...
                </p>
                <div className="mt-4">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Back Button */}
      <Link href="/cart">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Checkout
      </h1>
      <p className="mt-2 text-muted-foreground">
        Review your order and complete your purchase
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <h4 className="text-sm font-medium text-foreground">
                    {item.product.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity} × ₹{item.product.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}
              </span>
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-center text-sm text-muted-foreground">
                {firebaseUser
                  ? 'Your order will be saved to your account.'
                  : 'Sign in to save your order history.'}
              </p>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Order...
                </>
              ) : (
                'Place Order'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
