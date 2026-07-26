export type CategoryId = string;

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  image: string;
  price?: number;
  popular?: boolean;
  badge?: string;
  ingredients?: string[];
  isSpicy?: boolean;
  isVegetarian?: boolean;
}

export interface Category {
  id: CategoryId;
  name: string;
  icon?: string;
}

export interface CartItem {
  id: string;
  item: MenuItem;
  quantity: number;
  selectedSize?: string;
  note?: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  city: string;
  address: string;
  phone: string;
  phoneDisplay: string;
  instagramHandle: string;
  instagramUrl: string;
  mapsUrl: string;
  workingHours: string;
  rating: number;
  pizzaTypesCount: string;
  freshnessGuarantee: string;
}

export interface HeroContent {
  titleLine1: string;
  titleHighlight: string;
  subtitle: string;
  imageUrl: string;
  badgeText: string;
}

export interface AboutContent {
  paragraph1: string;
  paragraph2: string;
  statsTypes: string;
  statsGuarantee: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
}

