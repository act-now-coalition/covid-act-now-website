import React, { FunctionComponent } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import ShareBlock from 'components/ShareBlock/ShareBlock';
import Typography from '@material-ui/core/Typography';
import StapledSidebar, {
  SidebarLink,
  SectionHeader,
} from 'components/StapledSidebar/StapledSidebar';
import { Wrapper, Content, Header } from './Contact.style';
import ExternalLink from 'components/ExternalLink';
import { Link } from 'react-router-dom';

const sidebar = (
  <React.Fragment>
    <SidebarLink href="#general">General Questions</SidebarLink>
    <SidebarLink href="#governments">Governments</SidebarLink>
    <SidebarLink href="#press">Press</SidebarLink>
    <SidebarLink href="#join-us">Join Us</SidebarLink>
    <SidebarLink href="#donate">Donate</SidebarLink>
  </React.Fragment>
);

const Paragraph: FunctionComponent = ({ children }) => (
  <Typography variant="body1" component="p">
    {children}
  </Typography>
);

const ListItem: FunctionComponent = ({ children }) => (
  <li>
    <Paragraph>{children}</Paragraph>
  </li>
);

const Contact = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <AppMetaTags
        canonicalUrl="/contact"
        pageTitle="Contact us"
        pageDescription="We’re here to help. Drop us a line."
      />
      <Header>
        <Content>
          <Typography variant="h3" component="h1">
            Contact Us
          </Typography>
        </Content>
      </Header>
      <Content>
        <StapledSidebar sidebar={sidebar}>
          <SectionHeader variant="h4" component="h2" id="general">
            General Questions
          </SectionHeader>

          <Paragraph>
            Email{' '}
            <ExternalLink href="mailto:info@covidactnow.org">
              info@covidactnow.org
            </ExternalLink>
            .
          </Paragraph>

          <SectionHeader variant="h4" component="h2" id="governments">
            Governments
          </SectionHeader>
          <Paragraph>
            Are you with a state or local government? Our goal is to provide you
            with data, modeling, and analysis to manage your response to COVID.
            Reach out to us at{' '}
            <ExternalLink href="mailto:gov@covidactnow.org">
              gov@covidactnow.org
            </ExternalLink>
            .
          </Paragraph>
          <Paragraph>
            For customized modeling, see our{' '}
            <ExternalLink href="https://covidactnow.org/resources">
              COVID Response Simulator
            </ExternalLink>
            .
          </Paragraph>

          <SectionHeader variant="h4" component="h2" id="press">
            Press
          </SectionHeader>
          <Paragraph>
            Reach out to us at{' '}
            <ExternalLink href="mailto:press@covidactnow.org">
              press@covidactnow.org
            </ExternalLink>
            .
          </Paragraph>

          <SectionHeader variant="h4" component="h2" id="join-us">
            Join us!
          </SectionHeader>
          <Paragraph>
            Covid Act Now is a multidisciplinary team of technologists,
            epidemiologists, health experts, and public policy leaders working
            to provide disease intelligence and data analysis on COVID in the
            U.S. Want to join us?{' '}
            <ExternalLink href="https://docs.google.com/forms/d/e/1FAIpQLSfQkdwXsbDbwLHhWwBD6wzNiw54_0P6A60r8hujP3qnaxxFkA/viewform">
              Let us know
            </ExternalLink>
            . Some roles that we need:
          </Paragraph>
          <ul>
            <ListItem>UI/UX Designers</ListItem>
            <ListItem>JavaScript/React, Python engineers</ListItem>
            <ListItem>Epidemiologists</ListItem>
            <ListItem>Data Modelers</ListItem>
            <ListItem>User Support Representatives</ListItem>
            <ListItem>Product Managers</ListItem>
            <ListItem>Social Media Managers</ListItem>
            <ListItem>...and more!</ListItem>
          </ul>
          <Paragraph>
            Want to volunteer with us?{' '}
            <ExternalLink href="https://www.linkedin.com/company/covid-act-now/jobs/?viewAsMember=true">
              Visit our LinkedIn page
            </ExternalLink>{' '}
            to see what positions are currently available.
          </Paragraph>
          <SectionHeader variant="h4" component="h2" id="donate">
            Donate
          </SectionHeader>
          <Paragraph>
            We are a registered 501c3 non-profit. You can help us keep the
            lights on by{' '}
            <Link to="/donate">making a 100% tax-deductible donation here</Link>
            , or{' '}
            <ExternalLink href="mailto:info@covidactnow.org">
              emailing us
            </ExternalLink>{' '}
            if you’re a foundation interested in making a grant.
          </Paragraph>
        </StapledSidebar>
      </Content>
      <ShareBlock />
    </Wrapper>
  );
};

export default Contact;
