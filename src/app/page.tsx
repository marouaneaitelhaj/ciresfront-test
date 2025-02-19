"use client";


import { getImageByOffset } from '@/API/unspalsh';
import { Button } from '@/components/Button';
import { FilterBar } from '@/components/FilterBar';
import { GalleryItem } from '@/components/GalleryItem';
import React, { useEffect, useState } from 'react';

type GalleryItem = {
  id: string;
  image: string;
  alt_description: string;
  description: string;
  data: Array<{ id: string; likedBy: string[] }>;
  username?: string;
};

const ITEMS_PER_PAGE = 8;
const TOTAL_ITEMS = 24; // Total items to cache

function App() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [cachedItems, setCachedItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchAndCacheItems = async () => {
    try {
      setLoading(true);
      
      // Check if we have enough cached items
      if (cachedItems.length < TOTAL_ITEMS) {
        const remainingItems = TOTAL_ITEMS - cachedItems.length;
        const batchSize = Math.min(remainingItems, ITEMS_PER_PAGE);
        
        const promises = Array.from(
          { length: batchSize }, 
          (_, i) => getImageByOffset(cachedItems.length + i)
        );
        
        const responses = await Promise.all(promises);
        
        const newItems: GalleryItem[] = responses.flatMap(_response => {
          // loop through the _response and return the data
          return _response.data.map((response: {
            id: string;
            urls: { regular: string };
            alt_description: string;
            description: string;
            user: { username: string };
            likes: number;
          }) => ({
            id: response.id,
            image: response.urls.regular,
            alt_description: response.alt_description || 'Gallery image',
            description: response.description || '',
            username: response.user.username,
            data: [{
              id: response.id,
              likedBy: Array.from({ length: response.likes || 0 }, (_, i) => `user${i + 1}`)
            }]
          }));
        });

        const updatedCache = [...cachedItems, ...newItems];
        setCachedItems(updatedCache);
        
        // Store in localStorage
        localStorage.setItem('galleryCache', JSON.stringify(updatedCache));
      }
    } catch (err) {
      setError('Failed to load gallery items. Please try again later.');
      console.error('Error fetching gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load cached items from localStorage on initial mount
  useEffect(() => {
    const cached = localStorage.getItem('galleryCache');
    if (cached) {
      const parsedCache = JSON.parse(cached);
      setCachedItems(parsedCache);
    }
    fetchAndCacheItems();
  }, []);

  // Update displayed items when page or cache changes
  useEffect(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setGalleryItems(cachedItems.slice(startIndex, endIndex));
  }, [page, cachedItems]);

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      <FilterBar />
      
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="text-red-600 text-center mb-4 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        )}
        
        {loading && galleryItems.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg aspect-w-16 aspect-h-12" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <GalleryItem key={item.id} {...item} />
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center items-center gap-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant={page === index + 1 ? 'primary' : 'secondary'}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;