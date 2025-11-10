'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/ProductCard'
import { Filter } from 'lucide-react'
import type { Product } from '@/types'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(category || 'all')

  useEffect(() => {
    // Mock data - replace with actual Spree API call
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Classic White Shirt',
        category: 'Shirts',
        price: 49.99,
        originalPrice: 69.99,
        image: '/placeholder-shirt.svg',
        isNew: true,
      },
      {
        id: '2',
        name: 'Blue Denim Jeans',
        category: 'Jeans',
        price: 79.99,
        image: '/placeholder-jeans.svg',
      },
      {
        id: '3',
        name: 'Aviator Sunglasses',
        category: 'Goggles',
        price: 129.99,
        originalPrice: 159.99,
        image: '/placeholder-sunglasses.svg',
        isNew: true,
      },
      {
        id: '4',
        name: 'Black Polo Shirt',
        category: 'Shirts',
        price: 54.99,
        image: '/placeholder-shirt.svg',
      },
      {
        id: '5',
        name: 'Slim Fit Jeans',
        category: 'Jeans',
        price: 89.99,
        image: '/placeholder-jeans.svg',
      },
      {
        id: '6',
        name: 'Round Sunglasses',
        category: 'Goggles',
        price: 99.99,
        image: '/placeholder-sunglasses.svg',
      },
    ]

    let filtered = mockProducts

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    setTimeout(() => {
      setProducts(filtered)
      setLoading(false)
    }, 500)
  }, [selectedCategory, search])

  const categories = ['all', 'Shirts', 'Jeans', 'Goggles']

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {search ? `Search Results for "${search}"` : 'All Products'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {products.length} products found
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex items-center gap-4 overflow-x-auto pb-2">
          <Filter size={20} className="text-gray-600 dark:text-gray-400" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No products found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
