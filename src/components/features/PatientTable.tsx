import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Patient } from '../../types/patients.types';
import { usePatientStore } from '../../store/patientStore';
import { formatDistanceToNow } from 'date-fns';

interface PatientTableProps {
  patients: Patient[];
  isLoading?: boolean;
}

const PatientAvatar: React.FC<{ patient: Patient }> = ({ patient }) => {
  if (patient.avatar) {
    return (
      <div 
        className="w-8 h-8 rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url(${patient.avatar})` }}
      />
    );
  }
  
  const initials = patient.name.split(' ').map(n => n[0]).join('').toUpperCase();
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
      {initials}
    </div>
  );
};

const RiskBadge: React.FC<{ level: Patient['riskLevel'] }> = ({ level }) => {
  const variants = {
    'High Risk': {
      className: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200',
      dotColor: '#ef4444'
    },
    'Medium Risk': {
      className: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200',
      dotColor: '#f59e0b'
    },
    'Low Risk': {
      className: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200',
      dotColor: '#10b981'
    }
  };

  const variant = variants[level];
  
  return (
    <span className={variant.className}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: variant.dotColor }} />
      {level}
    </span>
  );
};

const GenomeStatus: React.FC<{ status: Patient['genomeStatus'] }> = ({ status }) => {
  const statusConfig = {
    'Sequenced': {
      icon: <CheckCircle className="w-4 h-4" />,
      color: '#10b981',
      text: 'Sequenced'
    },
    'Processing': {
      icon: <Clock className="w-4 h-4 animate-pulse" />,
      color: '#f59e0b',
      text: 'Processing'
    },
    'Pending': {
      icon: <AlertCircle className="w-4 h-4" />,
      color: '#64748b',
      text: 'Pending'
    }
  };

  const config = statusConfig[status];
  
  return (
    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: config.color }}>
      {config.icon}
      {config.text}
    </div>
  );
};

export const PatientTable: React.FC<PatientTableProps> = ({ patients, isLoading }) => {
  const navigate = useNavigate();
  const { selectedPatients, togglePatientSelection, selectAllPatients, clearSelection } = usePatientStore();
  
  const isAllSelected = patients.length > 0 && selectedPatients.length === patients.length;
  const isIndeterminate = selectedPatients.length > 0 && selectedPatients.length < patients.length;
  
  const handleSelectAll = () => {
    if (isAllSelected) {
      clearSelection();
    } else {
      selectAllPatients(patients.map(p => p.id));
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#e2e8f0' }}>
        <div className="p-8 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p style={{ color: '#64748b' }}>Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#e2e8f0' }}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
              <th className="p-4 w-12">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={handleSelectAll}
                  className="rounded border-slate-300 text-primary focus:ring-primary"
                />
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
                Patient Name
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
                ID
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider w-20" style={{ color: '#64748b' }}>
                Age
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider w-20" style={{ color: '#64748b' }}>
                Sex
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
                Risk Level
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
                Genome Status
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: '#64748b' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ divideColor: '#e2e8f0' }}>
            {patients.map((patient, index) => (
              <motion.tr
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="group hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedPatients.includes(patient.id)}
                    onChange={() => togglePatientSelection(patient.id)}
                    className="rounded border-slate-300 text-primary focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <PatientAvatar patient={patient} />
                    <div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors" style={{ color: '#0f172a' }}>
                        {patient.name}
                      </p>
                      <p className="text-xs" style={{ color: '#64748b' }}>
                        Admitted: {formatDistanceToNow(patient.admittedDate, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-mono" style={{ color: '#64748b' }}>
                  {patient.patientNumber}
                </td>
                <td className="px-4 py-3 text-sm" style={{ color: '#64748b' }}>
                  {patient.age}
                </td>
                <td className="px-4 py-3 text-sm" style={{ color: '#64748b' }}>
                  {patient.sex}
                </td>
                <td className="px-4 py-3">
                  <RiskBadge level={patient.riskLevel} />
                </td>
                <td className="px-4 py-3">
                  <GenomeStatus status={patient.genomeStatus} />
                </td>
                <td className="px-4 py-3 text-right">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/patient/${patient.patientNumber}`)}
                    className="inline-flex items-center gap-1 text-primary hover:text-blue-700 text-sm font-semibold"
                  >
                    <Eye className="w-4 h-4" />
                    View Profile
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};