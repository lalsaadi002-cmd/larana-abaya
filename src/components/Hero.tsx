import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onShopClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isAr = language === 'ar';

  return (
    <section id="hero" className="relative w-full h-[78vh] sm:h-[82vh] min-h-[520px] max-h-[820px] overflow-hidden bg-[#F8F5EE]">
      {/* Background Editorial Image - FULL HEAD AND FACE VISIBLE, NATURAL LUXURY FRAMING */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/src/assets/images/hero_larana_couture_1790831402956.jpg"
          alt="LARANA Fashion Editorial Muscat"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-top transition-opacity duration-1000 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Soft, natural warm gradient scrim - protects legibility while keeping model's head and face fully clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08142D]/90 via-[#08142D]/40 via-55% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,rgba(8,20,45,0.3)_100%)] pointer-events-none" />
      </div>

      {/* Editorial Content Frame */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col justify-between py-10 md:py-14 text-center text-[#F8F5EE]">
        {/* Top spacer to balance layout and ensure headroom for model */}
        <div className="h-4 sm:h-6" />

        {/* Central Master Lockup - Arabic First & Dominant */}
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center space-y-4 md:space-y-5 my-auto">
          {/* Brand Name - Large Arabic Title is Primary and Unobstructed */}
          <div className="space-y-1">
            <h1 className="font-arabic text-4xl sm:text-6xl md:text-7xl font-normal text-[#F8F5EE] tracking-wide">
              {isAr ? 'لارانا' : 'LARANA'}
            </h1>
            <span className="font-serif text-xs md:text-sm tracking-[0.3em] uppercase text-[#C6A972] block">
              {isAr ? 'LARANA STORE' : 'لارانا ستور'}
            </span>
          </div>

          <div className="h-[1px] w-12 bg-[#C6A972]/80 mx-auto" />

          {/* Primary Arabic Message */}
          <h2 className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#F8F5EE] font-normal leading-relaxed text-balance">
            {isAr ? 'أناقة تروي تفاصيلك' : 'Timeless Elegance, Designed for You'}
          </h2>

          {/* Subtitle Message */}
          <p className="font-arabic text-sm sm:text-base md:text-lg text-[#F8F5EE]/90 font-light leading-relaxed max-w-xl text-balance">
            {isAr
              ? 'عبايات بتفاصيل أنيقة ولمسات عصرية، صُممت لترافقك في كل مناسبة.'
              : 'Abayas with graceful silhouettes and contemporary touches, designed to accompany you through every cherished moment.'}
          </p>

          {/* Luxury Button: Deep Navy with Ivory text and subtle Muted Gold border */}
          <div className="pt-2 sm:pt-4">
            <button
              onClick={onShopClick}
              className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-3.5 bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/40 font-arabic text-xs sm:text-sm font-normal tracking-wide transition-all duration-300 hover:bg-[#0E224D] hover:border-[#C6A972] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[#C6A972] cursor-pointer"
            >
              <span>{isAr ? 'اكتشفي المجموعة' : 'Shop the Collection'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Details - Gentle boutique notes */}
        <div className="flex items-center justify-between text-xs font-arabic text-[#F8F5EE]/80 font-light pt-4 border-t border-[#F8F5EE]/15">
          <div className="hidden sm:block text-right">
            <p className="text-[#F8F5EE]">{isAr ? 'أقمشة مختارة بعناية' : 'Fine Selected Fabrics'}</p>
            <p className="text-[11px] text-[#C6A972]">{isAr ? 'كريب ناعم وأقمشة حريرية' : 'Soft crepe & fine silks'}</p>
          </div>

          <a
            href="#eid-collection"
            className="mx-auto sm:mx-0 flex items-center gap-2 hover:text-[#C6A972] transition-colors group cursor-pointer text-[12px]"
          >
            <span>{isAr ? 'استكشفي التصاميم' : 'Explore Designs'}</span>
            <ArrowDown size={13} className="group-hover:translate-y-1 transition-transform text-[#C6A972]" />
          </a>

          <div className="hidden sm:block text-left">
            <p className="text-[#F8F5EE]">{isAr ? 'إمكانية تعديل المقاس' : 'Custom Sizing'}</p>
            <p className="text-[11px] text-[#C6A972]">{isAr ? 'تفصيل الطول حسب طلبكِ' : 'Lengths 52" — 60"'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
