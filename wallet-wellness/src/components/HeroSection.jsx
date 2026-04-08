import { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const Scene3D = lazy(() => import('./Scene3D'));

function StatCard({ value, label, icon, delay }) {
  return (
    <motion.div
      className="glass-card rounded-2xl p-4 min-w-[140px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-display font-bold text-xl text-white">{value}</div>
      <div className="text-xs text-white/40 font-body mt-0.5">{label}</div>
    </motion.div>
  );
}

export default function HeroSection({ onGetStarted }) {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 3D Canvas Background */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ scale: sceneScale }}
      >
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full border-2 border-violet-500/30 border-t-violet-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        }>
          <Scene3D scrollY={scrollY} />
        </Suspense>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-body font-medium"
          style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Your AI-Powered Finance Companion
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="font-display font-extrabold leading-none tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span className="text-white">Master Your</span>
          <br />
          <span className="gradient-text">Money.</span>{' '}
          <span className="text-white/80">Build</span>
          <br />
          <span
            className="text-white"
            style={{
              WebkitTextStroke: '1px rgba(167,139,250,0.3)',
            }}
          >
            Better Habits.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-white/40 font-body font-light max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Track expenses, visualize patterns, and build lasting financial wellness —
          with beautiful 3D insights and smart habit tracking.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.button
            className="neon-button px-8 py-4 text-base font-display font-semibold"
            onClick={onGetStarted}
            whileTap={{ scale: 0.97 }}
          >
            <span className="flex items-center gap-2">
              Start Tracking
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </motion.button>

          <motion.button
            className="px-8 py-4 rounded-xl text-sm font-display font-medium text-white/60 hover:text-white/90 transition-colors border border-white/10 hover:border-white/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See how it works ↓
          </motion.button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <StatCard value="₹84,250" label="Total Balance" icon="💎" delay={1.1} />
          <StatCard value="85.2%" label="Savings Rate" icon="📈" delay={1.2} />
          <StatCard value="14 days" label="Current Streak" icon="🔥" delay={1.3} />
          <StatCard value="6 goals" label="Active Goals" icon="🎯" delay={1.4} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity: heroOpacity }}
      >
        <span className="text-xs text-white/20 font-body tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-violet-500/50 to-transparent" />
      </motion.div>

      {/* Radial vignette */}
      <div className="absolute inset-0 z-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, #03020a 100%)' }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-15 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #03020a)' }} />
    </div>
  );
}
