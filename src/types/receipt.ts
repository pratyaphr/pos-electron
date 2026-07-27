import type { Product } from "./product";

export type PaymentMethod = "CASH" | "QR" | "CARD";

export interface ReceiptItem {
  id: number;

  name: string;

  barcode: string;

  receipt_id: number;

  product_id: number;

  quantity: number;

  price: number;

  subtotal: number;

  product?: Product;
}

export interface Receipt {
  id: number;

  receipt_no: string;

  total_amount: number;

  payment_method: PaymentMethod;

  created_at: string;

  items?: ReceiptItem[];
}

export interface CreateReceiptItemDto {
  product_id: number;

  quantity: number;
}

export interface CreateReceiptDto {
  payment_method: PaymentMethod;

  items: CreateReceiptItemDto[];
}

export interface ReceiptQuery {
  page: number;
  pageSize: number;
  keyword: string;
}

export interface ReceiptPagination {
  data: Receipt[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}
