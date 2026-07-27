import { getReceipt } from "../api/receipts";

import { useQuery } from "@tanstack/react-query";

export function useGetReceipt(id: string) {
  return useQuery({
    queryKey: ["receipt", id],
    queryFn: () => getReceipt(id),
  });
}
