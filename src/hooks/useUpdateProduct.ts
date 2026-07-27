import { updateProduct } from "../api/products";

type useUpdateProductProps = {
  onSuccess?: () => void;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProduct({ onSuccess }: useUpdateProductProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: updateProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading: isPending,
    isError,
  };
}
