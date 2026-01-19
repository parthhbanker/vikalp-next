'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGTM, trackPageView } from '@/lib/analytics/gtm';

/**
 * Google Tag Manager Script Component
 *
 * Non-blocking GTM implementation with automatic page view tracking
 * and UTM parameter persistence
 */
export function GTMScript() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize GTM on mount (non-blocking)
  useEffect(() => {
    // Use requestIdleCallback for truly non-blocking initialization
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => initGTM());
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(() => initGTM(), 0);
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    // Delay tracking slightly to ensure page is loaded
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => trackPageView(url));
    } else {
      setTimeout(() => trackPageView(url), 100);
    }
  }, [pathname, searchParams]);

  // This component doesn't render anything
  return null;
}

/**
 * GTM NoScript fallback
 * Place in body for users with JavaScript disabled
 */
export function GTMNoScript() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
