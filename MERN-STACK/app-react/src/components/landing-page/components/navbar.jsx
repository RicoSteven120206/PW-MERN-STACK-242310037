import React from "react";
import { Button } from "../../ui/button";

export default function Navbar() {
  const menu_nav = [
    { id: 1, name: "Home", link: "#home" },
    { id: 2, name: "Books", link: "#books" },
    { id: 3, name: "Categories", link: "#categories" },
    { id: 4, name: "About", link: "#about" },
    { id: 5, name: "Contact", link: "#contact" },
  ];
  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top transition-navbar`}
      style={styles.navigationBar}
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          <i className="bi bi-book me-2"></i>
          Readly <sup>+</sup>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {menu_nav.map((menu, index) => (
              <li className="nav-item" key={index}>
                <a className="nav-link" href={menu.link}>
                  {menu.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="d-flex gap-2">
            <Button className="btn btn-light text-dark">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Sign In
            </Button>
            <Button className="btn btn-warning">
              <i className="bi bi-person-plus me-2"></i>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
const styles = {
  navigationBar: {
    backgroundColor: "rgba(247, 248, 226, 0.8)",
    transition: "all 0.3s ease-in-out",
  },
};
