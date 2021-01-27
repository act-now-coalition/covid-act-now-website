import React from 'react';
import { Button, ChevronRightIcon } from './VaccinationBlock.style';

type ButtonProps = React.ComponentProps<typeof Button>;

const LinkButton: React.FC<ButtonProps> = ({
  href,
  children,
  ...otherProps
}) => {
  return (
    <Button href={href} endIcon={<ChevronRightIcon />} {...otherProps}>
      {children}
    </Button>
  );
};

export default LinkButton;
