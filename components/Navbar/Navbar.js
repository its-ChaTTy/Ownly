// Navbar.jsx

import React from "react";
import Image from "next/image";
import { FaSearch, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import "./Navbar.scss";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleSignup = () => {
    router.push("/auth/register");
  };

  return (
    <div className="Navbar">
      <div className="Navbar__container">
        <div className="Navbar__leftside">
          <div className="Navbar__container--logo">
            <Image
              src="/Images/Logos/ownly_footer_logo.png"
              alt="Your Logo"
              width={100}
              height={100}
            />
          </div>
          <div className="Navbar__container--pages">
            <p>Home</p>
            <p>How it works</p>
            <p>About us</p>
            <p>Contact</p>
          </div>
        </div>
        <div className="Navbar__rightside">
          <div className="Navbar__container--search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-bar"
              placeholder="Search for items to rent"
            />
          </div>

          <div>
            <button className="signup-button" onClick={handleSignup}>
              {" "}
              Sign Up{" "}
            </button>
          </div>
          <div>
            <button className="login-button" onClick={handleLogin}>
              {" "}
              Login{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
