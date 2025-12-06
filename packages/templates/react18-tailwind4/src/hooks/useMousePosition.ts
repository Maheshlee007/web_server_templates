import { useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for tracking mouse position
 * WHY: Updates CSS custom properties for mouse-follow gradient effects
 * 
 * Performance optimizations:
 * - Throttled updates (every 50ms) to reduce repaints
 * - Uses CSS custom properties (no React re-renders)
 * - Cleanup on unmount
 */
export function useMousePosition() {
  const rafId = useRef<number | null>(null);
  const lastUpdate = useRef<number>(0);
  const throttleMs = 50; // Update every 50ms max

  const updateMousePosition = useCallback((e: MouseEvent) => {
    const now = Date.now();
    
    // Throttle updates
    if (now - lastUpdate.current < throttleMs) {
      return;
    }
    
    // Cancel any pending animation frame
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    // Use requestAnimationFrame for smooth updates
    rafId.current = requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      lastUpdate.current = now;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updateMousePosition]);
}

/**
 * Hook for card-level mouse tracking (for tilt effects)
 * WHY: Track mouse relative to individual card elements
 */
export function useCardTilt(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position (-10 to 10 degrees)
      const rotateX = ((y - rect.height / 2) / rect.height) * -10;
      const rotateY = ((x - rect.width / 2) / rect.width) * 10;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);
}
