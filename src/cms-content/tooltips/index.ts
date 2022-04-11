import keyBy from 'lodash/keyBy';
import { Markdown } from '../utils';
import infoToolTipContent from './info-tooltips.json';
import metricCaculationTooltipContent from './metric-calculation-tooltips.json';
import ccviTooltipContent from './ccvi-tooltips.json';
import { Metric } from 'common/metricEnum';
import { assert } from 'common/utils';

/* Metric tooltips + location page header tooltip: */

export interface Tooltip {
  title: string;
  id: string;
  body: Markdown;
  cta: Markdown;
}

function getTooltipContentById(id: string, tooltipSet: Tooltip[]): Tooltip {
  const content = tooltipSet.find((item: Tooltip) => item.id === id);
  assert(content, `Info tooltip content unexpectedly not found for id: ${id}`);
  return content;
}

interface MetricTooltipObj {
  metricDefinition: Tooltip;
  metricCalculation: Tooltip;
}

type MetricToTooltipContentMap = {
  [key in Metric]: MetricTooltipObj;
};

function getMetricMapById(id: string): MetricTooltipObj {
  const lowercasedId = id.toLowerCase();
  return {
    metricDefinition: getTooltipContentById(
      lowercasedId,
      infoToolTipContent.tooltip,
    ),
    metricCalculation: getTooltipContentById(
      lowercasedId,
      metricCaculationTooltipContent.tooltip,
    ),
  };
}

export const metricToTooltipMap: MetricToTooltipContentMap = {
  [Metric.CASE_DENSITY]: getMetricMapById('daily-new-cases'),
  [Metric.CASE_GROWTH_RATE]: getMetricMapById('infection-rate'),
  [Metric.POSITIVE_TESTS]: getMetricMapById('positive-test-rate'),
  [Metric.VACCINATIONS]: getMetricMapById('percent-vaccinated'),
  [Metric.HOSPITAL_USAGE]: getMetricMapById('icu-capacity-used'),
  [Metric.RATIO_BEDS_WITH_COVID]: getMetricMapById('patients-with-covid'),
  [Metric.ADMISSIONS_PER_100K]: getMetricMapById('weekly-admissions'),
  [Metric.WEEKLY_CASES_PER_100K]: getMetricMapById('weekly-new-cases'),
};

export const locationPageHeaderTooltipContent: Tooltip = getTooltipContentById(
  'location-page-header',
  infoToolTipContent.tooltip,
);

/* CCVI tooltips + themes: */

enum CcviThemeId {
  Socioeconomic = 'socioeconomic-status',
  Minority_status_language = 'minority-status-and-language',
  Household_transportation = 'household-transportation',
  Epidemiological = 'epidemiological-factors',
  Healthcare_system = 'healthcare-system-factors',
  High_risk_environments = 'high-risk-environments',
  Population_density = 'population-density',
}

/*
  Maps each ID to its corresponding CCVI-theme in ccvi.json.
  7 ids/themes in total, dictated here (page 6): https://surgoventures.org/resource-library/report-vulnerable-communities-and-covid-19
*/
const ccviThemeToIdMap: { [id in CcviThemeId]: string } = {
  [CcviThemeId.Socioeconomic]: 'theme1',
  [CcviThemeId.Minority_status_language]: 'theme2',
  [CcviThemeId.Household_transportation]: 'theme3',
  [CcviThemeId.Epidemiological]: 'theme4',
  [CcviThemeId.Healthcare_system]: 'theme5',
  [CcviThemeId.High_risk_environments]: 'theme6',
  [CcviThemeId.Population_density]: 'theme7',
};

const tooltipContentById = keyBy(
  ccviTooltipContent.subscoreTooltips,
  item => item.id,
);

export interface CcviThemeInfo {
  subscoreName: string;
  id: string;
  content: Markdown; // tooltip content
  theme: string;
}

function getCcviThemeInfoById(id: CcviThemeId): CcviThemeInfo {
  const tooltipContent = tooltipContentById[id];
  assert(
    tooltipContent,
    `Ccvi tooltip content unexpectedly not found for id: ${id}`,
  );
  return {
    ...tooltipContent,
    theme: ccviThemeToIdMap[id],
  };
}

export const orderedCcviThemes: CcviThemeInfo[] = [
  getCcviThemeInfoById(CcviThemeId.Socioeconomic),
  getCcviThemeInfoById(CcviThemeId.Minority_status_language),
  getCcviThemeInfoById(CcviThemeId.Household_transportation),
  getCcviThemeInfoById(CcviThemeId.Epidemiological),
  getCcviThemeInfoById(CcviThemeId.Healthcare_system),
  getCcviThemeInfoById(CcviThemeId.High_risk_environments),
  getCcviThemeInfoById(CcviThemeId.Population_density),
];

export const vulnerabilitiesHeaderTooltip = ccviTooltipContent.headerTooltipContent as Markdown;
