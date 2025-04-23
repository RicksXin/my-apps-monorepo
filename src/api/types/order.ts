export interface OrderProperty {
  orderId?: string;
  orderDate: string;
  userName: string;
  phone: string;
  address: string;
  sourceId: number;
  productList: {
    name: string;
    quantity: number;
    spec?: string;
    desc?: string;
  }[];
  merchantInfo?: {
    merchantName: string;
    commission: number;
  };
  totalAmount: number;
  salesPerson?: number[];
}
