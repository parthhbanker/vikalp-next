import { TextareaHTMLAttributes, forwardRef } from 'react';
import { trackFormInteraction } from '@/lib/analytics';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * TextArea label
   */
  label?: string;
  /**
   * Helper text displayed below textarea
   */
  helperText?: string;
  /**
   * Error message (overrides helperText when present)
   */
  error?: string;
  /**
   * Full width textarea
   */
  fullWidth?: boolean;
  /**
   * Optional wrapper class name
   */
  wrapperClassName?: string;
  /**
   * Tracking name for analytics
   */
  trackingName?: string;
  /**
   * Enable analytics tracking
   */
  enableTracking?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = false,
      required,
      disabled,
      className = '',
      wrapperClassName = '',
      trackingName,
      enableTracking = false,
      rows = 4,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (enableTracking && trackingName) {
        trackFormInteraction(trackingName, 'focus');
      }
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (enableTracking && trackingName) {
        trackFormInteraction(trackingName, 'blur');
      }
      onBlur?.(e);
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${wrapperClassName}`}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* TextArea */}
        <textarea
          ref={ref}
          disabled={disabled}
          required={required}
          rows={rows}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`
            w-full rounded-lg border px-4 py-2.5 text-base
            ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-border focus:border-brand focus:ring-brand/20'
            }
            ${
              disabled
                ? 'bg-surface-secondary text-muted cursor-not-allowed resize-none'
                : 'bg-white text-foreground resize-y'
            }
            focus:outline-none focus:ring-4
            transition-all duration-200
            placeholder:text-muted
            ${className}
          `}
          {...props}
        />

        {/* Helper Text / Error */}
        {(helperText || error) && (
          <p
            className={`mt-1.5 text-sm ${
              error ? 'text-red-500' : 'text-muted'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
