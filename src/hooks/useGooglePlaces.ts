import { useState, useEffect } from 'react';

export interface GoogleReview {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    text: string;
    relative_time_description: string;
    author_url: string;
}

export interface PlaceInfo {
    reviews: GoogleReview[];
    rating: number;
    user_ratings_total: number;
    url: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

// Waits for window.google to be injected by the Maps SDK script tag
function waitForGoogle(timeout = 10000): Promise<void> {
    return new Promise((resolve, reject) => {
        if ((window as any).google?.maps?.places) {
            resolve();
            return;
        }
        const start = Date.now();
        const interval = setInterval(() => {
            if ((window as any).google?.maps?.places) {
                clearInterval(interval);
                resolve();
            } else if (Date.now() - start > timeout) {
                clearInterval(interval);
                reject(new Error('Google Maps SDK timed out'));
            }
        }, 100);
    });
}

export function useGooglePlaces(placeId: string | undefined) {
    const [placeInfo, setPlaceInfo] = useState<PlaceInfo | null>(null);
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!placeId) return;

        let cancelled = false;
        setStatus('loading');

        waitForGoogle()
            .then(() => {
                if (cancelled) return;

                // PlacesService requires a DOM element or map instance
                const stub = document.createElement('div');
                const service = new (window as any).google.maps.places.PlacesService(stub);

                service.getDetails(
                    {
                        placeId,
                        fields: ['reviews', 'rating', 'user_ratings_total', 'url'],
                    },
                    (place: any, status: string) => {
                        if (cancelled) return;

                        const OK = (window as any).google.maps.places.PlacesServiceStatus.OK;
                        if (status === OK && place) {
                            setPlaceInfo({
                                reviews: place.reviews ?? [],
                                rating: place.rating ?? 0,
                                user_ratings_total: place.user_ratings_total ?? 0,
                                url: place.url ?? '',
                            });
                            setStatus('success');
                        } else {
                            setError(`Places API status: ${status}`);
                            setStatus('error');
                        }
                    }
                );
            })
            .catch((err: Error) => {
                if (!cancelled) {
                    setError(err.message);
                    setStatus('error');
                }
            });

        return () => {
            cancelled = true;
        };
    }, [placeId]);

    return { placeInfo, status, error };
}
