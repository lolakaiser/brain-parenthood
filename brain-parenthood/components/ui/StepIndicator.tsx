import React from 'react';

export type StepStatus = 'completed' | 'current' | 'upcoming';

export interface Step {
  id: string | number;
  label: string;
  description?: string;
  status: StepStatus;
}

interface StepIndicatorProps {
  steps: Step[];
  /**
   * Orientation of the step indicator
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Additional className
   */
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  orientation = 'vertical',
  className = ''
}) => {
  const isHorizontal = orientation === 'horizontal';

  const getStepStyles = (status: StepStatus) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-success-500 border-success-500 text-white',
          line: 'bg-success-500',
          label: 'text-neutral-800 font-medium',
          description: 'text-neutral-600',
        };
      case 'current':
        return {
          circle: 'bg-primary-500 border-primary-500 text-white animate-pulse',
          line: 'bg-neutral-300',
          label: 'text-neutral-900 font-semibold',
          description: 'text-neutral-700',
        };
      case 'upcoming':
        return {
          circle: 'bg-white border-neutral-300 text-neutral-400',
          line: 'bg-neutral-200',
          label: 'text-neutral-500',
          description: 'text-neutral-400',
        };
    }
  };

  return (
    <div
      className={`flex ${isHorizontal ? 'flex-row items-start' : 'flex-col'} ${className}`}
      role="list"
      aria-label="Progress steps"
    >
      {steps.map((step, index) => {
        const styles = getStepStyles(step.status);
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.id}
            className={`flex ${isHorizontal ? 'flex-col items-center flex-1' : 'flex-row'} ${!isLast ? (isHorizontal ? '' : 'pb-8') : ''}`}
            role="listitem"
          >
            {/* Step circle and line container */}
            <div className={`flex ${isHorizontal ? 'flex-col items-center w-full' : 'flex-col items-center'}`}>
              {/* Step circle */}
              <div className="relative">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${styles.circle}`}
                  aria-current={step.status === 'current' ? 'step' : undefined}
                >
                  {step.status === 'completed' ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="text-body font-medium">{index + 1}</span>
                  )}
                </div>
              </div>

              {/* Connecting line */}
              {!isLast && (
                <div
                  className={`${isHorizontal ? 'w-full h-0.5 my-5' : 'w-0.5 h-full my-2'} ${styles.line} transition-colors duration-200`}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Step content */}
            <div className={`${isHorizontal ? 'text-center mt-3' : 'ml-4 -mt-10'} flex-1`}>
              <div className={`text-body font-medium ${styles.label} transition-colors duration-200`}>
                {step.label}
              </div>
              {step.description && (
                <div className={`text-body-sm mt-1 ${styles.description} transition-colors duration-200`}>
                  {step.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
