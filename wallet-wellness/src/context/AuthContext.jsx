import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ─── Mock "Database" using localStorage ───────────────────────────────────────
// In production, replace these helpers with real API calls (Supabase, Firebase, etc.)

const DB_KEY = 'ww_users_db';
const SESSION_KEY = 'ww_session';

function getDB() {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

function saveSession(user) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
}

// Simple hash (NOT for production — use bcrypt/argon2 server-side in real apps)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'ww_salt_2025');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const clearError = useCallback(() => setError(''), []);

  // ── Sign Up ──────────────────────────────────────────────────────────────
  const signUp = useCallback(async ({ name, email, password }) => {
    setLoading(true);
    setError('');
    try {
      // Simulate network delay
      await new Promise(r => setTimeout(r, 800));

      if (!name.trim() || name.trim().length < 2) throw new Error('Name must be at least 2 characters.');
      if (!email.includes('@') || !email.includes('.')) throw new Error('Enter a valid email address.');
      if (password.length < 6) throw new Error('Password must be at least 6 characters.');

      const db = getDB();
      const emailKey = email.toLowerCase().trim();

      if (db[emailKey]) throw new Error('An account with this email already exists.');

      const hashedPassword = await hashPassword(password);
      const newUser = {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        email: emailKey,
        avatar: name.trim().charAt(0).toUpperCase(),
        createdAt: new Date().toISOString(),
        hashedPassword,
        // Per-user data store
        expenses: [],
        goals: [],
        streak: 0,
        lastLogDate: null,
      };

      db[emailKey] = newUser;
      saveDB(db);

      const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar, createdAt: newUser.createdAt };
      saveSession(sessionUser);
      setUser(sessionUser);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Sign In ──────────────────────────────────────────────────────────────
  const signIn = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError('');
    try {
      await new Promise(r => setTimeout(r, 700));

      if (!email || !password) throw new Error('Please fill in all fields.');

      const db = getDB();
      const emailKey = email.toLowerCase().trim();
      const record = db[emailKey];

      if (!record) throw new Error('No account found with this email.');

      const hashedPassword = await hashPassword(password);
      if (record.hashedPassword !== hashedPassword) throw new Error('Incorrect password. Please try again.');

      const sessionUser = { id: record.id, name: record.name, email: record.email, avatar: record.avatar, createdAt: record.createdAt };
      saveSession(sessionUser);
      setUser(sessionUser);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Sign Out ─────────────────────────────────────────────────────────────
  const signOut = useCallback(() => {
    saveSession(null);
    setUser(null);
    setError('');
  }, []);

  // ── Update Profile ────────────────────────────────────────────────────────
  const updateProfile = useCallback(async ({ name }) => {
    if (!user) return;
    const db = getDB();
    const record = db[user.email];
    if (!record) return;
    record.name = name.trim();
    record.avatar = name.trim().charAt(0).toUpperCase();
    db[user.email] = record;
    saveDB(db);
    const updated = { ...user, name: record.name, avatar: record.avatar };
    saveSession(updated);
    setUser(updated);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOut, updateProfile, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
