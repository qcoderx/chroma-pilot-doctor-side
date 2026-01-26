import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useLogout } from '../../api/useAuth';
import logoImage from '../../images/chromapilotlogo.png';

export const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 font-semibold"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-600 hover:text-slate-900"
              onClick={() => navigate('/patients')}
            >
              Patients
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-600 hover:text-slate-900"
              onClick={() => navigate('/add-patient')}
            >
              Add Patient
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-600 hover:text-slate-900"
              onClick={() => navigate('/analytics')}
            >
              Analytics
            </Button>
          </nav>
        </div>
        
        {/* Right Side: Search & User */}
        <div className="flex flex-1 justify-end items-center gap-4">
          <div className="hidden sm:block relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search patients, genomic data..."
              className="pl-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
            />
          </div>
          
          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-4 ml-2">
            <div className="relative">
              <motion.button 
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Dr. Ade</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Genomic Specialist</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center ring-2 ring-blue-200 dark:ring-blue-800">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // Navigate to settings when implemented
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <hr className="my-1 border-slate-200 dark:border-slate-700" />
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Backdrop */}
              {showUserMenu && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};