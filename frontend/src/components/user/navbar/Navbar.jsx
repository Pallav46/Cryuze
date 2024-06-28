import { CiLocationOn } from "react-icons/ci";
import { FaCartShopping, FaCaretDown } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Shop",
    link: "/#",
  },
  {
    id: 3,
    name: "About",
    link: "/about",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Profile",
    link: "/me",
  },
  {
    id: 2,
    name: "Chat",
    link: "/chat",
  },
  {
    id: 3,
    name: "Logout",
    link: "/logout",
  },
];

function Navbar() {
  const { authUser } = useAuthContext();

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <a
              href="#"
              className="text-black dark:text-white font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
            >
              X Company
            </a>
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            {/* <div className="relative group">
              <input
                type="text"
                placeholder="Location"
                className="search-bar border-transparent focus:border-none focus:ring-0 group-hover:border-black transition-all duration-200"
              />
              <CiLocationOn className="text-xl text-gray-600 group-hover:text-black dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 transition-all duration-200" />
            </div> */}
            <button className="relative p3">
              <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <DarkMode />
            </div>
            <div className="relative cursor-pointer group">
              {authUser ? (
                <div className="flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2">
                  <Avatar rounded />
                  <span>
                    <FaCaretDown className="group-hover:rotate-180 duration-300" />
                  </span>
                  <div className="absolute top-10 z-[6969] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white">
                    <ul className="space-y-2">
                      {DropdownLinks.map((data, index) => (
                        <li key={index}>
                          <a
                            href={data.link}
                            className="text-gray-500 hover:text-black dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-gray-200 rounded-md"
                          >
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <button className="inline-flex items-center justify-center mb-0 me-0 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-black to-black group-hover:from-black-600 group-hover:to-black-500 hover:text-white dark:text-black focus:ring-2 focus:outline-none dark:focus:ring-zinc-800">
                    <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0">
                      Login
                    </span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
