import React from "react";
import {Link, NavLink } from 'react-router-dom';

const Navbar = () =>{
    return (
        <nav className="navbar shadow bg-white p-2 navbar-expand-lg navbar-light fixed-top border-bottom border-info">
          <div className="container">
            <Link className="navbar-brand text-primary" to="http://www.masterkeegroup.com">Masterkee Group</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/">Acceuil <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/apropos">A propos</Link>
                </li>
                
              </ul>
            </div>
          </div>
        </nav>
    );
  
}

export default Navbar;
