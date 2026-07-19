import React from 'react';

interface ContactInfoItemProps {
  icon: React.ElementType;
  title: string;
  lines: string[];
  link?: { href: string; label: string };
}

export const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon: Icon, title, lines, link }) => (
  <div className="flex items-start">
    <div className="bg-pink-100 p-3 rounded-lg mr-4">
      <Icon className="h-6 w-6 text-pink-600" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      {lines.map((line, i) => (
        <p key={i} className={i === lines.length - 1 && lines.length > 1 ? 'text-gray-500 text-sm' : 'text-gray-600'}>
          {line}
        </p>
      ))}
      {link && (
        <a href={link.href} className="text-pink-600 hover:text-pink-700 text-sm">
          {link.label}
        </a>
      )}
    </div>
  </div>
);
