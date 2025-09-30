import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  interactive = false,
  padding = 'md',
  shadow = 'soft',
  onClick,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl border border-border-light transition-all duration-200';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };
  
  const shadowClasses = {
    none: '',
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    strong: 'shadow-strong',
  };
  
  const interactiveClasses = interactive ? 'cursor-pointer hover:shadow-medium hover:-translate-y-1 hover:border-primary-200' : '';
  const hoverClasses = hover ? 'hover:shadow-medium hover:-translate-y-1' : '';
  
  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${interactiveClasses} ${hoverClasses} ${className}`;

  const CardComponent = interactive || hover ? motion.div : 'div';
  const motionProps = (interactive || hover) ? {
    whileHover: { y: -4, boxShadow: "var(--shadow-medium)" },
    transition: { duration: 0.2 }
  } : {};

  return (
    <CardComponent
      className={classes}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  interactive: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  shadow: PropTypes.oneOf(['none', 'soft', 'medium', 'strong']),
  onClick: PropTypes.func,
};

export default Card;