module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-a11y',
  ],

  // This speeds up builds significantly at the cost of doc generation. See:
  // https://github.com/storybookjs/storybook/issues/12585#issuecomment-701292052
  typescript: { reactDocgen: 'react-docgen' },
};
