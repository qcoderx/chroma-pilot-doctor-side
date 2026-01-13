import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { LoginVisual } from '../components/features/LoginVisual';
import { LoginForm } from '../components/features/LoginForm';
import { useAuthStore } from '../store/authStore';

const LoginPage: React.FC = () => {
  const { isAuthenticated, clearError } = useAuthStore();

  useEffect(() => {
    clearError();
  }, [clearError]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="font-display bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white antialiased transition-colors duration-200">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex min-h-screen w-full flex-row overflow-hidden"
      >
        <LoginVisual />
        
        <div className="flex w-full lg:w-1/2 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-6 transition-colors duration-200">
          <LoginForm />
        </div>
      </motion.div>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155'
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#f1f5f9'
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#f1f5f9'
            }
          }
        }}
      />
    </div>
  );
};

export default LoginPage;