'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { VideoEntrance } from './video-entrance';

interface EntranceContextType {
  showEntrance: boolean;
  completeEntrance: () => void;
}

const EntranceContext = createContext<EntranceContextType | null>(null);

export function useEntrance() {
  const context = useContext(EntranceContext);
  if (!context) {
    throw new Error('useEntrance must be used within EntranceProvider');
  }
  return context;
}

interface EntranceProviderProps {
  children: ReactNode;
}

export function EntranceProvider({ children }: EntranceProviderProps) {
  const [showEntrance, setShowEntrance] = useState(true);

  const completeEntrance = () => {
    // eslint-disable-next-line no-console
    console.log('🎯 FIELDPORTER: Entrance completed, revealing main content');
    setShowEntrance(false);
  };

  return (
    <EntranceContext.Provider value={{ showEntrance, completeEntrance }}>
      {showEntrance && <VideoEntrance onComplete={completeEntrance} />}
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          showEntrance ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          visibility: showEntrance ? 'hidden' : 'visible',
          position: showEntrance ? 'fixed' : 'static',
          top: showEntrance ? '-9999px' : 'auto',
        }}
      >
        {children}
      </div>
    </EntranceContext.Provider>
  );
}
