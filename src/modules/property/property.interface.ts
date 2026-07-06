export interface IPropertyQuery {
  searchTerm?: string;
  location?: string;
  categoryId?: string;
  status?: "AVAILABLE" | "RENTED";
  minPrice?: string;
  maxPrice?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}