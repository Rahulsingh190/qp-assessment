import { OkPacket, RowDataPacket } from 'mysql2';
import pool from '../../db';
import User from '../models/user';

export async function createUser(username: string): Promise<User> {
  const [result] = await pool.query('INSERT INTO users (username) VALUES (?)', [username]);
  return { id: (result as OkPacket).insertId, username };
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  const rowsArray = rows as RowDataPacket[];
  return rowsArray.length > 0 ? rowsArray[0] as User : null;
}