import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className={`spinner ${sizeClasses[size]} mb-4`}></div>
      {text && (
        <p className="text-secondary-600 text-sm">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner; 