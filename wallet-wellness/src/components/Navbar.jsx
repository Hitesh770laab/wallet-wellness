import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserMenu from './UserMenu';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tabs = ['Dashboard', 'Expenses', 'Insights', 'Goals'];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10, 8, 20, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid rgba(124,58,237,0.2)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => setActiveTab('hero')}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>
            💰
          </div>
          <span className="font-display font-bold text-white text-lg tracking-tight">
            Wallet<span className="gradient-text">Wellness</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl"
          style={{ background: 'rgba(26,23,48,0.5)' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-300 ${
                activeTab === tab.toLowerCase()
                  ? 'tab-active'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CTA + UserMenu */}
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            className="px-4 py-2.5 rounded-xl text-sm font-display font-semibold text-white neon-button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('expenses')}
          >
            <span>+ Add Expense</span>
          </motion.button>
          {user && <UserMenu />}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/60 hover:text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1.5">
            <motion.span
              className="block w-5 h-0.5 bg-current"
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-current"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-current"
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden mt-2 mx-4 glass-card rounded-2xl p-4"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-body text-white/70 hover:text-white hover:bg-white/5 transition-all"
                onClick={() => { setActiveTab(tab.toLowerCase()); setMenuOpen(false); }}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
