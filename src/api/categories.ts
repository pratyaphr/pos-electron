import type { ApiResponse } from "../types/api";

import type { Categorie } from "../types/categories";

export async function getCategories() {
  return window.api.categories.getAll() as Promise<ApiResponse<Categorie[]>>;
}

export async function createCategorie(name: string) {
  return window.api.categories.create({ name }) as Promise<
    ApiResponse<Categorie>
  >;
}
