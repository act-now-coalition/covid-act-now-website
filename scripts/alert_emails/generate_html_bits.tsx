/**
 * Generates snippets of HTML (by rendering react components) in order
 * to insert into the generated HTML emails.
 * overall threat level and each metric and generates a summary file.
 *
 * Run via: yarn generate-alerts-html
 *
 * Generates files html/change-<old_level>-<new_level>.html containing the
 * html to be used when the level changes from old_level to new_level.
 */

import fs from 'fs-extra';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  ServerStyleSheets as MuiServerStyleSheets,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import {
  ServerStyleSheet as ScServerStyleSheet,
  ThemeProvider as ScThemeProvider,
} from 'styled-components';
import theme from '../../src/assets/theme';
import { Level, ALL_LEVELS } from '../../src/common/level';
import {
  RiskLevelThermometer,
  Triangle,
  RiskLevelWrapper,
} from '../../src/components/LocationPage/NewLocationPageHeader.style';

const outputFolder = path.join(__dirname, 'html');

async function main() {
  await fs.ensureDir(outputFolder);

  for (const oldLevel of ALL_LEVELS) {
    for (const newLevel of ALL_LEVELS) {
      if (
        oldLevel === Level.UNKNOWN ||
        newLevel === Level.UNKNOWN ||
        oldLevel === newLevel
      ) {
        // We only generate transitions between non-unknown levels.
        continue;
      }

      const Content = () => (
        <Wrapper>
          <RiskLevelChange oldLevel={oldLevel} newLevel={newLevel} />
        </Wrapper>
      );

      const muiSheets = new MuiServerStyleSheets();
      const scSheets = new ScServerStyleSheet();

      // HACK: We render to HTML twice in order to collect both the styled-components
      // styles and the material-ui styles. =/
      let html = ReactDOMServer.renderToString(muiSheets.collect(<Content />));
      html = ReactDOMServer.renderToString(scSheets.collectStyles(<Content />));

      const content = `<style>${muiSheets.toString()}</style>${scSheets.getStyleTags()}${html}`;

      const file = path.join(
        outputFolder,
        `change-${oldLevel}-${newLevel}.html`,
      );
      await fs.writeFile(file, content);
      console.log(`Generated ${file}`);
    }
  }
  console.log(`Done.`);
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <ScThemeProvider theme={theme}>{children}</ScThemeProvider>
    </MuiThemeProvider>
  );
}

interface RiskLevelChangeProps {
  oldLevel: Level;
  newLevel: Level;
}
function RiskLevelChange({ oldLevel, newLevel }: RiskLevelChangeProps) {
  return (
    <>
      <RiskLevelWrapper>
        <RiskLevelThermometer alarmLevel={oldLevel} />
        <Triangle alarmLevel={oldLevel} />
      </RiskLevelWrapper>
      <RiskLevelWrapper>
        <RiskLevelThermometer alarmLevel={newLevel} />
        <Triangle alarmLevel={newLevel} />
      </RiskLevelWrapper>
    </>
  );
}

main().catch(e => {
  console.error(e);
  process.exit(-1);
});
