import React from "react";
import {Link, NavLink } from 'react-router-dom';

const Navbar = () =>{
    return (
        <nav className="navbar shadow p-2 navbar-expand-lg fixed-top navbar-light border-bottom border-info">
          <div className="container">
            <Link style={{fontSize: "1.5rem"}} className="navbar-brand font-weight-bold" to="http://www.masterkeegroup.com"><span className="text-primary">Masterkee</span> Group</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <NavLink className="kratosLink" to="/">Acceuil <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                  <Link className="kratosLink" to="/apropos">A propos</Link>
                </li>
                
              </ul>
            </div>
          </div>
        </nav>
    );
  
}

export default Navbar;
