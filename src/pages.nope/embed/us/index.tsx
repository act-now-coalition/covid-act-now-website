import React from 'react';
import {
  US_MAP_EMBED_HEIGHT,
  US_MAP_EMBED_WIDTH,
} from 'screens/Embed/EmbedEnums';
import { EmbedContainer } from 'screens/Embed/Embed.style';
import { EmbedFooter } from 'screens/Embed/Embed';
import SocialLocationPreviewMap from 'components/SocialLocationPreview/SocialLocationPreviewMap';
import { getLastUpdatedDateString } from 'screens/utils/ssg_utils';

async function getStaticProps() {
  const lastUpdatedDateString = await getLastUpdatedDateString();
  return {
    props: {
      lastUpdatedDateString,
    },
  };
}

function Page({ lastUpdatedDateString }: { lastUpdatedDateString: string }) {
  // This must be a ComponentType which is a function, not an Element
  const footer = () => (
    <EmbedFooter lastUpdatedDateString={lastUpdatedDateString} />
  );
  return (
    <EmbedContainer height={US_MAP_EMBED_HEIGHT} width={US_MAP_EMBED_WIDTH}>
      <SocialLocationPreviewMap
        lastUpdatedDateString={lastUpdatedDateString}
        border
        isEmbed
        Footer={footer}
      />
    </EmbedContainer>
  );
}

export { getStaticProps };
export default Page;
