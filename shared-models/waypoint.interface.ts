import { OrderType } from "./order-type.enum";

export interface Waypoint {
  location: string;
  type: OrderType;
}