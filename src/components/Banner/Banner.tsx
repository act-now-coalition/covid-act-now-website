import React from 'react';
import Grid from '@material-ui/core/Grid';
import * as Styles from './Banner.style';

const Banner: React.FC<{
  message: string;
  subMessage?: string;
  renderButton?: () => React.ReactElement;
}> = ({ message, renderButton, subMessage }) => {
  return (
    <Styles.MainContainer container spacing={1}>
      <Grid item sm md lg>
        {message}
        {subMessage && <Styles.SubMessage>{subMessage}</Styles.SubMessage>}
      </Grid>
      {renderButton && (
        <Styles.ButtonContainer item sm={4} md={3} lg={3}>
          {renderButton()}
        </Styles.ButtonContainer>
      )}
    </Styles.MainContainer>
  );
};

export default Banner;
