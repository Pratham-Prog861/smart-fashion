'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from './ProductCard'
import type { Product } from '@/types'

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

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
    ]

    setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover our handpicked collection of trending fashion items
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
