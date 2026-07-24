import React from 'react';
import { Instagram, Phone, Share2 } from 'lucide-react';
import { useData } from '../context/DataContext';

interface FooterProps {
  onNavClick: (id: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenAdmin }) => {
  const { restaurantInfo } = useData();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: restaurantInfo.name,
        text: `${restaurantInfo.name} Silopi'nin en lezzetli odun ateşi pizzaları!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(`${restaurantInfo.name} Silopi web sitesi bağlantısı kopyalandı!`);
    }
  };

  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 pt-12 pb-24 md:pb-12 text-zinc-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 pb-10 border-b border-zinc-200">
          
          {/* Brand Info */}
          <div className="max-w-md text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-red-100">
                P
              </div>
              <span className="text-2xl font-black tracking-tighter text-red-600 uppercase italic">
                {restaurantInfo.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 font-medium">
              {restaurantInfo.name} Silopi olarak, her dilimde gerçek bir lezzet hikayesi sunuyoruz. Taze malzemeler ve ustalıkla hazırlanan menümüzle hizmetinizdeyiz.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-zinc-600">
            <button
              onClick={() => onNavClick('menu')}
              className="hover:text-red-600 transition-colors"
            >
              Menü
            </button>
            <button
              onClick={() => onNavClick('about')}
              className="hover:text-red-600 transition-colors"
            >
              Hakkımızda
            </button>
            <button
              onClick={() => onNavClick('contact')}
              className="hover:text-red-600 transition-colors"
            >
              İletişim
            </button>
          </div>

          {/* Social Circle Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              id="footer-share-btn"
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:text-red-600 hover:border-red-200 flex items-center justify-center shadow-sm transition-colors"
              aria-label="Paylaş"
            >
              <Share2 size={16} />
            </button>
            <a
              id="footer-instagram-btn"
              href={restaurantInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:text-red-600 hover:border-red-200 flex items-center justify-center shadow-sm transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              id="footer-phone-btn"
              href={`tel:${restaurantInfo.phone}`}
              className="w-10 h-10 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:text-red-600 hover:border-red-200 flex items-center justify-center shadow-sm transition-colors"
              aria-label="Telefon"
            >
              <Phone size={16} />
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 gap-2 font-medium">
          <p className="cursor-default select-none">
            © 2026 {restaurantInfo.name} Silopi. Tüm hakları saklıdır.{' '}
            <button 
              onClick={onOpenAdmin} 
              className="opacity-0 hover:opacity-10 transition-opacity text-zinc-900 cursor-default"
              title="Yönetici Girişi"
            >
              •
            </button>
          </p>
          <p className="text-zinc-500">{restaurantInfo.address}</p>
        </div>

      </div>
    </footer>
  );
};
