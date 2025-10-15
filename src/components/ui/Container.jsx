import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ 
  children, 
  size = 'default',
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    default: 'max-w-7xl',
    lg: 'max-w-8xl',
    full: 'max-w-full',
  };

  const classes = `${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'default', 'lg', 'full']),
  className: PropTypes.string,
};

export default Container;