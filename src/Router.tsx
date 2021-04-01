import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Menu from './components/Menu/Menu';
import Sidebar from './components/Sidebar/Sidebar';
import Store from './models/store';
import Home from './pages/Home';
import Homeworks from './pages/Homeworks';
import Login from './pages/Login';
import Marks from './pages/Marks';
import Memos from './pages/Memos';

const Router = () => {
  const { isLogged } = useSelector((store: Store) => store.student);

  return (
    <BrowserRouter>
      {isLogged ? (
        <>
          <Menu />
          <Switch>
            <Route path="/memos" component={Memos} />
            <Route path="/homeworks" component={Homeworks} />
            <Route path="/marks" component={Marks} />
            <Route path="/home" component={Home} />
            <Route path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
          <Sidebar />
        </>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
};

export default Router;
