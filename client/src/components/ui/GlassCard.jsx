import React from 'react';

const GlassCard = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`glass rounded-xl p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
