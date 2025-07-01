"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="w-6 h-6 border-2 border-white/20 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}
