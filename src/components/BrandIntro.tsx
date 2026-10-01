import React from 'react';
import { Language } from '../types';
import { OmanFlag } from './OmanFlag';

interface BrandIntroProps {
  language: Language;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <section id="atelier-story" className="py-20 md:py-28 bg-[#EFE8DE] border-y border-[#0B1B3D]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Visual Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden bg-[#F8F5EE] border border-[#C6A972]/25">
              <img
                src="/src/assets/images/craftsmanship_atelier_fabric_1790831438705.jpg"
                alt="LARANA Design Craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Overlaid Soft Accent Card in Warm Ivory */}
            <div className="mt-4 p-4 sm:p-5 bg-[#F8F5EE] border border-[#C6A972]/30 flex items-center justify-center text-xs font-arabic">
              <div className="text-center">
                <p className="text-[#5A534B] text-[11px]">{isAr ? 'رؤية البراند' : 'Identity'}</p>
                <p className="font-arabic font-medium text-[#0B1B3D]">{isAr ? 'أناقة تُصمّم لتبقى' : 'Timeless Elegance'}</p>
              </div>
            </div>
          </div>

          {/* Narrative & Philosophy (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-arabic text-[#5A534B] tracking-wider block">
                {isAr ? 'عن لارانا · LARANA STORE' : 'ABOUT LARANA'}
              </span>
              <h2 className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#0B1B3D] font-normal leading-tight">
                {isAr ? 'أناقة هادئة تُصاغ بكل حب' : 'Quiet Elegance Crafted with Care'}
              </h2>
              <p className="font-arabic text-sm text-[#0B1B3D] font-normal flex items-center gap-1.5">
                <span>{isAr ? 'من دارنا' : 'From Our Atelier'}</span>
                <OmanFlag className="w-[20px] h-[13px]" />
              </p>
            </div>

            <div className="space-y-4 font-arabic text-xs sm:text-sm font-light text-[#5A534B] leading-relaxed max-w-2xl">
              <p className="flex items-center flex-wrap gap-1.5">
                <span>{isAr ? 'انطلقت علامة لارانا (LARANA) من دارنا' : 'Founded in our atelier'}</span>
                <OmanFlag className="w-[18px] h-[12px]" />
                <span>{isAr ? 'برؤية تنبض بالنعومة والأنوثة، لتقدّم للمرأة العصرية عبايات تجمع بين الحشمة الراقية والتصميم العصري المريح.' : 'with a vision that blends refined modesty with effortless modern comfort.'}</span>
              </p>
              <p>
                {isAr
                  ? 'نحرص في كل تصميم على انتقاء أقمشة عالية الجودة كالـكريب الياباني الانسيابي والأورجانزا الخفيفة، مع الاهتمام بأدق تفاصيل الخياطة والقصّات المتقنة التي تمنحكِ ثقة وراحة تدوم.'
                  : 'In every creation, we select high-quality fabrics such as fluid Japanese crepe and lightweight organza, focusing on neat stitching and flattering cuts that offer lasting comfort.'}
              </p>
            </div>

            {/* 3 Authentic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-3 border-t border-[#0B1B3D]/15">
              <div className="space-y-1">
                <span className="text-[11px] font-arabic font-medium text-[#0B1B3D] block">
                  {isAr ? 'أقمشة فاخرة ومريحة' : 'Comfortable Luxury'}
                </span>
                <p className="text-xs font-arabic text-[#5A534B] font-light leading-relaxed">
                  {isAr ? 'كريب ناعم مريح وخفيف في اللبس اليومي والمناسبات.' : 'Fine crepes and breathable weaves for everyday comfort.'}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-arabic font-medium text-[#0B1B3D] block">
                  {isAr ? 'تفصيل الطول حسب طلبكِ' : 'Custom Lengths'}
                </span>
                <p className="text-xs font-arabic text-[#5A534B] font-light leading-relaxed">
                  {isAr ? 'توفير مقاسات من ٥٢ إلى ٦٠ لتناسب طولكِ بدقة.' : 'Available in standard lengths 52" to 60" upon request.'}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-arabic font-medium text-[#0B1B3D] block">
                  {isAr ? 'خدمة مخصصة وقريبة' : 'Direct Assistance'}
                </span>
                <p className="text-xs font-arabic text-[#5A534B] font-light leading-relaxed">
                  {isAr ? 'تواصل مباشر وسريع للإجابة عن استفساراتكِ ومساعدتكِ في الاختيار.' : 'Direct assistance to help you pick the perfect design.'}
                </p>
              </div>
            </div>

            {/* Signature Quote */}
            <div className="pt-2">
              <blockquote className="font-arabic text-sm sm:text-base text-[#0B1B3D] border-r-2 border-[#C6A972] pr-4 py-1 leading-relaxed">
                {isAr
                  ? '«نحن لا نبتكر مجرد عباية، بل نصمم قطعة تُشبهكِ وتُرافق أجمل لحظاتكِ.»'
                  : '"We do not just create an abaya; we craft a piece that reflects your essence and accompanies your cherished memories."'}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
