export async function printReceipt(
  receiptId: number,
  options?: {
    silent?: boolean;
    preview?: boolean;
    printerName?: string;
    paperSize?: "58mm" | "80mm" | "A4";
  },
) {
  console.log("printReceipt", receiptId);

  return window.api.print.receipt(receiptId, options);
}
