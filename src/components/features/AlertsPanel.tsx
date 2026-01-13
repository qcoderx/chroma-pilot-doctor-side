import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, FlaskConical, Info, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ClinicalAlert } from '../../types/patientProfile.types';

interface AlertsPanelProps {
  alerts: ClinicalAlert[];
  onDismissAlert: (alertId: string) => void;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, onDismissAlert }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return FlaskConical;
      default: return Info;
    }
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          iconColor: '#ef4444',
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.05)'
        };
      case 'warning':
        return {
          iconColor: '#f59e0b',
          borderColor: '#f59e0b',
          backgroundColor: 'transparent'
        };
      default:
        return {
          iconColor: '#3b82f6',
          borderColor: '#3b82f6',
          backgroundColor: 'transparent'
        };
    }
  };

  const criticalCount = alerts.filter(alert => alert.type === 'critical').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="lg:col-span-2"
    >
      <Card>
        <div className="px-5 py-4 border-b flex justify-between items-center bg-slate-50/50" style={{ borderColor: '#e2e8f0' }}>
          <div className="flex items-center gap-2">
            <h3 className="font-bold" style={{ color: '#0f172a' }}>
              Active Alerts
            </h3>
            {criticalCount > 0 && (
              <Badge variant="critical">
                {criticalCount} Critical
              </Badge>
            )}
          </div>
          <button className="text-sm font-medium hover:underline" style={{ color: '#137fec' }}>
            View All History
          </button>
        </div>
        
        <div className="divide-y" style={{ borderColor: '#e2e8f0' }}>
          {alerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            const styles = getAlertStyles(alert.type);
            
            return (
              <motion.div
                key={alert.id}
                className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors border-l-4"
                style={{
                  borderLeftColor: styles.borderColor,
                  backgroundColor: styles.backgroundColor
                }}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
              >
                <div className="mt-1" style={{ color: styles.iconColor }}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold" style={{ color: '#0f172a' }}>
                      {alert.title}
                    </h4>
                    <span className="text-xs" style={{ color: '#64748b' }}>
                      {alert.timestamp}
                    </span>
                  </div>
                  
                  <p className="text-sm mt-1" style={{ color: '#64748b' }}>
                    {alert.description}
                  </p>
                  
                  {alert.actions && (
                    <div className="mt-2 flex gap-2">
                      {alert.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant={action.type === 'primary' ? 'default' : 'ghost'}
                          size="sm"
                          className="text-xs"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => onDismissAlert(alert.id)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
};