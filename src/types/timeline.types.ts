export interface TimelineEvent {
  id: string;
  type: 'alert' | 'telemetry' | 'phenotype' | 'genome' | 'upload' | 'created' | 'medication' | 'appointment';
  title: string;
  description: string;
  timestamp: string;
  date: string;
  priority?: 'critical' | 'high' | 'medium' | 'low';
  status?: 'success' | 'warning' | 'error' | 'info';
  metadata?: {
    gene?: string;
    filename?: string;
    source?: string;
    pipeline?: string;
    provider?: string;
  };
  actions?: Array<{
    label: string;
    type: 'primary' | 'secondary';
    icon?: string;
  }>;
}

export interface TimelineGroup {
  date: string;
  label: string;
  events: TimelineEvent[];
}

export interface TimelineFilter {
  type: 'all' | 'alerts' | 'genomics' | 'clinical' | 'uploads';
  label: string;
}

export interface TimelineData {
  groups: TimelineGroup[];
  filters: TimelineFilter[];
}