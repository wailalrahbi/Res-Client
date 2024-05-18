import React from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import Logo from "../Images/logo.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Navb = () => {
  return (
    <div>
      <Navbar className="navbar">
        <img src={Logo} className="logo" />
        <Nav className="centerNav">
          <NavItem>
            <NavLink active href="/items" className="navlink">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/cart" className="navlink">
              Cart
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/" className="navlink">
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};
