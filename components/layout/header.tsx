'use client'

import Link from 'next/link'
import { useStore } from '@/contexts/store-context'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu, X, Store } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { isAuthenticated, cartCount, logout } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const categories = [
    'All',
    'Electronics',
    'Clothing',
    'Accessories',
    'Home & Kitchen',
    'Sports & Outdoors',
    'Beauty & Personal Care',
    'Footwear',
    'Toys & Games',
    'Books',
    'Food & Beverages',
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/products" className="flex items-center gap-2">
          <Store className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight text-foreground">
            ShopNest
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="relative hidden items-center gap-6 md:flex">
          <Link
            href="/products"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen(!filterOpen)}
              className="rounded-md border border-muted p-1 px-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground"
            >
              Filter
            </button>
            {filterOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 w-52 rounded-md border bg-base-100 p-2 shadow-lg">
                {categories.map(category => (
                  <Link
                    key={category}
                    href={category === 'All' ? '/products' : `/products?category=${encodeURIComponent(category)}`}
                    onClick={() => setFilterOpen(false)}
                    className="block rounded px-2 py-1 text-sm text-foreground hover:bg-muted"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/cart"
            className="relative flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <Link href="/cart" className="relative p-2">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-card md:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4">
            <Link
              href="/products"
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <div className="border-t pt-2">
              {categories.map(category => (
                <Link
                  key={category}
                  href={category === 'All' ? '/products' : `/products?category=${encodeURIComponent(category)}`}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
            <Link
              href="/cart"
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
            <hr className="my-2" />
            {isAuthenticated ? (
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }}
              >
                Logout
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
