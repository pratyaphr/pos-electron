export interface ScannerOptions {
  minLength?: number;

  suffixKeys?: string[];

  prefixKeys?: string[];

  onScan?: (barcode: string) => void;
}
