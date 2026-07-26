import React, { useState } from 'react';
import { Menu, X, Phone, ShoppingBag, Instagram } from 'lucide-react';
import { useData } from '../context/DataContext';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenCart,
}) => {
  const { restaurantInfo, getCartCount } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = getCartCount();

  const navItems = [
    { id: 'hero', label: 'Ana Sayfa' },
    { id: 'popular', label: 'Popüler' },
    { id: 'menu', label: 'Menü' },
    { id: 'about', label: 'Hakkımızda' },
    { id: 'contact', label: 'İletişim' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Mobile Menu Trigger & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors focus:outline-none"
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand Logo */}
          <button
            id="brand-home-logo-btn"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-red-100 group-hover:scale-105 transition-transform">
              <img
                src="/pizzalive-logo.svg"
                alt="PizzaLive logosu"
                width="36"
                height="36"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-red-600 uppercase italic leading-none group-hover:text-red-700 transition-colors">
                {restaurantInfo.name || 'PizzaLive'}
              </span>
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase -mt-0.5">
                Silopi
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`desktop-nav-link-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`text-xs font-bold uppercase tracking-widest py-2 transition-all ${
                activeSection === item.id
                  ? 'text-red-600 border-b-2 border-red-600 font-black'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            id="navbar-phone-call-btn"
            href={`tel:${restaurantInfo.phone}`}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-100 transition-all"
          >
            <Phone size={14} />
            <span>{restaurantInfo.phoneDisplay}</span>
          </a>

          {/* Cart Button */}
          <button
            id="navbar-order-cart-btn"
            onClick={onOpenCart}
            className="p-2.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all relative flex items-center justify-center"
            aria-label="Teklif listesini gör"
            title="Teklif listem"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 ? (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-black flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            ) : (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-600 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-100 px-4 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-drawer-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm tracking-wide uppercase transition-colors flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-red-600 text-white'
                    : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-60">→</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-100 grid grid-cols-2 gap-2">
            <a
              id="mobile-drawer-call-btn"
              href={`tel:${restaurantInfo.phone}`}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider"
            >
              <Phone size={16} />
              <span>Hemen Ara</span>
            </a>
            <a
              id="mobile-drawer-instagram-btn"
              href={restaurantInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-100 text-zinc-800 font-bold text-xs uppercase tracking-wider"
            >
              <Instagram size={16} className="text-red-600" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
