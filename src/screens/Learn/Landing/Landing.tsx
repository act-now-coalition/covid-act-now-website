import React, { Fragment } from 'react';
import {
  PageContainer,
  PageHeader,
  SectionHeader,
  MarkdownBodyCopy,
} from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import SectionButton, { ButtonTheme } from './SectionButton';
import TableOfContents, { Item } from 'components/TableOfContents';
import { Anchor } from 'components/TableOfContents';
import { LandingSection } from 'cms-content/learn';
import { formatNumericalDate } from 'common/utils';

const Landing = () => {
  //stand-in content:
  const sections = [
    {
      sectionTitle: 'Glossary',
      sectionId: 'glossary',
      description:
        'Our modeling and data partners include [Grand Rounds](https://grandrounds.com/), a digital healthcare company committed to making healthcare simpler and more accessible while improving outcomes, and [USA Facts](https://usafacts.org/), an initiative launched by Steve Ballmer (former CEO of Microsoft) in 2017 to provide Americans with a single source for accurate, nonpartisan information about our country.',
      buttonCta: 'See glossary',
      buttonRedirect: '/glossary',
    },
    {
      sectionTitle: 'FAQ',
      sectionId: 'faq',
      description:
        'FAQ Our modeling and data partners include [Grand Rounds](https://grandrounds.com/), a digital healthcare company committed to making healthcare simpler and more accessible while improving outcomes, and [USA Facts](https://usafacts.org/), an initiative launched by Steve Ballmer (former CEO of Microsoft) in 2017 to provide Americans with a single source for accurate, nonpartisan information about our country.',
      buttonCta: 'See FAQ',
      buttonRedirect: '/faq',
    },
  ];

  const header = 'Learn';

  function getSectionItems(sections: LandingSection[]): Item[] {
    return sections.map(section => ({
      id: section.sectionId,
      title: section.sectionTitle,
    }));
  }

  const date = formatNumericalDate(new Date());

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/learn"
        pageTitle="COVID-19 Essential Information & Resources - Covid Act Now"
        pageDescription={`${date} Find recent and trusted information & resources about the novel Coronavirus (2019-nCoV). Learn about Symptoms, Tests, Risks, and more. Backed by medical experts. Make informed decisions to stop the disease for you and your community.`}
      />
      <PageContainer>
        <PageHeader>{header}</PageHeader>
        <TableOfContents items={getSectionItems(sections)} />
        {sections.map((section: LandingSection) => (
          <Fragment key={section.sectionId}>
            <SectionHeader>
              <Anchor id={section.sectionId} />
              {section.sectionTitle}
            </SectionHeader>
            <MarkdownBodyCopy source={section.description} />
            <SectionButton
              cta={section.buttonCta}
              redirect={section.buttonRedirect}
              theme={ButtonTheme.WHITE}
            />
          </Fragment>
        ))}
      </PageContainer>
    </Fragment>
  );
};

export default Landing;
