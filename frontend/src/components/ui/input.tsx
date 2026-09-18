'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-semibold tracking-wide"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-11 px-4 rounded-[10px] text-[14px] w-full',
            'border outline-none transition-all duration-150',
            'placeholder:text-[var(--color-input-placeholder)]',
            'focus:ring-2',
            error && 'border-red-500',
            className,
          )}
          style={{
            backgroundColor: 'var(--color-input-bg)',
            borderColor: error ? '#ef4444' : 'var(--color-input-border)',
            color: 'var(--color-text-primary)',
            // focus styles are handled via CSS focus-within
          }}
          {...props}
        />
        {error && (
          <span className="text-[12px] font-medium text-red-500">{error}</span>
        )}
        {hint && !error && (
          <span className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>
            {hint}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
