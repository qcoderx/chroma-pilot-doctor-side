import {
  LayoutGrid,
  Users,
  ClipboardList,
  Pill,
  Brain,
  Activity,
  TrendingUp,
  List,
  ShieldCheck,
  Settings,
  LogOut
} from 'lucide-react';

export const navConfig = [
  {
    label: 'Workspace',
    items: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: LayoutGrid
      },
      {
        label: 'Patients',
        path: '/patients',
        icon: Users
      },
      {
        label: 'Clinical Intake',
        path: '/add-patient',
        icon: ClipboardList
      }
    ]
  },
  {
    label: 'Clinical Modules',
    items: [
      {
        label: 'Prescription Safety',
        path: '/pharmacogenomics',
        icon: Pill
      },
      {
        label: 'Neurology',
        path: '/neurology',
        icon: Brain
      },
      {
        label: 'Oncology',
        path: '/oncology',
        icon: Activity
      },
      {
        label: 'Prognosis',
        path: '/prognosis',
        icon: TrendingUp
      }
    ]
  },
  {
    label: 'System',
    items: [
      {
        label: 'Activity',
        path: '/activity',
        icon: List
      },
      {
        label: 'Audit Log',
        path: '/audit',
        icon: ShieldCheck
      }
    ]
  }
];

export const footerActions = [
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings
  },
  {
    label: 'Sign Out',
    action: 'logout',
    icon: LogOut
  }
];