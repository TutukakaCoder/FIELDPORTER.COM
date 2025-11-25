"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 animate-fade-in">
      {/* Subtle background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-fieldporter-blue/10 blur-3xl animate-pulse-slow" />
      </div>

      {/* Loading spinner with brand styling */}
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-10 h-10 border-2 border-white/10 rounded-full" />
          {/* Spinning accent */}
          <div className="absolute inset-0 w-10 h-10 border-2 border-transparent border-t-fieldporter-blue rounded-full animate-spin" />
        </div>

        {/* FIELDPORTER text */}
        <span className="text-white/40 text-sm font-medium tracking-wider">
          FIELDPORTER
        </span>
      </div>
    </div>
  );
}
