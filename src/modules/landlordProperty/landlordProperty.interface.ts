export interface ICreateProperty {
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area?: number;
  image?: string;
  amenities: string[];
  categoryId: string;
}