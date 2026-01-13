import React from 'react';
import { motion } from 'framer-motion';
import { Dna } from 'lucide-react';
import { GenomicSummary } from '../../types/diagnosis.types';

interface GenomicSummaryCardProps {
  summary: GenomicSummary;
}

export const GenomicSummaryCard: React.FC<GenomicSummaryCardProps> = ({ summary }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="rounded-xl shadow-sm p-5 text-white relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #4338ca 0%, #1e40af 100%)'
      }}
    >
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-1">Genomic Summary</h3>
        <p className="text-blue-200 text-sm mb-4">
          {summary.sequencingType} ({summary.coverage})
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="rounded-lg p-3 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.15 }}
          >
            <p className="text-2xl font-bold">{summary.pathogenicCount}</p>
            <p className="text-xs text-blue-200">Pathogenic</p>
          </motion.div>
          
          <motion.div
            className="rounded-lg p-3 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.15 }}
          >
            <p className="text-2xl font-bold">{summary.vusCount}</p>
            <p className="text-xs text-blue-200">VUS</p>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute right-[-20px] top-[-20px] opacity-10">
        <Dna className="w-36 h-36" />
      </div>
    </motion.div>
  );
};