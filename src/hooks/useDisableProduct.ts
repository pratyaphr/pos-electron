import { deleteProduct } from "../api/products";

type useDisableProductProps = {
  onSuccess?: () => void;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDisableProduct({ onSuccess }: useDisableProductProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: deleteProduct,

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
