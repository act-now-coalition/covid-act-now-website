import { Markdown } from '../utils';
import infoToolTipContent from './info-tooltips.json';
import metricCaculationTooltipContent from './metric-calculation-tooltips.json';
import ccviTooltipContent from './ccvi-tooltips.json';
import { Metric } from 'common/metricEnum';
import { assert } from 'common/utils';
import { keyBy } from 'lodash';

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
  return {
    metricDefinition: getTooltipContentById(id, infoToolTipContent.tooltip),
    metricCalculation: getTooltipContentById(
      id,
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
  Maps each subscore ID to its corresponding 'theme' in ccvi.json.
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
