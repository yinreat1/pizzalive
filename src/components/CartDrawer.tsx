import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Phone, MessageCircle, Check } from 'lucide-react';
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
    getCartCount,
    restaurantInfo,
  } = useData();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [requestSentSuccess, setRequestSentSuccess] = useState(false);

  if (!isOpen) return null;

  const itemCount = getCartCount();

  const handleWhatsAppRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const itemsText = cart
      .map((cartItem) => {
        const sizeText = cartItem.selectedSize ? ` (${cartItem.selectedSize} Boy)` : '';
        const noteText = cartItem.note ? ` [Not: ${cartItem.note}]` : '';
        return `• ${cartItem.item.name}${sizeText} x${cartItem.quantity}${noteText}`;
      })
      .join('\n');

    let text = `*${restaurantInfo.name.toLocaleUpperCase('tr-TR')} - FİYAT TEKLİFİ TALEBİ*\n\n`;
    text += `*Ürünler:*\n${itemsText}\n\n`;
    text += `*Müşteri & Teslimat Bilgileri:*\n`;
    text += `• *Ad Soyad:* ${customerName}\n`;
    text += `• *Telefon:* ${customerPhone}\n`;
    text += `• *Adres:* ${customerAddress}\n`;
    if (orderNote) text += `• *Ek Not:* ${orderNote}\n`;
    text += `\n_Lütfen güncel fiyatı ve tahmini teslimat süresini paylaşır mısınız?_`;

    const cleanPhone = restaurantInfo.phone.replace(/[^0-9]/g, '');
    const whatsappPhone = cleanPhone.startsWith('90')
      ? cleanPhone
      : `90${cleanPhone.replace(/^0/, '')}`;
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setRequestSentSuccess(true);
    window.setTimeout(() => setRequestSentSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200 flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative animate-in slide-in-from-right duration-300">
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-red-50 text-red-600">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-zinc-900 uppercase italic">Teklif Listem</h2>
              <p className="text-xs text-zinc-500 font-medium">
                {itemCount > 0 ? `${itemCount} ürün eklendi` : 'Listeniz boş'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-bold text-zinc-400 hover:text-red-600 transition-colors uppercase tracking-wider px-2 py-1"
                title="Listeyi Temizle"
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

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
                <ShoppingBag size={36} />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-1">Listeniz Henüz Boş</h3>
              <p className="text-xs text-zinc-500 max-w-xs mb-6 font-medium">
                Ürünleri listenize ekleyin; güncel fiyat ve teslimat süresi WhatsApp üzerinden size iletilsin.
              </p>
              {onExploreMenu && (
                <button
                  onClick={() => {
                    onClose();
                    onExploreMenu();
                  }}
                  className="px-6 py-3 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-red-100 hover:bg-red-700 transition-all"
                >
                  Menüyü İncele
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-900 leading-relaxed">
                <strong>Fiyatlar güncel olarak WhatsApp'tan onaylanır.</strong> Listeyi gönderdiğinizde işletme size toplam tutarı ve tahmini teslimat süresini iletir.
              </div>

              <div className="space-y-3">
                {cart.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 flex gap-3 items-center justify-between shadow-sm"
                  >
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-zinc-200 shrink-0"
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-zinc-900 truncate">{cartItem.item.name}</h4>
                        <span className="text-[11px] font-bold text-zinc-500 bg-zinc-200/70 px-2 py-0.5 rounded-md shrink-0">
                          x{cartItem.quantity}
                        </span>
                      </div>

                      {cartItem.selectedSize && (
                        <span className="inline-block text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-md mt-1">
                          {cartItem.selectedSize} Boy
                        </span>
                      )}

                      <div className="flex items-center justify-end mt-2">
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
                ))}
              </div>

              <form onSubmit={handleWhatsAppRequest} className="pt-4 border-t border-zinc-200 space-y-3">
                <h3 className="text-xs font-black text-zinc-900 uppercase tracking-wider">Teslimat Bilgileri</h3>

                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Adınız Soyadınız"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 bg-zinc-50"
                  autoComplete="name"
                  required
                />

                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Telefon Numaranız"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 bg-zinc-50"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                />

                <textarea
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Silopi teslimat adresi (mahalle, cadde, bina no...)"
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 bg-zinc-50 resize-none"
                  autoComplete="street-address"
                  required
                />

                <input
                  type="text"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Ek not (örn. sos bol olsun, kapıyı çalmayın)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 bg-zinc-50"
                />

                {requestSentSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-bold">
                    <Check size={16} className="text-emerald-600" />
                    <span>WhatsApp açıldı. Gönder'e basınca fiyat teklifiniz işletmeye ulaşır.</span>
                  </div>
                )}

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-emerald-100 flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle size={16} />
                    <span>WHATSAPP'TAN FİYAT TEKLİFİ İSTE</span>
                  </button>

                  <a
                    href={`tel:${restaurantInfo.phone}`}
                    className="w-full py-3.5 px-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Phone size={16} className="text-red-500" />
                    <span>TELEFON İLE FİYAT SOR</span>
                  </a>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
