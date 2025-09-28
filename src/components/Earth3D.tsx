'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import Link from 'next/link';

interface Satellite {
  id: string;
  label: string;
  href: string;
  angle: number;
  radius: number;
  height: number;
  speed: number;
  color: string;
}

const satellites: Satellite[] = [
  { id: 'about', label: 'ABOUT', href: '/about', angle: 0, radius: 4.8, height: 0.5, speed: 0.12, color: '#00d4ff' },
  { id: 'work', label: 'WORK', href: '/work', angle: 72, radius: 5.5, height: -0.3, speed: 0.08, color: '#00ff88' },
  { id: 'writing', label: 'WRITING', href: '/writing', angle: 144, radius: 4.2, height: 0.8, speed: 0.15, color: '#ff6b35' },
  { id: 'projects', label: 'PROJECTS', href: '/projects', angle: 216, radius: 5.8, height: 0.1, speed: 0.09, color: '#ffbe0b' },
  { id: 'contact', label: 'CONTACT', href: '/contact', angle: 288, radius: 4.5, height: -0.6, speed: 0.14, color: '#fb5607' },
];

function EarthSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);
  const [normalTexture, setNormalTexture] = useState<THREE.Texture | null>(null);
  
  console.log('EarthSphere render - earthTexture:', earthTexture);
  
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    
    // Try multiple high-quality NASA Earth texture sources with topography
    const earthImageUrls = [
      // NASA Blue Marble with Topography - Ultra high resolution
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg',
      // NASA Visible Earth - Natural Color with Shaded Relief
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57752/land_shallow_topo_2048.jpg',
      // NASA Blue Marble Next Generation
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74393/world.200407.3x5400x2700.jpg',
      // High-res topographic Earth
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/147000/147190/eo_base_2020_clean_3600x1800.png',
      // Three.js example Earth texture (reliable fallback)
      'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',
      // Another reliable source
      'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
    ];
    
    let currentUrlIndex = 0;
    
    const loadNormalMap = () => {
      // Load Earth normal/bump map for topographic relief
      const normalMapUrls = [
        'https://threejs.org/examples/textures/planets/earth_normal_2048.jpg',
        'https://unpkg.com/three-globe/example/img/earth-topology.png'
      ];
      
      loader.load(
        normalMapUrls[0],
        (texture) => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.flipY = true;
          texture.needsUpdate = true;
          setNormalTexture(texture);
          console.log('✅ Successfully loaded Earth normal map for topography');
        },
        undefined,
        (error) => {
          console.warn('❌ Failed to load normal map:', error);
          // Try fallback or create procedural normal map
          createProceduralNormalMap();
        }
      );
    };
    
    const createProceduralNormalMap = () => {
      // Create a simple procedural normal map for basic relief
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      
      // Create noise-based height map for normal generation
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const index = (y * canvas.width + x) * 4;
          
          // Generate height based on noise
          const height = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.5 + 0.5;
          const normalizedHeight = Math.floor(height * 255);
          
          // Convert height to normal map (simplified)
          data[index] = normalizedHeight;     // R
          data[index + 1] = normalizedHeight; // G  
          data[index + 2] = 255;              // B (up direction)
          data[index + 3] = 255;              // A
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.flipY = true;
      texture.needsUpdate = true;
      setNormalTexture(texture);
      console.log('🏔️ Created procedural normal map for topography');
    };
    
    const tryLoadTexture = () => {
      if (currentUrlIndex >= earthImageUrls.length) {
        console.log('All external textures failed, creating fallback texture');
        createFallbackTexture();
        return;
      }
      
      const currentUrl = earthImageUrls[currentUrlIndex];
      console.log(`Attempting to load Earth texture from: ${currentUrl}`);
      
      loader.load(
        currentUrl,
        (texture) => {
          // Success - apply the real Earth texture
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.flipY = true; // Fix upside-down issue
          texture.needsUpdate = true;
          setEarthTexture(texture);
          console.log(`✅ Successfully loaded real Earth texture from: ${currentUrl}`);
          
          // Load normal map for topographic relief
          loadNormalMap();
        },
        (progress) => {
          console.log(`Loading Earth texture: ${(progress.loaded / progress.total * 100).toFixed(1)}%`);
        },
        (error) => {
          console.warn(`❌ Failed to load texture from ${currentUrl}:`, error);
          currentUrlIndex++;
          tryLoadTexture(); // Try next URL
        }
      );
    };
    
    const createFallbackTexture = () => {
      // Create high-quality procedural Earth as final fallback
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;
      
      // Create realistic Earth-like texture
      ctx.fillStyle = '#1a4f8a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // North America
      ctx.fillStyle = '#2d5016';
      ctx.fillRect(240, 280, 360, 240);
      ctx.fillRect(160, 340, 200, 160);
      ctx.fillRect(320, 220, 240, 100);
      
      // South America
      ctx.fillStyle = '#3a6b1f';
      ctx.fillRect(520, 620, 180, 360);
      ctx.fillRect(560, 720, 100, 240);
      
      // Europe and Africa
      ctx.fillStyle = '#4a7c2a';
      ctx.fillRect(960, 260, 200, 160);
      ctx.fillRect(1000, 420, 280, 480);
      ctx.fillRect(960, 560, 160, 240);
      
      // Asia
      ctx.fillStyle = '#2d5016';
      ctx.fillRect(1280, 220, 480, 340);
      ctx.fillRect(1400, 160, 320, 100);
      ctx.fillRect(1520, 560, 240, 160);
      
      // Australia
      ctx.fillStyle = '#5a8c35';
      ctx.fillRect(1600, 740, 240, 140);
      
      // Ice caps
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, 80);
      ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.flipY = true; // Fix orientation
      texture.needsUpdate = true;
      setEarthTexture(texture);
      console.log('🌍 Fallback Earth texture created');
      
      // Also create normal map for fallback
      createProceduralNormalMap();
    };
    
    // Start loading attempt
    tryLoadTexture();
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001; // Very slow, realistic rotation
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 32]}>
      {earthTexture ? (
        <meshStandardMaterial
          key="textured"
          map={earthTexture}
          normalMap={normalTexture}
          normalScale={[0.5, 0.5]}
          roughness={0.8}
          metalness={0.1}
          transparent={false}
        />
      ) : (
        <meshStandardMaterial
          key="fallback"
          color="#4a90e2"
          roughness={0.8}
          metalness={0.1}
          transparent={false}
        />
      )}
    </Sphere>
  );
}

