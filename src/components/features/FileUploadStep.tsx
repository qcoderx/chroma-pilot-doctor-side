import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { CloudUpload, FileText, X, ArrowLeft, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { BackButton } from '../ui/BackButton';
import { useAddPatientStore } from '../../store/addPatientStore';

export const FileUploadStep: React.FC = () => {
  const { uploadedFiles, addUploadedFile, updateFileProgress, removeFile, setCurrentStep } = useAddPatientStore();
  const [isDragOver, setIsDragOver] = useState(false);

  const simulateFileUpload = (file: File) => {
    const fileId = Math.random().toString(36).substr(2, 9);
    const uploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading' as const,
    };

    addUploadedFile(uploadedFile);

    // Simulate upload progress
    const interval = setInterval(() => {
      updateFileProgress(fileId, (prev) => {
        const currentFile = uploadedFiles.find(f => f.id === fileId);
        const newProgress = (currentFile?.progress || 0) + Math.random() * 15;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      if (file.name.endsWith('.vcf') || file.name.endsWith('.vcf.gz')) {
        simulateFileUpload(file);
      }
    });
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, []);

  const hasValidFiles = uploadedFiles.some(file => file.progress === 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="p-8 md:p-10"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#0f172a' }}>
          Upload Genomic Data
        </h2>
        <p style={{ color: '#64748b' }}>
          Supported formats: .VCF, .VCF.GZ (Max 5GB)
        </p>
      </div>

      {/* Drag Drop Area */}
      <motion.div
        className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all group mb-6 ${
          isDragOver ? 'border-primary bg-primary/5' : 'border-slate-300 bg-slate-50 hover:border-primary hover:bg-primary/5'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.vcf,.vcf.gz';
          input.multiple = true;
          input.onchange = (e) => handleFileSelect((e.target as HTMLInputElement).files);
          input.click();
        }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <motion.div
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform"
          style={{ backgroundColor: '#ffffff' }}
        >
          <CloudUpload className="w-8 h-8" style={{ color: '#137fec' }} />
        </motion.div>
        <p className="font-medium mb-1" style={{ color: '#0f172a' }}>
          Click to upload or drag and drop
        </p>
        <p className="text-sm" style={{ color: '#64748b' }}>
          VCF files only
        </p>
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="h-px flex-1" style={{ backgroundColor: '#e2e8f0' }} />
        <span className="text-xs font-medium uppercase" style={{ color: '#64748b' }}>
          Or
        </span>
        <div className="h-px flex-1" style={{ backgroundColor: '#e2e8f0' }} />
      </div>

      {/* API Connection Button */}
      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Button
          variant="ghost"
          className="w-full py-3 rounded-lg border font-medium transition-colors flex items-center justify-center gap-2"
          style={{
            borderColor: '#e2e8f0',
            color: '#374151'
          }}
        >
          <Zap className="w-5 h-5" />
          Connect to Sequencer API
        </Button>
      </motion.div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-slate-50 rounded-lg p-4 border space-y-3"
          style={{ borderColor: '#e2e8f0' }}
        >
          {uploadedFiles.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: 'rgba(19, 127, 236, 0.1)' }}>
                <FileText className="w-4 h-4" style={{ color: '#137fec' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium truncate" style={{ color: '#0f172a' }}>
                    {file.name}
                  </p>
                  <span className="text-xs font-medium" style={{ color: '#64748b' }}>
                    {Math.round(file.progress)}%
                  </span>
                </div>
                <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: '#e2e8f0' }}>
                  <motion.div
                    className="h-1.5 rounded-full"
                    style={{ backgroundColor: '#137fec' }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${file.progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeFile(file.id)}
                className="transition-colors"
                style={{ color: '#64748b' }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Footer Actions */}
      <div className="bg-slate-50 -mx-8 md:-mx-10 mt-8 px-8 md:px-10 py-5 border-t flex justify-between" style={{ borderColor: '#e2e8f0' }}>
        <Button
          variant="ghost"
          onClick={() => setCurrentStep('details')}
          className="px-6 py-2.5 inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <motion.div whileHover={{ scale: hasValidFiles ? 1.02 : 1 }} whileTap={{ scale: hasValidFiles ? 0.98 : 1 }}>
          <Button
            onClick={() => hasValidFiles && setCurrentStep('processing')}
            disabled={!hasValidFiles}
            className="px-6 py-2.5"
            style={{
              backgroundColor: hasValidFiles ? '#137fec' : '#e2e8f0',
              color: hasValidFiles ? '#ffffff' : '#64748b',
              cursor: hasValidFiles ? 'pointer' : 'not-allowed'
            }}
          >
            Next: Processing
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};