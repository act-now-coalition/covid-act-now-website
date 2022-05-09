/**
 * Utils to return grid-template-areas for the above the fold GridContainer.
 * Conditional depending on weather or not we are showing the 'Masks recommended' card.
 */

export function getDesktopGridTemplateAreas(showMasksCard: boolean): string {
  if (showMasksCard) {
    return `'header header'
      'overview overview'
      'masks masks'
      'transmissionMetrics alerts'`;
  } else {
    return `'header header'
      'overview overview'
      'transmissionMetrics alerts'`;
  }
}

export function getMidGridTemplateAreas(showMasksCard: boolean): string {
  if (showMasksCard) {
    return `'header header'
      'overview overview'
      'masks map'
      'transmissionMetrics map'
      'alerts map';`;
  } else {
    return `'header header'
        'overview overview'
        'transmissionMetrics map'
        'alerts map';`;
  }
}

export function getMobileGridTemplateAreas(showMasksCard: boolean): string {
  if (showMasksCard) {
    return `'header' 'overview' 'spark' 'map' 'masks' 'transmissionMetrics' 'alerts'`;
  } else {
    return `'header' 'overview' 'spark' 'map' 'transmissionMetrics' 'alerts'`;
  }
}
