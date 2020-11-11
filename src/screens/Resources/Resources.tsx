import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import ShareBlock from 'components/ShareBlock/ShareBlock';
import StapledSidebar, {
  SidebarLink,
  SectionHeader,
} from 'components/StapledSidebar/StapledSidebar';
import ExternalLink from 'components/ExternalLink';
import { COLOR_MAP } from 'common/colors';
import imgReponseSimulatorUrl from 'assets/images/response-simulator-screenshot.png';

import {
  Wrapper,
  Content,
  Header,
  GetStartedBox,
  GetStartedList,
  SimulatorTab,
  ImageContainer,
} from './Resources.style';

/**
 * When updating the COVID_RESPONSE_SIMULATOR_URL, update the version number
 * and the URL in src/assets/covid-response-simulator-version.txt. This file is
 * used by the the CRS to determine if a copy is up to date, and show a
 * message to the user.
 */
export const COVID_RESPONSE_SIMULATOR_URL =
  'https://docs.google.com/spreadsheets/d/1iUQvuY-DGbuxGBDrj1fvaDjk-peunHm89sMJe0z24U8/copy?usp=sharing';

const sidebar = (
  <React.Fragment>
    <SidebarLink href="#covid-response-simulator">
      COVID Response Simulator
    </SidebarLink>
    <SidebarLink href="#model">SEIR Epidemiology Model</SidebarLink>
    <SidebarLink href="#api">API</SidebarLink>
    <SidebarLink href="#embed">Embed</SidebarLink>
  </React.Fragment>
);

