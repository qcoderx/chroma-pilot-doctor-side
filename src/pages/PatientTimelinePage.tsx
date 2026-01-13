import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import { useTimeline } from '../api/useTimeline';
import { usePatientProfile } from '../api/usePatientProfile';
import { useTimelineStore } from '../store/timelineStore';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { BackButton } from '../components/ui/BackButton';
import { Tabs } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { TimelineFilterBar } from '../components/features/TimelineFilterBar';
import { TimelineGroup } from '../components/features/TimelineGroup';
import { Card } from '../components/ui/Card';

const PatientTimelinePage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const { activeFilter, setActiveFilter } = useTimelineStore();
  
  const { data: timelineData, isLoading: timelineLoading, refetch } = useTimeline(patientId!);
  const { data: patientData, isLoading: patientLoading } = usePatientProfile(patientId!);

  const filteredGroups = useMemo(() => {
    if (!timelineData || activeFilter === 'all') {
      return timelineData?.groups || [];
    }

    return timelineData.groups.map(group => ({
      ...group,
      events: group.events.filter(event => {
        switch (activeFilter) {
          case 'alerts':
            return event.type === 'alert';
          case 'genomics':
            return event.type === 'genome' || event.type === 'upload';
          case 'clinical':
            return event.type === 'phenotype' || event.type === 'telemetry' || event.type === 'medication' || event.type === 'appointment';
          case 'uploads':
            return event.type === 'upload';
          default:
            return true;
        }
      })
    })).filter(group => group.events.length > 0);
  }, [timelineData, activeFilter]);

  if (patientLoading || timelineLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-slate-200 dark:bg-slate-700 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!patientData || !timelineData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Patient Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            The requested patient timeline could not be loaded.
          </p>
        </Card>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Patients', href: '/patients' },
    { label: patientData.profile.fullName, href: `/patient/${patientId}` },
    { label: 'Timeline', href: '#', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton to={`/patient/${patientId}`} />
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                Patient Timeline
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {patientData.profile.fullName} • ID: {patientData.profile.hospitalId}
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Patient Header Card */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shrink-0">
                <span className="text-2xl font-bold">
                  {patientData.profile.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight mb-1">
                  {patientData.profile.fullName}
                  <span className="text-slate-400 dark:text-slate-500 text-lg font-normal ml-2">
                    ID: {patientData.profile.hospitalId}
                  </span>
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    {patientData.profile.dateOfBirth} ({patientData.profile.age}y)
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span>{patientData.profile.biologicalSex}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span>{patientData.vitals.bloodType}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Navigation Tabs */}
        <Tabs 
          activeTab="timeline" 
          onTabChange={() => {}} 
          patientId={patientId} 
        />

        {/* Timeline Content */}
        <div className="mt-8 space-y-6">
          {/* Filter Toolbar */}
          <TimelineFilterBar
            filters={timelineData.filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Timeline Feed */}
          <div className="relative pl-4 md:pl-0">
            {/* Vertical Spine Line */}
            <div className="absolute left-[27px] md:left-[149px] top-4 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 z-0" />
            
            {/* Timeline Groups */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredGroups.map((group, index) => (
                <TimelineGroup
                  key={group.date}
                  group={group}
                  isLast={index === filteredGroups.length - 1}
                />
              ))}
            </motion.div>

            {/* Load More Button */}
            <div className="relative flex justify-center pb-8 md:ml-[180px]">
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-full shadow-sm hover:shadow-md z-10"
              >
                <RefreshCw className="w-5 h-5" />
                Load More Events
              </Button>
              
              {/* Continuation Line fading out */}
              <div className="absolute -top-10 bottom-1/2 left-[27px] md:-left-[32px] w-0.5 bg-gradient-to-b from-slate-200 dark:from-slate-700 to-transparent" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientTimelinePage;