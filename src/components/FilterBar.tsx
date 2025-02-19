import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { NavLink } from './NavLink';

const categories = [
  'All',
  'Animation',
  'Branding',
  'Illustration',
  'Mobile',
  'Print',
  'Product Design',
  'Typography',
  'Web Design',
];

export function FilterBar() {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <select className="text-sm font-medium text-gray-900 bg-transparent">
              <option>Popular</option>
              <option>Recent</option>
              <option>Following</option>
            </select>
          </div>

          <div className="flex-1 flex items-center justify-center px-8 overflow-x-auto hide-scrollbar">
            <nav className="flex space-x-1">
              {categories.map((category, index) => (
                <NavLink key={category} active={index === 0}>
                  {category}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}