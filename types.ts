
export type MediaType = 'image' | 'video';

export interface PortfolioItem {
  id: string;
  title?: string;
  description?: string;
  url: string;
  type: MediaType;
  category: string;
  subcategory?: string;
}

export enum Section {
  Home = 'home',
  About = 'about',
  Demons = 'demons',
  Fashion = 'fashion',
  Graphic = 'graphic',
  Music = 'music',
  Contact = 'contact'
}
