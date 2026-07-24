import React, { useState } from 'react';
import { MapPin, Phone, Instagram, Navigation, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export const ContactSection: React.FC = () => {
  const { restaurantInfo } = useData();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-12 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Description */}
        <div className="text-left mb-8 max-w-xl">
          <span className="text-xs font-black uppercase tracking-widest text-red-600 block mb-1">
            İLETİŞİM VE ADRES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 uppercase italic mb-2">
            Bize Ulaşın
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-medium">
            Geleneksel lezzetlerin modern dokunuşlarla buluştuğu {restaurantInfo.name} Silopi'de sizleri ağırlamaktan mutluluk duyarız.
          </p>
        </div>

        {/* Map Box Card */}
        <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 mb-6 flex flex-col items-center justify-center text-center p-6 group shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <span className="font-bold text-zinc-900 text-lg tracking-wide mb-1">
              Silopi / Şırnak
            </span>
            <span className="text-xs text-zinc-500 max-w-xs font-medium">
              {restaurantInfo.address}
            </span>
            <a
              id="map-box-directions-btn"
              href={restaurantInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-5 py-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-900 text-xs font-bold uppercase tracking-wider border border-zinc-200 shadow-sm transition-all"
            >
              Haritada Göster
            </a>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <a
            id="contact-call-btn"
            href={`tel:${restaurantInfo.phone}`}
            className="w-full py-3.5 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-red-100 flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            <span>HEMEN ARA</span>
          </a>

          <a
            id="contact-directions-btn"
            href={restaurantInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Navigation size={18} />
            <span>YOL TARİFİ AL</span>
          </a>
        </div>

        {/* Info List Items */}
        <div className="space-y-3 mb-10">
          {/* Address */}
          <a
            id="contact-info-address-link"
            href={restaurantInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors group shadow-sm"
          >
            <div className="p-2.5 rounded-full bg-white text-zinc-700 group-hover:text-red-600 transition-colors border border-zinc-200">
              <MapPin size={20} />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase block mb-0.5">
                ADRES
              </span>
              <p className="text-sm font-bold text-zinc-900 group-hover:text-red-600 transition-colors">
                {restaurantInfo.address}
              </p>
            </div>
          </a>

          {/* Phone */}
          <a
            id="contact-info-phone-link"
            href={`tel:${restaurantInfo.phone}`}
            className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors group shadow-sm"
          >
            <div className="p-2.5 rounded-full bg-white text-zinc-700 group-hover:text-red-600 transition-colors border border-zinc-200">
              <Phone size={20} />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase block mb-0.5">
                TELEFON
              </span>
              <p className="text-sm font-bold text-zinc-900 group-hover:text-red-600 transition-colors">
                {restaurantInfo.phoneDisplay}
              </p>
            </div>
          </a>

          {/* Instagram */}
          <a
            id="contact-info-instagram-link"
            href={restaurantInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors group shadow-sm"
          >
            <div className="p-2.5 rounded-full bg-white text-zinc-700 group-hover:text-red-600 transition-colors border border-zinc-200">
              <Instagram size={20} />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase block mb-0.5">
                INSTAGRAM
              </span>
              <p className="text-sm font-bold text-zinc-900 group-hover:text-red-600 transition-colors">
                {restaurantInfo.instagramHandle}
              </p>
            </div>
          </a>
        </div>

        {/* Special Offers Newsletter Card */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-2xl font-black text-zinc-900 uppercase italic mb-1">
            Özel Fırsatları Kaçırmayın
          </h3>
          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
            Silopi'nin en sevilen lezzet duraklarından haberdar olmak için bültenimize katılın.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <span>Harika! Bültenimize başarıyla kaydoldunuz. Özel fırsatları ilk siz öğreneceksiniz.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-full text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <button
                id="contact-newsletter-submit-btn"
                type="submit"
                className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-colors shadow-md shadow-red-100"
              >
                KAYIT OL
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
