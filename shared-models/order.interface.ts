import { Waypoint } from "./waypoint.interface";

export interface Order {
  customerName: string;
  date: Date | null;
  orderNumber: number | string;
  waypoints: Waypoint[];
}