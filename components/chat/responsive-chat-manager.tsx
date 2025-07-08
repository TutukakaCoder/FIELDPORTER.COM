"use client";

import { useStableMobile } from '@/hooks';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DesktopChatSidebar } from './desktop-chat-sidebar';
import { MobileChatInterface } from './mobile-chat-interface';

interface ResponsiveChatManagerProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  onBookConsultation: () => void;
  className?: string;
}

export function ResponsiveChatManager({
  isOpen,
  onToggle,
  messages,
  inputValue,
  setInputValue,
  onSendMessage,
  isLoading,
  onBookConsultation,
  className = ""
}: ResponsiveChatManagerProps) {
  const isMobile = useStableMobile();
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Hide button when chat is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsButtonVisible(false);
    } else {
      setIsButtonVisible(true);
    }
  }, [isMobile, isOpen]);

  // Auto-animation for new users
  useEffect(() => {
    if (!hasAnimated && !isOpen) {
      const timer = setTimeout(() => {
        // Subtle pulse animation on first load
        const button = document.querySelector('[data-chat-button]');
        if (button) {
          button.classList.add('animate-pulse');
          setTimeout(() => {
            button.classList.remove('animate-pulse');
            setHasAnimated(true);
          }, 2000);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
    
    // Return empty cleanup function for other code paths
    return () => {};
  }, [hasAnimated, isOpen]);

  // Handle close function
  const handleClose = () => {
    onToggle();
  };

  // Chat interface based on device
  const ChatInterface = isMobile ? MobileChatInterface : DesktopChatSidebar;

  return (
    <div className={cn("fixed z-[60]", className)}>
      {/* Chat Button */}
      {isButtonVisible && (
        <motion.button
          data-chat-button
          className={cn(
            "fixed z-[60] transition-all duration-300",
            isMobile 
              ? "bottom-4 right-4 w-14 h-14" 
              : "bottom-6 right-6 w-16 h-16",
            
            // Premium glassmorphism background
            "bg-black/20 backdrop-blur-xl border border-white/10",
            "hover:bg-black/30 hover:border-white/20",
            
            // Subtle glow effect
            "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
            "hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
            
            // Perfect rounded button
            "rounded-2xl",
            
            // Center the icon
            "flex items-center justify-center",
            
            // Touch-friendly
            "touch-manipulation select-none"
          )}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onClick={onToggle}
          aria-label="Open FIELDPORTER Agent"
        >
          <MessageSquare 
            className={cn(
              isMobile ? "w-6 h-6" : "w-7 h-7", 
              "text-white/90"
            )}
            strokeWidth={1.5}
          />
        </motion.button>
      )}

      {/* Chat Interface */}
      <ChatInterface
        isOpen={isOpen}
        onClose={handleClose}
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        onBookConsultation={onBookConsultation}
      />
    </div>
  );
} 