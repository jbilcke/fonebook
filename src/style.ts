
import { createGlobalStyle } from 'styled-components';

const fontDir = `${process.env.PUBLIC_URL}/fonts/klavika/`;

// this is a free font, see https://freefontsvault.com/facebook-font/
export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Klavika';
  src: url('${fontDir}KlavikaMedium-TF.woff2') format('woff2'),
      url('${fontDir}KlavikaMedium-TF.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Klavika';
  src: url('${fontDir}KlavikaLight-Plain.woff2') format('woff2'),
      url('${fontDir}KlavikaLight-Plain.woff') format('woff');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Klavika';
  src: url('${fontDir}KlavikaBold-Bold.woff2') format('woff2'),
      url('${fontDir}KlavikaBold-Bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Klavika';
  src: url('${fontDir}KlavikaMedium-Italic.woff2') format('woff2'),
      url('${fontDir}KlavikaMedium-Italic.woff') format('woff');
  font-weight: 500;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Klavika';
  src: url('${fontDir}KlavikaBold-BoldItalic.woff2') format('woff2'),
      url('${fontDir}KlavikaBold-BoldItalic.woff') format('woff');
  font-weight: bold;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Klavika';
  src: url('${fontDir}KlavikaRegular-TF.woff2') format('woff2'),
      url('${fontDir}KlavikaRegular-TF.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Klavika';
  src: url('${fontDir}KlavikaLight-Italic.woff2') format('woff2'),
      url('${fontDir}KlavikaLight-Italic.woff') format('woff');
  font-weight: 300;
  font-style: italic;
  font-display: swap;
}
`;
