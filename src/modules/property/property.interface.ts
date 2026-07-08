export interface IPropertyQuery {
  searchTerm?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  price?: string;
  status?: string;
  type?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}