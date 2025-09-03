import React from "react";
import Hero from "./HomePg/Hero";
import ReasonForHelp from "./HomePg/ReasonForHelp";
import Contribution from "./HomePg/Contribution";
import Banner1 from "./HomePg/Banner1";
import Banner from "./HomePg/Banner";
import Footer from "../components/Footer";
// import License from "./HomePg/License";

const Home = () => {
  return (
    <>
      <Hero />
      <ReasonForHelp/>
      <Contribution/>
      <Banner1/>
      <Banner/>
      <Footer/>
      
    </>
  );
};

export default Home;
