'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Search Products
        </h1>

        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for shirts, jeans, goggles..."
            className="w-full px-6 py-4 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary-600 focus:outline-none text-lg"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Search size={20} />
          </button>
        </form>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {['White Shirt', 'Blue Jeans', 'Sunglasses', 'Black Polo', 'Slim Fit'].map((term) => (
              <button
                key={term}
                onClick={() => router.push(`/products?search=${encodeURIComponent(term)}`)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
