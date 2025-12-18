"use client";

import { useIsScrolling } from "@/hooks";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface TrustParticle {
  index: number;
  metricIndex: number; // Which of the 4 metrics (0-3)
  position: THREE.Vector3;
  velocity: number;
  lifecycle: number; // 0-1, birth to death
  opacity: number;
  size: number;
  horizontalDrift: number;
  baseVelocity: number;
}

function TrustParticles3DCore({
  isVisible = true,
  hoveredMetricIndex = -1,
  isScrolling = false,
}: {
  isVisible?: boolean;
  hoveredMetricIndex?: number;
  isScrolling?: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useRef<TrustParticle[]>([]);
  const lastUpdate = useRef(0);
  const geometryRef = useRef<THREE.SphereGeometry>();
  const materialRef = useRef<THREE.MeshBasicMaterial>();

  // Initialize particle system with extreme subtlety
  useEffect(() => {
    const particlesPerMetric = 8;
    const totalParticles = particlesPerMetric * 4; // 4 metrics

    particles.current = Array(totalParticles)
      .fill(null)
      .map((_, i) => {
        const metricIndex = Math.floor(i / particlesPerMetric);
        // Spread particles across 4 metric positions
        const metricOffset = (metricIndex - 1.5) * 2.5; // Adjusted for trust bar width

        const baseVelocity = 0.003 + Math.random() * 0.004; // Ultra-gentle rise

        return {
          index: i,
          metricIndex,
          position: new THREE.Vector3(
            metricOffset + (Math.random() - 0.5) * 1.2, // X spread within metric
            Math.random() * -2 - 0.5, // Start below visible area
            (Math.random() - 0.5) * 0.3, // Minimal Z variation
          ),
          velocity: baseVelocity,
          baseVelocity,
          lifecycle: Math.random(), // Stagger initial state
          opacity: 0,
          size: 0.06 + Math.random() * 0.03, // Subtle, refined particle size
          horizontalDrift: (Math.random() - 0.5) * 0.0008, // Extremely subtle drift
        };
      });

    // Set up initial instanced mesh positions
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < totalParticles; i++) {
        const particle = particles.current[i];
        if (particle) {
          dummy.position.copy(particle.position);
          dummy.scale.setScalar(particle.size);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  // Smooth particle animation with optimized performance
  const dummyRef = useRef(new THREE.Object3D());

  useFrame((state, delta) => {
    // SCROLL FREEZE FIX: Skip heavy operations during scrolling
    if (!meshRef.current || !isVisible || isScrolling) return;

    // Use delta time for smooth animation regardless of framerate
    const deltaTime = Math.min(delta, 0.016); // Cap at 60fps equivalent
    let needsUpdate = false;

    particles.current.forEach((particle) => {
      if (!particle) return;

      // Update lifecycle with delta time for smooth animation
      particle.lifecycle += particle.velocity * deltaTime * 25; // Gentler progression

      // Reset particle when complete
      if (particle.lifecycle > 1) {
        particle.lifecycle = 0;
        particle.position.y = Math.random() * -2 - 0.5;
        particle.position.x =
          (particle.metricIndex - 1.5) * 2.5 + (Math.random() - 0.5) * 1.2;
        particle.position.z = (Math.random() - 0.5) * 0.3;
        needsUpdate = true;
      }

      // Calculate subtle opacity with gentle transitions and subtle pulse
      const pulseModifier =
        1 +
        Math.sin(state.clock.elapsedTime * 1.5 + particle.index * 0.5) * 0.1; // Gentle pulse

      if (particle.lifecycle < 0.25) {
        // Gentle fade in (0-25% of journey)
        particle.opacity = particle.lifecycle * 4 * 0.16 * pulseModifier; // Max 0.16 opacity with pulse
      } else if (particle.lifecycle > 0.75) {
        // Extended fade out (75-100% of journey)
        particle.opacity = (1 - particle.lifecycle) * 4 * 0.16 * pulseModifier;
      } else {
        // Peak visibility (appropriately subtle with pulse)
        particle.opacity = 0.16 * pulseModifier;
      }

      // Refined hover interaction
      if (hoveredMetricIndex === particle.metricIndex) {
        particle.velocity = particle.baseVelocity * 1.6; // Gentle speed increase
        particle.opacity *= 1.4; // Subtle visibility boost
      } else {
        particle.velocity = particle.baseVelocity; // Reset to base speed
      }

      // Update position with gentle delta-based movement
      const movement = particle.velocity * deltaTime * 250; // Slower movement scaling
      particle.position.y += movement;
      particle.position.x += particle.horizontalDrift * deltaTime * 40;

      // Apply to instanced mesh with reused dummy object
      const dummy = dummyRef.current;
      dummy.position.copy(particle.position);
      dummy.scale.setScalar(particle.size * (0.9 + particle.opacity * 0.8)); // Subtle size variation
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(particle.index, dummy.matrix);
      needsUpdate = true;
    });

    // Only update when needed for performance
    if (needsUpdate) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Minimal geometry and material for maximum performance
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 8, 6); // Very low poly for performance
    geometryRef.current = geo;
    return geo;
  }, []);

  const material = useMemo(() => {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#3B82F6"), // Blue to match brand
      transparent: true,
      opacity: 0.4, // Refined base opacity for subtlety
      depthWrite: false, // Prevent z-fighting
      fog: false, // Disable fog for consistency
      blending: THREE.AdditiveBlending, // Additive blending for glow effect
    });
    materialRef.current = mat;
    return mat;
  }, []);

  // Comprehensive cleanup following hero patterns
  useEffect(() => {
    const currentGeometry = geometryRef.current;
    const currentMaterial = materialRef.current;

    return () => {
      // Dispose Three.js resources
      currentGeometry?.dispose();
      currentMaterial?.dispose();

      // Clear particle array
      particles.current = [];
    };
  }, []);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, 32]}
      frustumCulled={false}
      renderOrder={1} // Render after background elements
    />
  );
}

