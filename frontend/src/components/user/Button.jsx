import React from "react";
import { Link } from "react-router-dom";
import useUserAuth from "../../hooks/user/useUserAuth";

function Button() {
  const { data: isAuthenticated } = useUserAuth();

  return (
    <div>
      {/* Conditionally render login or logout button */}
      {isAuthenticated ? (
        <Link to="/logout">
          <button className="relative inline-flex items-center justify-center mb-0 me-0 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-black to-black group-hover:from-black-600 group-hover:to-black-500 hover:text-white dark:text-black focus:ring-2 focus:outline-none dark:focus:ring-zinc-800">
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0">
              Logout
            </span>
          </button>
        </Link>
      ) : (
        <Link to="/login">
          <button className="relative inline-flex items-center justify-center mb-0 me-0 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-black to-black group-hover:from-black-600 group-hover:to-black-500 hover:text-white dark:text-black focus:ring-2 focus:outline-none dark:focus:ring-zinc-800">
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0">
              Login
            </span>
          </button>
        </Link>
      )}
    </div>
  );
}

export default Button;
