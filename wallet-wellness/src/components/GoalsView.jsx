import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS, SAVINGS_GOALS, BALANCE_OVERVIEW } from '../data/dummyData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
  })
};

function StreakCard() {
  return (
    <motion.div
      className="glass-card rounded-2xl p-6 text-center relative overflow-hidden"
      variants={fadeUp} custom={0} initial="hidden" animate="show"
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #f97316 0%, transparent 70%)' }} />

      <motion.div
        className="text-7xl mb-3 streak-fire relative z-10"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🔥
      </motion.div>
      <div className="font-display font-extrabold text-5xl text-white mb-1 relative z-10">
        {BALANCE_OVERVIEW.streak}
      </div>
      <div className="text-white/50 font-body text-sm mb-4 relative z-10">Day Streak</div>

      <div className="flex justify-center gap-1.5 mb-4 relative z-10">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
            style={{
              background: i < 6 ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${i < 6 ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.06)'}`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 400 }}
          >
            {i < 6 ? '🔥' : ''}
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-white/30 font-body relative z-10">
        Log an expense today to keep your streak alive!
      </p>
    </motion.div>
  );
}

function AchievementBadge({ achievement, index }) {
  return (
    <motion.div
      className={`glass-card glass-card-hover rounded-2xl p-5 relative ${!achievement.unlocked ? 'opacity-40' : ''}`}
      variants={fadeUp} custom={index} initial="hidden" animate="show"
      whileHover={achievement.unlocked ? { y: -4 } : {}}
    >
      {achievement.unlocked && (
        <div
          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-xs"
          style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', color: '#10b981' }}
        >
          ✓
        </div>
      )}

      <motion.div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 ${achievement.unlocked ? 'badge-glow' : ''}`}
        style={{ background: `${achievement.color}20`, border: `1px solid ${achievement.color}40` }}
      >
        {achievement.icon}
      </motion.div>

      <h4 className="font-display font-semibold text-white text-sm mb-1">{achievement.title}</h4>
      <p className="text-xs text-white/35 font-body leading-relaxed">{achievement.desc}</p>

      {!achievement.unlocked && (
        <div className="mt-3 text-xs text-white/20 font-body flex items-center gap-1">
          <span>🔒</span> Locked
        </div>
      )}
    </motion.div>
  );
}

function GoalCard({ goal, index }) {
  const pct = Math.round((goal.current / goal.target) * 100);
  const remaining = goal.target - goal.current;

  return (
    <motion.div
      className="glass-card glass-card-hover rounded-2xl p-5"
      variants={fadeUp} custom={index} initial="hidden" animate="show"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${goal.color}15`, border: `1px solid ${goal.color}30` }}>
            {goal.icon}
          </div>
          <div>
            <h4 className="font-display font-semibold text-white text-sm">{goal.title}</h4>
            <p className="text-xs text-white/30 font-body mt-0.5">
              ₹{remaining.toLocaleString('en-IN')} to go
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display font-bold text-2xl" style={{ color: goal.color }}>{pct}%</div>
          <div className="text-xs text-white/25 font-mono">complete</div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <motion.div
            className="h-full rounded-full relative"
            style={{ background: `linear-gradient(90deg, ${goal.color}cc, ${goal.color})` }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: 0.3 + index * 0.1, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg" />
          </motion.div>
        </div>
      </div>

      <div className="flex justify-between text-xs font-mono">
        <span className="text-white/40">₹{goal.current.toLocaleString('en-IN')}</span>
        <span className="text-white/25">₹{goal.target.toLocaleString('en-IN')}</span>
      </div>

      {/* Monthly contribution estimate */}
      <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-white/30 font-body">Save monthly to reach goal</span>
        <span className="text-xs font-mono" style={{ color: goal.color }}>
          ₹{Math.ceil(remaining / 6).toLocaleString('en-IN')}/mo
        </span>
      </div>
    </motion.div>
  );
}

export default function GoalsView() {
  const [activeSection, setActiveSection] = useState('goals');

  return (
    <div className="space-y-6">
      {/* Section Toggle */}
      <div className="flex gap-2 p-1 rounded-xl w-fit" style={{ background: 'rgba(26,23,48,0.6)' }}>
        {['goals', 'achievements'].map(s => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`px-5 py-2.5 rounded-lg text-sm font-body font-medium capitalize transition-all ${
              activeSection === s ? 'tab-active' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {s === 'goals' ? '🎯 ' : '🏆 '}{s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSection === 'goals' && (
          <motion.div
            key="goals"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Streak + Summary row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StreakCard />

              <motion.div
                className="glass-card rounded-2xl p-5 md:col-span-2"
                variants={fadeUp} custom={1} initial="hidden" animate="show"
              >
                <h3 className="font-display font-semibold text-white mb-4">Overall Progress</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Monthly Budget Used', value: 57, color: '#7c3aed', formatted: '₹12,608 / ₹22,000' },
                    { label: 'Savings Rate', value: 85, color: '#10b981', formatted: '85.2% this month' },
                    { label: 'Goals Completion Avg', value: 48, color: '#3b82f6', formatted: '3 active goals' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-white/50 font-body">{item.label}</span>
                        <span className="text-xs font-mono" style={{ color: item.color }}>{item.formatted}</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: item.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ delay: 0.5, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Goals List */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-white">Active Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SAVINGS_GOALS.map((goal, i) => (
                  <GoalCard key={goal.id} goal={goal} index={i + 2} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'achievements' && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg text-xs font-body"
                style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}>
                {ACHIEVEMENTS.filter(a => a.unlocked).length} / {ACHIEVEMENTS.length} Unlocked
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ACHIEVEMENTS.map((badge, i) => (
                <AchievementBadge key={badge.id} achievement={badge} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
