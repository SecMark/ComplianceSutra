import React from 'react';
import "./style.css";
import Footer from '../../CommonModules/Footer';
import FirstSection from '../CapmTechLandingPage/SubModule/FirstSection';
import SecondSection from '../CapmTechLandingPage/SubModule/SecondSection';
import ThirdSection from '../CapmTechLandingPage/SubModule/ThirdSection';
import FourthSection from '../CapmTechLandingPage/SubModule/FourthSection';
import FifthSection from '../CapmTechLandingPage/SubModule/FifthSection';

function CapmTechLandingPage() {
    return (
        <div className="capm-tech-landing-page">
                <FirstSection />

                <SecondSection />

                <ThirdSection />

                <FourthSection />

                <FifthSection />
                <Footer />
                
        </div>
    )
}


export default CapmTechLandingPage;