import { OkPacket } from 'mysql2';
import pool from '../../db';
import GroceryItem from '../models/grocery';

export async function getAllGroceries(name?: string, category?: string): Promise<GroceryItem[]> {
  const filter = name ? ` AND name LIKE '%${name}%'` : '';
  const categoryFilter = category ? ` AND category = '${category}'` : '';
  const [rows] = await pool.query(`SELECT * FROM groceries WHERE 1=1 ${filter} ${categoryFilter}`);
  return rows as GroceryItem[];
}

export async function addGrocery(newItem: GroceryItem): Promise<GroceryItem> {
    const [result] = await pool.query('INSERT INTO groceries SET ?', [newItem]);
    const insertedId = (result as OkPacket).insertId;
    newItem.id = insertedId;
    return newItem;
  }

export async function deleteGrocery(id: number): Promise<void> {
    await pool.query('DELETE FROM groceries WHERE id = ?', [id]);
  }
  
export async function updateGrocery(id: number, updates: Partial<GroceryItem>): Promise<GroceryItem> {
    const [result] = await pool.query('UPDATE groceries SET ? WHERE id = ?', [updates, id]);
    if ((result as OkPacket).affectedRows === 0) {
      throw new Error('Grocery item not found');
    }
    return { id, ...updates };
}
