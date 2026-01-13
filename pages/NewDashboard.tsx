import React from 'react';

const NewDashboard: React.FC = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light font-display antialiased text-text-main-light">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border-light bg-surface-light px-6 py-3 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined text-3xl">genetics</span>
              <h2 className="text-text-main-light text-xl font-bold leading-tight tracking-tight">Chroma-Pilot</h2>
            </div>
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              <a className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg transition-colors" href="#">Dashboard</a>
              <a className="px-4 py-2 text-sm font-medium text-text-sub-light hover:text-primary hover:bg-slate-50 rounded-lg transition-colors" href="#">Patients</a>
              <a className="px-4 py-2 text-sm font-medium text-text-sub-light hover:text-primary hover:bg-slate-50 rounded-lg transition-colors" href="#">Add Patient</a>
              <a className="px-4 py-2 text-sm font-medium text-text-sub-light hover:text-primary hover:bg-slate-50 rounded-lg transition-colors" href="#">Analytics</a>
            </nav>
          </div>
          {/* Right Side: Search & User */}
          <div className="flex flex-1 justify-end items-center gap-4">
            <label className="hidden sm:flex relative w-full max-w-xs group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="material-symbols-outlined text-text-sub-light text-xl">search</span>
              </div>
              <input className="block w-full rounded-lg border border-border-light bg-background-light py-2.5 pl-10 pr-3 text-sm text-text-main-light placeholder:text-text-sub-light focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Search Patients..." type="text"/>
            </label>
            <div className="flex items-center gap-3 border-l border-border-light pl-4 ml-2">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-text-main-light">Dr. Ade</p>
                  <p className="text-xs text-text-sub-light">Genomic Specialist</p>
                </div>
                <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary/20" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpnq-XM1wScHHCoOCrwcwP5YutuKzKH0pmyeZ65vW-IPROyMTjPo2eI3MXtdOddkTwQpZNSmEwXRrI1TvvDz8vysrB95JDlt6B6pZRFg9Xw3yLjWAzKFvNo8UTqGVZeFUkA-aMMNCwEaTaGzgWLhMdRAacQcgPkx9Pkg4t8iPz9rKUgdW7wIMZhtf9n7g89XJE2sIAK9FtrfQzK5dWGx50qIcWopQWCohujmO1AwSgKysY9uzcWN3RtkT0_1wW8oXx22b6GXpcI9Y")'}}></div>
                <span className="material-symbols-outlined text-text-sub-light">arrow_drop_down</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-text-main-light">Dashboard Overview</h1>
            <p className="text-text-sub-light">Welcome back, Dr. Ade. Here is today's summary of patient genomics.</p>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stat Card 1 */}
          <div className="bg-surface-light rounded-xl p-6 border border-border-light shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-sub-light font-medium">Active Patients</p>
              <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">groups</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-text-main-light">1,248</p>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span> +12%
              </span>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-surface-light rounded-xl p-6 border border-border-light shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-sub-light font-medium">High Risk Alerts</p>
              <div className="size-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <span className="material-symbols-outlined text-xl">notification_important</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-text-main-light">14</p>
              <span className="inline-flex items-center text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span> +2%
              </span>
            </div>
            <p className="text-xs text-text-sub-light mt-2">Requires immediate attention</p>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-surface-light rounded-xl p-6 border border-border-light shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-sub-light font-medium">Genomes Processed</p>
              <div className="size-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <span className="material-symbols-outlined text-xl">biotech</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-text-main-light">89</p>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span> +5%
              </span>
            </div>
            <p className="text-xs text-text-sub-light mt-2">Processed this month</p>
          </div>
        </div>

        {/* Dashboard Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Patients Table */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-text-main-light">Recent Patients</h3>
              <a className="text-sm font-medium text-primary hover:text-blue-700" href="#">View All</a>
            </div>
            <div className="overflow-hidden rounded-xl border border-border-light bg-surface-light shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border-light bg-background-light">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-text-main-light" scope="col">Patient</th>
                      <th className="px-6 py-4 font-semibold text-text-main-light" scope="col">ID</th>
                      <th className="px-6 py-4 font-semibold text-text-main-light" scope="col">Condition</th>
                      <th className="px-6 py-4 font-semibold text-text-main-light" scope="col">Risk Level</th>
                      <th className="px-6 py-4 font-semibold text-text-main-light text-right" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-text-main-light">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">AO</div>
                          <span>Adebayo Ogundimu</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-text-sub-light">CH-4922</td>
                      <td className="px-6 py-4 text-text-sub-light">BRCA1 Pathogenic Variant</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Critical</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-text-sub-light hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-text-main-light">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">CN</div>
                          <span>Chioma Nwankwo</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-text-sub-light">CH-3321</td>
                      <td className="px-6 py-4 text-text-sub-light">Long QT Syndrome Type 2</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Moderate</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-text-sub-light hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-text-main-light">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">EO</div>
                          <span>Emeka Okoro</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-text-sub-light">CH-5829</td>
                      <td className="px-6 py-4 text-text-sub-light">CYP2C9 Poor Metabolizer</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Stable</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-text-sub-light hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-text-main-light">Recent Clinical Alerts</h3>
            <div className="flex flex-col gap-3">
              {/* Alert Item 1 */}
              <div className="rounded-xl border border-border-light bg-surface-light p-4 shadow-sm relative overflow-hidden group hover:border-red-200 transition-colors cursor-pointer">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                <div className="flex gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-text-main-light line-clamp-1">BRCA1 c.5266dupC Pathogenic Variant</p>
                    <p className="text-sm text-text-sub-light line-clamp-1">Adebayo Ogundimu</p>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="font-medium text-red-600">Hereditary Cancer Risk</span>
                      <span className="text-text-sub-light">• 10 mins ago</span>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center">
                    <span className="material-symbols-outlined text-text-sub-light group-hover:text-primary transition-colors">chevron_right</span>
                  </div>
                </div>
              </div>

              {/* Alert Item 2 */}
              <div className="rounded-xl border border-border-light bg-surface-light p-4 shadow-sm relative overflow-hidden group hover:border-yellow-200 transition-colors cursor-pointer">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
                <div className="flex gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                    <span className="material-symbols-outlined">medication</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-text-main-light line-clamp-1">Drug-Gene Interaction: Warfarin</p>
                    <p className="text-sm text-text-sub-light line-clamp-1">Emeka Okoro</p>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="font-medium text-yellow-600">Pharmacogenomics</span>
                      <span className="text-text-sub-light">• 25 mins ago</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert Item 3 */}
              <div className="rounded-xl border border-border-light bg-surface-light p-4 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors cursor-pointer">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                <div className="flex gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <span className="material-symbols-outlined">biotech</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-text-main-light line-clamp-1">Genome Sequencing Complete</p>
                    <p className="text-sm text-text-sub-light line-clamp-1">Funmi Okafor</p>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="font-medium text-blue-600">Laboratory</span>
                      <span className="text-text-sub-light">• 3 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full mt-2 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg border border-transparent hover:border-primary/20 transition-all flex items-center justify-center gap-2">
              View All Alerts
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewDashboard;