import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from './Pages/Index';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Nav from './Components/Nav';
import PreviousDownloads from './Pages/PreviousDownloads';
import './Styles/app.css';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Nav />
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/downloads" component={PreviousDownloads} />
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
