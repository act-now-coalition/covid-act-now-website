import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import ShareBlock from 'components/ShareBlock/ShareBlock';
import StapledSidebar, {
  SidebarLink,
  SectionHeader,
} from 'components/StapledSidebar/StapledSidebar';

import { Wrapper, Content, Header } from './Resources.style';

const sidebar = (
  <React.Fragment>
    <SidebarLink href="#model">U.S. Interventions Model</SidebarLink>
    <SidebarLink href="#api">API</SidebarLink>
    <SidebarLink href="#csv-files">CSV Files</SidebarLink>
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
          <SectionHeader variant="h4" component="h4" id="model">
            U.S. Interventions Model
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

          <SectionHeader variant="h4" component="h4" id="api">
            API
          </SectionHeader>

          <Typography variant="body1" component="p">
            We launched the{' '}
            <a
              href="https://github.com/covid-projections/covid-data-model/blob/master/api/README.V1.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Covid Act Now API
            </a>{' '}
            to make the data that powers our model available to anyone, free of
            charge, under a{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creative Commons 4.0 license
            </a>
            .
          </Typography>
          <Typography variant="body1" component="p">
            Specifically, our API exposes:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" component="p">
                <strong>Reported data:</strong> State and county level data for
                confirmed cases, deaths, and hospital bed capacity. The data is
                collected from a number of sources, including Johns Hopkins
                University, and is updated daily.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                <strong>Forward projections:</strong> State- and county-level
                projections for hospitalizations and deaths based on several
                possible interventions. This data is generated from our model.
              </Typography>
            </li>
          </ul>
          <Typography variant="body1" component="p">
            In the future, we intend to make more data available, including:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" component="p">
                Additional file formats like shapefiles for GIS systems.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                Integrations with data visualization products, such as{' '}
                <a
                  href="https://www.tableau.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tableau
                </a>
                .
              </Typography>
            </li>
          </ul>
          <Typography variant="body1" component="p">
            In order to safely reopen the country and keep COVID in check, our
            country must work together in an unprecedented fashion. We hope the
            data we provide plays a small, positive role. Please use it, adapt
            it, visualize it, and otherwise have at it!
          </Typography>
          <Typography variant="body1" component="p">
            For more on the API{' '}
            <a
              href="https://blog.covidactnow.org/covid-act-now-api-intervention-model/"
              target="_blank"
              rel="noopener noreferrer"
            >
              see our blog post
            </a>
            .
          </Typography>

          <SectionHeader variant="h4" component="h4" id="csv-files">
            CSV Files
          </SectionHeader>
          <Typography variant="body1" component="p">
            If you prefer a spreadsheet to code, we have you covered. See our{' '}
            <a
              href="https://blog.covidactnow.org/export-covid-act-now-data-spreadsheet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              blog post
            </a>{' '}
            for full details on how to import our data into Excel or Google
            Sheets.
          </Typography>

          <SectionHeader variant="h4" component="h4" id="embed">
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
            src="https://covidactnow.org/embed/us/co"
            title="CoVid Act Now"
            width="350"
            height="700"
            frameBorder="0"
            scrolling="no"
          />
          <ShareBlock forceVertical={true} />
        </StapledSidebar>
      </Content>
    </Wrapper>
  );
};

export default Resources;
