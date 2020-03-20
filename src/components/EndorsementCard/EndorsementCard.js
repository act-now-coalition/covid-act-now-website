import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import { ProfileHeader, Credential, Profile } from './EndorsementCard.style';

const EndorsementCard = ({ name, avatarUrl, profileUrl, credentials }) => {
  return (
    <Profile>
      <ProfileHeader
        onClick={() => window.open(profileUrl, '_blank')}
        avatar={<Avatar aria-label={name} src={avatarUrl} />}
        title={name}
      />
      <Divider variant="middle" />
      <CardContent>
        {credentials.map(c => (
          <Credential variant="body2" color="textSecondary" component="p">
            {c}
          </Credential>
        ))}
      </CardContent>
    </Profile>
  );
};

export default EndorsementCard;
