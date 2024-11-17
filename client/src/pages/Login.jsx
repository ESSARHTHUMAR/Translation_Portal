import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  console.log(formData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };


  useEffect(() => {
    const clearError = setTimeout(() => {
      setError(null)
    },10000)
    return clearTimeout(() => clearError)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center relative h-screen">
      <div className="bg-black mx-auto p-10 relative rounded-lg w-[30vw]">
        <h1 className="text-3xl uppercase font-pBold text-bgSecondary text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <input
              onChange={handleChange}
              placeholder="Enter the email"
              className="bg-bgColor text-xs px-4 py-2 rounded-md focus:outline-none"
              type="email"
              value={formData.email}
              id="email"
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
            />
          </div>

          <div className="mt-6 text-center">
            <Button buttonName="Login" loading={loading} />
          </div>
        </form>
        {error && (
          <p className="text-center mt-5 text-xs text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
