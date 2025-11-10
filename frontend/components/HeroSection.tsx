'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center animate-slide-up">
          <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/30 px-4 py-2 rounded-full mb-6">
            <Sparkles size={16} className="text-primary-600" />
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              AR-Powered Shopping Experience
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Experience Fashion in{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Your Room
            </span>
            <br />
            👕🕶️
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto text-balance">
            Try products in AR, search with your voice, and get smart recommendations tailored just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all hover:scale-105"
            >
              Shop Now
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              href="/ar-demo"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
            >
              Try AR Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -z-10 opacity-20">
        <div className="w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 -z-10 opacity-20">
        <div className="w-96 h-96 bg-primary-200 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
