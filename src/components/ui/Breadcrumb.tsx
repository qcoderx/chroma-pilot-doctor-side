import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center space-x-1 text-sm mb-6">
      <motion.button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Home className="w-4 h-4" />
        <span>Dashboard</span>
      </motion.button>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          {item.path && !item.current ? (
            <motion.button
              onClick={() => navigate(item.path!)}
              className="text-slate-500 hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          ) : (
            <span className={item.current ? 'text-slate-900 font-medium' : 'text-slate-500'}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};