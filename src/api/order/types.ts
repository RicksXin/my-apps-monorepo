export interface OrderDto {
  orderId?: string;
  salesDate: string;
  userName: string;
  phone: string;
  address: string;
  source: number;
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
  amount: number;
  salesPerson?: number[];
}
