import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen, ArrowRight, AlertTriangle, Pill } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { DiagnosticLead } from '../../types/diagnosis.types';
import { useDiagnosisStore } from '../../store/diagnosisStore';

interface DiagnosticLeadCardProps {
  lead: DiagnosticLead;
  index: number;
}

const getClassificationVariant = (classification: string) => {
  switch (classification) {
    case 'pathogenic': return 'critical';
    case 'likely_pathogenic': return 'warning';
    case 'vus': return 'info';
    default: return 'success';
  }
};

const getBorderColor = (classification: string) => {
  switch (classification) {
    case 'pathogenic': return '#ef4444';
    case 'likely_pathogenic': return '#f59e0b';
    case 'vus': return '#64748b';
    default: return '#10b981';
  }
};

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'warning': return AlertTriangle;
    case 'recommendation': return Pill;
    default: return AlertTriangle;
  }
};

const getAlertStyles = (severity: string) => {
  switch (severity) {
    case 'critical':
      return {
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        borderColor: 'rgba(239, 68, 68, 0.1)',
        iconColor: '#dc2626',
        textColor: '#7f1d1d'
      };
    case 'moderate':
      return {
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        borderColor: 'rgba(16, 185, 129, 0.1)',
        iconColor: '#059669',
        textColor: '#064e3b'
      };
    default:
      return {
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderColor: 'rgba(59, 130, 246, 0.1)',
        iconColor: '#2563eb',
        textColor: '#1e3a8a'
      };
  }
};

export const DiagnosticLeadCard: React.FC<DiagnosticLeadCardProps> = ({ lead, index }) => {
  const { expandedLeads, toggleLeadExpansion } = useDiagnosisStore();
  const isExpanded = expandedLeads.has(lead.id);
  const borderColor = getBorderColor(lead.classification);
  const isHighPriority = lead.priority === 'high';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Card 
        className={`border-l-4 overflow-hidden group transition-all ${
          isHighPriority ? 'shadow-md hover:shadow-lg' : 'opacity-90 hover:opacity-100'
        }`}
        style={{ borderLeftColor: borderColor }}
      >
        {/* Card Header */}
        <div className="p-5 pb-3 border-b flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ borderColor: '#f0f4f8' }}>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h4 className="text-xl font-bold" style={{ color: '#0f172a' }}>
                {lead.gene}
              </h4>
              <Badge variant={getClassificationVariant(lead.classification)}>
                {lead.classification.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm" style={{ color: '#64748b' }}>
              {lead.condition} • Sodium Channel, Neuronal Type 1
            </p>
          </div>
          
          <div className="text-right md:text-right flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-0">
            <span className="text-xs font-mono px-2 py-1 rounded" style={{ 
              backgroundColor: '#f1f5f9', 
              color: '#64748b' 
            }}>
              {lead.variant.dna}
            </span>
            <span className="text-xs mt-1" style={{ color: '#64748b' }}>
              {lead.variant.protein}
            </span>
          </div>
        </div>

        {/* Expandable Content */}
        {(isExpanded || isHighPriority) && (
          <motion.div
            initial={isHighPriority ? {} : { height: 0, opacity: 0 }}
            animate={isHighPriority ? {} : { height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Evidence Column */}
              <div className="flex flex-col gap-4">
                <h5 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748b' }}>
                  Evidence & Scores
                </h5>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#f6f7f8' }}>
                    <p className="text-xs mb-1" style={{ color: '#64748b' }}>AlphaMissense</p>
                    <p className="text-sm font-bold flex items-center gap-1" style={{ color: '#0f172a' }}>
                      {lead.evidence.alphaMissense.toFixed(2)}
                      <span className="text-red-500 text-[10px]">
                        ({lead.evidence.alphaMissense > 0.8 ? 'High' : 'Moderate'})
                      </span>
                    </p>
                  </div>
                  
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#f6f7f8' }}>
                    <p className="text-xs mb-1" style={{ color: '#64748b' }}>ClinVar</p>
                    <p className="text-sm font-bold" style={{ color: '#0f172a' }}>
                      {lead.evidence.clinVar.classification} ({lead.evidence.clinVar.stars} stars)
                    </p>
                  </div>
                  
                  <div className="p-3 rounded-lg col-span-2" style={{ backgroundColor: '#f6f7f8' }}>
                    <p className="text-xs mb-1" style={{ color: '#64748b' }}>Phenotype Match</p>
                    <div className="w-full h-2 rounded-full mt-1 overflow-hidden" style={{ backgroundColor: '#e2e8f0' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: '#137fec', width: `${lead.evidence.phenotypeMatch.percentage}%` }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${lead.evidence.phenotypeMatch.percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      />
                    </div>
                    <p className="text-[10px] text-right mt-1 font-medium" style={{ color: '#137fec' }}>
                      {lead.evidence.phenotypeMatch.matched}/{lead.evidence.phenotypeMatch.total} Symptoms Matched
                    </p>
                  </div>
                </div>
              </div>

              {/* Clinical Impact Column */}
              <div className="flex flex-col gap-3">
                <h5 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748b' }}>
                  Clinical Impact
                </h5>
                
                {lead.clinicalImpact.alerts?.map((alert, alertIndex) => {
                  const Icon = getAlertIcon(alert.type);
                  const styles = getAlertStyles(alert.severity);
                  
                  return (
                    <div
                      key={alertIndex}
                      className="rounded-lg p-3 flex gap-3 items-start border"
                      style={{
                        backgroundColor: styles.backgroundColor,
                        borderColor: styles.borderColor
                      }}
                    >
                      <Icon className="mt-0.5 shrink-0 w-4 h-4" style={{ color: styles.iconColor }} />
                      <div>
                        <p className="text-xs font-bold" style={{ color: styles.textColor }}>
                          {alert.title}
                        </p>
                        <p className="text-xs mt-1 leading-snug" style={{ color: styles.textColor }}>
                          {alert.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Card Footer */}
        <div className="px-5 py-3 border-t flex justify-between items-center" style={{ 
          backgroundColor: '#f6f7f8', 
          borderColor: '#e2e8f0' 
        }}>
          <div className="flex items-center gap-3">
            <button className="text-xs font-medium flex items-center gap-1 transition-colors" style={{ color: '#64748b' }}>
              <BookOpen className="w-4 h-4" />
              View Literature ({lead.literatureCount})
            </button>
            
            {!isHighPriority && (
              <>
                <div className="h-4 w-px my-auto" style={{ backgroundColor: '#cbd5e1' }} />
                <motion.button
                  onClick={() => toggleLeadExpansion(lead.id)}
                  className="text-xs font-medium flex items-center gap-1 transition-colors"
                  style={{ color: '#137fec' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isExpanded ? (
                    <>
                      Collapse <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Expand <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </>
            )}
          </div>
          
          <button className="text-xs font-medium flex items-center gap-1 transition-colors" style={{ color: '#137fec' }}>
            Details <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </motion.div>
  );
};