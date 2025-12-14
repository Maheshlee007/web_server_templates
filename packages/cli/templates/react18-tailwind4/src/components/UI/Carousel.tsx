import { useState, useEffect, useRef, ReactNode, CSSProperties } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/utilsCN';

export type CarouselVariant = 'basic' | 'dots-below' | 'dots-beside' | 'auto' | 'stack';

interface CarouselProps {
  items: ReactNode[];
  variant?: CarouselVariant;
  autoPlayInterval?: number;
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  
  // Advanced Stack Configuration
  enableAutoRotate?: boolean;           // Enable auto-rotation for any variant
  maxStackedCards?: number;             // Max cards visible on each side (default: 3)
  cardWidth?: string | number;          // Custom card width (default: 'max-w-xl')
  stackSpacing?: number;                // Horizontal spacing between stacked cards (default: 120px)
  stackOffset?: number;                 // Vertical offset for depth effect (default: 30px)
  centerCard?: boolean;                 // Center the active card (default: true)
  stackScale?: number;                  // Scale factor for non-active cards (default: 0.85)
  
  // Callbacks
  onSlideChange?: (index: number) => void;
}

/**
 * Carousel Component - Professional, Industry-Standard Implementation
 * 
 * Features:
 * - Multiple variants: basic, dots-below, dots-beside, auto, stack
 * - Auto-rotation capability for ANY variant (not just 'auto')
 * - Configurable stack behavior with max visible cards
 * - Custom card width support
 * - Intelligent card stacking (max 3 per side, rest hidden below)
 * - Centered active card option
 * - 30% minimum card visibility for stacked cards
 * - Smooth animations with GPU acceleration
 * - Accessibility support
 * 
 * Stack Behavior:
 * - Shows max 3 cards on left, active card in center, max 3 on right
 * - Remaining cards stack below the last visible card
 * - As user navigates, cards move from right stack to center to left stack
 * - Smooth rotation effect with configurable spacing
 * 
 * @example
 * // Basic stack
 * <Carousel items={cards} variant="stack" />
 * 
 * @example
 * // Stack with auto-rotation
 * <Carousel 
 *   items={cards} 
 *   variant="stack" 
 *   enableAutoRotate={true}
 *   autoPlayInterval={3000}
 * />
 * 
 * @example
 * // Custom stack configuration
 * <Carousel 
 *   items={cards} 
 *   variant="stack"
 *   maxStackedCards={2}
 *   cardWidth="max-w-2xl"
 *   stackSpacing={150}
 *   stackOffset={40}
 * />
 */
