import { SQLiteDatabase } from "expo-sqlite";

export async function initDatabase(database: SQLiteDatabase) {
    await database.execAsync(`CREATE TABLE IF NOT EXISTS tamagotchi (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        fome INTEGER NOT NULL DEFAULT 70,
        sono INTEGER NOT NULL DEFAULT 70,
        diversao INTEGER NOT NULL DEFAULT 70,
        image TEXT NOT NULL DEFAULT 'tamagotchi.png',
        last_interaction TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`);

}
