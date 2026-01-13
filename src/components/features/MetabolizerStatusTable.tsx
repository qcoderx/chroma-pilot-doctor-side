import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Download, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { GeneMetabolizer, MetabolizerStatus } from '../../types/pharmacogenomics.types';

interface MetabolizerStatusTableProps {
  metabolizers: GeneMetabolizer[];
  totalGenes: number;
}

const getStatusVariant = (status: MetabolizerStatus) => {
  switch (status) {
    case 'poor': return 'critical';
    case 'intermediate': return 'warning';
    case 'normal': return 'success';
    case 'rapid': return 'info';
    case 'ultrarapid': return 'info';
    default: return 'info';
  }
};

const getStatusColor = (status: MetabolizerStatus) => {
  switch (status) {
    case 'poor': return '#dc2626';
    case 'intermediate': return '#d97706';
    case 'normal': return '#059669';
    case 'rapid': return '#7c3aed';
    case 'ultrarapid': return '#7c3aed';
    default: return '#64748b';
  }
};

export const MetabolizerStatusTable: React.FC<MetabolizerStatusTableProps> = ({ 
  metabolizers, 
  totalGenes 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(metabolizers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedMetabolizers = metabolizers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold" style={{ color: '#0f172a' }}>
          Genetic Drug Metabolizer Status
        </h3>
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-lg transition-colors"
              title="Filter"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-lg transition-colors"
              title="Download CSV"
            >
              <Download className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
                  Gene
                </th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
                  Metabolizer Status
                </th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
                  Genotype
                </th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
                  <div className="flex items-center gap-1">
                    AlphaMissense
                    <HelpCircle 
                      className="w-3 h-3 cursor-help" 
                      style={{ color: '#64748b' }}
                      title="Pathogenicity prediction score (0-1)"
                    />
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
                  Clinical Guidance
                </th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider w-10" style={{ color: '#64748b' }}>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#e2e8f0' }}>
              {displayedMetabolizers.map((metabolizer, index) => (
                <motion.tr
                  key={metabolizer.gene}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="font-bold" style={{ color: '#0f172a' }}>
                      {metabolizer.gene}
                    </div>
                    <div className="text-xs" style={{ color: '#64748b' }}>
                      {metabolizer.fullName}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={getStatusVariant(metabolizer.status)}>
                      <span className="w-2 h-2 rounded-full mr-1.5" style={{ 
                        backgroundColor: getStatusColor(metabolizer.status) 
                      }} />
                      {metabolizer.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-mono text-sm px-2 py-1 rounded inline-block" style={{ 
                      backgroundColor: '#f1f5f9', 
                      color: '#374151' 
                    }}>
                      {metabolizer.genotype}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold" style={{ color: '#0f172a' }}>
                        {metabolizer.alphaMissenseScore.toFixed(2)}
                      </span>
                      <div className="h-1.5 w-16 rounded-full overflow-hidden" style={{ backgroundColor: '#e2e8f0' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: getStatusColor(metabolizer.status) }}
                          initial={{ width: '0%' }}
                          animate={{ width: `${metabolizer.alphaMissenseScore * 100}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm leading-snug" style={{ color: '#64748b' }}>
                      {metabolizer.clinicalGuidance}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="font-medium text-sm transition-colors"
                      style={{ color: '#137fec' }}
                    >
                      Details
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 px-6 pb-4">
          <p className="text-sm" style={{ color: '#64748b' }}>
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, metabolizers.length)} of {totalGenes} genes analyzed
          </p>
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </section>
  );
};