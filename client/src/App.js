import React from 'react';
import './App.css';

//importing react router dom
import { BrowserRouter, Route, Switch } from "react-router-dom";

//importing local components
import MainPage from "./components/mainPage";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component = {MainPage} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
