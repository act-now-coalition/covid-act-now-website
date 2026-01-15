# Copy Audit Checklist

This checklist inventories the active page types served by the app and the
primary copy sources for each. Use it to review wording, metadata, CTAs, and
supporting content for accuracy and tone.

## How to use
- Start with the Global/Shared copy section.
- For each page type, verify copy in all listed sources.
- Check metadata (title/description) where noted.
- Mark items complete as you audit them.

## Global / shared copy
- [ ] Navigation/menu copy (`src/cms-content/footer/footer.json`,
  `src/components/MenuContent/`)
- [ ] Learn footer copy (`src/cms-content/learn/footer.json`,
  `src/screens/Learn/Footer/`)
- [ ] Banners/announcements (`src/components/Banner/`)
- [ ] Tooltips and dialogs used site-wide (`src/cms-content/tooltips/*`,
  `src/cms-content/modals/vulnerabilities.json`, `src/components/Dialogs/`)

## Page types

### Home + core marketing
Routes:
- `/`, `/compare/:sharedComponentId?`, `/explore/:sharedComponentId?`

Primary copy sources:
- `src/screens/HomePage/HomePage.tsx` (section headers, CTAs, meta tags)
- `src/components/HomePageHeader/`, `src/components/PartnersSection/`
- `src/components/Banner/` (if banners are enabled)

Checklist:
- [ ] Meta title/description and canonical URL on homepage
- [ ] Hero/section headings and CTA text
- [ ] Map description copy (`getRiskMapDescription`)
- [ ] Recommendations text and CTA labels

### Location pages (grouped)
Routes:
- `/us/:stateId`
- `/us/:stateId/county/:countyId`
- `/us/metro/:metroAreaUrlSegment`
- Plus variants: `/chart/:chartId`, `/explore/:sharedComponentId?`,
  `/compare/:sharedComponentId?`

Primary copy sources:
- `src/screens/LocationPage/` and `src/components/NewLocationPage/`
- `src/cms-content/tooltips/*`
- `src/cms-content/modals/vulnerabilities.json`
- `src/cms-content/region-overrides/region-overrides.json`

Checklist:
- [ ] Page titles/subtitles and location naming conventions
- [ ] Chart labels, axis copy, and empty-state messages
- [ ] Tooltip content (risk levels, metrics, CCVI, etc.)
- [ ] Modal copy (vulnerabilities and dialogs)
- [ ] Recommendations text and CTA labels for location pages

### Case studies
Routes:
- `/case-studies`, `/case-studies/:caseStudyId`

Primary copy sources:
- `src/cms-content/learn/learn-case-studies.json`
- `src/screens/Learn/CaseStudies/`

Checklist:
- [ ] Page header and intro
- [ ] Case study titles, summaries, and body text
- [ ] Tag labels and CTAs

### About
Routes:
- `/about`

Primary copy sources:
- `src/cms-content/about/about-page.json`
- `src/cms-content/team/*.json`
- `src/screens/About/About.tsx`

Checklist:
- [ ] About header and body copy
- [ ] Mission, impact, and commitments text
- [ ] Partners section headings and descriptions
- [ ] Team intro and member descriptions
- [ ] Contact-us text

### Terms and Privacy
Routes:
- `/terms`, `/privacy`

Primary copy sources:
- `src/screens/Terms/Terms.tsx`
- `src/screens/Terms/Privacy.tsx`

Checklist:
- [ ] Summary sections and full legal text
- [ ] Last-updated dates
- [ ] Links and cross-references

### Embed pages
Routes:
- `/embed/us`, `/embed/risk/us`, `/embed/us/:stateId`,
  `/embed/us/:stateId/county/:countyId`, `/embed/us/county/:countyFipsId`,
  `/embed/us/fips/:fipsCode`

Primary copy sources:
- `src/screens/Embed/Embed.tsx`
- Shared chart/location components and tooltips

Checklist:
- [ ] Titles, labels, and chart text for embeds
- [ ] Tooltip copy (if included in embed view)

### Internal tools
Routes:
- `/internal/all`, `/internal/compare`, `/internal/anomalies`,
  `/internal/overrides-overview`, `/internal/vaccine-eligibility`

Primary copy sources:
- `src/screens/internal/AllStates/`
- `src/screens/internal/CompareSnapshots/`
- `src/screens/internal/Anomalies/`
- `src/screens/internal/OverridesOverview/`
- `src/screens/internal/VaccinationPhases/`
- `src/cms-content/region-overrides/region-overrides.json`
- `src/cms-content/vaccines/phases.ts`

Checklist:
- [ ] Page headers and explanatory copy
- [ ] Table labels and column headings
- [ ] Empty-state or error messages

### Internal share/export image endpoints
Routes:
- `/internal/share-image/...`
- `/internal/export-image/...`

Primary copy sources:
- `src/screens/internal/ShareImage/`
- `src/screens/internal/ShareImage/ChartExportImage.tsx`

Checklist:
- [ ] Any captions or fallback text
- [ ] Labels in generated images (if present)

### Redirect endpoints (served but not pages)
Routes:
- legacy redirects defined in `src/App.tsx`

Primary copy sources:
- `src/App.tsx` redirect definitions

Checklist:
- [ ] Destination URLs and tracking parameters
- [ ] Legacy redirect list for stale or incorrect destinations

