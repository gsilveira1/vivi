import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ hover = false, className = '', children, ...props }) => (
  <div
    className={`bg-white rounded-2xl shadow-lg ${hover ? 'hover:shadow-xl transition-all transform hover:-translate-y-1' : ''} ${className}`}
    {...props}
  >
    {children}
  </div>
);
