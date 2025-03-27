import React from "react";
import EntryComponent from "../components/EntryComponent";
import AboutJobPortal from "../components/user/AboutJobPortal";
import StatsSection from "../components/user/StatsSection";
import CategoriesSection from "../components/user/CategoriesSection";

const HomePage = () => {
  return (
    <>
      <EntryComponent />
      <AboutJobPortal/>
      <StatsSection/>
      <CategoriesSection/>
    </>
  );
};

export default HomePage;
