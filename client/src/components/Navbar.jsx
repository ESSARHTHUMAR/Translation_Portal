import React from "react";
import Button from "./Button";
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div className="app__container bg-black">
    <div className="flex justify-between items-center">
      <Link to="/" className="uppercase flex flex-col">
        <span className="font-p600 text-lg">Translation</span>
        <span className="font-p600 text-2xl text-neutral-400 -mt-4">Portal</span>
      </Link>
      <div className="flex gap-10 items-center justify-center">
        <Link to="/client"><Button buttonName="Login"/></Link>
        <Link to="/admin"><Button buttonName="Sign up"/></Link>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
