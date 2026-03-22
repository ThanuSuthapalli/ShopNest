import { Suspense } from 'react'
import { ProductCardSkeleton } from '@/components/product/product-card'
import { ProductsContent } from './products-content'

function LoadingFallback() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Our Products
        </h1>
        <p className="mt-2 text-muted-foreground">
          Discover our curated collection of quality products
        </p>
      </div>

      {/* Products Content with Suspense boundary */}
      <Suspense fallback={<LoadingFallback />}>
        <ProductsContent />
      </Suspense>
    </div>
  )
}
