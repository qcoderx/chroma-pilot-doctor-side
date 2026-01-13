import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, AlertTriangle, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { DashboardStats } from '../../types/newDashboard.types';

interface StatsGridProps {
  stats: DashboardStats;
}

const StatCard: React.FC<{
  title: string;
  value: number;
  trend: number;
  icon: React.ReactNode;
  variant?: 'default' | 'critical' | 'success';
  subtitle?: string;
}> = ({ title, value, trend, icon, variant = 'default', subtitle }) => {
  const isPositive = trend > 0;
  const isNegative = trend < 0;
  
  const cardVariants = {
    default: 'border-border hover:border-primary/20 bg-card',
    critical: 'border-clinical-critical/20 bg-clinical-critical/5',
    success: 'border-clinical-success/20 bg-clinical-success/5'
  };

  const iconVariants = {
    default: 'bg-primary/10 text-primary',
    critical: 'bg-clinical-critical/10 text-clinical-critical',
    success: 'bg-clinical-success/10 text-clinical-success'
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
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${iconVariants[variant]}`}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <div className="text-3xl font-bold text-card-foreground">
              {value.toLocaleString()}
            </div>
            <div className={`flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
              isPositive ? 'text-clinical-success bg-clinical-success/10' : 
              isNegative ? 'text-clinical-critical bg-clinical-critical/10' : 
              'text-muted-foreground bg-muted'
            }`}>
              {isPositive && <TrendingUp className="h-3 w-3 mr-0.5" />}
              {isNegative && <TrendingDown className="h-3 w-3 mr-0.5" />}
              {isPositive ? '+' : ''}{trend}%
            </div>
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-2">
              {subtitle}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
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
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <StatCard
        title="Active Patients"
        value={stats.activePatients}
        trend={stats.activePatientsTrend}
        icon={<Users className="h-4 w-4" />}
        variant="success"
      />
      
      <StatCard
        title="High Risk Alerts"
        value={stats.highRiskAlerts}
        trend={stats.highRiskAlertsTrend}
        icon={<AlertTriangle className="h-4 w-4" />}
        variant={stats.highRiskAlerts > 10 ? 'critical' : 'default'}
        subtitle="Requires immediate attention"
      />
      
      <StatCard
        title="Genomes Processed"
        value={stats.genomesProcessed}
        trend={stats.genomesProcessedTrend}
        icon={<Activity className="h-4 w-4" />}
        variant="success"
        subtitle="Processed this month"
      />
    </motion.div>
  );
};