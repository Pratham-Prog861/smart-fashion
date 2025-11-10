'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Eye, Box } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </Link>
        
        {/* Quick actions overlay */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Link
            href={`/products/${product.id}`}
            className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <Eye size={20} className="text-gray-900" />
          </Link>
          <Link
            href={`/products/${product.id}?ar=true`}
            className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <Box size={20} className="text-gray-900" />
          </Link>
        </div>

        {/* Badge */}
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
            New
          </div>
        )}
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 truncate hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
          {product.category}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary-600">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
