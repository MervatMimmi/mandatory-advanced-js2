import React from 'react';
import{BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';
import MovieDesc from './components/MovieDesc';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route  exact path = '/' component = {Home} />
          <Route path = '/addmovie' component = {AddMovie} />
          <Route path = '/editmovie/:id' component = {EditMovie} />
          <Route path = '/moviedesc/:id' component = {MovieDesc} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
