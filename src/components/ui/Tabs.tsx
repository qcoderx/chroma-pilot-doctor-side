import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Pill, 
  AlertTriangle, 
  Stethoscope, 
  Clock, 
  Activity, 
  FileText 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TabType } from '../../types/patientProfile.types';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  patientId?: string;
}

const tabs = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'pharmacogenomics', label: 'Pharmacogenomics', icon: Pill },
  { key: 'risk', label: 'Risk Assessment', icon: AlertTriangle },
  { key: 'diagnosis', label: 'Diagnosis', icon: Stethoscope },
  { key: 'timeline', label: 'Timeline', icon: Clock },
  { key: 'telemetry', label: 'Telemetry', icon: Activity },
  { key: 'reports', label: 'Reports', icon: FileText }
] as const;

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange, patientId }) => {
  const navigate = useNavigate();
  
  const handleTabClick = (tabKey: TabType) => {
    if (tabKey === 'pharmacogenomics' && patientId) {
      navigate(`/patient/${patientId}/pharmacogenomics`);
    } else if (tabKey === 'risk' && patientId) {
      navigate(`/patient/${patientId}/risk-assessment`);
    } else if (tabKey === 'diagnosis' && patientId) {
      navigate(`/patient/${patientId}/diagnosis`);
    } else if (tabKey === 'timeline' && patientId) {
      navigate(`/patient/${patientId}/timeline`);
    } else {
      onTabChange(tabKey);
    }
  };
  return (
    <div className="mt-8 border-b overflow-x-auto" style={{ borderColor: '#e2e8f0' }}>
      <nav aria-label="Tabs" className="flex space-x-8 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          
          return (
            <motion.button
              key={tab.key}
              onClick={() => handleTabClick(tab.key as TabType)}
              className={`whitespace-nowrap py-4 px-1 border-b-[3px] font-medium text-sm flex items-center gap-2 transition-colors ${
                isActive
                  ? 'border-primary font-semibold'
                  : 'border-transparent hover:border-slate-300'
              }`}
              style={{
                color: isActive ? '#137fec' : '#64748b'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};