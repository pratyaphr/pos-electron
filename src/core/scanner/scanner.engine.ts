import type { ScannerOptions } from "./scanner.types";

const thaiMap: Record<string, string> = {
  ๅ: "1",
  "/": "2",
  "-": "3",
  ภ: "4",
  ถ: "5",
  "ุ": "6",
  "ึ": "7",
  ค: "8",
  ต: "9",
  จ: "0",
};

function normalizeBarcode(value: string) {
  return value
    .split("")
    .map((char) => thaiMap[char] ?? char)
    .join("");
}

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

      const normalBarcode = normalizeBarcode(barcode);
      this.options.onScan(normalBarcode);

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
