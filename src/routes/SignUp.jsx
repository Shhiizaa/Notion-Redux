import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from "../validation";
import { z } from "zod";
import { getUser, newUser } from "../redux/user/actions";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [error, setError] = useState("");
  const [isUserFoundError, setIsUserFoundError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSign() {
    dispatch(getUser({ email, password }))
      .then(() => {
        setError("Такой пользователь уже существует");
        setIsUserFoundError(true);
      })
      .catch((err) => {
        if (err instanceof z.ZodError) {
          setError(err.format());
        } else {
          if (secPassword === password) {
            dispatch(newUser({ email, password }));
            navigate("/");
          } else {
            setError("Пароли не совпадают");
          }
        }
      });
  }

  return (
    <div className="text-white h-[100vh] flex items-center justify-center bg-cover">
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
        <h1 className="text-4xl font-bold text-center">Sign Up</h1>
        <div className="relative my-4">
          <input
            className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white peer"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {error?.email && (
            <div className="text-red-400  w-72 break-words">
              {error?.email?._errors}
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

        <div className="relative my-4">
          <input
            className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white peer"
            placeholder="repeat password"
            type="password"
            value={secPassword}
            onChange={(e) => setSecPassword(e.target.value)}
          ></input>
          {error?.password && (
            <div className="text-red-400  w-72 break-words">
              {error?.password?._errors.join("\n")}
            </div>
          )}
        </div>
        <NavLink
          to="/login"
          className="text-gray-500 text-sm flex items-center mx-auto mb-4 justify-center"
        >
          Already signed up?
        </NavLink>
        <button
          className="w-full mb-4 text-[18px] roundedbg-blue-500 py-2 hover:bg-blue-600 transition-colors duration-300"
          onClick={handleSign}
        >
          Sign Up
        </button>
        {error && !error.email && !error.password && !isUserFoundError && (
          <div style={{ color: "red" }}>{error}</div>
        )}
        {error && !error.email && !error.password && isUserFoundError && (
          <div style={{ color: "red" }}>{error}</div>
        )}
      </div>
    </div>
  );
}
