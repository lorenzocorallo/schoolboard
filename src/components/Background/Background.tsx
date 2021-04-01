import React from 'react';
import styled from 'styled-components';
import {
  Ellipse1,
  Ellipse2,
  Ellipse3,
  Ellipse4,
  Ellipse5,
  Ellipse6,
  Ellipse7,
  Ellipse8,
  Ellipse9,
  Ellipse10,
} from './BackgroundItems';

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
      <Ellipse1 />
      <Ellipse2 />
      <Ellipse3 />
      <Ellipse4 />
      <Ellipse5 />
      <Ellipse6 />
      <Ellipse7 />
      <Ellipse8 />
      <Ellipse9 />
      <Ellipse10 />
    </Main>
  );
};

export default Background;
