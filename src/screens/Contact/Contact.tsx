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
          <SectionHeader variant="body1" component="p">
            See our <a href="/about#faq">FAQ here</a>. If you have more
            questions, please reach out to us at the email addresses below.
          </SectionHeader>

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
            For customized modeling, see our COVID Response Simulator{' '}
            <ExternalLink href="https://covidactnow.org/resources">
              here
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
            U.S. Want to join us?
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
            <ListItem>Product Managers</ListItem>
            <ListItem>Social Media Managers</ListItem>
            <ListItem>User Support Representatives</ListItem>
            <ListItem>...and more!</ListItem>
          </ul>
          <Paragraph>
            Want to intern with us?{' '}
            <ExternalLink href="https://docs.google.com/forms/d/1rvM5StysnTrhJxXhIdvbTmDvpJKKrfEFl2fQfDt-86Y/viewform?ts=5f248b67&edit_requested=true">
              Let us know
            </ExternalLink>
            . We're currently offering full-time internships (volunteer):
          </Paragraph>
          <ul>
            <ListItem>
              <ExternalLink href="https://docs.google.com/document/d/1_4P0lM1k2pGRXSNGVe_p8TcmdMdaIug5lZeIK-3zU24/edit?ts=5f2488d3#">
                Strategy & Operations
              </ExternalLink>
            </ListItem>
            <ListItem>
              <ExternalLink href="https://docs.google.com/document/d/1HJJ8-W87Z1dGVK1JZF3cDNVyBHSq-Z1MYVoVL4ofZj0/edit#">
                User Support Representative
              </ExternalLink>
            </ListItem>
            <ListItem>
              <ExternalLink href="https://docs.google.com/document/d/1UyDFQW3uraR-Zl5jAdz2SMfdwduTXDj3w_om8kdci1U/edit?usp=drive_web&ouid=101469664908591780676">
                Content Writing
              </ExternalLink>
            </ListItem>
            <ListItem>
              <ExternalLink href="https://docs.google.com/document/d/1rjvjCu168WIVn5S2lFWxl_9d5Ve5nhY4kX6VizPhCd4/edit#">
                Video Editing
              </ExternalLink>
            </ListItem>
            <ListItem>
              <ExternalLink href="https://docs.google.com/document/d/1JWAahMLQA-ZyZ-4yvWBBhemQTOmBt5uvFfVZLgzFJUU/edit">
                Epidemiological Modeling
              </ExternalLink>
            </ListItem>
          </ul>

          <SectionHeader variant="h4" component="h2" id="donate">
            Donate
          </SectionHeader>
          <Paragraph>
            We are a registered 501c3 non-profit. You can help us keep the
            lights on by making{' '}
            <ExternalLink href="https://www.gofundme.com/f/qtcuvy-covid-act-now">
              a 100% tax-dedudicble donation to our GoFundMe
            </ExternalLink>
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
