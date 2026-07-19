import React from 'react';
import { Check } from 'lucide-react';

interface PlanFeatureItemProps {
  children: React.ReactNode;
  color?: 'pink' | 'blue';
}

export const PlanFeatureItem: React.FC<PlanFeatureItemProps> = ({ children, color = 'pink' }) => (
  <li className="flex items-center">
    <Check className={`h-5 w-5 ${color === 'pink' ? 'text-pink-500' : 'text-blue-500'} mr-3 flex-shrink-0`} />
    {children}
  </li>
);
