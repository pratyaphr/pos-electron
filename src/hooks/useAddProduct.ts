import { createProduct } from "../api/products";
import { useToastStore } from "../stores/toast.store";

type useAddProductProps = {
  onSuccess?: () => void;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddProduct({ onSuccess }: useAddProductProps) {
  const queryClient = useQueryClient();
  const toast = useToastStore();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createProduct,

    onSuccess: (resp) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      if (resp.success) {
        toast.show("เพิ่มสินค้าใหม่สำเร็จ", ``, "success");
        onSuccess?.();
      } else {
        toast.show("เพิ่มสินค้าใหม่ไม่สำเร็จ", `${resp.message} `, "error");
      }
    },
    onError: (err) => {
      toast.show("เพิ่มสินค้าใหม่ไม่สำเร็จ", `Error: ${err} `, "error");
    },
  });

  return {
    submit: mutate,
    isLoading: isPending,
    isError,
  };
}
