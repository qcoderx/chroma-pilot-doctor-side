import React from 'react';
import { motion } from 'framer-motion';
import { Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../ui/Input';

export const PatientProfileHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 bg-white border-b"
      style={{ borderColor: '#e2e8f0' }}
    >
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/dashboard')}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src="/src/images/chromapilotlogo.png" 
              alt="Chroma-Pilot" 
              className="h-8 w-8"
            />
            <h2 className="text-xl font-bold tracking-tight" style={{ color: '#0f172a' }}>
              Chroma-Pilot
            </h2>
          </motion.div>
          
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-5 h-5" style={{ color: '#64748b' }} />
            <Input
              placeholder="Search patients, ID..."
              className="pl-10 pr-4 py-2 w-64 text-sm focus:ring-2 focus:ring-primary/50"
              style={{
                backgroundColor: '#f1f5f9',
                borderColor: 'transparent',
                color: '#0f172a'
              }}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex gap-6">
            <motion.button
              onClick={() => navigate('/dashboard')}
              className="text-sm font-medium transition-colors hover:text-primary"
              style={{ color: '#64748b' }}
              whileHover={{ scale: 1.05 }}
            >
              Dashboard
            </motion.button>
            <motion.button
              onClick={() => navigate('/patients')}
              className="text-sm font-medium"
              style={{ color: '#0f172a' }}
              whileHover={{ scale: 1.05 }}
            >
              Patients
            </motion.button>
            <motion.button
              className="text-sm font-medium transition-colors hover:text-primary"
              style={{ color: '#64748b' }}
              whileHover={{ scale: 1.05 }}
            >
              Settings
            </motion.button>
          </nav>
          
          <div className="flex items-center gap-3 pl-6 border-l" style={{ borderColor: '#e2e8f0' }}>
            <div 
              className="rounded-full w-9 h-9 ring-2 bg-cover bg-center"
              style={{ 
                backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuD8YladLN5QUmOL_caXzcpbU-qZopWRBctSdS62-RpKoeCDyhLedQYdRVXCeZK8DwCCtTI9E0_0FH0NKLoMqi-4kj9YgHNUjenUi8wMN0T70w4FvFqGVNK2KbLo0Q-2M9z2agQ2GQr_bqxOGhYEo0j35Ouz5vBG7Qiv4ThIdmHQhXMEy-KF1vK9fZweDaLzMzlsbcN3gFcS1o5lsHPT4y46SHfJImAtrEa5e0rToaTzDxO9nPSzC4uBWcrkui_m3WgKhnSb-YDzjB8)',
                ringColor: '#f1f5f9'
              }}
            />
            <div className="hidden sm:block">
              <p className="text-xs font-medium" style={{ color: '#64748b' }}>
                Logged in as
              </p>
              <p className="text-sm font-bold leading-tight" style={{ color: '#0f172a' }}>
                Dr. S. Miller
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};