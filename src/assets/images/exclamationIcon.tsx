import React from 'react';

const ExclamationIcon = (props: { textColor: string }) => {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'translateY(-1px)' }}
    >
      <path
        d="M5.63387 1.46153C6.01877 0.794866 6.98102 0.794866 7.36592 1.46153L12.5621 10.4615C12.947 11.1282 12.4658 11.9615 11.696 11.9615H1.30374C0.533937 11.9615 0.0528125 11.1282 0.437713 10.4615L5.63387 1.46153Z"
        fill={props.textColor}
      />
      <path
        d="M6.5 4.96153V7.42307"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse
        cx="6.42308"
        cy="9.96153"
        rx="0.923076"
        ry="0.923077"
        fill="white"
      />
    </svg>
  );
};

export default ExclamationIcon;
