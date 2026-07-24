import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Flame, Leaf, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { useData } from '../context/DataContext';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onOpenCart?: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onOpenCart }) => {
  const { addToCart } = useData();
  const [selectedSize, setSelectedSize] = useState('Orta');
  const [quantity, setQuantity] = useState(1);
  const [orderNote, setOrderNote] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!item) return null;

  let unitPrice = item.price || 0;
  if (item.category === 'pizzalar') {
    if (selectedSize === 'Küçük') unitPrice = Math.round(unitPrice * 0.8);
    if (selectedSize === 'Büyük') unitPrice = Math.round(unitPrice * 1.3);
  }
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(item, quantity, selectedSize, orderNote);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
      if (onOpenCart) onOpenCart();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-zinc-200 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative my-8 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Close button */}
        <button
          id="item-modal-close-btn"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 text-zinc-700 hover:text-zinc-900 transition-colors shadow-md"
          aria-label="Kapat"
        >
          <X size={20} />
        </button>

        {/* Modal Image */}
        <div className="relative h-52 sm:h-60 w-full bg-zinc-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {item.badge && (
              <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-md uppercase shadow-sm">
                {item.badge}
              </span>
            )}
            {item.isSpicy && (
              <span className="bg-zinc-900 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                <Flame size={12} className="fill-red-500 text-red-500" /> Acılı
              </span>
            )}
            {item.isVegetarian && (
              <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                <Leaf size={12} className="fill-white" /> Vejetaryen
              </span>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-2xl font-black text-zinc-900 uppercase italic">
              {item.name}
            </h3>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full shrink-0 border ${
              item.category === 'icecekler'
                ? 'text-blue-600 bg-blue-50 border-blue-200'
                : item.category === 'tatlilar'
                ? 'text-amber-600 bg-amber-50 border-amber-200'
                : 'text-red-600 bg-red-50 border-red-200'
            }`}>
              {item.category === 'icecekler'
                ? 'Buz Gibi Soğuk'
                : item.category === 'tatlilar'
                ? 'Taze & Nefis'
                : 'Sıcak & Taze'}
            </span>
          </div>

          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed font-medium">
            {item.description}
          </p>

          {/* Pizza Size Selector */}
          {item.category === 'pizzalar' && (
            <div>
              <span className="text-xs font-black text-zinc-900 uppercase tracking-wider block mb-2">
                Boyut Seçimi:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {['Küçük', 'Orta', 'Büyük'].map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                        isSelected
                          ? 'border-red-600 bg-red-50 text-red-600 shadow-sm'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Ingredients list */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <span className="text-[11px] font-black text-zinc-400 uppercase tracking-widest block mb-2">
                MALZEMELER:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs bg-zinc-100 text-zinc-700 font-medium px-3 py-1 rounded-md"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-black text-zinc-900 uppercase tracking-wider">
              Adet:
            </span>

            <div className="flex items-center gap-3 bg-zinc-100 p-1.5 rounded-xl border border-zinc-200">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white text-zinc-800 flex items-center justify-center font-bold shadow-xs hover:bg-zinc-200"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-black px-2 min-w-[24px] text-center text-zinc-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white text-zinc-800 flex items-center justify-center font-bold shadow-xs hover:bg-zinc-200"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Optional Note */}
          <div>
            <input
              type="text"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="Özel istek / not (örn. Acısız olsun)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 bg-zinc-50"
            />
          </div>

          {addedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-center gap-2 font-bold animate-in fade-in">
              <Check size={16} className="text-emerald-600" />
              <span>Ürün sepetinize eklendi!</span>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-red-100 flex items-center justify-center gap-2 transition-all mt-4"
          >
            <ShoppingBag size={18} />
            <span>SEPETE EKLE</span>
          </button>

        </div>

      </div>
    </div>
  );
};
