import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import StarBorder from '../ui/StarBorder';
import { useLandingStore } from '../../store/landingStore';

export const CTASection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { submitEmail, isSubmittingEmail, emailSubmitted } = useLandingStore();
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    try {
      await submitEmail(email);
      setEmail('');
      toast.success('Thank you! We\'ll be in touch soon.');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };
  
  if (emailSubmitted) {
    return (
      <section className="py-24 bg-white dark:bg-slate-800 relative overflow-hidden" id="cta">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent"></div>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20">
              <span className="material-symbols-outlined text-2xl text-green-600">check_circle</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Thank you for your interest!
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              We'll be in touch within 24 hours to schedule your personalized demo and discuss your genomic workflow needs.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-24 bg-white dark:bg-slate-800 relative overflow-hidden" id="cta">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent"></div>
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Ready to modernize your lab?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Join the network of hospitals using Chroma-Pilot to deliver precision medicine at scale. Request a demo today.
          </p>
          
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row"
          >
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                className="w-full"
                autoComplete="email"
                required
              />
            </div>
            <StarBorder 
              type="submit"
              color="#2563eb"
              speed="3s"
              className="flex-none sm:mt-0 hover:scale-105 transition-transform"
            >
              {isSubmittingEmail ? 'Submitting...' : 'Get Started'}
            </StarBorder>
          </motion.form>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-4 text-xs text-slate-500 dark:text-slate-400"
          >
            No credit card required. HIPAA compliant trial environment.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};