const Resources = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <AppMetaTags
        canonicalUrl="/resources"
        pageTitle="Resources"
        pageDescription="Free COVID data resources — API, embeds, downloadable CSVs — to help governments and other partners."
      />
      <Header>
        <Content>
          <Typography variant="h3" component="h1">
            Resources
          </Typography>
        </Content>
      </Header>
      <Content>
        <StapledSidebar sidebar={sidebar}>
          <SectionHeader
            variant="h4"
            component="h2"
            id="covid-response-simulator"
          >
            COVID Response Simulator
          </SectionHeader>
          <Typography variant="body1" component="p">
            Try it{' '}
            <ExternalLink href="/covid-response-simulator-redirect">
              here
            </ExternalLink>
            .
          </Typography>
          <Typography variant="body1" component="p">
            The COVID Response Simulator is a localized, spreadsheet version of
            the public Covid Act Now (CAN) model. With it, you can take a
            powerful{' '}
            <ExternalLink href="https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SEIR_model">
              SEIR epidemiology model
            </ExternalLink>{' '}
            and customize it for your county to help plan your response to
            COVID. The inputs and assumptions in the simulator are modifiable
            and can be changed to reflect your local realities.
          </Typography>
          <Typography variant="body1" component="p">
            In addition, you can project the impact of specific
            Non-Pharmaceutical Interventions (NPIs) by adjusting customizable
            levels of public compliance and closure for:
          </Typography>
          <ul>
            <li>Schools and universities</li>
            <li>Large events</li>
            <li>Bars and restaurants</li>
            <li>Offices and factories</li>
            <li>Houses of worship</li>
            <li>Personal care </li>
            <li>Nonessential retail</li>
            <li>Essential retail</li>
            <li>Entertainment</li>
            <li>Outdoor recreation</li>
          </ul>
          <Typography variant="body1" component="p">
            You’ll also be able to simulate the impact of different levels of
            compliance with mask mandates and shelter-in-place orders, as well
            as modify the demographic distribution of your county’s population.
            Based on your inputs, the simulator generates data and graphs
            illustrating COVID forecasts with and without these NPIs, including
            estimated case numbers and hospitalizations.
          </Typography>
          <ImageContainer>
            <picture>
              <a href={imgReponseSimulatorUrl}>
                <img
                  src={imgReponseSimulatorUrl}
                  alt="Two screenshots showing a Google sheet. In the first tab we see where you can input your information, and in the second tab you can see the resulting graph and table that is exported."
                />
              </a>
            </picture>
          </ImageContainer>
          <GetStartedBox>
            <Typography variant="h5" component="h3">
              Get started
            </Typography>
            <GetStartedList>
              <li>
                <Typography variant="body1" component="p">
                  Before you begin, you can watch a full tutorial (30 minutes)
                  on the simulator{' '}
                  <ExternalLink href="https://youtu.be/6lYf9ry1DWE">
                    here
                  </ExternalLink>{' '}
                  or a shorter tutorial (10 minutes) on how to use the simulator
                  specifically for modeling NPIs{' '}
                  <ExternalLink href="https://youtu.be/xiI_kC8hGTA">
                    here
                  </ExternalLink>
                  .
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component="p">
                  Click on{' '}
                  <ExternalLink href="/covid-response-simulator-redirect">
                    this link
                  </ExternalLink>{' '}
                  to create a copy of the simulator for your use. You’ll be
                  prompted to make a copy so that you can work in your own
                  document.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component="p">
                  Review the information in the first tab in{' '}
                  <SimulatorTab color={COLOR_MAP.ORANGE_DARK.BASE}>
                    Orange
                  </SimulatorTab>{' '}
                  labeled “About”. Then continue onward to the second tab in{' '}
                  <SimulatorTab color={COLOR_MAP.GREEN.BASE}>
                    Green
                  </SimulatorTab>{' '}
                  labeled “Location and Inputs Setup”.
                </Typography>
              </li>
            </GetStartedList>
          </GetStartedBox>
          <Typography variant="body1" component="p">
            <i>
              If you have any questions about our model or the data we use,
              reach out to us at{' '}
              <ExternalLink href="mailto:info@covidactnow.org">
                info@covidactnow.org
              </ExternalLink>
              . You can also learn more on our{' '}
              <ExternalLink href="https://www.youtube.com/channel/UChs298932BKWanjwWLVUO4w">
                YouTube channel
              </ExternalLink>
              .{' '}
            </i>
          </Typography>
          <SectionHeader variant="h4" component="h2" id="model">
            SEIR Epidemiology Model
          </SectionHeader>
          <Typography variant="body1" component="p">
            Our model is open source and{' '}
            <a
              href="https://github.com/covid-projections/covid-data-model"
              target="_blank"
              rel="noopener noreferrer"
            >
              available on GitHub
            </a>
            .
          </Typography>
          <SectionHeader variant="h4" component="h2" id="api">
            API
          </SectionHeader>
          <Typography variant="body1" component="p">
            Looking for all the data that powers our site in a machine-readable
            format? You can use our API, made for ease-of-use by those wishing
            to programmatically ingest our data. To gain access, please use this{' '}
            <ExternalLink href="https://apidocs.covidactnow.org/access">
              registration form
            </ExternalLink>{' '}
            to generate your unique key.
          </Typography>

          <Typography variant="body1" component="p">
            Note that our data is licensed under{' '}
            <ExternalLink href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
              Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
              International
            </ExternalLink>
            . All commercial entities wishing to access our API should contact{' '}
            <ExternalLink href="mailto:info@covidactnow.org">
              info@covidactnow.org
            </ExternalLink>{' '}
            to acquire a commercial license. We define commercial users as any
            individual or entity engaged in commercial activities, such as
            selling goods or services. Our non-commercial users can freely
            download, use, share, modify, or build upon our source code.
          </Typography>
          <Typography variant="body1" component="p">
            Please also note that V1.0 of our API will be deprecated on October
            5, 2020. See our{' '}
            <ExternalLink href="https://apidocs.covidactnow.org/migration">
              documentation
            </ExternalLink>{' '}
            for migration instructions.
          </Typography>
          <SectionHeader variant="h4" component="h2" id="embed">
            Embed
          </SectionHeader>
          <Typography variant="body1" component="p">
            We want our data and modeling to be available to all who are
            interested, including by third parties. That’s why we’ve made our
            data embeddable by other publishers.
          </Typography>
          <Typography variant="body1" component="p">
            Read our{' '}
            <a
              href="https://blog.covidactnow.org/data-feeds/"
              target="_blank"
              rel="noopener noreferrer"
            >
              blog post
            </a>{' '}
            for instructions for how to use our embed. Here's what it looks like
            live:
          </Typography>
          <iframe
            src="https://covidactnow.org/embed/us/colorado-co"
            title="Covid Act Now"
            width="350"
            height="700"
            frameBorder="0"
            scrolling="no"
          />
        </StapledSidebar>
      </Content>
      <ShareBlock />
    </Wrapper>
  );
};

export default Resources;
