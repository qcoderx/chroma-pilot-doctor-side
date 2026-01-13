import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { BackButton } from '../ui/BackButton';
import { useAddPatientStore } from '../../store/addPatientStore';

export const PatientDetailsStep: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useAddPatientStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleDateChange = (dateOfBirth: string) => {
    updateFormData({ dateOfBirth });
    if (dateOfBirth) {
      const age = calculateAge(dateOfBirth);
      updateFormData({ age });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.hospitalId.trim()) {
      newErrors.hospitalId = 'Hospital ID is required';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.biologicalSex) {
      newErrors.biologicalSex = 'Biological sex is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep('upload');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="p-8 md:p-10"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#0f172a' }}>
          Patient Information
        </h2>
        <p style={{ color: '#64748b' }}>
          Enter the patient's demographic details to initialize their record.
        </p>
      </div>

      <div className="space-y-6">
        {/* Row 1: Name and Hospital ID */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium pb-2" style={{ color: '#374151' }}>
              Full Name
            </label>
            <Input
              placeholder="e.g. Jane Doe"
              value={formData.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              error={errors.fullName}
              className="h-12"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium pb-2" style={{ color: '#374151' }}>
              Hospital ID
            </label>
            <Input
              placeholder="e.g. PID-98234"
              value={formData.hospitalId}
              onChange={(e) => updateFormData({ hospitalId: e.target.value })}
              error={errors.hospitalId}
              className="h-12"
            />
          </div>
        </div>

        {/* Row 2: Date of Birth and Age */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium pb-2" style={{ color: '#374151' }}>
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5" style={{ color: '#64748b' }} />
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleDateChange(e.target.value)}
                error={errors.dateOfBirth}
                className="h-12 pl-10"
              />
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-medium pb-2" style={{ color: '#374151' }}>
              Age
            </label>
            <Input
              placeholder="Auto-calc"
              value={formData.age ? formData.age.toString() : ''}
              disabled
              className="h-12 cursor-not-allowed"
              style={{ backgroundColor: '#f8fafc', color: '#64748b' }}
            />
          </div>
        </div>

        {/* Row 3: Biological Sex */}
        <div>
          <label className="text-sm font-medium pb-2 block" style={{ color: '#374151' }}>
            Biological Sex
          </label>
          <div className="flex flex-wrap gap-3">
            {['Male', 'Female', 'Intersex'].map((sex) => (
              <motion.label
                key={sex}
                className="flex-1 min-w-[120px] cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="biologicalSex"
                  value={sex}
                  checked={formData.biologicalSex === sex}
                  onChange={(e) => updateFormData({ biologicalSex: e.target.value as any })}
                  className="sr-only"
                />
                <div
                  className={`flex items-center justify-center gap-2 rounded-lg border p-3 h-12 transition-all ${
                    formData.biologicalSex === sex
                      ? 'border-primary text-primary'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                  style={{
                    backgroundColor: formData.biologicalSex === sex ? 'rgba(19, 127, 236, 0.05)' : 'transparent',
                    borderColor: formData.biologicalSex === sex ? '#137fec' : '#e2e8f0'
                  }}
                >
                  <span className="text-sm font-medium">{sex}</span>
                </div>
              </motion.label>
            ))}
          </div>
          {errors.biologicalSex && (
            <p className="mt-1 text-xs text-red-600">{errors.biologicalSex}</p>
          )}
        </div>

        {/* Row 4: Contact Number */}
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium pb-2" style={{ color: '#374151' }}>
            Contact Number (Optional)
          </label>
          <Input
            placeholder="+1 (555) 000-0000"
            value={formData.contactNumber || ''}
            onChange={(e) => updateFormData({ contactNumber: e.target.value })}
            className="h-12"
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-slate-50 -mx-8 md:-mx-10 mt-8 px-8 md:px-10 py-5 border-t flex justify-between gap-3" style={{ borderColor: '#e2e8f0' }}>
        <BackButton to="/patients" label="Cancel" />
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleNext}
            className="px-6 py-2.5 flex items-center gap-2 shadow-lg"
            style={{
              backgroundColor: '#137fec',
              color: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(19, 127, 236, 0.25)'
            }}
          >
            Next: Upload DNA
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};