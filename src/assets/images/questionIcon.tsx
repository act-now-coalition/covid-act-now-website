import React from 'react';

const QuestionIcon = (props: { textColor: string }) => {
  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.66667 13.8333C10.3486 13.8333 13.3333 10.8486 13.3333 7.16667C13.3333 3.48477 10.3486 0.5 6.66667 0.5C2.98477 0.5 0 3.48477 0 7.16667C0 10.8486 2.98477 13.8333 6.66667 13.8333Z"
        fill={props.textColor}
      />
      <path
        d="M4.75 5.3365C5.07362 4.41653 6.01359 3.86411 6.97478 4.02898C7.93598 4.19385 8.63812 5.02794 8.63667 6.00317C8.63667 7.3365 6.63667 8.00317 6.63667 8.00317"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="6.5" cy="11.0032" rx="1" ry="1" fill="white" />
    </svg>
  );
};

export default QuestionIcon;
