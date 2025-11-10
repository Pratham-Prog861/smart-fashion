export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  description?: string;
  isNew?: boolean;
  arModel?: string;
  colors?: string[];
  sizes?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface SpreeProduct {
  id: string;
  type: string;
  attributes: {
    name: string;
    description: string;
    price: string;
    display_price: string;
    available_on: string;
    slug: string;
    meta_description: string;
    meta_keywords: string;
  };
  relationships: {
    images: {
      data: Array<{ id: string; type: string }>;
    };
  };
}
