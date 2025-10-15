import React from 'react';

/**
 * Professional Loading Spinner Component
 * Can be used across the application for consistent loading states
 */
const LoadingSpinner = ({ 
  size = 'md', 
  color = 'emerald', 
  text = 'Loading...', 
  fullScreen = false 
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const colors = {
    emerald: 'border-emerald-500',
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    gray: 'border-gray-500'
  };

  const spinnerClasses = `${sizes[size]} border-4 ${colors[color]} border-t-transparent rounded-full animate-spin`;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <div className={spinnerClasses} />
          {text && (
            <p className="mt-4 text-gray-600 font-medium animate-pulse">{text}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={spinnerClasses} />
      {text && (
        <p className="mt-4 text-gray-600 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
};

/**
 * Skeleton Loader for Cards
 */
export const SkeletonCard = ({ count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-2xl overflow-hidden animate-pulse"
        >
          {/* Image placeholder */}
          <div className="h-48 bg-gray-200" />
          
          {/* Content placeholder */}
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
            
            <div className="h-10 bg-gray-200 rounded w-full mt-4" />
          </div>
        </div>
      ))}
    </>
  );
};

/**
 * Skeleton Loader for Text
 */
export const SkeletonText = ({ lines = 3 }) => {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(lines)].map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-200 rounded ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

/**
 * Page Loading State
 */
export const PageLoader = ({ message = 'Loading page...' }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-24 h-24 border-4 border-gray-200 rounded-full" />
          
          {/* Spinning ring */}
          <div className="absolute inset-0 w-24 h-24 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>
        
        {message && (
          <p className="mt-6 text-lg text-gray-600 font-medium animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Inline Spinner (small, for buttons)
 */
export const InlineSpinner = ({ size = 'sm', color = 'white' }) => {
  const sizes = {
    xs: 'w-3 h-3 border-2',
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-2'
  };

  const colors = {
    white: 'border-white border-t-transparent',
    emerald: 'border-emerald-500 border-t-transparent',
    gray: 'border-gray-500 border-t-transparent'
  };

  return (
    <div className={`${sizes[size]} ${colors[color]} rounded-full animate-spin inline-block`} />
  );
};

export default LoadingSpinner;
