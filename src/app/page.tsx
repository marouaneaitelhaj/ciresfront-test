"use client";

import { getImageByOffset } from '@/API/images';
import { Button } from '@/components/Button';
import { FilterBar } from '@/components/FilterBar';
import { GalleryItem } from '@/components/GalleryItem';
import { TGalleryItem } from '@/lib/types';
import React, { useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 8;
const TOTAL_ITEMS = 30;

function App() {
  const [galleryItems, setGalleryItems] = useState<TGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getImageByOffset()
  }, []);

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
