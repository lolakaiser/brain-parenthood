import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', clickable = false, onClick }, ref) => {
    const baseStyles = 'bg-white rounded-lg border border-neutral-200 shadow-sm';
    const clickableStyles = clickable
      ? 'cursor-pointer transition-all duration-200 hover:border-primary-700 hover:shadow-md hover:-translate-y-0.5'
      : '';

    const combinedClassName = `${baseStyles} ${clickableStyles} ${className}`.trim();

    return (
      <div ref={ref} className={combinedClassName} onClick={onClick}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 border-b border-neutral-200 ${className}`.trim()}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 ${className}`.trim()}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 border-t border-neutral-200 ${className}`.trim()}>
    {children}
  </div>
);

export default Card;
