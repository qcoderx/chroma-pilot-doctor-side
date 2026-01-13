import { TimelineData, TimelineEvent } from '../types/timeline.types';

const timelineEvents: TimelineEvent[] = [
  {
    id: 'alert-001',
    type: 'alert',
    title: 'Alert Generated',
    description: 'Variant of Unknown Significance flagged in BRCA1 gene region. Requires manual review.',
    timestamp: '09:15 AM',
    date: '2024-10-24',
    priority: 'critical',
    status: 'warning',
    metadata: {
      gene: 'BRCA1'
    },
    actions: [
      { label: 'View Details', type: 'primary', icon: 'arrow_forward' }
    ]
  },
  {
    id: 'telemetry-001',
    type: 'telemetry',
    title: 'Telemetry Data Received',
    description: 'Heart rate variability normalized. Daily vitals sync completed from wearable device.',
    timestamp: '16:00 PM',
    date: '2024-10-23',
    status: 'info'
  },
  {
    id: 'phenotype-001',
    type: 'phenotype',
    title: 'Phenotype Update',
    description: 'Added \"Chronic Fatigue\" to symptom list.',
    timestamp: '10:00 AM',
    date: '2024-10-22',
    status: 'info',
    metadata: {
      source: 'Clinical Interview'
    }
  },
  {
    id: 'genome-001',
    type: 'genome',
    title: 'Genome Processing Complete',
    description: 'Analysis pipeline \"Onco-Seq v4\" completed successfully.',
    timestamp: '02:30 PM',
    date: '2024-10-20',
    status: 'success',
    metadata: {
      pipeline: 'Onco-Seq v4'
    },
    actions: [
      { label: 'View Report', type: 'secondary', icon: 'description' },
      { label: 'Download VCF', type: 'secondary', icon: 'download' }
    ]
  },
  {
    id: 'upload-001',
    type: 'upload',
    title: 'VCF Uploaded',
    description: 'File sample_882.vcf uploaded by Dr. Smith.',
    timestamp: '09:00 AM',
    date: '2024-10-20',
    status: 'info',
    metadata: {
      filename: 'sample_882.vcf',
      provider: 'Dr. Smith'
    }
  },
  {
    id: 'created-001',
    type: 'created',
    title: 'Patient Created',
    description: 'Profile initialized via EHR sync (EPIC Systems integration).',
    timestamp: '08:00 AM',
    date: '2024-10-15',
    status: 'success',
    metadata: {
      source: 'EPIC Systems'
    }
  }
];

const mockTimelineData: TimelineData = {
  groups: [
    {
      date: '2024-10-24',
      label: 'Today',
      events: timelineEvents.filter(e => e.date === '2024-10-24')
    },
    {
      date: '2024-10-23',
      label: 'Yesterday',
      events: timelineEvents.filter(e => e.date === '2024-10-23')
    },
    {
      date: '2024-10-22',
      label: 'Previous',
      events: timelineEvents.filter(e => e.date === '2024-10-22')
    },
    {
      date: '2024-10-20',
      label: 'Oct 20',
      events: timelineEvents.filter(e => e.date === '2024-10-20')
    },
    {
      date: '2024-10-15',
      label: 'Oct 15',
      events: timelineEvents.filter(e => e.date === '2024-10-15')
    }
  ],
  filters: [
    { type: 'all', label: 'All Events' },
    { type: 'alerts', label: 'Alerts Only' },
    { type: 'genomics', label: 'Genomics' },
    { type: 'clinical', label: 'Clinical' },
    { type: 'uploads', label: 'Uploads' }
  ]
};

export { mockTimelineData };