function SatelliteModel({ satellite, position, onClick, isHovered, onHover, isPaused }: { 
  satellite: Satellite; 
  position: THREE.Vector3;
  onClick: () => void;
  isHovered: boolean;
  onHover: (satelliteId: string, hovered: boolean) => void;
  isPaused: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.copy(position);
      
      // Gentle rotation (pause when hovered)
      if (!isPaused) {
        groupRef.current.rotation.x += 0.002;
        groupRef.current.rotation.z += 0.001;
      }
      
      // Smooth scale on hover
      const targetScale = isHovered ? 1.5 : 1; // Grow more when hovered
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={onClick}
      onPointerOver={() => onHover(satellite.id, true)}
      onPointerOut={() => onHover(satellite.id, false)}
    >
      {/* Main satellite body */}
      <mesh>
        <boxGeometry args={[0.15, 0.08, 0.08]} />
        <meshStandardMaterial 
          color="#f8f9fa" 
          metalness={0.9} 
          roughness={0.1}
          emissive={satellite.color}
          emissiveIntensity={isHovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Solar panels */}
      <mesh position={[-0.12, 0, 0]}>
        <boxGeometry args={[0.01, 0.25, 0.15]} />
        <meshStandardMaterial 
          color="#1a237e" 
          metalness={0.2} 
          roughness={0.1}
          emissive="#3f51b5"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0.12, 0, 0]}>
        <boxGeometry args={[0.01, 0.25, 0.15]} />
        <meshStandardMaterial 
          color="#1a237e" 
          metalness={0.2} 
          roughness={0.1}
          emissive="#3f51b5"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Communication array */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.12]} />
        <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.1} />
      </mesh>
      
      {/* Signal indicator */}
      {isHovered && (
        <mesh position={[0, 0, -0.06]}>
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color={satellite.color} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}

function PersistentLabels({ satellites, satellitePositions, camera, hoveredSatellite, onSatelliteHover }: { 
  satellites: Satellite[];
  satellitePositions: { [key: string]: THREE.Vector3 };
  camera: THREE.Camera;
  hoveredSatellite: string | null;
  onSatelliteHover: (satelliteId: string, hovered: boolean) => void;
}) {
  const [labelPositions, setLabelPositions] = useState<{ [key: string]: { x: number; visible: boolean } }>({});
  
  useEffect(() => {
    const updateLabelPositions = () => {
      const newPositions: { [key: string]: { x: number; visible: boolean } } = {};
      
      satellites.forEach((satellite) => {
        const position = satellitePositions[satellite.id];
        if (position) {
          // Project 3D position to screen coordinates
          const vector = position.clone();
          vector.project(camera);
          
          // Convert to screen coordinates
          const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
          const visible = vector.z < 1; // Check if in front of camera
          
          newPositions[satellite.id] = { x, visible };
        }
      });
      
      setLabelPositions(newPositions);
    };

    updateLabelPositions();
    const interval = setInterval(updateLabelPositions, 50); // Update 20 times per second
    
    return () => clearInterval(interval);
  }, [satellites, satellitePositions, camera]);

  return (
    <div className="absolute top-6 left-0 right-0 z-20 pointer-events-none">
      <div className="flex justify-center items-start gap-8">
        {satellites.map((satellite) => {
          const labelPos = labelPositions[satellite.id];
          const position = satellitePositions[satellite.id];
          
          return (
            <div key={satellite.id} className="relative">
              <Link
                href={satellite.href}
                className="pointer-events-auto block"
                onMouseEnter={() => onSatelliteHover(satellite.id, true)}
                onMouseLeave={() => onSatelliteHover(satellite.id, false)}
              >
                <div className={`flex items-center gap-3 backdrop-blur-md border rounded-lg px-4 py-2 transition-all duration-300 ${
                  hoveredSatellite === satellite.id 
                    ? 'bg-black/80 border-white/30 scale-110 shadow-lg' 
                    : 'bg-black/40 border-white/10 hover:bg-black/60'
                }`}>
                  <div 
                    className={`w-2 h-2 rounded-full ${hoveredSatellite === satellite.id ? 'animate-ping' : 'animate-pulse'}`}
                    style={{ backgroundColor: satellite.color }}
                  />
                  <span 
                    className={`font-mono font-medium tracking-wider transition-all duration-300 ${
                      hoveredSatellite === satellite.id ? 'text-base' : 'text-sm'
                    }`}
                    style={{ color: satellite.color }}
                  >
                    {satellite.label}
                  </span>
                  <div className="w-1 h-1 bg-white/40 rounded-full" />
                  {hoveredSatellite === satellite.id && (
                    <div className="text-xs text-white/70 ml-2 font-mono">
                      LOCKED
                    </div>
                  )}
                </div>
              </Link>
              
              {/* Tracking line - positioned based on actual satellite position */}
              {position && labelPos && labelPos.visible && (
                <div 
                  className={`fixed top-0 bg-gradient-to-b from-current to-transparent z-10 transition-all duration-300 ${
                    hoveredSatellite === satellite.id 
                      ? 'w-0.5 opacity-80 pointer-events-auto cursor-pointer' 
                      : 'w-px opacity-40 pointer-events-none'
                  }`}
                  style={{ 
                    color: satellite.color,
                    left: `${labelPos.x}px`,
                    height: '100vh',
                    transform: 'translateX(-50%)'
                  }}
                  onMouseEnter={() => onSatelliteHover(satellite.id, true)}
                  onMouseLeave={() => onSatelliteHover(satellite.id, false)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SatelliteSystemInner({ satellites, onSatelliteClick, onPositionUpdate, hoveredSatellite, onSatelliteHover }: {
  satellites: Satellite[];
  onSatelliteClick: (href: string) => void;
  onPositionUpdate?: (positions: { [key: string]: THREE.Vector3 }) => void;
  hoveredSatellite: string | null;
  onSatelliteHover: (satelliteId: string, hovered: boolean) => void;
}) {
  const [satellitePositions, setSatellitePositions] = useState<{ [key: string]: THREE.Vector3 }>({});
  const pausedTimeRef = useRef<{ [key: string]: number }>({});

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const newPositions: { [key: string]: THREE.Vector3 } = {};
    
    satellites.forEach((satellite) => {
      // Pause orbital movement for hovered satellite
      let effectiveTime = time;
      
      if (hoveredSatellite === satellite.id) {
        // Satellite is hovered - pause at current position
        if (!pausedTimeRef.current[satellite.id]) {
          pausedTimeRef.current[satellite.id] = time;
        }
        effectiveTime = pausedTimeRef.current[satellite.id];
      } else {
        // Satellite is not hovered - resume movement
                 if (pausedTimeRef.current[satellite.id]) {
           delete pausedTimeRef.current[satellite.id];
           // Resume from current position without time adjustment
         }
      }
      
      // Varied orbital mechanics for each satellite
      const angle = effectiveTime * satellite.speed + (satellite.angle * Math.PI / 180);
      const x = Math.cos(angle) * satellite.radius;
      const z = Math.sin(angle) * satellite.radius;
      // Each satellite has its own height and slight oscillation
      const y = satellite.height + Math.sin(angle * 0.7 + satellite.angle) * 0.15;
      
      newPositions[satellite.id] = new THREE.Vector3(x, y, z);
    });
    
    setSatellitePositions(newPositions);
    if (onPositionUpdate) {
      onPositionUpdate(newPositions);
    }
  });

  return (
    <>
      {satellites.map((satellite) => {
        const position = satellitePositions[satellite.id];
        if (!position) return null;
        
        return (
          <SatelliteModel
            key={satellite.id}
            satellite={satellite}
            position={position}
            onClick={() => onSatelliteClick(satellite.href)}
            isHovered={hoveredSatellite === satellite.id}
            onHover={onSatelliteHover}
            isPaused={hoveredSatellite === satellite.id}
          />
        );
      })}
    </>
  );
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  
  useEffect(() => {
    if (starsRef.current) {
      const positions = new Float32Array(5000 * 3);
      const colors = new Float32Array(5000 * 3);
      
      for (let i = 0; i < 5000; i++) {
        // Distribute stars in a sphere
        const radius = 150 + Math.random() * 100;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        
        // Subtle color variations
        const intensity = 0.7 + Math.random() * 0.3;
        colors[i * 3] = intensity;
        colors[i * 3 + 1] = intensity * (0.9 + Math.random() * 0.1);
        colors[i * 3 + 2] = intensity * (0.8 + Math.random() * 0.2);
      }
      
      starsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starsRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  }, []);

  return (
    <points ref={starsRef}>
      <bufferGeometry />
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.9} />
    </points>
  );
}

function CameraController({ isMinimized }: { isMinimized: boolean }) {
  const { camera } = useThree();
  
  useFrame(() => {
    if (isMinimized) {
      const targetPosition = [12, 12, 12];
      camera.position.lerp(new THREE.Vector3(...targetPosition), 0.02);
      camera.lookAt(0, 0, 0);
    }
    // When not minimized, let OrbitControls handle the camera
  });
  
  return null;
}

interface Earth3DProps {
  isMinimized: boolean;
  onSatelliteClick: () => void;
}

export default function Earth3D({ isMinimized, onSatelliteClick }: Earth3DProps) {
  const [satellitePositions, setSatellitePositions] = useState<{ [key: string]: THREE.Vector3 }>({});
  const [camera, setCamera] = useState<THREE.Camera | null>(null);
  const [hoveredSatellite, setHoveredSatellite] = useState<string | null>(null);

  const handleSatelliteClick = (href: string) => {
    onSatelliteClick();
    window.location.href = href;
  };

  const handleSatelliteHover = (satelliteId: string, hovered: boolean) => {
    setHoveredSatellite(hovered ? satelliteId : null);
  };

  return (
    <div className={`relative transition-all duration-1000 ease-in-out ${
      isMinimized 
        ? 'fixed bottom-4 right-4 w-32 h-32 z-50' 
        : 'w-full h-screen'
    }`}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }} // Start more zoomed out
        onCreated={({ camera }) => setCamera(camera)}
        style={{ 
          background: 'radial-gradient(ellipse at center, #0a0a0f 0%, #000000 100%)',
        }}
      >
        <CameraController isMinimized={isMinimized} />
        
        {/* Simple, bright lighting for Earth texture visibility */}
        <ambientLight intensity={0.8} color="#ffffff" />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          color="#ffffff"
        />
        
        {/* Scene objects */}
        <Stars />
        <EarthSphere />
        
        {/* Satellite system */}
        <SatelliteSystemInner 
          satellites={satellites}
          onSatelliteClick={handleSatelliteClick}
          onPositionUpdate={setSatellitePositions}
          hoveredSatellite={hoveredSatellite}
          onSatelliteHover={handleSatelliteHover}
        />
        
        {/* Orbit controls - keep camera centered on Earth */}
        {!isMinimized && (
          <OrbitControls 
            target={[0, 0, 0]} // Always look at Earth center
            enableZoom={true} 
            enablePan={false} // Disable panning to keep Earth centered
            maxDistance={25} 
            minDistance={6}
            enableDamping
            dampingFactor={0.03}
            rotateSpeed={0.3}
            zoomSpeed={0.6}
            autoRotate={false}
            onChange={() => {
              // Force label position updates when camera moves
              if (camera) setCamera(camera);
            }}
          />
        )}
      </Canvas>
      
      {/* SpaceX-style persistent labels */}
      {!isMinimized && camera && (
        <PersistentLabels 
          satellites={satellites}
          satellitePositions={satellitePositions}
          camera={camera}
          hoveredSatellite={hoveredSatellite}
          onSatelliteHover={handleSatelliteHover}
        />
      )}
      
      {/* SpaceX-style bottom HUD */}
      {!isMinimized && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 items-end">
              {/* Left status */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>TELEMETRY NOMINAL</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span>5 SATELLITES ACTIVE</span>
                </div>
              </div>
              
              {/* Center title */}
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent font-mono tracking-wider">
                  CONNOR KAPOOR
                </h1>
                <p className="text-sm text-gray-300 font-mono tracking-widest">
                  MISSION CONTROL
                </p>
              </div>
              
              {/* Right controls */}
              <div className="text-right space-y-2">
                <div className="flex items-center justify-end gap-2 text-xs text-gray-400 font-mono">
                  <span>ORBITAL VIEW</span>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                </div>
                <div className="flex items-center justify-end gap-2 text-xs text-gray-400 font-mono">
                  <span>SYSTEMS ONLINE</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Minimized state button */}
      {isMinimized && (
        <div className="relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
            }}
            className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-xs hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center shadow-xl border border-white/20"
            title="Return to Mission Control"
          >
            🌍
          </button>
          
          {/* Orbital ring indicator */}
          <div className="absolute -inset-6 border border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute -inset-4 border border-blue-400/20 rounded-full animate-spin" style={{ animationDuration: '15s' }} />
        </div>
      )}
      

    </div>
  );
} 