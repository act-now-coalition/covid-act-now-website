import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Wrapper, Content } from './Footer.style';

const Footer = ({ children }) => {
  return (
    <Wrapper style={{ backgroundColor: "#F2F2F2" }}>
      <Content>
        <Typography variant="h3" component="h3">
          How to use this tool
        </Typography>
        <Typography variant="body2" component="p">
          This tool is built to enable political leaders to quickly make decisions in their Coronavirus response informed by best available data and modeling.
          <br /><br />
          Here are the questions we built this tool to answer:<br />

          1) What will the impact be in my region be and when can I expect it?<br />
          2) How long until my hospital system is under severe pressure?<br />
          3) What are my menu of interventions, and how will they address the spread of Coronavirus?
        </Typography>
    
        <Typography variant="h3" component="h3">
          Endorsements
        </Typography>
        <Typography variant="body2" component="p">
          While no projection is perfect, we endorse this tool and model as a valid and important way to frame the decisions political leaders must make NOW.
          <br /><br />
          - Nirav Shah, MD, MPH, Senior Scholar, Stanford University Clinical Excellence Research Center; Former Commissioner, New York State Department of Health
          <br /><br />
          More are forthcoming. Please email us if you wish to add your name to this list as a credentialed scientist in public health or infectious disease.
        </Typography>
    
    
        <Typography variant="h3" component="h3">
          FAQ
        </Typography>
        <Typography variant="h5" component="h5">
          What are the assumptions of the model?
        </Typography>
        <Typography variant="body2" component="p">
          The model is public, and <a href="https://bit.ly/391uB80">can be viewed here</a>. Reference materials, including assumptions, logic, and definitions <a href="https://bit.ly/394SJ9I">are available here</a>.
        </Typography>
    
    
        <Typography variant="h5" component="h5">
          What are the current limitations of the model?
        </Typography>
        <Typography variant="body2" component="p">
          - Only a small fraction of the world has been infected. It’s a new disease. Variables will change. <br />
          - R0s for interventions are guesses, in some cases informed by data. There is no historical precedent for what is going on right now to draw from. <br />
          - Many of the inputs into this model (hospitalization rate, hospitalization rate) are based on early estimates that are likely to be wrong. All users should err on the side of caution and interpret the results of the model conservatively. <br />
          - The default R0 used in this model is an average. The model does not adjust for the population density, culturally-determined interaction frequency and closeness, humidity, temperature, etc in calculating R0. <br />
          - This is not a node-based analysis, and thus assumes everyone spreads the disease at the same rate. In practice, there are some folks who are “super-spreaders,” and others who are almost isolated. Interventions should be targeted primarily at those most likely to spread the disease. <br />
          - Only hospital beds at aggregate are considered. ICU beds and ventilators, which are likely to run low before beds, are not considered. <br />
          - Demographics, populations, and hospital bed counts are outdated. Demographics for the USA as a whole are used, rather than specific to each state. <br />
          - In containment cases, we do not deal with the longer-term impacts of maintaining containment, primarily the concern with avoiding reintroduction of the disease due to incoming travelers. 14-day mandatory border quarantines, such as those currently in place in China, would likely need to continue until a vaccine or therapeutic is developed.
        </Typography>
  
        <Typography variant="h5" component="h5">
          Comments, Questions, Or Want to Get Involved?
        </Typography>
        <Typography variant="body2" component="p">
          To improve the capabilities and accuracy of our tool, we are requesting the help of:
          <br /><br />
          - Epidemiologists with expertise in modeling virus propagation<br />
          - Interface designers<br />
          - Engineers: Python, Javascript<br />
          - Data scientists
          <br /><br />
          If you have time to give us feedback or access to this expertise, have questions, or otherwise want ot get involved, please get in touch with us via email: <a href="mailto:jonathan@covidactnow.org">jonathan(at)covidactnow.org</a>. 
         </Typography>

    
      </Content>
    </Wrapper>
  );
};

export default Footer;
