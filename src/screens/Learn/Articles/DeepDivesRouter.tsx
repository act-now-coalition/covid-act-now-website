import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import updatesArticles from 'cms-content/updates';
import explainedArticles from 'cms-content/explained';

const DeepDivesRedirect: React.FC = () => {
  return (
    <Switch>
      {updatesArticles.map(({ articleID }) => (
        <Redirect
          exact
          from={`/deep-dives/${articleID}`}
          to={`/covid-act-now-updates/${articleID}`}
        />
      ))}
      {explainedArticles.map(({ articleID }) => (
        <Redirect
          exact
          from={`/deep-dives/${articleID}`}
          to={`/covid-explained/${articleID}`}
        />
      ))}
      <Redirect exact from="/deep-dives" to="/covid-explained" />
    </Switch>
  );
};

export default DeepDivesRedirect;
