import React from 'react';

interface NavLinkProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export function NavLink({ children, active = false, className = '' }: NavLinkProps) {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-colors
        ${active 
          ? 'text-gray-900' 
          : 'text-gray-500 hover:text-gray-900'
        } ${className}`}
    >
      {children}
    </button>
  );
}