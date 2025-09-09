import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  input, textarea, select {
    font-family: inherit;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;

export default GlobalStyle;
