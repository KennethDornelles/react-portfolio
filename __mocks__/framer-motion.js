import React from 'react';

// Mock for framer-motion
export const motion = {
  button: ({ children, ...props }) => {
    return React.createElement('button', props, children);
  },
};

export default {
  motion,
};