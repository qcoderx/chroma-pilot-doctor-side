import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, FileText, Info, ChevronRight, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ClinicalAlert } from '../../types/newDashboard.types';
import { formatDistanceToNow } from 'date-fns';

interface AlertsFeedProps {
  alerts: ClinicalAlert[];
}

const AlertIcon: React.FC<{ severity: ClinicalAlert['severity'] }> = ({ severity }) => {
  const iconMap = {
    Critical: AlertTriangle,
    Moderate: FileText,
    Info: Info,
  };
  
  const colorMap = {
    Critical: 'text-clinical-critical',
    Moderate: 'text-clinical-warning',
    Info: 'text-clinical-info',
  };
  
  const bgMap = {
    Critical: 'bg-clinical-critical/10',
    Moderate: 'bg-clinical-warning/10',
    Info: 'bg-clinical-info/10',
  };
  
  const Icon = iconMap[severity];
  
  return (
    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${bgMap[severity]} ${colorMap[severity]}`}>
      <Icon className="h-5 w-5" />
    </div>
  );
};

const AlertCard: React.FC<{ alert: ClinicalAlert; index: number }> = ({ alert, index }) => {
  const borderColors = {
    Critical: 'border-l-clinical-critical hover:border-clinical-critical/30',
    Moderate: 'border-l-clinical-warning hover:border-clinical-warning/30',
    Info: 'border-l-clinical-info hover:border-clinical-info/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={`p-4 border-l-4 ${borderColors[alert.severity]} bg-card hover:bg-muted/30 transition-all cursor-pointer group rounded-r-lg`}
    >
      <div className="flex gap-4">
        <AlertIcon severity={alert.severity} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors text-card-foreground">
                {alert.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {alert.patientName !== 'System' ? `Patient ${alert.patientName}` : alert.patientName}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <Badge 
              className={`text-xs ${
                alert.severity === 'Critical' ? 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10' :
                alert.severity === 'Moderate' ? 'inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20' :
                'inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10'
              }`}
            >
              {alert.severity}
            </Badge>
            <span className="text-muted-foreground">
              • {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const AlertsFeed: React.FC<AlertsFeedProps> = ({ alerts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Clinical Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, index) => (
          <AlertCard key={alert.id} alert={alert} index={index} />
        ))}
        
        <Button 
          variant="ghost" 
          className="w-full mt-4 text-primary hover:bg-primary/5 hover:text-primary border-dashed border border-transparent hover:border-primary/20"
        >
          View All Alerts
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};