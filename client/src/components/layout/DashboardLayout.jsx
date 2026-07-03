import React from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-background-start">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        <TopNavbar />
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
