'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

// Animation variant classes
export const fadeInUp = (isVisible: boolean, delay = 0) => `
  transition-all duration-700 ease-out
  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
  ${delay > 0 ? `delay-${delay}` : ''}
`;

export const fadeIn = (isVisible: boolean, delay = 0) => `
  transition-all duration-700 ease-out
  ${isVisible ? 'opacity-100' : 'opacity-0'}
  ${delay > 0 ? `delay-${delay}` : ''}
`;

export const scaleIn = (isVisible: boolean, delay = 0) => `
  transition-all duration-700 ease-out
  ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
  ${delay > 0 ? `delay-${delay}` : ''}
`;

export const slideInLeft = (isVisible: boolean, delay = 0) => `
  transition-all duration-700 ease-out
  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
  ${delay > 0 ? `delay-${delay}` : ''}
`;

export const slideInRight = (isVisible: boolean, delay = 0) => `
  transition-all duration-700 ease-out
  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
  ${delay > 0 ? `delay-${delay}` : ''}
`;
