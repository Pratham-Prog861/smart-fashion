import type { Product } from "@/types";

export function getRecommendations(
  currentProduct: Product,
  allProducts: Product[],
  limit: number = 4
): Product[] {
  const recommendations: Array<{ product: Product; score: number }> = [];

  for (const product of allProducts) {
    if (product.id === currentProduct.id) continue;

    let score = 0;

    // Same category gets high score
    if (product.category === currentProduct.category) {
      score += 50;
    }

    // Similar price range (within 20%)
    const priceDiff = Math.abs(product.price - currentProduct.price);
    const priceRange = currentProduct.price * 0.2;
    if (priceDiff <= priceRange) {
      score += 30;
    }

    // New products get bonus
    if (product.isNew) {
      score += 10;
    }

    // On sale products get bonus
    if (product.originalPrice && product.originalPrice > product.price) {
      score += 15;
    }

    recommendations.push({ product, score });
  }

  // Sort by score and return top N
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.product);
}

export function getComplementaryProducts(
  product: Product,
  allProducts: Product[]
): Product[] {
  const complementaryMap: Record<string, string[]> = {
    Shirts: ["Jeans", "Goggles"],
    Jeans: ["Shirts", "Goggles"],
    Goggles: ["Shirts", "Jeans"],
  };

  const complementaryCategories = complementaryMap[product.category] || [];

  return allProducts
    .filter((p) => complementaryCategories.includes(p.category))
    .slice(0, 3);
}
