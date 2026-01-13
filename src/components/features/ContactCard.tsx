import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Shield, User } from 'lucide-react';
import { Card } from '../ui/Card';
import { PatientContact } from '../../types/patientProfile.types';

interface ContactCardProps {
  contact: PatientContact;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card>
        <div className="px-5 py-4 border-b bg-slate-50/50" style={{ borderColor: '#e2e8f0' }}>
          <h3 className="font-bold" style={{ color: '#0f172a' }}>
            Demographics & Contact
          </h3>
        </div>
        
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#0f172a' }}>
                {contact.phone}
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                Mobile
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 rounded" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#0f172a' }}>
                {contact.address}
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                Home Address
              </p>
            </div>
          </div>
          
          <div className="border-t my-2" style={{ borderColor: '#e2e8f0' }} />
          
          <div className="flex items-start gap-3">
            <div className="p-2 rounded" style={{ backgroundColor: 'rgba(19, 127, 236, 0.1)', color: '#137fec' }}>
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: '#0f172a' }}>
                {contact.insurance.provider}
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                Policy: {contact.insurance.policyNumber}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 rounded" style={{ backgroundColor: 'rgba(19, 127, 236, 0.1)', color: '#137fec' }}>
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: '#0f172a' }}>
                {contact.primaryPhysician.name}
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                {contact.primaryPhysician.title}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};