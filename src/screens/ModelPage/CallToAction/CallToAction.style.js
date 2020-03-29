import styled from 'styled-components';

export const CallToActionBox = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  color: rgba(0, 0, 0, 0.7);
  font-size: 1rem;
  line-height: 1.5rem;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

export const Section = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  @media (min-width: 900px) {
    width: 50%;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    border-bottom: none;
  }

  &:last-child {
    border: none;
  }
`;

export const Title = styled.div`
  background: #f2f2f2;
  padding: 16px;
  /* font-weight: bold; */
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  flex: 0 1;

  font-size: 1.25re m;
  line-height: 1.75rem;

  @media (min-width: 600px) {
    /* text-align: center; */
  }
`;

export const Content = styled.div`
  padding: 16px;
  display: flex;
  text-align: left;
  align-items: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  margin: auto;

  @media (min-width: 600px) {
    /* flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 0; */
  }

  &:last-child {
    border: none;
  }
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    /* text-align: center; */
  }
`;

export const Primary = styled.span`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: bold;
`;

export const Detail = styled.span`
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const Icon = styled.div`
  display: flex;
  margin-right: 16px;

  @media (min-width: 600px) {
    /* margin-right: 0;
    margin-bottom: 8px; */
  }
`;
