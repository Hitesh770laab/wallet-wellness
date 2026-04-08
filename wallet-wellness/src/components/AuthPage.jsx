import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// ─── Tiny floating orb background specific to auth page ──────────────────────
function AuthOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { size: 500, color: '#7c3aed', top: '-10%', left: '-5%', delay: '0s' },
        { size: 380, color: '#3b82f6', bottom: '0%', right: '-8%', delay: '5s' },
        { size: 260, color: '#06b6d4', top: '50%', left: '45%', delay: '10s' },
      ].map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full aurora-orb"
          style={{
            width: o.size, height: o.size,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            top: o.top, bottom: o.bottom, left: o.left, right: o.right,
            animationDelay: o.delay,
          }}
        />
      ))}
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(124,58,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

// ─── Input Field ─────────────────────────────────────────────────────────────
function AuthInput({ label, type = 'text', value, onChange, placeholder, icon, error }) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === 'password';
  const actualType = isPassword && showPass ? 'text' : type;

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-body font-medium text-white/40 uppercase tracking-wider">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none" style={{ opacity: focused ? 1 : 0.4 }}>
            {icon}
          </span>
        )}
        <input
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full py-3.5 rounded-xl text-sm font-body text-white placeholder-white/20 outline-none transition-all duration-300"
          style={{
            paddingLeft: icon ? '2.75rem' : '1rem',
            paddingRight: isPassword ? '3rem' : '1rem',
            background: focused ? 'rgba(26,23,48,0.9)' : 'rgba(26,23,48,0.6)',
            border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : focused ? 'rgba(124,58,237,0.7)' : 'rgba(124,58,237,0.2)'}`,
            boxShadow: focused ? '0 0 0 3px rgba(124,58,237,0.1)' : 'none',
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(p => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors text-xs font-mono px-1"
          >
            {showPass ? 'HIDE' : 'SHOW'}
          </button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-xs text-red-400 font-body flex items-center gap-1"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          >
            ⚠ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Demo account banner ──────────────────────────────────────────────────────
function DemoBanner({ onFill }) {
  return (
    <motion.div
      className="rounded-xl p-3 flex items-center justify-between gap-3"
      style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-base flex-shrink-0">⚡</span>
        <div className="min-w-0">
          <p className="text-xs font-body text-blue-300 font-medium">Try demo account</p>
          <p className="text-xs text-white/30 font-mono truncate">demo@wallet.app · demo1234</p>
        </div>
      </div>
      <button
        onClick={onFill}
        className="text-xs font-body font-medium text-blue-400 hover:text-blue-300 whitespace-nowrap px-3 py-1.5 rounded-lg transition-all hover:bg-blue-400/10 flex-shrink-0"
      >
        Use it →
      </button>
    </motion.div>
  );
}

// ─── Main Auth Page ───────────────────────────────────────────────────────────
export default function AuthPage() {
  const { signIn, signUp, loading, error, clearError } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'signup'

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');

  // Field-level errors
  const [fieldErrors, setFieldErrors] = useState({});

  const switchTab = (t) => {
    setTab(t);
    setFieldErrors({});
    clearError();
  };

  const validateLogin = () => {
    const errs = {};
    if (!loginEmail) errs.loginEmail = 'Email is required';
    if (!loginPassword) errs.loginPassword = 'Password is required';
    return errs;
  };

  const validateSignup = () => {
    const errs = {};
    if (!signupName || signupName.trim().length < 2) errs.signupName = 'At least 2 characters';
    if (!signupEmail.includes('@')) errs.signupEmail = 'Enter a valid email';
    if (signupPassword.length < 6) errs.signupPassword = 'Minimum 6 characters';
    if (signupConfirm !== signupPassword) errs.signupConfirm = 'Passwords do not match';
    return errs;
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    clearError();
    const errs = validateLogin();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    await signIn({ email: loginEmail, password: loginPassword });
  };

  const handleSignup = async (e) => {
    e?.preventDefault();
    clearError();
    const errs = validateSignup();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    await signUp({ name: signupName, email: signupEmail, password: signupPassword });
  };

  const fillDemo = () => {
    setLoginEmail('demo@wallet.app');
    setLoginPassword('demo1234');
    setFieldErrors({});
    clearError();
  };

  // Pre-create demo account if it doesn't exist
  const ensureDemo = async () => {
    const db = JSON.parse(localStorage.getItem('ww_users_db') || '{}');
    if (!db['demo@wallet.app']) {
      await signUp({ name: 'Demo User', email: 'demo@wallet.app', password: 'demo1234' });
    }
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-4 relative overflow-hidden">
      <AuthOrbs />

      {/* Noise overlay handled by body::before in CSS */}

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>
            💰
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Wallet Wellness</h1>
          <p className="text-sm text-white/30 font-body mt-1">Master your money. Build better habits.</p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="glass-card rounded-3xl p-8"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Tab switcher */}
          <div className="flex gap-1 p-1 rounded-xl mb-7" style={{ background: 'rgba(10,8,20,0.6)' }}>
            {['login', 'signup'].map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className="flex-1 py-2.5 rounded-lg text-sm font-display font-semibold capitalize transition-all duration-300 relative"
                style={{
                  color: tab === t ? '#a78bfa' : 'rgba(255,255,255,0.3)',
                }}
              >
                {tab === t && (
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)' }}
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t === 'login' ? '🔑 Sign In' : '✨ Sign Up'}</span>
              </button>
            ))}
          </div>

          {/* Global error */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="mb-5 px-4 py-3 rounded-xl text-sm font-body text-red-300 flex items-center gap-2"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              >
                <span>⚠️</span> {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {tab === 'login' ? (
              <motion.form
                key="login"
                onSubmit={handleLogin}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <DemoBanner onFill={fillDemo} />

                <AuthInput
                  label="Email"
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  icon="📧"
                  error={fieldErrors.loginEmail}
                />
                <AuthInput
                  label="Password"
                  type="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="Your password"
                  icon="🔒"
                  error={fieldErrors.loginPassword}
                />

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full neon-button py-3.5 text-sm font-display font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <motion.span
                          className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Signing in...
                      </>
                    ) : (
                      <>Sign In →</>
                    )}
                  </span>
                </motion.button>

                <p className="text-center text-xs text-white/25 font-body">
                  No account?{' '}
                  <button type="button" onClick={() => switchTab('signup')} className="text-violet-400 hover:text-violet-300 transition-colors">
                    Create one free
                  </button>
                </p>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                onSubmit={handleSignup}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <AuthInput
                  label="Full Name"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  placeholder="Arjun Sharma"
                  icon="👤"
                  error={fieldErrors.signupName}
                />
                <AuthInput
                  label="Email"
                  type="email"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  placeholder="you@example.com"
                  icon="📧"
                  error={fieldErrors.signupEmail}
                />
                <AuthInput
                  label="Password"
                  type="password"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  icon="🔒"
                  error={fieldErrors.signupPassword}
                />
                <AuthInput
                  label="Confirm Password"
                  type="password"
                  value={signupConfirm}
                  onChange={e => setSignupConfirm(e.target.value)}
                  placeholder="Repeat password"
                  icon="✅"
                  error={fieldErrors.signupConfirm}
                />

                {/* Password strength */}
                {signupPassword.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => {
                        const strength = Math.min(4, Math.floor(
                          (signupPassword.length >= 6 ? 1 : 0) +
                          (/[A-Z]/.test(signupPassword) ? 1 : 0) +
                          (/[0-9]/.test(signupPassword) ? 1 : 0) +
                          (/[^A-Za-z0-9]/.test(signupPassword) ? 1 : 0)
                        ));
                        const colors = ['#ef4444', '#f97316', '#eab308', '#10b981'];
                        return (
                          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                            style={{ background: i < strength ? colors[strength - 1] : 'rgba(255,255,255,0.08)' }} />
                        );
                      })}
                    </div>
                    <p className="text-xs text-white/25 font-body">
                      {signupPassword.length < 6 ? 'Too short' :
                        !(/[A-Z]/.test(signupPassword)) ? 'Add uppercase letter' :
                        !(/[0-9]/.test(signupPassword)) ? 'Add a number' : 'Strong password! ✓'}
                    </p>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full neon-button py-3.5 text-sm font-display font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <motion.span
                          className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Creating account...
                      </>
                    ) : (
                      <>Create Account ✨</>
                    )}
                  </span>
                </motion.button>

                <p className="text-center text-xs text-white/25 font-body">
                  Already have one?{' '}
                  <button type="button" onClick={() => switchTab('login')} className="text-violet-400 hover:text-violet-300 transition-colors">
                    Sign in
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="text-center text-xs text-white/15 font-body mt-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        >
          🔒 Your data is stored locally on this device · No server required
        </motion.p>
      </div>
    </div>
  );
}
