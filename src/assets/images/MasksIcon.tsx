import React from 'react';

const MasksIcon: React.FC<{ height?: string; width?: string }> = ({
  height = 32,
  width = 40,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.38 25.126C5.986 25.126 4.845 23.985 4.845 22.591V9.40899C4.845 8.01399 5.986 6.87399 7.38 6.87399H24.619C26.014 6.87399 27.154 8.01499 27.154 9.40899V22.591C27.154 23.986 26.013 25.126 24.619 25.126H7.38Z"
        fill="#00BFEA"
      />
      <path
        d="M23.1 18.253H8.901C8.465 18.253 8.112 18.607 8.112 19.042C8.112 19.477 8.465 19.831 8.901 19.831H23.1C23.536 19.831 23.889 19.477 23.889 19.042C23.889 18.607 23.535 18.253 23.1 18.253Z"
        fill="black"
      />
      <path
        d="M23.1 12.169H8.901C8.465 12.169 8.112 12.523 8.112 12.958C8.112 13.393 8.465 13.747 8.901 13.747H23.1C23.536 13.747 23.889 13.393 23.889 12.958C23.889 12.523 23.535 12.169 23.1 12.169Z"
        fill="black"
      />
      <path
        d="M28.676 9.12599H27.932C27.787 7.42499 26.358 6.08499 24.619 6.08499H7.38C5.642 6.08499 4.213 7.42499 4.069 9.12599H3.324C1.491 9.12599 0 10.618 0 12.45V19.55C0 21.382 1.491 22.874 3.324 22.874H4.069C4.213 24.575 5.642 25.915 7.38 25.915H24.619C26.357 25.915 27.787 24.575 27.932 22.874H28.676C30.51 22.874 32 21.382 32 19.55V12.45C32 10.618 30.51 9.12599 28.676 9.12599ZM1.578 19.55V12.45C1.578 11.487 2.361 10.704 3.324 10.704H4.056V21.296H3.324C2.361 21.296 1.578 20.513 1.578 19.55ZM26.365 22.591C26.365 23.554 25.582 24.337 24.619 24.337H7.38C6.417 24.337 5.634 23.554 5.634 22.591V9.40899C5.634 8.44599 6.417 7.66099 7.38 7.66099H24.619C25.582 7.66099 26.365 8.44599 26.365 9.40899V22.591ZM30.422 19.55C30.422 20.513 29.639 21.296 28.676 21.296H27.944V10.704H28.676C29.639 10.704 30.422 11.487 30.422 12.45V19.55Z"
        fill="black"
      />
    </svg>
  );
};

export default MasksIcon;