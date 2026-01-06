import { getDB } from '../database/initDB';
import { Item } from '../models/Item';

export const itemService = {
  async getByDate(date: string): Promise<Item[]> {
    const db = await getDB();
    return db.getAllAsync<Item>(
      `SELECT * FROM items
       WHERE date = ?
       ORDER BY time ASC`,
      [date]
    );
  },

  async getBetweenDates(from: string, to: string): Promise<Item[]> {
    const db = await getDB();
    return db.getAllAsync<Item>(
      `SELECT * FROM items
       WHERE date BETWEEN ? AND ?
       ORDER BY date, time`,
      [from, to]
    );
  },

  async create(item: Omit<Item, 'id'>): Promise<number> {
    const db = await getDB();
    const result = await db.runAsync(
      `INSERT INTO items (title, description, date, time)
       VALUES (?, ?, ?, ?)`,
      [item.title, item.description ?? null, item.date, item.time]
    );

    return result.lastInsertRowId!;
  },

  async update(item: Item): Promise<void> {
    const db = await getDB();
    await db.runAsync(
      `UPDATE items
       SET title = ?, description = ?, date = ?, time = ?
       WHERE id = ?`,
      [item.title, item.description ?? null, item.date, item.time, item.id]
    );
  },

  async remove(id: number): Promise<void> {
    const db = await getDB();
    await db.runAsync(
      'DELETE FROM items WHERE id = ?',
      [id]
    );
  },
};
