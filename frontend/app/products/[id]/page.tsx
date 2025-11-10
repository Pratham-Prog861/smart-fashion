'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { ShoppingCart, Heart, Share2, Box } from 'lucide-react'
import { ARViewer } from '@/components/ARViewer'
import { ProductCard } from '@/components/ProductCard'
import { useCartStore } from '@/store/cartStore'
import { getRecommendations } from '@/utils/recommendations'
import type { Product } from '@/types'

export default function ProductDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const showAR = searchParams.get('ar') === 'true'
  
  const [product, setProduct] = useState<Product | null>(null)
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    // Mock data - replace with actual Spree API call
    const mockProduct: Product = {
      id: params.id as string,
      name: 'Classic White Shirt',
      category: 'Shirts',
      price: 49.99,
      originalPrice: 69.99,
      image: '/placeholder-shirt.svg',
      images: [
        '/placeholder-shirt.svg',
        '/placeholder-shirt.svg',
        '/placeholder-shirt.svg',
      ],
      description: 'Premium cotton shirt with a classic fit. Perfect for both casual and formal occasions.',
      isNew: true,
      arModel: 'shirt-white.glb', // Loads from backend: http://localhost:3001/models/shirt-white.glb
      colors: ['White', 'Black', 'Blue'],
      sizes: ['S', 'M', 'L', 'XL'],
    }

    const mockRecommendations: Product[] = [
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
        image: '/placeholder-sunglasses.svg',
      },
    ]

    setProduct(mockProduct)
    setRecommendations(mockRecommendations)
  }, [params.id])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images / AR Viewer */}
          <div>
            {showAR && product.arModel ? (
              <ARViewer
                modelSrc={product.arModel}
                alt={product.name}
                poster={product.image}
              />
            ) : (
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={product.images?.[selectedImage] || product.image || ''}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-2">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === idx
                            ? 'border-primary-600'
                            : 'border-transparent'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} ${idx + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.isNew && (
              <span className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 text-sm px-3 py-1 rounded-full mb-4">
                New Arrival
              </span>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary-600">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Heart size={20} />
              </button>
              <button className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Share2 size={20} />
              </button>
            </div>

            {product.arModel && !showAR && (
              <a
                href={`/products/${product.id}?ar=true`}
                className="flex items-center justify-center gap-2 w-full py-4 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                <Box size={20} />
                View in AR
              </a>
            )}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((rec) => (
                <ProductCard key={rec.id} product={rec} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
