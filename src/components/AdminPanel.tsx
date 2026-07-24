import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Store,
  FileText,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  LogOut,
  ArrowLeft,
  Check,
  Search,
  Lock,
  Save,
  Flame,
  Leaf,
  Star,
  DollarSign
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { MenuItem, GalleryItem, CategoryId } from '../types';

interface AdminPanelProps {
  onBackToSite: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToSite }) => {
  const {
    menuItems,
    restaurantInfo,
    heroContent,
    aboutContent,
    galleryImages,
    isFirebaseConnected,
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
    updateRestaurantInfo,
    updateHeroContent,
    updateAboutContent,
    addGalleryImage,
    deleteGalleryImage,
    resetAllToDefault,
  } = useData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('pizzalive_admin_auth') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Admin Active Tab
  const [activeTab, setActiveTab] = useState<'menu' | 'info' | 'text' | 'gallery'>('menu');

  // Search & Filter state for menu
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Toast / Status Message
  const [toastMessage, setToastMessage] = useState('');

  // Item Edit Modal State
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);

  // New Item Form State
  const [itemForm, setItemForm] = useState<{
    id: string;
    name: string;
    category: CategoryId;
    price: number;
    description: string;
    image: string;
    badge: string;
    ingredientsStr: string;
    popular: boolean;
    isSpicy: boolean;
    isVegetarian: boolean;
  }>({
    id: '',
    name: '',
    category: 'pizzalar',
    price: 200,
    description: '',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    badge: '',
    ingredientsStr: '',
    popular: false,
    isSpicy: false,
    isVegetarian: false,
  });

  // Restaurant Info Form State
  const [infoForm, setInfoForm] = useState({ ...restaurantInfo });

  // Hero & About Form State
  const [heroForm, setHeroForm] = useState({ ...heroContent });
  const [aboutForm, setAboutForm] = useState({ ...aboutContent });

  // New Gallery Image Form State
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryTitle, setNewGalleryTitle] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = usernameInput.trim().toLowerCase();
    const pass = passwordInput.trim();

    if (
      (user === 'pizzalive@gmail.com' && pass === 'Silopi@73') ||
      (user === '' && pass === 'Silopi@73') ||
      (user === 'admin' && pass === 'Silopi@73')
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('pizzalive_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Hatalı e-posta veya şifre!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pizzalive_admin_auth');
  };

  // Open Edit Modal for Item
  const handleStartEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setItemForm({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price || 200,
      description: item.description,
      image: item.image,
      badge: item.badge || '',
      ingredientsStr: item.ingredients ? item.ingredients.join(', ') : '',
      popular: !!item.popular,
      isSpicy: !!item.isSpicy,
      isVegetarian: !!item.isVegetarian,
    });
  };

  // Open New Item Modal
  const handleStartNewItem = () => {
    setEditingItem(null);
    setItemForm({
      id: 'item-' + Date.now(),
      name: '',
      category: 'pizzalar',
      price: 220,
      description: '',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
      badge: '',
      ingredientsStr: '',
      popular: false,
      isSpicy: false,
      isVegetarian: false,
    });
    setIsNewItemModalOpen(true);
  };

  // Save Item (Create or Update)
  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemForm.name.trim()) return;

    const formattedItem: MenuItem = {
      id: itemForm.id || 'item-' + Date.now(),
      name: itemForm.name,
      category: itemForm.category,
      price: Number(itemForm.price) || 0,
      description: itemForm.description,
      image: itemForm.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
      badge: itemForm.badge || undefined,
      ingredients: itemForm.ingredientsStr
        ? itemForm.ingredientsStr.split(',').map((s) => s.trim()).filter(Boolean)
        : undefined,
      popular: itemForm.popular,
      isSpicy: itemForm.isSpicy,
      isVegetarian: itemForm.isVegetarian,
    };

    if (editingItem) {
      editMenuItem(formattedItem);
      showToast('Ürün başarıyla güncellendi!');
      setEditingItem(null);
    } else {
      addMenuItem(formattedItem);
      showToast('Yeni ürün eklendi!');
      setIsNewItemModalOpen(false);
    }
  };

  // Save Restaurant Info
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateRestaurantInfo(infoForm);
    showToast('Restoran bilgileri başarıyla güncellendi!');
  };

  // Save Hero & Text Content
  const handleSaveTexts = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroContent(heroForm);
    updateAboutContent(aboutForm);
    showToast('Site metinleri ve görselleri güncellendi!');
  };

  // Add Gallery Image
  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryUrl.trim()) return;
    const newImg: GalleryItem = {
      id: 'gal-' + Date.now(),
      url: newGalleryUrl,
      title: newGalleryTitle || 'PizzaLive Galeri',
    };
    addGalleryImage(newImg);
    setNewGalleryUrl('');
    setNewGalleryTitle('');
    showToast('Galeri resmi eklendi!');
  };

  // If not authenticated, render Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-4">
        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center">
              <Lock size={24} />
            </div>
          </div>
          <h2 className="text-2xl font-black text-center uppercase italic mb-1">
            PizzaLive Yönetim Paneli
          </h2>
          <p className="text-xs text-zinc-400 text-center mb-6 font-medium">
            Sitedeki menüleri, içerikleri ve görselleri düzenlemek için giriş yapın.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                Kullanıcı Adı / E-posta
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="E-posta veya Kullanıcı Adı"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                Yönetici Şifresi
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 font-bold bg-red-950/80 border border-red-800 p-2.5 rounded-xl text-center">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-red-900/40 transition-all"
            >
              GİRİŞ YAP
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-700 text-center">
            <button
              onClick={onBackToSite}
              className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 mx-auto font-bold"
            >
              <ArrowLeft size={14} />
              <span>Ana Sayfaya Dön</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 flex flex-col font-sans">
      
      {/* Admin Top Header */}
      <header className="bg-zinc-900 text-white border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-black text-base shadow-md">
              P
            </div>
            <div>
              <span className="font-black text-lg uppercase italic tracking-wider text-red-500">
                PizzaLive
              </span>
              <span className="text-xs text-zinc-400 ml-2 font-bold uppercase tracking-widest hidden sm:inline-block">
                Admin Paneli
              </span>
            </div>

            {isFirebaseConnected && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Firebase Canlı Veritabanı
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Tüm verileri varsayılana sıfırlamak istediğinizden emin misiniz?')) {
                  resetAllToDefault();
                  showToast('Tüm veriler varsayılanlara sıfırlandı.');
                }
              }}
              className="p-2 text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1 text-xs font-bold"
              title="Varsayılana Sıfırla"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Sıfırla</span>
            </button>

            <button
              onClick={onBackToSite}
              className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase tracking-wider text-zinc-200 border border-zinc-700 transition-all flex items-center gap-1"
            >
              <ArrowLeft size={14} />
              <span>Siteyi Gör</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
              title="Çıkış Yap"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 font-bold text-xs uppercase tracking-wider animate-in fade-in">
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-zinc-200 shadow-sm">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'menu'
                ? 'bg-red-600 text-white shadow-md shadow-red-100'
                : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <UtensilsCrossed size={16} />
            <span>Menü & Ürünler ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'info'
                ? 'bg-red-600 text-white shadow-md shadow-red-100'
                : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <Store size={16} />
            <span>Firma Bilgileri</span>
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'text'
                ? 'bg-red-600 text-white shadow-md shadow-red-100'
                : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <FileText size={16} />
            <span>Anasayfa & Metinler</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'gallery'
                ? 'bg-red-600 text-white shadow-md shadow-red-100'
                : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <ImageIcon size={16} />
            <span>Galeri Resimleri ({galleryImages.length})</span>
          </button>
        </div>

        {/* TAB 1: MENU ITEMS MANAGER */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                  <Search size={16} className="absolute left-3 top-3 text-zinc-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ürün ara..."
                    className="w-full pl-9 pr-3 py-2 rounded-full border border-zinc-200 text-xs text-zinc-900 bg-zinc-50 focus:outline-none focus:border-red-600"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-full border border-zinc-200 text-xs font-bold text-zinc-700 bg-zinc-50 focus:outline-none focus:border-red-600"
                >
                  <option value="all">Tüm Kategoriler</option>
                  <option value="pizzalar">Pizzalar</option>
                  <option value="burgerler">Burgerler</option>
                  <option value="yan-urunler">Yan Ürünler</option>
                  <option value="tatlilar">Tatlılar</option>
                  <option value="icecekler">İçecekler</option>
                </select>
              </div>

              <button
                onClick={handleStartNewItem}
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-red-100 flex items-center justify-center gap-2 transition-all"
              >
                <Plus size={16} />
                <span>YENİ ÜRÜN EKLE</span>
              </button>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-zinc-200 rounded-2xl p-4 flex gap-4 items-center shadow-sm hover:border-zinc-300 transition-all relative group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border border-zinc-200 shrink-0 bg-zinc-100"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h3 className="font-bold text-sm text-zinc-900 truncate">
                        {item.name}
                      </h3>
                      <span className="font-bold text-[10px] uppercase text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded shrink-0">
                        Pizzacı İletir
                      </span>
                    </div>

                    <p className="text-xs text-zinc-500 line-clamp-2 mb-2 font-medium">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                      {item.popular && (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                          <Star size={10} /> Popüler
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => handleStartEditItem(item)}
                      className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
                      title="Düzenle"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`${item.name} ürününü silmek istediğinizden emin misiniz?`)) {
                          deleteMenuItem(item.id);
                          showToast('Ürün silindi!');
                        }
                      }}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      title="Sil"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: RESTAURANT INFO MANAGER */}
        {activeTab === 'info' && (
          <form onSubmit={handleSaveInfo} className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl">
            <h2 className="text-xl font-black text-zinc-900 uppercase italic border-b border-zinc-100 pb-3">
              Firma & İletişim Bilgileri
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Restoran Adı
                </label>
                <input
                  type="text"
                  value={infoForm.name}
                  onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Slogan
                </label>
                <input
                  type="text"
                  value={infoForm.tagline}
                  onChange={(e) => setInfoForm({ ...infoForm, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Telefon (Arama İçin)
                </label>
                <input
                  type="text"
                  value={infoForm.phone}
                  onChange={(e) => setInfoForm({ ...infoForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Telefon (Görünüm)
                </label>
                <input
                  type="text"
                  value={infoForm.phoneDisplay}
                  onChange={(e) => setInfoForm({ ...infoForm, phoneDisplay: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Açık Adres
                </label>
                <input
                  type="text"
                  value={infoForm.address}
                  onChange={(e) => setInfoForm({ ...infoForm, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Çalışma Saatleri
                </label>
                <input
                  type="text"
                  value={infoForm.workingHours}
                  onChange={(e) => setInfoForm({ ...infoForm, workingHours: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Instagram Kullanıcı Adı
                </label>
                <input
                  type="text"
                  value={infoForm.instagramHandle}
                  onChange={(e) => setInfoForm({ ...infoForm, instagramHandle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Instagram URL
                </label>
                <input
                  type="text"
                  value={infoForm.instagramUrl}
                  onChange={(e) => setInfoForm({ ...infoForm, instagramUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Google Haritalar URL
                </label>
                <input
                  type="text"
                  value={infoForm.mapsUrl}
                  onChange={(e) => setInfoForm({ ...infoForm, mapsUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-red-100 flex items-center gap-2 transition-all"
            >
              <Save size={16} />
              <span>BİLGİLERİ KAYDET</span>
            </button>
          </form>
        )}

        {/* TAB 3: TEXT & HERO CONTENT MANAGER */}
        {activeTab === 'text' && (
          <form onSubmit={handleSaveTexts} className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl">
            <h2 className="text-xl font-black text-zinc-900 uppercase italic border-b border-zinc-100 pb-3">
              Anasayfa & Site Metinleri
            </h2>

            {/* Hero Section Texts */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider">
                1. Hero (Ana Karşılama) Alanı
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Başlık İlk Kısım
                  </label>
                  <input
                    type="text"
                    value={heroForm.titleLine1}
                    onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Başlık Vurgulu Kısım (Kırmızı)
                  </label>
                  <input
                    type="text"
                    value={heroForm.titleHighlight}
                    onChange={(e) => setHeroForm({ ...heroForm, titleHighlight: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Alt Başlık / Açıklama
                  </label>
                  <textarea
                    value={heroForm.subtitle}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50 resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Hero Görsel URL
                  </label>
                  <input
                    type="text"
                    value={heroForm.imageUrl}
                    onChange={(e) => setHeroForm({ ...heroForm, imageUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                  />
                </div>
              </div>
            </div>

            {/* About Section Texts */}
            <div className="space-y-4 pt-4 border-t border-zinc-100">
              <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider">
                2. Hakkımızda Bölümü
              </h3>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Birinci Paragraf
                </label>
                <textarea
                  value={aboutForm.paragraph1}
                  onChange={(e) => setAboutForm({ ...aboutForm, paragraph1: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  İkinci Paragraf
                </label>
                <textarea
                  value={aboutForm.paragraph2}
                  onChange={(e) => setAboutForm({ ...aboutForm, paragraph2: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-red-100 flex items-center gap-2 transition-all"
            >
              <Save size={16} />
              <span>METİNLERİ VE GÖRSELLERİ KAYDET</span>
            </button>
          </form>
        )}

        {/* TAB 4: GALLERY MANAGER */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 max-w-4xl">
            {/* Add Gallery Form */}
            <form onSubmit={handleAddGallery} className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-black text-zinc-900 uppercase italic">
                Yeni Galeri Resmi Ekle
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Resim Başlığı
                  </label>
                  <input
                    type="text"
                    value={newGalleryTitle}
                    onChange={(e) => setNewGalleryTitle(e.target.value)}
                    placeholder="Örn: Taze Odun Ateşi Pizza"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Resim URL Adresi
                  </label>
                  <input
                    type="text"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-red-100 flex items-center gap-2 transition-all"
              >
                <Plus size={16} />
                <span>GALERİYE EKLE</span>
              </button>
            </form>

            {/* Existing Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((img) => (
                <div key={img.id} className="relative rounded-2xl overflow-hidden border border-zinc-200 bg-white group shadow-sm">
                  <img src={img.url} alt={img.title} className="w-full h-48 object-cover" />
                  <div className="p-3 flex items-center justify-between bg-white border-t border-zinc-100">
                    <span className="text-xs font-bold text-zinc-900 truncate">{img.title}</span>
                    <button
                      onClick={() => {
                        deleteGalleryImage(img.id);
                        showToast('Galeri resmi silindi!');
                      }}
                      className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors"
                      title="Sil"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* EDIT or NEW ITEM MODAL */}
      {(editingItem || isNewItemModalOpen) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-900/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white rounded-2xl border border-zinc-200 max-w-lg w-full p-6 shadow-2xl relative my-8">
            <button
              onClick={() => {
                setEditingItem(null);
                setIsNewItemModalOpen(false);
              }}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-800"
            >
              <Trash2 size={18} />
            </button>

            <h3 className="text-xl font-black text-zinc-900 uppercase italic mb-4">
              {editingItem ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Ürün Adı
                </label>
                <input
                  type="text"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  placeholder="Örn: Süperlive Pizza"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Kategori
                </label>
                <select
                  value={itemForm.category}
                  onChange={(e) => setItemForm({ ...itemForm, category: e.target.value as CategoryId })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                >
                  <option value="pizzalar">Pizzalar</option>
                  <option value="burgerler">Burgerler</option>
                  <option value="yan-urunler">Yan Ürünler</option>
                  <option value="tatlilar">Tatlılar</option>
                  <option value="icecekler">İçecekler</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Görsel URL Adresi
                </label>
                <input
                  type="text"
                  value={itemForm.image}
                  onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Açıklama
                </label>
                <textarea
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                  placeholder="Ürün içeriği ve lezzet detayları..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Malzemeler (Virgülle Ayrılmış)
                </label>
                <input
                  type="text"
                  value={itemForm.ingredientsStr}
                  onChange={(e) => setItemForm({ ...itemForm, ingredientsStr: e.target.value })}
                  placeholder="Mozzarella, Sucuk, Mısır, Mantar"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Özel Rozet (Opsiyonel)
                </label>
                <input
                  type="text"
                  value={itemForm.badge}
                  onChange={(e) => setItemForm({ ...itemForm, badge: e.target.value })}
                  placeholder="⭐ EN ÇOK TERCİH EDİLEN"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-red-600 bg-zinc-50"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemForm.popular}
                    onChange={(e) => setItemForm({ ...itemForm, popular: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Popüler Ürün</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemForm.isSpicy}
                    onChange={(e) => setItemForm({ ...itemForm, isSpicy: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Acılı</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemForm.isVegetarian}
                    onChange={(e) => setItemForm({ ...itemForm, isVegetarian: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Vejetaryen</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setIsNewItemModalOpen(false);
                  }}
                  className="px-5 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs uppercase tracking-wider"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-red-100"
                >
                  KAYDET
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
