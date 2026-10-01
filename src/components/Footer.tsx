import React from 'react';
import { MapPin, Mail, Clock, MessageSquare, Instagram } from 'lucide-react';
import { Language } from '../types';
import { LaranaLogo } from './LaranaLogo';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <footer id="contact" className="bg-[#0B1B3D] text-[#F8F5EE] pt-16 pb-10 border-t border-[#C6A972]/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-[#C6A972]/20">
          {/* Col 1: Official Brand Logo & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <LaranaLogo variant="inline" className="h-11 w-auto" />
              <span className="font-arabic text-[11px] text-[#C6A972] tracking-wider block mt-1">
                {isAr ? 'دار أزياء عُمانية معاصرة' : 'Contemporary Omani Fashion House'}
              </span>
            </div>
            <p className="font-arabic text-xs sm:text-sm text-[#F8F5EE]/75 font-light leading-relaxed max-w-sm">
              {isAr
                ? 'علامة أزياء عُمانية متخصصة في تصميم العبايات الفاخرة بقصّات أنيقة وأقمشة راقية تُرافق إطلالتكِ في كل مناسبة.'
                : 'An Omani brand dedicated to thoughtful abaya design with graceful silhouettes and comfortable fabrics.'}
            </p>
            <div className="pt-1">
              <p className="font-arabic text-xs text-[#F8F5EE]/90 font-light flex items-center gap-2">
                <MapPin size={13} className="text-[#C6A972]" />
                <span>{isAr ? 'مسقط · سلطنة عُمان' : 'Muscat, Sultanate of Oman'}</span>
              </p>
            </div>
          </div>

          {/* Col 2: The Collections (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-arabic text-xs font-medium text-[#C6A972]">
              {isAr ? 'المجموعات والتصاميم' : 'Collections'}
            </h4>
            <ul className="space-y-2 text-xs font-arabic text-[#F8F5EE]/70 font-light">
              <li>
                <a href="#eid-collection" className="hover:text-[#C6A972] transition-colors">
                  {isAr ? 'كولكشن العيد' : 'Eid Collection'}
                </a>
              </li>
              <li>
                <a href="#new-collection" className="hover:text-[#C6A972] transition-colors">
                  {isAr ? 'المجموعة الجديدة' : 'New Collection'}
                </a>
              </li>
              <li>
                <a href="#best-sellers" className="hover:text-[#C6A972] transition-colors">
                  {isAr ? 'الأكثر طلباً' : 'Best Sellers'}
                </a>
              </li>
              <li>
                <a href="#atelier-story" className="hover:text-[#C6A972] transition-colors">
                  {isAr ? 'عن لارانا وفلسفتنا' : 'About Larana'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Assistance & Care (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-arabic text-xs font-medium text-[#C6A972]">
              {isAr ? 'المساعدة' : 'Assistance'}
            </h4>
            <ul className="space-y-2 text-xs font-arabic text-[#F8F5EE]/70 font-light">
              <li>
                <a href="#atelier-story" className="hover:text-[#C6A972] transition-colors">
                  {isAr ? 'دليل المقاسات' : 'Size Guide'}
                </a>
              </li>
              <li>
                <a href="#atelier-story" className="hover:text-[#C6A972] transition-colors">
                  {isAr ? 'تفصيل الطول' : 'Custom Lengths'}
                </a>
              </li>
              <li>
                <a href="#atelier-story" className="hover:text-[#C6A972] transition-colors">
                  {isAr ? 'العناية بالأقمشة' : 'Fabric Care'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-arabic text-xs font-medium text-[#C6A972]">
              {isAr ? 'تواصل معنا' : 'Contact Us'}
            </h4>
            <div className="space-y-2.5 text-xs font-arabic text-[#F8F5EE]/85 font-light">
              <div className="flex items-center gap-2">
                <MessageSquare size={13} className="text-[#C6A972] shrink-0" />
                <span>الواتساب: 4882 9200 968+</span>
              </div>

              <div className="flex items-center gap-2">
                <Instagram size={13} className="text-[#C6A972] shrink-0" />
                <span>إنستغرام: @laranastore.om</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#C6A972] shrink-0" />
                <span>info@laranastore.om</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#F8F5EE]/60 pt-1">
                <Clock size={12} className="text-[#C6A972] shrink-0" />
                <span>{isAr ? 'السبت - الخميس: ٩:٠٠ ص - ٩:٠٠ م' : 'Sat - Thu: 9:00 AM - 9:00 PM'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Subtle note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-arabic text-[#F8F5EE]/50">
          <div>
            <span>{isAr ? '© ٢٠٢٦ لارانا ستور (LARANA STORE). جميع الحقوق محفوظة.' : '© 2026 LARANA STORE. All rights reserved.'}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#C6A972]">
            <span>{isAr ? 'صُنعت بحب في سلطنة عُمان' : 'Crafted with care in the Sultanate of Oman'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
