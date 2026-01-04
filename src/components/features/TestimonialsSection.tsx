import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { testimonialsData, partnerLogos } from '../../mocks/landingData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Column - Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Trusted by leaders in genomic medicine
            </h2>
            
            <div className="mt-8 space-y-6">
              {testimonialsData.map((testimonial) => (
                <Card key={testimonial.id} className="border-l-4 border-blue-600">
                  <blockquote>
                    <p className="text-lg italic text-slate-700 dark:text-slate-300">
                      "{testimonial.quote}"
                    </p>
                    <footer className="mt-4 flex items-center gap-3">
                      <div 
                        className="h-10 w-10 rounded-full bg-slate-200"
                        style={{
                          backgroundImage: `url('${testimonial.avatar}')`,
                          backgroundSize: 'cover'
                        }}
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {testimonial.author}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {testimonial.title}, {testimonial.company}
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </Card>
              ))}
            </div>
          </motion.div>
          
          {/* Right Column - Partner Logos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8 opacity-60 grayscale"
          >
            {partnerLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center justify-center p-6 bg-slate-200/50 dark:bg-white/5 rounded-lg"
              >
                {logo.name === 'GENOCORE' && (
                  <span className="text-xl font-black text-slate-800 dark:text-white tracking-widest">
                    {logo.display}<span className="text-blue-600">{logo.highlight}</span>
                  </span>
                )}
                {logo.name === 'MediLab+' && (
                  <span className="text-xl font-bold text-slate-800 dark:text-white">
                    {logo.display}<span className="font-light">{logo.light}</span>{logo.suffix}
                  </span>
                )}
                {logo.name === 'BioScout' && (
                  <span className="text-xl font-serif italic text-slate-800 dark:text-white">
                    {logo.display}
                  </span>
                )}
                {logo.name === 'HELIX/SYS' && (
                  <span className="text-xl font-mono font-bold text-slate-800 dark:text-white">
                    {logo.display}<span className="text-blue-600">{logo.separator}</span>{logo.end}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};