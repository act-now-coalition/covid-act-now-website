import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import EmailService, {
  isInvalidEmailError,
} from '../alert_emails/email-service';
import { RegionVaccinePhaseInfoMap, generateEmailContent } from './utils';

const vaccinationAlert: RegionVaccinePhaseInfoMap = {
  '29': {
    emailAlertVersion: 0,
    eligibilityInfoUrl: 'https://covidvaccine.mo.gov/',
    fips: '29',
    locationName: 'Missouri',
    phaseGroups: [
      {
        startDate: '2020-12-14T18:54:06.354Z',
        updatedAt: '2021-02-02T18:54:06.376Z',
        currentlyEligible: true,
        phase: '1A',
        tier: null,
        description:
          '* Healthcare Workers\n* Long-Term Care Facility Staff and Residents\n* Home Health\n* Urgent Care\n* Vaccination Staff\n* Congregate Community\n* School Nurses\n* Dental Office Staff\n* Mental/Behavior Health Providers\n* EMS/EMT/Paramedics',
        expandedDefinitionUrl: 'https://covidvaccine.mo.gov/priority/Phase1a/',
      },
    ],
  },
  '08': {
    emailAlertVersion: 0,
    locationName: 'Colorado',
    fips: '08',
    eligibilityInfoUrl:
      'https://covid19.colorado.gov/for-coloradans/vaccine/vaccine-for-coloradans',
    phaseGroups: [
      {
        currentlyEligible: true,
        updatedAt: '2021-02-09T00:48:56.032Z',
        phase: 'Phase 1A',
        startDate: 'Winter 2020-2021',
        description:
          '* Highest-risk health care workers (Direct, prolonged COVID exposure)\n* Highest-risk individuals (Long-term care residents)',
      },
      {
        currentlyEligible: true,
        updatedAt: '2021-02-09T00:51:05.623Z',
        phase: 'Phase 1B',
        tier: 'Tier 1',
        description:
          '* Moderate risk health care workers (Less direct COVID exposure)\n* First responders\n* Coloradans age 70+',
        startDate: 'Winter 2020-2021',
      },
      {
        currentlyEligible: true,
        updatedAt: '2021-02-09T00:54:46.759Z',
        phase: 'Phase 1B',
        description:
          '* Pre-K-12 educators and child care workers\n* Coloradans ages 65-69',
        tier: 'Tier 2',
        startDate: '2021-02-08',
      },
      {
        currentlyEligible: false,
        updatedAt: '2021-02-09T00:57:52.504Z',
        phase: 'Phase 1B',
        tier: 'Tier 3',
        description:
          '* Frontline essential workers\n* People age 16-64 with two or more high risk conditions',
        startDate: 'Winter 2020-2021',
      },
      {
        currentlyEligible: false,
        updatedAt: '2021-02-09T00:58:58.520Z',
        phase: 'Phase 2',
        description:
          '* People age 60-64\n* People age 16-59 with high risk conditions',
        startDate: 'Spring 2021',
      },
      {
        currentlyEligible: false,
        updatedAt: '2021-02-09T00:58:59.659Z',
        phase: 'Phase 3',
        description: '* General Public',
        startDate: 'Summer 2021',
      },
    ],
  },
};

const outputPath = path.join(__dirname, 'vaccination-alert.html');

async function main(emailAddress: string) {
  const emailService = new EmailService();

  const fipsCode = '08';
  const vaccineInfo = vaccinationAlert[fipsCode];
  const emailContentHtml = generateEmailContent(emailAddress, vaccineInfo);
  const emailData = generateEmailData(
    emailAddress,
    'Test Vaccination Email',
    emailContentHtml,
  );

  try {
    await emailService.sendEmail(emailData);
    console.info(`Email sent to ${emailAddress}.`);
  } catch (err) {
    if (isInvalidEmailError(err)) {
      console.log(`Invalid email: "${emailAddress}"`);
    } else {
      console.error(`Error sending email to "${emailAddress}"`, err);
    }
    process.exit(1);
  }

  fs.writeFileSync(outputPath, emailContentHtml);
}

function generateEmailData(
  emailAddress: string,
  subjectLine: string,
  htmlContent: string,
) {
  return {
    Subject: subjectLine,
    To: [emailAddress],
    Html: htmlContent,
    From: 'Covid Act Now Alerts <noreply@covidactnow.org>',
    ReplyTo: 'noreply@covidactnow.org',
    Group: 'VACCINATION_ALERTS',
  };
}

function printUsage() {
  console.log('yarn vaccinations-send-test-email user@email.com');
}

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    printUsage();
    process.exit(1);
  }
  return args[0];
}

if (require.main === module) {
  const emailAddress = parseArgs();
  main(emailAddress);
}
