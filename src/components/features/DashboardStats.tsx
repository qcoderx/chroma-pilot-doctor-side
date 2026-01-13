import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '../ui/StatCard';
import { DashboardStats as StatsType } from '../../types/dashboard.types';

interface DashboardStatsProps {
  stats: StatsType;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
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
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="Dashboard statistics"
    >
      <StatCard
        title="Active Patients"
        value={stats.activePatients}
        change={stats.activePatientsChange}
        changeLabel="this week"
        icon="groups"
        iconColor="text-primary"
        iconBgColor="bg-blue-100"
        isPositive={stats.activePatientsChange > 0}
      />
      
      <StatCard
        title="High Risk Alerts"
        value={stats.highRiskAlerts}
        change={stats.highRiskAlertsChange}
        changeLabel="new today"
        icon="notification_important"
        iconColor="text-red-600"
        iconBgColor="bg-red-100"
        isPositive={false}
        subtitle="Requires immediate attention"
      />
      
      <StatCard
        title="Genomes Processed"
        value={stats.genomesProcessed}
        change={stats.genomesProcessedChange}
        changeLabel="this month"
        icon="biotech"
        iconColor="text-purple-600"
        iconBgColor="bg-purple-100"
        isPositive={stats.genomesProcessedChange > 0}
        subtitle="100% sequencing success rate"
      />
    </motion.div>
  );
};