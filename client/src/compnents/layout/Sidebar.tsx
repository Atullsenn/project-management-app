import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, FolderIcon, ClipboardIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

const items = [
  { name: 'Dashboard', path: '/', icon: HomeIcon },
  { name: 'Projects', path: '/projects', icon: FolderIcon },
  { name: 'Tasks', path: '/tasks', icon: ClipboardIcon },
  // { name: 'Logout', path: '/logout', icon: ArrowUpOnSquareIcon },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="w-64 h-full bg-gray-900 text-white flex flex-col shadow-lg">
      <div className="px-4 py-6 text-2xl font-bold text-center">
  <span className="text-blue-500 truncate w-full">Project Manager</span>
</div>

      
      <nav className="flex-1 px-2 space-y-4">
        {items.map(item => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 ease-in-out ${active ? 'bg-blue-600' : ''}`}
            >
              <Icon className="h-6 w-6 mr-4" />
              <span className={`font-medium ${active ? 'text-white' : 'text-gray-300'}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 border-t border-gray-600">
        <button onClick={handleLogout} className="flex items-center justify-between space-x-3 hover:bg-red-600 p-3 rounded-lg w-full transition-all duration-300 ease-in-out">
          <ArrowUpOnSquareIcon className="h-6 w-6 text-white" />
          <span className="font-medium text-white">Logout</span>
        </button>
      </div>
    </div>
  );
};