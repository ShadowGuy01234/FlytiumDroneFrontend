import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(({ 
  type = 'text',
  label,
  error,
  placeholder,
  className = '',
  disabled = false,
  required = false,
  icon,
  ...props 
}, ref) => {
  const baseClasses = 'block w-full px-4 py-3 text-primary-900 bg-white border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 placeholder-primary-400';
  const normalClasses = 'border-border-light focus:ring-accent-500 focus:border-accent-500';
  const errorClasses = 'border-danger-500 focus:ring-danger-500 focus:border-danger-500';
  const disabledClasses = 'bg-gray-50 cursor-not-allowed opacity-50';
  
  const inputClasses = `${baseClasses} ${error ? errorClasses : normalClasses} ${disabled ? disabledClasses : ''} ${icon ? 'pl-12' : ''} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-primary-700 mb-2">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-primary-400">{icon}</span>
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  icon: PropTypes.node,
};

export default Input;