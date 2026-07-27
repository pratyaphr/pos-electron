import { useEffect, useMemo } from "react";

import { ScannerEngine } from "../core/scanner";
import { inputModeManager } from "../core/input";
import { getProductByBarcode } from "../api/products";
import { useCartStore } from "../stores";

export default function KeyboardManager() {
  const { setItems } = useCartStore();
  const scanner = useMemo(
    () =>
      new ScannerEngine({
        async onScan(barcode) {
          try {
            const product = await getProductByBarcode(barcode);

            console.log(product);
            if (product.success) {
              setItems(product.data);
            }
          } catch (err) {
            console.error(err);
          }
        },
      }),
    [],
  );

  useEffect(() => {
    console.log("KeyboardManager Started");

    const handler = (e: KeyboardEvent) => {
      const mode = inputModeManager.getMode();
      console.log("mode", mode);

      switch (mode) {
        case "BARCODE":
          scanner.handleKey(e.key);
          break;

        case "SEARCH":
          break;

        case "PAYMENT":
          break;

        case "DIALOG":
          break;
      }
    };

    window.addEventListener("keydown", handler, true);

    return () => {
      window.removeEventListener("keydown", handler, true);
    };
  }, [scanner]);

  return null;
}
