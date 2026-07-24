import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  RestaurantInfo,
  HeroContent,
  AboutContent,
  GalleryItem,
  CartItem,
} from '../types';
import {
  initialMenuItems,
  initialRestaurantInfo,
  initialHeroContent,
  initialAboutContent,
  initialGalleryImages,
} from '../data/restaurantData';
import { db } from '../lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

interface DataContextType {
  menuItems: MenuItem[];
  restaurantInfo: RestaurantInfo;
  heroContent: HeroContent;
  aboutContent: AboutContent;
  galleryImages: GalleryItem[];
  cart: CartItem[];
  isFirebaseConnected: boolean;
  
  // Cart Actions
  addToCart: (item: MenuItem, quantity?: number, selectedSize?: string, note?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Admin Update Actions
  updateMenuItems: (items: MenuItem[]) => void;
  addMenuItem: (item: MenuItem) => void;
  editMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (itemId: string) => void;
  updateRestaurantInfo: (info: RestaurantInfo) => void;
  updateHeroContent: (hero: HeroContent) => void;
  updateAboutContent: (about: AboutContent) => void;
  updateGalleryImages: (gallery: GalleryItem[]) => void;
  addGalleryImage: (image: GalleryItem) => void;
  deleteGalleryImage: (imageId: string) => void;
  resetAllToDefault: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const cleanData = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

  // Menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('pizzalive_menu_items');
    return saved ? JSON.parse(saved) : initialMenuItems;
  });

  // Restaurant info
  const [restaurantInfo, setRestaurantInfoState] = useState<RestaurantInfo>(() => {
    const saved = localStorage.getItem('pizzalive_restaurant_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.phone === '05415181415' || !parsed.phone) {
          parsed.phone = '05434033573';
          parsed.phoneDisplay = '0543 403 35 73';
          localStorage.setItem('pizzalive_restaurant_info', JSON.stringify(parsed));
        }
        return parsed;
      } catch {
        return initialRestaurantInfo;
      }
    }
    return initialRestaurantInfo;
  });

  // Hero content
  const [heroContent, setHeroContentState] = useState<HeroContent>(() => {
    const saved = localStorage.getItem('pizzalive_hero_content');
    return saved ? JSON.parse(saved) : initialHeroContent;
  });

  // About content
  const [aboutContent, setAboutContentState] = useState<AboutContent>(() => {
    const saved = localStorage.getItem('pizzalive_about_content');
    return saved ? JSON.parse(saved) : initialAboutContent;
  });

  // Gallery
  const [galleryImages, setGalleryImagesState] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('pizzalive_gallery_images');
    return saved ? JSON.parse(saved) : initialGalleryImages;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('pizzalive_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Firebase Real-Time Firestore Synchronization
  useEffect(() => {
    if (!db) {
      setIsFirebaseConnected(false);
      return;
    }

    setIsFirebaseConnected(true);

    // 1. Restaurant Info Listener
    const unsubInfo = onSnapshot(doc(db, 'restaurant_info', 'main'), (snap) => {
      if (snap.exists()) {
        setRestaurantInfoState(snap.data() as RestaurantInfo);
      } else {
        setDoc(doc(db, 'restaurant_info', 'main'), cleanData(initialRestaurantInfo)).catch(console.error);
      }
    }, (err) => console.warn('Firestore info listener error:', err));

    // 2. Hero Content Listener
    const unsubHero = onSnapshot(doc(db, 'hero_content', 'main'), (snap) => {
      if (snap.exists()) {
        setHeroContentState(snap.data() as HeroContent);
      } else {
        setDoc(doc(db, 'hero_content', 'main'), cleanData(initialHeroContent)).catch(console.error);
      }
    }, (err) => console.warn('Firestore hero listener error:', err));

    // 3. About Content Listener
    const unsubAbout = onSnapshot(doc(db, 'about_content', 'main'), (snap) => {
      if (snap.exists()) {
        setAboutContentState(snap.data() as AboutContent);
      } else {
        setDoc(doc(db, 'about_content', 'main'), cleanData(initialAboutContent)).catch(console.error);
      }
    }, (err) => console.warn('Firestore about listener error:', err));

    // 4. Gallery Images Listener
    const unsubGallery = onSnapshot(doc(db, 'gallery_images', 'main'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data && Array.isArray(data.items)) {
          setGalleryImagesState(data.items);
        }
      } else {
        setDoc(doc(db, 'gallery_images', 'main'), cleanData({ items: initialGalleryImages })).catch(console.error);
      }
    }, (err) => console.warn('Firestore gallery listener error:', err));

    // 5. Menu Items Listener
    const unsubMenu = onSnapshot(doc(db, 'menu_items', 'main'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data && Array.isArray(data.items)) {
          setMenuItems(data.items);
        }
      } else {
        setDoc(doc(db, 'menu_items', 'main'), cleanData({ items: initialMenuItems })).catch(console.error);
      }
    }, (err) => console.warn('Firestore menu listener error:', err));

    return () => {
      unsubInfo();
      unsubHero();
      unsubAbout();
      unsubGallery();
      unsubMenu();
    };
  }, []);

  // LocalStorage backups
  useEffect(() => {
    localStorage.setItem('pizzalive_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('pizzalive_restaurant_info', JSON.stringify(restaurantInfo));
  }, [restaurantInfo]);

  useEffect(() => {
    localStorage.setItem('pizzalive_hero_content', JSON.stringify(heroContent));
  }, [heroContent]);

  useEffect(() => {
    localStorage.setItem('pizzalive_about_content', JSON.stringify(aboutContent));
  }, [aboutContent]);

  useEffect(() => {
    localStorage.setItem('pizzalive_gallery_images', JSON.stringify(galleryImages));
  }, [galleryImages]);

  useEffect(() => {
    localStorage.setItem('pizzalive_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart Functions
  const addToCart = (
    item: MenuItem,
    quantity = 1,
    selectedSize = 'Orta',
    note = ''
  ) => {
    setCart((prevCart) => {
      const sizeTag = item.category === 'pizzalar' ? selectedSize : '';
      const cartItemId = `${item.id}-${sizeTag}`;
      const existingIndex = prevCart.findIndex((c) => c.id === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        if (note) updated[existingIndex].note = note;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            item,
            quantity,
            selectedSize: sizeTag,
            note,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((c) => c.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.id === cartItemId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, c) => {
      let itemPrice = c.item.price || 0;
      // Size multiplier if pizza
      if (c.item.category === 'pizzalar' && c.selectedSize) {
        if (c.selectedSize === 'Küçük') itemPrice = Math.round(itemPrice * 0.8);
        if (c.selectedSize === 'Büyük') itemPrice = Math.round(itemPrice * 1.3);
      }
      return sum + itemPrice * c.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, c) => count + c.quantity, 0);
  };

  // Admin Actions with Firestore persistence
  const saveMenuItemsToFirestore = async (items: MenuItem[]) => {
    if (db) {
      try {
        await setDoc(doc(db, 'menu_items', 'main'), cleanData({ items }));
      } catch (e) {
        console.error('Firestore menu save error:', e);
      }
    }
  };

  const updateMenuItems = (items: MenuItem[]) => {
    setMenuItems(items);
    saveMenuItemsToFirestore(items);
  };

  const addMenuItem = (newItem: MenuItem) => {
    const updated = [newItem, ...menuItems];
    setMenuItems(updated);
    saveMenuItemsToFirestore(updated);
  };

  const editMenuItem = (updatedItem: MenuItem) => {
    const updated = menuItems.map((item) => (item.id === updatedItem.id ? updatedItem : item));
    setMenuItems(updated);
    saveMenuItemsToFirestore(updated);
  };

  const deleteMenuItem = (itemId: string) => {
    const updated = menuItems.filter((item) => item.id !== itemId);
    setMenuItems(updated);
    saveMenuItemsToFirestore(updated);
  };

  const updateRestaurantInfo = (info: RestaurantInfo) => {
    setRestaurantInfoState(info);
    if (db) {
      setDoc(doc(db, 'restaurant_info', 'main'), cleanData(info)).catch(console.error);
    }
  };

  const updateHeroContent = (hero: HeroContent) => {
    setHeroContentState(hero);
    if (db) {
      setDoc(doc(db, 'hero_content', 'main'), cleanData(hero)).catch(console.error);
    }
  };

  const updateAboutContent = (about: AboutContent) => {
    setAboutContentState(about);
    if (db) {
      setDoc(doc(db, 'about_content', 'main'), cleanData(about)).catch(console.error);
    }
  };

  const saveGalleryToFirestore = async (items: GalleryItem[]) => {
    if (db) {
      try {
        await setDoc(doc(db, 'gallery_images', 'main'), cleanData({ items }));
      } catch (e) {
        console.error('Firestore gallery save error:', e);
      }
    }
  };

  const updateGalleryImages = (gallery: GalleryItem[]) => {
    setGalleryImagesState(gallery);
    saveGalleryToFirestore(gallery);
  };

  const addGalleryImage = (image: GalleryItem) => {
    const updated = [image, ...galleryImages];
    setGalleryImagesState(updated);
    saveGalleryToFirestore(updated);
  };

  const deleteGalleryImage = (imageId: string) => {
    const updated = galleryImages.filter((g) => g.id !== imageId);
    setGalleryImagesState(updated);
    saveGalleryToFirestore(updated);
  };

  const resetAllToDefault = () => {
    localStorage.removeItem('pizzalive_menu_items');
    localStorage.removeItem('pizzalive_restaurant_info');
    localStorage.removeItem('pizzalive_hero_content');
    localStorage.removeItem('pizzalive_about_content');
    localStorage.removeItem('pizzalive_gallery_images');
    localStorage.removeItem('pizzalive_cart');

    setMenuItems(initialMenuItems);
    setRestaurantInfoState(initialRestaurantInfo);
    setHeroContentState(initialHeroContent);
    setAboutContentState(initialAboutContent);
    setGalleryImagesState(initialGalleryImages);
    setCart([]);

    if (db) {
      setDoc(doc(db, 'menu_items', 'main'), cleanData({ items: initialMenuItems })).catch(console.error);
      setDoc(doc(db, 'restaurant_info', 'main'), cleanData(initialRestaurantInfo)).catch(console.error);
      setDoc(doc(db, 'hero_content', 'main'), cleanData(initialHeroContent)).catch(console.error);
      setDoc(doc(db, 'about_content', 'main'), cleanData(initialAboutContent)).catch(console.error);
      setDoc(doc(db, 'gallery_images', 'main'), cleanData({ items: initialGalleryImages })).catch(console.error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        menuItems,
        restaurantInfo,
        heroContent,
        aboutContent,
        galleryImages,
        cart,
        isFirebaseConnected,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        updateMenuItems,
        addMenuItem,
        editMenuItem,
        deleteMenuItem,
        updateRestaurantInfo,
        updateHeroContent,
        updateAboutContent,
        updateGalleryImages,
        addGalleryImage,
        deleteGalleryImage,
        resetAllToDefault,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
