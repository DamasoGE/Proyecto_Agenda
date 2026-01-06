// src/database/db.ts
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase;

export const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('products.db');

    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        time TEXT NOT NULL
      );
    `);
  }

  return db;
};
