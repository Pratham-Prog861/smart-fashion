import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              SmartFashion
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Experience fashion in your room with AR technology and smart recommendations.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">All Products</Link></li>
              <li><Link href="/products?category=shirts" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Shirts</Link></li>
              <li><Link href="/products?category=jeans" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Jeans</Link></li>
              <li><Link href="/products?category=goggles" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Goggles</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Help Center</Link></li>
              <li><Link href="/shipping" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Returns</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} SmartFashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
