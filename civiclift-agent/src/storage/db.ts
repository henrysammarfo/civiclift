import Database from 'better-sqlite3';

const db = new Database('civiclift.db');

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS actions (
      id TEXT PRIMARY KEY,
      session_id TEXT,
      type TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export function logSession(id: string, userId: string) {
  const stmt = db.prepare('INSERT INTO sessions (id, user_id) VALUES (?, ?)');
  stmt.run(id, userId);
}

export function logAction(id: string, sessionId: string, type: string, status: string) {
  const stmt = db.prepare('INSERT INTO actions (id, session_id, type, status) VALUES (?, ?, ?, ?)');
  stmt.run(id, sessionId, type, status);
}

export function getMetrics() {
  const sessions = db.prepare('SELECT COUNT(*) as count FROM sessions').get() as { count: number };
  const actions = db.prepare('SELECT COUNT(*) as count FROM actions').get() as { count: number };
  return {
    totalSessions: sessions.count,
    totalActions: actions.count
  };
}
