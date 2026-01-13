import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { usePatientStore } from '../../store/patientStore';

interface PaginationProps {
  total: number;
}

export const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const { pagination, setPagination } = usePatientStore();
  const { page, pageSize } = pagination;
  
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize + 1;
  const endIndex = Math.min(page * pageSize, total);
  
  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPagination({ page: newPage });
    }
  };
  
  const changePageSize = (newPageSize: number) => {
    setPagination({ pageSize: newPageSize, page: 1 });
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{ borderColor: '#e2e8f0' }}
    >
      <div className="text-sm" style={{ color: '#64748b' }}>
        Showing <span className="font-medium" style={{ color: '#0f172a' }}>{startIndex}-{endIndex}</span> of{' '}
        <span className="font-medium" style={{ color: '#0f172a' }}>{total}</span> patients
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm mr-2" style={{ color: '#64748b' }}>Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => changePageSize(Number(e.target.value))}
          className="form-select rounded-lg border text-sm py-1 pl-3 pr-8 focus:border-primary focus:ring-primary"
          style={{
            borderColor: '#e2e8f0',
            backgroundColor: '#ffffff'
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        
        <div className="flex gap-1 ml-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 rounded-lg transition-colors"
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              style={{ color: page === 1 ? '#cbd5e1' : '#64748b' }}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </motion.div>
          
          {getVisiblePages().map((pageNum, index) => (
            <motion.div key={index} whileHover={{ scale: pageNum !== '...' ? 1.05 : 1 }} whileTap={{ scale: pageNum !== '...' ? 0.95 : 1 }}>
              {pageNum === '...' ? (
                <span className="flex items-end justify-center px-1" style={{ color: '#cbd5e1' }}>
                  ...
                </span>
              ) : (
                <Button
                  variant={pageNum === page ? "default" : "ghost"}
                  size="sm"
                  className="min-w-[32px] h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: pageNum === page ? '#137fec' : 'transparent',
                    color: pageNum === page ? '#ffffff' : '#64748b',
                    boxShadow: pageNum === page ? '0 1px 2px 0 rgba(19, 127, 236, 0.3)' : 'none'
                  }}
                  onClick={() => goToPage(pageNum as number)}
                >
                  {pageNum}
                </Button>
              )}
            </motion.div>
          ))}
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 rounded-lg transition-colors"
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
              style={{ color: page === totalPages ? '#cbd5e1' : '#64748b' }}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};