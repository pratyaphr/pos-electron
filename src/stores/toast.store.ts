import { create } from "zustand";

type ToastType = "success" | "error" | "info";

interface ToastState {
  open: boolean;

  title: string;

  description?: string;

  type: ToastType;

  show: (title: string, description?: string, type?: ToastType) => void;

  hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  open: false,

  title: "",

  description: "",

  type: "success",

  show(title, description, type = "success") {
    set({
      open: true,
      title,
      description,
      type,
    });

    setTimeout(() => {
      set({
        open: false,
      });
    }, 3000);
  },

  hide() {
    set({
      open: false,
    });
  },
}));
