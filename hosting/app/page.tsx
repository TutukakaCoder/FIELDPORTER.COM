'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// Premium animation variants with sophisticated timing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

// Letter-by-letter reveal for premium typography
const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    rotateX: -90,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

// Enhanced status animation
const statusVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9,
    rotateX: -20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 120,
      damping: 15
    }
  }
};

// Premium hover interactions
const statusHoverVariants = {
  scale: 1.05,
  y: -5,
  rotateX: 5,
  rotateY: -2,
  boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 60px rgba(255,255,255,0.15)",
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 25
  }
};

const statusTapVariants = {
  scale: 0.98,
  y: -2,
  transition: {
    duration: 0.1,
    ease: "easeOut"
  }
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Advanced cursor tracking
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Smooth spring physics for cursor
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  // Split FIELDPORTER into individual letters for animation
  const logoText = "FIELDPORTER";
  const letters = logoText.split("");

  return (
    <>
      {/* Premium cursor follower */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-50 mix-blend-mode-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28
        }}
      />

      {/* Advanced floating particle system with physics-based motion */}
      <div className="particle particle-1"></div>
      <div className="particle particle-2"></div>
      <div className="particle particle-3"></div>
      <div className="particle particle-4"></div>
      
      {/* Ambient lighting effects */}
      <div className="ambient-light"></div>
      
      <motion.div 
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Premium logo with letter-by-letter reveal */}
        <motion.h1 className="logo">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              custom={index}
              style={{ display: 'inline-block', marginRight: letter === ' ' ? '0.5em' : '0' }}
              whileHover={{
                y: -10,
                rotateZ: 5,
                color: "#f0f0f0",
                textShadow: "0 0 30px rgba(255,255,255,0.5)",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        
        {/* Enhanced status badge with premium interactions */}
        <motion.div 
          className="status"
          variants={statusVariants}
          whileHover={statusHoverVariants}
          whileTap={statusTapVariants}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          <motion.span 
            className="status-dot"
            animate={{
              boxShadow: [
                "0 0 15px rgba(74, 222, 128, 0.6), 0 0 30px rgba(74, 222, 128, 0.4)",
                "0 0 25px rgba(74, 222, 128, 0.9), 0 0 50px rgba(74, 222, 128, 0.6)",
                "0 0 15px rgba(74, 222, 128, 0.6), 0 0 30px rgba(74, 222, 128, 0.4)"
              ]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.span>
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: "linear-gradient(90deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Under Construction
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Premium footer with shimmer effect */}
      <motion.div 
        className="footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          delay: 2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{
          scale: 1.05,
          y: -2,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
          }
        }}
      >
        © 2025
      </motion.div>

      {/* Enhanced ambient background effects */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.04) 0%, transparent 50%)",
            "radial-gradient(circle at 75% 75%, rgba(255,255,255,0.04) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 50%)",
            "radial-gradient(circle at 25% 75%, rgba(255,255,255,0.04) 0%, transparent 50%)",
            "radial-gradient(circle at 75% 25%, rgba(255,255,255,0.04) 0%, transparent 50%)",
            "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.04) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </>
  );
}
