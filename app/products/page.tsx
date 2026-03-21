'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard, ProductCardSkeleton } from '@/components/product/product-card'
import { getAllProducts as getFirestoreProducts } from '@/lib/firestore-service'
import { getAllProducts as getMockProducts } from '@/lib/mock-data'
import type { Product } from '@/lib/api'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  const selectedCategory = useMemo(() => {
    const category = searchParams.get('category')
    return !category || category === 'All' ? null : category
  }, [searchParams])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Try to fetch from Firestore first
      let data = await getFirestoreProducts()

      // Fall back to mock data if Firestore is empty
      if (data.length === 0) {
        data = getMockProducts()
      }

      if (selectedCategory) {
        data = data.filter((product) => product.category === selectedCategory)
      }

      setProducts(data)
    } catch (err) {
      console.error('Error fetching products:', err)
      // Fall back to mock data on error
      try {
        const mockData = getMockProducts()
        setProducts(mockData)
      } catch {
        setError('Failed to load products. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [searchParams])

  const handleRetry = () => {
    fetchProducts()
  }

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

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">
            Something went wrong
          </h2>
          <p className="mt-2 text-center text-muted-foreground">{error}</p>
          <Button onClick={handleRetry} className="mt-4">
            Try Again
          </Button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  )
}
