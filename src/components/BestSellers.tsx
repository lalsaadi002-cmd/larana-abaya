import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { Product, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/products';

interface BestSellersProps {
  products: Product[];
  language: Language;
  activeCurrency: Currency;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCartDirect: (product: Product, length: number) => void;
}

type FilterType = 'all' | 'new' | 'best';

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  language,
  activeCurrency,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onAddToCartDirect,
}) => {
  const isAr = language === 'ar';
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filtersAr: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'الكل' },
    { key: 'new', label: 'وصل حديثًا' },
    { key: 'best', label: 'الأكثر طلبًا' },
  ];

  const filtersEn: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'new', label: 'New Arrivals' },
    { key: 'best', label: 'Best Sellers' },
  ];

  const currentFilters = isAr ? filtersAr : filtersEn;

  const filteredProducts = products.filter((product) => {
    if (activeFilter === 'new') return product.isNew;
    if (activeFilter === 'best') return product.isBestSeller;
    return true;
  });

  const formatPrice = (priceOMR: number) => {
    const config = CURRENCY_RATES[activeCurrency];
    const converted = priceOMR * config.rate;
    const formattedNum = activeCurrency === 'OMR' ? converted.toFixed(1) : Math.round(converted).toLocaleString();
    return isAr ? `${formattedNum} ${config.symbol}` : `${config.symbolEn} ${formattedNum}`;
  };

  return (
    <section id="best-sellers" className="py-20 md:py-28 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Title & Refined Minimal Filters */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-arabic text-[#5A534B] tracking-wider block">
            {isAr ? 'تشكيلة لارانا' : 'LARANA SELECTION'}
          </span>
          <h2 className="font-arabic text-3xl md:text-4xl font-normal text-[#0B1B3D]">
            {isAr ? 'الأكثر طلباً' : 'Best Sellers'}
          </h2>
          <p className="font-arabic text-xs sm:text-sm text-[#5A534B] font-light leading-relaxed">
            {isAr
              ? 'العبايات الأكثر تميزاً وإقبالاً، اختيرت بعناية لتمنحكِ إطلالة ناعمة وفاخرة.'
              : 'Our most cherished abaya silhouettes, celebrated for their flattering drape and timeless ease.'}
          </p>

          {/* Minimal, Refined Typography-Led Filter Navigation (No Bulky Boxes) */}
          <div className="flex items-center justify-center gap-8 sm:gap-10 pt-5 border-b border-[#0B1B3D]/10">
            {currentFilters.map((tab) => {
              const isSelected = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`relative pb-3 text-sm sm:text-base font-arabic transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'text-[#0B1B3D] font-medium'
                      : 'text-[#5A534B]/75 hover:text-[#0B1B3D]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isSelected && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#C6A972] rounded-full animate-in fade-in duration-200" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#F8F5EE] transition-all duration-300"
              >
                {/* Product Image Slot */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EFE8DE] border border-[#C6A972]/20">
                  <img
                    src={product.image}
                    alt={isAr ? product.arabicName : product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                  />

                  {/* Clean Text Tag in Navy with subtle Muted Gold border */}
                  {(isAr ? product.tagAr : product.tag) && (
                    <div className="absolute top-4 right-4 text-[10px] font-arabic text-[#F8F5EE] bg-[#0B1B3D] border border-[#C6A972]/30 px-2.5 py-1">
                      {isAr ? product.tagAr : product.tag}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="absolute top-4 left-4 p-2 bg-[#F8F5EE]/90 backdrop-blur-sm transition-colors hover:bg-[#F8F5EE] text-[#5A534B] hover:text-[#0B1B3D] cursor-pointer"
                    aria-label={isWishlisted ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                  >
                    <Heart
                      size={15}
                      className={isWishlisted ? "fill-[#0B1B3D] text-[#0B1B3D]" : ""}
                      strokeWidth={1.5}
                    />
                  </button>

                  {/* Hover Quick Actions */}
                  <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => onQuickView(product)}
                      className="flex-1 py-2.5 bg-[#0B1B3D] text-[#F8F5EE] font-arabic text-xs font-normal border border-[#C6A972]/40 hover:bg-[#0E224D] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Eye size={13} className="text-[#C6A972]" />
                      <span>{isAr ? 'معاينة سريعة' : 'Quick View'}</span>
                    </button>
                    <button
                      onClick={() => onAddToCartDirect(product, product.lengths[1] || 56)}
                      className="p-2.5 bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/40 hover:bg-[#0E224D] transition-colors cursor-pointer"
                      title={isAr ? 'إضافة إلى الحقيبة (طول ٥٦)' : 'Add (Length 56)'}
                      aria-label="Add to bag with default length 56 inches"
                    >
                      <ShoppingBag size={14} className="text-[#C6A972]" />
                    </button>
                  </div>
                </div>

                {/* Product Metadata & Info */}
                <div className="pt-3.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-arabic text-[#5A534B]">
                    <span>{isAr ? product.originAr : product.origin}</span>
                    <span className="text-[#C6A972]">
                      {isAr ? 'طول ٥٢ - ٦٠' : '52" - 60"'}
                    </span>
                  </div>

                  <h3
                    onClick={() => onQuickView(product)}
                    className="font-arabic text-base sm:text-lg text-[#0B1B3D] hover:text-[#0E224D] transition-colors cursor-pointer line-clamp-1"
                  >
                    {isAr ? product.arabicName : product.name}
                  </h3>

                  <p className="font-arabic text-xs text-[#5A534B] line-clamp-1">
                    {isAr ? product.fabricAr : product.fabric}
                  </p>

                  <div className="flex items-center justify-between pt-1 font-arabic">
                    <span className="text-sm font-medium text-[#0B1B3D] tabular-nums">
                      {formatPrice(product.priceOMR)}
                    </span>
                    <span className="text-[11px] text-[#5A534B] font-light">
                      {isAr ? product.colorNameAr : product.colorName}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
