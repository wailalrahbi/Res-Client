import React from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import Logo from "../Images/logo.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Nav_Admin = () => {
  return (
    <div>
      <Navbar className="navbar">
        <img src={Logo} className="logo" />
        <Nav className="centerNav">
          <NavItem>
            <NavLink active href="/adminHome" className="navlink">
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/addstaffs" className="navlink">
              Add Employee
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/CompletedOrders" className="navlink">
              Completed Orders
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
