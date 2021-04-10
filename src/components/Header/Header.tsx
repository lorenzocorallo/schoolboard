import React from 'react';
import styled from 'styled-components';
import { ipcRenderer as ipc } from 'electron';
import CloseSvg from '../../assets/img/CloseSvg';
import MaximizeSvg from '../../assets/img/MaximizeSvg';
import MinimizeSvg from '../../assets/img/MinimizeSvg';
import { ThemeType } from '../Styled/Theme';

const Main = styled.header`
  height: 2.5%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 90;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Drag = styled.div`
  flex: 1;
  -webkit-app-region: drag;
  height: 100%;
`;

const Nav = styled.nav`
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

const NavButton = styled.button<{ theme: ThemeType }>`
  height: 100%;
  padding: 0 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: ${(props) => props.theme.windowControlsFill};
    width: 1rem;
    height: 1rem;
    pointer-events: none;
  }
  :hover {
    background: ${(props) => props.theme.windowControlsHover};
    :nth-child(3) {
      background: #f04747;
      svg {
        fill: #fff;
      }
    }
  }
`;

const Header = () => {
  const minimizeApp = () => {
    ipc.send('minimize');
  };
  const maximizeApp = () => {
    ipc.send('maximize');
  };
  const closeApp = () => {
    ipc.send('close');
  };
  return (
    <Main>
      <Drag />
      <Nav>
        {/* Minimize */}
        <NavButton onClick={minimizeApp}>
          <MinimizeSvg />
        </NavButton>
        {/* Maximize */}
        <NavButton onClick={maximizeApp}>
          <MaximizeSvg />
        </NavButton>
        {/* Close */}
        <NavButton onClick={closeApp}>
          <CloseSvg />
        </NavButton>
      </Nav>
    </Main>
  );
};

export default Header;
