import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, LineChart, Line, Cell
} from 'recharts';
import { WEEKLY_DATA, MONTHLY_DATA } from '../data/dummyData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
  })
};

const RADAR_DATA = [
  { axis: 'Food', value: 72 },
  { axis: 'Transport', value: 45 },
  { axis: 'Bills', value: 88 },
  { axis: 'Shopping', value: 63 },
  { axis: 'Health', value: 55 },
  { axis: 'Entertainment', value: 40 },
];

const TREND_DATA = [
  { month: 'Jan', savings: 15000, expenses: 70000 },
  { month: 'Feb', savings: 19000, expenses: 66000 },
  { month: 'Mar', savings: 14000, expenses: 71000 },
  { month: 'Apr', savings: 22000, expenses: 63000 },
  { month: 'May', savings: 11000, expenses: 74000 },
  { month: 'Jun', savings: 25000, expenses: 60000 },
  { month: 'Jul', savings: 30000, expenses: 55000 },
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl px-4 py-3 text-sm">
        <p className="text-white/60 font-body mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-mono font-medium">
            {p.name}: ₹{p.value?.toLocaleString('en-IN')}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function InsightCard({ icon, title, value, description, color, index }) {
  return (
    <motion.div
      className="glass-card glass-card-hover rounded-2xl p-5"
      variants={fadeUp} custom={index} initial="hidden" animate="show"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-white/30 font-body uppercase tracking-wider mb-1">{title}</p>
          <p className="font-display font-bold text-xl text-white mb-1">{value}</p>
          <p className="text-xs text-white/40 font-body leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function InsightsView() {
  const insights = [
    {
      icon: '📉',
      title: 'Biggest Win',
      value: '-18% spending',
      description: 'You spent 18% less than last month. Food & dining contributed most to savings.',
      color: '#10b981',
      index: 0,
    },
    {
      icon: '⚠️',
      title: 'Alert',
      value: 'Shopping +42%',
      description: 'Your shopping expenses are 42% higher than your 3-month average.',
      color: '#f59e0b',
      index: 1,
    },
    {
      icon: '🔮',
      title: 'Forecast',
      value: '₹19,200',
      description: 'At this rate, you\'ll spend ~₹19,200 by end of July. Under your ₹22,000 budget!',
      color: '#7c3aed',
      index: 2,
    },
    {
      icon: '🏆',
      title: 'Best Month',
      value: 'July 2025',
      description: 'On track to be your best savings month ever. Keep it up!',
      color: '#3b82f6',
      index: 3,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map(i => <InsightCard key={i.title} {...i} />)}
      </div>

      {/* Savings vs Expenses Trend */}
      <motion.div
        className="glass-card rounded-2xl p-5"
        variants={fadeUp} custom={4} initial="hidden" animate="show"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display font-semibold text-white">Savings vs Expenses</h3>
            <p className="text-xs text-white/30 font-body mt-0.5">6-month financial trend</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-body">
            <span className="flex items-center gap-1.5 text-white/40">
              <span className="w-3 h-0.5 rounded-full bg-emerald-400 inline-block" /> Savings
            </span>
            <span className="flex items-center gap-1.5 text-white/40">
              <span className="w-3 h-0.5 rounded-full bg-violet-400 inline-block" /> Expenses
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={TREND_DATA}>
            <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} name="Savings" />
            <Line type="monotone" dataKey="expenses" stroke="#7c3aed" strokeWidth={2.5} dot={{ fill: '#7c3aed', r: 4 }} name="Expenses" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Breakdown */}
        <motion.div
          className="glass-card rounded-2xl p-5"
          variants={fadeUp} custom={5} initial="hidden" animate="show"
        >
          <h3 className="font-display font-semibold text-white mb-1">Daily Spending</h3>
          <p className="text-xs text-white/30 font-body mb-5">This week's breakdown</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={WEEKLY_DATA} barSize={28}>
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" name="Spent" radius={[6, 6, 0, 0]}>
                {WEEKLY_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.amount > 2000 ? '#ec4899' : '#7c3aed'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Spending Habit Radar */}
        <motion.div
          className="glass-card rounded-2xl p-5"
          variants={fadeUp} custom={6} initial="hidden" animate="show"
        >
          <h3 className="font-display font-semibold text-white mb-1">Habit Radar</h3>
          <p className="text-xs text-white/30 font-body mb-5">Category balance this month</p>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'DM Sans' }}
              />
              <Radar dataKey="value" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Monthly Bar Chart */}
      <motion.div
        className="glass-card rounded-2xl p-5"
        variants={fadeUp} custom={7} initial="hidden" animate="show"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display font-semibold text-white">Monthly Comparison</h3>
            <p className="text-xs text-white/30 font-body mt-0.5">Actual spend vs. ₹22,000 budget</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={MONTHLY_DATA} barSize={32} barGap={4}>
            <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="budget" name="Budget" fill="rgba(255,255,255,0.05)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="spent" name="Spent" radius={[6, 6, 0, 0]}>
              {MONTHLY_DATA.map((entry, i) => (
                <Cell key={i} fill={entry.spent > entry.budget ? '#ec4899' : '#7c3aed'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
