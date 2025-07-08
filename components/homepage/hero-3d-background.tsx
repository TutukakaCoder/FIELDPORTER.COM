"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// Premium particle shaders
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;
  
  attribute float size;
  attribute vec3 customColor;
  
  varying vec3 vColor;
  varying float vDepth;
  varying float vMouseInfluence;
  
  void main() {
    vColor = customColor;
    
    vec3 pos = position;
    
    // Multi-layered wave movement for organic feel
    float wave1 = sin(uTime * 0.3 + position.x * 0.05) * 1.5;
    float wave2 = cos(uTime * 0.2 + position.y * 0.08) * 1.0;
    float wave3 = sin(uTime * 0.4 + position.z * 0.1) * 0.5;
    
    pos.x += wave1 + wave2 * 0.5;
    pos.y += wave2 + wave3 * 0.7;
    pos.z += wave3 + wave1 * 0.3;
    
    // Premium mouse interaction with refined, smooth movement
    vec2 mouseDistance = pos.xy - uMouse;
    float dist = length(mouseDistance);
    float mouseInfluence = 1.0 / (1.0 + dist * 0.08); // Gentler influence curve
    float falloff = smoothstep(35.0, 0.0, dist);
    
    // Refined position displacement for smooth, premium feel
    pos.xy += normalize(mouseDistance) * falloff * 8.0;
    pos.z += falloff * 12.0 + mouseInfluence * 4.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vDepth = -mvPosition.z;
    vMouseInfluence = mouseInfluence; // Pass mouse influence to fragment shader
    
    // Premium particle sizing with subtle mouse influence
    float sizeMultiplier = 1.0 + mouseInfluence * 0.4; // Subtle scaling near mouse
    gl_PointSize = size * (120.0 / -mvPosition.z) * sizeMultiplier;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vDepth;
  varying float vMouseInfluence;
  uniform float uOpacity;
  uniform vec3 uGlowColor;
  
  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    if (dist > 0.5) discard;
    
    // Premium soft particle edges
    float alpha = smoothstep(0.5, 0.2, dist);
    
    // Enhanced glow effect with mouse illumination
    float baseGlow = exp(-dist * 3.0) * 0.4;
    float mouseGlow = vMouseInfluence * 0.6; // Premium illumination near mouse
    float totalGlow = baseGlow + mouseGlow;
    
    // Premium color mixing with subtle mouse illumination
    vec3 illuminatedColor = vColor + (uGlowColor * mouseGlow * 0.3);
    vec3 finalColor = mix(vColor, illuminatedColor, totalGlow);
    
    // Refined depth-based opacity
    float depthFade = smoothstep(120.0, 25.0, vDepth);
    
    // Premium alpha with mouse influence
    float finalAlpha = alpha * uOpacity * depthFade * (1.0 + mouseGlow * 0.4);
    
    gl_FragColor = vec4(finalColor, finalAlpha);
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

// Premium particle system component
function PremiumParticleSystem() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera, size } = useThree();
  const isMobile = useIsMobile();
  
  // Mouse tracking with smooth interpolation
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  
  // Performance tracking
  const frameCount = useRef(0);
  const lastTime = useRef(0);
  
  // Particle configuration based on device
  const particleConfig = useMemo(() => ({
    count: isMobile ? 1500 : 3000,
    sizeMultiplier: isMobile ? 1.5 : 1.0,
    spread: isMobile ? 40 : 60,
  }), [isMobile]);

  // Premium color palette
  const colorPalette = useMemo(() => [
    new THREE.Color(0x3B82F6), // Primary blue
    new THREE.Color(0x8B5CF6), // Purple
    new THREE.Color(0x10B981), // Emerald accent
    new THREE.Color(0x06B6D4), // Cyan
    new THREE.Color(0x8B5CF6), // Violet
  ], []);

  // Initialize particle geometry and material
  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleConfig.count * 3);
    const colors = new Float32Array(particleConfig.count * 3);
    const sizes = new Float32Array(particleConfig.count);

    // Generate particles in 3D space
    for (let i = 0; i < particleConfig.count; i++) {
      const i3 = i * 3;
      
      // Position particles in a cloud formation
      positions[i3] = (Math.random() - 0.5) * particleConfig.spread;
      positions[i3 + 1] = (Math.random() - 0.5) * particleConfig.spread;
      positions[i3 + 2] = (Math.random() - 0.5) * particleConfig.spread;
      
      // Random colors from premium palette
      const colorIndex = Math.floor(Math.random() * colorPalette.length);
      const color = colorPalette[colorIndex] || new THREE.Color(0x3B82F6); // Fallback to blue
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Varied particle sizes for depth - BALANCED VISIBILITY
      sizes[i] = (Math.random() * 1.2 + 0.4) * particleConfig.sizeMultiplier;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: 1.0 },
        uOpacity: { value: 0.8 },
        uGlowColor: { value: new THREE.Color(0x10B981) }, // Emerald glow
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { geometry: geo, material: mat };
  }, [particleConfig, colorPalette]);

  // Enhanced mouse event handlers with proper scaling
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert to world coordinates like the original for better responsiveness
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Scale to world space for much more noticeable interaction
      mouseRef.current.x = x * 50;
      mouseRef.current.y = y * 50;
    };

    const handleTouch = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        if (touch) {
          const x = (touch.clientX / window.innerWidth) * 2 - 1;
          const y = -(touch.clientY / window.innerHeight) * 2 + 1;
          
          mouseRef.current.x = x * 50;
          mouseRef.current.y = y * 50;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  // LOD (Level of Detail) system
  const updateLOD = useCallback((camera: THREE.Camera, mesh: THREE.Points) => {
    const distance = camera.position.length();
    
    if (distance > 100) {
      // Reduce particle count at distance
      mesh.geometry.setDrawRange(0, Math.floor(particleConfig.count * 0.5));
    } else if (distance > 50) {
      mesh.geometry.setDrawRange(0, Math.floor(particleConfig.count * 0.75));
    } else {
      mesh.geometry.setDrawRange(0, particleConfig.count);
    }
  }, [particleConfig.count]);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    // Performance monitoring
    frameCount.current++;
    const currentTime = state.clock.getElapsedTime();
    
    // Skip frames if performance is poor
    if (currentTime - lastTime.current < 0.016) return; // Maintain ~60fps
    lastTime.current = currentTime;

    // Refined mouse interpolation for smooth, premium movement
    const interpolationSpeed = 0.06; // Reduced for smoother, more elegant interaction
    currentMouse.current.x += (mouseRef.current.x - currentMouse.current.x) * interpolationSpeed;
    currentMouse.current.y += (mouseRef.current.y - currentMouse.current.y) * interpolationSpeed;

    // Update shader uniforms with better scaling
    if (materialRef.current.uniforms['uTime']) {
      materialRef.current.uniforms['uTime'].value = currentTime;
    }
    if (materialRef.current.uniforms['uMouse']) {
      materialRef.current.uniforms['uMouse'].value.set(
        currentMouse.current.x, // Direct use of world coordinates for stronger effect
        currentMouse.current.y
      );
    }

    // Apply LOD system
    updateLOD(camera, meshRef.current);

    // Gentle rotation for organic movement
    meshRef.current.rotation.y += 0.001;
    meshRef.current.rotation.x += 0.0005;
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

// Camera controls with enhanced responsiveness
function EnhancedCameraControls() {
  const { camera, mouse } = useThree();
  const isMobile = useIsMobile();

  useFrame(() => {
    if (isMobile) return;

    // Enhanced camera movement for premium feel
    const targetX = mouse.x * 2.0;
    const targetY = mouse.y * 1.0;
    const targetZ = 30;
    
    // Smooth interpolation with increased responsiveness
    const lerpFactor = 0.02;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, lerpFactor);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 5 + targetY, lerpFactor);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, lerpFactor);
    
    // Subtle rotation for depth
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, mouse.x * 0.02, lerpFactor);
  });

  return null;
}

