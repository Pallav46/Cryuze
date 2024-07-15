import React, { useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

function DarkMode() {
  const [theme, setTheme] = React.useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme, element]);

  return (
    <div className='fixed right-12 top-3 z-50'>
      <input
        type="checkbox"
        id="themeToggle"
        className="hidden"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <label
        htmlFor="themeToggle"
        className="flex items-center cursor-pointer p-2 bg-gray-300 dark:bg-gray-600 rounded-full"
      >
        <FaSun className={`w-3 h-3 text-yellow-500 transition-transform duration-300 `} />
        <div className={`w-10 h-5 flex items-center bg-gray-400 dark:bg-gray-800 rounded-full mx-2 px-1 transition-colors duration-300`}>
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${theme === "dark" ? 'translate-x-4' : 'translate-x-0'}`}
          />
        </div>
        <FaMoon className={`w-3 h-3 text-yellow-500 transition-transform duration-300 `} />
      </label>
    </div>
  );
}

export default DarkMode;

