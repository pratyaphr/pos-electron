import { getReceiptList } from "../api/receipts";
import type { ReceiptQuery } from "../types";

import { useQuery } from "@tanstack/react-query";

export function useListReceipts(query: ReceiptQuery) {
  return useQuery({
    queryKey: ["receipt", query],
    queryFn: () => getReceiptList(query),
  });
}
