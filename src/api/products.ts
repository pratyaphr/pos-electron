import type { ApiResponse } from "../types/api";

import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from "../types/product";
import type { PaginationResult } from "../types";

export function getProducts() {
  return window.api.products.getAll() as Promise<ApiResponse<Product[]>>;
}

export function getProductById(id: string) {
  return window.api.products.getById(id) as Promise<ApiResponse<Product>>;
}

export function getProductByBarcode(id: string) {
  return window.api.products.getByBarcode(id) as Promise<ApiResponse<Product>>;
}

export function searchProducts(keyword: string, categoryId?: number | null) {
  console.log("searchProducts", keyword, categoryId);

  return window.api.products.search(keyword, categoryId) as Promise<
    ApiResponse<Product[]>
  >;
}

export function createProduct(data: CreateProductDto) {
  return window.api.products.create(data) as Promise<ApiResponse<Product>>;
}

export function updateProduct(data: UpdateProductDto) {
  return window.api.products.update(data) as Promise<ApiResponse<Product>>;
}

export function deleteProduct(id: number) {
  return window.api.products.delete(id) as Promise<ApiResponse<void>>;
}

export function listProduct(query: {
  page: number;
  pageSize: number;
  keyword: string;
}) {
  return window.api.products.list(query) as Promise<
    ApiResponse<PaginationResult<Product[]>>
  >;
}
