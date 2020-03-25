import styled from 'styled-components';

export const CallToAction = styled.div`
  display: none;

  @keyframes opacityPulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }

  div.pulse {
    animation: opacityPulse 1.5s linear;
    animation-iteration-count: infinite;
  }

  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: all 0.2s;

    div {
      padding-right: 4px;
    }
  }
`;
