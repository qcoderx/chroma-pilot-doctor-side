import React from 'react';
import { useNavigate } from 'react-router-dom';
import { navConfig, footerActions } from '../../config/navConfig';
import { useLogout } from '../../api/useAuth';
import NavGroup from './NavGroup';
import NavItem from './NavItem';

const SideNav = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const [isFooterOpen, setIsFooterOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleItemClick = (item) => {
    if (item.action === 'logout') {
      logout();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-[280px]'} bg-white border-r border-slate-200 flex flex-col h-full transition-all duration-200 ease-out shadow-sm`}>
      {/* Header */}
      <div className="px-5 py-5 relative border-b border-slate-100">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-md transition-colors duration-150"
        >
          <svg className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {!isCollapsed && (
          <div className="pr-8">
            <div className="flex items-center gap-3 mb-1">
              <img
                src="/src/images/chromapilotlogo.png"
                alt="Chroma-Pilot Logo"
                className="h-12 w-auto object-contain"
                draggable={false}
              />
            </div>
            <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              Precision Medicine Console
            </p>
          </div>
        )}
        
        {isCollapsed && (
          <div className="flex justify-center pt-1">
            <img
              src="/src/images/chromapilotlogo.png"
              alt="Chroma-Pilot Logo"
              className="h-6 w-auto object-contain"
              draggable={false}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {navConfig.map((group, groupIndex) => (
          <div key={group.label}>
            {groupIndex > 0 && <div className="border-t border-slate-100 -mx-4 mb-6" />}
            
            {!isCollapsed && (
              <h2 className="px-3 mb-3 text-sm font-semibold text-slate-600 tracking-wide">
                {group.label}
              </h2>
            )}
            
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavItem
                  key={item.path || item.action}
                  item={item}
                  onClick={() => handleItemClick(item)}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-slate-100 bg-white">
        <div className="p-4">
          {!isCollapsed && (
            <>
              <div className="mb-3 cursor-pointer hover:bg-slate-50 p-3 rounded-lg transition-colors duration-150 flex items-center justify-between" onClick={() => setIsFooterOpen(!isFooterOpen)}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                    DA
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Dr. Ade</p>
                    <p className="text-xs text-slate-500">Genomic Specialist</p>
                  </div>
                </div>
                <svg className={`w-4 h-4 text-slate-400 transition-transform duration-150 ${isFooterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {isFooterOpen && (
                <div className="space-y-1 pl-2">
                  {footerActions.map((action) => (
                    <div key={action.label} className="block">
                      <NavItem
                        item={{
                          ...action,
                          label: action.label
                        }}
                        onClick={() => handleItemClick(action)}
                        isCollapsed={false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          
          {isCollapsed && (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600 cursor-pointer hover:bg-blue-200 transition-colors duration-150"
                   title="Dr. Ade - Genomic Specialist">
                DA
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default React.memo(SideNav);