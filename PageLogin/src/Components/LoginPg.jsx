import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../config";



export default function LoginPg() {

     const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // to store backend errors

  // Optional: navigate if you plan to redirect on success
  const navigate = useNavigate();

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch("http://localhost:8080/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

       const response = await fetch(`${api}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // login success → redirect or store token
        navigate("/dashboard"); // or any protected route
      } else if (response.status === 400) {
        const errorData = await response.json(); // { username: "...", password: "..." }
        setErrors(errorData);
      } else {
        setErrors({ general: "Unexpected error occurred" });
      }
    } catch (error) {
      setErrors({ general: "Backend not reachable" });
    }
  };

  const labelStyle =
    "block text-lg font-semibold pt-4";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition  focus:ring focus:ring-dark";


  return (

    <div className="min-h-[585px] bg-gray-300 flex items-center justify-center font-primary">
      <div className="bg-gray-300 shadow-md rounded-lg max-w-md w-full px-8 py-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor="username" className={labelStyle}>Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Your Username"
              value={formData.username}
              onChange={handleChange}
              className={textFieldStyle}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelStyle}>Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
              className={textFieldStyle}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* General error */}
          {errors.general && <p className="text-red-600 text-center">{errors.general}</p>}

          <div>
            <button type="submit" className="w-full px-6 py-2 text-xl rounded-xl bg-blue-300 hover:bg-dark">
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">Register Here</Link>
        </p>
      </div>
    </div>
  );
}



    // <div className="min-h-[585px] bg-gray-300  flex items-center justify-center font-primary">
    //   <div className="bg-gray-300 shadow-md rounded-lg max-w-md w-full px-8 py-6">
       
    //     <form className="space-y-6">
    //       {/* Email Field */}
    //       <div>
    //         <label htmlFor="username" className={labelStyle}>
    //           Username
    //         </label>
    //         <input
    //           id="username"
    //           type="text"
    //           name="username"
    //           placeholder="Your Username"
    //           required
    //           className={textFieldStyle}
    //         />
    //       </div>

    //       {/* Password Field */}
    //       <div>
    //         <label htmlFor="password" className={labelStyle}>
    //           Password
    //         </label>
    //         <input
    //           id="password"
    //           type="password"
    //           name="password"
    //           placeholder="Your Password"
    //           required
    //           minLength={8}
    //           maxLength={20}
    //           className={textFieldStyle}
    //         />
    //       </div>

    //       {/* Submit Button */}
    //       <div>
    //         <button
    //           type="submit"
    //           className="w-full px-6 py-2 text-xl rounded-xl bg-blue-300 hover:bg-dark"
    //         >
    //           Login
    //         </button>
    //       </div>
    //     </form>

    //     {/* Register Link */}
    //     <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
    //       Don't have an account?{" "}
    //       <Link
    //         to="/register"
    //         className="text-blue-600">
    //         Register Here
    //       </Link>
    //     </p>


    //   </div>
    // </div>
    //  );
// }



    {/* Register Page */}

    {/* <div>
        <label htmlFor="username" className={labelStyle}>
            FirstName
        </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Your Username"
              required
              className={textFieldStyle}
            />
    </div>
    <div>
        <label htmlFor="username" className={labelStyle}>
            LastName
        </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Your Username"
              required
              className={textFieldStyle}
            />
    </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        <div>
                <label htmlFor="email" className={labelStyle}>
                Email
                </label>
                <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                className={textFieldStyle}
                required
                />
            </div>

            <div>
                <label htmlFor="mobileNumber" className={labelStyle}>
                Mobile Number
                </label>
                <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                required
                pattern="^\d{10}$"
                title="Mobile number must be exactly 10 digits"
                placeholder="Your Mobile Number"
                className={textFieldStyle}
                />
            </div>
        </div>
        <div>
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              required
              minLength={8}
              maxLength={20}
              className={textFieldStyle}
            />
          </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 pt-4">
            <div>
                <h2  className="block text-lg font-semibold">Gender</h2>
            </div>
            <div className=" flex justify-around text-lg">
                <input type="radio" name="fav_language" value="Male"/>
                <label htmlFor="female">Male</label>  &nbsp;
                <input type="radio" name="fav_language" value="Female"/>
                <label htmlFor="female">Female</label>
            </div>
           
        </div>

        <div className="text-center pt-6">
          <button
            type="submit"
            className="px-6 py-2 w-full bg-blue-300 rounded-lg ">
            Submit
          </button>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
           Have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600">
            Login
          </Link>
        </p> */}

