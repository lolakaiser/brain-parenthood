import React from 'react';

interface ProgressBarProps {
  /**
   * Progress value from 0 to 100
   */
  value: number;
  /**
   * Total value (for calculating percentage if value is not in percentage)
   */
  max?: number;
  /**
   * Show percentage text
   */
  showPercentage?: boolean;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Color variant
   */
  variant?: 'primary' | 'success' | 'gradient';
  /**
   * Additional className
   */
  className?: string;
  /**
   * Label to display above progress bar
   */
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showPercentage = false,
  size = 'md',
  variant = 'gradient',
  className = '',
  label,
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Size styles
  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  // Variant styles for the fill
  const variantStyles = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    gradient: 'bg-gradient-to-r from-primary-500 to-success-500',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-body-sm text-neutral-700 font-medium">{label}</span>}
          {showPercentage && <span className="text-body-sm text-neutral-600">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`w-full bg-neutral-200 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`h-full transition-all duration-300 ease-out ${variantStyles[variant]} rounded-full`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
