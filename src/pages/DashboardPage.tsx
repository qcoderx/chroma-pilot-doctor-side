import React from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { DashboardHeader } from '../components/features/DashboardHeader';
import { useDashboardData } from '../api/useDashboard';
import { useGlobalPatientStore } from '../store/globalPatientStore';
import { TrendingUp, Users, AlertTriangle, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { data: dashboardData, isLoading, error } = useDashboardData();
  const { getPatientStats } = useGlobalPatientStore();
  const navigate = useNavigate();
  
  const stats = getPatientStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <DashboardHeader />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <DashboardHeader />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              Failed to load dashboard
            </h3>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-200">
      <DashboardHeader />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
        {/* Page Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Welcome back, Dr. Ade. Here is today's summary of patient genomics.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-600 dark:text-slate-400 font-medium">Active Patients</p>
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-600 dark:text-slate-400 font-medium">High Risk Alerts</p>
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.criticalAlerts}</p>
              <span className="inline-flex items-center text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +2%
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Requires immediate attention</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-600 dark:text-slate-400 font-medium">Genomes Processed</p>
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-slate-900 dark:text-white">89</p>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +5%
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Processed this month</p>
          </motion.div>
        </div>

        {/* Dashboard Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Patients Table */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Patients</h3>
              <button 
                onClick={() => navigate('/patients')}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View All
              </button>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Patient</th>
                      <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">ID</th>
                      <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Condition</th>
                      <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Risk Level</th>
                      <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      { name: 'Adunni Okafor', id: '#CP-8841', condition: 'Breast Cancer', risk: 'Critical', initials: 'AO' },
                      { name: 'Kemi Adeleke', id: '#CP-7729', condition: 'Huntington\'s', risk: 'Moderate', initials: 'KA' },
                      { name: 'Tunde Bakare', id: '#CP-6618', condition: 'Cystic Fibrosis', risk: 'Stable', initials: 'TB' },
                      { name: 'Bola Tinubu', id: '#CP-2109', condition: 'Lynch Syndrome', risk: 'Stable', initials: 'BT' }
                    ].map((patient) => (
                      <tr key={patient.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer" onClick={() => navigate(`/patient/CP-8841`)}>
                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                              {patient.initials}
                            </div>
                            <span>{patient.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{patient.id}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{patient.condition}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            patient.risk === 'Critical' ? 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-900/20 dark:text-red-400' :
                            patient.risk === 'Moderate' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-400' :
                            'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400'
                          }`}>
                            {patient.risk}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Clinical Alerts Sidebar */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Clinical Alerts</h3>
            <div className="space-y-3">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm relative overflow-hidden hover:border-red-200 dark:hover:border-red-900 transition-colors cursor-pointer">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">BRCA1 Variant Detected</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Patient #CP-8841 - Adunni Okafor</p>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="font-medium text-red-600 dark:text-red-400">Critical Risk</span>
                      <span className="text-slate-500 dark:text-slate-400">• 10 mins ago</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm relative overflow-hidden hover:border-yellow-200 dark:hover:border-yellow-900 transition-colors cursor-pointer">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500" />
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                    <Activity className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">Sample Processing Complete</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Patient #CP-7729 - Kemi Adeleke</p>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="font-medium text-yellow-600 dark:text-yellow-400">Review Needed</span>
                      <span className="text-slate-500 dark:text-slate-400">• 1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all flex items-center justify-center gap-2">
              View All Alerts
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155'
          }
        }}
      />
    </div>
  );
};

export default DashboardPage;