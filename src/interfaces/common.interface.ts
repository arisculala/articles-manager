export interface Pagination {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

export interface SuccessResponse {
  success: boolean;
}