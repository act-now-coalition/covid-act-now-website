import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import { Endorser } from 'enums/endorsers';
import {
  Credential,
  Profile,
  ProfileHeader,
  Wrapper,
  Left,
} from './EndorsementCard.style';

const EndorsementCard = ({
  name,
  avatarUrl,
  profileUrl,
  credentials,
}: Endorser) => {
  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={12} sm={12}>
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
      </Grid>
    </Wrapper>
  );
};

export default EndorsementCard;
