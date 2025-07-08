import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // FIELDPORTER Custom Color Palette
      colors: {
        // shadcn/ui CSS Variables
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // FIELDPORTER Brand Colors
        fieldporter: {
          black: '#000000',
          blue: '#0969DA',
          white: '#FFFFFF',
          gray: '#6B7280',
        },
        // Functional Colors
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#06B6D4',
        // Background Variations (renamed to avoid conflict)
        'bg-fieldporter': {
          primary: '#000000',
          secondary: '#0a0a0f',
          tertiary: '#1a1a1f',
        },
        // Glass Effect Colors
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          black: 'rgba(0, 0, 0, 0.1)',
          blue: 'rgba(9, 105, 218, 0.1)',
        },
      },

      // Inter Font Family Configuration
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      // Font Weight Mapping
      fontWeight: {
        ultralight: '100',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },

      // Enhanced Typography Scale with Mobile-First Approach
      fontSize: {
        // Mobile-first Display (Hero Headlines)
        'display-xl': ['clamp(3rem, 8vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.5rem, 4vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],

        // Mobile-optimized Headings
        'heading-xl': ['clamp(1.75rem, 3vw, 2rem)', { lineHeight: '1.25' }],
        'heading-lg': ['clamp(1.5rem, 2.5vw, 1.75rem)', { lineHeight: '1.3' }],
        'heading-md': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3' }],
        'heading-sm': ['clamp(1.125rem, 1.5vw, 1.25rem)', { lineHeight: '1.4' }],

        // Mobile-safe Body Text (16px+ to prevent iOS zoom)
        'body-xl': ['20px', { lineHeight: '1.6' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.6' }], // iOS zoom-safe
        'body-sm': ['16px', { lineHeight: '1.5' }], // Bumped from 14px to prevent zoom
        'body-xs': ['14px', { lineHeight: '1.5' }], // Use sparingly

        // Mobile-specific sizes
        'mobile-hero': ['clamp(2rem, 6vw, 3.5rem)', { lineHeight: '1.1' }],
        'mobile-title': ['clamp(1.5rem, 4vw, 2rem)', { lineHeight: '1.2' }],
        'mobile-body': ['16px', { lineHeight: '1.6' }],
        'mobile-caption': ['14px', { lineHeight: '1.4' }],
      },

      // Enhanced 8px Grid Spacing System with Mobile Touch Targets
      spacing: {
        '0.5': '2px', // 0.25 * 8
        '1': '4px', // 0.5 * 8
        '1.5': '6px', // 0.75 * 8
        '2': '8px', // 1 * 8
        '3': '12px', // 1.5 * 8
        '4': '16px', // 2 * 8
        '5': '20px', // 2.5 * 8
        '6': '24px', // 3 * 8
        '7': '28px', // 3.5 * 8
        '8': '32px', // 4 * 8
        '10': '40px', // 5 * 8
        '11': '44px', // 5.5 * 8 - Mobile touch target minimum
        '12': '48px', // 6 * 8 - Premium touch target
        '14': '56px', // 7 * 8
        '16': '64px', // 8 * 8
        '20': '80px', // 10 * 8
        '24': '96px', // 12 * 8
        '28': '112px', // 14 * 8
        '32': '128px', // 16 * 8
        '36': '144px', // 18 * 8
        '40': '160px', // 20 * 8
        '44': '176px', // 22 * 8
        '48': '192px', // 24 * 8
        '52': '208px', // 26 * 8
        '56': '224px', // 28 * 8
        '60': '240px', // 30 * 8
        '64': '256px', // 32 * 8
        '72': '288px', // 36 * 8
        '80': '320px', // 40 * 8
        '96': '384px', // 48 * 8

        // Mobile-specific spacing
        'mobile-edge': '16px', // Minimum screen edge padding
        'mobile-section': '48px', // Section padding for mobile
        'mobile-component': '24px', // Component spacing
        'touch-target': '44px', // Minimum touch target size
        'touch-target-premium': '48px', // Premium touch target size
      },

      // Enhanced Device Breakpoints with Mobile Focus
      screens: {
        'xs': '320px', // iPhone SE (smallest)
        'sm': '375px', // iPhone 12/13/14 (standard)
        'mobile-lg': '390px', // iPhone 14 Pro
        'mobile-xl': '428px', // iPhone 14 Plus
        'md': '768px', // iPad Mini
        'lg': '1024px', // Desktop small
        'xl': '1280px', // Desktop large
        '2xl': '1536px', // Desktop extra large
        '3xl': '1920px', // Enterprise monitors

        // Touch-specific breakpoints
        'touch': { 'raw': '(pointer: coarse)' },
        'no-touch': { 'raw': '(pointer: fine)' },
        'hover-none': { 'raw': '(hover: none)' },
        'hover-available': { 'raw': '(hover: hover)' },
      },

      // Mobile-Optimized Animation Configuration
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'fade-out': 'fadeOut 200ms ease-in',
        'slide-up': 'slideUp 300ms ease-out',
        'slide-down': 'slideDown 300ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
        'scale-out': 'scaleOut 200ms ease-in',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'animation-delay-1000': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite 1s',
        'animation-delay-2000': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite 2s',
        
        // Mobile-optimized animations (reduced motion consideration)
        'mobile-fade': 'fadeIn 200ms ease-out',
        'mobile-slide': 'slideUp 250ms ease-out',
        'mobile-scale': 'scaleIn 150ms ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },

      // Mobile-Optimized Transition Timing
      transitionDuration: {
        '150': '150ms', // Fast mobile interactions
        '200': '200ms',
        '250': '250ms', // Mobile standard
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },

      // Backdrop Blur for Glassmorphism (mobile-optimized)
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
        'mobile': '8px', // Optimized for mobile performance
      },

      // Enhanced Border Radius with Mobile Touch Considerations
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        none: '0',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
        full: '9999px',
        'mobile': '12px', // Good for mobile touch targets
        'mobile-lg': '16px', // Premium mobile touch targets
      },

      // Enhanced Box Shadow for Mobile Depth
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.25)',
        'glass-lg': '0 16px 64px 0 rgba(0, 0, 0, 0.5)',
        enterprise: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'mobile': '0 4px 12px 0 rgba(0, 0, 0, 0.15)', // Lighter for mobile
        'mobile-hover': '0 8px 24px 0 rgba(0, 0, 0, 0.25)', // Mobile touch feedback
      },

      // Mobile-Specific Utilities
      minHeight: {
        'touch-target': '44px',
        'touch-target-premium': '48px',
        'mobile-button': '44px',
        'mobile-input': '44px',
        'mobile-nav': '48px',
      },

      minWidth: {
        'touch-target': '44px',
        'touch-target-premium': '48px',
        'mobile-button': '44px',
      },

      // Enhanced Container Sizes with Mobile Edge Padding
      maxWidth: {
        'mobile': '100%',
        'mobile-safe': 'calc(100% - 32px)', // 16px each side
        'mobile-content': 'calc(100% - 48px)', // 24px each side
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;
