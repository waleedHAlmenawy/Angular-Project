export interface Order {
  orderItems: [
    {
      title: string;
      price: number;
      quantity: number;
    }
  ];
  _id: string;
  status: string;
  totalPrice: number;
  dateOfOrder: Date;
}
