import React from 'react';

const ExclamationIcon = (props: { textColor: string }) => {
  return (
    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.63398 1.46153C6.01888 0.794865 6.98113 0.794866 7.36603 1.46153L12.5622 10.4615C12.9471 11.1282 12.466 11.9615 11.6962 11.9615H1.30385C0.534047 11.9615 0.0529221 11.1282 0.437822 10.4615L5.63398 1.46153Z" fill={props.textColor}/>
      <path d="M6.5 4.96153V7.42307" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="6.42308" cy="9.96153" r="0.923077" fill="white"/>
      <path d="M0 1V0H-1V1H0ZM13 1H14V0H13V1ZM13 12V13H14V12H13ZM0 12H-1V13H0V12ZM0 2H13V0H0V2ZM12 1V12H14V1H12ZM13 11H0V13H13V11ZM1 12V1H-1V12H1Z" fill="white"/>
    </svg>

  );
};

export default ExclamationIcon;
