import React from 'react';
import { Story } from '@storybook/addon-docs/blocks';

// TODO(pablo): Implement theme switching if we ever have multiple themes
export const withDarkBackground = (StoryComponent: typeof Story) => {
  return (
    <div style={{ backgroundColor: '#333' }}>
      <StoryComponent />
    </div>
  );
};
