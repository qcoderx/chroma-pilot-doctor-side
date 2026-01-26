import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ item, onClick, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(item.path);
  const Icon = item.icon;

  if (item.action) {
    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2.5'} text-sm font-medium transition-all duration-150 rounded-lg ${
          item.action === 'logout'
            ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`}
        title={isCollapsed ? item.label : undefined}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        {!isCollapsed && <span>{item.label}</span>}
      </button>
    );
  }

  return (
    <Link
      to={item.path}
      className={`relative flex items-center ${isCollapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2.5'} text-sm font-medium transition-all duration-150 rounded-lg group ${
        isActive
          ? 'text-blue-600 bg-blue-50 shadow-sm'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
      }`}
      aria-current={isActive ? 'page' : undefined}
      title={isCollapsed ? item.label : undefined}
    >
      {isActive && !isCollapsed && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-600 rounded-r" />
      )}
      {isActive && isCollapsed && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r" />
      )}
      <Icon className="w-4 h-4 flex-shrink-0" />
      {!isCollapsed && <span>{item.label}</span>}
    </Link>
  );
};

export default React.memo(NavItem);