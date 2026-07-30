import { searchProducts } from "../api/products";

import { useQuery } from "@tanstack/react-query";

export function useSearchProduct(keyword: string, categoryId?: number | null) {
  return useQuery({
    queryKey: ["products", keyword, categoryId],
    queryFn: () => searchProducts(keyword, categoryId),
  });
}
