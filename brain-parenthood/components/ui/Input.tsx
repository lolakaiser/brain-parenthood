import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const baseStyles = 'h-11 px-4 py-3 text-[16px] text-neutral-800 bg-white border-2 rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed';
    const errorStyles = error ? 'border-error-500 focus:border-error-500 focus:ring-error-100' : 'border-neutral-300';
    const widthStyles = fullWidth ? 'w-full' : '';

    const combinedClassName = `${baseStyles} ${errorStyles} ${widthStyles} ${className}`.trim();

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-label font-medium text-neutral-700 mb-2">
            {label}
          </label>
        )}
        <input ref={ref} className={combinedClassName} {...props} />
        {error && (
          <p className="mt-2 text-body-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const baseStyles = 'min-h-[120px] px-4 py-3 text-[16px] text-neutral-800 bg-white border-2 rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed resize-vertical';
    const errorStyles = error ? 'border-error-500 focus:border-error-500 focus:ring-error-100' : 'border-neutral-300';
    const widthStyles = fullWidth ? 'w-full' : '';

    const combinedClassName = `${baseStyles} ${errorStyles} ${widthStyles} ${className}`.trim();

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-label font-medium text-neutral-700 mb-2">
            {label}
          </label>
        )}
        <textarea ref={ref} className={combinedClassName} {...props} />
        {error && (
          <p className="mt-2 text-body-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Input;
