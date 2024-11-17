import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { userdata } = useSelector((state) => state.user);

  return (
    <div className="app__container bg-black">
      <div className="flex justify-between items-center">
        <Link to="/" className="uppercase flex flex-col">
          <span className="font-pSemiBold text-lg">Translation</span>
          <span className="font-pSemiBold text-2xl text-neutral-400 -mt-4">
            Portal
          </span>
        </Link>
        {userdata ? (
          <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-bgSecondary font-pSemiBold text-lg bg-bgColor px-3 py-1">Welcome, {userdata?.username}</p>
          <button className="uppercase bg-bgSecondary px-3 py-1 text-xs font-pMedium hover:opacity-80 transition-all duration-300">Sign out</button>
          </div>
        ) : (
          <div className="flex gap-10 items-center justify-center">
            <Link to="/login">
              <Button buttonName="Login" />
            </Link>
            <Link to="/signup">
              <Button buttonName="Sign up" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
