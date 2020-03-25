import styled from 'styled-components';

export const LocatingText = styled.div`
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

  animation: opacityPulse 1.5s linear;
  animation-iteration-count: infinite;
`;

export const MapInstruction = styled.div`
  padding: 1rem 0.5rem;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const MapInstructionMobile = styled.div`
  display: none;
  padding: 1rem 0.5rem;

  @media (max-width: 600px) {
    display: block;

    span.stateLink {
      color: blue;
      cursor: pointer;
    }
  }
`;
