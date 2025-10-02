import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

/**
 * Professional Alert Component
 * Usage: <Alert type="success" message="Operation completed!" />
 */
const Alert = ({ 
  type = 'info', 
  message, 
  title,
  dismissible = true, 
  autoHide = false,
  duration = 5000,
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const types = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-800',
      iconColor: 'text-emerald-500'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-500'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-800',
      iconColor: 'text-amber-500'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-500'
    }
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div 
      className={`${config.bgColor} ${config.borderColor} ${config.textColor} border rounded-xl p-4 shadow-sm animate-fade-in-up`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        
        <div className="flex-1">
          {title && (
            <h4 className="font-bold mb-1">{title}</h4>
          )}
          <p className="text-sm">{message}</p>
        </div>

        {dismissible && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Toast Notification Container
 * For showing temporary notifications at the corner of the screen
 */
export const ToastContainer = ({ children, position = 'top-right' }) => {
  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
  };

  return (
    <div className={`fixed ${positions[position]} z-50 space-y-3 max-w-md`}>
      {children}
    </div>
  );
};

/**
 * Toast Notification (Compact version for temporary messages)
 */
export const Toast = ({ 
  type = 'info', 
  message, 
  duration = 3000,
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100));
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  if (!isVisible) return null;

  const types = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-emerald-500',
      progressColor: 'bg-emerald-700'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-500',
      progressColor: 'bg-red-700'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-amber-500',
      progressColor: 'bg-amber-700'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-500',
      progressColor: 'bg-blue-700'
    }
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} text-white rounded-lg shadow-lg overflow-hidden animate-slide-in-right`}>
      <div className="p-4 flex items-center gap-3">
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="h-1 bg-white/20">
        <div 
          className={`h-full ${config.progressColor} transition-all ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

/**
 * Banner Alert (Full width, typically at top of page)
 */
export const BannerAlert = ({ 
  type = 'info', 
  message, 
  actionText,
  onActionClick,
  dismissible = true,
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const types = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500'
  };

  return (
    <div className={`${types[type]} text-white py-3 px-4 animate-slide-down`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm font-medium flex-1">{message}</p>
        
        <div className="flex items-center gap-3">
          {actionText && onActionClick && (
            <button
              onClick={onActionClick}
              className="px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors"
            >
              {actionText}
            </button>
          )}
          
          {dismissible && (
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close banner"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Add animations to App.css
const animationStyles = `
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.3s ease-out;
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out;
}
`;

export default Alert;
