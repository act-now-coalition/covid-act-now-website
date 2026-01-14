import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import explainedArticles from 'cms-content/explained';

const DeepDivesRedirect: React.FC = () => {
  return (
    <Switch>
      {explainedArticles.map(({ articleID }) => (
        <Redirect exact from={`/deep-dives/${articleID}`} to="/" />
      ))}
      <Redirect exact from="/deep-dives" to="/" />
    </Switch>
  );
};

export default DeepDivesRedirect;
