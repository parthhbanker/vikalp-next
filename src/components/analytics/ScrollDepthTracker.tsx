'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackScrollDepth } from '@/lib/analytics';

/**
 * Scroll Depth Tracker Component
 *
 * Automatically tracks when users scroll to 25%, 50%, 75%, and 100% of the page
 */
export function ScrollDepthTracker() {
  const pathname = usePathname();
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Reset tracked depths on route change
    trackedDepths.current = new Set();

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calculate scroll percentage
      const scrollableHeight = documentHeight - windowHeight;
      const scrollPercentage = Math.round((scrollTop / scrollableHeight) * 100);

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];

      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    // Throttle scroll event
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [pathname]);

  return null;
}
