import React from 'react';

const SuccessIcon: React.FC<{ height?: string; width?: string }> = ({
  height = 24,
  width = 24,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill="#00D474" />
      <path
        d="M18.6667 7L9.50001 16.1667L5.33334 12"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default SuccessIcon;
