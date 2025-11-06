"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Simplified shaders for better performance
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  
  attribute float size;
  attribute vec3 customColor;
  
  varying vec3 vColor;
  varying float vMouseInfluence;
  
  void main() {
    vColor = customColor;
    
    vec3 pos = position;
    
    // Simple wave movement
    float wave = sin(uTime * 0.2 + position.x * 0.03) * 1.0;
    pos.y += wave;
    pos.x += cos(uTime * 0.15 + position.z * 0.02) * 0.5;
    
    // Premium mouse interaction with refined movement
    vec2 mouseDistance = pos.xy - uMouse;
    float dist = length(mouseDistance);
    float mouseInfluence = 1.0 / (1.0 + dist * 0.12); // Gentler influence curve
    float falloff = smoothstep(25.0, 0.0, dist);
    
    // Refined position displacement for smooth, premium feel
    pos.xy += normalize(mouseDistance) * falloff * 5.0;
    pos.z += falloff * 8.0 + mouseInfluence * 3.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vMouseInfluence = mouseInfluence; // Pass mouse influence to fragment shader
    
    // Premium particle sizing with subtle mouse influence
    float sizeMultiplier = 1.0 + mouseInfluence * 0.3; // Subtle scaling near mouse
    gl_PointSize = size * (80.0 / -mvPosition.z) * sizeMultiplier;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vMouseInfluence;
  uniform float uOpacity;
  
  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    if (dist > 0.5) discard;
    
    // Premium soft particle edges
    float alpha = smoothstep(0.5, 0.1, dist);
    
    // Subtle glow effect with mouse illumination
    float baseGlow = exp(-dist * 2.5) * 0.3;
    float mouseGlow = vMouseInfluence * 0.4; // Gentle illumination near mouse
    
    // Premium color enhancement with mouse illumination
    vec3 glowColor = vec3(0.8, 0.9, 1.0); // Soft blue-white glow
    vec3 illuminatedColor = vColor + (glowColor * mouseGlow * 0.2);
    vec3 finalColor = mix(vColor, illuminatedColor, baseGlow + mouseGlow);
    
    // Premium alpha with subtle mouse influence
    float finalAlpha = alpha * uOpacity * (1.0 + mouseGlow * 0.3);
    
    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

// Simplified particle system
function SimplifiedParticleSystem({ isScrolling }: { isScrolling: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera } = useThree();

  // Mouse tracking
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const frameCount = useRef(0);

  // Reduced particle count for performance
  const particleCount = 800;

  // Simplified color palette
  const colorPalette = useMemo(
    () => [
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0x8b5cf6), // Purple
      new THREE.Color(0x10b981), // Emerald
    ],
    [],
  );

  // Create geometry and material
  const { geometry, material } = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Create particles in a simpler distribution
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Simple cloud distribution
      positions[i3] = (Math.random() - 0.5) * 60;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 40;

      // Random color from palette
      const colorIndex = Math.floor(Math.random() * colorPalette.length);
      const color = colorPalette[colorIndex] || new THREE.Color(0x3b82f6);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Random size
      sizes[i] = Math.random() * 2 + 1;
    }

    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("customColor", new THREE.BufferAttribute(colors, 3));
    geom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uOpacity: { value: 0.8 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    });

    return { geometry: geom, material: mat };
  }, [colorPalette]);

  // Enhanced mouse event handlers with better scaling
  useEffect(() => {
    // SCROLL FIX: Throttle mousemove to avoid blocking scroll
    let rafId: number | null = null;
    let pendingMouseUpdate = false;

    const handleMouseMove = (event: MouseEvent) => {
      if (pendingMouseUpdate) return;

      pendingMouseUpdate = true;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;

        mouseRef.current = {
          x: x * 30,
          y: y * 30,
        };

        pendingMouseUpdate = false;
      });
    };

    const handleTouch = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        if (touch && !pendingMouseUpdate) {
          pendingMouseUpdate = true;

          if (rafId !== null) {
            cancelAnimationFrame(rafId);
          }

          rafId = requestAnimationFrame(() => {
            const x = (touch.clientX / window.innerWidth) * 2 - 1;
            const y = -(touch.clientY / window.innerHeight) * 2 + 1;

            mouseRef.current = {
              x: x * 30,
              y: y * 30,
            };

            pendingMouseUpdate = false;
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouch);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Simplified animation loop with scroll freeze prevention
  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    // SCROLL FREEZE FIX: Skip heavy operations during active scrolling
    if (isScrolling) {
      const currentTime = state.clock.getElapsedTime();
      if (materialRef.current.uniforms["uTime"]) {
        materialRef.current.uniforms["uTime"].value = currentTime;
      }
      return;
    }

    const currentTime = state.clock.getElapsedTime();

    // Throttle to 30fps (every other frame)
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    // Premium mouse interpolation for smooth, elegant interaction
    const interpolationSpeed = 0.05;
    currentMouse.current.x +=
      (mouseRef.current.x - currentMouse.current.x) * interpolationSpeed;
    currentMouse.current.y +=
      (mouseRef.current.y - currentMouse.current.y) * interpolationSpeed;

    // Update shader uniforms
    if (materialRef.current.uniforms["uTime"]) {
      materialRef.current.uniforms["uTime"].value = currentTime;
    }
    if (materialRef.current.uniforms["uMouse"]) {
      materialRef.current.uniforms["uMouse"].value.set(
        currentMouse.current.x,
        currentMouse.current.y,
      );
    }

    // Gentle rotation
    meshRef.current.rotation.y += 0.0005;
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

// Simplified camera controls
function SimplifiedCameraControls({ isScrolling }: { isScrolling: boolean }) {
  const { camera, mouse } = useThree();
  const frameCount = useRef(0);

  useFrame(() => {
    // SCROLL FREEZE FIX: Skip during active scrolling
    if (isScrolling) return;

    // Throttle to 30fps (every other frame)
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    // Premium camera movement with smooth, elegant motion
    const targetX = mouse.x * 1.0;
    const targetY = mouse.y * 0.6;
    const targetZ = 25;

    // Refined interpolation for premium smoothness
    const lerpFactor = 0.015;
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetX,
      lerpFactor,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      3 + targetY,
      lerpFactor,
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      targetZ,
      lerpFactor,
    );

    // Subtle rotation for premium depth effect
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      mouse.x * 0.008,
      lerpFactor,
    );
  });

  return null;
}

