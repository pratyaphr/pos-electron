import { searchProducts } from "../api/products";

import { useQuery } from "@tanstack/react-query";

export function useSearchProduct(keyword: string, categoryId?: number | null) {
  console.log("useSearchProduct keyword", keyword);
  console.log("useSearchProduct categoryId", categoryId);

  return useQuery({
    queryKey: ["products", keyword, categoryId],
    queryFn: () => searchProducts(keyword, categoryId),
  });
}
