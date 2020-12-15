import styled from 'styled-components';

export const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  strong {
    font-weight: 600;
  }

  span {
    color: rgba(0, 0, 0, 0.7);
  }
`;

export const IconWrapper = styled.div`
  margin-right: 0.75rem;
`;

export const LocationName = styled.p`
  margin: 0;
`;

export const Zipcode = styled.span`
  font-style: italic;
`;
