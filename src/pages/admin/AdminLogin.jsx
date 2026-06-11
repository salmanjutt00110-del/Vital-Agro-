import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Loader2, AlertTriangle } from 'lucide-react';
import vitalAgroLogo from '@/assets/vital agro logo.webp';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      console.error("Login failed:", err);
      // Friendly messages for common Firebase Auth errors
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid admin credentials. Please try again.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many login attempts. Access has been temporarily restricted.');
      } else {
        setError(err.message || 'An error occurred during authentication.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080f08] flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background neon elements */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#76C945]/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-[#C5A059]/5 rounded-full filter blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-8 sm:p-10 shadow-2xl"
      >
        {/* Logo and Brand */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-white/10 rounded-2xl px-5 py-2 mb-4 border border-white/10 shadow-md">
            <img
              src={vitalAgroLogo}
              alt="Vital Agro Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Admin Portal Login
          </h2>
          <p className="text-white/40 text-xs mt-1 font-medium">
            Vital Agro Chemical Industries
          </p>
        </div>

        {/* Error Notification */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex gap-2.5 items-start p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs mb-6"
            >
              <AlertTriangle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email field */}
          <div className="w-full">
            <label className="block text-white/50 text-xs mb-1.5 font-bold tracking-wide uppercase">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                placeholder="admin@vitalagro.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm text-white bg-white/5 border border-white/10 outline-none placeholder:text-white/20 focus:border-[#76C945]/40 focus:bg-white/8 transition-all duration-300"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="w-full">
            <label className="block text-white/50 text-xs mb-1.5 font-bold tracking-wide uppercase">
              Security Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm text-white bg-white/5 border border-white/10 outline-none placeholder:text-white/20 focus:border-[#76C945]/40 focus:bg-white/8 transition-all duration-300"
              />
            </div>
          </div>

          {/* Sign In Trigger */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#2d6a2d] to-[#3d8c3d] text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(92,184,92,0.3)] disabled:opacity-50 transition-all duration-300 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
                <span>Verifying Access...</span>
              </>
            ) : (
              <span>Authorize Login</span>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
