import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Phone, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { useData } from '../context/DataContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreMenu?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onExploreMenu,
}) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    restaurantInfo,
  } = useData();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [orderSentSuccess, setOrderSentSuccess] = useState(false);

  if (!isOpen) return null;

  const totalAmount = getCartTotal();
  const itemCount = getCartCount();

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    let itemsText = cart
      .map((c) => {
        const sizeStr = c.selectedSize ? ` (${c.selectedSize} Boy)` : '';
        const noteStr = c.note ? ` [Not: ${c.note}]` : '';
        return `• ${c.item.name}${sizeStr} x${c.quantity}${noteStr}`;
      })
      .join('\n');

    let text = `*PIZZALIVE SİLOPİ - YENİ SİPARİŞ*\n\n`;
    text += `*Sipariş Edilen Ürünler:*\n${itemsText}\n\n`;
    text += `*Soru / Ücret:* Bunların ücreti ne kadar?\n\n`;
    text += `*Müşteri & Teslimat Bilgileri:*\n`;
    if (customerName) text += `• *Ad Soyad:* ${customerName}\n`;
    if (customerPhone) text += `• *Telefon:* ${customerPhone}\n`;
    if (customerAddress) text += `• *Adres:* ${customerAddress}\n`;
    if (orderNote) text += `• *Sipariş Notu:* ${orderNote}\n`;

    const encodedText = encodeURIComponent(text);
    const cleanPhone = restaurantInfo.phone.replace(/[^0-9]/g, '');
    const waPhone = cleanPhone.startsWith('90') ? cleanPhone : `90${cleanPhone.replace(/^0/, '')}`;
    const waUrl = `https://wa.me/${waPhone}?text=${encodedText}`;

    window.open(waUrl, '_blank');
    setOrderSentSuccess(true);
    setTimeout(() => {
      setOrderSentSuccess(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200 flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-red-50 text-red-600">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-zinc-900 uppercase italic">
                Sepetim
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                {itemCount > 0 ? `${itemCount} ürün eklendi` : 'Sepetiniz boş'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-bold text-zinc-400 hover:text-red-600 transition-colors uppercase tracking-wider px-2 py-1"
                title="Sepeti Temizle"
              >
                Temizle
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200 transition-colors"
              aria-label="Kapat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
                <ShoppingBag size={36} />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-1">
                Sepetiniz Henüz Boş
              </h3>
              <p className="text-xs text-zinc-500 max-w-xs mb-6 font-medium">
                Silopi'nin en lezzetli odun ateşi pizzaları ve burgerleri menümüzde sizi bekliyor!
              </p>
              {onExploreMenu && (
                <button
                  onClick={() => {
                    onClose();
                    onExploreMenu();
                  }}
                  className="px-6 py-3 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-red-100 hover:bg-red-700 transition-all"
                >
                  MENÜYÜ İNCELE
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Cart Item Cards List */}
              <div className="space-y-3">
                {cart.map((cartItem) => {
                  return (
                    <div
                      key={cartItem.id}
                      className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 flex gap-3 items-center justify-between shadow-sm"
                    >
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-zinc-200 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-zinc-900 truncate">
                            {cartItem.item.name}
                          </h4>
                          <span className="text-[11px] font-bold text-zinc-500 bg-zinc-200/70 px-2 py-0.5 rounded-md shrink-0">
                            x{cartItem.quantity}
                          </span>
                        </div>

                        {cartItem.selectedSize && (
                          <span className="inline-block text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-md mt-1">
                            {cartItem.selectedSize} Boy
                          </span>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[11px] text-zinc-500 font-medium italic">
                            Fiyat pizzacı tarafından iletilir
                          </span>

                          {/* Quantity selector */}
                          <div className="flex items-center gap-2 bg-white rounded-lg border border-zinc-200 p-1 shadow-xs">
                            <button
                              onClick={() => updateCartQuantity(cartItem.id, -1)}
                              className="p-1 text-zinc-600 hover:text-red-600 rounded transition-colors"
                              aria-label="Azalt"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold px-1 text-zinc-900 min-w-[16px] text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(cartItem.id, 1)}
                              className="p-1 text-zinc-600 hover:text-red-600 rounded transition-colors"
                              aria-label="Artır"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(cartItem.id)}
                        className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                        title="Ürünü Çıkar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Address & Details Form */}
              <form onSubmit={handleWhatsAppOrder} className="pt-4 border-t border-zinc-200 space-y-3">
                <h3 className="text-xs font-black text-zinc-900 uppercase tracking-wider">
                  Teslimat Bilgileri
                </h3>

                <div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 bg-zinc-50"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Telefon Numaranız"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 bg-zinc-50"
                  />
                </div>

                <div>
                  <textarea
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Silopi Teslimat Adresi (Mahalle, Cadde, Bina No...)"
                    rows={2}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 bg-zinc-50 resize-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Sipariş Notu (Örn. Sos bol olsun, kapıyı çalmayın)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 bg-zinc-50"
                  />
                </div>

                {orderSentSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-bold">
                    <Check size={16} className="text-emerald-600" />
                    <span>WhatsApp yönlendirildi! Siparişiniz iletildi.</span>
                  </div>
                )}

                {/* Primary Actions */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-emerald-100 flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare size={16} />
                    <span>WHATSAPP İLE SİPARİŞ VER</span>
                  </button>

                  <a
                    href={`tel:${restaurantInfo.phone}`}
                    className="w-full py-3.5 px-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Phone size={16} className="text-red-500" />
                    <span>TELEFON İLE ARA & SİPARİŞ VER</span>
                  </a>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-zinc-200 bg-zinc-50">
            <div className="flex items-center justify-between text-xs text-zinc-600 mb-1">
              <span>Toplam Ürün</span>
              <span className="font-bold">{itemCount} Adet</span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-600 mb-2">
              <span>Teslimat Ücreti</span>
              <span className="font-bold text-emerald-600">ÜCRETSİZ</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-zinc-800 pt-2 border-t border-zinc-200">
              <span>Fiyat Bilgisi</span>
              <span className="text-red-600">Pizzacı Tarafından İletilir</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
