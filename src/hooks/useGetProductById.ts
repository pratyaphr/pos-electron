import { getProductById } from "../api/products";

import { useQuery } from "@tanstack/react-query";

export function useGetProductsById(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
  });
}
