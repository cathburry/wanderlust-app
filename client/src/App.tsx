import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/containers/Header';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import ForgotPassword from './components/pages/ForgotPassword';
import Homepage from './components/pages/Homepage';
import Dashboard from './components/pages/Dashboard';
import ShiftsList from './components/pages/ShiftsList';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import Loader from './components/UI/Loader';
import firebase from './firebase/config';
import { getUserById, setLoading, setNeedVerification } from './store/actions/authActions';
import store, { RootState } from './store';
import Schedule from './components/pages/Schedule';
import Map from './components/UI/Map';

const App: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  
  // Check if user exists
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if(user) {
        await dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if(!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if(loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PublicRoute path="/" component={Homepage} exact />
        <PublicRoute path="/signup" component={SignUp} exact />
        <PublicRoute path="/signin" component={SignIn} exact />
        <PublicRoute path="/forgot-password" component={ForgotPassword} exact />
        <PrivateRoute path="/shifts" component={ShiftsList} exact />
        <PrivateRoute path="/schedule" component={Schedule} exact />
        <PrivateRoute path="/map" component={Map} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
