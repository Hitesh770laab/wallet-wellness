import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { BALANCE_OVERVIEW, WEEKLY_DATA, MONTHLY_DATA, CATEGORY_BREAKDOWN, CATEGORIES, SAVINGS_GOALS } from '../data/dummyData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
  })
};

function StatCard({ icon, label, value, sub, color, index }) {
  return (
    <motion.div
      className="glass-card glass-card-hover rounded-2xl p-5"
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate="show"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: `${color}20` }}>
          {icon}
        </div>
        <span className="text-xs text-emerald-400 font-mono bg-emerald-400/10 px-2 py-0.5 rounded-full">
          {sub}
        </span>
      </div>
      <div className="font-display font-bold text-2xl text-white mb-1">{value}</div>
      <div className="text-xs text-white/40 font-body">{label}</div>
    </motion.div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl px-4 py-3 text-sm">
        <p className="text-white/60 font-body mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-mono font-medium">
            ₹{p.value?.toLocaleString('en-IN')}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function Dashboard({ setActiveTab }) {
  const [chartView, setChartView] = useState('weekly');
  const data = chartView === 'weekly' ? WEEKLY_DATA : MONTHLY_DATA;
  const dataKey = chartView === 'weekly' ? 'day' : 'month';

  const stats = [
    { icon: '💰', label: 'Total Balance', value: `₹${BALANCE_OVERVIEW.totalBalance.toLocaleString('en-IN')}`, sub: '+2.4%', color: '#7c3aed', index: 0 },
    { icon: '📥', label: 'Monthly Income', value: `₹${BALANCE_OVERVIEW.monthlyIncome.toLocaleString('en-IN')}`, sub: 'Jul 2025', color: '#10b981', index: 1 },
    { icon: '📤', label: 'Spent This Month', value: `₹${BALANCE_OVERVIEW.monthlySpent.toLocaleString('en-IN')}`, sub: '-18%', color: '#ec4899', index: 2 },
    { icon: '🔥', label: 'Saving Streak', value: `${BALANCE_OVERVIEW.streak} days`, sub: 'Personal best!', color: '#f59e0b', index: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Area Chart */}
        <motion.div
          className="glass-card rounded-2xl p-5 lg:col-span-2"
          variants={fadeUp} custom={4} initial="hidden" animate="show"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-semibold text-white text-base">Spending Overview</h3>
              <p className="text-xs text-white/30 font-body mt-0.5">Track your daily patterns</p>
            </div>
            <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'rgba(26,23,48,0.8)' }}>
              {['weekly', 'monthly'].map(v => (
                <button
                  key={v}
                  onClick={() => setChartView(v)}
                  className={`px-3 py-1.5 rounded-md text-xs font-body font-medium transition-all capitalize ${chartView === v ? 'tab-active' : 'text-white/40 hover:text-white/70'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="amountGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="budgetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey={dataKey} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="amount" stroke="#7c3aed" strokeWidth={2} fill="url(#amountGrad)" />
              {chartView === 'monthly' && (
                <Area type="monotone" dataKey="budget" stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#budgetGrad)" />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          className="glass-card rounded-2xl p-5"
          variants={fadeUp} custom={5} initial="hidden" animate="show"
        >
          <h3 className="font-display font-semibold text-white text-base mb-4">By Category</h3>
          <div className="space-y-3">
            {CATEGORY_BREAKDOWN.map((item) => {
              const cat = CATEGORIES.find(c => c.id === item.category);
              return (
                <div key={item.category} className="flex items-center gap-3">
                  <span className="text-base">{cat?.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-white/60 font-body truncate">{cat?.label}</span>
                      <span className="text-xs text-white/40 font-mono ml-2">{item.percentage}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: cat?.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ delay: 0.5, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Savings Goals */}
      <motion.div
        className="glass-card rounded-2xl p-5"
        variants={fadeUp} custom={6} initial="hidden" animate="show"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-semibold text-white">Savings Goals</h3>
          <button
            onClick={() => setActiveTab('goals')}
            className="text-xs text-violet-400 hover:text-violet-300 font-body transition-colors"
          >
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAVINGS_GOALS.map((goal) => {
            const pct = Math.round((goal.current / goal.target) * 100);
            return (
              <div key={goal.id} className="rounded-xl p-4"
                style={{ background: `${goal.color}10`, border: `1px solid ${goal.color}30` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <p className="text-sm font-display font-semibold text-white">{goal.title}</p>
                    <p className="text-xs font-mono" style={{ color: goal.color }}>
                      ₹{goal.current.toLocaleString('en-IN')} / ₹{goal.target.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${goal.color}, ${goal.color}aa)` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.6, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-white/30">{pct}% complete</span>
                  <span className="text-xs" style={{ color: goal.color }}>
                    ₹{(goal.target - goal.current).toLocaleString('en-IN')} left
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
