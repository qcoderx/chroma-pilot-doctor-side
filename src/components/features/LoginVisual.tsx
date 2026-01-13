import React from 'react';
import { motion } from 'framer-motion';
import logoMedium from '../../assets/images/logo-full.png';

export const LoginVisual: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 flex-col justify-between p-12 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          alt="Chroma-Pilot genomic analysis platform" 
          className="h-full w-full object-contain opacity-60 mix-blend-overlay" 
          src={logoMedium}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-slate-900/90 mix-blend-multiply" />
      </div>
      
      {/* Content over image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center gap-3"
      >
        <img
          src={logoMedium}
          alt="Chroma-Pilot Logo"
          className="h-16 w-auto object-contain"
          draggable={false}
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-lg"
      >
        <blockquote className="text-xl font-medium leading-relaxed text-slate-100">
          "Chroma-Pilot has revolutionized how we process clinical genomic data, reducing analysis time by 40% while maintaining the highest security standards."
        </blockquote>
        <div className="mt-6 flex items-center gap-4">
          <div 
            className="h-12 w-12 rounded-full bg-slate-200 bg-cover bg-center" 
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCNOk2REbCRSJ__g12eTMDPC_6fkM8VA4zpkf4OYyEXbyJ2PW4V7Y7E5jqOrHFySJVLdD95tuS1hfbgWCF4aNh9s__wNFG5Gp3fSHFZYluPPrYxaQW1h6CkxkshKp8w7NjRXtRErAdJTlmLktEotgX9NI_npDI3hUdQ2_xKi7IcX5toRaY8jLffYIRmjXBvgEj0vPkY7Jo8JcoR7lIVmWUHkoe8PiWIrDsL01kHXETCPCKI_G4irAvnvzECcVveouOm4Og28PPTY1s')"
            }}
          />
          <div>
            <p className="font-semibold text-white">Dr. Adunni Okafor</p>
            <p className="text-sm text-slate-300">Head of Genomics, Lagos University Teaching Hospital</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};