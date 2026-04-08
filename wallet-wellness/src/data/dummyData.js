export const CATEGORIES = [
  { id: 'food', label: 'Food & Dining', icon: '🍜', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  { id: 'transport', label: 'Transport', icon: '🚗', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
  { id: 'bills', label: 'Bills & Utilities', icon: '⚡', color: '#ec4899', bg: 'rgba(236,72,153,0.15)' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
  { id: 'health', label: 'Health', icon: '💊', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎮', color: '#06b6d4', bg: 'rgba(6,182,212,0.15)' },
  { id: 'travel', label: 'Travel', icon: '✈️', color: '#f97316', bg: 'rgba(249,115,22,0.15)' },
  { id: 'other', label: 'Other', icon: '📦', color: '#6b7280', bg: 'rgba(107,114,128,0.15)' },
];

export const INITIAL_EXPENSES = [
  { id: 1, title: 'Lunch at Cafe', amount: 340, category: 'food', date: '2025-07-14', note: 'Team lunch' },
  { id: 2, title: 'Uber to Airport', amount: 520, category: 'transport', date: '2025-07-14', note: '' },
  { id: 3, title: 'Netflix Premium', amount: 649, category: 'entertainment', date: '2025-07-13', note: 'Monthly sub' },
  { id: 4, title: 'Electricity Bill', amount: 1850, category: 'bills', date: '2025-07-13', note: 'July bill' },
  { id: 5, title: 'Groceries', amount: 1200, category: 'food', date: '2025-07-12', note: '' },
  { id: 6, title: 'New Sneakers', amount: 3499, category: 'shopping', date: '2025-07-12', note: 'Nike Air' },
  { id: 7, title: 'Doctor Visit', amount: 800, category: 'health', date: '2025-07-11', note: 'Checkup' },
  { id: 8, title: 'Metro Card', amount: 200, category: 'transport', date: '2025-07-11', note: '' },
  { id: 9, title: 'Dinner with friends', amount: 1450, category: 'food', date: '2025-07-10', note: '' },
  { id: 10, title: 'Amazon Order', amount: 2100, category: 'shopping', date: '2025-07-10', note: 'Electronics' },
];

export const WEEKLY_DATA = [
  { day: 'Mon', amount: 420, savings: 580 },
  { day: 'Tue', amount: 890, savings: 110 },
  { day: 'Wed', amount: 650, savings: 350 },
  { day: 'Thu', amount: 1200, savings: -200 },
  { day: 'Fri', amount: 2100, savings: -1100 },
  { day: 'Sat', amount: 3200, savings: -2200 },
  { day: 'Sun', amount: 850, savings: 150 },
];

export const MONTHLY_DATA = [
  { month: 'Feb', spent: 18200, budget: 22000 },
  { month: 'Mar', spent: 21400, budget: 22000 },
  { month: 'Apr', spent: 19800, budget: 22000 },
  { month: 'May', spent: 24100, budget: 22000 },
  { month: 'Jun', spent: 20500, budget: 22000 },
  { month: 'Jul', spent: 12608, budget: 22000 },
];

export const CATEGORY_BREAKDOWN = [
  { category: 'food', total: 2990, percentage: 30 },
  { category: 'shopping', total: 5599, percentage: 28 },
  { category: 'bills', total: 1850, percentage: 15 },
  { category: 'transport', total: 720, percentage: 12 },
  { category: 'entertainment', total: 649, percentage: 7 },
  { category: 'health', total: 800, percentage: 8 },
];

export const ACHIEVEMENTS = [
  { id: 1, icon: '🔥', title: '7-Day Streak', desc: 'Logged expenses 7 days in a row', unlocked: true, color: '#f97316' },
  { id: 2, icon: '💎', title: 'Under Budget', desc: 'Stayed under budget for 3 months', unlocked: true, color: '#7c3aed' },
  { id: 3, icon: '🎯', title: 'Goal Setter', desc: 'Set your first savings goal', unlocked: true, color: '#3b82f6' },
  { id: 4, icon: '⚡', title: 'Quick Logger', desc: 'Log expense within 5 min of purchase', unlocked: false, color: '#f59e0b' },
  { id: 5, icon: '🌟', title: 'Super Saver', desc: 'Save 30% in a month', unlocked: false, color: '#10b981' },
  { id: 6, icon: '🏆', title: 'Millionaire Mind', desc: 'Save ₹1,00,000 total', unlocked: false, color: '#ec4899' },
];

export const BALANCE_OVERVIEW = {
  totalBalance: 84250,
  monthlyIncome: 85000,
  monthlySpent: 12608,
  savings: 72392,
  savingsPercent: 85.2,
  streak: 14,
};

export const SAVINGS_GOALS = [
  { id: 1, title: 'Emergency Fund', target: 100000, current: 68000, icon: '🛡️', color: '#7c3aed' },
  { id: 2, title: 'Vacation — Bali', target: 80000, current: 45000, icon: '🌴', color: '#06b6d4' },
  { id: 3, title: 'New MacBook', target: 120000, current: 31000, icon: '💻', color: '#3b82f6' },
];
