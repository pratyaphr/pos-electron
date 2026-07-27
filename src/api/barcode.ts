import type { PrintBarcodePayload } from "../types";

export const printBarcode = (payload: PrintBarcodePayload) => {
  console.log("printBarcode");

  return window.api.barcode.print(payload);
};
