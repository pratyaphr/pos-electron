import type { ExportFilter } from "../types";

export async function exportProductCatalog(filter: ExportFilter) {
  return window.api.export.productCatalog(filter);
}
