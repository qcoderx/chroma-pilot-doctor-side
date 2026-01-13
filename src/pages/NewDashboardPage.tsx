import React from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { DashboardHeader } from '../components/features/DashboardHeader';
import { StatsGrid } from '../components/features/StatsGrid';
import { PatientsTable } from '../components/features/PatientsTable';
import { AlertsFeed } from '../components/features/AlertsFeed';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNewDashboardData } from '../api/useNewDashboard';

const DashboardSkeleton = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
      ))}
    </div>
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 h-96 bg-muted animate-pulse rounded-lg" />
      <div className="h-96 bg-muted animate-pulse rounded-lg" />
    </div>
  </div>
);

const NewDashboardPage: React.FC = () => {
  const { data, isLoading, error } = useNewDashboardData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f6f7f8' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.img 
            src="/src/images/chromapilotlogo.png" 
            alt="Chroma-Pilot" 
            className="h-24 w-auto mx-auto mb-6"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="flex items-center justify-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: '#137fec' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: '#137fec' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: '#137fec' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
          </motion.div>
          <motion.p 
            className="mt-4 text-sm font-medium"
            style={{ color: '#64748b' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Loading clinical data...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-clinical-critical">Error Loading Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Unable to load dashboard data. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f6f7f8' }}>
      <DashboardHeader />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#0f172a' }}>Dashboard Overview</h1>
            <p style={{ color: '#64748b' }}>
              Welcome back, Dr. Ade. Here is today's summary of patient genomics.
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="mb-8">
          <StatsGrid stats={data.stats} />
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          <PatientsTable patients={data.recentPatients} />
          <AlertsFeed alerts={data.clinicalAlerts} />
        </div>
      </main>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#0f172a',
            border: '1px solid #e2e8f0',
          },
        }}
      />
    </div>
  );
};

export default NewDashboardPage;