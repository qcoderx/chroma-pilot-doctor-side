import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 font-display max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
           <h1 className="tracking-widest text-3xl font-bold uppercase text-white">GENOMIC MISSION CONTROL</h1>
           <p className="text-white/50 text-sm mt-1">Integrated Genomic & Biometric Clinical Support System</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/50">search</span>
            <input 
              className="w-full bg-white/5 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:border-primary/50" 
              placeholder="Search Patients or Variants..." 
            />
          </div>
          <button className="flex items-center justify-center size-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            <span className="material-symbols-outlined text-white/80">notifications</span>
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="frosted-glass rounded-lg p-6 hover:bg-white/5 transition-all cursor-pointer group">
          <p className="text-sm font-medium uppercase tracking-wider text-white/70">Active Bio-Genomic Collisions</p>
          <div className="flex items-end gap-3 mt-2">
            <p className="text-4xl font-bold tracking-tight text-critical-red" style={{ textShadow: "0 0 15px rgba(255, 59, 48, 0.5)" }}>12</p>
            <p className="text-sm font-medium text-green-400 mb-1 flex items-center">
              <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
              +2 detections
            </p>
          </div>
        </div>

        <div className="frosted-glass rounded-lg p-6 hover:bg-white/5 transition-all">
          <p className="text-sm font-medium uppercase tracking-wider text-white/70">Genomes Sequenced</p>
          <div className="flex items-end gap-3 mt-2">
            <p className="text-4xl font-bold tracking-tight text-white">248</p>
            <p className="text-sm font-medium text-bond-blue mb-1">100% Coverage</p>
          </div>
        </div>

        <div className="frosted-glass rounded-lg p-6 hover:bg-white/5 transition-all">
          <p className="text-sm font-medium uppercase tracking-wider text-white/70">Clinical Actions Generated</p>
          <div className="flex items-end gap-3 mt-2">
            <p className="text-4xl font-bold tracking-tight text-helix-violet">84</p>
            <p className="text-sm font-medium text-white/50 mb-1">This week</p>
          </div>
        </div>
      </div>

      {/* Recent Alerts Table */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold leading-tight tracking-wider text-white uppercase">Priority Decision Queue</h2>
            <Link to="/red-zone" className="text-sm text-primary hover:text-white transition-colors">View All</Link>
        </div>
        
        <div className="frosted-glass rounded-lg overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left">
              <thead className="bg-white/5">
                <tr>
                  <th className="py-4 pl-6 pr-3 text-sm font-semibold text-white/60 uppercase tracking-wider">Patient</th>
                  <th className="px-3 py-4 text-sm font-semibold text-white/60 uppercase tracking-wider">Detected Trigger</th>
                  <th className="px-3 py-4 text-sm font-semibold text-white/60 uppercase tracking-wider">Genomic Context</th>
                  <th className="px-3 py-4 text-sm font-semibold text-white/60 uppercase tracking-wider">Decision Support</th>
                  <th className="relative py-3.5 pl-3 pr-6"><span className="sr-only">View</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 pl-6 pr-3 font-medium text-white">Kenji Tanaka</td>
                  <td className="px-3 py-4 text-white/80">SpO2 Drop to 88%</td>
                  <td className="px-3 py-4 font-mono text-xs text-info">HIF1A Variation (Hypoxia sens.)</td>
                  <td className="px-3 py-4">
                    <span className="inline-flex items-center rounded-full bg-critical-red/20 px-2 py-1 text-xs font-medium text-critical-red ring-1 ring-inset ring-critical-red/30">
                      Immediate Oxygen + Gene Review
                    </span>
                  </td>
                  <td className="py-4 pl-3 pr-6 text-right">
                     <Link to="/patient/kenji" className="text-bond-blue hover:text-white transition-colors">View Analysis</Link>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 pl-6 pr-3 font-medium text-white">Elena Petrova</td>
                  <td className="px-3 py-4 text-white/80">Arrhythmia Detected</td>
                  <td className="px-3 py-4 font-mono text-xs text-info">KCNH2 (Long QT Type 2)</td>
                  <td className="px-3 py-4">
                    <span className="inline-flex items-center rounded-full bg-critical-red/20 px-2 py-1 text-xs font-medium text-critical-red ring-1 ring-inset ring-critical-red/30">
                      Contraindication Alert: Zofran
                    </span>
                  </td>
                  <td className="py-4 pl-3 pr-6 text-right">
                     <Link to="/patient/elena" className="text-bond-blue hover:text-white transition-colors">View Analysis</Link>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 pl-6 pr-3 font-medium text-white">Marcus Thorne</td>
                  <td className="px-3 py-4 text-white/80">Prescription Request: Warfarin</td>
                  <td className="px-3 py-4 font-mono text-xs text-info">CYP2C9*3 / VKORC1</td>
                  <td className="px-3 py-4">
                    <span className="inline-flex items-center rounded-full bg-orange-400/20 px-2 py-1 text-xs font-medium text-orange-400 ring-1 ring-inset ring-orange-400/30">
                      Dosage Adjustment Req.
                    </span>
                  </td>
                  <td className="py-4 pl-3 pr-6 text-right">
                     <Link to="/patient/marcus" className="text-bond-blue hover:text-white transition-colors">View Analysis</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;