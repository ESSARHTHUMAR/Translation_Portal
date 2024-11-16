import React from "react";
import Button from "./Button";
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div className="app__container bg-black">
    <div className="flex justify-between items-center">
      <Link to="/" className="uppercase flex flex-col">
        <span className="font-pSemiBold text-lg">Translation</span>
        <span className="font-pSemiBold text-2xl text-neutral-400 -mt-4">Portal</span>
      </Link>
      <div className="flex gap-10 items-center justify-center">
        <Link to="/login"><Button buttonName="Login"/></Link>
        <Link to="/signup"><Button buttonName="Sign up"/></Link>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
