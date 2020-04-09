type TeamMember = { name: string; title: string; link: string };

const team: TeamMember[] = [
  {
    name: 'Max Henderson',
    title: 'Ex-Firebase/Google Data Science & Product Leader',
    link: 'https://www.linkedin.com/in/maxhenderson/',
  },
  {
    name: 'Igor Kofman',
    title: 'Ex-CTO, Dropbox Paper',
    link: 'https://twitter.com/igorkofman',
  },
  {
    name: 'Representative Jonathan Kreiss-Tomkins',
    title: 'Alaska Legislature',
    link: 'https://en.wikipedia.org/wiki/Jonathan_Kreiss-Tomkins',
  },
  {
    name: 'Professor Rebecca Katz, PhD, MPH',
    title:
      'Director of the Center for Global Health Science and Security, Georgetown University',
    link: 'https://www.linkedin.com/in/rebecca-katz-43a04a5/',
  },
  {
    name: 'Dr. Nirav Shah, MD, MPH',
    title:
      'Senior Scholar, Stanford University Clinical Excellence Research Center',
    link: 'https://profiles.stanford.edu/nirav-shah',
  },
  {
    name: 'Ellie Graeden, PhD',
    title:
      'CEO, Talus Analytics; Affiliate and Adjunct, Georgetown University Center for Global Health Science and Security',
    link: 'https://www.linkedin.com/in/egraeden/',
  },
  {
    name: 'James Tamplin',
    title: 'Founder/CEO, Firebase',
    link: 'https://www.linkedin.com/in/jamest/',
  },
  {
    name: 'Zack Rosen',
    title: 'CEO, Pantheon',
    link: 'https://www.linkedin.com/in/zacharyrosen/',
  },
  {
    name: 'Stephen Fiskell',
    title: 'Founder, Commonbook.me',
    link: 'https://www.linkedin.com/in/takemoreaction/',
  },
  {
    name: 'Zack Rosen',
    title: 'Engineering Lead, Stitch Labs',
    link: 'https://www.linkedin.com/in/zack-rosen-a03abb3a/',
  },
  {
    name: 'David Strauss',
    title: 'CTO, Pantheon',
    link: 'https://twitter.com/davidstrauss?lang=en',
  },
  {
    name: 'Elwyn Moir',
    title: 'COMET Fellow, Stanford Medicine',
    link: 'https://www.linkedin.com/in/elwyn-moir-12b1766b/',
  },
  {
    name: 'Ali Berlin Johnson',
    title: 'Former Lead Designer, Firebase',
    link: 'https://www.linkedin.com/in/berlinjohnson/',
  },
  {
    name: 'Misha Chellam',
    title: 'Council on Society & Technology',
    link: 'https://www.linkedin.com/in/mishachellam/',
  },
  {
    name: 'Jacob Redding',
    title: 'Senior Principal, Accenture',
    link: 'https://www.linkedin.com/in/jacobredding/',
  },
  {
    name: 'Joseph Ensminger',
    title: 'Founder, J.E. Consulting',
    link: 'https://www.linkedin.com/in/josephensminger/',
  },
  {
    name: 'Simon Frid',
    title: 'Founder, Fridiculous Ventures',
    link: 'https://www.linkedin.com/in/simonfrid/',
  },
  {
    name: 'Virsaviya Efraim',
    title: 'Software Engineer, Almanac',
    link: 'https://www.linkedin.com/in/virsaviyaefraim/',
  },
  {
    name: 'Adnan Pirzada',
    title: 'Software Engineer, Lattice',
    link: 'https://www.linkedin.com/in/adpirz/',
  },
  {
    name: 'Rachel RoseFigura',
    title: 'Software Engineer, Uber',
    link: 'https://www.linkedin.com/in/rachelrosefigura/',
  },
  {
    name: 'Dani Fontanesi',
    title:
      'Former Associate General Counsel of an Andreessen Horowitz tech company',
    link: 'https://www.linkedin.com/in/dani-fontanesi-esq-26509a8/',
  },
  {
    name: 'Jess Schwartz',
    title: 'Lead Program Manager, Google',
    link: 'https://www.linkedin.com/in/jessicajschwartz/',
  },
  {
    name: 'Trae Wallace',
    title: 'Head of Data, Talus Analytics',
    link: 'https://www.linkedin.com/in/traewallace/',
  },
  {
    name: 'Chris Wilcox',
    title: 'Senior Engineer, Google',
    link: 'https://www.linkedin.com/in/chrisrwilcox/',
  },
  {
    name: 'Michael Lehenbauer',
    title: 'Former Software Engineer, Google',
    link: 'https://www.linkedin.com/in/mikelehen/',
  },
  {
    name: 'Chris Kelly',
    title: 'Software Engineer, Fritz',
    link: 'https://www.linkedin.com/in/ckelly90/',
  },
  {
    name: 'Vincent Woo',
    title: 'Founder, CoderPad',
    link: 'https://www.linkedin.com/in/vincent-woo-b2716399/',
  },
  {
    name: 'Jeremy Lubin',
    title: 'Former Lead Designer, Square',
    link: 'https://www.linkedin.com/in/jeremy-lubin/',
  },
  {
    name: 'Mike McDonald',
    title: 'Head of Product, Stedi',
    link: 'https://www.linkedin.com/in/asciimike/',
  },
  {
    name: 'Rebecca Mark',
    title: 'Former Head of Public Affairs and Policy, Cruise',
    link: 'https://www.linkedin.com/in/rebeccamark/',
  },
  {
    name: 'Audra Grassia',
    title: 'Former Senior Director, ACRONYM',
    link: 'https://www.linkedin.com/in/audragrassia/',
  },
  {
    name: 'Bradley Lautenbach',
    title: 'Vice President, Marriott',
    link: 'https://www.linkedin.com/in/lautenbach/',
  },
  {
    name: 'Laurent Crenshaw',
    title: 'Director of Public Policy, Yelp',
    link: 'https://www.linkedin.com/in/laurentcrenshaw/',
  },
  {
    name: 'Anya Lehr',
    title: 'Former Director of Operations, Vice Media',
    link: 'https://www.linkedin.com/in/anyalehr/',
  },
  {
    name: 'Debbie Lai',
    title: 'Former Strategic Partnerships Manager, Google',
    link: 'https://www.linkedin.com/in/iamdlai/',
  },
  {
    name: 'Hannah Lee',
    title: 'Former Operations Manager, Google',
    link: 'https://www.linkedin.com/in/hannahbnguyen/',
  },
  {
    name: 'Brittany Braxton',
    title: 'Executive Business Partner, Pantheon',
    link: 'https://www.linkedin.com/in/brittany-braxton-39187549/',
  },
  {
    name: 'Shaeleigh Jacobs',
    title: 'Principal Research Investigator, Austin Paey University',
    link: 'https://www.linkedin.com/in/shaeleigh-jacobs-672152114/',
  },
  {
    name: 'David Duran',
    title: 'Product Operations Analyst, Google',
    link: 'https://www.linkedin.com/in/davidduran971/',
  },
  {
    name: 'Vincent DeGennaro, MD',
    title: 'Founder, Innovating Health International',
    link: 'https://www.linkedin.com/in/vincent-degennaro-jr-3b234ba3/',
  },
  {
    name: 'Susan Goldblatt',
    title: 'Former Software Engineer, Google',
    link: 'https://www.linkedin.com/in/susan-goldblatt/',
  },
  {
    name: 'Abe Haskins',
    title: 'Developer Programs Engineer, Google',
    link: 'https://www.linkedin.com/in/abe-haskins-1a267a13/',
  },
  {
    name: 'Eusden Shing',
    title: 'Former Head of Product, Pinterest',
    link: 'https://www.linkedin.com/in/eusden/',
  },
  {
    name: 'Dan Schlosser',
    title: 'Senior Product Manager, The New York Times',
    link: 'https://www.linkedin.com/in/danrschlosser/',
  },
  {
    name: "Mikayla O'Bryan",
    title: '',
    link: 'https://www.linkedin.com/in/mikayla-o-bryan-867087135/',
  },
  {
    name: 'Doug Pan',
    title: '',
    link: 'https://www.linkedin.com/in/dougspan/',
  },
  {
    name: 'Eric Carlson',
    title: 'Senior Data Scientist, Grand Rounds',
    link: 'https://www.linkedin.com/in/eric-c-carlson/',
  },
  {
    name: 'Xinyu Zhang',
    title: 'Data Scientist, Grand Rounds',
    link: 'https://www.linkedin.com/in/xinyuzhang-cathy/',
  },
  {
    name: 'Lana Rushing',
    title: 'Founder, Rushing PR',
    link: 'https://www.linkedin.com/in/lanarushing/',
  },
];

export default team;
