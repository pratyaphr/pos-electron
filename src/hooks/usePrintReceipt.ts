import { useMutation } from "@tanstack/react-query";

import { printReceipt } from "../api/print";

export function usePrintReceipt() {
  return useMutation({
    mutationFn: ({
      receiptId,
      options,
    }: {
      receiptId: number;

      options?: {
        silent?: boolean;

        preview?: boolean;

        printerName?: string;

        paperSize?: "58mm" | "80mm" | "A4";
      };
    }) => printReceipt(receiptId, options),
  });
}
