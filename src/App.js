import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom' 
import './App.scss'

import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageNotFound from './components/PageNotFound/PageNotFound';
import MovieDetail from './components/MovieDetail/MovieDetail';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='container'>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path='/home' exact component={Home} />
            <Route path='/movie/:imbID' component={MovieDetail} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
