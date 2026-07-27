import type { ScannerOptions } from "./scanner.types";

export class ScannerEngine {
  private buffer = "";

  private options: Required<ScannerOptions>;

  constructor(options?: ScannerOptions) {
    this.options = {
      minLength: options?.minLength ?? 6,

      suffixKeys: options?.suffixKeys ?? ["Enter"],

      prefixKeys: options?.prefixKeys ?? [],

      onScan: options?.onScan ?? (() => {}),
    };
  }

  handleKey(key: string) {
    if (this.options.prefixKeys.includes(key)) {
      this.buffer = "";

      return;
    }

    if (this.options.suffixKeys.includes(key)) {
      const barcode = this.buffer.trim();

      this.buffer = "";

      if (barcode.length < this.options.minLength) {
        return;
      }

      this.options.onScan(barcode);

      return;
    }

    if (key.length !== 1) {
      return;
    }

    this.buffer += key;
  }

  clear() {
    this.buffer = "";
  }
}
