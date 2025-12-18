"use client";

import { useIsScrolling } from "@/hooks";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Hook for detecting mobile devices with memoization
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

// Enhanced camera controls for circuit interaction
function CircuitCameraControls({
  onMouseUpdate,
  isScrolling = false,
}: {
  onMouseUpdate?: (position: THREE.Vector3) => void;
  isScrolling?: boolean;
}) {
  const { camera, mouse, viewport } = useThree();
  const isMobile = useIsMobile();
  // SCROLL FREEZE FIX: Removed redundant scroll listener - using centralized state
  const scrollProgress = useRef(0);
  const mousePosition3D = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (isMobile) return;
    // SCROLL FREEZE FIX: Skip heavy operations during scrolling
    if (isScrolling) return;

    // Convert mouse to 3D world coordinates for circuit interaction
    const mouseX = (mouse.x * viewport.width) / 4;
    const mouseY = (mouse.y * viewport.height) / 4;
    mousePosition3D.current.set(mouseX, mouseY, 0);

    if (onMouseUpdate) {
      onMouseUpdate(mousePosition3D.current);
    }

    // Enhanced mouse parallax effect for circuit aesthetic
    const targetX = mouse.x * 0.4;
    const targetY = mouse.y * 0.25;

    // Scroll-based depth movement
    const scrollDepth = scrollProgress.current * 1.5;
    const targetZ = 15 - scrollDepth;

    // Smooth camera interpolation
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.008);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      8 + targetY,
      0.008,
    );
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.005);
  });

  return null;
}

// Data flow particle system for circuit paths
function DataFlowParticles({
  connections,
  activeService,
  particlePool,
  isMobile,
  isScrolling = false,
}: {
  connections: any[];
  activeService: string | null;
  particlePool: React.MutableRefObject<any[]>;
  isMobile: boolean;
  isScrolling?: boolean;
}) {
  const particlesRef = useRef<THREE.Group>(null);
  const activeParticles = useRef<any[]>([]);
  const lastUpdateTime = useRef(0);

  // Initialize particle pool following hero's memory management patterns
  useEffect(() => {
    if (isMobile) return; // Disable particles on mobile

    const pool: Array<{
      geometry: THREE.SphereGeometry;
      material: THREE.MeshBasicMaterial;
      mesh: THREE.Mesh | null;
      active: boolean;
    }> = [];

    for (let i = 0; i < 40; i++) {
      const geometry = new THREE.SphereGeometry(0.08, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.8,
      });
      pool.push({ geometry, material, mesh: null, active: false });
    }
    particlePool.current = pool;

    return () => {
      pool.forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      });
    };
  }, [isMobile, particlePool]);

  // Service color mapping
  const serviceColors = useMemo(
    () => ({
      "strategic-research": new THREE.Color("#10B981"), // Emerald
      "rapid-development": new THREE.Color("#3B82F6"), // Blue
      "workflow-optimization": new THREE.Color("#8B5CF6"), // Purple
      "ai-training": new THREE.Color("#F59E0B"), // Orange
    }),
    [],
  );

  // Spawn particles for active service
  useEffect(() => {
    if (isMobile || !activeService || !particlesRef.current) return;

    // Clear existing particles
    activeParticles.current.forEach((particle) => {
      if (particle.mesh) {
        particlesRef.current?.remove(particle.mesh);
        particle.active = false;
      }
    });
    activeParticles.current = [];

    // Get service-specific circuit paths
    const serviceConnections = connections.filter((_, index) => {
      // Map connections to service regions
      const serviceRegions = {
        "strategic-research": [0, 1, 2, 3, 4, 5],
        "rapid-development": [6, 7, 8, 9, 10, 11],
        "workflow-optimization": [12, 13, 14, 15, 16, 17],
        "ai-training": [18, 19, 20, 21, 22, 23],
      };

      const region =
        serviceRegions[activeService as keyof typeof serviceRegions] || [];
      return region.includes(index % 24);
    });

    // Spawn particles along service circuits
    serviceConnections.slice(0, 8).forEach((connection, index) => {
      const availableParticle = particlePool.current.find((p) => !p.active);
      if (!availableParticle) return;

      availableParticle.active = true;
      availableParticle.progress = 0;
      availableParticle.speed = 0.5 + Math.random() * 0.5;
      availableParticle.path = connection.path;
      availableParticle.color =
        serviceColors[activeService as keyof typeof serviceColors];

      if (!availableParticle.mesh) {
        availableParticle.mesh = new THREE.Mesh(
          availableParticle.geometry,
          availableParticle.material,
        );
      }

      availableParticle.material.color.copy(availableParticle.color);
      particlesRef.current?.add(availableParticle.mesh);
      activeParticles.current.push(availableParticle);
    });
  }, [activeService, connections, isMobile, particlePool, serviceColors]);

  // Animate particles along circuit paths
  useFrame((state, delta) => {
    if (isMobile || !particlesRef.current) return;
    // SCROLL FREEZE FIX: Skip heavy operations during scrolling
    if (isScrolling) return;

    const frameStart = performance.now();

    activeParticles.current.forEach((particle) => {
      if (!particle.active || !particle.mesh || !particle.path) return;

      // Move along circuit path
      particle.progress += particle.speed * delta;

      if (particle.progress >= 1) {
        // Recycle particle
        particle.progress = 0;
      }

      // Interpolate position along path segments
      if (particle.path.length >= 2) {
        const segmentCount = particle.path.length - 1;
        const segmentProgress = particle.progress * segmentCount;
        const segmentIndex = Math.floor(segmentProgress);
        const localProgress = segmentProgress - segmentIndex;

        const start = particle.path[segmentIndex];
        const end =
          particle.path[Math.min(segmentIndex + 1, particle.path.length - 1)];

        if (start && end) {
          particle.mesh.position.lerpVectors(start, end, localProgress);
        }
      }

      // Abort if frame budget exceeded (following hero's pattern)
      if (performance.now() - frameStart > 6) return;
    });
  });

  return <group ref={particlesRef} />;
}