// Main Hero3D Background component with proper container structure
export function Hero3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ENHANCED: Prevent scrollbar issues with stronger containment
  const containerStyles: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden', // Critical: prevents inner scrollbars
    contain: 'layout style paint size', // CSS containment
    isolation: 'isolate', // Create stacking context
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 1.5s ease-out',
    pointerEvents: 'none', // Allows interaction with content overlay
  };

  // Skip 3D on very low-end mobile devices
  if (isMobile && navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return null;
  }

  return (
    <>
      {/* Canvas container - absolute positioned */}
      <div ref={containerRef} style={containerStyles}>
        <Canvas
          camera={{ 
            position: [0, 5, 30], 
            fov: 60,
            near: 0.1,
            far: 200
          }}
          dpr={Math.min(window.devicePixelRatio, 2)} // Cap pixel ratio for performance
          gl={{ 
            antialias: false, // Disable for performance
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
          }}
          style={{ 
            background: 'transparent',
            display: 'block', // Prevent layout issues
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            contain: 'size layout style paint', // Enhanced containment
          }}
          onCreated={({ gl }) => {
            // Optimize WebGL context
            gl.setClearColor(0x000000, 0);
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }}
        >
          <EnhancedCameraControls />
          <PremiumParticleSystem />
        </Canvas>
      </div>

      {/* Premium gradient overlay for depth */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none',
          opacity: isLoaded ? 0.6 : 0,
          transition: 'opacity 1.5s ease-out',
        }}
      />
    </>
  );
} 