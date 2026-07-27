import { searchProducts } from "../api/products";

import { useQuery } from "@tanstack/react-query";

export function useSearchProduct(keyword: string) {
  return useQuery({
    queryKey: ["products", keyword],
    queryFn: () => searchProducts(keyword),
  });
}
