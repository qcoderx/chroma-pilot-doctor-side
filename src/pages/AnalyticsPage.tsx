import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, AlertTriangle, Activity, BarChart3, PieChart } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';

const AnalyticsPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics', href: '#', isActive: true }
  ];

  const stats = [
    {
      title: 'Total Genomes Analyzed',
      value: '1,284',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Actionable PGx Variants',
      value: '18.4%',
      change: '+2.1%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-amber-600'
    },
    {
      title: 'High-Risk Patients',
      value: '142',
      change: '-5%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-red-600'
    },
    {
      title: 'Active Monitoring',
      value: '89%',
      change: '+3%',
      trend: 'up',
      icon: Activity,
      color: 'text-green-600'
    }
  ];

  const variantData = [
    { gene: 'BRCA1/2', condition: 'Hereditary Cancer', prevalence: '12%', risk: 'High', color: 'bg-red-500' },
    { gene: 'LDLR', condition: 'Hypercholesterolemia', prevalence: '28%', risk: 'Medium', color: 'bg-orange-500' },
    { gene: 'HFE', condition: 'Hemochromatosis', prevalence: '8%', risk: 'Medium', color: 'bg-yellow-500' },
    { gene: 'CFTR', condition: 'Cystic Fibrosis Carrier', prevalence: '15%', risk: 'Low', color: 'bg-blue-500' },
    { gene: 'Lynch Genes', condition: 'Lynch Syndrome', prevalence: '5%', risk: 'High', color: 'bg-red-600' }
  ];

  const pgxAlerts = [
    { drug: 'Clopidogrel', gene: 'CYP2C19', patients: 42, impact: 'Poor Metabolizers', severity: 'High' },
    { drug: 'Warfarin', gene: 'VKORC1/CYP2C9', patients: 35, impact: 'Dose Sensitivity', severity: 'Medium' },
    { drug: 'Codeine', gene: 'CYP2D6', patients: 18, impact: 'Ultrarapid Metabolizers', severity: 'High' },
    { drug: 'Simvastatin', gene: 'SLCO1B1', patients: 64, impact: 'Myopathy Risk', severity: 'Medium' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Population Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Genomic insights across patient cohorts
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                    <Badge 
                      className={`${stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.title}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Variant Prevalence */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Pathogenic Variant Prevalence
              </h2>
            </div>
            <div className="space-y-4">
              {variantData.map((variant, index) => (
                <div key={variant.gene} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <div className={`w-3 h-3 rounded-full ${variant.color}`} />
                      <span className="font-medium text-slate-900 dark:text-white">
                        {variant.gene}
                      </span>
                      <Badge 
                        className={`text-xs ${
                          variant.risk === 'High' ? 'bg-red-100 text-red-700' :
                          variant.risk === 'Medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {variant.risk}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {variant.condition}
                    </p>
                  </div>
                  <span className="font-mono text-lg font-bold text-slate-900 dark:text-white">
                    {variant.prevalence}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Trend Chart Placeholder */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Monthly Genomic Analysis Trends
              </h2>
            </div>
            <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-500 dark:text-slate-400">
                  Chart visualization would be rendered here
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Pharmacogenomics Alerts Table */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            Pharmacogenomics Population Alerts
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Drug
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Associated Gene
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Affected Patients
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Clinical Impact
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody>
                {pgxAlerts.map((alert, index) => (
                  <tr key={index} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                      {alert.drug}
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">
                      {alert.gene}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-900 dark:text-white">
                      {alert.patients}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {alert.impact}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge 
                        className={`${
                          alert.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {alert.severity}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AnalyticsPage;