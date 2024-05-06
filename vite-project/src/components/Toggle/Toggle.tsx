import React, { useEffect, useState } from "react";
import MoonIcon from "../../assets/icons/MoonIcon";
import SunIcon from "../../assets/icons/SunIcon";

const Toggle = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("themeState");
    if (storedValue !== null) {
      setPrefersDarkMode(JSON.parse(storedValue));
    } else {
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const updateDarkMode = (event) => {
        setPrefersDarkMode(event.matches);
      };

      setPrefersDarkMode(darkModeQuery.matches);

      darkModeQuery.addEventListener("change", updateDarkMode);

      return () => {
        darkModeQuery.removeEventListener("change", updateDarkMode);
      };
    }
  }, []);

  useEffect(() => {
    if (prefersDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [prefersDarkMode]);

  const toggleSwitch = () => {
    setPrefersDarkMode((prevState) => {
      localStorage.setItem("themeState", JSON.stringify(!prevState));
      return !prevState;
    });
  };

  return (
    <div
      className={`toggle ${prefersDarkMode ? "toggle--checked" : ""}`}
      onClick={toggleSwitch}
    >
      <div
        className={`toggle__item ${
          prefersDarkMode ? "toggle__item--checked" : ""
        }`}
      >
        <SunIcon />
      </div>
      <div
        className={`toggle__second-item ${
          !prefersDarkMode ? "toggle__second-item--checked" : ""
        }`}
      >
        <MoonIcon />
      </div>
      <div
        className={`toggle__thumb ${
          prefersDarkMode ? "toggle__thumb--checked" : ""
        }`}
      />
    </div>
  );
};

export default Toggle;
