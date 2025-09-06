import React from "react";
import Hero from "../components/HomePg/Hero";
import ReasonForHelp from "../components/HomePg/ReasonForHelp";
import Contribution from "../components/HomePg/Contribution";
import Banner1 from "../components/HomePg/Banner1";
import Banner from "../components/HomePg/Banner";
import Footer from "../components/Footer";
import TeamSection from "../components/HomePg/TeamSection";
// import License from "./HomePg/License";

const Home = () => {
  return (
    <>
      <Hero />
      <ReasonForHelp />
      <Contribution />
      <Banner1 />
      <TeamSection />
      <Banner />
      <Footer />
    </>
  );
};

export default Home;
