import * as THREE from 'three';

export class WebGLContextManager {
  private static instance: WebGLContextManager | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private contextLostHandler: ((event: Event) => void) | null = null;
  private contextRestoredHandler: ((event: Event) => void) | null = null;
  private isContextLost = false;
  private pendingOperations: (() => void)[] = [];

  private constructor() {}

  public static getInstance(): WebGLContextManager {
    if (!WebGLContextManager.instance) {
      WebGLContextManager.instance = new WebGLContextManager();
    }
    return WebGLContextManager.instance;
  }

  public getRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    // If canvas changed or no renderer exists, create new one
    if (!this.renderer || this.canvas !== canvas) {
      this.cleanup();
      this.canvas = canvas;
      this.createRenderer();
    }

    return this.renderer!;
  }

  private createRenderer(): void {
    if (!this.canvas) return;

    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: false, // Disable for better performance
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false
      });

      // Configure renderer for performance
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.0;
      
      // Enable optimizations
      this.renderer.shadowMap.enabled = false; // Disable shadows for performance
      // Note: physicallyCorrectLights is deprecated in newer Three.js versions
      
      this.setupContextHandlers();
    } catch (error) {
      console.error('Failed to create WebGL renderer:', error);
      this.handleContextLoss();
    }
  }

  private setupContextHandlers(): void {
    if (!this.canvas) return;

    this.contextLostHandler = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost');
      this.handleContextLoss();
    };

    this.contextRestoredHandler = (event: Event) => {
      console.log('WebGL context restored');
      this.handleContextRestore();
    };

    this.canvas.addEventListener('webglcontextlost', this.contextLostHandler);
    this.canvas.addEventListener('webglcontextrestored', this.contextRestoredHandler);
  }

  private handleContextLoss(): void {
    this.isContextLost = true;
    
    // Aggressive memory cleanup
    this.forceMemoryCleanup();
    
    // Notify subscribers about context loss
    window.dispatchEvent(new CustomEvent('webgl-context-lost'));
    
    // Clear renderer reference but keep canvas
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
  }

  private forceMemoryCleanup(): void {
    // Force garbage collection if available (development only)
    if (process.env.NODE_ENV === 'development' && (window as any).gc) {
      try {
        (window as any).gc();
      } catch (e) {
        // Ignore if not available
      }
    }

    // Clear any cached textures or geometries
    if (this.renderer) {
      this.renderer.info.memory.geometries = 0;
      this.renderer.info.memory.textures = 0;
    }
  }

  private handleContextRestore(): void {
    this.isContextLost = false;
    
    // Recreate renderer
    if (this.canvas) {
      this.createRenderer();
      
      // Execute any pending operations
      this.pendingOperations.forEach(operation => {
        try {
          operation();
        } catch (error) {
          console.error('Error executing pending operation:', error);
        }
      });
      this.pendingOperations = [];
      
      // Notify subscribers about context restoration
      window.dispatchEvent(new CustomEvent('webgl-context-restored'));
    }
  }

  public executeWhenReady(operation: () => void): void {
    if (this.isContextLost) {
      this.pendingOperations.push(operation);
    } else {
      operation();
    }
  }

  public isReady(): boolean {
    return !this.isContextLost && this.renderer !== null;
  }

  public forceCleanup(): void {
    this.forceMemoryCleanup();
  }

  public cleanup(): void {
    if (this.canvas) {
      if (this.contextLostHandler) {
        this.canvas.removeEventListener('webglcontextlost', this.contextLostHandler);
      }
      if (this.contextRestoredHandler) {
        this.canvas.removeEventListener('webglcontextrestored', this.contextRestoredHandler);
      }
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }

    this.canvas = null;
    this.contextLostHandler = null;
    this.contextRestoredHandler = null;
    this.pendingOperations = [];
  }

  public static dispose(): void {
    if (WebGLContextManager.instance) {
      WebGLContextManager.instance.cleanup();
      WebGLContextManager.instance = null;
    }
  }
}

// Hook for React components
export function useWebGLContext(canvas: HTMLCanvasElement | null) {
  const manager = WebGLContextManager.getInstance();
  
  if (!canvas) return null;
  
  return manager.getRenderer(canvas);
}

// Utility function to check WebGL support
export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return gl !== null;
  } catch (e) {
    return false;
  }
}

// Utility function to get WebGL info
export function getWebGLInfo(): {
  vendor: string;
  renderer: string;
  version: string;
  extensions: string[];
} | null {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl || !(gl instanceof WebGLRenderingContext)) return null;
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    
    return {
      vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR),
      renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
      version: gl.getParameter(gl.VERSION),
      extensions: gl.getSupportedExtensions() || []
    };
  } catch (e) {
    return null;
  }
} 