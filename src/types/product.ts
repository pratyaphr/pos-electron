export interface Product {
  id: number;

  category_id: number;

  category_name?: string;

  barcode: string;

  name: string;

  cost: number;

  price: number;

  stock_qty: number;

  active: number;

  created_at: string;

  updated_at: string;
}

export interface CreateProductDto {
  category_id: number;

  barcode: string;

  name: string;

  cost: number;

  price: number;

  stock_qty: number;

  active: number;
}

export interface UpdateProductDto {
  id: number;

  category_id: number;

  barcode: string;

  name: string;

  cost: number;

  price: number;

  stock_qty: number;

  active: number;
}
