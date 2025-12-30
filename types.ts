export interface Product {
  id: number | string;
  title: string;
  weight: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badges: Badge[];
  category: string;
  tags?: string[];
  stockStatus?: string;
  description?: string;
}

export interface Badge {
  text: string;
  type: 'sale' | 'frozen' | 'discount' | 'organic' | 'new';
}

export interface FilterOption {
  label: string;
  value: string;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';