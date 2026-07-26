import React from 'react';
import { ArrowRight, Clock, Utensils, Star, Flame, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

interface HeroProps {
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu }) => {
  const { restaurantInfo, heroContent } = useData();
  const cleanPhone = restaurantInfo.phone.replace(/[^0-9]/g, '');
  const whatsappPhone = cleanPhone.startsWith('90')
    ? cleanPhone
    : `90${cleanPhone.replace(/^0/, '')}`;
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    `Merhaba ${restaurantInfo.name}, menü ve güncel fiyat bilgisi almak istiyorum.`,
  )}`;

  return (
    <section id="hero" className="relative py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-900 rounded-3xl p-6 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
          {/* Subtle accent backdrop */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center text-center max-w-2xl mx-auto relative z-10">
            
            {/* Pizza Arch Image Frame */}
            <div className="relative mb-8 w-full max-w-xs sm:max-w-sm">
              <div className="relative mx-auto w-56 h-72 sm:w-64 sm:h-80 rounded-t-full overflow-hidden border-2 border-red-500/40 shadow-2xl bg-zinc-800">
                <img
                  src={heroContent.imageUrl || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop"}
                  alt="PizzaLive Silopi Odun Ateşi Pizza"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-70" />
              </div>

              {/* Rating floating pill */}
              <div className="absolute top-8 right-2 bg-white text-zinc-900 border border-zinc-200 px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="font-black text-sm">{restaurantInfo.rating}</span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                  PUAN
                </span>
              </div>

              {/* Silopi'nin En İyisi Tag */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-black uppercase tracking-wider whitespace-nowrap">
                <Flame size={14} className="fill-white" />
                <span>{heroContent.badgeText || "SİLOPİ'NİN EN İYİSİ"}</span>
              </div>
            </div>

            {/* Hero Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight italic uppercase leading-tight mt-2 mb-4">
              {heroContent.titleLine1 || "Lezzetin En"} <span className="text-red-500">{heroContent.titleHighlight || "Sıcak"}</span> Hali!
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-medium">
              {heroContent.subtitle || "Taze malzemeler, özel hamur ve odun ateşinin lezzeti. Silopi'nin en sevilen pizzasını keşfedin."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full max-w-md justify-center mb-10">
              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 group"
              >
                <span>MENÜYÜ İNCELE</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                id="hero-whatsapp-order-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-950/30"
              >
                <MessageCircle size={16} />
                <span>WHATSAPP'TAN FİYAT SOR</span>
              </a>
            </div>

            {/* Feature Highlight Cards */}
            <div className="grid grid-cols-2 gap-3.5 w-full max-w-md">
              <div className="bg-zinc-800/80 border border-zinc-700/60 p-4 rounded-2xl text-left flex items-start gap-3">
                <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider">Hızlı Teslimat</h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Sıcak ve taze kapınızda.</p>
                </div>
              </div>

              <div className="bg-zinc-800/80 border border-zinc-700/60 p-4 rounded-2xl text-left flex items-start gap-3">
                <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
                  <Utensils size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider">El Yapımı</h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Özel reçeteli hamur.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
