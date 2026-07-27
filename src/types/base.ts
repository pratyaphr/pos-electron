export type Column<T> = {
  title: string;
  key: string;
  render?: (value: any, record: T) => React.ReactNode;
};

export interface PaginationResult<T> {
  items: T[] | any[];

  total: number;

  page: number;

  pageSize: number;

  totalPages: number;
}

export interface TreeNode {
  id: number | null;
  name: string;
  children?: TreeNode[];
  onClick?: () => void;
}

export interface BarcodeProduct {
  id?: number;
  name: string;
  barcode: string;
  price: number;
}

export interface PrintBarcodePayload {
  printer: string;
  products: BarcodeProduct[];
}
