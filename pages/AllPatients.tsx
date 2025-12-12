import React from 'react';
import { Link } from 'react-router-dom';

const AllPatients: React.FC = () => {
  const patients = [
    { name: 'Eleanor Vance', id: 'PID-84321', risk: 'High', checkin: '2024-07-15', status: 'At Risk', statusColor: 'text-yellow-400', riskBg: 'bg-red-500/10 text-red-400' },
    { name: 'Marcus Thorne', id: 'PID-75943', risk: 'Low', checkin: '2024-07-14', status: 'Stable', statusColor: 'text-[#00c3ff]', riskBg: 'bg-[#7000FF]/10 text-[#7000FF]' },
    { name: 'Aria Chen', id: 'PID-66219', risk: 'Medium', checkin: '2024-07-15', status: 'Stable', statusColor: 'text-[#00c3ff]', riskBg: 'bg-orange-500/10 text-orange-400' },
    { name: 'Sofia Rossi', id: 'PID-50332', risk: 'Critical', checkin: '2024-07-15', status: 'Critical', statusColor: 'text-red-500', riskBg: 'bg-red-500/20 text-red-500 ring-1 ring-inset ring-red-500/30' },
    { name: 'Kenji Tanaka', id: 'PID-23456', risk: 'High', checkin: '2024-07-14', status: 'At Risk', statusColor: 'text-yellow-400', riskBg: 'bg-red-500/10 text-red-400' },
    { name: 'Isla Campbell', id: 'PID-45678', risk: 'Low', checkin: '2024-07-11', status: 'Stable', statusColor: 'text-[#00c3ff]', riskBg: 'bg-[#7000FF]/10 text-[#7000FF]' },
    { name: 'Alisha ViewController', id: 'PID-78564', risk: 'Critical', checkin: '2024-07-16', status: 'Critical', statusColor: 'text-red-500', riskBg: 'bg-red-500/20 text-red-500 ring-1 ring-inset ring-red-500/30' },
  ];

  return (
    <div className="flex flex-col gap-6 font-sans max-w-7xl mx-auto w-full">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-white text-4xl font-black leading-tight tracking-tight">All Patients</h1>
        <button className="flex items-center justify-center gap-2 rounded-md h-10 px-5 bg-bond-blue text-black text-sm font-bold shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:bg-bond-blue/90 transition-colors">
          <span className="material-symbols-outlined text-lg">add</span>
          <span className="truncate">Add New Patient</span>
        </button>
      </div>

      <div className="frosted-glass rounded-md p-4 flex flex-wrap items-center gap-4">
        <div className="flex-grow min-w-[250px] relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input 
                className="w-full bg-black/20 border-none rounded-md py-2.5 pl-10 pr-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-bond-blue"
                placeholder="Search by name or ID..."
            />
        </div>
        <div className="flex gap-3">
             {['Status: All', 'Risk Level: All'].map(f => (
                 <button key={f} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md bg-black/20 pl-4 pr-2 hover:bg-black/40 transition-colors text-gray-200 text-sm font-medium">
                    {f} <span className="material-symbols-outlined text-base">expand_more</span>
                 </button>
             ))}
        </div>
      </div>

      <div className="frosted-glass overflow-hidden rounded-md border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/20">
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-gray-300 text-xs font-bold uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-4 text-gray-300 text-xs font-bold uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-4 text-gray-300 text-xs font-bold uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-4 text-gray-300 text-xs font-bold uppercase tracking-wider hidden sm:table-cell">Last Check-in</th>
                <th className="px-6 py-4 text-gray-300 text-xs font-bold uppercase tracking-wider hidden md:table-cell">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {patients.map((patient, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-white text-sm font-medium">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm font-mono">{patient.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${patient.riskBg}`}>
                      {patient.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm font-mono hidden sm:table-cell">{patient.checkin}</td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full bg-current ${patient.statusColor}`}></div>
                      <span className={`text-sm ${patient.statusColor}`}>{patient.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/patient/${patient.id}`} className="text-bond-blue hover:text-white transition-colors">View Details</Link>
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

export default AllPatients;