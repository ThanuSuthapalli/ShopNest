'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Package, ShoppingBag } from 'lucide-react'
import type { CartItem } from '@/lib/api'

interface OrderData {
  orderId: string
  total: string
  items: CartItem[]
}

export default function OrderSuccessPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null)

  useEffect(() => {
    // Retrieve order data from session storage
    const orderId = sessionStorage.getItem('lastOrderId')
    const total = sessionStorage.getItem('lastOrderTotal')
    const itemsJson = sessionStorage.getItem('lastOrderItems')

    if (orderId && total) {
      let items: CartItem[] = []
      try {
        items = itemsJson ? JSON.parse(itemsJson) : []
      } catch {
        items = []
      }
      
      setOrderData({ orderId, total, items })
      
      // Clear session storage
      sessionStorage.removeItem('lastOrderId')
      sessionStorage.removeItem('lastOrderTotal')
      sessionStorage.removeItem('lastOrderItems')
    }
  }, [])

  // No order data (direct navigation)
  if (!orderData) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="rounded-full bg-muted p-6">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="mt-6 text-xl font-semibold text-foreground">
            No Recent Order
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            You haven&apos;t placed any orders recently.
          </p>
          <Link href="/products" className="mt-6">
            <Button>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Success Header */}
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-green-100 p-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          Order Successful!
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Thank you for your purchase
        </p>
      </div>

      {/* Order Details Card */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Order Details</span>
            <span className="text-sm font-normal text-muted-foreground">
              {orderData.orderId}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Items */}
          <div className="space-y-4">
            {orderData.items.map(item => (
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
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <hr />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total Paid</span>
            <span className="text-lg font-semibold">₹{parseFloat(orderData.total).toLocaleString('en-IN')}</span>
          </div>

          {/* Info Box */}
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-center text-sm text-muted-foreground">
              A confirmation email has been sent to your email address.
            
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/products">
          <Button size="lg" className="w-full sm:w-auto">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}
