import React from 'react';
import styled from 'styled-components';
import { Layer1 } from './BackgroundItems';

const Main = styled.div`
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  position: absolute;
`;

const Filter = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.3);
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
