import React from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Typography from '@material-ui/core/Typography';
import StapledSidebar, {
  SidebarLink,
  SectionHeader,
} from 'components/StapledSidebar/StapledSidebar';
import { Wrapper, Content, Header } from './Contact.style';

const sidebar = (
  <React.Fragment>
    <SidebarLink href="#general">General Questions</SidebarLink>
    <SidebarLink href="#governments">Governments</SidebarLink>
    <SidebarLink href="#press">Press</SidebarLink>
    <SidebarLink href="#join-us">Join Us</SidebarLink>
    <SidebarLink href="#donate">Donate</SidebarLink>
  </React.Fragment>
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
          <SectionHeader variant="body1" component="p">
            See our <a href="/about#faq">FAQ here</a>. If you have more
            questions, please reach out to us at the email addresses below.
          </SectionHeader>
          <SectionHeader variant="h4" component="h4" id="general">
            General Questions
          </SectionHeader>
          <Typography variant="body1" component="p">
            Email{' '}
            <a
              href="mailto:info@covidactnow.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              info@covidactnow.org
            </a>
            .
          </Typography>

          <SectionHeader variant="h4" component="h4" id="governments">
            Governments
          </SectionHeader>
          <Typography variant="body1" component="p">
            Are you with a state or local government? Reach out to us at{' '}
            <a
              href="mailto:gov@covidactnow.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              gov@covidactnow.org
            </a>
            .
          </Typography>
          <Typography variant="body1" component="p">
            Our goal is to provide you with data, modeling, and analysis to help
            your government manage its response to COVID. Our model is only as
            good as its data. If you have different or higher quality data, we
            can work together to ingest that data into the model and create
            better, more accurate COVID projections to help your government plan
            its response.
          </Typography>

          <SectionHeader variant="h4" component="h4" id="press">
            Press
          </SectionHeader>
          <Typography variant="body1" component="p">
            Reach out to us at{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:press@covidactnow.org"
            >
              press@covidactnow.org
            </a>
            .
          </Typography>

          <SectionHeader variant="h4" component="h4" id="join-us">
            Join us!
          </SectionHeader>
          <Typography variant="body1" component="p">
            Do you want to join the Covid Act Now team?{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfQkdwXsbDbwLHhWwBD6wzNiw54_0P6A60r8hujP3qnaxxFkA/viewform"
            >
              Let us know
            </a>
            . Right now, we need:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" component="p">
                JavaScript/React, Python engineers
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                Epidemiologists
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                Data Modelers
              </Typography>
            </li>
          </ul>

          <SectionHeader variant="h4" component="h4" id="donate">
            Donate
          </SectionHeader>
          <Typography variant="body1" component="p">
            You can contribute to our work{' '}
            <a
              href="https://multiplier.org/projects/#"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            , or{' '}
            <a
              href="mailto:info@covidactnow.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              drop a line
            </a>{' '}
            if you’re interested in making a grant.
          </Typography>
        </StapledSidebar>
      </Content>
    </Wrapper>
  );
};

export default Contact;
