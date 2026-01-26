import React from 'react';
import NavItem from './NavItem';

const NavGroup = ({ group, onItemClick }) => {
  return (
    <div>
      <h2 className="px-3 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
        {group.label}
      </h2>
      <div className="space-y-0.5">
        {group.items.map((item) => (
          <NavItem
            key={item.path || item.action}
            item={item}
            onClick={() => onItemClick?.(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(NavGroup);