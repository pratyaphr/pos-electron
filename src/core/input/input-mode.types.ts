export type InputMode = "BARCODE" | "SEARCH" | "PAYMENT" | "DIALOG";

export interface InputModeListener {
  (mode: InputMode): void;
}
