import { ExportFilter } from "./export";
/// <reference types="vite/client" />

import type { Product } from "./product";
import type { Categorie } from "./categories";
import type { ApiResponse } from "./api";
import type { DashboardData } from "./dashboard";
import type { PrintBarcodePayload } from "./base";

export {};

declare global {
  interface Window {
    api: {
      products: {
        getAll(): Promise<ApiResponse<Product[]>>;
        getById(id: string): Promise<ApiResponse<Product>>;
        getByBarcode(id: string): Promise<ApiResponse<Product>>;
        search(
          keyword: string,
          categoryId?: number | null,
        ): Promise<ApiResponse<Product[]>>;
        create(data: any): Promise<ApiResponse<Product>>;
        update(data: CreateProductDto): Promise<ApiResponse<Product>>;
        delete(id: number): Promise<ApiResponse<any>>;
        list(query: {
          page: number;
          pageSize: number;
          keyword: string;
        }): Promise<ApiResponse<any>>;
      };

      categories: {
        getAll(): Promise<ApiResponse<Categorie[]>>;
        getById(id: number): Promise<any>;
        create({ name: string }): Promise<any>;
        update(id: number, name: string): Promise<any>;
        delete(id: number): Promise<any>;
      };

      settings: {
        get(): Promise<any>;
        save(data: any): Promise<any>;
      };

      receipts: {
        create(data: CreateReceiptDto): Promise<ApiResponse<Receipt>>;

        getById(id: string): Promise<ApiResponse<Receipt>>;

        list(query: ReceiptQuery): Promise<ApiResponse<Pagination<Receipt>>>;

        delete(id: number): Promise<ApiResponse<void>>;
      };

      dashboard: {
        get(): Promise<ApiResponse<DashboardData>>;
      };

      print: {
        receipt(
          receiptId: number,

          options?: {
            silent?: boolean;

            preview?: boolean;

            printerName?: string;

            paperSize?: "58mm" | "80mm" | "A4";
          },
        ): Promise<any>;
      };

      printer: {
        getAll(): Promise<any>;
      };

      export: {
        productCatalog(ExportFilter): Promise<any>;
      };

      app: {
        quit: () => Promise<boolean>;
      };

      barcode: {
        print(payload: PrintBarcodePayload): Promise<any>;
      };
    };
  }
}
