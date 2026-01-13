import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, AlertTriangle, Activity, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { DashboardMetrics } from '../../types/dashboard.types';

interface MetricsGridProps {
  metrics: DashboardMetrics;
}

const MetricCard: React.FC<{
  title: string;
  value: number;
  change?: number;
  icon: React.ReactNode;
  variant?: 'default' | 'critical' | 'warning' | 'success';
  subtitle?: string;
}> = ({ title, value, change, icon, variant = 'default', subtitle }) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  const cardVariants = {
    default: 'border-border',
    critical: 'border-clinical-critical/20 bg-clinical-critical/5',
    warning: 'border-clinical-warning/20 bg-clinical-warning/5',
    success: 'border-clinical-success/20 bg-clinical-success/5'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className={`${cardVariants[variant]} transition-all duration-200 hover:shadow-md`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="text-muted-foreground">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold">
              {value.toLocaleString()}
            </div>
            {change !== undefined && (
              <div className={`flex items-center text-xs ${
                isPositive ? 'text-clinical-success' : 
                isNegative ? 'text-clinical-critical' : 
                'text-muted-foreground'
              }`}>
                {isPositive && <TrendingUp className="h-3 w-3 mr-1" />}
                {isNegative && <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(change)}%
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">
              {subtitle}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MetricCard
        title="Total Patients"
        value={metrics.totalPatients}
        change={2.1}
        icon={<Users className="h-4 w-4" />}
        subtitle="Active in system"
      />
      
      <MetricCard
        title="Critical Alerts"
        value={metrics.criticalAlerts}
        icon={<AlertTriangle className="h-4 w-4" />}
        variant={metrics.criticalAlerts > 5 ? 'critical' : 'default'}
        subtitle="Require immediate action"
      />
      
      <MetricCard
        title="Genomes Processed"
        value={metrics.genomesProcessed}
        change={8.2}
        icon={<Activity className="h-4 w-4" />}
        variant="success"
        subtitle="This month"
      />
      
      <MetricCard
        title="Pending Reviews"
        value={metrics.pendingReviews}
        icon={<Clock className="h-4 w-4" />}
        variant={metrics.pendingReviews > 20 ? 'warning' : 'default'}
        subtitle="Awaiting clinician review"
      />
    </motion.div>
  );
};