import React from 'react';
import { useLoadingStore } from '../../store/loadingStore';
import { Button } from '../ui/Button';

// Example component showing how to use loading states for genome processing
export const GenomeUploadExample: React.FC = () => {
  const { setGenomeProcessing, setLoadingProgress, setLoadingMessage } = useLoadingStore();
  
  const simulateGenomeProcessing = async () => {
    // Start genome processing
    setGenomeProcessing(true, 'Uploading VCF file...', 0);
    
    // Simulate upload progress
    for (let i = 0; i <= 30; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setLoadingProgress(i);
    }
    
    // Switch to processing
    setLoadingMessage('Processing genome with AI agents...');
    for (let i = 30; i <= 80; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoadingProgress(i);
    }
    
    // Final analysis
    setLoadingMessage('Generating clinical report...');
    for (let i = 80; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoadingProgress(i);
    }
    
    // Complete
    await new Promise(resolve => setTimeout(resolve, 500));
    setGenomeProcessing(false);
  };
  
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4 font-display">Genome Processing Demo</h3>
      <Button onClick={simulateGenomeProcessing}>
        Start Genome Processing
      </Button>
    </div>
  );
};