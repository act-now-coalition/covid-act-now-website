import React from 'react';
import Grid from '@material-ui/core/Grid';
import * as Styles from './Banner.style';

const Banner: React.FC<{
  message: string;
  renderButton?: () => React.ReactElement;
}> = ({ message, renderButton }) => {
  return (
    <Styles.MainContainer container role="banner">
      <Grid item sm md lg>
        {message}
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
