import React from 'react';

const CheckIcon = (props: { textColor: string }) => {
  return (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.6665" cy="6.6665" r="6.6665" fill={props.textColor} />
      <path
        d="M13.1666 1.16666L5.83325 8.5L3.83325 6.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
