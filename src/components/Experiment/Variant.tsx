import React from 'react';
import {
  Variant as OptimizeVariant,
  VariantProps as OptimizeVariantProps,
} from 'react-optimize';

export enum VariantID {
  A = '0',
  B = '1',
}

export type VariantProps = Omit<OptimizeVariantProps, 'id'> & {
  id: VariantID;
};

const Variant: React.FC<VariantProps> = props => {
  const { id, ...otherProps } = props;
  return <OptimizeVariant id={id} {...otherProps} />;
};

export default Variant;