// Technical circuit grid with orthogonal connections
function TechnicalCircuitGrid({
  mousePosition3D,
  hoveredService,
  gridSize = 9,
  spacing = 3.5,
  isScrolling = false,
}: {
  mousePosition3D?: THREE.Vector3;
  hoveredService: string | null;
  gridSize?: number;
  spacing?: number;
  isScrolling?: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const connectionsRef = useRef<THREE.Group>(null);
  const isMobile = useIsMobile();

  // Resource pools following hero's memory management
  const geometryPool = useRef<THREE.BufferGeometry[]>([]);
  const materialPool = useRef<THREE.LineBasicMaterial[]>([]);
  const particlePool = useRef<any[]>([]);

  // Initialize resource pools
  useEffect(() => {
    // Geometry pool for connections
    for (let i = 0; i < 30; i++) {
      const geometry = new THREE.BufferGeometry();
      geometryPool.current.push(geometry);
    }

    // Material pool for circuit connections
    for (let i = 0; i < 90; i++) {
      const material = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0.4,
      });
      materialPool.current.push(material);
    }

    return () => {
      geometryPool.current.forEach((geometry) => geometry.dispose());
      materialPool.current.forEach((material) => material.dispose());
      geometryPool.current = [];
      materialPool.current = [];
    };
  }, []);

  // Create circuit board grid layout
  const { positions, count, connections } = useMemo(() => {
    const actualGridSize = isMobile ? 6 : gridSize;
    const actualSpacing = isMobile ? spacing * 1.2 : spacing;
    const positions: number[] = [];
    const connections: Array<{
      start: THREE.Vector3;
      end: THREE.Vector3;
      path: THREE.Vector3[];
      type: string;
    }> = [];

    // Create grid nodes with circuit board layout
    for (let x = 0; x < actualGridSize; x++) {
      for (let z = 0; z < actualGridSize; z++) {
        const posX = (x - actualGridSize / 2) * actualSpacing;
        const posY = 0; // Flat circuit board
        const posZ = (z - actualGridSize / 2) * actualSpacing;

        positions.push(posX, posY, posZ);
      }
    }

    // Create orthogonal circuit connections (Manhattan routing)
    const nodePositions: THREE.Vector3[] = [];
    for (let i = 0; i < positions.length; i += 3) {
      nodePositions.push(
        new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]),
      );
    }

    nodePositions.forEach((node1, i) => {
      nodePositions.forEach((node2, j) => {
        if (i >= j) return;

        const dx = Math.abs(node1.x - node2.x);
        const dz = Math.abs(node1.z - node2.z);

        // Only connect orthogonally adjacent nodes
        if (
          (dx < actualSpacing * 1.1 && dz < 0.1) ||
          (dx < 0.1 && dz < actualSpacing * 1.1)
        ) {
          const path = createCircuitPath(node1, node2);
          connections.push({ start: node1, end: node2, path, type: "circuit" });
        }
      });
    });

    return {
      positions: new Float32Array(positions),
      count: actualGridSize * actualGridSize,
      connections,
    };
  }, [gridSize, spacing, isMobile]);

  // Generate 90-degree circuit paths
  function createCircuitPath(
    start: THREE.Vector3,
    end: THREE.Vector3,
  ): THREE.Vector3[] {
    const path: THREE.Vector3[] = [start.clone()];

    // Manhattan routing - prefer horizontal then vertical
    const preferHorizontal = Math.random() > 0.5;

    if (Math.abs(start.x - end.x) > 0.1 && Math.abs(start.z - end.z) > 0.1) {
      if (preferHorizontal) {
        // Horizontal first, then vertical
        path.push(new THREE.Vector3(end.x, start.y, start.z));
        path.push(new THREE.Vector3(end.x, end.y, end.z));
      } else {
        // Vertical first, then horizontal
        path.push(new THREE.Vector3(start.x, end.y, end.z));
        path.push(new THREE.Vector3(end.x, end.y, end.z));
      }
    }

    path.push(end.clone());
    return path;
  }

  // Service color mapping
  const serviceColors = useMemo(
    () => ({
      "strategic-research": new THREE.Color("#10B981"),
      "rapid-development": new THREE.Color("#3B82F6"),
      "workflow-optimization": new THREE.Color("#8B5CF6"),
      "ai-training": new THREE.Color("#F59E0B"),
      default: new THREE.Color("#3B82F6"),
    }),
    [],
  );

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

  // Render circuit connections with service highlighting
  useFrame((state) => {
    if (!connectionsRef.current) return;
    // SCROLL FREEZE FIX: Skip heavy operations during scrolling
    if (isScrolling) return;

    // Clear previous connections
    connectionsRef.current.clear();

    const mouse3D = mousePosition3D || new THREE.Vector3(0, 0, 0);
    const serviceColor = hoveredService
      ? serviceColors[hoveredService as keyof typeof serviceColors] ||
        serviceColors.default
      : serviceColors.default;

    connections.forEach((connection, index) => {
      if (
        !connection.path ||
        connection.path.length < 2 ||
        !connectionsRef.current
      )
        return;

      // Determine if this connection should be highlighted
      const isServiceConnection =
        hoveredService && getServiceRegion(hoveredService).includes(index % 24);
      const opacity = isServiceConnection ? 0.8 : 0.3;
      const color = isServiceConnection
        ? serviceColor
        : new THREE.Color("#3B82F6");

      // Create circuit path geometry
      const geometry = new THREE.BufferGeometry().setFromPoints(
        connection.path,
      );
      const material = new THREE.LineBasicMaterial({
        color: color,
        opacity: opacity,
        transparent: true,
        linewidth: isServiceConnection ? 2 : 1,
      });

      const line = new THREE.Line(geometry, material);
      connectionsRef.current.add(line);
    });
  });

  // Get service-specific node regions
  function getServiceRegion(service: string): number[] {
    const regions = {
      "strategic-research": [0, 1, 2, 3, 4, 5],
      "rapid-development": [6, 7, 8, 9, 10, 11],
      "workflow-optimization": [12, 13, 14, 15, 16, 17],
      "ai-training": [18, 19, 20, 21, 22, 23],
    };
    return regions[service as keyof typeof regions] || [];
  }

  // Animate circuit nodes with enhanced mouse interaction
  useFrame((state) => {
    if (!meshRef.current) return;
    // SCROLL FREEZE FIX: Skip heavy operations during scrolling
    if (isScrolling) return;

    const time = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();
    const mouse3D = mousePosition3D || new THREE.Vector3(0, 0, 0);

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3] ?? 0;
      const y = positions[i * 3 + 1] ?? 0;
      const z = positions[i * 3 + 2] ?? 0;

      const nodePosition = new THREE.Vector3(x, y, z);
      const distanceToMouse = nodePosition.distanceTo(mouse3D);

      // Enhanced mouse attraction for circuit nodes
      if (!isMobile && distanceToMouse < 5) {
        const attraction = Math.max(0, 1 - distanceToMouse / 5);
        const pullStrength = attraction * 0.2;

        const attractionVector = new THREE.Vector3()
          .subVectors(mouse3D, nodePosition)
          .multiplyScalar(pullStrength);

        const attractedPosition = nodePosition.clone().add(attractionVector);

        dummy.position.copy(attractedPosition);
        const scale = 1 + attraction * 0.3;
        dummy.scale.setScalar(scale);
      } else {
        // Subtle pulsing animation for circuit nodes
        const pulse = 1 + Math.sin(time * 2 + i * 0.5) * 0.05;
        dummy.position.set(x, y, z);
        dummy.scale.setScalar(pulse);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <group ref={connectionsRef} />
      <DataFlowParticles
        connections={connections}
        activeService={hoveredService}
        particlePool={particlePool}
        isMobile={isMobile}
        isScrolling={isScrolling}
      />
      <directionalLight position={[0, 15, 5]} intensity={0.8} color="#3B82F6" />
      <ambientLight intensity={0.15} color="#8B5CF6" />
      <pointLight
        color="#10B981"
        intensity={0.4}
        position={[10, 5, 8]}
        distance={20}
      />

      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        frustumCulled={false}
      >
        <boxGeometry
          args={[isMobile ? 0.12 : 0.15, 0.08, isMobile ? 0.12 : 0.15]}
        />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#3B82F6"
          emissiveIntensity={0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </instancedMesh>
    </>
  );
}

// Main Technical Circuit Background component
export function TechnicalCircuitBackground({
  hoveredService,
  className = "",
}: {
  hoveredService: string | null;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  // SCROLL FREEZE FIX: Use centralized scroll state
  const isScrolling = useIsScrolling();
  const mousePosition3D = useRef(new THREE.Vector3());

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseUpdate = useCallback((position: THREE.Vector3) => {
    mousePosition3D.current.copy(position);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950 opacity-80 ${className}`}
      />
    );
  }

  if (contextLost) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950 opacity-80 ${className}`}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        // SCROLL FIX: Disable R3F's internal event system completely
        events={() => ({ enabled: false, priority: 0, compute: () => null })}
        style={{ pointerEvents: "none", touchAction: "auto" }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));

          // Get canvas from gl context
          const canvas = gl.domElement;
          gl.setSize(canvas.clientWidth, canvas.clientHeight);

          // WebGL context loss handling
          const handleContextLost = (event: Event) => {
            event.preventDefault();
            console.warn(
              "WebGL context lost in TechnicalCircuitBackground, attempting recovery...",
            );
            setContextLost(true);

            setTimeout(() => {
              setContextLost(false);
            }, 1000);
          };

          const handleContextRestored = () => {
            console.log("WebGL context restored in TechnicalCircuitBackground");
            setContextLost(false);
          };

          canvas.addEventListener("webglcontextlost", handleContextLost);
          canvas.addEventListener(
            "webglcontextrestored",
            handleContextRestored,
          );
        }}
      >
        <fog attach="fog" args={["#000000", 15, 35]} />
        <TechnicalCircuitGrid
          mousePosition3D={mousePosition3D.current}
          hoveredService={hoveredService}
          gridSize={9}
          spacing={3.5}
          isScrolling={isScrolling}
        />
        <CircuitCameraControls
          onMouseUpdate={handleMouseUpdate}
          isScrolling={isScrolling}
        />
      </Canvas>
    </div>
  );
}
