import { FeatureCard, WorkflowStep, Agent, Testimonial, StatItem, NavigationItem } from '../types/landing.types';

export const navigationItems: NavigationItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Science', href: '#agents' }
];

export const statsData: StatItem[] = [
  { label: 'Exabytes of Bio Data Generated Annually', value: '40+', numericValue: 40 },
  { label: 'Genomic Data Remains Dark/Unused', value: '99%', numericValue: 99 },
  { label: 'Sequencing Cost Reduction', value: '$200', numericValue: 200 },
  { label: 'Nigerian Doctors Left in 2024', value: '4000+', numericValue: 4000 }
];

export const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    icon: 'upload_file',
    title: '1. Doctor-Led Intake',
    description: 'Upload VCF files to secure dashboard. Genome parsed in 2-3 minutes, variants inserted into database without storing raw data.'
  },
  {
    id: 2,
    icon: 'smartphone',
    title: '2. Patient Connection',
    description: 'Send secure magic link via WhatsApp/SMS. Patient completes 30-question phenotype onboarding to build Digital Twin.'
  },
  {
    id: 3,
    icon: 'monitor_heart',
    title: '3. Read-Write Monitoring',
    description: 'Wearables stream biometrics. System alerts clinicians before biological collisions occur, enabling preventive intervention.'
  }
];

export const featuresData: FeatureCard[] = [
  {
    id: 'pharmacogenomics',
    icon: 'medication',
    title: 'Pharmacogenomics',
    description: 'Flags drug-gene interactions like CYP2D6 + Codeine. Reduces ADRs - the 4th leading cause of death globally.',
    color: 'blue'
  },
  {
    id: 'disease-risk',
    icon: 'health_and_safety',
    title: 'Disease Risk Assessment',
    description: 'Polygenic risk scoring for conditions like APOL1-associated cardiomyopathies common in African populations.',
    color: 'purple'
  },
  {
    id: 'rare-disease',
    icon: 'search',
    title: 'Rare Disease Diagnosis',
    description: 'Shortens diagnostic odysseys. Example: SCN1A variants and Dravet Syndrome with contraindicated drug warnings.',
    color: 'emerald'
  },
  {
    id: 'oncology-support',
    icon: 'biotech',
    title: 'Oncology Support',
    description: 'Tumor VCF analysis identifies HRD and "BRCAness" to support targeted therapies like PARP inhibitors.',
    color: 'amber'
  },
  {
    id: 'prognosis-modeling',
    icon: 'trending_up',
    title: 'Prognosis Modeling',
    description: 'Predicts disease progression speed by combining genetics with lifestyle factors to guide follow-up intensity.',
    color: 'rose'
  },
  {
    id: 'biological-gps',
    icon: 'gps_fixed',
    title: 'Biological GPS',
    description: 'Continuously watches biological pathways, alerting clinicians before dangerous collisions occur.',
    color: 'cyan'
  }
];

export const agentsData: Agent[] = [
  {
    id: 'alphaMissense',
    name: 'AlphaMissense',
    version: 'v2.0',
    role: 'THE PHYSICIST',
    description: 'Uses protein physics, not population frequency. Folds proteins in 3D to see if mutations break structure. Eliminates racial bias inherent in Eurocentric datasets.',
    accuracy: 90.7,
    icon: 'science'
  },
  {
    id: 'gene42',
    name: 'Gene42',
    version: 'v1.5',
    role: 'THE HISTORIAN',
    description: 'Reads long DNA context and haplotypes. Understands complex African ancestry patterns. Provides genetic context standard models miss.',
    accuracy: 94.2,
    icon: 'history_edu'
  },
  {
    id: 'bioReason',
    name: 'BioReason',
    version: 'v3.1',
    role: 'THE DETECTIVE',
    description: 'Applies causal logic and step-by-step reasoning. Connects broken proteins to drug response and disease mechanisms. Explains why mutations matter clinically.',
    accuracy: 96.8,
    icon: 'psychology'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'dr-adunni-okafor',
    quote: 'In Lagos, 10.7% of our admissions are ADR-related. Chroma-Pilot helps us prevent these tragedies by flagging drug-gene interactions before we prescribe. It\'s not replacing our judgment - it\'s amplifying our ability to see what matters.',
    author: 'Dr. Adunni Okafor',
    title: 'Chief Medical Officer',
    company: 'Lagos University Teaching Hospital',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: 'prof-kwame-asante',
    quote: 'We\'re drowning in genomic data but starving for insight. Chroma-Pilot turns our VCF files from static reports into living, actionable intelligence. The Trinity approach works brilliantly for African genomic variants.',
    author: 'Prof. Kwame Asante',
    title: 'Director of Medical Genetics',
    company: 'University of Ghana Medical Centre',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face'
  }
];

export const partnerLogos = [
  { name: 'GENOCORE', display: 'GENO', highlight: 'CORE' },
  { name: 'MediLab+', display: 'Medi', light: 'Lab', suffix: '+' },
  { name: 'BioScout', display: 'BioScout', style: 'italic' },
  { name: 'HELIX/SYS', display: 'HELIX', separator: '/', end: 'SYS' }
];

// Enhanced medical data for dashboard
export const patientMockData = [
  {
    id: 'CH-2045',
    name: 'Adebayo Ogundimu',
    age: 34,
    sex: 'M',
    condition: 'SpO2 Drop to 88%',
    gene: 'HIF1A',
    variant: 'c.1772C>T (p.Pro591Leu)',
    alphaMissenseScore: 0.89,
    riskLevel: 'CRITICAL',
    lastActivity: '2 hours ago',
    recommendation: 'Immediate Oxygen + Gene Review'
  },
  {
    id: 'CH-1987',
    name: 'Chioma Nwankwo',
    age: 28,
    sex: 'F',
    condition: 'Arrhythmia Detected',
    gene: 'KCNH2',
    variant: 'c.2690A>G (p.Asn897Ser)',
    alphaMissenseScore: 0.94,
    riskLevel: 'CRITICAL',
    lastActivity: '1 day ago',
    recommendation: 'Contraindication Alert: Zofran'
  },
  {
    id: 'CH-2103',
    name: 'Emeka Okoro',
    age: 45,
    sex: 'M',
    condition: 'Prescription Request: Warfarin',
    gene: 'CYP2C9*3/VKORC1',
    variant: 'c.1075A>C (*3 allele)',
    alphaMissenseScore: 0.76,
    riskLevel: 'MODERATE',
    lastActivity: '3 hours ago',
    recommendation: 'Dosage Adjustment Required'
  }
];