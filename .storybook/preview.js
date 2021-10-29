import React from 'react';
import { Tractor } from '@aircall/tractor';
import { GlobalStyle } from '../src/style';

export const decorators = [
  (Story) => (
    <div style={{ margin: '3em' }}>
      <GlobalStyle />
      <Tractor injectStyle> 
        <Story />
      </Tractor>
    </div>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

