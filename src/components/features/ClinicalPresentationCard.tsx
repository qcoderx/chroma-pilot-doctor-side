import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Dna } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useDiagnosisStore } from '../../store/diagnosisStore';
import { formatDistanceToNow } from 'date-fns';

interface ClinicalPresentationCardProps {
  lastUpdated?: string;
  updatedBy?: string;
}

export const ClinicalPresentationCard: React.FC<ClinicalPresentationCardProps> = ({
  lastUpdated,
  updatedBy
}) => {
  const { phenotypeInput, isSearching, setPhenotypeInput, searchGenome } = useDiagnosisStore();

  const handleSearch = () => {
    if (phenotypeInput.trim()) {
      searchGenome(phenotypeInput);
    }
  };

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5" style={{ color: '#137fec' }} />
        <h3 className="text-base font-bold" style={{ color: '#0f172a' }}>
          Clinical Presentation
        </h3>
      </div>
      
      <div className="mb-3">
        <label className="block mb-1">
          <span className="text-xs font-medium mb-1 block" style={{ color: '#64748b' }}>
            Phenotype & Symptoms (HPO Terms)
          </span>
          <textarea
            value={phenotypeInput}
            onChange={(e) => setPhenotypeInput(e.target.value)}
            className="w-full h-32 p-3 border-none rounded-lg text-sm resize-none focus:ring-2 focus:ring-primary/20 transition-all"
            style={{
              backgroundColor: '#f6f7f8',
              color: '#0f172a'
            }}
            placeholder="e.g. Febrile seizures, Developmental delay, Ataxia..."
          />
        </label>
      </div>
      
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={handleSearch}
          disabled={!phenotypeInput.trim() || isSearching}
          className="w-full font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
          style={{
            backgroundColor: '#137fec',
            color: '#ffffff',
            boxShadow: '0 4px 6px -1px rgba(19, 127, 236, 0.2)'
          }}
        >
          {isSearching ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Searching Genome...
            </>
          ) : (
            <>
              <Dna className="w-5 h-5" />
              Search Genome for Clues
            </>
          )}
        </Button>
      </motion.div>
      
      {(lastUpdated || updatedBy) && (
        <div className="mt-4 pt-4 border-t border-dashed" style={{ borderColor: '#e2e8f0' }}>
          <p className="text-xs" style={{ color: '#64748b' }}>
            {lastUpdated && (
              <>Last updated: {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}</>
            )}
            {updatedBy && <> by {updatedBy}</>}
          </p>
        </div>
      )}
    </Card>
  );
};