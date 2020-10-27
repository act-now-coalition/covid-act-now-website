/// <reference types="react-scripts" />

interface Window {
  gtag: Function;
}

declare module 'react-copy-to-clipboard' {
  // Forked from DefinityTyped, those definitions seem to be wrong/out-of-date :(

  // Type definitions for react-copy-to-clipboard 4.3
  // Project: https://github.com/nkbt/react-copy-to-clipboard
  // Definitions by: Meno Abels <https://github.com/mabels>
  //                 Bernabe <https://github.com/BernabeFelix>
  //                 Ward Delabastita <https://github.com/wdlb>
  // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
  // TypeScript Version: 2.8

  import * as React from 'react';
  declare namespace CopyToClipboard {
    interface Options {
      debug?: boolean;
      format?: 'text/html' | 'text/plain';
      message?: string;
    }

    interface Props {
      children: React.ReactNode;
      text: string;
      onCopy?(text: string, result: boolean): void;
      options?: Options;
    }
  }

  export class CopyToClipboard extends React.Component<CopyToClipboard.Props> {}
}

// https://github.com/hudovisk/react-optimize/blob/master/src/index.d.ts
declare module 'react-optimize' {
  import { ComponentType, ReactNode } from 'react';
  interface ExperimentProps {
    children: ReactNode;
    id: string;
    loader?: ReactNode;
    timeout?: number;
    asMtvExperiment?: boolean;
    indexSectionPosition?: string | number;
  }

  const Experiment: ComponentType<ExperimentProps>;

  interface VariantProps {
    children: ReactNode;
    id: string;
  }
  const Variant: ComponentType<VariantProps>;
}
