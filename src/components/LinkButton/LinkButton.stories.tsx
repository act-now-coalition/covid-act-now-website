import React from 'react';
import LinkButton from './LinkButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { EventCategory } from 'components/Analytics';

export default {
  title: 'Building Blocks/LinkButton',
  component: LinkButton,
  argTypes: {
    trackingCategory: EventCategory.NONE,
    trackingLabel: 'Label',
  },
};

export const InternalLink = (args: any) => (
  <LinkButton to="/donate" {...args}>
    Donate
  </LinkButton>
);

export const ExternalLink = (args: any) => (
  <LinkButton {...args} href="https://covidactnow.org">
    Covid Act Now
  </LinkButton>
);

export const Contained = (args: any) => (
  <LinkButton {...args} href="https://covidactnow.org" variant="contained">
    Contained
  </LinkButton>
);

export const Outlined = (args: any) => (
  <LinkButton {...args} href="https://covidactnow.org" variant="outlined">
    Outlined
  </LinkButton>
);

export const Text = (args: any) => (
  <LinkButton {...args} href="https://covidactnow.org" variant="text">
    Text Button
  </LinkButton>
);

export const WithIcon = (args: any) => (
  <LinkButton
    {...args}
    href="https://covidactnow.org"
    variant="contained"
    startIcon={<InfoOutlinedIcon />}
  >
    With Icon
  </LinkButton>
);
