import React from 'react';
import { PublicHeader } from '../organisms/PublicHeader';
import { PublicFooter } from '../organisms/PublicFooter';
import { SelectedPlan } from '../../App';

interface PublicPageLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string, plan?: SelectedPlan) => void;
}

export const PublicPageLayout: React.FC<PublicPageLayoutProps> = ({ children, currentPage, onNavigate }) => (
  <div className="min-h-screen bg-white">
    <PublicHeader currentPage={currentPage} onNavigate={onNavigate} />
    <main>{children}</main>
    <PublicFooter />
  </div>
);