// Main simplified 3D background component
export function Hero3DBackgroundSimplified() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // SCROLL FREEZE FIX: Detect active scrolling
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const containerStyles: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    contain: "layout style paint size",
    isolation: "isolate",
    opacity: isLoaded ? 1 : 0,
    transition: "opacity 1s ease-out",
    pointerEvents: "none",
  };

  return (
    <>
      <div ref={containerRef} style={containerStyles}>
        <Canvas
          camera={{
            position: [0, 3, 25],
            fov: 50,
            near: 0.1,
            far: 100,
          }}
          dpr={Math.min(window.devicePixelRatio, 1.5)} // Lower DPR for performance
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "default", // Don't force high performance
            stencil: false,
            depth: false,
          }}
          style={{
            background: "transparent",
            display: "block",
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            contain: "size layout style paint",
            pointerEvents: "none", // SCROLL FIX: Prevent Canvas from capturing scroll
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          }}
        >
          <SimplifiedCameraControls isScrolling={isScrolling} />
          <SimplifiedParticleSystem isScrolling={isScrolling} />
        </Canvas>
      </div>

      {/* Simplified gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%)",
          pointerEvents: "none",
          opacity: isLoaded ? 0.15 : 0,
          transition: "opacity 1s ease-out",
        }}
        className="dark:opacity-50"
      />
    </>
  );
}
