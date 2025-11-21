"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Filter } from "lucide-react";
import type { Product } from "@/types";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category || "all");

  useEffect(() => {
    // Mock data - replace with actual Spree API call
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Premium White Cotton Shirt",
        category: "Shirts",
        price: 49.99,
        originalPrice: 69.99,
        image: "/placeholder-shirt.svg",
        arModel: "shirt-white.glb",
        isNew: true,
      },
      {
        id: "2",
        name: "Wrangler Black Slim Fit Jeans",
        category: "Jeans",
        price: 79.99,
        originalPrice: 99.99,
        image: "/placeholder-jeans.svg",
        arModel: "wrangler_jeans_black_slim_fit.glb",
      },
      {
        id: "3",
        name: "Classic Aviator Sunglasses",
        category: "Goggles",
        price: 129.99,
        originalPrice: 159.99,
        image: "/placeholder-sunglasses.svg",
        arModel: "aviator_sunglasses.glb",
        isNew: true,
      },
      {
        id: "4",
        name: "Camouflage Pattern Polo Shirt",
        category: "Shirts",
        price: 54.99,
        originalPrice: 74.99,
        image: "/placeholder-polo.svg",
        arModel: "polo_shirt_camouflage_pattern.glb",
      },
      {
        id: "5",
        name: "Black Collar T-shirt",
        category: "T-shirts",
        price: 35.99,
        originalPrice: 45.99,
        image: "/placeholder-polo.svg",
        arModel: "tshirt-black.glb",
      },
    ];

    let filtered = mockProducts;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTimeout(() => {
      setProducts(filtered);
      setLoading(false);
    }, 500);
  }, [selectedCategory, search]);

  const categories = ["all", "Shirts", "T-shirts", "Jeans", "Goggles"];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {search ? `Search Results for "${search}"` : "All Products"}
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
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
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
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-800 rounded-xl h-96 animate-pulse"
              />
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
  );
}
