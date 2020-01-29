import React from 'react';
import '../App.css';
import logo from '../logo.jpg';
import{Link} from 'react-router-dom';

class Nav extends React.Component {
  
  render() {
  
   return (
    <nav>
     <img src = {logo} 
        className = 'nav-logo' 
        alt ='logo'
     />
     <ul className = 'nav-links'>
       <Link to ='/'
          style={{ textDecoration: 'none', color: 'rgb(212,175,55)', fontSize: 20 }}>
          <li><h3>Home</h3></li>
       </Link>
       <Link to ='/addmovie'
          style={{ textDecoration: 'none', color: 'rgb(212,175,55)', fontSize: 20 }}>
          <li><h3>Add Movie</h3></li>
       </Link>
      </ul>
    </nav>
   );
  }
}

export default Nav;
