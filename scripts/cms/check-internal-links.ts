import remark from 'remark';
import visit from 'unist-util-visit';
import { glossaryContent } from '../../src/cms-content/learn';

function main() {
  const { terms } = glossaryContent;
  const termIds = terms.map(term => `#${term.termId}`);

  function linkCheck(term: any) {
    function visitor(node: any) {
      if (node.type === 'link') {
        const isInternal = !node.url.includes('http');
        if (isInternal && !termIds.includes(node.url)) {
          console.log(`Broken link in term: ${term.term}: ${node.url}`);
        }
      }
    }
    function transformer(ast: any) {
      visit(ast, 'link', visitor);
    }
    return transformer;
  }

  terms.map(term => {
    remark().use(linkCheck, term).processSync(term.definition);
  });
}

if (require.main === module) {
  main();
}
