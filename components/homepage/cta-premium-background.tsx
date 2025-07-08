"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// Premium particle shaders - CTA version with warmer colors
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;
  
  attribute float size;
  attribute vec3 customColor;
  
  varying vec3 vColor;
  varying float vDepth;
  
  void main() {
    vColor = customColor;
    
    vec3 pos = position;
    
    // Slower, more elegant wave movement for CTA
    float wave1 = sin(uTime * 0.2 + position.x * 0.04) * 1.0;
    float wave2 = cos(uTime * 0.15 + position.y * 0.06) * 0.8;
    float wave3 = sin(uTime * 0.25 + position.z * 0.08) * 0.4;
    
    pos.x += wave1 + wave2 * 0.4;
    pos.y += wave2 + wave3 * 0.6;
    pos.z += wave3 + wave1 * 0.2;
    
    // Enhanced mouse interaction with larger influence for CTA
    vec2 mouseDistance = pos.xy - uMouse;
    float dist = length(mouseDistance);
    float falloff = smoothstep(30.0, 0.0, dist);
    
    pos.xy += normalize(mouseDistance) * falloff * 6.0;
    pos.z += falloff * 8.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vDepth = -mvPosition.z;
    
    gl_PointSize = size * (140.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vDepth;
  uniform float uOpacity;
  uniform vec3 uGlowColor;
  
  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    if (dist > 0.5) discard;
    
    // Soft particle edges
    float alpha = smoothstep(0.5, 0.0, dist);
    
    // Enhanced glow effect for CTA
    float glow = exp(-dist * 3.5) * 0.6;
    vec3 finalColor = mix(vColor, uGlowColor, glow);
    
    // Depth-based opacity
    float depthFade = smoothstep(100.0, 15.0, vDepth);
    
    gl_FragColor = vec4(finalColor, alpha * uOpacity * depthFade);
  }
`;

// Hook for detecting mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// CTA-specific particle system with warmer, more inviting colors
function CTAParticleSystem() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera, size } = useThree();
  const isMobile = useIsMobile();
  
  // Mouse tracking with elegant interpolation
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  
  // Performance tracking
  const frameCount = useRef(0);
  const lastTime = useRef(0);
  
  // Particle configuration - fewer particles for CTA section
  const particleConfig = useMemo(() => ({
    count: isMobile ? 1000 : 2000,
    sizeMultiplier: isMobile ? 1.8 : 1.2,
    spread: isMobile ? 35 : 50,
  }), [isMobile]);

  // Warmer color palette for CTA section
  const colorPalette = useMemo(() => [
    new THREE.Color(0x3B82F6), // Blue
    new THREE.Color(0x8B5CF6), // Purple
    new THREE.Color(0x10B981), // Emerald
    new THREE.Color(0xF59E0B), // Amber accent
    new THREE.Color(0xEF4444), // Red accent for warmth
  ], []);

  // Initialize particle geometry and material
  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleConfig.count * 3);
    const colors = new Float32Array(particleConfig.count * 3);
    const sizes = new Float32Array(particleConfig.count);

    // Generate particles in a cloud formation
    for (let i = 0; i < particleConfig.count; i++) {
      const i3 = i * 3;
      
      // Position particles in a more compact cloud for CTA
      positions[i3] = (Math.random() - 0.5) * particleConfig.spread;
      positions[i3 + 1] = (Math.random() - 0.5) * particleConfig.spread;
      positions[i3 + 2] = (Math.random() - 0.5) * particleConfig.spread;
      
      // Random colors from warmer palette
      const colorIndex = Math.floor(Math.random() * colorPalette.length);
      const color = colorPalette[colorIndex] || new THREE.Color(0x3B82F6);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Slightly larger particles for CTA visibility
      sizes[i] = (Math.random() * 1.4 + 0.5) * particleConfig.sizeMultiplier;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: 1.0 },
        uOpacity: { value: 0.9 }, // Slightly more visible for CTA
        uGlowColor: { value: new THREE.Color(0xF59E0B) }, // Amber glow for warmth
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { geometry: geo, material: mat };
  }, [particleConfig, colorPalette]);

  // Mouse event handlers
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -(event.clientY / size.height) * 2 + 1;
    };

    const handleTouch = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        if (touch) {
          mouseRef.current.x = (touch.clientX / size.width) * 2 - 1;
          mouseRef.current.y = -(touch.clientY / size.height) * 2 + 1;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, [size]);

  // LOD system for CTA section
  const updateLOD = useCallback((camera: THREE.Camera, mesh: THREE.Points) => {
    const distance = camera.position.length();
    
    if (distance > 80) {
      mesh.geometry.setDrawRange(0, Math.floor(particleConfig.count * 0.6));
    } else if (distance > 40) {
      mesh.geometry.setDrawRange(0, Math.floor(particleConfig.count * 0.8));
    } else {
      mesh.geometry.setDrawRange(0, particleConfig.count);
    }
  }, [particleConfig.count]);

  // Animation loop - slower and more elegant for CTA
  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    frameCount.current++;
    const currentTime = state.clock.getElapsedTime();
    
    if (currentTime - lastTime.current < 0.02) return; // ~50fps for CTA
    lastTime.current = currentTime;

    // Premium mouse interpolation for refined CTA movement
    const interpolationSpeed = 0.025; // Reduced from 0.04 for smoother, more elegant movement
    currentMouse.current.x += (mouseRef.current.x - currentMouse.current.x) * interpolationSpeed;
    currentMouse.current.y += (mouseRef.current.y - currentMouse.current.y) * interpolationSpeed;

    // Update shader uniforms
    if (materialRef.current.uniforms['uTime']) {
      materialRef.current.uniforms['uTime'].value = currentTime;
    }
    if (materialRef.current.uniforms['uMouse']) {
      materialRef.current.uniforms['uMouse'].value.set(
        currentMouse.current.x * 25, 
        currentMouse.current.y * 25
      );
    }

    updateLOD(camera, meshRef.current);

    // Even gentler rotation for CTA elegance
    meshRef.current.rotation.y += 0.0008;
    meshRef.current.rotation.x += 0.0003;
  });

  // Cleanup
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <points ref={meshRef} geometry={geometry} material={material}>
      <shaderMaterial ref={materialRef} attach="material" {...material} />
    </points>
  );
}

// Premium camera controls for CTA section with refined movement
function CTACameraControls() {
  const { camera, mouse } = useThree();
  const isMobile = useIsMobile();

  useFrame(() => {
    if (isMobile) return;

    // Premium, refined camera movement for CTA section
    const targetX = mouse.x * 1.0;
    const targetY = mouse.y * 0.5;
    const targetZ = 25;
    
    // Much slower interpolation for premium elegance
    const lerpFactor = 0.008; // Reduced from 0.015 for smoother, more premium feel
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, lerpFactor);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 3 + targetY, lerpFactor);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, lerpFactor);
    
    // Extremely subtle rotation for premium sophistication
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, mouse.x * 0.005, lerpFactor);
  });

  return null;
}

// Main CTA Premium Background component
export function CTAPremiumBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Container styles to prevent scrollbar issues
  const containerStyles: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 2s ease-out',
    pointerEvents: 'none',
  };

  // Skip 3D on very low-end mobile devices
  if (isMobile && navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return (
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
        opacity: 0.6,
      }} />
    );
  }

  return (
    <>
      {/* Canvas container */}
      <div ref={containerRef} style={containerStyles}>
        <Canvas
          camera={{ 
            position: [0, 3, 25], 
            fov: 60,
            near: 0.1,
            far: 150
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          gl={{ 
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
          }}
          style={{ 
            background: 'transparent',
            display: 'block',
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }}
        >
          <CTACameraControls />
          <CTAParticleSystem />
        </Canvas>
      </div>

      {/* Enhanced gradient overlay for CTA warmth */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(245, 158, 11, 0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
          opacity: isLoaded ? 0.8 : 0,
          transition: 'opacity 2s ease-out',
        }}
      />
    </>
  );
} 