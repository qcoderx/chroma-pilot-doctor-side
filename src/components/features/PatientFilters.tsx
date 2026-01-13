import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, RotateCcw, ChevronDown } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { usePatientStore } from '../../store/patientStore';

export const PatientFilters: React.FC = () => {
  const { filters, setFilters } = usePatientStore();
  
  const activeFilters = [
    filters.riskLevel && filters.riskLevel !== 'All' && {
      label: `Risk: ${filters.riskLevel}`,
      onRemove: () => setFilters({ riskLevel: undefined })
    },
    filters.genomeStatus && filters.genomeStatus !== 'All' && {
      label: `Genome: ${filters.genomeStatus}`,
      onRemove: () => setFilters({ genomeStatus: undefined })
    }
  ].filter(Boolean);

  const clearAllFilters = () => {
    setFilters({
      search: '',
      ageFilter: '',
      riskLevel: undefined,
      genomeStatus: undefined
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border p-4"
      style={{ borderColor: '#e2e8f0' }}
    >
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        {/* Search Inputs */}
        <div className="flex flex-1 flex-col sm:flex-row gap-3 w-full lg:max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#64748b' }} />
            <Input
              placeholder="Search by Name or ID..."
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="pl-10"
              style={{
                backgroundColor: '#f8fafc',
                borderColor: '#e2e8f0'
              }}
            />
          </div>
          <div className="relative w-full sm:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#64748b' }} />
            <Input
              placeholder="Filter by Age..."
              value={filters.ageFilter}
              onChange={(e) => setFilters({ ageFilter: e.target.value })}
              className="pl-10"
              style={{
                backgroundColor: '#f8fafc',
                borderColor: '#e2e8f0'
              }}
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider mr-1" style={{ color: '#64748b' }}>
            Quick Filters:
          </span>
          
          {/* Risk Level Filter */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              size="sm"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
              style={{
                backgroundColor: filters.riskLevel === 'High Risk' ? 'rgba(239, 68, 68, 0.1)' : '#f1f5f9',
                color: filters.riskLevel === 'High Risk' ? '#dc2626' : '#64748b',
                borderColor: filters.riskLevel === 'High Risk' ? 'rgba(239, 68, 68, 0.2)' : '#e2e8f0'
              }}
              onClick={() => setFilters({ 
                riskLevel: filters.riskLevel === 'High Risk' ? undefined : 'High Risk' 
              })}
            >
              <span>Risk: {filters.riskLevel || 'All'}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </motion.div>

          {/* Genome Status Filter */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              size="sm"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
              style={{
                backgroundColor: filters.genomeStatus ? 'rgba(19, 127, 236, 0.1)' : '#f1f5f9',
                color: filters.genomeStatus ? '#137fec' : '#64748b',
                borderColor: filters.genomeStatus ? 'rgba(19, 127, 236, 0.2)' : '#e2e8f0'
              }}
              onClick={() => setFilters({ 
                genomeStatus: filters.genomeStatus === 'Sequenced' ? undefined : 'Sequenced' 
              })}
            >
              <span>Genome: {filters.genomeStatus || 'All'}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </motion.div>

          {/* Active Filter Chips */}
          {activeFilters.map((filter: any, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#dc2626',
                  borderColor: 'rgba(239, 68, 68, 0.2)'
                }}
                onClick={filter.onRemove}
              >
                <span>{filter.label}</span>
                <X className="w-3 h-3" />
              </Button>
            </motion.div>
          ))}

          {/* Clear All Button */}
          {activeFilters.length > 0 && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                style={{ color: '#64748b' }}
                onClick={clearAllFilters}
                title="Clear All Filters"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};