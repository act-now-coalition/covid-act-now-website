import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { caseStudiesContent } from 'cms-content/learn';
import * as Style from '../Learn.style';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const { header, intro, categories } = caseStudiesContent;

const Landing: React.FC = () => {
  let { url } = useRouteMatch();
  return (
    <Style.PageContainer>
      <Style.PageContent>
        <h1>{header}</h1>
        <p>{intro}</p>
        {categories.map(category => (
          <div key={category.categoryId}>
            <h2>{category.header}</h2>
            {category?.caseStudies &&
              category.caseStudies.map(caseStudy => (
                <Card key={caseStudy.caseStudyId}>
                  <CardContent>
                    <h3>{caseStudy.shortTitle}</h3>
                    <img
                      height={28}
                      src={caseStudy.logoUrl}
                      alt={caseStudy.logoAltText}
                    />
                    <p>{caseStudy.summary}</p>
                    <Link to={`${url}/${caseStudy.caseStudyId}`}>Go</Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        ))}
      </Style.PageContent>
    </Style.PageContainer>
  );
};
export default Landing;
