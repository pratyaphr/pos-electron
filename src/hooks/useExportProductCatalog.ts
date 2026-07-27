import { useMutation } from "@tanstack/react-query";

import { exportProductCatalog } from "../api/export";

export function useExportProductCatalog() {
  return useMutation({
    mutationFn: exportProductCatalog,
  });
}
