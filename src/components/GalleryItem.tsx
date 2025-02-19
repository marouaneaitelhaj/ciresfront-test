import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

type PostProps = {
  image: string;
  id: string;
  alt_description: string;
  description: string;
  data: Array<{ id: string; likedBy: string[] }>;
  username?: string;
};

export function GalleryItem({ 
  image, 
  id, 
  alt_description, 
  description, 
  data, 
  username 
}: PostProps) {
  const likes = data.find(item => item.id === id)?.likedBy.length || 0;

  return (
    <div className="group relative rounded-lg overflow-hidden bg-white">
      <div className="aspect-w-16 aspect-h-12 relative">
        <img
          src={image}
          alt={alt_description}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {username && (
              <span className="text-sm font-medium text-white">
                {username}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-3 text-white/80">
            <span className="flex items-center text-sm">
              <Heart className="w-4 h-4 mr-1" />
              {likes}
            </span>
            <span className="flex items-center text-sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              {description.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}