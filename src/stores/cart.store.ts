import { create } from "zustand";

import type { Product } from "../types/product";

interface CartItem extends Product {
  qty: number;
}

type CartState = {
  items: CartItem[];

  setItems: (product: Product) => void;
  DeleteItemCart: (code: string) => void;
  updateQty: (code: string, qty: number) => void;
  changeQty: (code: string, qty: number) => void;
  clearCart: () => void;
  handleCheckout: (items: CartItem[]) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  setItems: (product) => {
    const items = get().items;

    const exist = items.find((item) => item?.barcode === product?.barcode);

    if (exist) {
      set({
        items: items.map((i) =>
          i?.barcode === product?.barcode ? { ...i, qty: i?.qty + 1 } : i,
        ),
      });
    } else {
      set({
        items: [...items, { ...product, qty: 1 }],
      });
    }

    if (product?.name === "Unknown") {
      let newProduct = { ...product, qty: 1 };

      const unknownCount = items?.filter((item) =>
        item?.name?.startsWith("Unknown"),
      ).length;

      if (unknownCount > 0) {
        newProduct.name = `Unknown(${unknownCount + 1})`;
      }

      set({
        items: [...items, { ...newProduct, qty: 1 }],
      });
    }
  },
  DeleteItemCart: (code) => {
    const items = get().items;

    const newItems = items.filter((item) => item.barcode !== code);
    set({
      items: newItems,
    });
  },
  updateQty: (code: string, qty: number) => {
    const items = get().items;
    const newItems = items.map((item) => {
      if (item.barcode === code) {
        const newQty = Math.max(1, item.qty + qty);
        return { ...item, qty: newQty };
      }
      return item;
    });

    set({
      items: newItems,
    });
  },
  changeQty: (code: string, qty: number) => {
    const items = get().items;
    const newItems = items.map((item) => {
      if (item.barcode === code) {
        return { ...item, qty: qty };
      }
      return item;
    });

    set({
      items: newItems,
    });
  },
  clearCart: () => set({ items: [] }),

  handleCheckout: async (items: CartItem[]) => {
    try {
      console.log("handleCheckout", items);

      //   const { data } = await createReceipt({
      //     payment_method: "cash",
      //     items: items.map((item) => ({
      //       product_id: item.id,
      //       quantity: item.qty,
      //     })),
      //   });

      //   if (data.id) {
      //     get().clearCart();
      //     window.open(`/receipt/${data.id}`, "_blank", "noopener,noreferrer");
      //   }
    } catch (error) {
      console.error(error);
    }
  },
}));
