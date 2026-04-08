import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  const menuItems = [
    { icon: '👤', label: 'Profile', action: null },
    { icon: '⚙️', label: 'Settings', action: null },
    { icon: '📊', label: 'Export Data', action: null },
    { type: 'divider' },
    { icon: '🚪', label: 'Sign Out', action: signOut, danger: true },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-white/[0.05]"
        style={{ border: '1px solid rgba(124,58,237,0.2)' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Avatar */}
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-display font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
        >
          {initials}
        </div>
        <span className="text-sm font-body text-white/70 hidden sm:block max-w-[100px] truncate">
          {user?.name?.split(' ')[0]}
        </span>
        <motion.svg
          className="w-3 h-3 text-white/30"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-56 glass-card rounded-2xl py-2 overflow-hidden z-50"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* User info header */}
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-display font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                >
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-display font-semibold text-white truncate">{user?.name}</p>
                  <p className="text-xs text-white/30 font-mono truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-1.5">
              {menuItems.map((item, i) => {
                if (item.type === 'divider') {
                  return <div key={i} className="h-px mx-3 my-1.5" style={{ background: 'rgba(255,255,255,0.05)' }} />;
                }
                return (
                  <button
                    key={i}
                    onClick={() => { item.action?.(); setOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-body transition-all duration-150 text-left"
                    style={{ color: item.danger ? 'rgba(239,68,68,0.8)' : 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={e => e.currentTarget.style.background = item.danger ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-4 pb-2 pt-1 border-t border-white/[0.06]">
              <p className="text-[10px] text-white/15 font-mono">
                Member since {new Date(user?.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
