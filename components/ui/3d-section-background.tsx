"use client";

import { useIsScrolling } from "@/hooks";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface Background3DProps {
  opacity?: number;
  gridSize?: number;
  spacing?: number;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  intensity?: number;
  enableParallax?: boolean;
  waveAmplitude?: number;
  className?: string;
}

// Hook for detecting mobile devices with optimization
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

// Enhanced camera controls for sections with gentler but visible interaction
function EnhancedCameraControls({
  enabled = true,
  onMouseUpdate,
  isScrolling = false,
}: {
  enabled?: boolean;
  onMouseUpdate?: (position: THREE.Vector3) => void;
  isScrolling?: boolean;
}) {
  const { camera, mouse, viewport } = useThree();
  const isMobile = useIsMobile();
  // SCROLL FREEZE FIX: Removed redundant scroll listener - using centralized state
  const scrollProgress = useRef(0);
  const mousePosition3D = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (isMobile || !enabled) return;

    // SCROLL FREEZE FIX: Skip during active scrolling
    if (isScrolling) return;

    // Convert mouse to 3D world coordinates for section interaction
    const mouseX = (mouse.x * viewport.width) / 4; // More responsive than before
    const mouseY = (mouse.y * viewport.height) / 4;
    mousePosition3D.current.set(mouseX, mouseY, 0);

    // Enhanced mouse parallax effect - more noticeable but still subtle
    const targetX = mouse.x * 0.4; // Increased from 0.15
    const targetY = mouse.y * 0.25; // Increased from 0.1

    // Gentle scroll-based depth - more pronounced
    const scrollDepth = scrollProgress.current * 1.5; // Increased from 1.0
    const targetZ = 15 - scrollDepth;

    // Smoother camera interpolation with better responsiveness
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.008); // Increased from 0.004
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      8 + targetY,
      0.008,
    );
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.005); // Increased from 0.002

    if (onMouseUpdate) {
      onMouseUpdate(mousePosition3D.current);
    }
  });

  // Store mouse position for use by other components
  (camera as any).mousePosition3D = mousePosition3D.current;

  return null;
}

// Enhanced neural connections for sections with better visual impact
function SectionNeuralConnections({
  mousePosition3D,
  positions,
  count,
  intensity = 0.4, // Increased default
  isScrolling = false,
}: {
  mousePosition3D: THREE.Vector3 | undefined;
  positions: Float32Array;
  count: number;
  intensity?: number;
  isScrolling?: boolean;
}) {
  const linesRef = useRef<THREE.Group>(null);
  const isMobile = useIsMobile();
  const lastUpdateTime = useRef(0);

  useFrame((state) => {
    if (!linesRef.current || isMobile) return;

    // SCROLL FREEZE FIX: Skip during active scrolling
    if (isScrolling) return;

    // Better update frequency for sections - every 60ms instead of 100ms
    const now = state.clock.elapsedTime;
    if (now - lastUpdateTime.current < 0.06) return;
    lastUpdateTime.current = now;

    // Clear previous connections
    linesRef.current.clear();

    const mouse3D = mousePosition3D || new THREE.Vector3(0, 0, 0);
    const connectionDistance = 4.5; // Increased from 3 for more connections
    const mouseInfluenceRadius = 8; // Increased from 6 for better interaction

    // Create enhanced neural connections
    for (let i = 0; i < count; i++) {
      const x1 = positions[i * 3] ?? 0;
      const y1 = positions[i * 3 + 1] ?? 0;
      const z1 = positions[i * 3 + 2] ?? 0;
      const node1 = new THREE.Vector3(x1, y1, z1);

      const distanceToMouse = node1.distanceTo(mouse3D);

      if (distanceToMouse < mouseInfluenceRadius) {
        const mouseProximity = Math.max(
          0,
          1 - distanceToMouse / mouseInfluenceRadius,
        );

        // More connections for better visual impact
        let connectionsCreated = 0;
        const maxConnections = 2; // Reduced for performance

        for (
          let j = i + 1;
          j < count && connectionsCreated < maxConnections;
          j++
        ) {
          const x2 = positions[j * 3] ?? 0;
          const y2 = positions[j * 3 + 1] ?? 0;
          const z2 = positions[j * 3 + 2] ?? 0;
          const node2 = new THREE.Vector3(x2, y2, z2);

          const nodeDistance = node1.distanceTo(node2);

          if (nodeDistance < connectionDistance) {
            const connectionStrength = Math.max(
              0,
              1 - nodeDistance / connectionDistance,
            );
            const finalOpacity =
              mouseProximity * connectionStrength * intensity * 0.6; // Increased from 0.3

            if (finalOpacity > 0.02) {
              // Lowered threshold
              const points = [node1, node2];
              const geometry = new THREE.BufferGeometry().setFromPoints(points);

              const material = new THREE.LineBasicMaterial({
                color: new THREE.Color().setHSL(
                  0.55 + mouseProximity * 0.2,
                  0.8,
                  0.5 + mouseProximity * 0.3,
                ), // Enhanced colors
                opacity: finalOpacity,
                transparent: true,
                linewidth: 1.5, // Increased from 1
              });

              const line = new THREE.Line(geometry, material);
              linesRef.current.add(line);
              connectionsCreated++;
            }
          }
        }
      }
    }
  });

  return <group ref={linesRef} />;
}

