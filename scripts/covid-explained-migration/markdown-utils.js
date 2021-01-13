import remark from 'remark';
import visit from 'unist-util-visit';

// Logs internal links in the console
export function logInternalLinks(markdownContent) {
  remark().use(pluginLogInternalLinks).processSync(markdownContent);
}

// Returns the markdown content replacing the internal links
export function transformInternalLinks(markdownContent) {
  return remark()
    .use(transformInternalLinks)
    .processSync(markdownContent)
    .toString();
}

// Log internal links
export function isInternalLink(url) {
  return (
    url.startsWith('https://explaincovid.org') ||
    url.startsWith('https://covidexplained.org')
  );
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

// Transforms internal links
function transformInternalLinks() {
  function transformer(tree, file) {
    visit(tree, 'link', visitor);

    function visitor(node) {
      const { url } = node;
      if (isInternalLink(url)) {
        // TODO: Replace each Covid Explained URL with its equivalent URL
        // node.url = url.replace('https://explaincovid.org', '');
      }
      return node;
    }
  }
  return transformer;
}
