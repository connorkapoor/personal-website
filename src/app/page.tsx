'use client';

import { useState } from 'react';
import Earth3D from '../components/Earth3D';

export default function Home() {
  const [isEarthMinimized, setIsEarthMinimized] = useState(false);

  const handleSatelliteClick = () => {
    setIsEarthMinimized(true);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Earth3D 
        isMinimized={isEarthMinimized} 
        onSatelliteClick={handleSatelliteClick}
      />
    </div>
  );
}