export function TrustParticles3D({
  hoveredMetricIndex = -1,
}: {
  hoveredMetricIndex?: number;
}) {
  const [isMobile, setIsMobile] = useState(false);
  // SCROLL FREEZE FIX: Use centralized scroll state (reduces listener count)
  const isScrolling = useIsScrolling();

  // Mobile detection following hero patterns
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // No 3D on mobile for performance
  if (isMobile) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.6, // Refined opacity for subtlety
        mixBlendMode: "normal", // Normal blending for crisp particles
        filter: "blur(0.3px)", // Gentle blur for softness
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 45,
          near: 0.1,
          far: 30,
        }}
        dpr={[1, 1]} // Lock to 1x DPR for performance
        // SCROLL FIX: Disable R3F's internal event system completely
        events={() => ({ enabled: false, priority: 0, compute: () => null })}
        style={{
          position: "absolute",
          inset: 0,
          background: "transparent",
          pointerEvents: "none",
          touchAction: "auto",
        }}
        gl={{
          antialias: false, // Disable for performance
          alpha: true,
          powerPreference: "low-power", // Battery optimization
        }}
      >
        <TrustParticles3DCore
          hoveredMetricIndex={hoveredMetricIndex}
          isScrolling={isScrolling}
        />
      </Canvas>
    </div>
  );
}

// Development performance monitoring (following hero patterns)
let memoryCheckInterval: NodeJS.Timeout | null = null;

export const startTrustParticlesMonitoring = () => {
  if (process.env.NODE_ENV !== "development") return;

  memoryCheckInterval = setInterval(() => {
    // @ts-ignore - performance.memory is a browser-specific extension
    if (performance.memory) {
      console.log("🔵 Trust Particles Memory:", {
        // @ts-ignore
        used: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + "MB",
        // @ts-ignore
        total: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + "MB",
        particles: "32 (8 per metric)",
      });
    }
  }, 10000); // Check every 10 seconds
};

export const stopTrustParticlesMonitoring = () => {
  if (memoryCheckInterval) {
    clearInterval(memoryCheckInterval);
    memoryCheckInterval = null;
  }
};
