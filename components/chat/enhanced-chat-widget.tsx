/* eslint-disable react/self-closing-comp, react/no-unescaped-entities */
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EnterpriseInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AlertCircle, Bot, Calendar, MessageCircle, RefreshCw, Send, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MessageManager, type Message } from './message-manager';

interface EnhancedChatWidgetProps {
  className?: string;
}

export function EnhancedChatWidget({ className }: EnhancedChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messageManager] = useState(() => new MessageManager());
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize messages and email from MessageManager
  useEffect(() => {
    const initialMessages = messageManager.getMessages();
    if (initialMessages.length === 0) {
      // Add welcome message if no conversation exists
      const welcomeMessage = messageManager.addMessage(
        "Hello! I'm FIELDPORTER's Agent. I can help you understand our AI strategy consulting services and how we can transform your business. What would you like to know?",
        'assistant'
      );
      if (welcomeMessage) {
        setMessages([welcomeMessage]);
      }
    } else {
      setMessages(initialMessages);
    }

    const email = messageManager.getUserEmail();
    if (email) {
      setUserEmail(email);
    }

    // Check if should show email prompt
    setShowEmailPrompt(messageManager.shouldShowEmailPrompt());
  }, [messageManager]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setError(null);

    // Add user message
    const userMessage = messageManager.addMessage(inputValue, 'user');
    if (!userMessage) {
      setError('Failed to send message. Please check your input and try again.');
      return;
    }

    setMessages(messageManager.getMessages());
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate AI response (will be replaced with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

      const responses = [
        'That&apos;s a great question about AI strategy. At FIELDPORTER, we specialize in helping enterprises navigate AI transformation with practical, results-driven approaches. Our unique advantage is that we build AI-powered businesses ourselves, so we understand both the strategic and operational challenges.',
        'AI implementation success depends on having the right strategy from day one. We work with Fortune 500 companies to develop comprehensive AI roadmaps that align with business objectives. Would you like to discuss your specific AI challenges?',
        'Our approach combines strategic consulting with hands-on implementation. Unlike traditional consultancies, we&apos;ve built our own AI-powered ventures, giving us real-world experience in what actually works. What industry are you in?',
        'Enterprise AI transformation requires more than just technology - it needs organizational change management, data strategy, and clear ROI metrics. We help companies navigate this complexity. Would you like to schedule a consultation to discuss your specific needs?',
      ];

      const responseContent =
        responses[Math.floor(Math.random() * responses.length)] ||
        'I&apos;m here to help you with AI strategy questions. How can I assist you today?';

      const assistantMessage = messageManager.addMessage(responseContent, 'assistant');

      if (assistantMessage) {
        messageManager.updateMessageStatus(userMessage.id, 'sent');
        setMessages(messageManager.getMessages());

        // Check if should show email prompt
        setShowEmailPrompt(messageManager.shouldShowEmailPrompt());
      } else {
        throw new Error('Failed to process AI response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      messageManager.updateMessageStatus(userMessage.id, 'failed');
      setMessages(messageManager.getMessages());
      setError('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryMessage = (messageId: string) => {
    const retryMessage = messageManager.retryMessage(messageId);
    if (retryMessage) {
      setMessages(messageManager.getMessages());
      setError(null);
      // Trigger resend logic here
      handleSendMessage();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmailSubmit = () => {
    if (userEmail.trim()) {
      messageManager.setUserEmail(userEmail);
      setShowEmailPrompt(false);

      const emailMessage = messageManager.addMessage(
        `Thank you for providing your email (${userEmail}). I&apos;ll make sure our team follows up with you. In the meantime, feel free to continue asking about our AI consulting services.`,
        'assistant'
      );

      if (emailMessage) {
        setMessages(messageManager.getMessages());
      }
    }
  };

  const handleBookConsultation = () => {
    const bookingMessage = messageManager.addMessage(
      'I&apos;d be happy to help you schedule a consultation with our AI strategy team. Please visit our contact page or call us directly at your convenience. Our principals are available for strategic discussions about your AI transformation needs.',
      'assistant'
    );

    if (bookingMessage) {
      setMessages(messageManager.getMessages());
    }
  };

  const getMessageStatusIcon = (message: Message) => {
    if (message.role === 'assistant') return null;

    switch (message.status) {
      case 'sending':
        return <RefreshCw className='h-3 w-3 animate-spin text-fieldporter-gray' />;
      case 'failed':
        return (
          <button
            onClick={() => handleRetryMessage(message.id)}
            className='text-red-400 hover:text-red-300 transition-colors'
            title='Click to retry'
          >
            <AlertCircle className='h-3 w-3' />
          </button>
        );
      case 'sent':
      default:
        return null;
    }
  };

  return (
    <div className={cn('fixed bottom-6 right-6 z-50', className)}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant='primary'
            size='icon'
            className={cn(
              'h-14 w-14 rounded-full shadow-lg hover:shadow-xl',
              'transition-all duration-300 ease-out',
              'hover:scale-110 active:scale-95',
              'bg-fieldporter-blue hover:bg-fieldporter-blue/90',
              'border-2 border-white/20',
              'animate-pulse-slow'
            )}
            aria-label='Open FIELDPORTER Agent'
          >
            <MessageCircle className='h-6 w-6' />
          </Button>
        </DialogTrigger>

        <DialogContent
          className={cn(
            'sm:max-w-md w-full max-h-[80vh] flex flex-col',
            'md:max-w-lg lg:max-w-xl',
            'p-0 gap-0'
          )}
        >
          <DialogHeader className='p-6 pb-4 border-b border-fieldporter-gray/20'>
            <DialogTitle className='flex items-center gap-3'>
              <div className='h-10 w-10 rounded-full bg-fieldporter-blue/20 flex items-center justify-center'>
                <Bot className='h-5 w-5 text-fieldporter-blue' />
              </div>
              <div>
                <div className='text-lg font-semibold text-fieldporter-white'>
                  FIELDPORTER Agent
                </div>
                <div className='text-sm text-fieldporter-gray font-normal'>
                  AI Strategy Consulting Expert
                </div>
              </div>
            </DialogTitle>
            <DialogDescription className='text-fieldporter-gray/80 mt-2'>
              Get instant insights about our AI consulting services and how we can help transform
              your business.
            </DialogDescription>
          </DialogHeader>

          {/* Error Display */}
          {error && (
            <div className='mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg'>
              <div className='flex items-center gap-2 text-sm text-red-400'>
                <AlertCircle className='h-4 w-4' />
                {error}
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className='flex-1 overflow-y-auto p-6 space-y-4 min-h-[300px] max-h-[400px] scrollbar-thin'>
            {messages.map(message => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className='h-8 w-8 rounded-full bg-fieldporter-blue/20 flex items-center justify-center flex-shrink-0 mt-1'>
                    <Bot className='h-4 w-4 text-fieldporter-blue' />
                  </div>
                )}

                <div className='flex flex-col gap-1 max-w-[80%]'>
                  <div
                    className={cn(
                      'rounded-lg px-4 py-3 text-sm leading-relaxed',
                      message.role === 'user'
                        ? 'bg-fieldporter-blue text-fieldporter-white'
                        : 'bg-bg-fieldporter-secondary border border-fieldporter-gray/20 text-fieldporter-white'
                    )}
                  >
                    {message.content}
                  </div>

                  {/* Message Status */}
                  <div
                    className={cn(
                      'flex items-center gap-1 px-2',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {getMessageStatusIcon(message)}
                    <span className='text-xs text-fieldporter-gray/60'>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className='h-8 w-8 rounded-full bg-fieldporter-gray/20 flex items-center justify-center flex-shrink-0 mt-1'>
                    <User className='h-4 w-4 text-fieldporter-gray' />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className='flex gap-3 justify-start'>
                <div className='h-8 w-8 rounded-full bg-fieldporter-blue/20 flex items-center justify-center flex-shrink-0 mt-1'>
                  <Bot className='h-4 w-4 text-fieldporter-blue' />
                </div>
                <div className='bg-bg-fieldporter-secondary border border-fieldporter-gray/20 rounded-lg px-4 py-3'>
                  <div className='flex space-x-1'>
                    <div className='w-2 h-2 bg-fieldporter-gray rounded-full animate-bounce' />
                    <div
                      className='w-2 h-2 bg-fieldporter-gray rounded-full animate-bounce'
                      style={{ animationDelay: '0.1s' }}
                    />
                    <div
                      className='w-2 h-2 bg-fieldporter-gray rounded-full animate-bounce'
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Prompt */}
            {showEmailPrompt && (
              <div className='bg-fieldporter-purple/10 border border-fieldporter-purple/30 rounded-lg p-4'>
                <div className='text-sm text-fieldporter-white mb-3'>
                  I&apos;d love to continue helping you. Would you like to share your email so our
                  team can follow up with personalized recommendations?
                </div>
                <div className='flex gap-2'>
                  <EnterpriseInput
                    type='email'
                    placeholder='your.email@company.com'
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    className='flex-1 h-10'
                  />
                  <Button
                    variant='fieldporter-purple'
                    size='sm'
                    onClick={handleEmailSubmit}
                    className='px-4'
                  >
                    Submit
                  </Button>
                </div>
                <button
                  onClick={() => setShowEmailPrompt(false)}
                  className='text-xs text-fieldporter-gray hover:text-fieldporter-white mt-2 transition-colors'
                >
                  Skip for now
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className='p-6 pt-4 border-t border-fieldporter-gray/20'>
            <div className='flex gap-2 mb-3'>
              <Button
                variant='fieldporter-secondary'
                size='sm'
                onClick={handleBookConsultation}
                className='flex items-center gap-2 text-xs'
              >
                <Calendar className='h-3 w-3' />
                Book Consultation
              </Button>
            </div>

            <div className='flex gap-2'>
              <EnterpriseInput
                ref={inputRef}
                placeholder='Ask about our AI consulting services...'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className='flex-1'
                disabled={isLoading}
                maxLength={1000}
              />
              <Button
                variant='primary'
                size='icon'
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className='h-12 w-12 flex-shrink-0'
              >
                <Send className='h-4 w-4' />
              </Button>
            </div>

            {/* Character count */}
            <div className='text-xs text-fieldporter-gray/60 mt-1 text-right'>
              {inputValue.length}/1000
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