export function SectionBackground3D({
  opacity = 0.2, // Increased default from 0.15
  gridSize = 9, // Increased default from 8
  spacing = 2.8, // Slightly decreased for more nodes
  primaryColor = "#3B82F6",
  secondaryColor = "#8B5CF6",
  accentColor = "#10B981",
  intensity = 1.0, // Increased default from 0.8
  enableParallax = true,
  waveAmplitude = 1.2, // Increased default from 1.0
  className = "",
}: Background3DProps) {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  // SCROLL FREEZE FIX: Use centralized scroll state (reduces listener count)
  const isScrolling = useIsScrolling();
  const mousePosition3D = useRef(new THREE.Vector3());
  const contextLossTimeoutRef = useRef<NodeJS.Timeout>();

  // Handle mouse position updates
  const handleMouseUpdate = useCallback((position: THREE.Vector3) => {
    mousePosition3D.current.copy(position);
  }, []);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // WebGL context loss recovery system
  useEffect(() => {
    return () => {
      if (contextLossTimeoutRef.current) {
        clearTimeout(contextLossTimeoutRef.current);
      }
    };
  }, []);

  if (!mounted || prefersReducedMotion) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950 ${className}`}
        style={{ opacity: opacity * 2 }}
      />
    );
  }

  // Fallback rendering during WebGL context loss
  if (contextLost) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950 ${className}`}
        style={{ opacity: opacity * 2 }}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <Canvas
        camera={{
          position: [0, 8, 15],
          fov: 55, // Increased for better view
          near: 0.1,
          far: 50,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
          precision: "highp",
          logarithmicDepthBuffer: true,
        }}
        // SCROLL FIX: Disable R3F's internal event system completely
        events={() => ({ enabled: false, priority: 0, compute: () => null })}
        style={{ pointerEvents: "none", touchAction: "auto" }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        frameloop="always"
        performance={{ min: 0.7, max: 1, debounce: 150 }} // Better performance
        onCreated={({ gl }) => {
          gl.sortObjects = false;
          gl.outputColorSpace = THREE.SRGBColorSpace;

          // WebGL context loss recovery handlers
          const canvas = gl.domElement;

          const handleContextLost = (event: Event) => {
            event.preventDefault();
            console.warn(
              "WebGL context lost in SectionBackground3D, attempting recovery...",
            );
            setContextLost(true);

            // Attempt recovery after a delay
            contextLossTimeoutRef.current = setTimeout(() => {
              setContextLost(false);
            }, 1000);
          };

          const handleContextRestored = () => {
            console.log("WebGL context restored in SectionBackground3D");
            setContextLost(false);
            if (contextLossTimeoutRef.current) {
              clearTimeout(contextLossTimeoutRef.current);
            }
          };

          canvas.addEventListener("webglcontextlost", handleContextLost);
          canvas.addEventListener(
            "webglcontextrestored",
            handleContextRestored,
          );

          // Cleanup function stored for potential use
          (gl as any).contextCleanup = () => {
            canvas.removeEventListener("webglcontextlost", handleContextLost);
            canvas.removeEventListener(
              "webglcontextrestored",
              handleContextRestored,
            );
          };
        }}
      >
        <fog attach="fog" args={["#000000", 15, 35]} />
        <ConfigurableGridWithConnections
          gridSize={gridSize}
          spacing={spacing}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          accentColor={accentColor}
          intensity={intensity}
          waveAmplitude={waveAmplitude}
          mousePosition3D={mousePosition3D.current}
          isScrolling={isScrolling}
        />
        <EnhancedCameraControls
          enabled={enableParallax}
          onMouseUpdate={handleMouseUpdate}
          isScrolling={isScrolling}
        />
      </Canvas>
    </div>
  );
}

