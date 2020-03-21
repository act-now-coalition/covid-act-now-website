import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';

import {
  Credential,
  Profile,
  ProfileHeader,
  Wrapper,
  Left,
  Quote,
} from './EndorsementCard.style';
import { Typography } from '@material-ui/core';

const EndorsementCard = ({
  name,
  avatarUrl,
  profileUrl,
  credentials,
  quote,
}) => {
  return (
    <Wrapper>
      <Profile>
        <ProfileHeader
          onClick={() => window.open(profileUrl, '_blank')}
          avatar={<Avatar aria-label={name} src={avatarUrl} />}
          title={name}
        />
        <Divider variant="middle" />
        <Left>
          <CardContent>
            {credentials.map(c => (
              <Credential variant="body2" color="textSecondary" component="p">
                {c}
              </Credential>
            ))}
          </CardContent>
        </Left>
      </Profile>
      {quote && (
        <Quote>
          <Typography variant="body1" component="p">
            {quote}
          </Typography>
        </Quote>
      )}
    </Wrapper>
  );
};

export default EndorsementCard;
