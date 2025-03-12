import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : undefined}>Home</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined}>About</NavLink>
      <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : undefined}>Contact</NavLink>
    </nav>
  );
};

export default Navbar;