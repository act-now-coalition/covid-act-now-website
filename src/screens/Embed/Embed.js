import React from 'react';
import Typography from '@material-ui/core/Typography';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import Map from '../../components/Map/Map';
import ModelPage from '../../screens/ModelPage/ModelPage.js';
import EmbedContainer from './Embed.style';

// export default function Embed() {
//   return (
//     <EmbedContainer elevation="2">
//       <Map />
//       <Typography variant="body1">Check us out</Typography>
//     </EmbedContainer>
//   );
// }

export default function Embed() {
  return (
    <EmbedContainer elevation="2">
      <ModelPage />
      <Typography variant="body1">Check us out</Typography>
    </EmbedContainer>
  );
}
