import React, { useState } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/user/userSlice";
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userdata } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signOut");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess());
      setMobileMenuOpen(false)
      navigate("/");
    } catch (error) {
      dispatch(signOutFailure());
      navigate("/");
      setMobileMenuOpen(false)
    }
  };

  return (
    <div className="app__container bg-black">
      <div className="flex justify-between items-center p-4">
        <Link to="/" className="uppercase flex flex-col">
          <span className="font-pSemiBold text-bgSecondary text-lg">
            Translation
          </span>
          <span className="font-pSemiBold text-2xl text-neutral-400 -mt-4">
            Portal
          </span>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`opacity-60 uppercase text-xs font-pMedium hover:opacity-80 transition-all duration-300 ${
              userdata ? "block" : "hidden"
            }`}
          >
            Home
          </Link>
          {userdata?.role === "customer" && (
            <>
              <Link
                to="/customer"
                className="opacity-60 uppercase text-xs font-pMedium hover:opacity-80 transition-all duration-300"
              >
                My Files
              </Link>
              <Link
                to="/customer/upload"
                className="opacity-60 uppercase text-xs font-pMedium hover:opacity-80 transition-all duration-300"
              >
                Upload File
              </Link>
            </>
          )}
          {userdata?.role === "admin" && (
            <Link
              to="/admin"
              className="opacity-60 uppercase text-xs font-pMedium hover:opacity-80 transition-all duration-300"
            >
              All Files
            </Link>
          )}
        </div>
        {userdata ? (
          <div className="hidden md:flex flex-col items-center justify-center gap-1">
            <p className="text-bgSecondary font-pSemiBold text-lg bg-bgColor px-3 py-1">
              Welcome, {userdata?.username}
            </p>
            <button
              onClick={handleSignOut}
              className="uppercase bg-bgSecondary px-3 py-1 text-xs font-pMedium hover:opacity-80 transition-all duration-300"
            >
              {loading ? "Loading..." : "Sign out"}
            </button>
          </div>
        ) : (
          <div className="hidden md:flex gap-10 items-center justify-center">
            <Link to="/login">
              <Button buttonName="Login" />
            </Link>
            <Link to="/signup">
              <Button buttonName="Sign up" />
            </Link>
          </div>
        )}
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <p ><IoCloseSharp className="text-2xl"/></p> :  <p><TiThMenu className="text-2xl" /></p>}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black text-white p-4">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className={`uppercase text-xs font-pMedium hover:opacity-80 transition-all duration-300 ${
                userdata ? "block" : "hidden"
              }`}
            >
              Home
            </Link>
            {userdata?.role === "customer" && (
              <>
                <Link
                  to="/customer"
                  className="uppercase text-xs font-pMedium hover:opacity-80 transition-all duration-300"
                >
                  My Files
                </Link>
                <Link
                  to="/customer/upload"
                  className="uppercase text-xs font-pMedium hover:opacity-80 transition-all duration-300"
                >
                  Upload File
                </Link>
              </>
            )}
            {userdata?.role === "admin" && (
              <Link
                to="/admin"
                className="uppercase text-xs font-pMedium hover:opacity-80 transition-all duration-300"
              >
                All Files
              </Link>
            )}
          </div>
          {userdata ? (
            <div className="flex flex-col items-center gap-2 mt-4">
              <p className="text-bgSecondary font-pSemiBold text-lg bg-bgColor px-3 py-1">
                Welcome, {userdata?.username}
              </p>
              <button
                onClick={handleSignOut}
                className="uppercase bg-bgSecondary px-3 py-1 text-xs font-pMedium hover:opacity-80 transition-all duration-300"
              >
                {loading ? "Loading..." : "Sign out"}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4 mt-4">
              <Link to="/login">
                <Button buttonName="Login" />
              </Link>
              <Link to="/signup">
                <Button buttonName="Sign up" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
