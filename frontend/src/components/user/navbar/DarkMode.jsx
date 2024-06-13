import React, { useEffect } from 'react';
import LightButton from "../../../assets/website/light-mode-button.png";
import DarkButton from "../../../assets/website/dark-mode-button.png";
import { FaRegLightbulb } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";

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
        <div className='relative'>
            <FaRegLightbulb onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                src={LightButton}
                alt="Light Mode Button"
                className={`w-12 cursor-pointer absolute right-0 z-10 ${theme === "dark" ? "opacity-0" : "opacity-100"} transition-all duration-300`}/>
            <FaLightbulb onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                src={DarkButton}
                alt="Dark Mode Button"
                className={`w-12 cursor-pointer `} />
        </div>
    );
}

export default DarkMode;
