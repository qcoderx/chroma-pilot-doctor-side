import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  to, 
  label = 'Back', 
  className = '' 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors ${className}`}
      whileHover={{ x: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </motion.button>
  );
};