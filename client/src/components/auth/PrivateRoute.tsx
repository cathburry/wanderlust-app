import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { RootState } from '../../store';
import SignIn from '../pages/SignIn';

interface Props extends RouteProps {
  component: any;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log('PrivateRoute');
    console.log(authenticated);
  }, [authenticated]);

  return(
    <Route {...rest} render={props => authenticated ? <Component {...props} /> : <SignIn />} />
  );
}

export default PrivateRoute;