export function getPlaceholderImage(category?: string): string {
  if (!category) return "/placeholder-product.svg";

  const cat = category.toLowerCase();
  if (cat.includes("shirt") || cat.includes("polo"))
    return "/placeholder-shirt.svg";
  if (cat.includes("jean") || cat.includes("pant"))
    return "/placeholder-jeans.svg";
  if (
    cat.includes("glass") ||
    cat.includes("goggle") ||
    cat.includes("sunglass")
  )
    return "/placeholder-sunglasses.svg";

  return "/placeholder-product.svg";
}
