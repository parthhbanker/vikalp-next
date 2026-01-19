'use client';

import { useEffect } from 'react';
import { trackOutboundLink } from '@/lib/analytics';

/**
 * Outbound Link Tracker Component
 *
 * Automatically tracks clicks on external links (links to different domains)
 */
export function OutboundLinkTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Find the closest anchor tag (in case user clicked on child element)
      const anchor = target.closest('a');

      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Check if it's an external link
      const isExternal =
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//');

      if (!isExternal) return;

      // Check if it's not the same domain
      const currentDomain = window.location.hostname;
      const linkDomain = new URL(href, window.location.href).hostname;

      if (linkDomain !== currentDomain) {
        const linkText = anchor.textContent?.trim() || anchor.getAttribute('aria-label') || '';
        trackOutboundLink(href, linkText);
      }
    };

    // Add click listener to document
    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);

  return null;
}
