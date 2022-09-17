import React from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import { useState } from "react";
import classes from "./Header.module.scss";
import { useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";

function Header() {

  const navigate = useNavigate();
  const ctaClickHandler = ()=>{
    navigate("/page-cta");
  }
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({  
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerHeight,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
  }
    console.log("isMenuOpen "+menuOpen)
  }, [size.width,menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };
  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <h2 className={classes.header__content__logo}>navbar</h2>
        <nav
          className={`${classes.header__content__nav} ${
            menuOpen && size.width < 768 ? classes.isMenu : ""
          }`}
        >
          <ul>
            <li>
              <Link to="/page-one">PageOne</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/page-two">PageTwo</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/page-three">PageThree</Link>
            </li>
          </ul>
          <button onClick={ctaClickHandler}>CTA Page</button>
        </nav>

        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
