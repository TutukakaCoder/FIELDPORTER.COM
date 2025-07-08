"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface NetworkNode {
  id: string;
  x: number;
  y: number;
  layer: 'data' | 'processing' | 'insights';
  size: number;
  intensity: number;
  pulsePhase: number;
  connections: string[];
}

interface FlowingParticle {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  intensity: number;
  color: string;
  fromNode: string;
  toNode: string;
}

interface SubtleAIPortfolioBackgroundProps {
  mousePosition?: { x: number; y: number } | null;
  hoveredSection?: string;
  className?: string;
}

export function SubtleAIPortfolioBackground({ 
  mousePosition, 
  hoveredSection,
  className = "" 
}: SubtleAIPortfolioBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const nodesRef = useRef<NetworkNode[]>([]);
  const particlesRef = useRef<FlowingParticle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Neural network color scheme - ultra subtle
  const colors = useMemo(() => ({
    data: { 
      node: 'rgba(59, 130, 246, 0.25)',      // Blue - very subtle
      connection: 'rgba(59, 130, 246, 0.08)', 
      particle: 'rgba(59, 130, 246, 0.4)' 
    },
    processing: { 
      node: 'rgba(168, 85, 247, 0.25)',      // Purple - very subtle
      connection: 'rgba(168, 85, 247, 0.08)', 
      particle: 'rgba(168, 85, 247, 0.4)' 
    },
    insights: { 
      node: 'rgba(16, 185, 129, 0.25)',      // Green - very subtle
      connection: 'rgba(16, 185, 129, 0.08)', 
      particle: 'rgba(16, 185, 129, 0.4)' 
    }
  }), []);

  // Initialize neural network structure
  const initializeNetwork = useCallback((width: number, height: number) => {
    const nodes: NetworkNode[] = [];
    
    // Data layer (left side) - Input nodes
    for (let i = 0; i < 6; i++) {
      nodes.push({
        id: `data-${i}`,
        x: width * 0.15,
        y: height * (0.2 + (i * 0.12)),
        layer: 'data',
        size: 3 + Math.random() * 2,
        intensity: 0.3 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [`processing-${Math.floor(i/2)}`, `processing-${Math.floor(i/2) + 1}`]
      });
    }

    // Processing layer (center) - Hidden layer
    for (let i = 0; i < 4; i++) {
      nodes.push({
        id: `processing-${i}`,
        x: width * 0.5,
        y: height * (0.25 + (i * 0.16)),
        layer: 'processing',
        size: 4 + Math.random() * 3,
        intensity: 0.4 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [`insights-${Math.floor(i/2)}`, `insights-${Math.floor(i/2) + 1}`]
      });
    }

    // Insights layer (right side) - Output nodes
    for (let i = 0; i < 3; i++) {
      nodes.push({
        id: `insights-${i}`,
        x: width * 0.85,
        y: height * (0.3 + (i * 0.2)),
        layer: 'insights',
        size: 5 + Math.random() * 3,
        intensity: 0.5 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: []
      });
    }

    nodesRef.current = nodes;
  }, []);

  // Create flowing particles along connections
  const createParticle = useCallback((fromNode: NetworkNode, toNode: NetworkNode) => {
    const particle: FlowingParticle = {
      id: `particle-${fromNode.id}-${toNode.id}-${Date.now()}`,
      x: fromNode.x,
      y: fromNode.y,
      targetX: toNode.x,
      targetY: toNode.y,
      progress: 0,
      speed: 0.008 + Math.random() * 0.004, // Very slow, smooth movement
      intensity: 0.6 + Math.random() * 0.4,
      color: colors[fromNode.layer].particle,
      fromNode: fromNode.id,
      toNode: toNode.id
    };
    
    particlesRef.current.push(particle);
  }, [colors]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
        canvasRef.current.width = rect.width * window.devicePixelRatio;
        canvasRef.current.height = rect.height * window.devicePixelRatio;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        initializeNetwork(rect.width, rect.height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [initializeNetwork]);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      // Frame rate limiting for consistent performance
      if (currentTime - lastTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      const { width, height } = dimensions;
      if (width === 0 || height === 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas with minimal operations
      ctx.clearRect(0, 0, width, height);

      // Draw connections first (behind nodes)
      nodesRef.current.forEach(node => {
        node.connections.forEach(connectionId => {
          const targetNode = nodesRef.current.find(n => n.id === connectionId);
          if (!targetNode) return;

          // Ultra-subtle connection lines
          ctx.strokeStyle = colors[node.layer].connection;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();
        });
      });

      // Update and draw flowing particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.progress += particle.speed;
        
        if (particle.progress >= 1) {
          return false; // Remove completed particles
        }

        // Smooth interpolation
        const easeProgress = particle.progress * particle.progress * (3 - 2 * particle.progress);
        particle.x = particle.x + (particle.targetX - particle.x) * particle.speed * 2;
        particle.y = particle.y + (particle.targetY - particle.y) * particle.speed * 2;

        // Draw particle as small glowing dot
        const alpha = Math.sin(particle.progress * Math.PI) * particle.intensity;
        ctx.fillStyle = particle.color.replace('0.4)', `${alpha * 0.8})`);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Draw nodes with subtle pulsing
      const time = currentTime * 0.001;
      nodesRef.current.forEach(node => {
        // Mouse proximity effect (very subtle)
        let proximityMultiplier = 1;
        if (mousePosition) {
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - node.x, 2) + 
            Math.pow(mousePosition.y - node.y, 2)
          );
          if (distance < 200) {
            proximityMultiplier = 1 + (1 - distance / 200) * 0.3; // Very subtle
          }
        }

        // Section hover effect
        let sectionMultiplier = 1;
        if (hoveredSection === 'projects' && node.layer === 'data') {
          sectionMultiplier = 1.2;
        } else if (hoveredSection === 'industries' && node.layer === 'processing') {
          sectionMultiplier = 1.2;
        } else if (hoveredSection === 'testimonials' && node.layer === 'insights') {
          sectionMultiplier = 1.2;
        }

        // Gentle pulsing animation
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.2 + 0.8;
        const finalIntensity = node.intensity * pulse * proximityMultiplier * sectionMultiplier;
        const finalSize = node.size * (0.8 + pulse * 0.4) * proximityMultiplier;

        // Draw node with glow effect
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, finalSize * 3
        );
        gradient.addColorStop(0, colors[node.layer].node.replace('0.25)', `${finalIntensity * 0.6})`));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, finalSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core node
        ctx.fillStyle = colors[node.layer].node.replace('0.25)', `${finalIntensity * 0.8})`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, finalSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Occasionally spawn new particles (very sparingly)
      if (Math.random() < 0.003) { // Very low spawn rate
        const sourceNodes = nodesRef.current.filter(n => n.connections.length > 0);
        if (sourceNodes.length > 0) {
          const sourceNode = sourceNodes[Math.floor(Math.random() * sourceNodes.length)];
          if (sourceNode && sourceNode.connections.length > 0) {
            const targetId = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)];
            const targetNode = nodesRef.current.find(n => n.id === targetId);
            if (targetNode) {
              createParticle(sourceNode, targetNode);
            }
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, mousePosition, hoveredSection, createParticle, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        opacity: 0.7 // Very subtle overall
      }}
    />
  );
} 