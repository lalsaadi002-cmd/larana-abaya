import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Ruler, Sparkles, Check } from 'lucide-react';
import { Product, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/products';

interface QuickViewModalProps {
  product: Product | null;
  language: Language;
  activeCurrency: Currency;
  wishlist: string[];
  onClose: () => void;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, length: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  language,
  activeCurrency,
  wishlist,
  onClose,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!product) return null;

  const isAr = language === 'ar';
  const isWishlisted = wishlist.includes(product.id);
  const [selectedLength, setSelectedLength] = useState<number>(product.lengths[1] || 56);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'craft'>('details');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const formatPrice = (priceOMR: number) => {
    const config = CURRENCY_RATES[activeCurrency];
    const converted = priceOMR * config.rate;
    const formattedNum = activeCurrency === 'OMR' ? converted.toFixed(1) : Math.round(converted).toLocaleString();
    return isAr ? `${formattedNum} ${config.symbol}` : `${config.symbolEn} ${formattedNum}`;
  };

  const handleAdd = () => {
    onAddToCart(product, selectedLength);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#08142D]/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#F8F5EE] border border-[#C6A972]/30 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 bg-[#F8F5EE]/90 hover:bg-[#F8F5EE] text-[#5A534B] hover:text-[#0B1B3D] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Product Visual */}
        <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto relative bg-[#EFE8DE] overflow-hidden">
          <img
            src={product.image}
            alt={isAr ? product.arabicName : product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />

          {/* Clean Tag */}
          {(isAr ? product.tagAr : product.tag) && (
            <div className="absolute top-4 right-4 text-[10px] font-arabic text-[#F8F5EE] bg-[#0B1B3D] border border-[#C6A972]/30 px-3 py-1">
              {isAr ? product.tagAr : product.tag}
            </div>
          )}

          {/* Wishlist toggle */}
          <button
            onClick={() => onToggleWishlist(product.id)}
            className="absolute bottom-4 right-4 p-2.5 bg-[#F8F5EE]/90 hover:bg-[#F8F5EE] text-[#5A534B] hover:text-[#0B1B3D] transition-colors cursor-pointer"
            aria-label="Wishlist toggle"
          >
            <Heart
              size={16}
              className={isWishlisted ? "fill-[#0B1B3D] text-[#0B1B3D]" : ""}
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Product Information */}
        <div className="w-full md:w-1/2 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-3.5">
            <div>
              <div className="text-[11px] font-arabic text-[#5A534B] mb-1">
                {isAr ? product.originAr : product.origin} · {isAr ? product.colorNameAr : product.colorName}
              </div>
              <h3 className="font-arabic text-2xl text-[#0B1B3D]">
                {isAr ? product.arabicName : product.name}
              </h3>
              <p className="font-serif text-xs text-[#C6A972] mt-0.5">
                {isAr ? product.name : product.arabicName}
              </p>
              <div className="font-arabic font-medium text-lg text-[#0B1B3D] mt-2 tabular-nums">
                {formatPrice(product.priceOMR)}
              </div>
            </div>

            <p className="font-arabic text-xs text-[#5A534B] font-light leading-relaxed">
              {isAr ? product.arabicDescription : product.description}
            </p>

            {/* Length / Sizing Selector */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-arabic text-[#0B1B3D] mb-2">
                <span className="font-medium">{isAr ? 'اختيار الطول (إنش)' : 'Select Length (Inches)'}</span>
                <span className="text-[#5A534B] text-[11px]">{isAr ? 'طول العباية' : 'Abaya Length'}</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {product.lengths.map((len) => (
                  <button
                    key={len}
                    onClick={() => setSelectedLength(len)}
                    className={`py-2 text-xs font-arabic transition-all cursor-pointer ${
                      selectedLength === len
                        ? 'bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/40 font-medium'
                        : 'border border-[#C6A972]/30 text-[#5A534B] bg-[#EFE8DE] hover:border-[#0B1B3D]'
                    }`}
                  >
                    {len}"
                  </button>
                ))}
              </div>
            </div>

            {/* Tabbed Specifications */}
            <div className="pt-2 border-t border-[#0B1B3D]/10">
              <div className="flex gap-4 border-b border-[#0B1B3D]/10 text-xs font-arabic mb-2.5">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1.5 transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'text-[#0B1B3D] font-medium border-b-2 border-[#C6A972]'
                      : 'text-[#5A534B]'
                  }`}
                >
                  {isAr ? 'تفاصيل القماش' : 'Fabric'}
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-1.5 transition-colors cursor-pointer ${
                    activeTab === 'care'
                      ? 'text-[#0B1B3D] font-medium border-b-2 border-[#C6A972]'
                      : 'text-[#5A534B]'
                  }`}
                >
                  {isAr ? 'العناية' : 'Care'}
                </button>
                <button
                  onClick={() => setActiveTab('craft')}
                  className={`pb-1.5 transition-colors cursor-pointer ${
                    activeTab === 'craft'
                      ? 'text-[#0B1B3D] font-medium border-b-2 border-[#C6A972]'
                      : 'text-[#5A534B]'
                  }`}
                >
                  {isAr ? 'التفصيل' : 'Craft'}
                </button>
              </div>

              <div className="text-xs font-arabic text-[#5A534B] min-h-[50px]">
                {activeTab === 'details' && (
                  <div className="space-y-1">
                    <p><strong className="text-[#0B1B3D] font-medium">{isAr ? 'نوع القماش:' : 'Fabric:'}</strong> {isAr ? product.fabricAr : product.fabric}</p>
                    <p><strong className="text-[#0B1B3D] font-medium">{isAr ? 'اللون:' : 'Color:'}</strong> {isAr ? product.colorNameAr : product.colorName}</p>
                    <p><strong className="text-[#0B1B3D] font-medium">{isAr ? 'الملمس:' : 'Feel:'}</strong> {isAr ? 'انسيابي ناعم وبارد، مريح طوال اليوم' : 'Smooth, breathable and lightweight'}</p>
                  </div>
                )}
                {activeTab === 'care' && (
                  <div className="space-y-1">
                    <p>{isAr ? '• غسيل جاف أو غسيل يدوي ناعم بماء بارد للمحافظة على انسيابية القماش.' : '• Dry clean or gentle hand wash in cold water to preserve fabric drape.'}</p>
                    <p>{isAr ? '• يُفضّل الكي بالبخار بدرجة حرارة منخفضة.' : '• Low temperature steam ironing recommended.'}</p>
                  </div>
                )}
                {activeTab === 'craft' && (
                  <div className="space-y-1">
                    <p><strong className="text-[#0B1B3D] font-medium">{isAr ? 'التنفيذ:' : 'Craft:'}</strong> {isAr ? 'تصميم بعناية في مسقط' : 'Crafted with care in Muscat'}</p>
                    <p>{isAr ? '• خياطة داخلية نظيفة ومتقنة لضمان الراحة والاستدامة.' : '• Clean, reinforced interior seams for durability.'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#0B1B3D]/10 space-y-2 mt-4">
            <button
              onClick={handleAdd}
              className={`w-full py-3 text-xs font-arabic transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                addedAnimation
                  ? 'bg-[#0E224D] text-[#F8F5EE]'
                  : 'bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/40 hover:bg-[#0E224D]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check size={15} className="text-[#C6A972]" />
                  <span>{isAr ? 'تمت الإضافة بنجاح' : 'Added to Bag'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={14} className="text-[#C6A972]" />
                  <span>
                    {isAr ? `إضافة إلى الحقيبة (طول ${selectedLength})` : `Add to Bag (Length ${selectedLength}")`}
                  </span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-[11px] font-arabic text-[#5A534B] pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-[#C6A972]" />
                <span>{isAr ? 'ضمان جودة الأقمشة' : 'Quality Guaranteed'}</span>
              </span>
              <span className="flex items-center gap-1">
                <Sparkles size={12} className="text-[#C6A972]" />
                <span>{isAr ? 'تغليف هدايا أنيق' : 'Signature Packaging'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
