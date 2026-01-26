import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../navigation/SideNav';
import { DashboardHeader } from '../features/DashboardHeader';

const DoctorLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SideNav />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorLayout;