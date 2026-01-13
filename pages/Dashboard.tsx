import React from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Search, Bell, User, ChevronDown, Dna } from 'lucide-react';
import { MetricsGrid } from '../src/components/features/MetricsGrid';
import { Button } from '../src/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/Card';
import { Badge } from '../src/components/ui/Badge';
import { useDashboardData } from '../src/api/useDashboard';
import { useDashboardStore } from '../src/store/dashboardStore';

const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
      ))}
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 h-96 bg-muted animate-pulse rounded-lg" />
      <div className="h-96 bg-muted animate-pulse rounded-lg" />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useDashboardData();
  const { searchQuery, setSearchQuery } = useDashboardStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="flex items-center space-x-2">
              <Dna className="h-6 w-6 text-primary" />
              <span className="font-bold">Chroma-Pilot</span>
            </div>
          </div>
        </header>
        <main className="container mx-auto py-6">
          <DashboardSkeleton />
        </main>
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dna className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Chroma-Pilot</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#" className="text-primary">Dashboard</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Patients</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Analytics</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Reports</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                className="flex h-9 w-64 rounded-md border border-input bg-background px-8 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">Dr. Ade</p>
                <p className="text-xs text-muted-foreground">Genomic Specialist</p>
              </div>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-6 space-y-6">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold tracking-tight">Clinical Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Dr. Ade. Here's your genomic medicine overview.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <MetricsGrid metrics={data.metrics} />

        {/* Dashboard Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Patients */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentPatients.slice(0, 5).map((patient) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-mono font-semibold text-primary">
                          {patient.initials}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">{patient.patientNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={patient.riskLevel === 'Critical' ? 'critical' : 
                                patient.riskLevel === 'Moderate' ? 'warning' : 'success'}
                      >
                        {patient.riskLevel}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{patient.condition}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.activeAlerts.slice(0, 4).map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 rounded-lg border-l-4 border-l-clinical-critical bg-clinical-critical/5 hover:bg-clinical-critical/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{alert.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.patientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {alert.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <Badge variant={alert.severity === 'Critical' ? 'critical' : 'warning'} className="text-xs">
                        {alert.severity}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Toaster position="top-right" />
    </div>
  );
};

export default Dashboard;