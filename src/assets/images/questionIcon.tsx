import React from 'react';

const QuestionIcon = (props: { textColor: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.09009 8.99999C9.57552 7.62004 10.9855 6.7914 12.4273 7.0387C13.8691 7.28601 14.9223 8.53714 14.9201 9.99999C14.9201 12 11.9201 13 11.9201 13"
        stroke={props.textColor}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={props.textColor}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="12" cy="17" r="1" fill={props.textColor} />
    </svg>
  );
};

export default QuestionIcon;
