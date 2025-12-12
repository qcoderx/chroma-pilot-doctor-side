import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'dashboard' },
    { name: 'Red Zone', path: '/red-zone', icon: 'dangerous' },
    { name: 'Patients', path: '/patients', icon: 'groups' },
    { name: 'Analytics', path: '/analytics', icon: 'pie_chart' },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#0B0A12] text-white font-sans overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col justify-between border-r border-white/10 bg-black/20 p-4 backdrop-blur-md h-screen sticky top-0">
        <div className="flex flex-col gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3 px-3 py-2">
             <div className="size-8 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
                </svg>
              </div>
            <h2 className="text-lg font-bold uppercase tracking-widest font-display">Chroma-Pilot</h2>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary/20 text-white border border-primary/50'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <p className="text-sm font-medium">{item.name}</p>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Footer */}
        <div className="flex flex-col gap-4">
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center gap-3">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white/10"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhqtpgq7CbUjghK-LgNJGMtl3ynQuEWZnK4ip80yrmBKY2_JgIigKMKcVMHqPSQv2dLRLOqyRK_2NzdWNO88GuZ5zcyr954aAb6w7HaQudQFKtFf1LR_2g0ic87RMUNXDzG6iDNFOsvZ7Ms-kBEc6rpA1SWZvF9IVc-mXplATA9irIEQbqFpwowgsnQACLk45ZP9ow67UQnmC3j-mecBM_REQLRMC_A9TwhAvKxJ0rZEZdov4GwnhY0YwarFO2FO8jDOFTLY_K4QU")' }}
              />
              <div className="flex flex-col">
                <p className="text-white text-sm font-bold">Dr. Anya Sharma</p>
                <p className="text-gray-400 text-xs">Cardiologist</p>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <p className="text-sm font-medium">Logout</p>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-[#0B0A12] border-b border-white/10 z-50">
           <div className="flex items-center gap-2">
             <div className="size-6 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
                </svg>
              </div>
             <span className="font-display font-bold">Chroma-Pilot</span>
           </div>
           {/* Mobile Menu Placeholder - In a real app, this would toggle a mobile menu */}
           <span className="material-symbols-outlined">menu</span>
        </header>
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8">
           <Outlet />
           {/* Mobile Bottom Nav */}
           <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B0A12]/90 backdrop-blur-lg border-t border-white/10 p-2 flex justify-around z-50">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center p-2 rounded-lg ${
                    isActive ? 'text-primary' : 'text-gray-400'
                  }`
                }
              >
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </NavLink>
            ))}
           </nav>
           <div className="h-16 md:hidden"></div> {/* Spacer for bottom nav */}
        </main>
      </div>
    </div>
  );
};

export default Layout;