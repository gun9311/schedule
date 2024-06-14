import React from 'react';
import {Switch, Route} from "react-router-dom";

import {LoginContainer} from "../pages/login/LoginContainer";

import {PrivateRoute} from "../components/privateroute/PrivateRoute";
import {NavbarContainer} from "../components/navbar/NavbarContainer";
import {Background} from "../components/backgrounds/appbackground/Background";
import {useAuth} from "../packages/auth/useAuth";

import {routes} from "../pages/routes/routes";
import {URL_LOGIN} from "../config/consts/urlsPages";
import Notification from '../pages/notification/Notification';
import OAuth2RedirectHandler from '../packages/auth/OAuth2RedirectHandler';


const AppRouter = () => {
  const {isAuth} = useAuth();

  return (
    <Switch>
      <Route path="/oauth/redirect" component={OAuth2RedirectHandler} />
      {!isAuth && <Route path={[URL_LOGIN, '/']} render={props => <LoginContainer {...props} />} />}
      {isAuth && (
        <Background>
          <NavbarContainer />
          <Notification />
          <Switch>
            {routes.map(({ path, Component, reqRole }) => (
              <PrivateRoute key={path} path={path} reqRole={reqRole} component={Component} />
            ))}
          </Switch>
        </Background>
      )}
    </Switch>
  );
};

export default AppRouter;

