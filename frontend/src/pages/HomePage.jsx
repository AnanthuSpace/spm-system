import React from "react";
import EntryComponent from "../components/EntryComponent";
import AboutJobPortal from "../components/AboutJobPortal";
import StatsSection from "../components/StatsSection";
import CategoriesSection from "../components/CategoriesSection";

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
