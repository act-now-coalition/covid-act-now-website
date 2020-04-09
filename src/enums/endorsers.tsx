export type Endorser = {
  size: number;
  name: string;
  avatarUrl: string;
  profileUrl: string;
  credentials: string[];
};

const endorsers: Endorser[] = [
  {
    size: 4,
    name: 'Nirav Shah, MD, MPH',
    avatarUrl: '/images/endorsers/nirav_shah__resized-100-100.jpg',
    profileUrl: 'https://profiles.stanford.edu/nirav-shah',
    credentials: [
      'Senior Scholar, Stanford University Clinical Excellence Research Center',
      'Former Commissioner, New York State Department of Health',
    ],
  },
  {
    size: 4,
    name: "Valerie Nurr'araaluk Davidson, JD",
    avatarUrl: '/images/endorsers/Valerie-Davidson-A__resized-100-100.jpg',
    profileUrl: 'https://en.wikipedia.org/wiki/Valerie_Davidson',
    credentials: [
      'Former Commissioner, Alaska Department of Health and Social Services',
      "Founder's Council member, United States of Care",
    ],
  },
  {
    size: 4,
    name: 'Tomas Pueyo, MSc, MBA',
    avatarUrl: '/images/endorsers/tomas_pueyo__resized-100-100.png',
    profileUrl: 'https://medium.com/@tomaspueyo',
    credentials: [
      'Author of "Coronavirus: Why You Must Act Now"',
      'Author of "Coronavirus: The Hammer and the Dance"',
    ],
  },
  {
    size: 4,
    name: 'Vincent Mor, PhD',
    avatarUrl: '/images/endorsers/vincent_mor__resized-100-100.jpg',
    profileUrl: 'https://vivo.brown.edu/display/vmor',
    credentials: [
      'Florence Pirce Grant University Professor',
      'Professor of Health Services, Policy and Practice, Brown University',
    ],
  },
  {
    size: 4,
    name: 'Ben Goldman-Israelow, MD, PhD',
    avatarUrl: '/images/endorsers/ben_goldman_israelow__resized-100-100.jpeg',
    profileUrl: 'https://medicine.yale.edu/profile/benjamin_goldman-israelow/',
    credentials: ['Infectious Disease Fellow, Yale School of Medicine'],
  },
  {
    size: 4,
    name: 'Leo Nissola, MD',
    avatarUrl: '/images/endorsers/Leo_Nissola__resized-100-100.jpg',
    profileUrl: 'https://www.linkedin.com/in/nissolamd/',
    credentials: [
      'Immunology scholar at Parker Institute for Cancer Immunotherapy',
    ],
  },
  {
    size: 4,
    name: 'Joe Nation, PhD',
    avatarUrl: '/images/endorsers/joe_nation__resized-100-100.jpeg',
    profileUrl: 'https://www.linkedin.com/in/joe-nation-1045536/',
    credentials: [
      'Professor of the Practice of Stanford University Public Policy Program',
      'Kennedy-Grossman Fellow in Human Biology',
    ],
  },
  {
    size: 4,
    name: 'Vincent DeGennaro, Jr, MD, MPH',
    avatarUrl: '/images/endorsers/dr_vincent__resized-100-100.jpg',
    profileUrl: 'https://www.linkedin.com/in/joe-nation-1045536/',
    credentials: [
      '"This tool shows clearly that we must act quickly in order to stop COVID, and governments are not acting fast enough"',
      'Medical Director of Haiti Air Ambulance',
      'Founder, Innovating Health International',
    ],
  },
  {
    size: 4,
    name: 'Robert David Siegel, MD, PhD',
    avatarUrl: '/images/endorsers/robert_siegel__resized-100-100.jpeg',
    profileUrl: 'https://med.stanford.edu/profiles/robert-siegel',
    credentials: [
      'Professor (Teaching) Department of Microbiology and Immunology, Woods Institute for the Environment, Program in Human Biology, and Center for African Studies at Stanford University',
    ],
  },
  {
    size: 4,
    name: 'Rebecca Katz, PhD, MPH',
    avatarUrl: '/images/endorsers/rebecca_katz__resized-100-100.jpg',
    profileUrl: 'https://ghss.georgetown.edu/people/katz/',
    credentials: [
      'Professor and Director, Center for Global Health Science and Security, Georgetown University',
    ],
  },
  {
    size: 4,
    name: 'Donald M. Berwick, MD, MPP, FRCP',
    avatarUrl: '/images/endorsers/don_berwick__resized-100-100.jpg',
    profileUrl: 'https://www.linkedin.com/in/don-berwick-46a49380/',
    credentials: [
      'Former Administrator, Centers for Medicare and Medicaid Services',
      'President Emeritus and Senior Fellow, Institute for Healthcare Improvement',
    ],
  },
];

export default endorsers;
