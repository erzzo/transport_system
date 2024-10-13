import { Waypoint } from "./waypoint.interface";

export interface Order {
  id?: number;
  customerName: string;
  date: Date | null;
  orderNumber: number | string;
  waypoints: Waypoint[];
}