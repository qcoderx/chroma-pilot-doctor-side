import React from 'react';
import { Link } from 'react-router-dom';

const RedZone: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 font-display max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Red Zone Patients</h1>
        <p className="text-white/60 text-base font-normal">Patients with active, high-priority Bio-Collisions requiring immediate attention.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg border border-white/10 frosted-glass">
        {['Collision Type: All', 'Status: All', 'Urgency: All'].map((filter) => (
          <button key={filter} className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-md bg-white/10 hover:bg-white/20 px-4 transition-colors">
            <p className="text-white text-sm font-medium">{filter}</p>
            <span className="material-symbols-outlined text-white text-xl">expand_more</span>
          </button>
        ))}
        <div className="flex-grow"></div>
        <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-md bg-white/10 hover:bg-white/20 px-4 transition-colors">
            <p className="text-white text-sm font-medium">Sort by: Urgency</p>
            <span className="material-symbols-outlined text-white text-xl">swap_vert</span>
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-lg border border-white/10 frosted-glass">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead>
                <tr className="border-b border-b-white/10 bg-white/5">
                <th className="px-4 py-3 text-white/80 text-sm font-medium">Patient Name / ID</th>
                <th className="px-4 py-3 text-white/80 text-sm font-medium">Bio-Collision</th>
                <th className="px-4 py-3 text-white/80 text-sm font-medium">Risk Score</th>
                <th className="px-4 py-3 text-white/80 text-sm font-medium hidden md:table-cell">Time Since Alert</th>
                <th className="px-4 py-3 text-white/80 text-sm font-medium hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 text-white/80 text-sm font-medium">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
                {[
                    { name: 'Eleanor Vance / #P789123', collision: 'Metabolic Cascade', score: '9.8 High', time: '2h 15m ago', status: 'Action Required', statusClass: 'text-critical-red bg-critical-red/20', scoreIcon: 'error', scoreColor: 'text-critical-red' },
                    { name: 'Kenji Tanaka / #P456789', collision: 'Immune Conflict', score: '9.5 High', time: '5h 45m ago', status: 'Action Required', statusClass: 'text-critical-red bg-critical-red/20', scoreIcon: 'error', scoreColor: 'text-critical-red' },
                    { name: 'Aisha Khan / #P123456', collision: 'Genetic Mismatch', score: '9.2 High', time: '8h 30m ago', status: 'Under Review', statusClass: 'text-white/80 bg-white/10', scoreIcon: 'error', scoreColor: 'text-critical-red' },
                    { name: 'Ricardo Diaz / #P654321', collision: 'Cellular Decay', score: '8.9 Medium', time: '1d 2h ago', status: 'Alerted', statusClass: 'text-white/80 bg-white/10', scoreIcon: 'warning', scoreColor: 'text-yellow-400' },
                    { name: 'Samantha Green / #P987654', collision: 'Pathogen Interaction', score: '8.5 Medium', time: '1d 10h ago', status: 'Alerted', statusClass: 'text-white/80 bg-white/10', scoreIcon: 'warning', scoreColor: 'text-yellow-400' },
                ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className={`px-4 py-4 text-sm font-bold ${row.scoreColor === 'text-critical-red' ? 'text-critical-red' : 'text-white'}`}>{row.name}</td>
                        <td className="px-4 py-4 text-white/80 text-sm">{row.collision}</td>
                        <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                                <span className={`material-symbols-outlined ${row.scoreColor}`}>{row.scoreIcon}</span>
                                <span className="text-white text-sm font-medium">{row.score}</span>
                            </div>
                        </td>
                        <td className="px-4 py-4 text-white/80 text-sm hidden md:table-cell">{row.time}</td>
                        <td className="px-4 py-4 hidden sm:table-cell">
                            <span className={`inline-flex items-center justify-center rounded-md h-8 px-3 text-sm font-medium w-[140px] ${row.statusClass}`}>
                                {row.status}
                            </span>
                        </td>
                        <td className="px-4 py-4 text-sm font-bold tracking-[0.015em]">
                            <Link to={`/patient/${i}`} className="text-primary hover:text-primary/80 transition-colors">View Details</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default RedZone;