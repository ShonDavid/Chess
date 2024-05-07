import React, { useEffect, useState } from "react";
import MainIcon from "../../assets/icons/MainIcon";
import Toggle from "../Toggle/Toggle";

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <div className="navigation-bar__logo">
        <MainIcon />
      </div>
      <div className="navigation-bar__title">
        <b>T</b>reasure <b>C</b>hesst
      </div>
      <div className="navigation-bar__theme-toggle">
        <Toggle />
      </div>
    </div>
  );
};

export default NavigationBar;
