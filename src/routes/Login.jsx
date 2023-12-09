import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/user/actions";
import { z } from "zod";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isUserNotFoundError, setIsUserNotFoundError] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleLogin() {
    dispatch(getUser({ email, password }))
      .then(() => navigate("/"))
      .catch((err) => {
        if (err instanceof z.ZodError) {
          setError(err.format());
          setIsUserNotFoundError(false);
        } else {
          setError(err.toString());
          setIsUserNotFoundError(true);
        }
      });
  }

  return (
    <div className="text-white h-[100vh] flex items-center justify-center bg-cover">
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <div className="relative my-4">
          <input
            className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white peer"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {error?.email && (
            <div className="text-red-400  w-72 break-words">
              {error?.email?._errors.join("\n")}
            </div>
          )}
        </div>
        <div className="relative my-4">
          <input
            className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white peer"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {error?.password && (
            <div className="text-red-400  w-72 break-words">
              {error?.password?._errors.join("\n")}
            </div>
          )}
        </div>
        <NavLink
          to="/registration"
          className="text-gray-500 text-sm flex items-center mx-auto mb-4 justify-center"
        >
          Sign Up
        </NavLink>
        <button
          className="w-full mb-4 text-[18px] roundedbg-blue-500 py-2 hover:bg-blue-600 transition-colors duration-300"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && !error.email && !error.password && isUserNotFoundError && (
          <div style={{ color: "red" }}>{error}</div>
        )}
      </div>
    </div>
  );
}
