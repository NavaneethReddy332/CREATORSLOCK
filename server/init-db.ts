import { client } from "./db";

export async function initializeDatabase() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      display_name TEXT,
      profile_image TEXT,
      banner_color TEXT DEFAULT '#6366f1',
      accent_color TEXT DEFAULT '#8b5cf6',
      audience_message TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS connections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      platform TEXT NOT NULL,
      url TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS locked_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      target_url TEXT NOT NULL,
      unlock_code TEXT NOT NULL UNIQUE,
      required_actions TEXT NOT NULL,
      expires_at TEXT,
      custom_unlock_message TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS unlock_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      link_id INTEGER NOT NULL REFERENCES locked_links(id) ON DELETE CASCADE,
      completed_actions TEXT NOT NULL DEFAULT '[]',
      unlocked INTEGER NOT NULL DEFAULT 0,
      unlocked_at TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Database tables initialized successfully");
}
