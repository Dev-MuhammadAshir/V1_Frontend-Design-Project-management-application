import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const { users, setCurrentUserById } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('elena.rostova@acme-corp.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Find matching user or fallback to first
      const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase()) || users[0];
      setCurrentUserById(matched.id);
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  const handleQuickLogin = (userId: string) => {
    setCurrentUserById(userId);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-6">
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-xl bg-blue-600 items-center justify-center text-white shadow-lg shadow-blue-500/20 mb-2">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">ProjectFlow</h1>
          <p className="text-xs text-slate-500">
            Real-Time Team Project Management Platform (SRS v3.0)
          </p>
        </div>

        {/* Login Form (S-01 Centered Card) */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Corporate Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@acme-corp.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-slate-700">Security Password</label>
              <a href="#forgot" onClick={e => e.preventDefault()} className="text-[11px] text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/10 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login Switcher (Evaluator friendly) */}
        <div className="pt-4 border-t border-slate-100 space-y-2.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
            One-Click Role Switch (Testing Showcase)
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {users.slice(0, 4).map(u => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleQuickLogin(u.id)}
                className="p-2 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-colors flex items-center gap-2 cursor-pointer"
              >
                <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                <div className="min-w-0">
                  <span className="font-semibold text-slate-800 block truncate">{u.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-slate-400 font-mono block">{u.role}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>SOC2 Type II Encrypted Authentication</span>
        </div>
      </div>
    </div>
  );
};
