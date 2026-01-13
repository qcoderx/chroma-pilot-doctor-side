import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Patient } from '../../types/dashboard.types';

interface RecentPatientsTableProps {
  patients: Patient[];
}

const riskLevelConfig = {
  Critical: 'bg-red-50 text-red-700 ring-red-600/10',
  Moderate: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
  Stable: 'bg-green-50 text-green-700 ring-green-600/20'
};

export const RecentPatientsTable: React.FC<RecentPatientsTableProps> = ({ patients }) => {
  return (
    <div className="lg:col-span-2 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold font-display text-text-main-light">Recent Patients</h3>
        <Link 
          to="/dashboard/patients" 
          className="text-sm font-medium font-body text-primary hover:text-blue-700 transition-colors"
          aria-label="View all patients"
        >
          View All
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="overflow-hidden rounded-xl border border-border-light bg-surface-light shadow-sm"
        role="table"
        aria-label="Recent patients table"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border-light bg-background-light">
              <tr>
                <th className="px-6 py-4 font-semibold font-display text-text-main-light" scope="col">
                  Patient
                </th>
                <th className="px-6 py-4 font-semibold font-display text-text-main-light" scope="col">
                  ID
                </th>
                <th className="px-6 py-4 font-semibold font-display text-text-main-light" scope="col">
                  Condition
                </th>
                <th className="px-6 py-4 font-semibold font-display text-text-main-light" scope="col">
                  Risk Level
                </th>
                <th className="px-6 py-4 font-semibold font-display text-text-main-light text-right" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {patients.map((patient, index) => (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-slate-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 font-medium font-body text-text-main-light">
                    <div className="flex items-center gap-3">
                      <div 
                        className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold font-mono text-slate-600"
                        aria-label={`${patient.name} initials`}
                      >
                        {patient.initials}
                      </div>
                      <span>{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-sub-light font-mono">
                    {patient.patientNumber}
                  </td>
                  <td className="px-6 py-4 text-text-sub-light font-body">
                    {patient.condition}
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium font-body ring-1 ring-inset ${riskLevelConfig[patient.riskLevel]}`}
                      aria-label={`Risk level: ${patient.riskLevel}`}
                    >
                      {patient.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/dashboard/patient/${patient.id}`}
                      className="text-text-sub-light hover:text-primary transition-colors duration-200"
                      aria-label={`View details for ${patient.name}`}
                    >
                      <span className="material-symbols-outlined text-lg" aria-hidden="true">visibility</span>
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};