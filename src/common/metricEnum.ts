export enum Metric {
  // NOTE: Always add new metrics to the end (don't reorder). For better or
  // worse, the metric number is encoded in URLs and in our persisted summaries
  // files (used by /internal/compare/), etc. So reordering them would break
  // things.
  CASE_GROWTH_RATE = 0,
  POSITIVE_TESTS = 1,
  HOSPITAL_USAGE = 2,
  // CONTACT_TRACING = 3,
  // FUTURE_PROJECTIONS = 4
  CASE_DENSITY = 5,
  VACCINATIONS = 6,
}
