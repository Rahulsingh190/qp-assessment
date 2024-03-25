import express from 'express';
import { createOrder, getOrdersByUserId, cancelOrder, completeOrder } from '../services/orders.service';

const router = express.Router();

router.post('/placeNew', async (req, res) => {
  const { userId, items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).send('Order must contain at least one item');
  }
  try {
    const order = await createOrder(userId, items);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(400).send('Failed to create order');
  }
});

router.get('/getOrder/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  try {
    const orders = await getOrdersByUserId(userId);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to retrieve orders');
  }
});

router.put('/:orderId/cancel', async (req, res) => {
  const orderId = parseInt(req.params.orderId, 10);
  try {
    await cancelOrder(orderId);
    res.status(204).send("Order Cancelled");  
  } catch (error) {
    console.error(error);
    res.status(400).send('Failed to cancel order');
  }
});

router.put('/:orderId/complete', async (req, res) => {
    const orderId = parseInt(req.params.orderId, 10);
    try {
      await completeOrder(orderId);
      res.status(204).send("Order Completed");  
    } catch (error) {
      console.error(error);
      res.status(400).send('Failed to complete order');
    }
  });

export default router;
