'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import Link from 'next/link';

interface Satellite {
  id: string;
  label: string;
  href: string;
  position: [number, number, number];
  color: string;
}

const satellites: Satellite[] = [
  { id: 'about', label: 'About', href: '/about', position: [3, 1, 2], color: '#3b82f6' },
  { id: 'work', label: 'Work', href: '/work', position: [-2, 2, 3], color: '#10b981' },
  { id: 'writing', label: 'Writing', href: '/writing', position: [1, -3, 2], color: '#8b5cf6' },
  { id: 'projects', label: 'Projects', href: '/projects', position: [-3, -1, 2], color: '#f59e0b' },
  { id: 'contact', label: 'Contact', href: '/contact', position: [2, 3, -2], color: '#ef4444' },
];

function EarthSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);
  const [bumpTexture, setBumpTexture] = useState<THREE.Texture | null>(null);
  
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    
    // Create a procedural earth texture using canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create a gradient that looks like Earth
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e40af'); // Deep ocean blue
    gradient.addColorStop(0.3, '#0ea5e9'); // Ocean blue
    gradient.addColorStop(0.5, '#22c55e'); // Land green
    gradient.addColorStop(0.7, '#84cc16'); // Light green
    gradient.addColorStop(0.85, '#a3a3a3'); // Mountains
    gradient.addColorStop(1, '#f3f4f6'); // Ice caps
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some landmass patterns
    ctx.fillStyle = '#16a34a';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 30 + 10;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add cloud-like patterns
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 40 + 20;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    setEarthTexture(texture);
    
    // Create bump map for terrain
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 512;
    bumpCanvas.height = 256;
    const bumpCtx = bumpCanvas.getContext('2d')!;
    
    const bumpGradient = bumpCtx.createRadialGradient(256, 128, 0, 256, 128, 256);
    bumpGradient.addColorStop(0, '#ffffff');
    bumpGradient.addColorStop(0.5, '#888888');
    bumpGradient.addColorStop(1, '#000000');
    
    bumpCtx.fillStyle = bumpGradient;
    bumpCtx.fillRect(0, 0, bumpCanvas.width, bumpCanvas.height);
    
    const bumpTex = new THREE.CanvasTexture(bumpCanvas);
    setBumpTexture(bumpTex);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Slow rotation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05; // Slight wobble
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshPhongMaterial
        map={earthTexture}
        bumpMap={bumpTexture}
        bumpScale={0.1}
        shininess={100}
        specular={new THREE.Color('#004466')}
      />
    </Sphere>
  );
}

function SatelliteObject({ satellite, onClick }: { satellite: Satellite; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Orbit around Earth
      const time = state.clock.elapsedTime;
      const radius = 4;
      const speed = 0.5;
      
      meshRef.current.position.x = Math.cos(time * speed + satellite.position[0]) * radius;
      meshRef.current.position.y = satellite.position[1] + Math.sin(time * speed * 0.5) * 0.5;
      meshRef.current.position.z = Math.sin(time * speed + satellite.position[0]) * radius;
      
      // Rotate satellite
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      
      // Scale on hover
      const targetScale = hovered ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color={satellite.color} emissive={satellite.color} emissiveIntensity={0.3} />
      </mesh>
      
      {hovered && (
        <Html position={meshRef.current?.position || [0, 0, 0]}>
          <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2">
            {satellite.label}
          </div>
        </Html>
      )}
    </group>
  );
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  
  useEffect(() => {
    if (starsRef.current) {
      const positions = new Float32Array(2000 * 3);
      for (let i = 0; i < 2000; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      }
      starsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, []);

  return (
    <points ref={starsRef}>
      <bufferGeometry />
      <pointsMaterial color="#ffffff" size={0.1} />
    </points>
  );
}

function AtmosphereGlow() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Sphere ref={meshRef} args={[2.1, 64, 64]}>
      <meshBasicMaterial
        color="#4fc3f7"
        transparent
        opacity={0.1}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

function CameraController({ isMinimized }: { isMinimized: boolean }) {
  const { camera } = useThree();
  
  useFrame(() => {
    const targetPosition = isMinimized ? [8, 8, 8] : [0, 0, 8];
    camera.position.lerp(new THREE.Vector3(...targetPosition), 0.05);
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

interface Earth3DProps {
  isMinimized: boolean;
  onSatelliteClick: () => void;
}

export default function Earth3D({ isMinimized, onSatelliteClick }: Earth3DProps) {
  const handleSatelliteClick = (href: string) => {
    onSatelliteClick();
    window.location.href = href;
  };

  return (
    <div className={`transition-all duration-1000 ease-in-out ${
      isMinimized 
        ? 'fixed bottom-4 right-4 w-32 h-32 z-50' 
        : 'w-full h-screen'
    }`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'radial-gradient(ellipse at center, #0f1419 0%, #000000 100%)' }}
      >
        <CameraController isMinimized={isMinimized} />
        
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4fc3f7" />
        
        {/* Scene Objects */}
        <Stars />
        <EarthSphere />
        <AtmosphereGlow />
        
        {/* Satellites */}
        {satellites.map((satellite) => (
          <SatelliteObject
            key={satellite.id}
            satellite={satellite}
            onClick={() => handleSatelliteClick(satellite.href)}
          />
        ))}
        
        {!isMinimized && <OrbitControls enableZoom={true} enablePan={false} maxDistance={15} minDistance={5} />}
      </Canvas>
      
      {/* Title and Info */}
      {!isMinimized && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Connor Kapoor
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Engineer • Maker • Open Source Enthusiast
          </p>
          <p className="text-sm text-gray-400">
            Click and drag to explore • Hover over satellites to navigate
          </p>
        </div>
      )}
      
      {/* Expand Button when minimized */}
      {isMinimized && (
        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
          className="absolute -top-2 -left-2 w-6 h-6 bg-blue-600 text-white rounded-full text-xs hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center shadow-lg"
          title="Return to Earth"
        >
          🌍
        </button>
      )}
    </div>
  );
} 