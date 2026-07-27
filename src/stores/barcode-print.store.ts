import { create } from "zustand";

export interface BarcodePrintItem {
  productId: number;
  name: string;
  barcode: string;
  price: number;
  copies: number;
}

interface BarcodePrintStore {
  items: BarcodePrintItem[];

  add: (item: Omit<BarcodePrintItem, "copies">) => void;

  increase: (productId: number) => void;

  decrease: (productId: number) => void;

  remove: (productId: number) => void;

  clear: () => void;

  totalLabels: () => number;
}

export const useBarcodePrintStore = create<BarcodePrintStore>((set, get) => ({
  items: [],

  add: (product) =>
    set((state) => {
      const index = state.items.findIndex(
        (x) => x.productId === product.productId,
      );

      if (index >= 0) {
        return {
          items: state.items.map((item) =>
            item.productId === product.productId
              ? {
                  ...item,
                  copies: item.copies + 1,
                }
              : item,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            ...product,
            copies: 1,
          },
        ],
      };
    }),

  increase: (productId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId
          ? {
              ...item,
              copies: item.copies + 1,
            }
          : item,
      ),
    })),

  decrease: (productId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId
          ? {
              ...item,
              copies: Math.max(1, item.copies - 1),
            }
          : item,
      ),
    })),

  remove: (productId) =>
    set((state) => ({
      items: state.items.filter((x) => x.productId !== productId),
    })),

  clear: () =>
    set({
      items: [],
    }),

  totalLabels: () => get().items.reduce((sum, item) => sum + item.copies, 0),
}));
