import { createCategorie } from "../api/categories";

type useCreateCategorieProps = {
  onSuccess?: () => void;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../stores/toast.store";

export function useCreateCategorie({ onSuccess }: useCreateCategorieProps) {
  const queryClient = useQueryClient();
  const toast = useToastStore();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createCategorie,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.show("เพิ่มหมวดหมู่สำเร็จ", ``, "success");

      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading: isPending,
    isError,
  };
}
