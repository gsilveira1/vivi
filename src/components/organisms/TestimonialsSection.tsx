import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useGooglePlaces } from '../../hooks/useGooglePlaces';
import { TestimonialCard, StarRating } from '../molecules/TestimonialCard';

const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID as string | undefined;

/* ---------- mock fallback ---------- */
const mockTestimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    text: 'Em 6 meses com a Viviana, perdi 15kg e ganhei muito mais força e autoestima. O acompanhamento é incrível!',
    time: 'há 2 meses',
  },
  {
    id: 2,
    name: 'Ana Costa',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    text: 'A consultoria online da Vivi mudou minha vida. Mesmo à distância, sinto que tenho todo o suporte necessário.',
    time: 'há 3 meses',
  },
  {
    id: 3,
    name: 'Carla Mendes',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    text: 'Após os 40, achei que seria impossível ter resultados. A Viviana provou que eu estava errada!',
    time: 'há 5 meses',
  },
];

/* ---------- sub-components ---------- */

function SkeletonCard() {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-14 h-14 rounded-full bg-gray-200 mr-4 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-4/6" />
      </div>
    </div>
  );
}

/* ---------- main component ---------- */

export const TestimonialsSection: React.FC = () => {
  const { placeInfo, status } = useGooglePlaces(PLACE_ID);

  const isLoading = status === 'loading' || status === 'idle';
  const hasRealReviews = status === 'success' && placeInfo && placeInfo.reviews.length > 0;

  // Build display list
  const displayReviews = hasRealReviews
    ? placeInfo!.reviews
      .filter((r) => r.text && r.text.trim().length > 20) // skip very short reviews
      .slice(0, 5)
      .map((r, i) => ({
        id: i,
        name: r.author_name,
        image: r.profile_photo_url,
        rating: r.rating,
        text: r.text,
        time: r.relative_time_description,
        profileUrl: r.author_url,
      }))
    : mockTestimonials.map((t) => ({ ...t, profileUrl: undefined }));

  const overallRating = hasRealReviews ? placeInfo!.rating : 4.9;
  const totalRatings = hasRealReviews ? placeInfo!.user_ratings_total : 200;
  const mapsUrl = hasRealReviews ? placeInfo!.url : `https://search.google.com/local/reviews?placeid=${PLACE_ID}`;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            TRANSFORMAÇÕES REAIS, <span className="text-pink-600">HISTÓRIAS INSPIRADORAS</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            DESCUBRA COMO O MÉTODO VIVI TRANSFORMAÇÃO TEM AJUDADO MULHERES A
            RESGATAR SUA AUTOCONFIANÇA, SUPERAR DESAFIOS E CRIAR VERSÕES MAIS
            AUTÊNTICAS E PODEROSAS DE SI MESMAS
          </p>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : displayReviews.map((r) => (
              <TestimonialCard
                key={r.id}
                name={r.name}
                image={r.image}
                rating={r.rating}
                text={r.text}
                time={r.time}
                profileUrl={r.profileUrl}
              />
            ))}
        </div>

        {/* Rating badge */}
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-yellow-300 text-gray-800 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all group"
          >
            {/* Google "G" logo */}
            <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="font-semibold">{overallRating.toFixed(1)}</span>
            <StarRating rating={Math.round(overallRating)} size="sm" />
            <span className="text-gray-500 text-sm">
              {totalRatings.toLocaleString('pt-BR')} avaliações no Google
            </span>
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
          </a>

          {hasRealReviews && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
              Avaliações ao vivo do Google
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
