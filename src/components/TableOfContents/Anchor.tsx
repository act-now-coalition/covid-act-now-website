import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { LinkIcon } from './Anchor.style';

const Anchor: React.FC<{ id: string }> = ({ id }) => {
  return (
    <HashLink id={id} aria-hidden={true} to={`#${id}`}>
      <LinkIcon />
    </HashLink>
  );
};

export default Anchor;
