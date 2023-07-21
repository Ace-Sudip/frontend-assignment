"use client";
import { useEffect } from "react";
import Link from "next/link";

function Header() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-info w-100 mb-5">
      <Link href="/" className="navbar-brand">
        <p className="h5">Online Store</p>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto font-weight-bold">
         
        </ul>
      </div>
    </nav>
  );
}

export default Header;
