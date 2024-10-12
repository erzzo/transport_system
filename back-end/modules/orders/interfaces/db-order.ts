import { OrderType } from "../../../../shared-models/order-type.enum";

export interface DbOrder {
  id: number;
  customer_name: string;
  date: Date;
  order_number: number | string;
  type: OrderType;
  location: string;
}