import styled from 'styled-components';

export const CallToActionButton = styled.button`
  background-color: rgba(60,121,201);
  color: white;
  padding: 0.66rem 2rem;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.2s;

  :hover {
    background-color: rgba(70,131,210);
    box-shadow: 0 4px 12px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23);
  }

  @media (max-width: 600px) {
    padding: 0.5rem 2rem;
  	margin-bottom: 0.25rem;

    h6 {
      font-size: 14px;
    }

  }
`;

export const MapInstructionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2rem 5rem;

  div {
  	margin-left: .5rem;
  }

  @media (max-width: 600px) {
  	flex-direction: column;
  	padding: 1.5rem 1rem;
  }
`;
