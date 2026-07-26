import React, { useState } from 'react';
import { Search, Flame, Leaf, Plus, ShoppingBag } from 'lucide-react';
import { categories } from '../data/restaurantData';
import { CategoryId, MenuItem } from '../types';
import { useData } from '../context/DataContext';

interface MenuListProps {
  onSelectItem: (item: MenuItem) => void;
  onOpenContactModal: () => void;
}

export const MenuList: React.FC<MenuListProps> = ({
  onSelectItem,
}) => {
  const { menuItems, addToCart } = useData();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('pizzalar');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setSearchQuery('');
  };

  return (
    <section id="menu" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sticky Category Nav Bar */}
        <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md py-4 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-zinc-100 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`menu-category-tab-${cat.id}`}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest whitespace-nowrap transition-all uppercase ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-100'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search bar inside menu */}
          <div className="mt-3 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Menüde ara (örn. Kavurmalı, Sufle, Ayran)..."
              className="w-full pl-11 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-full text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500 hover:text-zinc-900"
              >
                Temizle
              </button>
            )}
          </div>
        </div>

        {/* Current Active Category Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-red-600 rounded-full" />
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 italic uppercase">
            {categories.find((c) => c.id === selectedCategory)?.name || 'Tüm Menü'}
          </h2>
          <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider ml-auto">
            {filteredItems.length} Çeşit
          </span>
        </div>

        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs sm:text-sm text-amber-900 leading-relaxed">
          <strong>Güncel fiyat için:</strong> ürünleri teklif listenize ekleyin; toplam tutar ve teslimat süresi WhatsApp üzerinden onaylansın.
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-zinc-50 rounded-2xl border border-zinc-200">
            <p className="text-zinc-600 text-sm font-medium">Aramanızla eşleşen ürün bulunamadı.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('pizzalar');
              }}
              className="mt-4 text-xs text-red-600 font-bold uppercase tracking-wider underline"
            >
              Tüm Pizzaları Göster
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.badge && (
                        <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase shadow-sm">
                          {item.badge}
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="bg-zinc-900 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                          <Flame size={10} className="fill-red-500 text-red-500" /> Acılı
                        </span>
                      )}
                      {item.isVegetarian && (
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                          <Leaf size={10} className="fill-white" /> Vejetaryen
                        </span>
                      )}
                    </div>

                    {/* Top Right Badge */}
                    <div className={`absolute top-3 right-3 text-white font-black text-[10px] px-2.5 py-1 rounded-full uppercase shadow-md ${
                      item.category === 'icecekler'
                        ? 'bg-blue-600/90'
                        : item.category === 'tatlilar'
                        ? 'bg-amber-600/90'
                        : 'bg-red-600/90'
                    }`}>
                      {item.category === 'icecekler'
                        ? 'Buz Gibi Soğuk'
                        : item.category === 'tatlilar'
                        ? 'Taze & Nefis'
                        : 'Taze & Sıcak'}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-lg text-zinc-900 group-hover:text-red-600 transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    {item.ingredients && item.ingredients.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.ingredients.slice(0, 4).map((ing, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md font-medium"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-zinc-100 pt-3">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    {item.category === 'pizzalar' ? '3 Boy Seçeneği' : 'Taze Hazırlanır'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      id={`menu-item-cart-btn-${item.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item, 1);
                      }}
                      className="px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1"
                    >
                      <ShoppingBag size={14} />
                      <span>Ekle</span>
                    </button>

                    <button
                      id={`menu-item-order-btn-${item.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item);
                      }}
                      className="p-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
                      title="Detaylar"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
