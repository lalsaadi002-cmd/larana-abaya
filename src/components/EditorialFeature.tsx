import React, { useState } from 'react';
import { Ruler, Check, MessageSquare } from 'lucide-react';
import { Language } from '../types';

interface EditorialFeatureProps {
  language: Language;
}

export const EditorialFeature: React.FC<EditorialFeatureProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [consultRequested, setConsultRequested] = useState(false);
  const [clientPhone, setClientPhone] = useState('');

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientPhone.trim()) {
      setConsultRequested(true);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#EFE8DE] border-y border-[#0B1B3D]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Dual Visual Editorial (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 md:gap-5">
            <div className="space-y-3">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F5EE] border border-[#C6A972]/25">
                <img
                  src="/src/assets/images/collection_silk_abaya_1790831415378.jpg"
                  alt="LARANA Abaya Silk Drape"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />
              </div>
              <p className="text-[11px] font-arabic text-[#5A534B] text-center">
                {isAr ? 'انسيابية الكريب ونعومة القماش' : 'Fluid Crepe Drape'}
              </p>
            </div>

            <div className="space-y-3 pt-6">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F5EE] border border-[#C6A972]/25">
                <img
                  src="/src/assets/images/collection_embroidered_abaya_1790831427134.jpg"
                  alt="LARANA Abaya Details"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />
              </div>
              <p className="text-[11px] font-arabic text-[#5A534B] text-center">
                {isAr ? 'تفاصيل التطريز الهادئ' : 'Subtle Embroidery'}
              </p>
            </div>
          </div>

          {/* Right Boutique Assistance Information (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-arabic text-[#5A534B] tracking-wider block">
                {isAr ? 'خدمة المقاسات والتفصيل' : 'SIZING & CUSTOM ADJUSTMENTS'}
              </span>
              <h2 className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#0B1B3D] font-normal leading-tight">
                {isAr ? 'تفصيل يراعي طولكِ ومقاسكِ المثالي' : 'Custom Sizing Tailored to Your Preference'}
              </h2>
            </div>

            <p className="font-arabic text-xs sm:text-sm text-[#5A534B] font-light leading-relaxed">
              {isAr
                ? 'ندرك أن لكل سيدة مقاسها الخاص والمريح لها. نوفر لكِ إمكانية اختيار الطول المناسب بدقة من ٥٢ إلى ٦٠ إنش، مع إمكانية تعديل الأكمام والقصّة بناءً على طلبكِ عبر الواتساب.'
                : 'We understand that every woman has her distinct comfort fit. We offer lengths from 52" to 60", along with sleeve or fit consultations directly via WhatsApp.'}
            </p>

            <div className="space-y-3.5 pt-1">
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-[#F8F5EE] border border-[#C6A972]/30 text-[#0B1B3D] shrink-0 mt-0.5">
                  <Ruler size={15} />
                </div>
                <div>
                  <h4 className="font-arabic text-xs font-medium text-[#0B1B3D]">
                    {isAr ? 'تحديد الطول المناسب' : 'Accurate Length Selection'}
                  </h4>
                  <p className="font-arabic text-xs text-[#5A534B] font-light mt-0.5">
                    {isAr ? 'اختيار مقاس العباية من ٥٢، ٥٤، ٥٦، ٥٨، ٦٠ إنش بسهولة.' : 'Choose your abaya length from 52" to 60" with ease.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-[#F8F5EE] border border-[#C6A972]/30 text-[#0B1B3D] shrink-0 mt-0.5">
                  <MessageSquare size={15} />
                </div>
                <div>
                  <h4 className="font-arabic text-xs font-medium text-[#0B1B3D]">
                    {isAr ? 'استشارة تنسيق ومساعدة فورية' : 'Direct Styling Assistance'}
                  </h4>
                  <p className="font-arabic text-xs text-[#5A534B] font-light mt-0.5">
                    {isAr ? 'فريق لارانا جاهز لمساعدتكِ في اختيار التصميم المناسب لذوقكِ.' : 'Our team is ready to assist you in selecting the ideal cut for your occasion.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Connect Box in Soft Warm Ivory */}
            <div className="p-5 sm:p-6 bg-[#F8F5EE] border border-[#C6A972]/40 space-y-3 mt-2">
              <h5 className="font-arabic text-sm sm:text-base font-medium text-[#0B1B3D]">
                {isAr ? 'هل لديكِ استفسار حول مقاس معين؟' : 'Have a sizing question?'}
              </h5>
              <p className="font-arabic text-xs text-[#5A534B] font-light">
                {isAr
                  ? 'اتركي رقمكِ للتواصل عبر الواتساب وسنقوم بمساعدتكِ في اختيار المقاس المناسب.'
                  : 'Leave your mobile number for quick WhatsApp assistance from our team in Muscat.'}
              </p>

              {consultRequested ? (
                <div className="p-3.5 bg-[#0B1B3D] text-[#F8F5EE] text-xs font-arabic flex items-center gap-2 border border-[#C6A972]/30">
                  <Check size={15} className="text-[#C6A972]" />
                  <span>{isAr ? 'شكراً لكِ، سنتواصل معكِ عبر الواتساب قريباً.' : 'Thank you. We will reach out via WhatsApp shortly.'}</span>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="tel"
                    placeholder={isAr ? 'رقم الهاتف / الواتساب (مثال: 9123 4567 968+)' : 'Mobile / WhatsApp number'}
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    required
                    className="flex-1 px-3.5 py-2.5 bg-[#EFE8DE] border border-[#C6A972]/40 text-xs text-[#0B1B3D] font-arabic focus:outline-none focus:border-[#0B1B3D]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/40 font-arabic text-xs font-normal hover:bg-[#0E224D] transition-colors whitespace-nowrap cursor-pointer shadow-sm"
                  >
                    {isAr ? 'تواصل معنا' : 'Connect'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
