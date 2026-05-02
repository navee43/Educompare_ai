export interface Course {
  id: string;
  name: string;
  platform: string;
  platformSlug: string;
  category: string;
  subcategory: string;
  targetLevel: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  duration: string;
  description: string;
  features: string[];
  url: string;
  tags: string[];
  language: string;
  mode: string;
}

export interface Platform {
  slug: string;
  name: string;
  color: string;
  description: string;
  website: string;
  rating: number;
  reviewCount: number;
}

export interface Deal {
  id: string;
  courseId: string;
  title: string;
  discount: string;
  validTill: string;
  code?: string;
  tag: string;
}

export interface Review {
  id: string;
  courseId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: "user" | "reddit";
}

export type CategoryType =
  | "School"
  | "Competitive"
  | "Professional"
  | "Government"
  | "Skills"
  | "Lifestyle";
