import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Sidebar } from "./Sidebar";
import "./Styles/NavbarStyles.css";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import Logo from "../Images/Logo.png";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navbar-items-left">
          <ul className="navbar-items">
            <li>
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "100px", height: "100px" }}
              />
            </li>
            <li>
              <a href="/">Home | </a>
            </li>
            <li>
              <a href="/">Rooms | </a>
            </li>
            <li>
              <a href="/">Events | </a>
            </li>
          </ul>
        </div>
        <div className="navbar-items-right">
          <ul className="navbar-items">
            <li>
              <a href="/register">
                Register <HowToRegIcon /> |{" "}
              </a>
            </li>
            <li>
              <a href="/login">
                Login <LoginIcon />{" "}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <nav className="nav-menu">
        <div className="menubar">
          <MenuIcon />
        </div>
        <ul className="nav-menu-items">
          {Sidebar.map((item, index) => {
            return (
              <li
                key={index}
                className="row"
                id={window.location.pathname === item.path ? "active" : ""}
                onClick={() => {
                  window.location.pathname = item.path;
                }}
              >
                <div>
                  <div id="nav-icon">{item.icon}</div>
                  <div id="nav-title">{item.title}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
