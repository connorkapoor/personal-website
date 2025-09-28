'use client';

import { useState } from 'react';
import Globe from '../components/Globe';

export default function Home() {
  const [isGlobeMinimized, setIsGlobeMinimized] = useState(false);

  const handleSatelliteClick = () => {
    setIsGlobeMinimized(true);
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Globe 
        isMinimized={isGlobeMinimized} 
        onSatelliteClick={handleSatelliteClick}
      />
    </div>
  );
}
