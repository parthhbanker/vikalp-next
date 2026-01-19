'use client';

import { useCallback } from 'react';
import * as analytics from './gtm';

/**
 * Custom hook for analytics tracking
 * Provides easy access to all analytics functions in components
 */
export const useAnalytics = () => {
  const trackButtonClick = useCallback(
    (buttonName: string, additionalData?: Record<string, any>) => {
      analytics.trackButtonClick(buttonName, additionalData);
    },
    []
  );

  const trackFormSubmit = useCallback(
    (formName: string, additionalData?: Record<string, any>) => {
      analytics.trackFormSubmit(formName, additionalData);
    },
    []
  );

  const trackFormInteraction = useCallback(
    (
      fieldName: string,
      action: 'focus' | 'blur' | 'change',
      additionalData?: Record<string, any>
    ) => {
      analytics.trackFormInteraction(fieldName, action, additionalData);
    },
    []
  );

  const trackConversion = useCallback(
    (conversionName: string, value?: number, additionalData?: Record<string, any>) => {
      analytics.trackConversion(conversionName, value, additionalData);
    },
    []
  );

  const trackOutboundLink = useCallback((url: string, linkText?: string) => {
    analytics.trackOutboundLink(url, linkText);
  }, []);

  const trackDownload = useCallback((fileName: string, fileType?: string) => {
    analytics.trackDownload(fileName, fileType);
  }, []);

  const trackSearch = useCallback((searchTerm: string, resultsCount?: number) => {
    analytics.trackSearch(searchTerm, resultsCount);
  }, []);

  const identifyUser = useCallback(
    (userId: string, userProperties?: Record<string, any>) => {
      analytics.identifyUser(userId, userProperties);
    },
    []
  );

  const trackLogin = useCallback((method: string = 'email') => {
    analytics.trackLogin(method);
  }, []);

  const trackSignup = useCallback((method: string = 'email') => {
    analytics.trackSignup(method);
  }, []);

  const trackLogout = useCallback(() => {
    analytics.trackLogout();
  }, []);

  const trackDonation = useCallback(
    (amount: number, currency: string = 'USD', additionalData?: Record<string, any>) => {
      analytics.trackDonation(amount, currency, additionalData);
    },
    []
  );

  const trackNewsletterSignup = useCallback((email?: string) => {
    analytics.trackNewsletterSignup(email);
  }, []);

  const trackVolunteerRegistration = useCallback(
    (additionalData?: Record<string, any>) => {
      analytics.trackVolunteerRegistration(additionalData);
    },
    []
  );

  return {
    trackButtonClick,
    trackFormSubmit,
    trackFormInteraction,
    trackConversion,
    trackOutboundLink,
    trackDownload,
    trackSearch,
    identifyUser,
    trackLogin,
    trackSignup,
    trackLogout,
    trackDonation,
    trackNewsletterSignup,
    trackVolunteerRegistration,
  };
};
