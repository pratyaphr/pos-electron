import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createReceipt } from "../api/receipts";
import { useToastStore } from "../stores/toast.store";
// import { useNavigate } from "react-router-dom";

type useCreateReceiptProps = {
  onSuccess?: () => void;
};

export function useCreateReceipt({ onSuccess }: useCreateReceiptProps) {
  const queryClient = useQueryClient();
  const toast = useToastStore();
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: createReceipt,
    onSuccess: (receipt) => {
      queryClient.invalidateQueries({
        queryKey: ["receipt"],
      });

      toast.show(
        "ชำระเงินสำเร็จ",
        `เลขที่บิล ${receipt.receipt_no}`,
        "success",
      );
      // navigate(`/receipt/${receipt.id}`);
      onSuccess?.();
    },
  });
}
