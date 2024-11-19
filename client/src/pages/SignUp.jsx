import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const SignUp = () => {

  const navigate = useNavigate();

  //State for sign up form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(false); //Manage loading state
  const [error, setError] = useState() //Manage error state

  //Setting form data
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  //Handling the formdata after clicking on the Create Account button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if(data.success === false) {
        setLoading(false)
        if(data.message === "User validation failed: username: Path `username` is required., email: Path `email` is required."){

          setError("Please enter all the details.")
        }
        if(data.message === "User validation failed: email: Path `email` is required."){

          setError("Please enter the email.")
        }
        if(data.message === "User validation failed: username: Path `username` is required."){

          setError("Please enter the username.")
        }
        setError(data.message)
        return;
      }
      setLoading(false)
      setError(null)
      navigate("/login")
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  };

  //Remove the error message after 10 seconds.
  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError(null)
    }, 10000)

    return clearTimeout(() => errorTimeout)
  },[error])

  return (
    <div className="flex flex-col items-center justify-center relative h-screen">
      <div className="bg-black mx-auto p-10 relative rounded-lg w-[350px] md:w-[450px] ">
        <h1 className="text-3xl uppercase font-pBold text-bgSecondary text-center">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <input
              onChange={handleChange}
              placeholder="Enter the username"
              className="bg-bgColor text-xs px-4 py-2 rounded-md focus:outline-none"
              type="text"
              value={formData.username}
              id="username"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              onChange={handleChange}
              placeholder="Enter the email"
              className="bg-bgColor text-xs px-4 py-2 rounded-md focus:outline-none"
              type="email"
              value={formData.email}
              id="email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              onChange={handleChange}
              placeholder="Enter the password"
              className="bg-bgColor text-xs px-4 py-2 rounded-md focus:outline-none"
              type="password"
              value={formData.password}
              id="password"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <select
              className="bg-bgColor px-4 py-2 rounded-lg text-xs"
              id="role"
              onChange={handleChange}
              value={formData.role}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mt-6 text-center">
            <Button buttonName="Create Account" loading={loading}/>
          </div>
        </form>
        {error && <p className="text-center mt-5 text-xs text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
