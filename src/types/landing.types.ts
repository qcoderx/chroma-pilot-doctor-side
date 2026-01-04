export interface NavigationItem {
  label: string;
  href: string;
}

export interface FeatureCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface WorkflowStep {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Agent {
  id: string;
  name: string;
  version: string;
  role: string;
  description: string;
  accuracy: number;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
}

export interface StatItem {
  label: string;
  value: string;
  numericValue?: number;
}

export interface EmailSignupForm {
  email: string;
}