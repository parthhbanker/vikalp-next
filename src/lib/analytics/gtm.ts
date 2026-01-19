/**
 * Google Tag Manager Analytics
 *
 * Non-blocking analytics implementation with UTM tracking and event management
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

interface GTMEvent {
  event: string;
  [key: string]: any;
}

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Initialize Google Tag Manager
 * This should be called in the app layout
 */
export const initGTM = () => {
  if (!GTM_ID) {
    console.warn('GTM ID is not configured');
    return;
  }

  // Add GTM script to head (non-blocking)
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  document.head.appendChild(script);
};

/**
 * Push custom event to GTM dataLayer
 */
export const pushEvent = (event: GTMEvent): void => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
};

/**
 * Track page view with UTM parameters
 */
export const trackPageView = (url: string): void => {
  const utmParams = getUTMParams();

  pushEvent({
    event: 'page_view',
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
    ...utmParams,
  });
};

/**
 * Extract UTM parameters from URL
 */
export const getUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};

  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ];

  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
      // Store in sessionStorage for persistence across pages
      sessionStorage.setItem(key, value);
    } else {
      // Check sessionStorage for previously stored UTM params
      const storedValue = sessionStorage.getItem(key);
      if (storedValue) {
        utmParams[key] = storedValue;
      }
    }
  });

  return utmParams;
};

/**
 * Track button click events
 */
export const trackButtonClick = (buttonName: string, additionalData?: Record<string, any>): void => {
  pushEvent({
    event: 'button_click',
    button_name: buttonName,
    ...additionalData,
  });
};

/**
 * Track form submission
 */
export const trackFormSubmit = (formName: string, additionalData?: Record<string, any>): void => {
  pushEvent({
    event: 'form_submit',
    form_name: formName,
    ...additionalData,
  });
};

/**
 * Track form field interaction
 */
export const trackFormInteraction = (
  fieldName: string,
  action: 'focus' | 'blur' | 'change',
  additionalData?: Record<string, any>
): void => {
  pushEvent({
    event: 'form_interaction',
    field_name: fieldName,
    action,
    ...additionalData,
  });
};

/**
 * Track custom conversion events
 */
export const trackConversion = (
  conversionName: string,
  value?: number,
  additionalData?: Record<string, any>
): void => {
  pushEvent({
    event: 'conversion',
    conversion_name: conversionName,
    value,
    ...additionalData,
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage: number): void => {
  pushEvent({
    event: 'scroll_depth',
    scroll_percentage: percentage,
  });
};

/**
 * Track outbound link clicks
 */
export const trackOutboundLink = (url: string, linkText?: string): void => {
  pushEvent({
    event: 'outbound_link',
    link_url: url,
    link_text: linkText,
  });
};

/**
 * Track file downloads
 */
export const trackDownload = (fileName: string, fileType?: string): void => {
  pushEvent({
    event: 'file_download',
    file_name: fileName,
    file_type: fileType,
  });
};

/**
 * Track video interactions
 */
export const trackVideo = (
  action: 'play' | 'pause' | 'complete',
  videoTitle: string,
  progress?: number
): void => {
  pushEvent({
    event: 'video_interaction',
    action,
    video_title: videoTitle,
    video_progress: progress,
  });
};

/**
 * Track search queries
 */
export const trackSearch = (searchTerm: string, resultsCount?: number): void => {
  pushEvent({
    event: 'search',
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

/**
 * Track user engagement time
 */
export const trackEngagement = (timeInSeconds: number, pagePath: string): void => {
  pushEvent({
    event: 'user_engagement',
    engagement_time: timeInSeconds,
    page_path: pagePath,
  });
};

/**
 * Identify user - call this when user logs in or registers
 */
export const identifyUser = (
  userId: string,
  userProperties?: Record<string, any>
): void => {
  pushEvent({
    event: 'user_identify',
    user_id: userId,
    ...userProperties,
  });

  // Store user ID for subsequent events
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('user_id', userId);
  }
};

/**
 * Track user login
 */
export const trackLogin = (method: string = 'email'): void => {
  pushEvent({
    event: 'login',
    method,
  });
};

/**
 * Track user registration
 */
export const trackSignup = (method: string = 'email'): void => {
  pushEvent({
    event: 'sign_up',
    method,
  });
};

/**
 * Track user logout
 */
export const trackLogout = (): void => {
  pushEvent({
    event: 'logout',
  });

  // Clear stored user ID
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('user_id');
  }
};

/**
 * Get stored user ID
 */
export const getUserId = (): string | null => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('user_id');
};

/**
 * Track donation (for NGO specific tracking)
 */
export const trackDonation = (
  amount: number,
  currency: string = 'USD',
  additionalData?: Record<string, any>
): void => {
  pushEvent({
    event: 'donation',
    value: amount,
    currency,
    ...additionalData,
  });
};

/**
 * Track newsletter signup
 */
export const trackNewsletterSignup = (email?: string): void => {
  pushEvent({
    event: 'newsletter_signup',
    email_provided: !!email,
  });
};

/**
 * Track volunteer registration
 */
export const trackVolunteerRegistration = (additionalData?: Record<string, any>): void => {
  pushEvent({
    event: 'volunteer_registration',
    ...additionalData,
  });
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}
