import { Annotations, Anomalies } from 'api/schema/RegionSummaryWithTimeseries';
import { assert } from 'common/utils';

// Not including all possible values because many fields never or
// rarely get anomalies. We should extend this enum and related code as needed.
export enum AnnotationType {
  NEW_DEATHS,
  NEW_CASES,
  HOSPITALIZATIONS,
}

export const ANNOTATION_TYPES = [
  AnnotationType.NEW_CASES,
  AnnotationType.NEW_DEATHS,
  AnnotationType.HOSPITALIZATIONS,
];

export const annotationTypeNames: { [metric in AnnotationType]: string } = {
  [AnnotationType.NEW_CASES]: 'New Cases',
  [AnnotationType.NEW_DEATHS]: 'New Deaths',
  [AnnotationType.HOSPITALIZATIONS]: 'Hospitalizations',
};

export function getAnomaliesForAnnotationType(
  annotations: Annotations,
  type: AnnotationType,
  orderAnomalies?: string,
): Anomalies {
  assert(ANNOTATION_TYPES.includes(type));
  switch (type) {
    case AnnotationType.NEW_CASES:
      return annotations?.newCases?.anomalies ?? [];
    case AnnotationType.NEW_DEATHS:
      return annotations?.newDeaths?.anomalies ?? [];
    case AnnotationType.HOSPITALIZATIONS:
      return annotations?.hospitalBeds?.anomalies ?? [];
  }
}

export interface AnnotationOptions {
  snapshot: number;
  stateFips: string;
  annotationType: AnnotationType;
}
