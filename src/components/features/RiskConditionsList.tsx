import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { RiskCard } from './RiskCard';
import { RiskCondition, RiskLevel } from '../../types/riskAssessment.types';
import { useRiskAssessmentStore } from '../../store/riskAssessmentStore';

interface RiskConditionsListProps {
  conditions: RiskCondition[];
}

const getRiskSectionIcon = (level: RiskLevel) => {
  switch (level) {
    case 'critical':
    case 'high':
      return AlertTriangle;
    case 'moderate':
      return AlertCircle;
    case 'low':
      return CheckCircle;
    default:
      return CheckCircle;
  }
};

const getRiskSectionColor = (level: RiskLevel) => {
  switch (level) {
    case 'critical':
    case 'high':
      return '#dc2626';
    case 'moderate':
      return '#d97706';
    case 'low':
      return '#059669';
    default:
      return '#64748b';
  }
};

const getRiskSectionTitle = (level: RiskLevel) => {
  switch (level) {
    case 'critical':
    case 'high':
      return 'High Risk Conditions (Critical)';
    case 'moderate':
      return 'Moderate Risk Conditions';
    case 'low':
      return 'Low Risk Conditions';
    default:
      return 'Other Conditions';
  }
};

export const RiskConditionsList: React.FC<RiskConditionsListProps> = ({ conditions }) => {
  const { searchQuery, activeFilter } = useRiskAssessmentStore();

  const filteredConditions = useMemo(() => {
    let filtered = conditions;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(condition =>
        condition.name.toLowerCase().includes(query) ||
        condition.category.toLowerCase().includes(query) ||
        condition.factors.some(factor => 
          factor.name.toLowerCase().includes(query) ||
          factor.description.toLowerCase().includes(query)
        )
      );
    }

    // Apply risk level filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(condition => {
        if (activeFilter === 'critical') {
          return condition.riskLevel === 'critical' || condition.riskLevel === 'high';
        }
        return condition.riskLevel === activeFilter;
      });
    }

    return filtered;
  }, [conditions, searchQuery, activeFilter]);

  const groupedConditions = useMemo(() => {
    const groups: Record<RiskLevel, RiskCondition[]> = {
      critical: [],
      high: [],
      moderate: [],
      low: []
    };

    filteredConditions.forEach(condition => {
      if (condition.riskLevel === 'critical' || condition.riskLevel === 'high') {
        groups.critical.push(condition);
      } else {
        groups[condition.riskLevel].push(condition);
      }
    });

    return groups;
  }, [filteredConditions]);

  if (filteredConditions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#f1f5f9' }}>
          <CheckCircle className="w-8 h-8" style={{ color: '#64748b' }} />
        </div>
        <h3 className="text-lg font-medium mb-2" style={{ color: '#0f172a' }}>
          No conditions found
        </h3>
        <p style={{ color: '#64748b' }}>
          {searchQuery ? 'Try adjusting your search terms or filters.' : 'No risk conditions match the current filters.'}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {Object.entries(groupedConditions).map(([level, levelConditions]) => {
        if (levelConditions.length === 0) return null;

        const Icon = getRiskSectionIcon(level as RiskLevel);
        const color = getRiskSectionColor(level as RiskLevel);
        const title = getRiskSectionTitle(level as RiskLevel);
        const isLowRisk = level === 'low';

        return (
          <motion.div
            key={level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 px-2">
              <Icon className="w-6 h-6" style={{ color }} />
              <h3 className="text-xl font-bold" style={{ color: '#0f172a' }}>
                {title}
              </h3>
            </div>

            {isLowRisk ? (
              // Condensed view for low risk conditions
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {levelConditions.map((condition, index) => (
                  <motion.div
                    key={condition.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border p-4 flex justify-between items-center"
                    style={{ borderColor: '#e2e8f0' }}
                  >
                    <div>
                      <h4 className="font-bold" style={{ color: '#0f172a' }}>
                        {condition.name}
                      </h4>
                      <p className="text-xs mt-1" style={{ color: '#64748b' }}>
                        Population Avg: {condition.populationAverage}% | Patient: {condition.patientScore}%
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-700">
                      LOW RISK
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Full cards for high/moderate risk
              <div className="space-y-4">
                {levelConditions.map((condition, index) => (
                  <RiskCard
                    key={condition.id}
                    condition={condition}
                    index={index}
                  />
                ))}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};