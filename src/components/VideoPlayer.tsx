import React, { useState, useCallback, useEffect } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ thumbnailUrl, videoUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePlay = useCallback(() => {
    console.log('Play button clicked');
    setIsLoading(true);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      console.log('Video is now playing, URL:', videoUrl);
      // Set a timeout to remove loading state
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, videoUrl]);
  
  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-xl bg-black">
      {!isPlaying ? (
        <div className="relative w-full">
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="w-full h-auto object-cover aspect-video" 
            loading="lazy"
          />
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer touch-manipulation"
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={handlePlay}
            onTouchEnd={handlePlay}
            style={{ touchAction: 'manipulation' }}
          >
            <motion.div
              className="flex items-center justify-center h-16 w-16 bg-[#D4AF37] rounded-full touch-manipulation"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ touchAction: 'manipulation' }}
            >
              <Play className="h-8 w-8 text-[#1A2744] ml-1" />
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <div className="relative w-full bg-black" style={{ aspectRatio: '16/9', minHeight: '200px' }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p>Loading video...</p>
              </div>
            </div>
          )}
          <iframe
            className="w-full h-full"
            src={videoUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            onLoad={() => {
              console.log('Iframe loaded successfully');
              setIsLoading(false);
            }}
            onError={() => {
              console.error('Iframe failed to load');
              setIsLoading(false);
            }}
            style={{ 
              border: 'none',
              outline: 'none',
              touchAction: 'manipulation',
              display: 'block'
            }}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;