import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
      type="checkbox"
      id={id}
      className={`h-4 w-4 text-black focus:ring-black border-gray-300 rounded ${className}`}
      {...props}
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
      {label}
      </label>
    </div>
  );
}