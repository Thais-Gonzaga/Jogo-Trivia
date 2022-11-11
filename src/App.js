import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } exact />
      <Route path="/game" component={ Game } exact />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
