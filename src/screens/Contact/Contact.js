import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Wrapper, Content, StyledContactLink } from './Contact.style';

const Contact = ({ children }) => {
  return (
    <Wrapper>
      <Content>
        <Typography variant="h3" component="h1">
          Contact Us
        </Typography>
        <StyledContactLink variant="body1" component="p">
          To get in touch with us, please email:
        </StyledContactLink>

        <StyledContactLink variant="body1" component="p">
          <strong>Medical Organizations:</strong>
          <div>
            <a href="mailto:medical@covidactnow.org">medical@covidactnow.org</a>
          </div>
        </StyledContactLink>

        <StyledContactLink variant="body1" component="p">
          <strong>Government Agencies:</strong>
          <div>
            <a href="mailto:gov@covidactnow.org">gov@covidactnow.org</a>
          </div>
        </StyledContactLink>

        <StyledContactLink variant="body1" component="p">
          <strong>Press:</strong>
          <div>
            <a href="mailto:press@covidactnow.org">press@covidactnow.org</a>
          </div>
          <div>
            Our presskit is available{' '}
            <a href="https://docs.google.com/document/d/1kdzXjVXsfVZN2Ltt66yy2TTlZMPKO96ixSMDCGksdf0/edit">
              here
            </a>
          </div>
        </StyledContactLink>

        <StyledContactLink variant="body1" component="p">
          <strong>All other Inquiries:</strong>
          <div>
            <a href="mailto:info@covidactnow.org">info@covidactnow.org</a>
          </div>
        </StyledContactLink>

        <Typography variant="body1" component="p">
          <strong>Contribute expertise to this tool</strong>
          <div>
            <a href="https://forms.gle/JTCcqrGb5yzoD6hg6">Signup</a>
          </div>
        </Typography>
      </Content>
    </Wrapper>
  );
};

export default Contact;
