/**
 * Utils to return grid-template-areas for the above the fold GridContainer.
 * Conditional depending on weather or not we are showing the 'Masks recommended' card.
 */

export function getDesktopGridTemplateAreas(showMasksCard: boolean): string {
  if (showMasksCard) {
    return `'header header'
      'overview overview'
      'masks masks'
      'originalMetrics alerts'`;
  } else {
    return `'header header'
      'overview overview'
      'originalMetrics alerts'`;
  }
}

export function getMidGridTemplateAreas(showMasksCard: boolean): string {
  if (showMasksCard) {
    return `'header header'
      'overview overview'
      'masks map'
      'originalMetrics map'
      'alerts map';`;
  } else {
    return `'header header'
        'overview overview'
        'originalMetrics map'
        'alerts map';`;
  }
}

export function getMobileGridTemplateAreas(showMasksCard: boolean): string {
  if (showMasksCard) {
    return `'header' 'overview' 'spark' 'map' 'masks' 'originalMetrics' 'alerts'`;
  } else {
    return `'header' 'overview' 'spark' 'map' 'originalMetrics' 'alerts'`;
  }
}
