import React from 'react';
import { UtensilsCrossed, Info, PhoneCall, ShoppingBag, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

interface MobileBottomNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  setActiveSection,
  onOpenCart,
}) => {
  const { getCartCount, restaurantInfo } = useData();
  const cartCount = getCartCount();
  const cleanPhone = restaurantInfo.phone.replace(/[^0-9]/g, '');
  const whatsappPhone = cleanPhone.startsWith('90')
    ? cleanPhone
    : `90${cleanPhone.replace(/^0/, '')}`;
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    `Merhaba ${restaurantInfo.name}, menü ve güncel fiyat bilgisi almak istiyorum.`,
  )}`;

  const handleNav = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop cart shortcut */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <button
          id="floating-order-btn"
          onClick={onOpenCart}
          className="px-5 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm tracking-widest uppercase shadow-2xl shadow-red-300/60 border border-red-500 flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all group"
        >
          <ShoppingBag size={18} className="text-white animate-bounce" />
          <span>TEKLİF LİSTEM {cartCount > 0 && `(${cartCount})`}</span>
        </button>
      </div>

      {/* Desktop floating WhatsApp order button */}
      <a
        id="floating-whatsapp-order-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-24 right-8 z-40 px-5 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs tracking-widest uppercase shadow-2xl shadow-emerald-200/70 border border-emerald-400 items-center gap-2 transition-all hover:scale-105 active:scale-95"
      >
        <MessageCircle size={18} />
        <span>WHATSAPP'TAN FİYAT SOR</span>
      </a>

      {/* Persistent order call-to-action on mobile */}
      <a
        id="mobile-sticky-whatsapp-order-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-[4.25rem] left-4 right-4 z-40 min-h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs tracking-wider uppercase shadow-xl shadow-emerald-900/25 border border-emerald-400 flex items-center justify-center gap-2 transition-colors"
      >
        <MessageCircle size={18} />
        <span>WhatsApp'tan Fiyat Sor</span>
      </a>

      {/* Fixed Bottom Nav Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-4 py-2 flex items-center justify-around text-zinc-500">
        <button
          id="mobile-bottom-nav-menu"
          onClick={() => handleNav('menu')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            activeSection === 'menu' ? 'text-red-600 font-bold' : 'hover:text-zinc-900'
          }`}
        >
          <UtensilsCrossed size={18} />
          <span className="text-[10px] uppercase font-bold tracking-wider">Menü</span>
        </button>

        <button
          id="mobile-bottom-nav-cart"
          onClick={onOpenCart}
          className="flex flex-col items-center gap-0.5 transition-colors relative text-red-600 font-bold"
        >
          <div className="relative">
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider">Liste</span>
        </button>

        <button
          id="mobile-bottom-nav-about"
          onClick={() => handleNav('about')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            activeSection === 'about' ? 'text-red-600 font-bold' : 'hover:text-zinc-900'
          }`}
        >
          <Info size={18} />
          <span className="text-[10px] uppercase font-bold tracking-wider">Hakkımızda</span>
        </button>

        <button
          id="mobile-bottom-nav-contact"
          onClick={() => handleNav('contact')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            activeSection === 'contact' ? 'text-red-600 font-bold' : 'hover:text-zinc-900'
          }`}
        >
          <PhoneCall size={18} />
          <span className="text-[10px] uppercase font-bold tracking-wider">İletişim</span>
        </button>
      </nav>
    </>
  );
};
