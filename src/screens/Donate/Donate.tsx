import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { Icon } from '@iconify/react';
import testTube from '@iconify/icons-twemoji/test-tube';
import loveLetter from '@iconify/icons-twemoji/love-letter';
import deliveryTruck from '@iconify/icons-twemoji/delivery-truck';
import {
  EmbedWrapper,
  ContentWrapper,
  SectionHeader,
  ContentSection,
  ListHeader,
  BodyCopy,
  ListSection,
} from 'screens/Donate/Donate.style';
import PartnersSection from 'screens/HomePage/PartnersSection';

const roadmapListContent = [
  {
    header: 'Improve our data quality',
    listItems: [
      'More accurate data',
      'More transparency of data sources',
      'Encourage states to adopt better contact tracing data practices',
    ],
  },
  {
    header: 'Inspire more action',
    listItems: [
      'Localized recommendations for masking, schools, and businesses based on new daily cases and positivity rate',
      'Localized masking compliance; illustrate impact of increasing compliance',
      'Continually survey our audience to understand their biggest needs as they change',
    ],
  },
  {
    header: 'Expand our reach',
    listItems: [
      'More educational content so that more people can understand our Warning System',
      'Closer relationships with high-risk and underserved communities',
      'More tools for scientists and journalists to help uncover new trends and correlations',
    ],
  },
];

const Donate = () => {
  return (
    <Fragment>
      <EmbedWrapper>
        <iframe
          title="Donation embed"
          src="https://givebutter.com/embed/c/covidactnow"
          width="100%"
          height="100%"
          style={{ maxWidth: '601px' }}
          name="givebutter"
          frameBorder="0"
          seamless
          data-allowPaymentRequest
        ></iframe>
        <script src="https://givebutter.com/js/widget.js"></script>
      </EmbedWrapper>
      <ContentWrapper container justify="center">
        <Grid item xs={12} sm={6}>
          <ContentSection>
            <Icon icon={loveLetter} />
            <SectionHeader>How your donation helps</SectionHeader>
            <BodyCopy>
              We’re a tiny team working relentlessly to provide free, accessible
              data to policy makers and the public. We need financial support to
              pay for our infustructure costs, our small full-time staff, and
              continue launching new features.
            </BodyCopy>
          </ContentSection>
          <ContentSection>
            <Icon icon={testTube} />
            <SectionHeader>Our theory of change</SectionHeader>
            <BodyCopy>
              By providing clearer, more accessible, locally-relevant and
              science-based guidance that the general public and decision-makers
              can understand, rally behind and communicate, we can advance a
              more unified and more effective response to COVID in the U.S.
            </BodyCopy>
            <a href="/about" target="_blank" rel="noopener noreferrer">
              Learn more about us
            </a>
          </ContentSection>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ContentSection>
            <Icon icon={deliveryTruck} />
            <SectionHeader>Our roadmap</SectionHeader>
            {roadmapListContent.map((section, i) => {
              return (
                <ListSection>
                  <ListHeader>{section.header}</ListHeader>
                  {section.listItems.map(listItem => {
                    return <li>{listItem}</li>;
                  })}
                </ListSection>
              );
            })}
          </ContentSection>
        </Grid>
        <PartnersSection />
      </ContentWrapper>
    </Fragment>
  );
};

export default Donate;
