import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  Wrapper,
  Content,
  TextContent,
  Header,
  EmailButton,
} from './Government.style';

const Government = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <Header>
        <Content>
          <Typography variant="h3" component="h1">
            Government Partners
          </Typography>
        </Content>
      </Header>
      <Content>
        <TextContent>
          <Typography variant="h5" component="h5">
            Are you with a state or local government?
          </Typography>
          <Typography variant="body1" component="p">
            Our goal is to provide you with data, modeling, and analysis to help
            your government manage its response to COVID. Specifically you can:
          </Typography>
          <ol>
            <li>
              <Typography variant="body1" component="p">
                <strong>
                  Work with us to improve the data inputs for your state- or
                  county-specific COVID model
                </strong>{' '}
                <br />
                Our model is only as good as its data. If you have different or
                higher quality data, we can work together to ingest that data
                into the model and create better, more accurate COVID
                projections to help your government plan its response. Connect
                with us at{' '}
                <a href="mailto:gov@covidactnow.org">gov@covidactnow.org</a>.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                <strong>Use our API</strong> <br />
                You can find our API{' '}
                <a href="https://github.com/covid-projections/covid-data-model/blob/master/api/README.V1.md">
                  here
                </a>
                . It allows you to download our data and specify the level of
                intervention for your state or county. In the upcoming weeks, we
                intend to continue adding features including but not limited to:
                state level aggregation (return information about all states)
                and county level aggregation (return all county level data for a
                given state.
              </Typography>
            </li>
          </ol>
          <Typography variant="body1" component="p">
            Anything else you’d like to see? Drop us a line. We’re here to help.
          </Typography>
          <Typography variant="body1" component="p">
            <EmailButton href="mailto:gov@covidactnow.org">
              Email gov@covidactnow.org
            </EmailButton>
          </Typography>
        </TextContent>
      </Content>
    </Wrapper>
  );
};

export default Government;
