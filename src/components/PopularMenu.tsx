import React from 'react';
import { Plus, ArrowRight, Star, Flame, ShoppingBag } from 'lucide-react';
import { chefPicks } from '../data/restaurantData';
import { MenuItem } from '../types';
import { useData } from '../context/DataContext';

interface PopularMenuProps {
  onSelectItem: (item: MenuItem) => void;
  onExploreFullMenu: () => void;
  onOpenContactModal: () => void;
}

export const PopularMenu: React.FC<PopularMenuProps> = ({
  onSelectItem,
  onExploreFullMenu,
  onOpenContactModal,
}) => {
  const { menuItems, addToCart } = useData();
  const popularItems = menuItems.filter((item) => item.popular);

  return (
    <section id="popular" className="py-12 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-red-600">
            USTA İŞİ LEZZETLER
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 uppercase italic mt-1 mb-2">
            Popüler Menümüz
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base max-w-xl font-medium">
            PizzaLive Silopi mutfağından çıkan, odun ateşinde pişmiş en sevilen tariflerimizi keşfedin.
          </p>
        </div>

        {/* Featured Popular Item Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {popularItems.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="relative h-96 rounded-2xl overflow-hidden border border-zinc-200 group shadow-md bg-white cursor-pointer"
              onClick={() => onSelectItem(item)}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              {/* Dark Gradient Overlay for legible text */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />

              {/* Top Badge */}
              {item.badge && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  {item.badge.includes('TERCİH') ? <Star size={12} className="fill-white" /> : <Flame size={12} className="fill-white" />}
                  <span>{item.badge}</span>
                </div>
              )}

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
                <div className="flex items-end justify-between mb-1">
                  <h3 className="text-2xl font-black text-white italic uppercase">
                    {item.name}
                  </h3>
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, 1);
                    }}
                    className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
                  >
                    <ShoppingBag size={14} />
                    <span>TEKLİF LİSTESİNE EKLE</span>
                  </button>

                  <button
                    id={`popular-item-plus-btn-${item.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectItem(item);
                    }}
                    className="w-10 h-10 rounded-full bg-white text-zinc-900 hover:bg-zinc-100 flex items-center justify-center transition-all shadow-lg hover:scale-110"
                    aria-label={`${item.name} Detayı ve Sipariş`}
                    title="Detay Gör"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chef's Other Choices Box */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-2xl font-black text-zinc-900 uppercase italic mb-6">
            Şefin Diğer Seçimleri
          </h3>

          <div className="space-y-4 mb-6">
            {chefPicks.map((pick, idx) => (
              <div
                key={idx}
                onClick={onOpenContactModal}
                className="flex items-center justify-between pb-3 border-b border-zinc-100 cursor-pointer group hover:border-red-600 transition-colors"
              >
                <div>
                  <h4 className="text-base font-bold text-zinc-900 group-hover:text-red-600 transition-colors">
                    {pick.name}
                  </h4>
                  <p className="text-xs text-zinc-500">{pick.tagline}</p>
                </div>

                <button className="text-xs font-bold text-red-600 group-hover:text-red-700 transition-colors uppercase tracking-wider">
                  Fiyat Sor →
                </button>
              </div>
            ))}
          </div>

          <button
            id="popular-view-all-menu-btn"
            onClick={onExploreFullMenu}
            className="w-full py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <span>TÜM MENÜYÜ İNCELE</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};
