import { OkPacket } from 'mysql2';
import pool from '../../db';
import Order from '../models/order';

export async function createOrder(userId: number, items: { itemId: number, quantity: number }[]): Promise<Order> {

    const itemIds = items.map(item => item.itemId);
  
    const stockCheckResult = await pool.query('SELECT id, stock FROM groceries WHERE id IN (?)', [itemIds]);
    const insufficientStock = stockCheckResult.some(row => 
        'id' in row && 'stock' in row && 
        (row.stock as number) < items.find(item => item.itemId === row.id)!.quantity);
        console.log(insufficientStock);
      
    if (insufficientStock) {
      throw new Error('Insufficient stock for some items');
    }
  
    const itemJson = JSON.stringify(items);
    const [result] = await pool.query('INSERT INTO orders (userId, items) VALUES (?, ?)', [userId, itemJson]);

    const updateStockQueries = items.map(item => {
      return pool.query('UPDATE groceries SET stock = stock - ? WHERE id = ?', [item.quantity, item.itemId]);
    });
  
    await Promise.all(updateStockQueries);
    return { id: (result as OkPacket).insertId, userId, items, createdAt: new Date(), status: 'pending' };
}

export async function getOrdersByUserId(userId: number): Promise<Order[]> {
  const [rows] = await pool.query('SELECT * FROM orders WHERE userId = ?', [userId]);
  return rows as Order[];
}

export async function cancelOrder(orderId: number): Promise<void> {
  await pool.query('UPDATE orders SET status = ? WHERE id = ?', ['cancelled', orderId]);
}

export async function completeOrder(orderId: number): Promise<void> {
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', ['completed', orderId]);
}