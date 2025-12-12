import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 font-display max-w-7xl mx-auto w-full">
      <div className="flex flex-wrap justify-between gap-4 items-center">
        <h1 className="text-white text-4xl font-black leading-tight">Genomic Population Analytics</h1>
        <button className="flex h-10 items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 hover:bg-white/10 transition-colors">
          <span className="text-white/80 text-sm font-medium">Cohort: Cardiovascular High Risk</span>
          <span className="material-symbols-outlined text-white/80">expand_more</span>
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white/5 border border-white/10 backdrop-blur-md">
          <p className="text-white/80 text-base font-medium">Total Genomes Analyzed</p>
          <p className="font-mono text-bond-blue text-4xl font-bold">1,284</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white/5 border border-white/10 backdrop-blur-md ring-1 ring-critical-red/50 shadow-[0_0_20px_rgba(255,59,48,0.15)]">
          <p className="text-white/80 text-base font-medium">Actionable Pharmacogenomic Hits</p>
          <p className="font-mono text-critical-red text-4xl font-bold">18.4%</p>
          <p className="text-xs text-white/50">Patients requiring dose adjustment</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white/5 border border-white/10 backdrop-blur-md">
          <p className="text-white/80 text-base font-medium">Polygenic Risk Score &gt; 90th %ile</p>
          <p className="font-mono text-bond-blue text-4xl font-bold">142</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="flex flex-1 flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <p className="text-white text-lg font-bold">Real-time Bio-Collision Events (Genomic x Vitals)</p>
          <div className="flex min-h-[300px] flex-1 flex-col py-4 relative">
             {/* Chart SVG */}
            <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 475 150" width="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="url(#paint1_linear_trends)" strokeLinecap="round" strokeWidth="3"></path>
                <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V150H0V109Z" fill="url(#paint0_linear_trends)"></path>
                <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_trends" x1="236" x2="236" y1="1" y2="150">
                <stop stopColor="#00C2FF" stopOpacity="0.3"></stop>
                <stop offset="1" stopColor="#00C2FF" stopOpacity="0"></stop>
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_trends" x1="0" x2="472" y1="75" y2="75">
                <stop stopColor="#00C2FF"></stop>
                <stop offset="1" stopColor="#7000FF"></stop>
                </linearGradient>
                </defs>
            </svg>
          </div>
          <div className="flex justify-around border-t border-white/10 pt-4">
            {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(w => (
                <p key={w} className="font-mono text-white/60 text-xs font-bold">{w}</p>
            ))}
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="flex flex-1 flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <p className="text-white text-lg font-bold">Variant Prevalence (Pathogenic)</p>
          <div className="grid flex-1 gap-x-4 gap-y-5 grid-cols-[auto_1fr_auto] items-center py-3">
             {[
                 { label: 'BRCA1/2 (Onco)', val: '12%', color: 'bg-mutation-magenta', text: 'text-mutation-magenta' },
                 { label: 'LDLR (Hyperchol)', val: '28%', color: 'bg-helix-violet', text: 'text-helix-violet' },
                 { label: 'HFE (Hemochromatosis)', val: '8%', color: 'bg-bond-blue', text: 'text-bond-blue' },
                 { label: 'CFTR (Carrier)', val: '15%', color: 'bg-bond-blue', text: 'text-bond-blue' },
                 { label: 'Lynch Syndrome', val: '5%', color: 'bg-critical-red', text: 'text-critical-red' },
             ].map((item, i) => (
                 <React.Fragment key={i}>
                    <p className="text-white/80 text-sm font-medium">{item.label}</p>
                    <div className={`h-2 w-full rounded-full ${item.color.replace('bg-', 'bg-opacity-20 bg-')}`}>
                        <div className={`h-2 rounded-full ${item.color}`} style={{ width: item.val }}></div>
                    </div>
                    <p className={`font-mono text-sm font-bold ${item.text}`}>{item.val}</p>
                 </React.Fragment>
             ))}
          </div>
        </div>
      </div>

      {/* At-Risk Table */}
      <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <h3 className="text-white text-lg font-bold">Pharmacogenomics (PGx) Population Alerts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-sm font-bold text-white/60">Drug Class</th>
                <th className="p-4 text-sm font-bold text-white/60">Associated Gene</th>
                <th className="p-4 text-sm font-bold text-white/60 text-right">Affected Patients</th>
                <th className="p-4 text-sm font-bold text-white/60 text-right">Clinical Impact</th>
              </tr>
            </thead>
            <tbody>
              {[
                  { name: 'Antiplatelet (Clopidogrel)', gene: 'CYP2C19', count: 42, risk: 'High (Poor Metabolizers)', riskColor: 'text-critical-red' },
                  { name: 'Anticoagulant (Warfarin)', gene: 'VKORC1 / CYP2C9', count: 35, risk: 'Medium (Dose Sensitivity)', riskColor: 'text-orange-400' },
                  { name: 'Opioids (Codeine)', gene: 'CYP2D6', count: 18, risk: 'High (Ultrarapid Metabolizers)', riskColor: 'text-critical-red' },
                  { name: 'Statins (Simvastatin)', gene: 'SLCO1B1', count: 64, risk: 'Medium (Myopathy Risk)', riskColor: 'text-orange-400' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/10 hover:bg-white/5 last:border-0">
                    <td className="p-4 text-sm font-bold">{row.name}</td>
                    <td className="p-4 font-mono text-sm text-info">{row.gene}</td>
                    <td className="p-4 font-mono text-sm text-right">{row.count}</td>
                    <td className={`p-4 font-mono text-sm text-right ${row.riskColor}`}>{row.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;