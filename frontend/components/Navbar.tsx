'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, Search, User, Moon, Sun } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useTheme } from '@/hooks/useTheme'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCartStore()
  const { theme, toggleTheme } = useTheme()

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              SmartFashion
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="hover:text-primary-600 transition-colors">
              Products
            </Link>
            <Link href="/products?category=shirts" className="hover:text-primary-600 transition-colors">
              Shirts
            </Link>
            <Link href="/products?category=jeans" className="hover:text-primary-600 transition-colors">
              Jeans
            </Link>
            <Link href="/products?category=goggles" className="hover:text-primary-600 transition-colors">
              Goggles
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link href="/search" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Search size={20} />
            </Link>

            <Link href="/account" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <User size={20} />
            </Link>

            <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-slide-up">
            <Link href="/products" className="block py-2 hover:text-primary-600 transition-colors">
              Products
            </Link>
            <Link href="/products?category=shirts" className="block py-2 hover:text-primary-600 transition-colors">
              Shirts
            </Link>
            <Link href="/products?category=jeans" className="block py-2 hover:text-primary-600 transition-colors">
              Jeans
            </Link>
            <Link href="/products?category=goggles" className="block py-2 hover:text-primary-600 transition-colors">
              Goggles
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
