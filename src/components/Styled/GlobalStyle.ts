import chroma from 'chroma-js';
import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './Theme';

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    }
    html {
      background: ${(props) => props.theme.bg};
    font-size: 62.5%;
    }
    body {
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    background: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.text};
    overflow: hidden;
    }

    #root{
      background: ${(props) => props.theme.bg};

    }

    a{
      color: ${(props) => props.theme.secondary};
      text-decoration: none;
      transition: all 0.2s ease;
      :hover {
        color: ${(props) => chroma(props.theme.secondary).brighten(0.5).hex()};
      }
    }

    input {
    outline: none;
    font-size: 1.6rem;
    padding: 1.3rem;
    border-radius: 7px;
    border: none;
    color: ${(props) => props.theme.text};
    box-shadow: 0px 11px 47px rgba(0, 0, 0, 0.1);
    }

    h2 {
    font-weight: bold;
    font-size: 3.2rem;
    }



    button {
    background: transparent;
    overflow: hidden;
    border: none;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
    }


    span.primary,
    p.primary,
    h1.primary,
    h2.primary,
    h3.primary,
    h4.primary,
    h5.primary,
    h6.primary {
    color: ${(props) => props.theme.primary};
    }


`;

export default GlobalStyle;
