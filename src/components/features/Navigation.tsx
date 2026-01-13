import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import StarBorder from '../ui/StarBorder';
import { useLandingStore } from '../../store/landingStore';
import { navigationItems } from '../../mocks/landingData';
import logoMedium from '../../assets/images/logo-full.png';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useLandingStore();
  
  const handleNavClick = (href: string) => {
    closeMobileMenu();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleLoginClick = () => {
    navigate('/login');
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logoMedium}
            alt="Chroma-Pilot Logo"
            className="h-24 w-auto object-contain"
            draggable={false}
          />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        {/* Desktop CTA */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            className="hidden sm:flex"
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <StarBorder 
            color="#2563eb"
            speed="4s"
            className="hidden sm:flex hover:scale-105 transition-transform"
            onClick={() => handleNavClick('#cta')}
          >
            Request Demo
          </StarBorder>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        >
          <div className="px-4 py-4 space-y-4">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left text-base font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              className="w-full mt-4"
              onClick={handleLoginClick}
            >
              Login
            </Button>
            <StarBorder 
              color="#2563eb"
              speed="3s"
              className="w-full hover:scale-105 transition-transform"
              onClick={() => handleNavClick('#cta')}
            >
              Request Demo
            </StarBorder>
          </div>
        </motion.div>
      )}
    </header>
  );
};