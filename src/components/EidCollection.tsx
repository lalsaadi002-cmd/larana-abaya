import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface EidCollectionProps {
  language: Language;
  onExploreClick?: () => void;
}

export const EidCollection: React.FC<EidCollectionProps> = ({ language, onExploreClick }) => {
  const isAr = language === 'ar';

  const placeholders = [
    {
      id: 'eid-look-1',
      titleAr: 'إطلالة العيد الأولى',
      titleEn: 'Eid Look I',
      subtitleAr: 'حرير وكريب بانسيابية هادئة',
      subtitleEn: 'Fluid Crepe & Silk Drape',
      image: '/src/assets/images/eid_collection_portrait_1790834996841.jpg',
      tagAr: 'تصميم خاص بالعيد',
      tagEn: 'Eid Edition',
    },
    {
      id: 'eid-look-2',
      titleAr: 'إطلالة العيد الثانية',
      titleEn: 'Eid Look II',
      subtitleAr: 'تفاصيل ناعمة وقصّة راقية',
      subtitleEn: 'Refined Silhouette & Detail',
      image: '/src/assets/images/collection_silk_abaya_1790831415378.jpg',
      tagAr: 'تصميم خاص بالعيد',
      tagEn: 'Eid Edition',
    },
    {
      id: 'eid-look-3',
      titleAr: 'إطلالة العيد الثالثة',
      titleEn: 'Eid Look III',
      subtitleAr: 'تطريز هادئ ومريح للمناسبات',
      subtitleEn: 'Subtle Occasion Embroidery',
      image: '/src/assets/images/collection_embroidered_abaya_1790831427134.jpg',
      tagAr: 'تصميم خاص بالعيد',
      tagEn: 'Eid Edition',
    },
  ];

  return (
    <section id="eid-collection" className="py-20 md:py-28 bg-[#EFE8DE] border-y border-[#0B1B3D]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header - Arabic Dominant & English Secondary */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-arabic text-[#5A534B] tracking-wider">
            <Sparkles size={13} className="text-[#C6A972]" />
            <span>{isAr ? 'إصدار موسمي خاص' : 'SEASONAL CAMPAIGN'}</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h2 className="font-arabic text-3xl sm:text-4xl md:text-5xl font-normal text-[#0B1B3D] tracking-tight">
              {isAr ? 'كولكشن العيد' : 'Eid Collection'}
            </h2>
            <span className="font-serif text-xs sm:text-sm text-[#C6A972] tracking-[0.25em] uppercase font-light">
              {isAr ? 'EID COLLECTION' : 'كولكشن العيد'}
            </span>
          </div>

          <p className="font-arabic text-base sm:text-lg text-[#0B1B3D] font-light max-w-lg mx-auto pt-1 leading-relaxed">
            {isAr ? 'أناقة تليق بأجمل مناسباتك' : 'Elegance Befitting Your Most Cherished Occasions'}
          </p>

          <div className="h-[1px] w-12 bg-[#C6A972] mx-auto pt-1" />
        </div>

        {/* Large Editorial Fashion Campaign Hero Banner */}
        <div className="relative mb-14 overflow-hidden bg-[#F8F5EE] border border-[#C6A972]/30 group">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src="/src/assets/images/eid_collection_campaign_1790834984748.jpg"
              alt={isAr ? 'كولكشن العيد · لارانا ستور' : 'Larana Store Eid Collection Campaign'}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-102"
            />
            {/* Soft Warm Vignette Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/80 via-[#0B1B3D]/25 to-transparent pointer-events-none" />

            {/* Campaign Overlay Details */}
            <div className="absolute inset-0 p-6 sm:p-10 md:p-14 flex flex-col justify-end text-[#F8F5EE]">
              <div className="max-w-xl space-y-3">
                <span className="text-[11px] font-arabic px-3 py-1 bg-[#0B1B3D]/90 border border-[#C6A972]/40 text-[#F8F5EE] inline-block">
                  {isAr ? 'حملة العيد الحصرية' : 'Exclusive Eid Campaign'}
                </span>
                <h3 className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#F8F5EE] font-normal leading-snug">
                  {isAr ? 'قصّات أنثوية انسيابية صُممت لتُكمل بهجة العيد' : 'Fluid silhouettes tailored to celebrate the spirit of Eid'}
                </h3>
                <p className="font-arabic text-xs sm:text-sm text-[#F8F5EE]/85 font-light leading-relaxed max-w-md">
                  {isAr
                    ? 'مجموعة منتقاة من العبايات الفاخرة ذات الأقمشة المريحة والخفيفة لتمنحكِ حضوراً هادئاً وراقياً في أيام العيد.'
                    : 'A curated selection of luxury abayas tailored from breathable fine fabrics for an effortless, poised festive presence.'}
                </p>
                <div className="pt-2">
                  <button
                    onClick={onExploreClick}
                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#F8F5EE] text-[#0B1B3D] font-arabic text-xs font-medium border border-[#C6A972]/40 hover:bg-[#FAF7F2] transition-colors cursor-pointer shadow-md"
                  >
                    <span>{isAr ? 'اكتشفي كولكشن العيد' : 'Explore Eid Collection'}</span>
                    {isAr ? <ArrowLeft size={14} className="text-[#0B1B3D]" /> : <ArrowRight size={14} className="text-[#0B1B3D]" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Distinctive Editorial Preview Cards (Placeholders until full catalog arrives) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {placeholders.map((item) => (
            <div
              key={item.id}
              className="group bg-[#F8F5EE] border border-[#C6A972]/25 overflow-hidden transition-all duration-300 flex flex-col"
            >
              {/* Product Visual Placeholder */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EFE8DE]">
                <img
                  src={item.image}
                  alt={isAr ? item.titleAr : item.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                />

                {/* Subtle Eid Tag in Navy */}
                <div className="absolute top-4 right-4 text-[10px] font-arabic text-[#F8F5EE] bg-[#0B1B3D] border border-[#C6A972]/30 px-2.5 py-1">
                  {isAr ? item.tagAr : item.tagEn}
                </div>
              </div>

              {/* Information Frame */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-arabic text-[#C6A972] block">
                    {isAr ? 'كولكشن العيد · LARANA' : 'EID COLLECTION · LARANA'}
                  </span>
                  <h4 className="font-arabic text-base sm:text-lg text-[#0B1B3D]">
                    {isAr ? item.titleAr : item.titleEn}
                  </h4>
                  <p className="font-arabic text-xs text-[#5A534B] font-light">
                    {isAr ? item.subtitleAr : item.subtitleEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#0B1B3D]/10 flex items-center justify-between">
                  <span className="text-[11px] font-arabic text-[#5A534B]">
                    {isAr ? 'تصميم حصري ومقاسات مخصصة' : 'Custom Tailoring Available'}
                  </span>
                  <span className="text-xs font-arabic text-[#0B1B3D] font-medium flex items-center gap-1">
                    <span>{isAr ? 'معاينة' : 'Preview'}</span>
                    <ArrowLeft size={12} className="text-[#C6A972]" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Refined Bottom CTA Button */}
        <div className="text-center pt-12">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#0B1B3D] text-[#F8F5EE] font-arabic text-xs font-normal border border-[#C6A972]/40 hover:bg-[#0E224D] transition-colors cursor-pointer shadow-md"
          >
            <span>{isAr ? 'اكتشفي كولكشن العيد' : 'Explore Eid Collection'}</span>
            {isAr ? <ArrowLeft size={14} className="text-[#C6A972]" /> : <ArrowRight size={14} className="text-[#C6A972]" />}
          </button>
        </div>
      </div>
    </section>
  );
};
