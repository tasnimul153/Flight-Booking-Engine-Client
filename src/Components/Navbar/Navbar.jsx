import { React, useEffect, useState } from "react";
import "./navbar.css";
import { SiYourtraveldottv } from "react-icons/si";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [navLink, setNavLink] = useState("navLink");
  const [buttonClass, setButtonClass] = useState("signupButtonHomePage");
  const [logoClass, setLogoClass] = useState("logoHomePage");

  const [active, setActive] = useState("navBar");
  const [navBarBackground, setNavBarBackground] = useState("transparent");

  useEffect(() => {
    if(location.pathname === "/") {
      // Home Page
      setNavLink("navLink");
      setButtonClass("signupButtonHomePage");
      setLogoClass("logoHomePage");
      setNavBarBackground("transparent");

    } else {
      // Other Pages
      setNavLink("navLinkOthers");
      setButtonClass("signupButtonOtherPage");
      setLogoClass("logoOtherPage");
      setNavBarBackground("white");
    }
  }, [location.pathname]);

  // Toggle Navigation Bar
  const showNav = () => {
    if (active === "navBar activeNavBar") {
      setActive("navBar");
    } else {
      setActive("navBar activeNavBar");
    }
  };

  return (
    <section className="navBarSection" style={{ backgroundColor: navBarBackground }}>
      <header className="header flex">
        {/* Company Logo */}
        <div className="logoDiv">
          <Link to="/" className="logo flex">
            <h1 className={logoClass}>
              <SiYourtraveldottv  /> A-1 Travel and Tours
            </h1>
          </Link>
        </div>

        {/* Navigation Bar */}
        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <a href="#" className={navLink}>
                HOME
              </a>
            </li>
            <li className="navItem">
              <a href="#" className={navLink}>
                SERVICES
              </a>
            </li>
            <li className="navItem">
              <a href="#" className={navLink}>
                ABOUT
              </a>
            </li>
            <button className={buttonClass}>
              Sign Up
            </button>
          </ul>
        </div>

        {/* Toggle Navigation Bar */}
        <div className="toggleNavBar" onClick={showNav}>
          <HiBars3BottomRight className="icon" />
        </div>
      </header>
    </section>
  );
};

export default Navbar;
