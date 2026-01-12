import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', fullWidth = false, className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-display font-medium transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400 disabled:border-neutral-200';

    const variantStyles = {
      primary: 'bg-secondary-500 text-white border-2 border-secondary-500 hover:bg-secondary-600 hover:border-secondary-600 active:bg-secondary-700 active:shadow-inner',
      secondary: 'bg-transparent text-primary-700 border-2 border-primary-300 hover:bg-primary-50 hover:border-primary-400 active:bg-primary-100',
      ghost: 'bg-transparent text-neutral-700 border-2 border-transparent hover:bg-neutral-100 active:bg-neutral-200',
    };

    const sizeStyles = {
      small: 'px-5 py-2.5 text-body-sm rounded-md',
      medium: 'px-6 py-3 text-body rounded-lg',
      large: 'px-7 py-3.5 text-body-lg rounded-lg',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`.trim();

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
