import { create } from "zustand";

export type InputMode = "BARCODE" | "SEARCH" | "PAYMENT" | "DIALOG";

interface InputModeStore {
  mode: InputMode;

  setMode: (mode: InputMode) => void;

  isBarcode: () => boolean;

  isSearch: () => boolean;

  isPayment: () => boolean;

  isDialog: () => boolean;
}

export const useInputModeStore = create<InputModeStore>((set, get) => ({
  mode: "BARCODE",

  setMode(mode) {
    console.log("InputMode:", mode);

    set({
      mode,
    });
  },

  isBarcode() {
    return get().mode === "BARCODE";
  },

  isSearch() {
    return get().mode === "SEARCH";
  },

  isPayment() {
    return get().mode === "PAYMENT";
  },

  isDialog() {
    return get().mode === "DIALOG";
  },
}));
