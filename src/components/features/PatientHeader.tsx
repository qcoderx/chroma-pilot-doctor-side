import React from 'react';
import { motion } from 'framer-motion';
import { Edit, FileText, Download, Badge as BadgeIcon, Cake, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { PatientProfile } from '../../types/patientProfile.types';

interface PatientHeaderProps {
  profile: PatientProfile;
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({ profile }) => {
  const getRiskVariant = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'high-risk';
      case 'medium': return 'medium-risk';
      case 'low': return 'low-risk';
      default: return 'info';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border p-6"
      style={{ borderColor: '#e2e8f0' }}
    >
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div 
              className="rounded-full w-24 h-24 md:w-28 md:h-28 shadow-sm ring-4 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${profile.profileImage})`,
                ringColor: '#ffffff'
              }}
            />
            {profile.isAppConnected && (
              <div 
                className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-2"
                style={{ 
                  backgroundColor: '#10b981',
                  borderColor: '#ffffff'
                }}
                title="App Connected"
              />
            )}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#0f172a' }}>
                {profile.fullName}
              </h1>
              <Badge variant={getRiskVariant(profile.riskLevel)}>
                {profile.riskLevel} Risk
              </Badge>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" style={{ color: '#64748b' }}>
              <div className="flex items-center gap-1.5">
                <BadgeIcon className="w-4 h-4" />
                <span className="font-mono" style={{ color: '#374151' }}>
                  ID: {profile.hospitalId}
                </span>
              </div>
              <div className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <Cake className="w-4 h-4" />
                <span>DOB: {new Date(profile.dateOfBirth).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: '2-digit' 
                })} ({profile.age}y)</span>
              </div>
              <div className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{profile.biologicalSex}</span>
              </div>
            </div>
            
            <div className="pt-2 flex flex-wrap gap-2">
              {profile.isWholeGenomeSequenced && (
                <Badge variant="info">
                  Whole Genome Sequenced
                </Badge>
              )}
              {profile.lastAppSync && (
                <Badge variant="success">
                  App Synced: {profile.lastAppSync}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="ghost" className="flex-1 md:flex-none flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="ghost" className="flex-1 md:flex-none flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Add Note
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              className="flex-1 md:flex-none flex items-center gap-2 shadow-sm"
              style={{
                backgroundColor: '#137fec',
                color: '#ffffff',
                boxShadow: '0 1px 2px 0 rgba(19, 127, 236, 0.2)'
              }}
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};