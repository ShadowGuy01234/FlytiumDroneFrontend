import React from 'react';

/**
 * Badge Component
 * Versatile badge for status indicators, labels, and tags
 * 
 * @example
 * <Badge variant="success">In Stock</Badge>
 * <Badge variant="info" size="sm">New</Badge>
 * <Badge variant="warning" dot>Pending</Badge>
 */
const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  dot = false,
  pill = false,
  className = '' 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-emerald-100 text-emerald-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-amber-100 text-amber-800',
    info: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    primary: 'bg-emerald-500 text-white',
    outline: 'border-2 border-gray-300 text-gray-700 bg-transparent',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const dotColors = {
    default: 'bg-gray-500',
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500',
    purple: 'bg-purple-500',
    primary: 'bg-emerald-600',
    outline: 'bg-gray-500',
  };

  return (
    <span 
      className={`
        inline-flex items-center gap-1.5 font-medium
        ${variants[variant]}
        ${sizes[size]}
        ${pill ? 'rounded-full' : 'rounded-md'}
        ${className}
      `}
    >
      {dot && (
        <span 
          className={`
            w-1.5 h-1.5 rounded-full animate-pulse
            ${dotColors[variant]}
          `}
        />
      )}
      {children}
    </span>
  );
};

/**
 * Status Badge Component
 * Pre-configured badges for common status states
 */
export const StatusBadge = ({ status, className = '' }) => {
  const statusConfig = {
    active: { variant: 'success', label: 'Active', dot: true },
    inactive: { variant: 'default', label: 'Inactive', dot: false },
    pending: { variant: 'warning', label: 'Pending', dot: true },
    completed: { variant: 'success', label: 'Completed', dot: false },
    cancelled: { variant: 'error', label: 'Cancelled', dot: false },
    processing: { variant: 'info', label: 'Processing', dot: true },
    shipped: { variant: 'info', label: 'Shipped', dot: false },
    delivered: { variant: 'success', label: 'Delivered', dot: false },
    'in-stock': { variant: 'success', label: 'In Stock', dot: true },
    'out-of-stock': { variant: 'error', label: 'Out of Stock', dot: false },
    'low-stock': { variant: 'warning', label: 'Low Stock', dot: true },
  };

  const config = statusConfig[status] || statusConfig.active;

  return (
    <Badge 
      variant={config.variant} 
      dot={config.dot}
      pill
      className={className}
    >
      {config.label}
    </Badge>
  );
};

/**
 * Category Badge Component
 * Badge for product categories and tags
 */
export const CategoryBadge = ({ category, className = '' }) => {
  return (
    <Badge 
      variant="outline" 
      size="sm"
      className={`hover:bg-gray-50 transition-colors cursor-pointer ${className}`}
    >
      {category}
    </Badge>
  );
};

/**
 * Count Badge Component
 * Small badge for counts (cart items, notifications, etc.)
 */
export const CountBadge = ({ count, max = 99, className = '' }) => {
  const displayCount = count > max ? `${max}+` : count;
  
  return (
    <span 
      className={`
        inline-flex items-center justify-center
        min-w-[20px] h-5 px-1.5
        text-xs font-bold text-white
        bg-red-500 rounded-full
        ${className}
      `}
      role="status"
      aria-label={`${count} items`}
    >
      {displayCount}
    </span>
  );
};

/**
 * Discount Badge Component
 * Badge for displaying discounts and offers
 */
export const DiscountBadge = ({ percentage, className = '' }) => {
  return (
    <Badge 
      variant="error" 
      size="sm"
      pill
      className={`font-bold ${className}`}
    >
      -{percentage}% OFF
    </Badge>
  );
};

/**
 * New Badge Component
 * Badge for new products or features
 */
export const NewBadge = ({ className = '' }) => {
  return (
    <Badge 
      variant="primary" 
      size="sm"
      pill
      className={`animate-pulse ${className}`}
    >
      NEW
    </Badge>
  );
};

/**
 * Featured Badge Component
 * Badge for featured items
 */
export const FeaturedBadge = ({ className = '' }) => {
  return (
    <Badge 
      variant="purple" 
      size="sm"
      pill
      className={`font-semibold ${className}`}
    >
      ⭐ FEATURED
    </Badge>
  );
};

/**
 * Badge Group Component
 * Container for multiple badges with proper spacing
 */
export const BadgeGroup = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {children}
    </div>
  );
};

export default Badge;
