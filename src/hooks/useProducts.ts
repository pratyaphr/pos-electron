import { listProduct } from "../api/products";

import { useQuery } from "@tanstack/react-query";

interface ProductQuery {
  page: number;
  pageSize: number;
  keyword: string;
}

export function useProducts(query: ProductQuery) {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => listProduct(query),
  });
}
