import React, { useState, useEffect } from 'react';

interface ImageSliderProps {
  images: string[];
}

const Slider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(index => 
        index === images.length - 1 ? 0 : index + 1  
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="image-slider">
      <img 
        src={images[currentImageIndex]}
        style={{
          opacity: 0,
          transition: 'opacity 0.5s'
        }}  
        onLoad={e => {
          const target = e.target as HTMLImageElement;
          target.style.opacity = '1';
        }}
      />
    </div>
  );
}

export default Slider;