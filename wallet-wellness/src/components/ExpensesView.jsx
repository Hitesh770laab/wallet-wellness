import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, INITIAL_EXPENSES } from '../data/dummyData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
  })
};

const expenseVariants = {
  hidden: { opacity: 0, x: -20, height: 0 },
  show: { opacity: 1, x: 0, height: 'auto', transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } },
  exit: { opacity: 0, x: 20, height: 0, transition: { duration: 0.25 } }
};

export default function ExpensesView() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [form, setForm] = useState({ title: '', amount: '', category: 'food', note: '' });
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAdd = () => {
    if (!form.title || !form.amount) return;
    const newExpense = {
      id: Date.now(),
      title: form.title,
      amount: parseFloat(form.amount),
      category: form.category,
      date: new Date().toISOString().split('T')[0],
      note: form.note,
    };
    setExpenses([newExpense, ...expenses]);
    setForm({ title: '', amount: '', category: 'food', note: '' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  const handleDelete = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const filtered = expenses
    .filter(e => filter === 'all' || e.category === filter)
    .sort((a, b) => sortBy === 'date' ? new Date(b.date) - new Date(a.date) : b.amount - a.amount);

  const total = filtered.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* Add Expense Form */}
      <motion.div
        className="glass-card rounded-2xl p-6"
        variants={fadeUp} custom={0} initial="hidden" animate="show"
      >
        <h3 className="font-display font-semibold text-white text-lg mb-5 flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>+</span>
          New Expense
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Title */}
          <div className="relative">
            <input
              type="text"
              placeholder="What did you spend on?"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl text-sm font-body text-white placeholder-white/20 outline-none transition-all duration-300"
              style={{
                background: 'rgba(26,23,48,0.8)',
                border: '1px solid rgba(124,58,237,0.2)',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(124,58,237,0.2)'}
            />
          </div>

          {/* Amount */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-mono text-sm">₹</span>
            <input
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })}
              className="w-full pl-8 pr-4 py-3.5 rounded-xl text-sm font-mono text-white placeholder-white/20 outline-none transition-all duration-300"
              style={{
                background: 'rgba(26,23,48,0.8)',
                border: '1px solid rgba(124,58,237,0.2)',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(124,58,237,0.2)'}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <p className="text-xs text-white/30 font-body mb-2">Category</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat.id}
                onClick={() => setForm({ ...form, category: cat.id })}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-body font-medium transition-all duration-200"
                style={{
                  background: form.category === cat.id ? cat.bg : 'rgba(26,23,48,0.5)',
                  border: `1px solid ${form.category === cat.id ? cat.color + '60' : 'rgba(255,255,255,0.06)'}`,
                  color: form.category === cat.id ? cat.color : 'rgba(255,255,255,0.4)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Add a note (optional)"
            value={form.note}
            onChange={e => setForm({ ...form, note: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm font-body text-white placeholder-white/20 outline-none transition-all duration-300"
            style={{
              background: 'rgba(26,23,48,0.5)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <motion.button
            className="neon-button px-6 py-3 text-sm font-display font-semibold"
            onClick={handleAdd}
            whileTap={{ scale: 0.97 }}
          >
            <span>Add Expense</span>
          </motion.button>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="flex items-center gap-2 text-sm text-emerald-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <span>✓</span> Expense added!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Filters & List */}
      <motion.div
        className="glass-card rounded-2xl p-5"
        variants={fadeUp} custom={1} initial="hidden" animate="show"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold text-white">Transactions</h3>
            <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full font-mono">
              {filtered.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter */}
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="text-xs font-body text-white/60 rounded-lg px-3 py-2 outline-none"
              style={{ background: 'rgba(26,23,48,0.8)', border: '1px solid rgba(124,58,237,0.2)' }}
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-xs font-body text-white/60 rounded-lg px-3 py-2 outline-none"
              style={{ background: 'rgba(26,23,48,0.8)', border: '1px solid rgba(124,58,237,0.2)' }}
            >
              <option value="date">Sort: Date</option>
              <option value="amount">Sort: Amount</option>
            </select>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between py-3 mb-3 border-b border-white/5">
          <span className="text-sm text-white/40 font-body">Total shown</span>
          <span className="font-mono font-bold text-white">₹{total.toLocaleString('en-IN')}</span>
        </div>

        {/* List */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((expense) => {
              const cat = CATEGORIES.find(c => c.id === expense.category);
              return (
                <motion.div
                  key={expense.id}
                  variants={expenseVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  layout
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: cat?.bg }}>
                    {cat?.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body font-medium text-white truncate">{expense.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-body" style={{ color: cat?.color }}>{cat?.label}</span>
                      {expense.note && <span className="text-xs text-white/20">· {expense.note}</span>}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-mono font-semibold text-white text-sm">
                      ₹{expense.amount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-white/25 mt-0.5">{expense.date}</p>
                  </div>

                  <motion.button
                    onClick={() => handleDelete(expense.id)}
                    className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ×
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-white/20">
              <div className="text-4xl mb-3">📭</div>
              <p className="font-body text-sm">No expenses found</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
