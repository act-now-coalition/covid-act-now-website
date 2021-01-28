import React from 'react';
import moment from 'moment';
import { Wrapper, Content, Subcopy, Header } from './NewHomepageHeader.style';
import { useModelLastUpdatedDate } from 'common/utils/model';

const NewHomePageHeader: React.FC = () => {
  const lastUpdatedDate = useModelLastUpdatedDate() || new Date();

  return (
    <Wrapper>
      <Content>
        <Header>COVID Risk Levels &amp; Vaccine Info</Header>
        <Subcopy>
          Updated on {moment.utc(lastUpdatedDate).format('MMMM D')}
        </Subcopy>
      </Content>
    </Wrapper>
  );
};

export default NewHomePageHeader;
