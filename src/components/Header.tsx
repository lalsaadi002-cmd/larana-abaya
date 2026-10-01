import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/products';
import { OmanFlag } from './OmanFlag';

interface HeaderProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  cartCount: number;
  wishlistCount: number;
  activeCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  cartCount,
  wishlistCount,
  activeCurrency,
  onSelectCurrency,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const isAr = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = isAr
    ? [
        { label: 'الرئيسية', href: '#hero' },
        { label: 'كولكشن العيد', href: '#eid-collection' },
        { label: 'المجموعة الجديدة', href: '#new-collection' },
        { label: 'الأكثر طلباً', href: '#best-sellers' },
        { label: 'عن لارانا', href: '#atelier-story' },
        { label: 'تواصل معنا', href: '#contact' },
      ]
    : [
        { label: 'Home', href: '#hero' },
        { label: 'Eid Collection', href: '#eid-collection' },
        { label: 'New Collection', href: '#new-collection' },
        { label: 'Best Sellers', href: '#best-sellers' },
        { label: 'About Larana', href: '#atelier-story' },
        { label: 'Contact', href: '#contact' },
      ];

  const currencies: Currency[] = ['OMR', 'SAR', 'AED', 'USD'];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Boutique Bar in Deep Navy */}
      <div className="bg-[#08142D] text-[#F8F5EE] text-[11px] py-1.5 px-4 border-b border-[#C6A972]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[#C6A972] text-[10px] tracking-widest uppercase">
            <span>{isAr ? 'دار أزياء عُمانية' : 'OMANI ABAYA BOUTIQUE'}</span>
            <span>·</span>
            <OmanFlag className="w-[18px] h-[12px]" />
          </span>

          <div className="mx-auto flex items-center gap-2 text-center text-[11px]">
            <span className="font-arabic font-light tracking-wide text-[#F8F5EE]/90">
              {isAr ? 'لارانا ستور | أناقة تروي تفاصيلك' : 'LARANA STORE | Timeless Elegance, Designed for You'}
            </span>
          </div>

          {/* Quick Language Toggle */}
          <div className="flex items-center gap-1 text-[11px]">
            <button
              onClick={() => onToggleLanguage(isAr ? 'en' : 'ar')}
              className="text-[#F8F5EE]/80 hover:text-[#C6A972] transition-colors flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer"
              aria-label="Toggle language"
            >
              <Globe size={11} className="text-[#C6A972]" />
              <span className="font-medium text-[#F8F5EE]">{isAr ? 'EN' : 'عربي'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar - Clean, spacious, with logo removed */}
      <div
        className={`w-full bg-[#0B1B3D] text-[#F8F5EE] transition-all duration-300 border-b border-[#C6A972]/20 ${
          isScrolled
            ? 'py-2.5 sm:py-3 shadow-[0_8px_24px_rgba(11,27,61,0.4)] bg-[#0B1B3D]/98 backdrop-blur-md'
            : 'py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Navigation Links Area */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-[#F8F5EE] hover:text-[#C6A972] transition-colors p-1.5 -mx-1.5 cursor-pointer"
              aria-label={isAr ? 'فتح القائمة' : 'Open menu'}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            {/* Seamless, naturally spaced navigation links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-arabic font-normal text-[#F8F5EE]/85">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#C6A972] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C6A972] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* End Zone: Currency Selector & Utility Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-xs font-arabic text-[#F8F5EE]/90 hover:text-[#C6A972] transition-colors cursor-pointer px-1 py-1"
                aria-label="Select currency"
              >
                <span>{activeCurrency}</span>
                <ChevronDown size={12} className="text-[#C6A972]" />
              </button>

              {currencyDropdownOpen && (
                <div
                  className="absolute top-full left-0 sm:right-0 sm:left-auto mt-2 w-32 bg-[#0B1B3D] border border-[#C6A972]/30 shadow-xl py-1 z-50 animate-in fade-in duration-150"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        onSelectCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-xs text-right sm:text-right font-arabic flex items-center justify-between cursor-pointer transition-colors ${
                        activeCurrency === curr
                          ? 'text-[#C6A972] bg-[#0E224D] font-medium'
                          : 'text-[#F8F5EE]/85 hover:bg-[#0E224D]/60 hover:text-[#F8F5EE]'
                      }`}
                    >
                      <span>{curr}</span>
                      <span className="text-[10px] text-[#C6A972]">
                        {CURRENCY_RATES[curr].symbol}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="text-[#F8F5EE]/90 hover:text-[#C6A972] transition-colors p-1 cursor-pointer"
              aria-label={isAr ? 'بحث في التصاميم' : 'Search designs'}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Wishlist Heart with Counter */}
            <button
              onClick={onOpenWishlist}
              className="relative text-[#F8F5EE]/90 hover:text-[#C6A972] transition-colors p-1 cursor-pointer"
              aria-label={isAr ? 'المفضلة' : 'Wishlist'}
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C6A972] text-[#0B1B3D] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag with Counter */}
            <button
              onClick={onOpenCart}
              className="relative text-[#F8F5EE]/90 hover:text-[#C6A972] transition-colors p-1 cursor-pointer"
              aria-label={isAr ? 'حقيبة التسوق' : 'Shopping bag'}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C6A972] text-[#0B1B3D] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#08142D]/70 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 bottom-0 right-0 w-80 max-w-[85vw] bg-[#0B1B3D] text-[#F8F5EE] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#C6A972]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#C6A972]/20">
                <span className="font-arabic text-base text-[#F8F5EE] font-normal">
                  {isAr ? 'لارانا ستور' : 'LARANA STORE'}
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#F8F5EE]/70 hover:text-[#C6A972] cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.href)}
                    className="text-right font-arabic text-base py-2 text-[#F8F5EE]/90 hover:text-[#C6A972] transition-colors border-b border-[#C6A972]/10"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Drawer Footer Details */}
            <div className="pt-6 border-t border-[#C6A972]/20 space-y-4 text-xs font-arabic text-[#F8F5EE]/70">
              <div className="flex items-center justify-between">
                <span>{isAr ? 'العملة المختارة' : 'Currency'}</span>
                <span className="text-[#C6A972] font-medium">{activeCurrency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{isAr ? 'اللغة' : 'Language'}</span>
                <button
                  onClick={() => onToggleLanguage(isAr ? 'en' : 'ar')}
                  className="text-[#C6A972] underline cursor-pointer"
                >
                  {isAr ? 'English' : 'العربية'}
                </button>
              </div>
              <p className="text-[11px] text-[#C6A972] pt-2 text-center">
                {isAr ? 'دار أزياء عُمانية · مسقط' : 'Omani Abaya Boutique · Muscat'}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
