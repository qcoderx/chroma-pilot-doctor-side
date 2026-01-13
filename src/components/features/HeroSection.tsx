import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import ScrambledText from '../ui/ScrambledText';
import StarBorder from '../ui/StarBorder';
import SimpleCounter from '../ui/SimpleCounter';
import TextType from '../ui/TextType';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleScrollToDemo = () => {
    const element = document.querySelector('#cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleStartPilot = () => {
    navigate('/dashboard');
  };
  
  const avatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCb-9JW-lH1z1NDlP9bQW3jmZ4mo3dvhN-iHNpwvbhUTDZuaYLWQ0ISN1Vl4fTkYai822cWEe0PXiVpptsJYb3fCPFFy9444QVGcuBgcXKZw8ElNksa3TMuuW2QfqyqvPjG9LPNCnW3STOBnKOhENurZscqDsnON5fzowtBjsnobG0CiaF0zOu7p2aVDmUlAxGt8CJ7XfrdkTWqub9KjP4gEt_PpXc6GWUxwnmhiNmXc7GfAKOfT-KYVc3oIKL8OlRVMVwe5JPR7BQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCCLX4yg3WSevtCYd790GOMB_vIJIJ3bgPDLDySPRg961JHrq_ABVlPPy26O9Xw5G2fszEdfqCyT5eCworeBi4BE7VGtNKli_scyiAuQiypFEjhPdcnOWFolSZ-4a6-yBvQLnrJSZtWJqK5QFD2gkOG9gPwpHaCQg4n8Ct79vEagVG-lQhKZH3Ybs9EyouZF82v6092cNsKt_ohMTNNjaSbg_pJZF78_ylYg-VHqE97tiXRKCzbV-Uyv27BfDFIB8hEVdleSrUkcGQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB5rjMvL_FYbuFMm3mfxzQJOl7Je2RUgq45vWevUpBmgf-zVPTKOaMQ9p3BR0HBMyxX89fFSGNIWv-is8xxjZEBJZY6aJPMyrLWyFCMC2GZV1In9LQSy2sOe_VglsAY3o7Juqskd9GWoEPFQYfYtLAtc3CXRdLLY6IwZbt_3xeZHKukL9m6D9ODkGVta2DT0TxKbrFFAjpjMBAFe8f8LxxJ9CpOj84XEU4KyjOtJHODpMFsZuzN744rAOwyGxd_EEowwXxLUvhFoFE'
  ];
  
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 max-w-2xl"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/5 px-3 py-1 text-xs font-semibold text-blue-600"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="font-mono">New: BioReason v3.1 - Causal Logic Engine</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl font-display"
            >
              <TextType
                text={[
                  "Biology is deterministic. Healthcare shouldn't be.",
                  "From read-only biology to read-write medicine.",
                  "Clinical decision-support for human biology."
                ]}
                typingSpeed={80}
                pauseDuration={3000}
                deletingSpeed={40}
                cursorCharacter="●"
                cursorClassName="text-blue-600"
                className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl font-display"
                textColors={['#1e293b', '#2563eb', '#06b6d4']}
                startOnVisible={true}
              />
            </motion.h1>
            
            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg font-body"
            >
              <ScrambledText 
                radius={150}
                duration={1200}
                className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-body"
              >
                A clinical decision-support operating system that turns static genomic data into live, actionable insights. Assists doctors, filters noise, surfaces risks - never replaces clinical judgment.
              </ScrambledText>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <StarBorder 
                color="#2563eb" 
                speed="4s" 
                className="hover:scale-105 transition-transform"
                onClick={() => navigate('/login')}
                aria-label="Access clinical dashboard"
              >
                Access Dashboard
              </StarBorder>
              <StarBorder 
                color="#06b6d4" 
                speed="5s" 
                className="hover:scale-105 transition-transform"
                onClick={handleScrollToDemo}
                aria-label="Watch workflow demonstration video"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">play_circle</span>
                  Watch Workflow
                </span>
              </StarBorder>
            </motion.div>
            
            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-4 pt-6 text-sm text-slate-500 dark:text-slate-400"
            >
              <div className="flex -space-x-2" role="img" aria-label="Profile pictures of medical professionals">
                {avatars.map((avatar, index) => (
                  <div
                    key={index}
                    className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200"
                    style={{
                      backgroundImage: `url('${avatar}')`,
                      backgroundSize: 'cover'
                    }}
                    aria-label={`Medical professional ${index + 1}`}
                  />
                ))}
              </div>
              <p className="font-body font-medium">
                Trusted by <SimpleCounter 
                  value={50}
                  fontSize={14}
                  textColor="inherit"
                  fontWeight={500}
                />+ African Research Hospitals
              </p>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative lg:h-[600px] w-full flex items-center justify-center"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-600/20 via-cyan-500/10 to-transparent blur-3xl rounded-full opacity-60" aria-hidden="true"></div>
            
            {/* Dashboard Visual */}
            <div 
              className="relative w-full aspect-square md:aspect-auto md:h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-900"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4hs01gNNaPa2oTtetQAxez-XiGp7iha_ZVha8rJvK2NxnqNKc1seCdXa8iNbGciMBVfu9jM3Gn_kOPon1m9EKSL67JFT-B0WvrkBUftgfh_vi9qH5NLl0pAL4n5wG56NN2YVER3d9K1I8autarFx0FOkPyyTmB4nWwCLMkZarSklPaT7HACHYwhLgtrwPAdwGqMVUoZ4YITnt8wduY1YtAmvvtTTNo5tXh6CZGW1PTDX7ekWUUPtoLqj9LyiTKA6IXDzwUuc2d-s')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              role="img"
              aria-label="Abstract 3D visualization of DNA helix with digital interface overlays showing genomic analysis dashboard"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" aria-hidden="true"></div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-cyan-400">ANALYSIS COMPLETE</span>
                  <span className="text-xs font-mono text-slate-400">ID: <span className="font-mono">#GEN-<SimpleCounter 
                    value={8492}
                    fontSize={12}
                    textColor="inherit"
                    fontWeight={400}
                  /></span></span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={92} aria-valuemin={0} aria-valuemax={100} aria-label="Genomic analysis progress: 92% complete">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  />
                </div>
                <div className="mt-1 text-right">
                  <span className="text-xs font-mono text-cyan-400">
                    <SimpleCounter 
                      value={92}
                      fontSize={12}
                      textColor="#22d3ee"
                      fontWeight={500}
                    />% Complete
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};