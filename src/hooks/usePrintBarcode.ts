import { useMutation } from "@tanstack/react-query";
import { printBarcode } from "../api/barcode";

export function usePrintBarcode() {
  console.log("usePrintBarcode");

  return useMutation({
    mutationFn: printBarcode,
  });
}