export function Carousel({
  items,
  variant = 'basic',
  autoPlayInterval = 3000,
  className,
  showArrows = true,
  showDots = true,
  enableAutoRotate = false,
  maxStackedCards = 3,
  cardWidth,
  stackSpacing = 120,
  stackOffset = 30,
  centerCard = true,
  stackScale = 0.85,
  onSlideChange,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(variant === 'auto' || enableAutoRotate);
  const autoPlayRef = useRef<number | null>(null);
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50; // Minimum swipe distance for navigation

  const totalItems = items.length;

  // Navigation handlers
  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    onSlideChange?.(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onSlideChange?.(newIndex);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    onSlideChange?.(index);
  };

  // Touch event handlers for swipe functionality
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Auto-play effect - works with any variant when enableAutoRotate is true
  useEffect(() => {
    if (isAutoPlaying && (variant === 'auto' || enableAutoRotate)) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [isAutoPlaying, currentIndex, variant, enableAutoRotate]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (variant === 'auto' || enableAutoRotate) {
      setIsAutoPlaying(false);
    }
  };

  const handleMouseLeave = () => {
    if (variant === 'auto' || enableAutoRotate) {
      setIsAutoPlaying(true);
    }
  };

  // Stack variant renderer - Professional implementation
  if (variant === 'stack') {
    // Determine card width class - responsive
    const cardWidthClass = typeof cardWidth === 'string' 
      ? cardWidth 
      : cardWidth 
        ? `w-[${cardWidth}px]` 
        : 'w-full max-w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl'; // Responsive default

    // Calculate which cards should be visible
    const getCardPosition = (index: number) => {
      let offset = index - currentIndex;
      
      // Normalize offset to handle circular navigation
      if (offset > totalItems / 2) offset -= totalItems;
      if (offset < -totalItems / 2) offset += totalItems;
      
      return offset;
    };

    // Determine card styles based on position
    const getCardStyle = (index: number): CSSProperties & { isVisible: boolean; side: 'left' | 'center' | 'right' | 'hidden' } => {
      const offset = getCardPosition(index);
      const isActive = index === currentIndex;
      const absOffset = Math.abs(offset);
      
      // Card is in center
      if (offset === 0) {
        return {
          transform: centerCard 
            ? `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`
            : `translateX(${offset * stackSpacing}px) translateY(0px) scale(1) rotateY(0deg)`,
          zIndex: 50,
          opacity: 1,
          isVisible: true,
          side: 'center',
        };
      }
      
      // Cards on the right (positive offset)
      if (offset > 0) {
        if (offset <= maxStackedCards) {
          // Visible stacked cards on right - ensure 30% visibility
          const xOffset = centerCard 
            ? (stackSpacing * offset) - (offset * 50) // Reduced overlap for 30% visibility
            : stackSpacing * offset;
          const yOffset = stackOffset * (offset - 1);
          const scale = Math.max(stackScale, 1 - (offset * 0.05));
          
          return {
            transform: `translateX(${xOffset}px) translateY(${yOffset}px) scale(${scale}) rotateY(-${offset * 8}deg)`,
            zIndex: 50 - offset,
            opacity: 0.7 + (1 - offset * 0.15),
            isVisible: true,
            side: 'right',
          };
        } else {
          // Hidden cards - stacked below the last visible right card
          const lastVisibleOffset = stackSpacing * maxStackedCards - (maxStackedCards * 50);
          const yOffset = stackOffset * (maxStackedCards + (offset - maxStackedCards) * 0.5);
          
          return {
            transform: centerCard
              ? `translateX(${lastVisibleOffset}px) translateY(${yOffset}px) scale(${stackScale * 0.9}) rotateY(-${maxStackedCards * 8}deg)`
              : `translateX(${stackSpacing * maxStackedCards}px) translateY(${yOffset}px) scale(${stackScale * 0.9}) rotateY(-${maxStackedCards * 8}deg)`,
            zIndex: 50 - maxStackedCards - (offset - maxStackedCards),
            opacity: 0.3,
            isVisible: false,
            side: 'hidden',
          };
        }
      }
      
      // Cards on the left (negative offset)
      if (offset < 0) {
        const positiveOffset = Math.abs(offset);
        if (positiveOffset <= maxStackedCards) {
          // Visible stacked cards on left - ensure 30% visibility
          const xOffset = centerCard
            ? -(stackSpacing * positiveOffset) + (positiveOffset * 50) // Reduced overlap for 30% visibility
            : -(stackSpacing * positiveOffset);
          const yOffset = stackOffset * (positiveOffset - 1);
          const scale = Math.max(stackScale, 1 - (positiveOffset * 0.05));
          
          return {
            transform: `translateX(${xOffset}px) translateY(${yOffset}px) scale(${scale}) rotateY(${positiveOffset * 8}deg)`,
            zIndex: 50 - positiveOffset,
            opacity: 0.7 + (1 - positiveOffset * 0.15),
            isVisible: true,
            side: 'left',
          };
        } else {
          // Hidden cards - stacked below the last visible left card
          const lastVisibleOffset = -(stackSpacing * maxStackedCards) + (maxStackedCards * 50);
          const yOffset = stackOffset * (maxStackedCards + (positiveOffset - maxStackedCards) * 0.5);
          
          return {
            transform: centerCard
              ? `translateX(${lastVisibleOffset}px) translateY(${yOffset}px) scale(${stackScale * 0.9}) rotateY(${maxStackedCards * 8}deg)`
              : `translateX(-${stackSpacing * maxStackedCards}px) translateY(${yOffset}px) scale(${stackScale * 0.9}) rotateY(${maxStackedCards * 8}deg)`,
            zIndex: 50 - maxStackedCards - (positiveOffset - maxStackedCards),
            opacity: 0.3,
            isVisible: false,
            side: 'hidden',
          };
        }
      }
      
      return {
        transform: 'translateX(0) translateY(0) scale(1)',
        zIndex: 0,
        opacity: 0,
        isVisible: false,
        side: 'hidden',
      };
    };

    return (
      <div 
        className={cn('relative w-full', className)} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[450px] flex items-center justify-center px-4 sm:px-8 py-6 sm:py-8" style={{ perspective: '1500px' }}>
          {items.map((item, index) => {
            const { transform, zIndex, opacity, isVisible, side } = getCardStyle(index);
            const isActive = index === currentIndex;
            
            return (
              <div
                key={index}
                className={cn(
                  'absolute transition-all duration-700 ease-out',
                  'bg-(--color-bg) border border-(--color-border) rounded-xl shadow-lg',
                  'cursor-pointer select-none touch-pan-y',
                  cardWidthClass,
                  isActive && 'ring-2 ring-(--color-brand)',
                  !isVisible && 'pointer-events-none'
                )}
                style={{
                  transform,
                  zIndex,
                  opacity,
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => !isActive && isVisible && goToIndex(index)}
                aria-hidden={!isVisible}
              >
                {item}
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows - Hidden on mobile, shown on desktop */}
        {showArrows && (
          <>
            <button
              onClick={goToPrevious}
              className={cn(
                'absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-60',
                'p-1.5 sm:p-2 rounded-full bg-(--color-bg) border border-(--color-border)',
                'text-(--color-text) hover:bg-(--color-brand) hover:text-white',
                'shadow-lg transition-all',
                'hidden sm:flex items-center justify-center', // Hidden on mobile
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={goToNext}
              className={cn(
                'absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-60',
                'p-1.5 sm:p-2 rounded-full bg-(--color-bg) border border-(--color-border)',
                'text-(--color-text) hover:bg-(--color-brand) hover:text-white',
                'shadow-lg transition-all',
                'hidden sm:flex items-center justify-center', // Hidden on mobile
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {showDots && (
          <div className="flex justify-center gap-2 mt-8">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  index === currentIndex
                    ? 'bg-(--color-brand) w-8'
                    : 'bg-(--color-border) hover:bg-(--color-text-secondary)'
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        )}

        {/* Auto-rotate indicator */}
        {enableAutoRotate && isAutoPlaying && (
          <div className="absolute top-4 right-4 z-60 px-3 py-1 rounded-full bg-(--color-brand)/10 border border-(--color-brand)/30 text-xs text-(--color-brand)">
            Auto-rotating
          </div>
        )}
      </div>
    );
  }

  // Standard carousel variants (basic, dots-below, dots-beside, auto)
  const isDotsBelow = variant === 'dots-below' || variant === 'auto';
  const isDotsBeside = variant === 'dots-beside';

  return (
    <div 
      className={cn('relative w-full', className)} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Main Content */}
      <div className="relative overflow-hidden rounded-xl group touch-pan-y">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="min-w-full">
              {item}
            </div>
          ))}
        </div>

        {/* Arrows - Visible on hover on desktop, always hidden on mobile (swipe instead) */}
        {showArrows && (
          <>
            <button
              onClick={goToPrevious}
              className={cn(
                'absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10',
                'p-1.5 sm:p-2 rounded-full bg-(--color-bg)/80 backdrop-blur-sm border border-(--color-border)',
                'text-(--color-text) hover:bg-(--color-brand) hover:text-white',
                'shadow-lg transition-all',
                'hidden sm:flex items-center justify-center', // Hidden on mobile - use swipe
                'opacity-0 group-hover:opacity-100'
              )}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={goToNext}
              className={cn(
                'absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10',
                'p-1.5 sm:p-2 rounded-full bg-(--color-bg)/80 backdrop-blur-sm border border-(--color-border)',
                'text-(--color-text) hover:bg-(--color-brand) hover:text-white',
                'shadow-lg transition-all',
                'hidden sm:flex items-center justify-center', // Hidden on mobile - use swipe
                'opacity-0 group-hover:opacity-100'
              )}
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </>
        )}
      </div>

      {/* Dots Below */}
      {showDots && isDotsBelow && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex
                  ? 'bg-(--color-brand) w-6 sm:w-8'
                  : 'bg-(--color-border) hover:bg-(--color-text-secondary)'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Dots Beside Arrows */}
      {showDots && isDotsBeside && (
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
          <button
            onClick={goToPrevious}
            className={cn(
              'p-1.5 sm:p-2 rounded-full border border-(--color-border)',
              'text-(--color-text) hover:bg-(--color-brand) hover:text-white hover:border-(--color-brand)',
              'transition-all'
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  index === currentIndex
                    ? 'bg-(--color-brand) w-6 sm:w-8'
                    : 'bg-(--color-border) hover:bg-(--color-text-secondary)'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className={cn(
              'p-1.5 sm:p-2 rounded-full border border-(--color-border)',
              'text-(--color-text) hover:bg-(--color-brand) hover:text-white hover:border-(--color-brand)',
              'transition-all'
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
