import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Email } from '@material-ui/icons';
import { TEAM } from './../../enums';

import { Wrapper, Content } from './About.style';

const About = ({ children }) => {
  return (
    <Wrapper style={{ backgroundColor: '#F2F2F2' }}>
      <Content>
        <Typography variant="h3" component="h1">
          About
        </Typography>
        <Typography variant="body1" component="p">
          <a href="CovidActNow.org" target="_blank">CovidActNow.org</a> was created by a team of data scientists, engineers, and designers in partnership with epidemiologists, public health officials, and political leaders to help understand how the COVID-19 pandemic will affect their region.
        </Typography>
        <Typography variant="body1" component="p">
          This tool is built to enable political leaders to quickly make decisions in their Coronavirus response informed by best available data and modeling.
        </Typography>
        <Typography variant="body1" component="p">
          We built this tool to answer critically important questions such as:
        </Typography>
        <ul>
          <li>
            What will the impact be in my region be and when can I expect it?
          </li>
          <li>
            How long until my hospital system is under severe pressure?
          </li>
          <li>
            What is my menu of interventions, and how will they address the spread of Coronavirus?
          </li>
        </ul>
        <Typography variant="h3" component="h1">
          Who built this tool?
        </Typography>
        <Typography variant="p" component="p">
          CoVidActNow was founded by <a href="https://www.linkedin.com/in/maxhenderson/">Max Henderson</a>, <a href="https://en.wikipedia.org/wiki/Jonathan_Kreiss-Tomkins">Rep Jonathan Kreiss-Tomkins</a>, <a href="https://twitter.com/igorkofman">Igor Kofman</a>, and <a href="https://www.linkedin.com/in/zacharyrosen/">Zack Rosen</a>, with medical and policy guidance from <a href="">Nirav R. Shah</a> (MD, MPH, senior scholar, Stanford University Clinical Excellence Research Center).
        </Typography>
        <Typography variant="p" component="p">
          We have since grown into a large distributed team:
        </Typography>
        <ul>
          {TEAM.map(teammate => { return <li>
              <a href={teammate.link} target="_blank">{teammate.name}</a> {" "}{teammate.title}
            </li>})
          }
        </ul>

        <Typography variant="p" component="p">
          Our work has been <a href="https://covidactnow.org/endorsements" target="_blank">validated and endorsed</a> by a number of experts in epidemiology, public health, and medicine.
        </Typography>
        <Typography variant="p" component="p">
          <a href="https://docs.google.com/spreadsheets/u/3/d/1YEj4Vr6lG1jQ1R3LG6frijJYNynKcgTjzo2n0FsBwZA/htmlview#gid=1579455912" target="_blank">Our model is public.</a>
        </Typography>
        <Typography variant="p" component="p">
          <a href="https://docs.google.com/document/u/3/d/1ETeXAfYOvArfLvlxExE0_xrO5M4ITC0_Am38CRusCko/preview?sle=true" target="_blank">So are our assumptions and definitions.</a>
        </Typography>

        <Typography variant="h3" component="h1">
          Why did we build it?
        </Typography>

        <Typography variant="p" component="p">
         We built covidactnow.org to <a href="https://medium.com/@tomaspueyo/coronavirus-act-today-or-people-will-die-f4d3d9cd99ca" target="_blank">solve an urgent problem:</a> If we try to fight COVID in the present we will lose (e.g., Italy). We can only beat COVID by understanding what it will do to us in the near future.
        </Typography>

        <Typography variant="p" component="p">
         Coronavirus response leaders need the tools to do this — we are building them the tools.
        </Typography>

        <Typography variant="h3" component="h1">
          Can I contribute?
        </Typography>
        <Typography variant="p" component="p">
          Yes. To improve the capability and accuracy of the tool, we need the help of:
        </Typography>
        <ul>
          <li>
            Epidemiologists with expertise in modeling virus propagation
          </li>
          <li>UI/UX Designers</li>
          <li>
            Engineers:{' '}
            <Link
              underline="hover"
              color="textPrimary"
              href="https://github.com/covid-projections/covid-projections"
            >
              JavaScript (React),
            </Link>{' '}
            <Link
              underline="hover"
              color="textPrimary"
              href="https://github.com/covid-projections/covid-data-model"
            >
              Python
            </Link>
          </li>
          <li>Data scientists</li>
          <li>Communications Leaders</li>
          <li>Product Manager</li>
        </ul>
        <Typography variant="p" component="p">
          <a href="mailto:jonathan@covidactnow.org" target="_blank">Email us</a> to share feedback or access to expertise, questions, or if you otherwise want to help.
        </Typography>
      </Content>
    </Wrapper>
  );
};

export default About;
