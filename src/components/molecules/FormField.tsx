import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, htmlFor, required, children }) => (
  <div>
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-2">
      {label}{required && ' *'}
    </label>
    {children}
  </div>
);
