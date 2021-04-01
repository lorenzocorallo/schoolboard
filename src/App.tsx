import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import Store from './models/store';
import { fetchUser } from './redux/actions/student';
import Router from './Router';
import { systemLoad } from './redux/actions/system';
import Background from './components/Background/Background';
import { LightTheme } from './components/Styled/Theme';
import GlobalStyle from './components/Styled/GlobalStyle';
import Header from './components/Header/Header';

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
`;

const App = () => {
  const dispatch = useDispatch();
  const { isLoaded } = useSelector((store: Store) => store.system);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const schoolCode = localStorage.getItem('school-code');
    if (token && schoolCode) {
      dispatch(fetchUser(schoolCode, token));
    } else {
      dispatch(systemLoad(true));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={LightTheme}>
      <GlobalStyle />
      <Background />
      <StyledApp>
        <Header />
        {isLoaded && <Router />}
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
