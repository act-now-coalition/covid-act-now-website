import React from 'react';

const CheckIcon = (props: { textColor: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={props.textColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.0001 12.07V13C20.9975 17.4287 18.0824 21.3282 13.8354 22.5839C9.58847 23.8396 5.02145 22.1523 2.61101 18.4371C0.200573 14.7218 0.52092 9.86365 3.39833 6.49708C6.27574 3.13051 11.0248 2.05753 15.0701 3.86001"
        stroke={props.textColor}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 4L11 15L8 12"
        stroke={props.textColor}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
