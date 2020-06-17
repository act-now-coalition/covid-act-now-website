import React, { Fragment, useState, useEffect } from 'react';
import {
  Wrapper,
  LogoContainer,
  AlertHeader,
  BellIconContainer,
  AlertLocationIntro,
  AlertLocation,
  AlertBody,
  OverallThreatCopy,
  DirectionChangeContainer,
  BodyCopyBold,
  LastUpdatedDate,
  ThermometerContainer,
  ThermometerRow,
  NowOrPrevContainer,
  NowOrPrevText,
  ThermometerLevelColor,
  ThermometerLevelText,
  ViewChartButton,
  FooterWrapper,
  LeaveFeedbackCopy,
  FeedbackInstructionsCopy,
} from 'components/AlertEmail/AlertEmail.style';
import Logo from 'assets/images/logoUrlLight';
import NotificationsNoneOutlined from '@material-ui/icons/NotificationsNoneOutlined';
import { LEVEL_COLOR } from 'common/colors';
import { Level } from 'common/level';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

function EmailFooter() {
  return (
    <FooterWrapper>
      <LeaveFeedbackCopy>Leave feedback</LeaveFeedbackCopy>
      <FeedbackInstructionsCopy>
        Tell us how we can provide you more useful COVID-related stats and
        projections in your area. <strong>Just respond to this email.</strong>{' '}
      </FeedbackInstructionsCopy>
      <LogoContainer>
        <Logo height={20} />
      </LogoContainer>
      <FeedbackInstructionsCopy as="a">Unsubscribe</FeedbackInstructionsCopy>
    </FooterWrapper>
  );
}

function AlertEmail() {
  const location = 'TRAVIS COUNTY, TX';
  const updatedLocation = '5/1/2020';

  const [direction, setDirection] = useState('');
  const [currentLevel, setCurrentLevel] = useState(3);
  const [previousLevel, setPreviousLevel] = useState(2);

  useEffect(() => {
    if (currentLevel > previousLevel) setDirection('Increased');
    else setDirection('Decreased');
  }, [currentLevel, previousLevel]);

  const thermometerContent = [
    {
      level: Level.HIGH,
      text: 'Active outbreak or major gaps',
      color: `${LEVEL_COLOR[Level.HIGH]}`,
      bgColor: 'rgba(255, 0, 52, 0.05)',
    },
    {
      level: Level.MEDIUM_HIGH,
      text: 'Risk of second spike',
      color: `${LEVEL_COLOR[Level.MEDIUM_HIGH]}`,
      bgColor: 'rgba(255, 150, 0, 0.05)',
    },
    {
      level: Level.MEDIUM,
      text: 'On track for herd immunity',
      color: `${LEVEL_COLOR[Level.MEDIUM]}`,
      bgColor: 'rgba(255, 201, 0, 0.05)',
    },
    {
      level: Level.LOW,
      text: 'On track for containment',
      color: `${LEVEL_COLOR[Level.LOW]}`,
      bgColor: 'rgba(0, 212, 116, 0.05)',
    },
  ];

  const arrowIcon =
    direction === 'Increased' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;

  function mapThermometerRows(row: any, i: any) {
    const isCurrentLevel = row.level === currentLevel;
    const isPrevLevel = row.level === previousLevel;
    const statusText = isCurrentLevel ? 'Now' : 'Prev';

    return (
      <ThermometerRow
        isCurrentLevel={isCurrentLevel}
        color={row.color}
        bgColor={row.bgColor}
      >
        <NowOrPrevContainer isCurrentLevel={isCurrentLevel}>
          {(isCurrentLevel || isPrevLevel) && (
            <Fragment>
              <NowOrPrevText isCurrentLevel={isCurrentLevel}>
                {statusText}
              </NowOrPrevText>
              <ArrowRightIcon />
            </Fragment>
          )}
        </NowOrPrevContainer>
        <ThermometerLevelColor
          isCurrentLevel={isCurrentLevel}
          color={row.color}
          level={row.level}
        />
        <ThermometerLevelText isCurrentLevel={isCurrentLevel}>
          {row.text}
        </ThermometerLevelText>
      </ThermometerRow>
    );
  }

  return (
    <Wrapper>
      <LogoContainer>
        <Logo height={20} />
      </LogoContainer>
      <AlertHeader>
        <BellIconContainer>
          <NotificationsNoneOutlined />
        </BellIconContainer>
        <AlertLocationIntro>Covid Alert For</AlertLocationIntro>
        <AlertLocation>{location}</AlertLocation>
      </AlertHeader>
      <AlertBody>
        <OverallThreatCopy>Overall Covid Threat</OverallThreatCopy>
        <DirectionChangeContainer>
          {arrowIcon}
          <BodyCopyBold>{direction}</BodyCopyBold>
        </DirectionChangeContainer>
        <LastUpdatedDate>on {updatedLocation}</LastUpdatedDate>
        <ThermometerContainer>
          {thermometerContent.map((row, i) => mapThermometerRows(row, i))}
        </ThermometerContainer>
      </AlertBody>
      <ViewChartButton>View metrics and charts</ViewChartButton>
      <EmailFooter />
    </Wrapper>
  );
}

export default AlertEmail;
