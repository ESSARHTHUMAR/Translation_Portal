import React from "react";
import Button from "../components/Button";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center relative h-screen">
      <div className="bg-black mx-auto p-10 relative rounded-lg">
        <h1 className="text-3xl uppercase font-pBold text-bgSecondary text-center">
          Sign Up
        </h1>
        <form action="" className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <input placeholder="Enter the username" className="bg-bgColor text-xs px-4 py-2 rounded-md focus:outline-none" type="text" name="" id="" />
          </div>
          <div className="flex flex-col gap-2">
            <input placeholder="Enter the email" className="bg-bgColor text-xs px-4 py-2 rounded-md focus:outline-none" type="email" name="" id="" />
          </div>
          <div className="flex flex-col gap-2">
            <input placeholder="Enter the password" className="bg-bgColor text-xs px-4 py-2 rounded-md focus:outline-none" type="password" name="" id=""  />
          </div>
          <div className="flex flex-col gap-2">
            <select className="bg-bgColor px-4 py-2 rounded-lg text-xs">
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mt-6 text-center">
          <Button buttonName="Create Account"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
