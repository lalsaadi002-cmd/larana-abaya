import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { Product, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  products: Product[];
  activeCurrency: Currency;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  language,
  products,
  activeCurrency,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isAr = language === 'ar';

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.arabicName.includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.fabricAr.includes(q) ||
          p.colorName.toLowerCase().includes(q) ||
          p.colorNameAr.includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.arabicDescription.includes(q)
        );
      });

  const formatPrice = (priceOMR: number) => {
    const config = CURRENCY_RATES[activeCurrency];
    const converted = priceOMR * config.rate;
    const formattedNum = activeCurrency === 'OMR' ? converted.toFixed(1) : Math.round(converted).toLocaleString();
    return isAr ? `${formattedNum} ${config.symbol}` : `${config.symbolEn} ${formattedNum}`;
  };

  const quickSearchesAr = ['كريب ياباني', 'حرير طبيعي', 'أورجانزا', 'شيفون'];
  const quickSearchesEn = ['Japanese Crepe', 'Natural Silk', 'Organza', 'Chiffon'];
  const quickSearches = isAr ? quickSearchesAr : quickSearchesEn;

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 flex flex-col bg-[#F8F5EE]/98 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Top Bar with Search Input */}
      <div className="max-w-4xl mx-auto w-full px-5 pt-8 pb-6 border-b border-[#0B1B3D]/10">
        <div className="flex items-center justify-between pb-5">
          <span className="text-xs font-arabic text-[#5A534B]">
            {isAr ? 'لارانا ستور · البحث في المتجر' : 'LARANA STORE · SEARCH'}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-[#0B1B3D] hover:text-[#0E224D] transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative flex items-center">
          <Search size={22} className={`text-[#C6A972] absolute ${isAr ? 'right-0' : 'left-0'}`} />
          <input
            ref={inputRef}
            type="text"
            placeholder={isAr ? 'ابحثي عن عباية، قماش، أو قصة (مثال: كريب، بشت)...' : 'Search by fabric, cut, or style...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full bg-transparent ${isAr ? 'pr-8 pl-3' : 'pl-8 pr-3'} py-2.5 text-base sm:text-xl font-arabic text-[#0B1B3D] placeholder-[#5A534B]/40 focus:outline-none`}
          />
        </div>

        {/* Quick Suggestions */}
        <div className="flex flex-wrap items-center gap-2 pt-3 text-xs font-arabic text-[#5A534B]">
          <span>{isAr ? 'كلمات شائعة:' : 'Suggested:'}</span>
          {quickSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="text-[#0B1B3D] hover:text-[#C6A972] hover:underline underline-offset-4 cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Area */}
      <div className="max-w-4xl mx-auto w-full px-5 py-8 flex-1 overflow-y-auto">
        {query.trim() === '' ? (
          <div className="text-center py-16 text-[#5A534B] space-y-1 font-arabic">
            <p className="text-base sm:text-lg text-[#0B1B3D]">
              {isAr ? 'ابحثي في تشكيلة لارانا' : 'Discover Larana Creations'}
            </p>
            <p className="text-xs">
              {isAr ? 'اكتشفي التصاميم والأقمشة المتاحة' : 'Find your preferred abaya design'}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-[#5A534B] space-y-1 font-arabic">
            <p className="text-base text-[#0B1B3D]">
              {isAr ? `لا توجد نتائج تطابق "${query}"` : `No matches found for "${query}"`}
            </p>
            <p className="text-xs">
              {isAr ? 'جرّبي البحث بكلمات مثل "كريب" أو "حرير"' : 'Try searching for "Crepe" or "Silk"'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="group cursor-pointer flex gap-3.5 p-3 bg-[#EFE8DE] border border-[#C6A972]/30 hover:border-[#0B1B3D]/40 transition-all"
              >
                <div className="w-18 aspect-[3/4] bg-[#F8F5EE] overflow-hidden shrink-0 border border-[#C6A972]/20">
                  <img
                    src={product.image}
                    alt={isAr ? product.arabicName : product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <span className="text-[10px] font-arabic text-[#5A534B] block">
                      {isAr ? product.originAr : product.origin}
                    </span>
                    <h4 className="font-arabic text-sm text-[#0B1B3D] group-hover:text-[#0E224D] transition-colors line-clamp-1">
                      {isAr ? product.arabicName : product.name}
                    </h4>
                    <p className="text-xs font-arabic text-[#5A534B] line-clamp-1">
                      {isAr ? product.fabricAr : product.fabric}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-arabic font-medium text-[#0B1B3D] tabular-nums">
                      {formatPrice(product.priceOMR)}
                    </span>
                    <ArrowUpRight size={13} className="text-[#C6A972]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
