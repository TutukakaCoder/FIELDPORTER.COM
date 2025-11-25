"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Premium pulsing logo mark */}
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fieldporter-blue/20 to-fieldporter-blue/5 animate-pulse-slow" />
          <div
            className="absolute inset-0 w-12 h-12 border border-fieldporter-blue/30 rounded-xl"
            style={{ animation: "spin 3s linear infinite" }}
          />
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-lg bg-fieldporter-blue/10 animate-pulse" />
        </div>
        {/* Subtle loading text */}
        <span className="text-white/40 text-sm font-medium tracking-wider uppercase">
          Loading
        </span>
      </div>
    </div>
  );
}
