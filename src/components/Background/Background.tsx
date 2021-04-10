import React from 'react';
import styled from 'styled-components';
import { ThemeType } from '../Styled/Theme';
import { Layer1 } from './BackgroundItems';

const Main = styled.div`
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  position: absolute;
  background: ${(props) => props.theme.bg};
`;

const Filter = styled.div<{ theme: ThemeType }>`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.lighterBg};
  backdrop-filter: blur(100px);
`;

const Background = () => {
  return (
    <Main>
      <Filter />
      <Layer1 />
    </Main>
  );
};

export default Background;
