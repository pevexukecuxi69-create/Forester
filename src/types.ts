export type EquipmentType = "trailer" | "crane" | "set" | "accessory";

export interface TechnicalSpec {
  label: string;
  value: string;
  unit?: string;
  category: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: string; // e.g., "Forestry Trailers", "Forestry Cranes", "Configured Sets"
  type: EquipmentType;
  description: string;
  priceEstimate: number; // in Euros
  weight: number; // in kg
  images: string[];
  features: string[];
  specs: TechnicalSpec[];
  blueprintUrl?: string; // used for custom rendering
}

export interface AccessoryOption {
  id: string;
  name: string;
  price: number;
  weight: number;
  description: string;
}

export interface ConfigurableCategory {
  id: string;
  name: string;
  description: string;
  options: AccessoryOption[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  country: string;
  clientType: string;
  operatingTemp: string;
  operatingHours: number;
  trailerModel: string;
  craneModel: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface QuoteRequest {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  comments: string;
  trailerId: string;
  craneId: string;
  accessories: Record<string, string>;
  totalEstimatedPrice: number;
  totalWeight: number;
}
