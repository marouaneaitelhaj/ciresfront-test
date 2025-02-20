"use client";

import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import { TGalleryItem } from '@/lib/types';

export function GalleryItem({ 
  image, 
  id, 
  alt_description, 
  description, 
  data, 
  username 
}: TGalleryItem) {
  const initialLikes = data.find(item => item.id === id)?.likedBy.length || 0;
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(initialLikes);
  // const db = new Level<string, any>("my-database", {valueEncoding: "json"});
  const views = Math.floor(Math.random() * 50) + 10; // Simulated views in thousands

  const onLike = async () => {
  };

  return (
    <div className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Save button */}
      <button className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
        <Bookmark className="w-4 h-4 text-gray-700" />
      </button>

      {/* Image container */}
      <div className="aspect-w-16 aspect-h-12 relative">
        <img
          src={image}
          alt={alt_description}
          className="w-full h-[250px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/60" />
      </div>
      
      {/* Content overlay */}
      <div className="p-3">
        {/* User info and stats */}
        <div className="flex items-center justify-between text-black">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-medium">
              {username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-tight">
                {username || 'Anonymous'}
              </span>
              <span className="text-xs text-black/80">
                {description.slice(0, 20)}{description.length > 20 ? '...' : ''}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-black/90">
            <button onClick={onLike} className="flex items-center text-sm">
              <Heart className={`w-4 h-4 mr-1 ${liked ? 'text-red-500' : ''}`} />
              {likes}
            </button>
            <span className="flex items-center text-sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              {views}k
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}