import { chain } from 'lodash';
import remark from 'remark';
import visit from 'unist-util-visit';

function isInternalLink(url) {
  // These are alternative URLs for Covid Explained
  return (
    url.startsWith('https://explaincovid.org') ||
    url.startsWith('https://covidexplained.org')
  );
}

export function logInternalLinks(markdownContent) {
  remark().use(pluginLogInternalLinks).processSync(markdownContent);
}

export function transformInternalLinks(markdownContent) {
  return remark()
    .use(pluginTransformInternalLinks)
    .processSync(markdownContent)
    .toString();
}

// URL Mapping between Covid Explained URLs and CAN URLs
const linkReplacements = [
  // TODO: Complete with the actual URL replacements
  // {
  //   from: 'https://explaincovid.org/basics/masks-what-is-the-deal',
  //   to: '/deep-dives/masks-what-is-the-deal',
  // },
];

const linkMap = chain(linkReplacements)
  .map(({ from, to }) => [from, to])
  .fromPairs()
  .value();

// Remark Plugins
function pluginTransformInternalLinks() {
  function transformer(tree, file) {
    visit(tree, 'link', visitor);

    function visitor(node) {
      const { url } = node;
      if (linkMap[url]) {
        node.url = linkMap[url];
      }
      return node;
    }
  }
  return transformer;
}

// Log internal links to the console
function pluginLogInternalLinks() {
  function transformer(tree) {
    visit(tree, 'link', visitor);

    function visitor(node) {
      const { url } = node;
      if (isInternalLink(url)) {
        console.log(`    ${url}`);
      }
      return node;
    }
  }
  return transformer;
}
