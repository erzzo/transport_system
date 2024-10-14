import { QueryResult } from "pg";
import db from "../../db";
import { Order } from "../../../shared-models/order.interface";
import { Waypoint } from "../../../shared-models/waypoint.interface";
import { DbOrder } from "./interfaces/db-order";

const getOrders = (): Promise<QueryResult<DbOrder>> => {
  return db.query(`
      SELECT *
      FROM orders
      LEFT JOIN waypoints ON orders.id = waypoints.order_id
      ORDER BY date;
    `
  );
}

const createOrder = (order: Order): Promise<QueryResult<DbOrder>> => {
  return db.query(
    `
      INSERT INTO orders (order_number, customer_name, date)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
    [order.orderNumber, order.customerName, order.date]
  );
}

const createWaypoint = (orderId: number, waypoint: Waypoint): Promise<QueryResult<Waypoint>> => {
  return db.query(
    `
    INSERT INTO waypoints (order_id, location, type)
    VALUES ($1, $2, $3) RETURNING *;
    `,
    [orderId, waypoint.location, waypoint.type]
  );
}

export { getOrders, createOrder, createWaypoint };
