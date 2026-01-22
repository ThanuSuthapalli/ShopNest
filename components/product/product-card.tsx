'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="line-clamp-1 font-medium text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 text-lg font-semibold text-foreground">
          ${product.price.toFixed(2)}
        </p>
        <Link href={`/products/${product.id}`} className="mt-3 block">
          <Button variant="outline" className="w-full bg-transparent">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

// Skeleton for loading state
export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square animate-pulse bg-muted" />
      <CardContent className="p-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-6 w-1/3 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-9 w-full animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  )
}
