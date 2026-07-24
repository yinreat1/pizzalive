import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PopularMenu } from './components/PopularMenu';
import { MenuList } from './components/MenuList';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminPanel } from './components/AdminPanel';
import { MenuItem } from './types';
import { initialRestaurantInfo } from './data/restaurantData';

function MainWebsiteContent({
  onOpenCart,
  onOpenAdmin,
}: {
  onOpenCart: () => void;
  onOpenAdmin: () => void;
}) {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // ScrollSpy observer to highlight active navigation link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'popular', 'menu', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenContactModal = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `tel:${initialRestaurantInfo.phone}`;
    }
  };

  const handleExploreMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased selection:bg-red-600 selection:text-white relative">
      {/* Top Sticky Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenCart={onOpenCart}
        onOpenAdmin={onOpenAdmin}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section */}
        <Hero onExploreMenu={handleExploreMenu} />

        {/* 2. Popular Menu Section */}
        <PopularMenu
          onSelectItem={(item) => setSelectedItem(item)}
          onExploreFullMenu={handleExploreMenu}
          onOpenContactModal={handleOpenContactModal}
        />

        {/* 3. Categorized Full Menu Section */}
        <MenuList
          onSelectItem={(item) => setSelectedItem(item)}
          onOpenContactModal={handleOpenContactModal}
        />

        {/* 4. About & Gallery Section */}
        <AboutSection onOpenContactModal={handleOpenContactModal} />

        {/* 5. Contact & Location Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavClick={(id) => {
          setActiveSection(id);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={onOpenAdmin}
      />

      {/* Mobile Fixed Bottom Bar + Floating Order Pill */}
      <MobileBottomNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenCart={onOpenCart}
      />

      {/* Item Detail / Order Modal */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onOpenCart={onOpenCart}
      />
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname.toLowerCase() === '/admin' ? '/admin' : '/';
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || hash === '#admin') {
        setCurrentPath('/admin');
      } else {
        setCurrentPath('/');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setCurrentPath('/admin');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    window.scrollTo(0, 0);
  };

  return (
    <DataProvider>
      {currentPath === '/admin' ? (
        <AdminPanel onBackToSite={navigateToHome} />
      ) : (
        <>
          <MainWebsiteContent
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAdmin={navigateToAdmin}
          />
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onExploreMenu={() => {
              const menuEl = document.getElementById('menu');
              if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </>
      )}
    </DataProvider>
  );
}
