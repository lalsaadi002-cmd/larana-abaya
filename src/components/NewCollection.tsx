import React from 'react';
import { Eye, Heart, ArrowUpRight } from 'lucide-react';
import { Product, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/products';

interface NewCollectionProps {
  products: Product[];
  language: Language;
  activeCurrency: Currency;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const NewCollection: React.FC<NewCollectionProps> = ({
  products,
  language,
  activeCurrency,
  wishlist,
  onToggleWishlist,
  onQuickView,
}) => {
  const isAr = language === 'ar';
  const newItems = products.filter((p) => p.isNew);
  const featured = newItems[0] || products[0];
  const secondary = newItems.slice(1);

  const formatPrice = (priceOMR: number) => {
    const config = CURRENCY_RATES[activeCurrency];
    const converted = priceOMR * config.rate;
    const formattedNum = activeCurrency === 'OMR' ? converted.toFixed(1) : Math.round(converted).toLocaleString();
    return isAr ? `${formattedNum} ${config.symbol}` : `${config.symbolEn} ${formattedNum}`;
  };

  return (
    <section id="new-collection" className="py-20 md:py-28 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#0B1B3D]/15 gap-5">
          <div className="space-y-2">
            <span className="text-xs font-arabic text-[#5A534B] tracking-wider block">
              {isAr ? 'إطلالات الموسم' : 'SEASONAL HIGHLIGHTS'}
            </span>
            <div className="flex items-baseline gap-4">
              <h2 className="font-arabic text-3xl md:text-4xl font-normal text-[#0B1B3D]">
                {isAr ? 'المجموعة الجديدة' : 'New Collection'}
              </h2>
              <span className="font-serif text-sm md:text-base text-[#C6A972] font-light">
                {isAr ? 'NEW ARRIVALS' : 'المجموعة الجديدة'}
              </span>
            </div>
          </div>
          <p className="font-arabic text-xs sm:text-sm text-[#5A534B] font-light max-w-md leading-relaxed">
            {isAr
              ? 'تصاميم تمزج بين الانسيابية العصرية والفخامة الهادئة، مختارة بعناية لأناقتكِ اليومية والمناسبات.'
              : 'Effortless silhouettes woven with refined grace, tailored for everyday poise and celebratory gatherings.'}
          </p>
        </div>

        {/* Editorial Layout: Large Feature Left (7 Cols), Secondary Stack Right (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Hero Showcase Feature (7 Cols) */}
          <div className="lg:col-span-7 group flex flex-col space-y-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFE8DE] border border-[#C6A972]/20">
              <img
                src={featured.image}
                alt={isAr ? featured.arabicName : featured.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
              />

              {/* Exclusive Tag in Navy with subtle Gold accent */}
              <div className="absolute top-5 right-5 text-[11px] font-arabic text-[#F8F5EE] bg-[#0B1B3D] border border-[#C6A972]/30 px-3 py-1 tracking-wide">
                {isAr ? 'إطلالة بارزة' : 'Featured Design'}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(featured.id)}
                className="absolute top-5 left-5 p-2.5 bg-[#F8F5EE]/90 backdrop-blur-sm text-[#5A534B] hover:text-[#0B1B3D] transition-colors cursor-pointer"
                aria-label="Save to wishlist"
              >
                <Heart
                  size={16}
                  className={wishlist.includes(featured.id) ? 'fill-[#0B1B3D] text-[#0B1B3D]' : ''}
                  strokeWidth={1.5}
                />
              </button>

              {/* Floating Quick Action CTA */}
              <div className="absolute inset-x-5 bottom-5">
                <button
                  onClick={() => onQuickView(featured)}
                  className="w-full py-3 bg-[#0B1B3D] text-[#F8F5EE] font-arabic text-xs font-normal border border-[#C6A972]/40 hover:bg-[#0E224D] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Eye size={14} className="text-[#C6A972]" />
                  <span>{isAr ? 'معاينة سريعة وتفاصيل العباية' : 'Quick View & Details'}</span>
                </button>
              </div>
            </div>

            {/* Typography & Details */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-arabic text-[#5A534B]">
                <span>{isAr ? featured.originAr : featured.origin}</span>
                <span aria-hidden="true" className="text-[#C6A972]">·</span>
                <span>{isAr ? featured.fabricAr : featured.fabric}</span>
                <span aria-hidden="true" className="text-[#C6A972]">·</span>
                <span>{isAr ? featured.colorNameAr : featured.colorName}</span>
              </div>

              <div className="flex items-baseline justify-between">
                <h3 className="font-arabic text-xl sm:text-2xl text-[#0B1B3D] group-hover:text-[#0E224D] transition-colors">
                  {isAr ? featured.arabicName : featured.name}
                </h3>
                <span className="font-arabic text-base sm:text-lg font-medium text-[#0B1B3D] tabular-nums">
                  {formatPrice(featured.priceOMR)}
                </span>
              </div>

              <p className="font-arabic text-xs sm:text-sm text-[#5A534B] font-light leading-relaxed max-w-xl">
                {isAr ? featured.arabicDescription : featured.description}
              </p>
            </div>
          </div>

          {/* Secondary Editorial Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-7">
            {secondary.map((product) => (
              <div key={product.id} className="group flex flex-col sm:flex-row gap-5 items-start">
                <div className="relative aspect-[3/4] w-full sm:w-44 shrink-0 overflow-hidden bg-[#EFE8DE] border border-[#C6A972]/20">
                  <img
                    src={product.image}
                    alt={isAr ? product.arabicName : product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
                  />
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="absolute top-3 left-3 p-2 bg-[#F8F5EE]/90 backdrop-blur-sm text-[#5A534B] hover:text-[#0B1B3D] transition-colors cursor-pointer"
                    aria-label="Save to wishlist"
                  >
                    <Heart
                      size={14}
                      className={wishlist.includes(product.id) ? 'fill-[#0B1B3D] text-[#0B1B3D]' : ''}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>

                <div className="flex-1 space-y-1.5 pt-1">
                  <div className="text-[11px] font-arabic text-[#5A534B]">
                    {isAr ? product.originAr : product.origin}
                  </div>
                  <h4 className="font-arabic text-base sm:text-lg text-[#0B1B3D] group-hover:text-[#0E224D] transition-colors">
                    {isAr ? product.arabicName : product.name}
                  </h4>
                  <p className="font-arabic text-xs text-[#5A534B] font-light line-clamp-2">
                    {isAr ? product.arabicDescription : product.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-arabic text-sm font-medium text-[#0B1B3D] tabular-nums">
                      {formatPrice(product.priceOMR)}
                    </span>
                    <button
                      onClick={() => onQuickView(product)}
                      className="text-xs font-arabic text-[#0B1B3D] hover:text-[#C6A972] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{isAr ? 'عرض التفاصيل' : 'View Details'}</span>
                      <ArrowUpRight size={13} className="text-[#C6A972]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Editorial Boutique Note Card */}
            <div className="p-5 bg-[#EFE8DE] border border-[#C6A972]/30 space-y-2 mt-2">
              <span className="text-[11px] font-arabic text-[#C6A972] tracking-wider block">
                {isAr ? 'استوديو لارانا · مسقط' : 'LARANA STUDIO · MUSCAT'}
              </span>
              <p className="text-xs font-arabic text-[#5A534B] font-light leading-relaxed">
                {isAr
                  ? 'جميع القطع تُنفّذ بمقاسات وأطوال مختلفة لتلائم ذوقكِ الخاص مع إمكانية التعديل.'
                  : 'Every piece is crafted in diverse lengths with custom alterations available upon request.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
