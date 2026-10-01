import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Language } from '../types';

interface NewsletterProps {
  language: Language;
}

export const Newsletter: React.FC<NewsletterProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8F5EE] border-t border-[#0B1B3D]/10">
      <div className="max-w-2xl mx-auto px-5 text-center space-y-4">
        <span className="text-xs font-arabic text-[#5A534B] tracking-wider block">
          {isAr ? 'تواصل دائم' : 'STAY CONNECTED'}
        </span>

        <h2 className="font-arabic text-2xl sm:text-3xl md:text-4xl font-normal text-[#0B1B3D]">
          {isAr ? 'تابعي جديد إطلاقات لارانا' : 'Stay in Touch with Larana'}
        </h2>

        <p className="font-arabic text-xs sm:text-sm text-[#5A534B] font-light max-w-lg mx-auto leading-relaxed">
          {isAr
            ? 'سجلي بريدكِ لتكوني أول من يتعرّف على مجموعات العبايات الجديدة وإعلانات المواسم.'
            : 'Subscribe to receive quiet notifications of new abaya releases and seasonal announcements.'}
        </p>

        <div className="pt-3 max-w-md mx-auto">
          {subscribed ? (
            <div className="p-3.5 bg-[#EFE8DE] border border-[#C6A972]/40 text-[#0B1B3D] text-xs font-arabic flex items-center justify-center gap-2">
              <Check size={15} className="text-[#C6A972]" />
              <span>{isAr ? 'شكراً لانضمامكِ، سنوافيكِ بجديدنا دائماً.' : 'Thank you for joining Larana.'}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex border-b border-[#0B1B3D]/40 pb-1.5">
              <input
                type="email"
                placeholder={isAr ? 'أدخلي بريدكِ الإلكتروني' : 'Enter your email address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-xs sm:text-sm font-arabic text-[#0B1B3D] placeholder-[#5A534B]/50 focus:outline-none px-2 py-1.5"
              />
              <button
                type="submit"
                className="text-xs font-arabic text-[#0B1B3D] hover:text-[#0E224D] transition-colors flex items-center gap-1.5 shrink-0 px-2 cursor-pointer font-medium"
              >
                <span>{isAr ? 'اشتراك' : 'Subscribe'}</span>
                {isAr ? <ArrowLeft size={13} className="text-[#C6A972]" /> : <ArrowRight size={13} className="text-[#C6A972]" />}
              </button>
            </form>
          )}
          <p className="text-[10px] font-arabic text-[#5A534B]/70 mt-2">
            {isAr ? 'نحترم خصوصيتكِ تماماً وبإمكانكِ إلغاء الاشتراك في أي وقت.' : 'We respect your privacy. Unsubscribe anytime.'}
          </p>
        </div>
      </div>
    </section>
  );
};
