import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Patient } from '../../types/newDashboard.types';

interface PatientsTableProps {
  patients: Patient[];
}

const PatientAvatar: React.FC<{ initials: string }> = ({ initials }) => (
  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
    <span className="text-xs font-mono font-semibold text-foreground">
      {initials}
    </span>
  </div>
);

const RiskBadge: React.FC<{ level: Patient['riskLevel'] }> = ({ level }) => {
  const variants = {
    Critical: {
      className: 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'
    },
    Moderate: {
      className: 'inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20'
    },
    Stable: {
      className: 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
    }
  } as const;

  return <span className={variants[level].className}>{level}</span>;
};

export const PatientsTable: React.FC<PatientsTableProps> = ({ patients }) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Patients</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden rounded-b-lg border-t">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="px-6 py-4 font-semibold">Patient</TableHead>
                <TableHead className="px-6 py-4 font-semibold">ID</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Condition</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Risk Level</TableHead>
                <TableHead className="px-6 py-4 font-semibold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient, index) => (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <PatientAvatar initials={patient.initials} />
                      <span className="font-medium text-foreground">{patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="font-mono text-muted-foreground">
                      {patient.patientNumber}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">
                    {patient.condition}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <RiskBadge level={patient.riskLevel} />
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};