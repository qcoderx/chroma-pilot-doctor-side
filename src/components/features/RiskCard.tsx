import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, FileText, TestTube, Dna, Activity, User } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { RiskCondition } from '../../types/riskAssessment.types';

interface RiskCardProps {
  condition: RiskCondition;
  index: number;
}

const getRiskIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'oncology': return TestTube;
    case 'cardiology': return Activity;
    case 'endocrinology': return User;
    default: return FileText;
  }
};

const getRiskVariant = (level: string) => {
  switch (level) {
    case 'critical': return 'critical';
    case 'high': return 'critical';
    case 'moderate': return 'warning';
    case 'low': return 'success';
    default: return 'info';
  }
};

const getBorderColor = (level: string) => {
  switch (level) {
    case 'critical': return '#ef4444';
    case 'high': return '#ef4444';
    case 'moderate': return '#f59e0b';
    case 'low': return '#10b981';
    default: return '#64748b';
  }
};

export const RiskCard: React.FC<RiskCardProps> = ({ condition, index }) => {
  const Icon = getRiskIcon(condition.category);
  const borderColor = getBorderColor(condition.riskLevel);
  const isHighRisk = condition.riskLevel === 'critical' || condition.riskLevel === 'high';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Card className={`overflow-hidden border-l-4 ${isHighRisk ? 'shadow-md' : ''}`} style={{ borderLeftColor: borderColor }}>
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-lg font-bold" style={{ color: '#0f172a' }}>
                  {condition.name}
                </h4>
                <Badge variant={getRiskVariant(condition.riskLevel)}>
                  {condition.riskLevel.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm" style={{ color: '#64748b' }}>
                {condition.description}
              </p>
            </div>
            
            <div className="flex items-center gap-4 min-w-[200px] justify-end">
              <div className="text-right">
                <div className="text-3xl font-bold" style={{ color: borderColor }}>
                  {condition.lifetimeRisk || condition.timeframeRisk?.value}%
                </div>
                <div className="text-xs font-medium uppercase tracking-wide" style={{ color: '#64748b' }}>
                  {condition.timeframeRisk?.timeframe || 'Lifetime Risk'}
                </div>
              </div>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${borderColor}15` }}
              >
                <Icon className="w-5 h-5" style={{ color: borderColor }} />
              </div>
            </div>
          </div>

          {/* Risk Visualizer */}
          {isHighRisk && (
            <div className="mb-6">
              <div className="flex justify-between text-xs font-medium mb-2" style={{ color: '#64748b' }}>
                <span>Population Average ({condition.populationAverage}%)</span>
                <span className="font-bold" style={{ color: borderColor }}>Patient Score</span>
              </div>
              <div className="h-4 w-full rounded-full relative overflow-hidden" style={{ backgroundColor: '#f1f5f9' }}>
                {/* Background zones */}
                <div className="absolute inset-0 flex w-full h-full opacity-30">
                  <div className="w-[20%] bg-emerald-400 h-full" />
                  <div className="w-[40%] bg-amber-400 h-full" />
                  <div className="w-[40%] bg-red-500 h-full" />
                </div>
                {/* Patient indicator */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-black z-10"
                  style={{ left: `${condition.patientScore}%` }}
                />
                {/* Progress fill */}
                <motion.div
                  className="h-full rounded-full"
                  style={{ 
                    background: 'linear-gradient(to right, #10b981, #f59e0b, #ef4444)',
                    width: `${condition.patientScore}%`
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${condition.patientScore}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                />
              </div>
            </div>
          )}

          {/* Factors Grid */}
          {isHighRisk && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg border mb-6" style={{ 
              backgroundColor: '#f8fafc', 
              borderColor: '#e2e8f0' 
            }}>
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: '#64748b' }}>
                  <Dna className="w-4 h-4" />
                  Genetic Factors
                </h5>
                <ul className="space-y-2">
                  {condition.factors.filter(f => f.type === 'genetic').map((factor) => (
                    <li key={factor.id} className="flex items-start gap-2 text-sm">
                      <span 
                        className="mt-1 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: getBorderColor(factor.severity) }}
                      />
                      <span style={{ color: '#0f172a' }}>
                        <span className="font-medium">{factor.name}</span>
                        {factor.description && ` (${factor.description})`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: '#64748b' }}>
                  <Activity className="w-4 h-4" />
                  Environmental / Lifestyle
                </h5>
                <ul className="space-y-2">
                  {condition.factors.filter(f => f.type !== 'genetic').map((factor) => (
                    <li key={factor.id} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span style={{ color: '#0f172a' }}>
                        {factor.name} {factor.description && `(${factor.description})`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Second Hit Alert */}
          {condition.secondHit?.detected && (
            <div className="flex items-start gap-3 p-4 rounded-lg border mb-6" style={{ 
              backgroundColor: 'rgba(245, 158, 11, 0.05)', 
              borderColor: 'rgba(245, 158, 11, 0.2)' 
            }}>
              <AlertTriangle className="w-6 h-6 mt-0.5" style={{ color: '#d97706' }} />
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: '#92400e' }}>
                  Second Hit Detected
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#a16207' }}>
                  {condition.secondHit.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        {condition.clinicalAction && (
          <div className="px-6 py-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4" style={{ 
            backgroundColor: '#f1f5f9', 
            borderColor: '#e2e8f0' 
          }}>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: '#137fec' }} />
              <span className="text-sm font-semibold" style={{ color: '#0f172a' }}>
                Clinical Action: {condition.clinicalAction}
              </span>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                  View Full Report
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="sm" className="flex-1 sm:flex-none flex items-center gap-2" style={{
                  backgroundColor: '#137fec',
                  color: '#ffffff'
                }}>
                  <TestTube className="w-4 h-4" />
                  Order Tests
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};