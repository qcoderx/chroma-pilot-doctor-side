import React from 'react';
import { useParams } from 'react-router-dom';

const PatientDetails: React.FC = () => {
  const { id } = useParams();

  // In a real app, fetch patient data using id. For prototype, we use the static Alisha design.

  return (
    <div className="flex flex-col gap-6 font-display max-w-[1600px] mx-auto w-full pb-10">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 text-white/60 text-sm font-medium">
        <span>Patients</span>
        <span>/</span>
        <span className="text-white">Alisha ViewController</span>
        <span>/</span>
        <span className="text-primary">Genomic Decision Support</span>
      </div>

      {/* Header Card */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center rounded-lg bg-white/5 p-6 backdrop-blur-md border border-white/10">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-24 w-24 sm:h-32 sm:w-32 shrink-0 ring-2 ring-helix-violet"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB3Ku8CETKZRoqAeZstqiGh85CfxV1uIFKOrwjjVnap4dG3LSHrzGcB6By4lmJBYi6iYDpwK1RIp7Cl5oI79U_Lw_mEDxgheuWoAypsb1hbD3AlkxVSQmwD6Jy_CxK30vsocUFCDzdhf4dRk22JPFqDoWPf5-3NIl4RuRZmc5JBI7KZZuwdvc_oUhY4qbLiQ3pg4MDqeod0ZSkDYhwnhsGOpuvWWj8kpPvItyFBEkgnTyFn-iD4V7Ebyok_BuTmpGXgho65VujimOE")' }}
          ></div>
          <div className="flex flex-col justify-center gap-1">
            <h1 className="text-white text-3xl font-bold leading-tight">Alisha ViewController</h1>
            <p className="text-white/60 font-mono">ID: {id?.toUpperCase() || "#P78564"}</p>
            <p className="text-white/60">Female, 34 years old • <span className="text-info">Genome Sequenced (WGS 30x)</span></p>
            <p className="text-white/60 text-sm">PCP: Dr. Evelyn Reed</p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none h-10 px-4 rounded-lg bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
            Contact Patient
          </button>
          <button className="flex-1 md:flex-none h-10 px-4 rounded-lg bg-helix-violet text-white text-sm font-bold hover:bg-helix-violet/80 transition-colors shadow-[0_0_15px_rgba(112,0,255,0.4)]">
            Export Genomic Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Genomic Profile (Static Data) - 3 Cols */}
        <div className="lg:col-span-3 flex flex-col gap-6">
             <div className="rounded-lg bg-white/5 p-6 border border-white/10 backdrop-blur-md h-full">
                <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-helix-violet">dna</span>
                    Genomic Profile
                </h2>
                
                {/* Polygenic Risk Scores */}
                <div className="mb-6">
                    <p className="text-xs uppercase tracking-wider text-white/50 mb-3">Polygenic Risk Scores (PRS)</p>
                    <div className="flex flex-col gap-4">
                        <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-bold text-white">Coronary Artery Disease</span>
                                <span className="text-xs font-mono text-critical-red bg-critical-red/10 px-2 py-0.5 rounded">98th %ile</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-1.5">
                                <div className="bg-gradient-to-r from-helix-violet to-critical-red h-1.5 rounded-full" style={{ width: '98%' }}></div>
                            </div>
                        </div>

                        <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-bold text-white">Type 2 Diabetes</span>
                                <span className="text-xs font-mono text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">82nd %ile</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-1.5">
                                <div className="bg-gradient-to-r from-bond-blue to-yellow-400 h-1.5 rounded-full" style={{ width: '82%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Variants */}
                <div>
                    <p className="text-xs uppercase tracking-wider text-white/50 mb-3">Detected Pathogenic Variants</p>
                    <div className="space-y-3">
                         <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded transition-colors cursor-pointer">
                            <div className="size-8 rounded flex items-center justify-center bg-critical-red/20 text-critical-red font-bold text-xs">Path</div>
                            <div>
                                <p className="text-sm font-bold text-white">KCNH2 <span className="text-white/50 font-normal">c.123G>A</span></p>
                                <p className="text-xs text-white/60">Long QT Syndrome Type 2</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded transition-colors cursor-pointer">
                            <div className="size-8 rounded flex items-center justify-center bg-yellow-400/20 text-yellow-400 font-bold text-xs">VUS</div>
                            <div>
                                <p className="text-sm font-bold text-white">MYBPC3 <span className="text-white/50 font-normal">c.456C>T</span></p>
                                <p className="text-xs text-white/60">Hypertrophic Cardiomyopathy</p>
                            </div>
                         </div>
                    </div>
                </div>
             </div>
        </div>

        {/* Middle Column: Digital Health Telemetry (Dynamic Data) - 5 Cols */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-lg bg-white/5 p-6 border border-white/10 backdrop-blur-md">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-bond-blue">monitor_heart</span>
                    Live Digital Telemetry
                </h2>
                <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
             </div>

             <div className="grid grid-cols-2 gap-4 mb-6">
                 {/* Heart Rate - High */}
                 <div className="bg-black/20 p-4 rounded-xl border border-critical-red/30 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                         <span className="material-symbols-outlined text-critical-red">warning</span>
                    </div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Heart Rate</p>
                    <p className="text-4xl font-mono font-bold text-white mt-2">115 <span className="text-lg text-critical-red">BPM</span></p>
                    <p className="text-xs text-critical-red mt-1 font-mono">↑ 15% above baseline</p>
                 </div>

                 {/* HRV - Low */}
                 <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider">HRV (SDNN)</p>
                    <p className="text-4xl font-mono font-bold text-white mt-2">18 <span className="text-lg text-white/50">ms</span></p>
                    <p className="text-xs text-yellow-400 mt-1 font-mono">↓ Low variability</p>
                 </div>
                 
                 {/* SpO2 */}
                 <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider">SpO2</p>
                    <p className="text-4xl font-mono font-bold text-white mt-2">98 <span className="text-lg text-white/50">%</span></p>
                 </div>

                 {/* Sleep */}
                 <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Sleep Efficiency</p>
                    <p className="text-4xl font-mono font-bold text-white mt-2">68 <span className="text-lg text-white/50">%</span></p>
                    <p className="text-xs text-yellow-400 mt-1 font-mono">Restless night</p>
                 </div>
             </div>

             {/* Live ECG Strip */}
             <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                <p className="text-xs text-white/50 font-mono mb-2">LEAD II • 25mm/s • QT Corrected: 480ms (Prolonged)</p>
                <div className="h-24 w-full overflow-hidden relative">
                    <svg viewBox="0 0 500 100" className="w-full h-full text-critical-red" preserveAspectRatio="none">
                        <path d="M0 50 L20 50 L30 20 L40 80 L50 50 L70 50 L80 45 L90 55 L100 50 L120 50 L130 20 L140 80 L150 50 L170 50 L180 45 L190 55 L200 50 L220 50 L230 20 L240 80 L250 50 L270 50 L280 45 L290 55 L300 50 L320 50 L330 20 L340 80 L350 50 L370 50 L380 45 L390 55 L400 50 L420 50 L430 20 L440 80 L450 50 L470 50 L480 45 L490 55 L500 50" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A12] via-transparent to-transparent w-full h-full"></div>
                </div>
             </div>
          </div>

          {/* Pharmacogenomics (PGx) */}
          <div className="rounded-lg bg-white/5 p-6 border border-white/10 backdrop-blur-md">
            <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-mutation-magenta">medication</span>
                Pharmacogenomics (PGx) Safety
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-white/50 border-b border-white/10">
                            <th className="pb-2 font-medium">Drug</th>
                            <th className="pb-2 font-medium">Phenotype</th>
                            <th className="pb-2 font-medium">Recommendation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        <tr>
                            <td className="py-3 font-bold text-white">Clopidogrel</td>
                            <td className="py-3 text-white/80">CYP2C19 Poor Metabolizer</td>
                            <td className="py-3 font-bold text-critical-red">Avoid Use (High Risk)</td>
                        </tr>
                        <tr>
                            <td className="py-3 font-bold text-white">Warfarin</td>
                            <td className="py-3 text-white/80">VKORC1 High Sensitivity</td>
                            <td className="py-3 font-bold text-orange-400">Lower Initial Dose</td>
                        </tr>
                        <tr>
                            <td className="py-3 font-bold text-white">Simvastatin</td>
                            <td className="py-3 text-white/80">SLCO1B1 Normal Function</td>
                            <td className="py-3 font-bold text-green-400">Standard Dosing</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>

        {/* Right Column: Decision Support (Synthesis) - 4 Cols */}
        <div className="lg:col-span-4 flex flex-col gap-6">
             <div className="rounded-lg bg-critical-red/10 p-1 border border-critical-red/50 backdrop-blur-md h-full">
                <div className="bg-[#0B0A12]/80 h-full w-full rounded-md p-5 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="size-10 rounded-full bg-critical-red text-white flex items-center justify-center shadow-[0_0_15px_rgba(255,59,48,0.5)]">
                            <span className="material-symbols-outlined">smart_toy</span>
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-lg leading-none">Decision Engine</h2>
                            <p className="text-critical-red text-xs font-mono mt-1">CRITICAL ALERT ACTIVE</p>
                        </div>
                    </div>

                    {/* The "Bio-Collision" Logic */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <p className="text-xs text-white/50 font-bold uppercase mb-2">Trigger Event</p>
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-bond-blue">ecg_heart</span>
                                <p className="text-white text-sm">Sustained QT Prolongation (480ms) detected in real-time telemetry.</p>
                            </div>
                        </div>
                        
                        <div className="flex justify-center">
                            <span className="material-symbols-outlined text-white/20">add</span>
                        </div>

                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <p className="text-xs text-white/50 font-bold uppercase mb-2">Genomic Context</p>
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-helix-violet">dna</span>
                                <p className="text-white text-sm">Patient carries <span className="text-helix-violet font-mono">KCNH2</span> pathogenic variant (LQT2).</p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <span className="material-symbols-outlined text-white/20">arrow_downward</span>
                        </div>

                        <div className="p-4 rounded-lg bg-critical-red/20 border border-critical-red/50 shadow-[0_0_20px_rgba(255,59,48,0.1)]">
                            <p className="text-xs text-critical-red font-bold uppercase mb-2">Clinical Recommendation</p>
                            <p className="text-white font-bold text-lg mb-2">Arrhythmia Protocol Beta</p>
                            <ul className="text-sm text-white/80 list-disc list-inside space-y-1">
                                <li>Immediate electrolyte panel (K+, Mg++)</li>
                                <li>Avoid QT-prolonging antiemetics</li>
                                <li>Review Beta-Blocker dosage</li>
                            </ul>
                            <button className="w-full mt-4 py-2 bg-critical-red text-white font-bold rounded hover:bg-critical-red/90 transition-colors text-sm">
                                Acknowledge & Order Panel
                            </button>
                        </div>
                    </div>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default PatientDetails;