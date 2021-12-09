import React from "react";
import Navbar from "../../CommonModules/NavBar";
import Footer from "../../CommonModules/Footer";
import FirstSection from "./FirstSection";
import ThirdSection from "./Thirdsection";
import FifthSection from "./FifthSection";
import "./style.css";
import SecondSection from "./SecondSection";
function ComplianceLandingPage() {
  return (
    <>
      
      <div className="Compliance-landing-page">
      <Navbar />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FifthSection />
        <Footer />
      </div>
    </>
  );
}

export default ComplianceLandingPage;
