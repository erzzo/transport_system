import { Request, Response } from 'express';
import * as Repository from './repository';
import { Order } from '../../../shared-models/order.interface';
import { DbOrder } from './interfaces/db-order';
import { Waypoint } from '../../../shared-models/waypoint.interface';

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Repository.getOrders();
    res.json(formatOrders(orders.rows))
  } catch (err) {
    res.status(500).send('Error');
  }
}

const createOrder = async (req: Request, res: Response) => {
  // some basic validation example
  // this would be done in some layer
  const order = req.body as Order;
  if (!order.customerName || !order.date || !order.orderNumber) {
    res.status(400).send('Missing fields');
    return;
  }

  try {
    const newOrder = await Repository.createOrder(order);
    const createdOrder = newOrder.rows[0];

    const waypointPromises = req.body.waypoints.map((waypoint: Waypoint) =>
      Repository.createWaypoint(createdOrder.id, waypoint)
    )
    const waypoints = await Promise.all(waypointPromises);

    res.status(201).json({
      ...createdOrder,
      waypoints: waypoints.map((result) => result.rows[0])
    });
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