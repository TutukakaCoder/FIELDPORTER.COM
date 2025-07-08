"use client";

import { useStableMobile } from '@/hooks';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface PremiumThinkingSphereProps {
  message?: string;
  className?: string;
}

export function PremiumThinkingSphere({ 
  message = "Thinking...", 
  className = "" 
}: PremiumThinkingSphereProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useStableMobile();

  useEffect(() => {
    if (!mountRef.current) return () => {};

    // Check for WebGL support
    if (!window.WebGLRenderingContext) {
      setFallbackMode(true);
      return () => {};
    }

    try {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        1, // 1:1 aspect ratio for circular container
        0.1,
        1000
      );
      camera.position.z = 2;

      // Renderer setup with optimized settings
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile, // Disable antialiasing on mobile for performance
        powerPreference: 'low-power'
      });
      renderer.setSize(60, 60); // Small size for chat loading
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      // Glass sphere geometry
      const geometry = new THREE.SphereGeometry(0.6, 32, 32);
      
      // Glass material with subtle glow
      const material = new THREE.MeshPhongMaterial({
        color: 0x3b82f6, // fieldporter-blue
        transparent: true,
        opacity: 0.8,
        shininess: 100,
        specular: 0x87ceeb,
        emissive: 0x1e3a8a,
        emissiveIntensity: 0.1
      });

      // Create sphere mesh
      const sphere = new THREE.Mesh(geometry, material);
      sphereRef.current = sphere;
      scene.add(sphere);

      // Lighting setup
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Add to DOM
      const mountElement = mountRef.current;
      mountElement.appendChild(renderer.domElement);
      setIsVisible(true);

      // Animation loop
      const animate = () => {
        if (!sphereRef.current || !rendererRef.current || !sceneRef.current) return;

        // Smooth rotation
        sphereRef.current.rotation.y += 0.01;
        sphereRef.current.rotation.x += 0.005;
        
        // Subtle pulsing effect
        const pulseScale = 1 + Math.sin(Date.now() * 0.003) * 0.05;
        sphereRef.current.scale.setScalar(pulseScale);

        rendererRef.current.render(sceneRef.current, camera);
        animationRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
        if (geometry) geometry.dispose();
        if (material) material.dispose();
        if (mountElement && renderer.domElement) {
          mountElement.removeChild(renderer.domElement);
        }
      };

    } catch (error) {
      console.warn('WebGL not supported, using fallback animation');
      setFallbackMode(true);
      return () => {};
    }
  }, [isMobile]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (fallbackMode) {
    // CSS fallback animation
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="relative w-[60px] h-[60px] flex items-center justify-center">
          <motion.div
            className="w-8 h-8 rounded-full bg-gradient-to-br from-fieldporter-blue to-blue-600 shadow-lg"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        </div>
        <span className="text-sm text-fieldporter-gray italic">
          {message}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div 
        ref={mountRef} 
        className={`w-[60px] h-[60px] flex items-center justify-center transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <span className="text-sm text-fieldporter-gray italic">
        {message}
      </span>
    </div>
  );
} 