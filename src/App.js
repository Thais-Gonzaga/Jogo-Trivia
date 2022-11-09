import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } exact />
      <Route exact path="/settings" component={ Settings } />
    </Switch>
  );
}
