import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;

    /* remove the scrollbar */
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    transition: all 0.2s ease-in-out;
  }

  input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  img {
    max-width: 100%;
    display: block;
  }

    /* Disable blue tap highlight effect on mobile */
   a, button {
    -webkit-tap-highlight-color: transparent;
  }
`
