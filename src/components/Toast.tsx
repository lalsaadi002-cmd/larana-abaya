import React, { useEffect } from 'react';
import { Check, Heart } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'cart' | 'wishlist';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'cart', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-[#0B1B3D] text-[#F8F5EE] px-4 py-3 shadow-xl border border-[#C6A972]/40 flex items-center gap-2.5 text-xs font-arabic">
        {type === 'wishlist' ? (
          <Heart size={14} className="text-[#C6A972] fill-current" />
        ) : (
          <Check size={14} className="text-[#C6A972]" />
        )}
        <span className="font-light">{message}</span>
      </div>
    </div>
  );
};
