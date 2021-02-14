import React from 'react';

enum RenderType {
  SSR,
  Client,
}

type ServerSideRenderContextType = {
  type: RenderType.SSR;
  url: string;
};

type ClientRenderContextType = {
  type: RenderType.Client;
};

type RenderContextType = ServerSideRenderContextType | ClientRenderContextType;

const RenderContext = React.createContext<RenderContextType>({
  type: RenderType.Client,
});

export { RenderContext as default, RenderType };
