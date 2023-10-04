import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { FaMoon, FaSun } from "react-icons/fa6";


export default function DarkModeSwitch() {
    const [isDark, setDark] = useState<boolean|null>(null);

    const setDarkMode = (isDark: boolean = true) => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            setDark(true);
            return;
        }
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
        setDark(false);
    }

    useEffect(() => {
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode();
        } else {
            setDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => setDarkMode(!isDark);

    return (
        isDark !== null && <button
            type="button"
            className="hover:bg-background transition-all rounded-lg p-2"
            onClick={toggleDarkMode}
        >

            <IconContext.Provider value={{ size: "1.5rem", color: `${isDark ? "white" : "black"}`, className: `icon ${isDark ? "" : "hidden"}` }}><FaMoon /></IconContext.Provider>
            <IconContext.Provider value={{ size: "1.5rem", color: `${isDark ? "white" : "black"}`, className: `icon ${isDark ? "hidden" : ""}` }}><FaSun /></IconContext.Provider>
        </button>

    );
}