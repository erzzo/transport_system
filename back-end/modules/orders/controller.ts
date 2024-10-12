import { Request, Response } from 'express';
import * as Repository from './repository';
import { Order } from '../../../shared-models/order.interface';
import { DbOrder } from './interfaces/db-order';

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Repository.getOrders();
    res.json(formatOrders(orders.rows))
  } catch (err) {
    res.status(500).send('Error');
  }
}

const createOrder = async (req: Request, res: Response) => {
  // some validation

  try {
    const order = await Repository.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).send('Error');
  }
}

const formatOrders = (orders: DbOrder[]): Order[] => {
  let formatedOrders: Order[] = [];

  orders.forEach((order: DbOrder) => {
    const index = formatedOrders.findIndex((o) => o.orderNumber === order.order_number)

    if (index >= 0) {
      formatedOrders[index].waypoints.push({
        location: order.location,
        type: order.type
      })
    } else {
      formatedOrders.push({
        id: order.id,
        customerName: order.customer_name,
        orderNumber: order.order_number,
        date: new Date(order.date),
        waypoints: [{
          location: order.location,
          type: order.type
        }]
      })
    }
  });

  return formatedOrders;
}

export  {
  getOrders,
  createOrder
};