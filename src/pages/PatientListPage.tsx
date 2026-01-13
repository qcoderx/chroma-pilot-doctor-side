import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Bell, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { PatientFilters } from '../components/features/PatientFilters';
import { PatientTable } from '../components/features/PatientTable';
import { Pagination } from '../components/features/Pagination';
import { usePatients } from '../api/usePatients';
import { usePatientStore } from '../store/patientStore';

const PatientListPage: React.FC = () => {
  const navigate = useNavigate();
  const { filters, pagination, setPagination } = usePatientStore();
  const { data, isLoading, error } = usePatients(filters, pagination.page, pagination.pageSize);

  React.useEffect(() => {
    if (data) {
      setPagination({ total: data.total });
    }
  }, [data, setPagination]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden" style={{ backgroundColor: '#f6f7f8' }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 flex items-center justify-between border-b px-6 py-3 shadow-sm"
        style={{
          borderColor: '#e2e8f0',
          backgroundColor: '#ffffff'
        }}
      >
        <div className="flex items-center gap-8">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src="/src/images/chromapilotlogo.png" 
              alt="Chroma-Pilot" 
              className="h-16 w-auto"
            />
          </motion.div>
          
          {/* Global Search */}
          <div className="hidden md:flex flex-col min-w-[280px] h-10">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full border focus-within:ring-2 focus-within:ring-primary/20 transition-all"
                 style={{ backgroundColor: '#f1f5f9', borderColor: '#e2e8f0' }}>
              <div className="flex items-center justify-center pl-3" style={{ color: '#64748b' }}>
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <Input
                placeholder="Search..."
                className="flex w-full min-w-0 flex-1 bg-transparent border-none focus:ring-0 px-3 text-sm h-full"
                style={{ color: '#0f172a' }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="transition-colors text-sm font-medium cursor-pointer"
              style={{ color: '#64748b' }}
              onClick={() => navigate('/dashboard')}
              role="button"
              tabIndex={0}
            >
              Dashboard
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="font-semibold text-sm"
              style={{ color: '#137fec' }}
              href="/#/patients"
            >
              Patients
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="transition-colors text-sm font-medium"
              style={{ color: '#64748b' }}
              href="#"
            >
              Genomics
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="transition-colors text-sm font-medium"
              style={{ color: '#64748b' }}
              href="#"
            >
              Reports
            </motion.a>
          </nav>
          
          {/* Action Buttons */}
          <div className="flex gap-3 items-center border-l pl-6" style={{ borderColor: '#e2e8f0' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center justify-center rounded-lg w-10 h-10 transition-colors"
                style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}
              >
                <Bell className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center justify-center rounded-lg w-10 h-10 transition-colors"
                style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}
              >
                <Settings className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-full ring-2 cursor-pointer shadow-sm"
              style={{ 
                backgroundColor: 'rgba(19, 127, 236, 0.1)',
                ringColor: 'rgba(19, 127, 236, 0.2)'
              }}
            >
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <User className="w-5 h-5" style={{ color: '#137fec' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-8">
        <div className="w-full max-w-[1280px] flex flex-col gap-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumb 
            items={[
              { label: 'Patients', current: true }
            ]}
          />
          
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#0f172a' }}>
                Patients
              </h1>
              <p className="text-sm mt-1" style={{ color: '#64748b' }}>
                Manage patient records and genomic analysis status.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="group flex items-center justify-center gap-2 rounded-lg font-semibold h-10 px-5 transition-all shadow-md active:scale-95"
                style={{
                  backgroundColor: '#137fec',
                  color: '#ffffff',
                  boxShadow: '0 4px 6px -1px rgba(19, 127, 236, 0.2)'
                }}
                onClick={() => navigate('/add-patient')}
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="w-5 h-5" />
                </motion.div>
                <span>Add New Patient</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Filters */}
          <PatientFilters />

          {/* Patient Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <PatientTable patients={data?.patients || []} isLoading={isLoading} />
            {data && <Pagination total={data.total} />}
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
            >
              <p className="text-red-700 font-medium">Error loading patients</p>
              <p className="text-red-600 text-sm mt-1">Please try again later.</p>
            </motion.div>
          )}
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

export default PatientListPage;