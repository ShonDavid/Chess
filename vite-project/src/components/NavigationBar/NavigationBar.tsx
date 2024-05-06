import React, { useEffect, useState } from "react";
import MainIcon from "../../assets/icons/MainIcon";

const NavigationBar = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateDarkMode = event => {
      setPrefersDarkMode(event.matches);
    };

    // Update state based on current value
    setPrefersDarkMode(darkModeQuery.matches);

    // Listen for changes
    darkModeQuery.addEventListener('change', updateDarkMode);

    // Clean up
    return () => {
      darkModeQuery.removeEventListener('change', updateDarkMode);
    };
  }, []);

  useEffect(() => {
    if (prefersDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [prefersDarkMode]); 


  return (
    <div className="navigation-bar">
      <div className="navigation-bar__logo">
        <MainIcon />
      </div>
      <div className="navigation-bar__title">
        <b>T</b>reasure <b>C</b>hesst
      </div>
      <div className="navigation-bar__theme" onClick={() => setPrefersDarkMode(prevIsLight => !prevIsLight)}>
        {prefersDarkMode ? "moon" : "sun"}
      </div>
      <div className="navigation-bar__credits">
        Developed by <b>Shon David  </b>
      </div>
    </div>
  );
};

export default NavigationBar;
