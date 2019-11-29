import React from 'react';
import './App.css';

//importing react router dom
import { BrowserRouter, Route, Switch } from "react-router-dom";

//importing main page component
import MainPage from "./components/mainPage";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          //rendering man page
          <Route exact path='/' component = {MainPage} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
