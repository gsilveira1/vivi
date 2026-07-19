import React from 'react';

interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, centered = true }) => (
  <div className={centered ? 'text-center mb-12' : 'mb-8'}>
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
    {subtitle && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
  </div>
);
