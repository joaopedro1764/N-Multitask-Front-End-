import React, { forwardRef } from 'react';

export const TextField = forwardRef(({ type, placeholder, ...props }, ref) => (
  <input
    required
    type={type}
    className={"w-full px-3 py-4 border border-blueDark rounded-sm focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400"}
    placeholder={placeholder}
    ref={ref}
    {...props}
  />
));
