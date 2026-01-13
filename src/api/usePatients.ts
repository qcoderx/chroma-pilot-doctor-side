import { useQuery } from '@tanstack/react-query';
import { Patient, PatientFilters } from '../types/patients.types';
import { simulateApiDelay } from '../mocks/patientsData';
import { useGlobalPatientStore } from '../store/globalPatientStore';

export const usePatients = (filters: PatientFilters, page: number, pageSize: number) => {
  const { patients: allPatients } = useGlobalPatientStore();
  
  return useQuery({
    queryKey: ['patients', filters, page, pageSize, allPatients.length],
    queryFn: async (): Promise<{ patients: Patient[]; total: number }> => {
      await simulateApiDelay(800);
      
      let filteredPatients = allPatients;
      
      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredPatients = filteredPatients.filter(patient =>
          patient.name.toLowerCase().includes(searchTerm) ||
          patient.patientNumber.toLowerCase().includes(searchTerm)
        );
      }
      
      // Apply risk level filter
      if (filters.riskLevel && filters.riskLevel !== 'All') {
        filteredPatients = filteredPatients.filter(patient =>
          patient.riskLevel === filters.riskLevel
        );
      }
      
      // Apply genome status filter
      if (filters.genomeStatus && filters.genomeStatus !== 'All') {
        filteredPatients = filteredPatients.filter(patient =>
          patient.genomicStatus === filters.genomeStatus
        );
      }
      
      const total = filteredPatients.length;
      const startIndex = (page - 1) * pageSize;
      const paginatedPatients = filteredPatients.slice(startIndex, startIndex + pageSize);
      
      return { patients: paginatedPatients, total };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};