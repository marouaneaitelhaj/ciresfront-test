import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

interface GalleryItemProps {
  image: string;
  title: string;
  author: {
    name: string;
    avatar: string;
    pro?: boolean;
  };
  stats: {
    likes: number;
    views: number;
  };
}

export function GalleryItem({ image, title, author, stats }: GalleryItemProps) {
  return (
    <div className="group relative rounded-lg overflow-hidden bg-white">
      <div className="aspect-w-16 aspect-h-12 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-6 h-6 rounded-full border border-white/20"
            />
            <span className="text-sm font-medium text-white flex items-center">
              {author.name}
              {author.pro && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-yellow-500 text-black rounded-full">
                  PRO
                </span>
              )}
            </span>
          </div>
          
          <div className="flex items-center space-x-3 text-white/80">
            <span className="flex items-center text-sm">
              <Heart className="w-4 h-4 mr-1" />
              {stats.likes}
            </span>
            <span className="flex items-center text-sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              {stats.views}k
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}