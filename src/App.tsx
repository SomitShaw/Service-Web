// app.tsx
import React from "react";
import Navbar from "./Components/navbar.tsx"; // Adjust the path based on the actual location of your Navbar component
import LogoClouds from "./Components/LogoClouds.tsx";
import Footer from "./Components/Footer.tsx";
import FeatureOne from "./Components/FeatureOne.tsx";
import CTA from "./Components/CTA.tsx";
import Pricing from "./Components/Pricing.tsx";
import TestmonialsOne from "./Components/TestmonialsOne.tsx";
import TopBanner from "./Components/TopBanner.tsx";

const App: React.FC = () => {
  return (
    <div>
      {/* Other components or content of your app */}
      <Navbar />
      <TopBanner />
      <CTA />
      <FeatureOne />
      <Pricing />
      <TestmonialsOne />
      <LogoClouds />
      <Footer />
    </div>
  );
};

export default App;
