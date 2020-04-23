import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';

import {
  Credential,
  Profile,
  ProfileHeader,
  Wrapper,
  Inner,
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
      <Inner>
        <Grid container>
          <Grid item xs={12} sm={quote ? 4 : 12}>
            <Profile>
              <ProfileHeader
                onClick={() => window.open(profileUrl, '_blank')}
                avatar={
                  <Avatar
                    aria-label={name}
                    src={window.location.origin + avatarUrl}
                  />
                }
                title={name}
              />
              <Divider variant="middle" />
              <Left>
                <CardContent>
                  {credentials.map((c, index) => (
                    <Credential
                      key={index}
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {c}
                    </Credential>
                  ))}
                </CardContent>
              </Left>
            </Profile>
          </Grid>
          {quote && (
            <Grid item xs={12} sm={8}>
              <Quote>
                <Typography variant="body1" component="p">
                  {quote}
                </Typography>
              </Quote>
            </Grid>
          )}
        </Grid>
      </Inner>
    </Wrapper>
  );
};

export default EndorsementCard;
