import { FeatureCard, WorkflowStep, Agent, Testimonial, StatItem, NavigationItem } from '../types/landing.types';

export const navigationItems: NavigationItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Science', href: '#agents' }
];

export const statsData: StatItem[] = [
  { label: 'Sequences Processed', value: '50k+', numericValue: 50000 },
  { label: 'Variant Accuracy', value: '99.9%', numericValue: 99.9 },
  { label: 'Analysis Time', value: '15m', numericValue: 15 },
  { label: 'Hospitals Using', value: '200+', numericValue: 200 }
];

export const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    icon: 'cloud_upload',
    title: '1. Secure Upload',
    description: 'Upload FASTQ/VCF files directly to our HIPAA-compliant cloud via API or drag-and-drop interface.'
  },
  {
    id: 2,
    icon: 'psychology',
    title: '2. AI Analysis',
    description: 'Our ensemble of AI agents identifies variants, checks databases (ClinVar, OMIM), and scores pathogenicity.'
  },
  {
    id: 3,
    icon: 'assignment_turned_in',
    title: '3. Clinical Report',
    description: 'Receive a generated, customizable PDF report ready for sign-off by a medical geneticist.'
  }
];

export const featuresData: FeatureCard[] = [
  {
    id: 'pharmacogenomics',
    icon: 'medication',
    title: 'Pharmacogenomics',
    description: 'Automatically flag drug-gene interactions to prevent adverse reactions before prescribing.',
    color: 'blue'
  },
  {
    id: 'rare-disease',
    icon: 'coronavirus',
    title: 'Rare Disease Detection',
    description: 'Identify ultra-rare variants using our proprietary phenotype-genotype matching engine.',
    color: 'purple'
  },
  {
    id: 'population-health',
    icon: 'groups',
    title: 'Population Health',
    description: 'Aggregate anonymous data to track regional variant frequencies and outbreaks.',
    color: 'emerald'
  },
  {
    id: 'ehr-integration',
    icon: 'integration_instructions',
    title: 'EHR Integration',
    description: 'Seamless two-way sync with Epic, Cerner, and other major Electronic Health Records.',
    color: 'amber'
  },
  {
    id: 'role-access',
    icon: 'lock_person',
    title: 'Role-Based Access',
    description: 'Granular permission controls for lab technicians, bioinformaticians, and clinicians.',
    color: 'rose'
  },
  {
    id: 'audit-trails',
    icon: 'history_edu',
    title: 'Audit Trails',
    description: 'Full traceability of every file access, analysis run, and report generation event.',
    color: 'cyan'
  }
];

export const agentsData: Agent[] = [
  {
    id: 'variant-bot',
    name: 'Variant-Bot',
    version: 'v2.4.1',
    role: 'PRIMARY ANALYST',
    description: 'Responsible for initial SNV and Indel calling. Cross-references 50+ global databases to assign pathogenicity scores (ACMG guidelines).',
    accuracy: 99.8,
    icon: 'biotech'
  },
  {
    id: 'pheno-scout',
    name: 'Pheno-Scout',
    version: 'v1.9.0',
    role: 'CORRELATION ENGINE',
    description: 'Reads unstructured clinical notes from the EHR to match patient symptoms with genetic findings, reducing VUS rates.',
    accuracy: 94.2,
    icon: 'page_info'
  },
  {
    id: 'report-gen',
    name: 'Report-Gen',
    version: 'v3.0.2',
    role: 'SYNTHESIZER',
    description: 'Synthesizes findings into natural language summaries for clinicians and patients, highlighting actionable next steps.',
    accuracy: 99.5,
    icon: 'description'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'adunni-okafor',
    quote: 'Chroma-Pilot reduced our variant interpretation time by 70%. It\'s not just a tool; it\'s like adding a dozen geneticists to our team overnight.',
    author: 'Dr. Adunni Okafor',
    title: 'Chief Medical Officer',
    company: 'Lagos University Teaching Hospital',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoPeloLwGLkugU9zpqt6psssOvKqpMg4n3_7ckSPQ6TG3_1lyB95li8G31oSBr9Glya2LJuQr_IW1rg0C-YpveYtmScqRFpKxBJnGyqelJDDj4RXUDYWmriD6WSOdL-EvcbaLTNyPJisqUXma5Oj3KPJYAmvfBHxFG3D1mU3qGRQXbhrqichgjKpVmhyjoHtrEBtEqPbQTmejY2CDPAiIt7cp3HALuWRn6F6GXQTe2JoVt0zFT_ArQP6sUdqoVz1gI5O0PRWuIhGs'
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