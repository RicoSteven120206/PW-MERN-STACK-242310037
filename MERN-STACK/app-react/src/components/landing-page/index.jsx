import React from "react";
import { Navbar } from "./components/navbar";
import { HeroSection } from "./components/herosection";
import { FeaturesSection } from "./components/featuressection";
import { ChooseUs } from "./components/chooseus";
import { CategoriesSection } from "./components/categoriessection";
import { TestimonSection } from "./components/testimonsection";
import { Footers } from "./components/footers";

export default function LandingPages() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ChooseUs />
      <FeaturesSection />
      <CategoriesSection />
      <TestimonSection />
      <Footers />
    </div>
  );
}