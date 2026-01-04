import React from 'react';
import { motion } from 'framer-motion';
import CardSwap, { Card } from '../ui/CardSwap';
import { featuresData } from '../../mocks/landingData';
import ScrambledText from '../ui/ScrambledText';

const colorClasses = {
  blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
  purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
  emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600',
  amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600',
  rose: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600',
  cyan: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600'
};

const cardBackgrounds = {
  blue: 'bg-gradient-to-br from-blue-600 to-blue-700',
  purple: 'bg-gradient-to-br from-purple-600 to-purple-700',
  emerald: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
  amber: 'bg-gradient-to-br from-amber-600 to-amber-700',
  rose: 'bg-gradient-to-br from-rose-600 to-rose-700',
  cyan: 'bg-gradient-to-br from-cyan-600 to-cyan-700'
};

export const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Column - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-display mb-6">
              Built for modern precision medicine
            </h2>
            <div className="mb-8">
              <ScrambledText 
                radius={120}
                duration={1000}
                className="text-lg text-slate-600 dark:text-slate-400 font-body"
              >
                Everything you need to manage genomic workflows at scale. Our comprehensive platform integrates seamlessly with your existing infrastructure.
              </ScrambledText>
            </div>
            
            {/* Feature List */}
            <div className="space-y-4">
              {featuresData.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                    <span className="material-symbols-outlined text-lg">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white font-display">{feature.title}</h3>
                    <div className="mt-1">
                      <ScrambledText 
                        radius={80}
                        duration={600}
                        className="text-sm text-slate-600 dark:text-slate-400 font-body"
                      >
                        {feature.description}
                      </ScrambledText>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.a 
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all mt-8"
              href="#"
            >
              View all features 
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </motion.a>
          </motion.div>
          
          {/* Right Column - Animated Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end p-8"
          >
            <CardSwap
              width={320}
              height={200}
              cardDistance={30}
              verticalDistance={40}
              delay={3500}
              pauseOnHover={true}
              easing="elastic"
            >
              {featuresData.map((feature) => (
                <Card
                  key={feature.id}
                  className={`rounded-xl border border-white/20 ${cardBackgrounds[feature.color as keyof typeof cardBackgrounds]} text-white p-6 shadow-2xl backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg text-white">{feature.icon}</span>
                    </div>
                    <h3 className="font-bold text-white font-display text-sm">{feature.title}</h3>
                  </div>
                  <p className="text-white/90 text-xs leading-relaxed font-body">
                    {feature.description.slice(0, 80)}...
                  </p>
                </Card>
              ))}
            </CardSwap>
          </motion.div>
        </div>
      </div>
    </section>
  );
};