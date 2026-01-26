import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { useLogin, useForgotPassword } from '../../api/useAuth';
import { LoginCredentials } from '../../types/auth.types';
import { useAuthStore } from '../../store/authStore';
import logoMedium from '../../images/chromapilotlogo.png';

export const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  
  const { mutate: login } = useLogin();
  const { mutate: forgotPassword, isPending: isForgotPending } = useForgotPassword();
  const { isLoading, error } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword({ email: forgotEmail }, {
      onSuccess: () => {
        setShowForgotPassword(false);
        setForgotEmail('');
      }
    });
  };

  if (showForgotPassword) {
    return (
      <div className="w-full max-w-[440px] flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Reset Password
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </motion.div>

        <form onSubmit={handleForgotPassword} className="flex flex-col gap-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@hospital.com"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            required
          />
          
          <div className="flex gap-3">
            <Button 
              type="submit" 
              size="lg" 
              className="flex-1"
              isLoading={isForgotPending}
            >
              Send Reset Link
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="lg"
              onClick={() => setShowForgotPassword(false)}
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[440px] flex flex-col gap-8">
      <div className="flex items-center gap-2 lg:hidden text-slate-900 dark:text-white mb-4">
        <img
          src={logoMedium}
          alt="Chroma-Pilot Logo"
          className="h-12 w-auto object-contain"
          draggable={false}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Clinical Dashboard Login
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Securely access patient genomic data and reports.
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">error</span>
            <span className="text-sm font-medium">{error}</span>
          </div>
        </motion.div>
      )}

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit} 
        className="flex flex-col gap-5"
      >
        <Input
          label="Email Address"
          type="email"
          placeholder="name@hospital.com"
          value={credentials.email}
          onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={credentials.password}
          onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
          showPasswordToggle
          required
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={credentials.rememberMe}
            onChange={(e) => setCredentials(prev => ({ ...prev, rememberMe: e.target.checked }))}
          />
          <button
            type="button"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot Password?
          </button>
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="mt-2"
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </motion.form>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Don't have access?{' '}
          <Link 
            to="/landing" 
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            Request a Demo
          </Link>
        </p>
        
        <div className="mt-4 flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          Secure Clinical Access
        </div>
      </motion.div>
    </div>
  );
};