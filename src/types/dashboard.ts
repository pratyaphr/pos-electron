export interface DashboardData {
  summary: {
    todaySale: number;
    todayReceipt: number;
    todayQty: number;
    productCount: number;
  };

  sales7Days: {
    date: string;
    total: number;
  }[];

  topProducts: {
    id: number;
    name: string;
    qty: number;
  }[];

  lowStock: {
    id: number;
    name: string;
    stock_qty: number;
  }[];

  recentReceipts: {
    id: number;
    receipt_no: string;
    total_amount: number;
    payment_method: string;
    created_at: string;
  }[];

  paymentSummary: {
    payment_method: string;
    total: number;
  }[];
}
