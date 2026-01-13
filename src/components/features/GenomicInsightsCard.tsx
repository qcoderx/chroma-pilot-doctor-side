import React from 'react';
import { motion } from 'framer-motion';
import { Dna, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { GenomicInsight } from '../../types/patientProfile.types';

interface GenomicInsightsCardProps {
  insights: GenomicInsight[];
}

export const GenomicInsightsCard: React.FC<GenomicInsightsCardProps> = ({ insights }) => {
  const getRiskStyles = (risk: string) => {
    switch (risk) {
      case 'high':
        return { color: '#dc2626', icon: AlertCircle };
      case 'medium':
        return { color: '#d97706', icon: AlertCircle };
      default:
        return { color: '#0f172a', icon: CheckCircle };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <Card className="flex flex-col h-full">
        <div className="px-5 py-4 border-b bg-slate-50/50" style={{ borderColor: '#e2e8f0' }}>
          <h3 className="font-bold flex items-center gap-2" style={{ color: '#0f172a' }}>
            <Dna className="w-5 h-5" style={{ color: '#8b5cf6' }} />
            Genomic Insight
          </h3>
        </div>
        
        <div className="p-5 flex-1 flex flex-col gap-4">
          {insights.map((insight, index) => {
            const riskStyles = getRiskStyles(insight.risk);
            const Icon = riskStyles.icon;
            
            return (
              <motion.div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border"
                style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
              >
                <div>
                  <p className="text-xs uppercase font-semibold" style={{ color: '#64748b' }}>
                    {insight.gene}
                  </p>
                  <p className="text-sm font-bold" style={{ color: riskStyles.color }}>
                    {insight.status}
                  </p>
                </div>
                <Icon className="w-5 h-5" style={{ color: '#cbd5e1' }} />
              </motion.div>
            );
          })}
          
          <Button
            variant="ghost"
            className="mt-auto w-full py-2 text-sm font-medium hover:bg-slate-50 rounded transition-colors"
            style={{ color: '#137fec' }}
          >
            View Full Genomic Report
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};