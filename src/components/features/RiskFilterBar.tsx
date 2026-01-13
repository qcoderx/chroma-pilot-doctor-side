import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { useRiskAssessmentStore } from '../../store/riskAssessmentStore';
import { RiskFilterType } from '../../types/riskAssessment.types';

const filterOptions: { value: RiskFilterType; label: string; variant: any }[] = [
  { value: 'critical', label: 'Critical', variant: 'critical' },
  { value: 'moderate', label: 'Moderate', variant: 'warning' },
  { value: 'low', label: 'Low', variant: 'success' }
];

export const RiskFilterBar: React.FC = () => {
  const { searchQuery, activeFilter, setSearchQuery, setActiveFilter } = useRiskAssessmentStore();

  return (
    <Card className="p-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#64748b' }} />
          <Input
            placeholder="Search conditions (e.g., Diabetes, BRCA)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-sm font-medium whitespace-nowrap" style={{ color: '#64748b' }}>
            Filter by risk:
          </span>
          <div className="flex gap-2">
            {filterOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setActiveFilter(activeFilter === option.value ? 'all' : option.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  activeFilter === option.value ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                }`}
              >
                <Badge variant={option.variant} className="border-0">
                  {option.label}
                </Badge>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};