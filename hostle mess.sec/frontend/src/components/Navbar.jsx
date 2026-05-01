import React from 'react';
import { NavLink } from 'react-router-dom';
import { Utensils, Home, List, PieChart } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Utensils size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">HostelMess Miner</span>
          </div>
          
          <div className="flex space-x-1">
            <NavItem to="/" icon={<Home size={18} />} label="Home" />
            <NavItem to="/menu" icon={<List size={18} />} label="Menu" />
            <NavItem to="/analytics" icon={<PieChart size={18} />} label="Analytics 🔥" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          isActive 
            ? 'bg-blue-50 text-blue-700' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
