import React from 'react';
import { Sidebar } from './Sidebar';


interface LayoutWrapperProps {
  children: React.ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-gray-100">
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};


