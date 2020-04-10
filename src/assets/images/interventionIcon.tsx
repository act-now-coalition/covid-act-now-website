import React from 'react';

export default ({ color }: { color?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="black"
      strokeOpacity="0.7"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="6" fill={color} />
  </svg>
);
