import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --font-title: var(--font-nasalization);
    --font-subtitle: var(--font-roboto-mono);
    --font-body: var(--font-roboto);
    --primary-color1:#2D2D2D;
    --primary-color2:#1458F5;
    --primary-color3:#10D9E8;
    --secundary-color1:#D8E3FD;
    --secundary-color2:#769Ef9;
    --secundary-color3:#07349C;
    --secundary-color4:#05246B;
    --secundary-color5:#C9F8FB;
    --secundary-color6:#99F1F8;
    --secundary-color7:#0DACB8;
    --secundary-color8:#098089;
    --secundary-color9:#C6C6C6;
    --secundary-color10:#939393;
    --secundary-color11:#7A7A7A;
    --secundary-color12:#606060;
    --highlight-color1:#E22368;
    --highlight-color2:#11B427;
    --highlight-color3:#E57E13;
    --highlight-color4:#7911B8;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9;
    color: #333;
    background-color:var(--primary-color1);

  }

  a {
    color: inherit;
    text-decoration: none;
  }
  li{
    list-style:none;
  }
  h1, h2, h3 {
    font-family: var(--font-title);
    color:var(--secundary-color7);
  }

  h4, h5, h6 {
    font-family: var(--font-subtitle);
    color:var(--secundary-color6);
  }

  p, a, span, li, input, button {
    font-family: var(--font-body);
    color:var(--secundary-color5);
    
  }


`;

export default GlobalStyles;
