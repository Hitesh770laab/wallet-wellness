import { useState, lazy, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import ParticleField from './components/ParticleField';
import CursorGlow from './components/CursorGlow';
import HeroSection from './components/HeroSection';
import AuthPage from './components/AuthPage';

const Dashboard   = lazy(() => import('./components/Dashboard'));
const ExpensesView = lazy(() => import('./components/ExpensesView'));
const InsightsView = lazy(() => import('./components/InsightsView'));
const GoalsView   = lazy(() => import('./components/GoalsView'));

const pageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.99 },
  show:  { opacity: 1, y: 0,  scale: 1,  transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } },
  exit:  { opacity: 0, y: -16, scale: 1.01, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

const PAGE_META = {
  dashboard: { title: 'Dashboard',            icon: '📊', subtitle: 'Your financial overview' },
  expenses:  { title: 'Expenses',             icon: '💳', subtitle: 'Track every rupee' },
  insights:  { title: 'Insights',             icon: '🔮', subtitle: 'Smart spending analysis' },
  goals:     { title: 'Goals & Achievements', icon: '🏆', subtitle: 'Build better habits' },
};

function AuroraBackground() {
  return (
    <div className="aurora-bg">
      <div className="aurora-orb w-[700px] h-[700px] bg-violet-600" style={{ top: '-10%', left: '-5%' }} />
      <div className="aurora-orb w-[500px] h-[500px] bg-blue-600"   style={{ bottom: '10%', right: '-5%', animationDelay: '4s' }} />
      <div className="aurora-orb w-[400px] h-[400px] bg-cyan-600"   style={{ top: '40%', left: '50%', animationDelay: '8s' }} />
    </div>
  );
}

// ─── App Shell (authenticated) ────────────────────────────────────────────────
function AppLayout({ activeTab, setActiveTab }) {
  const meta = PAGE_META[activeTab];
  return (
    <div className="min-h-screen bg-void relative">
      <AuroraBackground />
      <ParticleField />
      <CursorGlow />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="relative z-10 pt-28 pb-6 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div key={activeTab + '-hdr'}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">{meta.icon}</span>
              <h2 className="font-display font-bold text-3xl text-white">{meta.title}</h2>
            </div>
            <p className="text-sm text-white/30 font-body ml-10">{meta.subtitle}</p>
          </motion.div>
          <motion.div className="mt-4 h-px section-divider max-w-none"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.6 }} />
        </div>
      </div>

      <div className="relative z-10 px-6 pb-24 md:pb-16">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} variants={pageVariants} initial="hidden" animate="show" exit="exit">
              <Suspense fallback={
                <div className="flex items-center justify-center py-24">
                  <motion.div className="w-10 h-10 rounded-full border-2 border-violet-500/30 border-t-violet-500"
                    animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                </div>
              }>
                {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
                {activeTab === 'expenses'  && <ExpensesView />}
                {activeTab === 'insights'  && <InsightsView />}
                {activeTab === 'goals'     && <GoalsView />}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        style={{ background: 'rgba(10,8,20,0.9)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(124,58,237,0.15)' }}>
        <div className="flex items-center justify-around px-4 py-3">
          {Object.entries(PAGE_META).map(([key, val]) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`flex flex-col items-center gap-1 transition-all ${activeTab === key ? 'text-violet-400' : 'text-white/30'}`}>
              <span className="text-xl">{val.icon}</span>
              <span className="text-[10px] font-body">{val.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hero Landing ─────────────────────────────────────────────────────────────
function HeroPage({ onGoToAuth }) {
  const features = [
    { icon: '📊', title: 'Smart Dashboard',  desc: 'Real-time animated charts, balance summaries and spending patterns in one gorgeous view.',          color: '#7c3aed' },
    { icon: '⚡', title: 'Instant Logging',  desc: 'Log any expense in seconds with category detection, micro-animations and a floating input panel.',   color: '#3b82f6' },
    { icon: '🔮', title: 'Deep Insights',    desc: 'Radar charts, trend lines and forecasts that reveal exactly where your money goes each month.',       color: '#06b6d4' },
    { icon: '🔥', title: 'Streak System',    desc: 'Gamified streaks, achievement badges and savings milestones that actually keep you motivated.',       color: '#f97316' },
    { icon: '🎯', title: 'Goal Tracking',    desc: 'Set savings goals for vacation, gadgets or emergency fund — and watch progress build visually.',      color: '#10b981' },
    { icon: '🛡️', title: 'Budget Alerts',   desc: 'Smart alerts when you overspend by category, with a monthly forecast to keep you on track.',          color: '#ec4899' },
  ];

  return (
    <div className="relative min-h-screen bg-void overflow-x-hidden">
      <AuroraBackground />
      <ParticleField />
      <CursorGlow />

      {/* Minimal hero nav */}
      <motion.nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>💰</div>
            <span className="font-display font-bold text-white text-lg tracking-tight">
              Wallet<span className="gradient-text">Wellness</span>
            </span>
          </div>
          <motion.button
            className="neon-button px-5 py-2.5 text-sm font-display font-semibold"
            onClick={onGoToAuth} whileTap={{ scale: 0.97 }}
          >
            <span>Get Started →</span>
          </motion.button>
        </div>
      </motion.nav>

      <HeroSection onGetStarted={onGoToAuth} />

      {/* Features */}
      <section id="features" className="relative z-10 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 className="font-display font-bold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
            >
              Built for <span className="gradient-text">financial clarity</span>
            </motion.h2>
            <motion.p className="text-white/40 font-body text-lg max-w-xl mx-auto"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }} viewport={{ once: true }}
            >
              Every feature designed with intention — beautiful, fast, and genuinely useful.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title} className="glass-card glass-card-hover rounded-2xl p-6 group"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }} viewport={{ once: true, margin: '-50px' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                  {f.icon}
                </div>
                <h3 className="font-display font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 font-body leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            <motion.button className="neon-button px-10 py-4 text-base font-display font-semibold"
              onClick={onGoToAuth} whileTap={{ scale: 0.97 }}>
              <span className="flex items-center gap-2">Get Started Free →</span>
            </motion.button>
            <p className="text-white/20 text-xs font-body mt-4">No credit card · 100% free · Works offline</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── Root with auth-aware routing ────────────────────────────────────────────
function AppRoot() {
  const { user } = useAuth();
  const [appLoading, setAppLoading] = useState(true);
  const [screen, setScreen]         = useState('hero'); // 'hero' | 'auth' | 'app'
  const [activeTab, setActiveTab]   = useState('dashboard');

  // After loading finishes, if already logged in skip to app
  const handleLoadingDone = () => {
    setAppLoading(false);
    if (user) setScreen('app');
  };

  // Whenever user state flips to logged-in while on auth screen → go to app
  useEffect(() => {
    if (user && screen === 'auth') {
      const t = setTimeout(() => setScreen('app'), 120);
      return () => clearTimeout(t);
    }
    // If logged out while in app → go back to hero
    if (!user && screen === 'app') {
      setScreen('hero');
    }
  }, [user]);

  return (
    <AnimatePresence mode="wait">
      {appLoading ? (
        <LoadingScreen key="loading" onComplete={handleLoadingDone} />

      ) : screen === 'hero' ? (
        <motion.div key="hero"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.45 }}
        >
          <HeroPage onGoToAuth={() => setScreen('auth')} />
        </motion.div>

      ) : screen === 'auth' ? (
        <motion.div key="auth"
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <AuthPage />
        </motion.div>

      ) : (
        <motion.div key="app"
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <AppLayout activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoot />
    </AuthProvider>
  );
}
