import React from 'react';
import { X, Trash2, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  cart: CartItem[];
  activeCurrency: Currency;
  onUpdateQuantity: (productId: string, length: number, delta: number) => void;
  onRemoveItem: (productId: string, length: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  language,
  cart,
  activeCurrency,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;
  const isAr = language === 'ar';

  const totalOMR = cart.reduce(
    (sum, item) => sum + item.product.priceOMR * item.quantity,
    0
  );

  const formatPrice = (priceOMR: number) => {
    const config = CURRENCY_RATES[activeCurrency];
    const converted = priceOMR * config.rate;
    const formattedNum = activeCurrency === 'OMR' ? converted.toFixed(1) : Math.round(converted).toLocaleString();
    return isAr ? `${formattedNum} ${config.symbol}` : `${config.symbolEn} ${formattedNum}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#08142D]/70 backdrop-blur-xs transition-opacity"
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
                {isAr ? 'حقيبة التسوق' : 'Shopping Bag'}
              </h3>
              <p className="font-serif text-xs text-[#C6A972]">
                {isAr ? 'LARANA STORE' : 'لارانا ستور'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5A534B] hover:text-[#0B1B3D] transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-[#5A534B] py-12">
                <div className="p-3.5 bg-[#EFE8DE] border border-[#C6A972]/30 rounded-full text-[#0B1B3D]">
                  <ShoppingBag size={24} strokeWidth={1.3} />
                </div>
                <div className="space-y-1">
                  <p className="font-arabic text-base text-[#0B1B3D]">
                    {isAr ? 'حقيبتكِ فارغة حالياً' : 'Your bag is empty'}
                  </p>
                  <p className="font-arabic text-xs text-[#5A534B] font-light max-w-xs pt-1">
                    {isAr
                      ? 'تصفحي مجموعاتنا المختارة واختاري العباية التي تروي تفاصيلكِ.'
                      : 'Explore our curated collections and select the abaya that reflects your style.'}
                  </p>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedLength}`}
                  className="flex gap-4 p-3.5 bg-[#EFE8DE] border border-[#C6A972]/25 items-start"
                >
                  <div className="w-18 aspect-[3/4] bg-[#F8F5EE] overflow-hidden shrink-0 border border-[#C6A972]/20">
                    <img
                      src={item.product.image}
                      alt={isAr ? item.product.arabicName : item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-arabic text-sm sm:text-base text-[#0B1B3D] line-clamp-1">
                        {isAr ? item.product.arabicName : item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedLength)}
                        className="text-[#5A534B] hover:text-[#0B1B3D] p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="text-xs font-arabic text-[#5A534B]">
                      {isAr ? 'الطول:' : 'Length:'} <strong className="text-[#0B1B3D] font-medium">{item.selectedLength}"</strong> · {isAr ? item.product.colorNameAr : item.product.colorName}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#C6A972]/40 bg-[#F8F5EE]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedLength, -1)}
                          className="px-2 py-0.5 text-xs text-[#0B1B3D] hover:bg-[#EFE8DE] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-arabic font-medium tabular-nums text-[#0B1B3D]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedLength, 1)}
                          className="px-2 py-0.5 text-xs text-[#0B1B3D] hover:bg-[#EFE8DE] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-xs font-arabic font-medium text-[#0B1B3D] tabular-nums">
                        {formatPrice(item.product.priceOMR * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#EFE8DE] border-t border-[#C6A972]/30 space-y-3.5">
              <div className="flex items-center justify-between font-arabic text-sm">
                <span className="text-[#5A534B]">{isAr ? 'المجموع' : 'Subtotal'}</span>
                <span className="font-medium text-base text-[#0B1B3D] tabular-nums">
                  {formatPrice(totalOMR)}
                </span>
              </div>

              <p className="font-arabic text-[11px] text-[#5A534B] font-light">
                {isAr
                  ? 'يتم تفصيل القطع بناءً على طلبكِ في مسقط بكل عناية وإتقان.'
                  : 'Creations are tailored to order in Muscat with utmost attention to detail.'}
              </p>

              <button
                onClick={onCheckout}
                className="w-full py-3 bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/40 font-arabic text-xs font-normal hover:bg-[#0E224D] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>{isAr ? 'متابعة الطلب عبر الواتساب' : 'Inquire via WhatsApp'}</span>
                {isAr ? <ArrowLeft size={14} className="text-[#C6A972]" /> : <ArrowRight size={14} className="text-[#C6A972]" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
