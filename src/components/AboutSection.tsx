import React from 'react';
import { Award, ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';

interface AboutSectionProps {
  onOpenContactModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContactModal }) => {
  const { aboutContent, galleryImages, restaurantInfo } = useData();

  return (
    <section id="about" className="py-12 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Hakkımızda */}
        <div className="mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-red-600">
            HİKAYEMİZ
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 uppercase italic mt-1 mb-6">
            Hakkımızda
          </h2>

          {/* Story Container Card */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 mb-8 space-y-4 shadow-sm">
            <p className="text-zinc-700 text-sm sm:text-base leading-relaxed font-medium">
              {aboutContent.paragraph1}
            </p>
            <p className="text-zinc-700 text-sm sm:text-base leading-relaxed font-medium">
              {aboutContent.paragraph2}
            </p>
          </div>

          {/* About Image Collage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dough stretching image */}
            <div className="relative h-80 rounded-2xl overflow-hidden border border-zinc-200 group bg-zinc-100 md:col-span-1 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop"
                alt="El Yapımı Hamur Açımı"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-zinc-900 font-bold uppercase tracking-wider shadow-sm">
                Hakkımızda & Galeri
              </div>
            </div>

            {/* Oven & Premium Quality Cards */}
            <div className="grid grid-cols-1 gap-4 md:col-span-2">
              <div className="relative h-44 rounded-2xl overflow-hidden border border-zinc-200 group bg-zinc-100 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop"
                  alt="Odun Ateşinde Fırın"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
              </div>

              {/* Premium Kalite Badge Box */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex items-center justify-center gap-4 text-center shadow-sm">
                <div className="p-3 rounded-full bg-red-50 text-red-600 border border-red-100">
                  <Award size={28} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-zinc-900">Premium Kalite</h3>
                  <p className="text-xs text-zinc-500 font-medium">Silopi'de taze ve kaliteli pizza standartı.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Galeri */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-red-600">
                GÖRSEL ŞÖLEN
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 uppercase italic mt-1">
                Galeri
              </h2>
            </div>

            <a
              id="gallery-instagram-follow-btn"
              href={restaurantInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wider flex items-center gap-1"
            >
              <span>Instagram'da Takip Et</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Grid Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {galleryImages.map((img, idx) => (
              <div
                key={img.id || idx}
                className={`relative rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 group shadow-sm ${
                  idx === 0 ? 'sm:col-span-2 h-64 sm:h-80' : 'h-64'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs font-bold text-white tracking-wide uppercase">{img.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats & CTA Banner */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto shadow-sm">
            <div className="grid grid-cols-2 gap-4 divide-x divide-zinc-100 mb-6">
              <div>
                <span className="text-3xl sm:text-4xl font-black text-zinc-900">
                  15<span className="text-red-600">+</span>
                </span>
                <p className="text-[10px] sm:text-xs font-black text-zinc-500 tracking-widest uppercase mt-1">
                  ÇEŞİT PİZZA
                </p>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-black text-zinc-900">
                  100<span className="text-red-600">%</span>
                </span>
                <p className="text-[10px] sm:text-xs font-black text-zinc-500 tracking-widest uppercase mt-1">
                  TAZE MALZEME
                </p>
              </div>
            </div>

            <button
              id="about-cta-join-btn"
              onClick={onOpenContactModal}
              className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-red-100"
            >
              BİZE KATILIN
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
