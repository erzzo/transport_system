import express from "express";
import * as ordersController from './controller';

const router = express.Router();

router.get('/', ordersController.getOrders);
router.post('/', ordersController.createOrder);

export default router;