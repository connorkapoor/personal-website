'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Satellite {
  id: string;
  label: string;
  href: string;
  angle: number;
  distance: number;
  speed: number;
}

const satellites: Satellite[] = [
  { id: 'about', label: 'About', href: '/about', angle: 0, distance: 120, speed: 0.8 },
  { id: 'work', label: 'Work', href: '/work', angle: 72, distance: 140, speed: 1.2 },
  { id: 'writing', label: 'Writing', href: '/writing', angle: 144, distance: 130, speed: 0.9 },
  { id: 'projects', label: 'Projects', href: '/projects', angle: 216, distance: 150, speed: 1.1 },
  { id: 'contact', label: 'Contact', href: '/contact', angle: 288, distance: 135, speed: 1.0 },
];

const globeAscii = [
  "           ░▓▓▓▓▓▓▓▓▓▓▓░           ",
  "       ░▓▓▓░░░░░░░░░░░░░▓▓▓░       ",
  "     ▓▓▓░░░▓▓▓▓▓▓▓▓▓▓▓░░░▓▓▓     ",
  "   ▓▓▓░░░▓▓▓         ▓▓▓░░░▓▓▓   ",
  "  ▓▓░░░▓▓▓             ▓▓▓░░░▓▓  ",
  " ▓▓░░▓▓▓                 ▓▓▓░░▓▓ ",
  " ▓░░▓▓▓     ◉◉◉◉◉       ▓▓▓░░▓ ",
  "▓▓░▓▓▓       ◉◉◉         ▓▓▓░▓▓",
  "▓░▓▓▓         ◉           ▓▓▓░▓",
  "▓░▓▓▓                     ▓▓▓░▓",
  "▓▓░▓▓▓       ◉◉◉         ▓▓▓░▓▓",
  " ▓░░▓▓▓     ◉◉◉◉◉       ▓▓▓░░▓ ",
  " ▓▓░░▓▓▓                 ▓▓▓░░▓▓ ",
  "  ▓▓░░░▓▓▓             ▓▓▓░░░▓▓  ",
  "   ▓▓▓░░░▓▓▓         ▓▓▓░░░▓▓▓   ",
  "     ▓▓▓░░░▓▓▓▓▓▓▓▓▓▓▓░░░▓▓▓     ",
  "       ░▓▓▓░░░░░░░░░░░░░▓▓▓░       ",
  "           ░▓▓▓▓▓▓▓▓▓▓▓░           "
];

interface GlobeProps {
  isMinimized: boolean;
  onSatelliteClick: () => void;
}

export default function Globe({ isMinimized, onSatelliteClick }: GlobeProps) {
  const [rotation, setRotation] = useState(0);
  const [satellitePositions, setSatellitePositions] = useState(satellites);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = () => {
      setRotation(prev => prev + 0.5);
      setSatellitePositions(prev => 
        prev.map(sat => ({
          ...sat,
          angle: sat.angle + sat.speed
        }))
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const getSatellitePosition = (satellite: Satellite) => {
    const radian = (satellite.angle * Math.PI) / 180;
    const x = Math.cos(radian) * satellite.distance;
    const y = Math.sin(radian) * satellite.distance * 0.6; // Flatten for 3D effect
    return { x, y };
  };

  return (
    <div className={`relative transition-all duration-1000 ease-in-out ${
      isMinimized 
        ? 'fixed bottom-4 right-4 scale-50 z-50' 
        : 'flex items-center justify-center min-h-screen w-full'
    }`}>
      {/* Globe Container */}
      <div className="relative">
        {/* Globe */}
        <div 
          className="font-mono text-slate-600 leading-none select-none"
          style={{ 
            transform: `rotateY(${rotation}deg)`,
            fontSize: isMinimized ? '8px' : '16px',
            transformStyle: 'preserve-3d'
          }}
        >
          {globeAscii.map((line, index) => (
            <div key={index} className="whitespace-pre">
              {line}
            </div>
          ))}
        </div>

        {/* Satellites */}
        {satellitePositions.map((satellite) => {
          const pos = getSatellitePosition(satellite);
          return (
            <Link
              key={satellite.id}
              href={satellite.href}
              onClick={onSatelliteClick}
              className="absolute group"
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Satellite */}
              <div className="relative">
                {/* Satellite Icon */}
                <div className={`${
                  isMinimized ? 'text-xs' : 'text-lg'
                } text-slate-500 hover:text-slate-800 transition-colors duration-200 cursor-pointer`}>
                  ◆
                </div>
                
                {/* Satellite Label */}
                {!isMinimized && (
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-slate-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                      {satellite.label}
                    </div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-800"></div>
                  </div>
                )}
              </div>

              {/* Orbit Trail */}
              {!isMinimized && (
                <div 
                  className="absolute pointer-events-none opacity-20"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `${satellite.distance * 2}px`,
                    height: `${satellite.distance * 1.2}px`,
                    border: '1px dashed currentColor',
                    borderRadius: '50%',
                  }}
                />
              )}
            </Link>
          );
        })}

        {/* Globe Title */}
        {!isMinimized && (
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Connor Kapoor</h1>
            <p className="text-slate-600">Engineer • Maker • Open Source Enthusiast</p>
          </div>
        )}
      </div>

      {/* Expand Button when minimized */}
      {isMinimized && (
        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
          className="absolute -top-2 -left-2 w-6 h-6 bg-slate-800 text-white rounded-full text-xs hover:bg-slate-700 transition-colors duration-200 flex items-center justify-center"
          title="Return to Globe"
        >
          ↗
        </button>
      )}
    </div>
  );
} 