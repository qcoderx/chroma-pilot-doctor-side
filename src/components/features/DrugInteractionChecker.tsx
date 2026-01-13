import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Pill, AlertTriangle, CheckCircle, ExternalLink, Shield } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { usePharmacogenomicsStore } from '../../store/pharmacogenomicsStore';

interface DrugInteractionCheckerProps {
  patientId: string;
}

export const DrugInteractionChecker: React.FC<DrugInteractionCheckerProps> = ({ patientId }) => {
  const { 
    selectedMedication, 
    currentDrugCheck, 
    isCheckingDrug,
    setSelectedMedication, 
    checkDrugInteraction,
    clearDrugCheck 
  } = usePharmacogenomicsStore();

  const handleCheck = async () => {
    if (selectedMedication.trim()) {
      await checkDrugInteraction(selectedMedication, patientId);
    }
  };

  const getAlternativeIcon = (status: string) => {
    switch (status) {
      case 'recommended': return CheckCircle;
      case 'caution': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const getAlternativeColor = (status: string) => {
    switch (status) {
      case 'recommended': return '#10b981';
      case 'caution': return '#f59e0b';
      default: return '#ef4444';
    }
  };

  return (
    <Card className="mb-8">
      <div className="p-6 border-b" style={{ borderColor: '#e2e8f0' }}>
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            className="p-2 rounded-lg"
            style={{ backgroundColor: 'rgba(19, 127, 236, 0.1)', color: '#137fec' }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.15 }}
          >
            <Pill className="w-5 h-5" />
          </motion.div>
          <h3 className="text-lg font-bold" style={{ color: '#0f172a' }}>
            Drug Interaction Checker
          </h3>
        </div>
        <p className="text-sm mb-6 ml-12" style={{ color: '#64748b' }}>
          Verify medication safety against Sarah's genomic profile before prescribing.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-end ml-0 sm:ml-12 max-w-3xl">
          <div className="w-full sm:flex-1">
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Medication Name
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#64748b' }} />
              <Input
                placeholder="e.g. Warfarin, Simvastatin"
                value={selectedMedication}
                onChange={(e) => setSelectedMedication(e.target.value)}
                className="pl-10 h-11"
                onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
              />
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleCheck}
              disabled={!selectedMedication.trim() || isCheckingDrug}
              className="w-full sm:w-auto h-11 px-6 font-medium shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
              style={{
                backgroundColor: '#137fec',
                color: '#ffffff'
              }}
            >
              {isCheckingDrug ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Check Prescription'
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Interaction Results */}
      {currentDrugCheck?.interaction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
          style={{ backgroundColor: 'rgba(239, 68, 68, 0.02)' }}
        >
          <div className="border-l-4 rounded-lg shadow-sm p-5 md:ml-12 relative overflow-hidden" style={{ 
            backgroundColor: '#ffffff', 
            borderLeftColor: '#ef4444' 
          }}>
            {/* Background decoration */}
            <div className="absolute -right-6 -top-6 pointer-events-none" style={{ color: 'rgba(239, 68, 68, 0.05)' }}>
              <AlertTriangle className="w-32 h-32" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-6">
              <div className="shrink-0 pt-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                  color: '#dc2626' 
                }}>
                  <Shield className="w-5 h-5" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg flex items-center gap-2" style={{ color: '#dc2626' }}>
                    {currentDrugCheck.interaction.title}
                  </h4>
                  <Badge variant="critical">High Risk</Badge>
                </div>
                
                <p className="mb-4 text-base leading-relaxed" style={{ color: '#374151' }}>
                  {currentDrugCheck.interaction.description}
                </p>
                
                <div className="rounded-lg p-4 mb-4 border" style={{ 
                  backgroundColor: 'rgba(239, 68, 68, 0.05)', 
                  borderColor: 'rgba(239, 68, 68, 0.1)' 
                }}>
                  <h5 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: '#dc2626' }}>
                    Recommended Alternatives
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {currentDrugCheck.interaction.alternatives.map((alt, index) => {
                      const Icon = getAlternativeIcon(alt.status);
                      const color = getAlternativeColor(alt.status);
                      
                      return (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm font-medium transition-colors"
                          style={{
                            backgroundColor: '#ffffff',
                            borderColor: '#e2e8f0',
                            color: '#374151'
                          }}
                        >
                          <Icon className="w-4 h-4" style={{ color }} />
                          {alt.name}
                          {alt.notes && <span className="text-xs">({alt.notes})</span>}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className="px-4 py-2 text-sm font-medium shadow-sm"
                      style={{
                        backgroundColor: '#dc2626',
                        color: '#ffffff'
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Clinical Guidelines
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="ghost"
                      onClick={clearDrugCheck}
                      className="px-4 py-2 text-sm font-medium border"
                      style={{
                        borderColor: '#e2e8f0',
                        color: '#374151'
                      }}
                    >
                      Override Warning
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* No Interaction Found */}
      {currentDrugCheck && !currentDrugCheck.interaction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          <div className="border-l-4 rounded-lg p-5 md:ml-12" style={{ 
            backgroundColor: 'rgba(16, 185, 129, 0.05)', 
            borderLeftColor: '#10b981' 
          }}>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6" style={{ color: '#10b981' }} />
              <div>
                <h4 className="font-bold" style={{ color: '#059669' }}>
                  No Critical Interactions Found
                </h4>
                <p className="text-sm" style={{ color: '#374151' }}>
                  {currentDrugCheck.medicationName} appears safe based on current genomic profile.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </Card>
  );
};