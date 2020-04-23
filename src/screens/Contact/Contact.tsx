import React from 'react';
import Typography from '@material-ui/core/Typography';
import StapledSidebar, {
  SidebarLink,
  SectionHeader,
} from 'components/StapledSidebar/StapledSidebar';
import { Wrapper, Content, Header, EmailButton } from './Contact.style';

const sidebar = (
  <React.Fragment>
    <SidebarLink href="#governments">Governments</SidebarLink>
    <SidebarLink href="#press">Press</SidebarLink>
    <SidebarLink href="#join">Join Us</SidebarLink>
    <SidebarLink href="#donate">Donate</SidebarLink>
  </React.Fragment>
);

const Contact = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <Header>
        <Content>
          <Typography variant="h3" component="h1">
            Contact Us
          </Typography>
        </Content>
      </Header>
      <Content>
        <StapledSidebar sidebar={sidebar}>
          <SectionHeader variant="h4" component="h4" id="governments">
            Governments
          </SectionHeader>
          <Typography variant="body1" component="p">
            Are you with a state or local government?
          </Typography>
          <Typography variant="body1" component="p">
            Our goal is to provide you with data, modeling, and analysis to help
            your government manage its response to COVID. Our model is only as
            good as its data. We want to work with you to improve the data
            inputs for your state or county. If you have different or higher
            quality data, we can work together to ingest that data into the
            model and create better, more accurate COVID projections to help
            your government plan its response. Drop us a line. We’re here to
            help.
          </Typography>
          <Typography variant="body1" component="p">
            <EmailButton
              href="mailto:gov@covidactnow.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email gov@covidactnow.org
            </EmailButton>
          </Typography>

          <SectionHeader variant="h4" component="h4" id="press">
            Press
          </SectionHeader>
          <Typography variant="body1" component="p">
            Check out our press packet here, or reach out to us directly.
          </Typography>
          <Typography variant="body1" component="p">
            <EmailButton
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:press@covidactnow.org"
            >
              Email press@covidactnow.org
            </EmailButton>
          </Typography>

          <SectionHeader variant="h4" component="h4" id="donate">
            Join us!
          </SectionHeader>
          <Typography variant="body1" component="p">
            Do you want to join the Covid Act Now team?{' '}
          </Typography>
          <Typography variant="body1" component="p">
            <EmailButton
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfQkdwXsbDbwLHhWwBD6wzNiw54_0P6A60r8hujP3qnaxxFkA/viewform"
            >
              Join our team
            </EmailButton>
          </Typography>

          <SectionHeader variant="h4" component="h4" id="donate">
            Donate
          </SectionHeader>
          <Typography variant="body1" component="p">
            TK.
          </Typography>
        </StapledSidebar>
      </Content>
    </Wrapper>
  );
};

export default Contact;
