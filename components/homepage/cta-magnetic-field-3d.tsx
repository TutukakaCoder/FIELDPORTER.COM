"use client";

// Main component - Simplified to prevent WebGL conflicts
export function CTAMagneticField3D({
  primaryButtonRef,
  secondaryButtonRef,
  isPrimaryHovered,
  isSecondaryHovered,
}: {
  primaryButtonRef: React.RefObject<HTMLButtonElement>;
  secondaryButtonRef: React.RefObject<HTMLButtonElement>;
  isPrimaryHovered: boolean;
  isSecondaryHovered: boolean;
}) {
  // For now, return the mobile version to prevent WebGL conflicts
  // This ensures the page remains functional while we debug the 3D issues
  return <MobileMagneticEffect />;
}

// Premium CSS-based magnetic effect with darker backdrop and refined styling
export function MobileMagneticEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Premium darker gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-transparent to-purple-500/[0.02] dark:from-black/40 dark:via-gray-900/30 dark:to-black/40" />

      {/* Refined magnetic particles with premium styling */}
      <div className="magnetic-particles">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/60 via-blue-500/70 to-indigo-500/60"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animation: `premiumFloat ${6 + (i % 5)}s ${i * 0.25}s infinite ease-in-out`,
              filter: "blur(0.5px)",
              opacity: 0.6,
              zIndex: 1,
              boxShadow: "0 0 8px rgba(59, 130, 246, 0.3)",
            }}
          />
        ))}
      </div>

      {/* Premium subtle glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-2/3 left-2/3 w-20 h-20 bg-blue-400/4 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Elegant moving lines with slower animation */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/15 to-transparent"
            style={{
              top: `${25 + i * 12}%`,
              left: "0%",
              width: "100%",
              animation: `elegantLine ${8 + i * 2}s ${i * 1.2}s infinite ease-in-out`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes premiumFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-12px) translateX(6px) scale(1.1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-6px) translateX(-4px) scale(0.9);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-8px) translateX(3px) scale(1.05);
            opacity: 0.6;
          }
        }

        @keyframes elegantLine {
          0%,
          100% {
            transform: translateX(-120%);
            opacity: 0;
          }
          50% {
            transform: translateX(120%);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
