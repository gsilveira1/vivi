import React from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  image: string;
  rating: number;
  text: string;
  time: string;
  profileUrl?: string;
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const cls = size === 'md' ? 'h-5 w-5' : 'h-4 w-4';
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${cls} ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
      ))}
    </div>
  );
}

export { StarRating };

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, image, rating, text, time, profileUrl }) => (
  <div className="bg-gray-50 rounded-2xl p-6 relative flex flex-col">
    <Quote className="absolute top-4 right-4 h-8 w-8 text-pink-200 flex-shrink-0" />
    <div className="flex items-center mb-4">
      <img
        src={image}
        alt={name}
        className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-pink-100"
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fce7f3&color=be185d&size=56`;
        }}
      />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-gray-900 truncate">{name}</h4>
          {profileUrl && (
            <a href={profileUrl} target="_blank" rel="noopener noreferrer" aria-label="Ver perfil no Google" className="text-gray-400 hover:text-pink-500 transition-colors flex-shrink-0">
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
        <StarRating rating={rating} />
        <p className="text-xs text-gray-400 mt-0.5">{time}</p>
      </div>
    </div>
    <p className="text-gray-700 italic flex-1">"{text}"</p>
  </div>
);
