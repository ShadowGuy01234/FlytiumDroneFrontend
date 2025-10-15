import React from 'react';

/**
 * Progress Bar Component
 * Visual indicator for progress and completion
 * 
 * @example
 * <ProgressBar value={75} />
 * <ProgressBar value={50} color="blue" showLabel />
 */
const ProgressBar = ({
  value = 0,
  max = 100,
  color = 'emerald',
  size = 'md',
  showLabel = false,
  label = '',
  animated = true,
  striped = false,
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    gray: 'bg-gray-500',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  };

  return (
    <div className={className}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="font-medium text-gray-700">{label}</span>
          {showLabel && <span className="text-gray-600">{Math.round(percentage)}%</span>}
        </div>
      )}
      
      <div 
        className={`
          w-full bg-gray-200 rounded-full overflow-hidden
          ${sizes[size]}
        `}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `${percentage}% complete`}
      >
        <div
          className={`
            h-full rounded-full transition-all duration-500 ease-out
            ${colors[color]}
            ${animated ? 'transition-all duration-500' : ''}
            ${striped ? 'bg-stripes' : ''}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

/**
 * Circular Progress Component
 * Circular indicator for progress
 */
export const CircularProgress = ({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = 'emerald',
  showLabel = true,
  label = '',
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    emerald: 'stroke-emerald-500',
    blue: 'stroke-blue-500',
    purple: 'stroke-purple-500',
    red: 'stroke-red-500',
    amber: 'stroke-amber-500',
  };

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${colors[color]} transition-all duration-500`}
          />
        </svg>
        
        {/* Center label */}
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-700">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
      
      {label && (
        <span className="mt-2 text-sm font-medium text-gray-600">
          {label}
        </span>
      )}
    </div>
  );
};

/**
 * Step Progress Component
 * Multi-step progress indicator
 */
export const StepProgress = ({
  steps = [],
  currentStep = 0,
  color = 'emerald',
  className = ''
}) => {
  const colors = {
    emerald: 'bg-emerald-500 text-emerald-500',
    blue: 'bg-blue-500 text-blue-500',
    purple: 'bg-purple-500 text-purple-500',
  };

  const [bgColor, textColor] = colors[color].split(' ');

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step indicator */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  font-semibold text-sm transition-all duration-300
                  ${index <= currentStep
                    ? `${bgColor} text-white`
                    : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {index < currentStep ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              
              {/* Step label */}
              <span
                className={`
                  mt-2 text-xs font-medium text-center
                  ${index <= currentStep ? 'text-gray-700' : 'text-gray-400'}
                `}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2 mb-8">
                <div
                  className={`
                    h-full rounded-full transition-all duration-300
                    ${index < currentStep ? bgColor : 'bg-gray-200'}
                  `}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/**
 * Loading Bar Component
 * Indeterminate progress indicator
 */
export const LoadingBar = ({
  color = 'emerald',
  size = 'md',
  className = ''
}) => {
  const colors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]} ${className}`}>
      <div
        className={`
          h-full rounded-full
          ${colors[color]}
          animate-loading-bar
        `}
        style={{
          animation: 'loading-bar 1.5s ease-in-out infinite',
        }}
      />
    </div>
  );
};

export default ProgressBar;
