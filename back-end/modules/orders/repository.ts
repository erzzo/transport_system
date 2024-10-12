import { QueryResult } from "pg";
import db from "../../db";
import { Order } from "../../../shared-models/order.interface";

const getOrders = (): Promise<QueryResult<any>> => {
  return db.query(`
      SELECT *
      FROM orders
      LEFT JOIN waypoints ON orders.id = waypoints.order_id;
    `
  );
}

const createOrder = (order: Order): Promise<QueryResult<any>> => {
  return db.query(`

    `
  );
}


export { getOrders, createOrder };
