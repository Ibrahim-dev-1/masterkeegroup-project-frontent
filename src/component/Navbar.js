import React from "react";
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = (props) => {
  return (
    <div className="kratos-navbar">
      <Link to="#" className="kratosLogo">Logo</Link>
      <div className="kratos-navLink">
        <NavLink to="/dashboard/admin/" className="kratos-link">home</NavLink>
        <NavLink to="#" className="kratos-link">contact</NavLink>
        <NavLink to="#" onClick={console.log("click sur le boutton déconnectez")} className="kratos-link">déconnection</NavLink>
      </div>
    </div>
  );

}

export default Navbar;
