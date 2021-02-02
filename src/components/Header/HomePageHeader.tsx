import React from 'react';
import moment from 'moment';
import { Wrapper, Content, Subcopy, Header } from './HomePageHeader.style';
import { useModelLastUpdatedDate } from 'common/utils/model';

const HomePageHeader: React.FC = () => {
  const lastUpdatedDate = useModelLastUpdatedDate() || new Date();

  return (
    <Wrapper>
      <Content>
        <Header>U.S. COVID Risk &amp; Vaccine Tracker</Header>
        <Subcopy>
          Updated on {moment.utc(lastUpdatedDate).format('MMMM D')}
        </Subcopy>
      </Content>
    </Wrapper>
  );
};

export default HomePageHeader;
