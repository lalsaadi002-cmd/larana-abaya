export interface Product {
  id: string;
  name: string;
  arabicName: string;
  priceOMR: number;
  category: 'Couture' | 'Everyday Luxury' | 'Bisht & Capes' | 'Limited Edition';
  categoryAr: 'كوتور' | 'إطلالة يومية راقية' | 'بشت وكاب' | 'إصدار محدود';
  tag?: string;
  tagAr?: string;
  image: string;
  secondaryImage?: string;
  description: string;
  arabicDescription: string;
  fabric: string;
  fabricAr: string;
  origin: string;
  originAr: string;
  silhouette: string;
  silhouetteAr: string;
  color: string;
  colorName: string;
  colorNameAr: string;
  lengths: number[]; // e.g. [52, 54, 56, 58, 60]
  isBestSeller?: boolean;
  isNew?: boolean;
}

export type Currency = 'OMR' | 'AED' | 'SAR' | 'USD';
export type Language = 'ar' | 'en';

export interface CartItem {
  product: Product;
  selectedLength: number;
  quantity: number;
}