// Enhanced grid and connections component for sections
function ConfigurableGridWithConnections({
  gridSize = 9, // Increased default
  spacing = 2.8, // Slightly decreased
  primaryColor = "#3B82F6",
  secondaryColor = "#8B5CF6",
  accentColor = "#10B981",
  intensity = 1.0, // Increased default
  waveAmplitude = 1.2, // Increased default
  mousePosition3D,
  isScrolling = false,
}: {
  gridSize?: number;
  spacing?: number;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  intensity?: number;
  waveAmplitude?: number;
  mousePosition3D?: THREE.Vector3;
  isScrolling?: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  // SCROLL FREEZE FIX: Removed redundant scroll listener - using centralized state
  const scrollProgress = useRef(0);
  const isMobile = useIsMobile();

  // Create responsive grid with enhanced performance
  const { positions, count } = useMemo(() => {
    const actualGridSize = isMobile ? Math.max(6, gridSize - 2) : gridSize; // Increased from 5
    const actualSpacing = isMobile ? spacing * 1.15 : spacing; // Slightly reduced
    const positions = [];

    for (let x = 0; x < actualGridSize; x++) {
      for (let z = 0; z < actualGridSize; z++) {
        const posX = (x - actualGridSize / 2) * actualSpacing;
        const posY = Math.sin((x + z) * 0.12) * 0.3; // Increased from 0.15
        const posZ = (z - actualGridSize / 2) * actualSpacing;

        positions.push(posX, posY, posZ);
      }
    }

    return {
      positions: new Float32Array(positions),
      count: actualGridSize * actualGridSize,
    };
  }, [gridSize, spacing, isMobile]);

  // Set up grid instances
  useEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3] ?? 0;
      const y = positions[i * 3 + 1] ?? 0;
      const z = positions[i * 3 + 2] ?? 0;

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, count]);

  // Enhanced wave animation with improved mouse interaction
  useFrame((state) => {
    if (!meshRef.current) return;

    // SCROLL FREEZE FIX: Skip heavy operations during active scrolling
    if (isScrolling) return;

    const time = state.clock.elapsedTime;
    const scroll = scrollProgress.current;
    const dummy = new THREE.Object3D();
    const mouse3D = mousePosition3D || new THREE.Vector3(0, 0, 0);

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3] ?? 0;
      const originalY = positions[i * 3 + 1] ?? 0;
      const z = positions[i * 3 + 2] ?? 0;

      const nodePosition = new THREE.Vector3(x, originalY, z);
      const distanceToMouse = nodePosition.distanceTo(mouse3D);

      // Enhanced mouse attraction for sections
      if (!isMobile && distanceToMouse < 5) {
        // Increased from 4
        const attraction = Math.max(0, 1 - distanceToMouse / 5);
        const pullStrength = attraction * 0.3; // Increased from 0.05

        const attractionVector = new THREE.Vector3()
          .subVectors(mouse3D, nodePosition)
          .multiplyScalar(pullStrength);

        const attractedPosition = nodePosition.clone().add(attractionVector);

        // Enhanced floating with mouse influence
        const floatX = Math.sin(time * 0.8 + i) * 0.06 * (1 + attraction * 0.5); // Increased
        const floatY =
          Math.cos(time * 0.6 + i * 0.5) * 0.04 * (1 + attraction * 0.5);

        dummy.position.set(
          attractedPosition.x + floatX,
          attractedPosition.y + floatY,
          attractedPosition.z,
        );

        // Enhanced scaling
        const scale = 1 + attraction * 0.3; // Increased from 0.1
        dummy.scale.setScalar(scale);
      } else {
        // Enhanced wave animation
        const waveFrequency = 0.07; // Slightly increased
        const waveSpeed = 0.15; // Increased from 0.1

        const wavePhase = z * waveFrequency + scroll * Math.PI * 1.8; // Increased from 1.5
        const primaryWave = Math.sin(wavePhase) * waveAmplitude;

        const secondaryPhase = x * 0.04 + z * 0.03 + time * waveSpeed; // Increased
        const secondaryWave = Math.sin(secondaryPhase) * (waveAmplitude * 0.25); // Increased from 0.2

        const finalY = originalY + primaryWave + secondaryWave;

        // Enhanced floating motion
        const floatX = Math.sin(time * 0.5 + i) * 0.03; // Increased from 0.015
        const floatZ = Math.cos(time * 0.4 + i * 0.5) * 0.02; // Increased from 0.01

        dummy.position.set(x + floatX, finalY, z + floatZ);

        // Enhanced scale variation
        const scale = 1 + Math.sin(wavePhase) * 0.08; // Increased from 0.03
        dummy.scale.setScalar(scale);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <SectionNeuralConnections
        mousePosition3D={mousePosition3D}
        positions={positions}
        count={count}
        intensity={intensity}
        isScrolling={isScrolling}
      />
      <directionalLight
        position={[0, 15, 5]}
        intensity={intensity * 1.0}
        color={primaryColor}
      />
      <ambientLight intensity={0.12} color={secondaryColor} />
      <pointLight
        color={accentColor}
        intensity={intensity * 0.4}
        position={[10, 5, 8]}
        distance={20}
      />
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        frustumCulled={false}
      >
        <sphereGeometry
          args={[isMobile ? 0.07 : 0.09, isMobile ? 6 : 8, isMobile ? 6 : 8]}
        />
        <MeshTransmissionMaterial
          color="#ffffff"
          thickness={0.15}
          roughness={0.08}
          transmission={0.88}
          ior={1.4}
          chromaticAberration={isMobile ? 0.004 : 0.015}
          anisotropy={0.05}
          distortion={0.05}
          distortionScale={0.15}
          temporalDistortion={isMobile ? 0.015 : 0.04}
          clearcoat={0.7}
          attenuationDistance={0.35}
          attenuationColor={primaryColor}
          envMapIntensity={0.5}
          samples={isMobile ? 3 : 4}
          resolution={isMobile ? 32 : 64}
        />
      </instancedMesh>
    </>
  );
}
