import { Waypoint } from "./waypoint.interface";

export interface Order {
  customerName: string;
  date: Date;
  orderNumber: number | string;
  waypoints: Waypoint[];
}