import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPg() {
  const [formData, setFormData] = useState({
    userName: "",
    mobileNumber: "",
    emailID: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({}); // store backend validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error as user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/addCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // if (response.ok) {
      //   await response.json();
      //   setFormData({
      //     userName: "",
      //     mobileNumber: "",
      //     emailID: "",
      //     password: "",
      //     confirmPassword: "",
      //   });
      //   setErrors({});
      // } else if (response.status === 400) {
      //   // parse backend validation errors
      //   const errorData = await response.json();
      //   setErrors(errorData);
      // } else {
      //   setErrors({ general: "Unexpected error occurred." });
      // }

      if (response.ok) {
  setFormData({ userName: "", emailID: "", mobileNumber: "", password: "", confirmPassword: "" });
  setErrors({});
} else if (response.status === 400) {
  const errorData = await response.json();
  setErrors(errorData);
}
    } catch (error) {
      setErrors({ general: "Backend not reachable." });
    }
  };

  const labelStyles = "block text-lg font-semibold pt-4";
  const textFieldStyles =
    "w-full px-4 py-2 text-base border rounded-md transition focus:ring focus:ring-dark";

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-[585px] bg-gray-300 flex items-center justify-center font-primary">
        <div className="bg-gray-300 shadow-md rounded-lg max-w-md w-full px-8 py-6">
          {/* USERNAME */}
          <div>
            <label htmlFor="username" className={labelStyles}>
              UserName
            </label>
            <input
              id="username"
              type="text"
              name="userName"
              value={formData.userName}
              placeholder="Your Username"
              onChange={handleChange}
              className={textFieldStyles}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label htmlFor="email" className={labelStyles}>
              Email
            </label>
            <input
              id="email"
              name="emailID"
              type="text"
              value={formData.emailID}
              placeholder="Your Email"
              onChange={handleChange}
              className={textFieldStyles}
            />
            {errors.emailID && (
              <p className="text-red-500 text-sm">{errors.emailID}</p>
            )}
          </div>

          {/* MOBILE */}
          <div>
            <label htmlFor="mobileNumber" className={labelStyles}>
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="text"
              value={formData.mobileNumber}
              placeholder="Your Mobile Number"
              onChange={handleChange}
              className={textFieldStyles}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm">{errors.mobileNumber}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className={labelStyles}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Your Password"
              onChange={handleChange}
              className={textFieldStyles}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label htmlFor="conpassword" className={labelStyles}>
              Confirm Password
            </label>
            <input
              id="conpassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Your Password"
              onChange={handleChange}
              className={textFieldStyles}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* GENERAL ERRORS */}
          {errors.general && (
            <p className="text-red-600 text-center mt-2">{errors.general}</p>
          )}

          {/* SUBMIT */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="px-6 py-2 w-full bg-blue-300 rounded-lg "
            >
              SignUp
            </button>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}