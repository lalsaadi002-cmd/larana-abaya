import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/products';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  wishlistIds: string[];
  products: Product[];
  activeCurrency: Currency;
  onRemoveWishlist: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, length: number) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  language,
  wishlistIds,
  products,
  activeCurrency,
  onRemoveWishlist,
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;
  const isAr = language === 'ar';

  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const formatPrice = (priceOMR: number) => {
    const config = CURRENCY_RATES[activeCurrency];
    const converted = priceOMR * config.rate;
    const formattedNum = activeCurrency === 'OMR' ? converted.toFixed(1) : Math.round(converted).toLocaleString();
    return isAr ? `${formattedNum} ${config.symbol}` : `${config.symbolEn} ${formattedNum}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div
        className="fixed inset-0 bg-[#08142D]/70 backdrop-blur-xs"
        onClick={onClose}
      />

      <div
        dir={isAr ? 'rtl' : 'ltr'}
        className={`fixed inset-y-0 ${isAr ? 'left-0' : 'right-0'} max-w-full flex`}
      >
        <div className="w-screen max-w-md bg-[#F8F5EE] shadow-2xl flex flex-col justify-between border-x border-[#C6A972]/30 animate-in slide-in-from-left duration-300">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#EFE8DE] border-b border-[#C6A972]/30 flex items-center justify-between">
            <div>
              <h3 className="font-arabic text-xl sm:text-2xl text-[#0B1B3D]">
                {isAr ? 'القطع المحفوظة' : 'Saved Creations'}
              </h3>
              <p className="font-serif text-xs text-[#C6A972]">
                {isAr ? 'المفضلة الخاصة بكِ' : 'YOUR WISHLIST'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5A534B] hover:text-[#0B1B3D] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X size={20} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-[#5A534B] py-12">
                <div className="p-3.5 bg-[#EFE8DE] border border-[#C6A972]/30 rounded-full text-[#0B1B3D]">
                  <Heart size={24} strokeWidth={1.3} />
                </div>
                <div className="space-y-1">
                  <p className="font-arabic text-base text-[#0B1B3D]">
                    {isAr ? 'قائمة المفضلة فارغة' : 'Your wishlist is empty'}
                  </p>
                  <p className="font-arabic text-xs text-[#5A534B] font-light max-w-xs pt-1">
                    {isAr
                      ? 'احفظي التصاميم التي تنال إعجابكِ لتتمكني من مراجعتها لاحقاً.'
                      : 'Save your favorite designs to review them whenever you wish.'}
                  </p>
                </div>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3.5 bg-[#EFE8DE] border border-[#C6A972]/25 items-center"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-18 aspect-[3/4] bg-[#F8F5EE] overflow-hidden shrink-0 border border-[#C6A972]/20 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={isAr ? product.arabicName : product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <h4
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="font-arabic text-sm text-[#0B1B3D] hover:text-[#0E224D] cursor-pointer line-clamp-1"
                      >
                        {isAr ? product.arabicName : product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveWishlist(product.id)}
                        className="text-[#5A534B] hover:text-[#0B1B3D] p-1 cursor-pointer"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="text-xs font-arabic text-[#5A534B]">
                      {isAr ? product.fabricAr : product.fabric}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-arabic font-medium text-[#0B1B3D] tabular-nums">
                        {formatPrice(product.priceOMR)}
                      </span>
                      <button
                        onClick={() => onAddToCart(product, product.lengths[1] || 56)}
                        className="px-2.5 py-1 bg-[#0B1B3D] text-[#F8F5EE] text-[11px] font-arabic flex items-center gap-1 hover:bg-[#0E224D] transition-colors cursor-pointer border border-[#C6A972]/40"
                      >
                        <ShoppingBag size={11} className="text-[#C6A972]" />
                        <span>{isAr ? 'إضافة للحقيبة' : 'Add to Bag'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
