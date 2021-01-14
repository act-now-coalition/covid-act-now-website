import React from 'react';
import { MarkdownContent } from 'components/Markdown';
import { footerContent } from 'cms-content/learn';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 2.5rem 0 1rem;
`;

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <MarkdownContent source={footerContent.body} />
    </Wrapper>
  );
};

export default Footer;
