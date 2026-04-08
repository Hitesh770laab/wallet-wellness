import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = ['Initializing...', 'Loading assets...', 'Calibrating UI...', 'Welcome.'];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 1.8;
      });
    }, 28);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress > 25) setPhase(1);
    if (progress > 55) setPhase(2);
    if (progress > 85) setPhase(3);
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', top: '20%', left: '30%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', bottom: '25%', right: '25%' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Logo */}
      <motion.div
        className="relative mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Animated wallet icon */}
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-4xl">💰</div>
          <motion.div
            className="absolute -inset-2 rounded-3xl border border-violet-500/30"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <h1 className="text-3xl font-display font-bold gradient-text tracking-tight">
          Wallet Wellness
        </h1>
        <p className="text-sm text-white/30 mt-2 font-body tracking-widest uppercase">
          {phases[phase]}
        </p>
      </motion.div>

      {/* Progress bar container */}
      <div className="w-64 relative">
        <div className="h-px bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full loading-bar rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-xs text-white/20 font-mono">{Math.floor(progress)}%</span>
          <span className="text-xs text-white/20 font-mono">v1.0.0</span>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-violet-400"
          style={{
            left: `${15 + i * 10}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-10, -30, -10],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </motion.div>
  );
}
