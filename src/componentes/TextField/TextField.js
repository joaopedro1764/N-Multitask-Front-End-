import React, { forwardRef } from 'react';

export const TextField = forwardRef(({ type, className, placeholder, ...props }, ref) => (
  <input
    required
    type={type}
    className={className}
    placeholder={placeholder}
    ref={ref}
    {...props}
  />
));
