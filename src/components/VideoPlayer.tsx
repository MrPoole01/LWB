import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ thumbnailUrl, videoUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlay = () => {
    setIsPlaying(true);
  };
  
  return (
    <div className="relative rounded-lg overflow-hidden shadow-xl">
      {!isPlaying ? (
        <div className="relative">
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="w-full h-auto object-cover aspect-video" 
          />
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer"
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={handlePlay}
          >
            <motion.div
              className="flex items-center justify-center h-16 w-16 bg-[#D4AF37] rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="h-8 w-8 text-[#1A2744] ml-1" />
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <div className="relative aspect-video">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={videoUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;