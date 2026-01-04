import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigation } from '../components/features/Navigation';
import { HeroSection } from '../components/features/HeroSection';
import { StatsBar } from '../components/features/StatsBar';
import { WorkflowSection } from '../components/features/WorkflowSection';
import { FeaturesGrid } from '../components/features/FeaturesGrid';
import { AgentsSection } from '../components/features/AgentsSection';
import { TestimonialsSection } from '../components/features/TestimonialsSection';
import { CTASection } from '../components/features/CTASection';
import { Footer } from '../components/features/Footer';
import ScrambledText from '../components/ui/ScrambledText';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-body antialiased selection:bg-blue-600/30 selection:text-blue-600">
      <Navigation />
      
      <main>
        <HeroSection />
        <StatsBar />
        
        {/* Problem Statement */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              The Genomic Data Bottleneck
            </h2>
            <div className="mt-4">
              <ScrambledText 
                radius={120}
                duration={1000}
                className="text-lg text-slate-600 dark:text-slate-300 font-body"
              >
                Hospitals are drowning in unanalyzed sequencing data. Manual interpretation is slow, error-prone, and unscalable. Chroma-Pilot bridges the gap between raw FASTQ data and life-saving clinical insights.
              </ScrambledText>
            </div>
          </div>
        </section>
        
        <WorkflowSection />
        <FeaturesGrid />
        <AgentsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      
      <Footer />
      
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155'
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#f1f5f9'
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#f1f5f9'
            }
          }
        }}
      />
    </div>
  );
};

export default LandingPage;