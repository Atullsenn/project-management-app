// import React from 'react';

// export const Header: React.FC = () => {
//   return (
//     <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
//       <div className="text-xl font-semibold">Dashboard</div>
//       <div>
//         <button className="text-gray-600 hover:text-gray-800">Profile</button>
//       </div>
//     </header>
//   );
// };


// src/components/Header.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, HomeIcon } from '@heroicons/react/24/outline';


interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Dashboard'
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="w-full bg-white shadow px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div className="flex items-center space-x-3">
        <button
          onClick={handleBack}
          className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      {/* {breadcrumb.length > 0 && (
        <nav className="mt-3 sm:mt-0 text-sm text-gray-500 space-x-2">
          <HomeIcon className="w-4 h-4 inline-block mb-0.5" />
          {breadcrumb.map((crumb, idx) => (
            <span key={idx}>
              {' / '}
              <span className="hover:text-gray-700 cursor-pointer">{crumb}</span>
            </span>
          ))}
        </nav>
      )} */}
    </header>
  );
};
