import React from "react";
import Navbar from "./components/navbar";
import HeroSection from "./components/herosection";
import FeaturedBookSection from "./components/featuressection";
import CategoriesSection from "./components/categoriessection";
import ChooseUs from './components/chooseus';
import TestimonialSection from "./components/testimonsection";
import Footer from "./components/footers";

export default function LandingPage() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <FeaturedBookSection />
            <CategoriesSection />
            <ChooseUs />
            <TestimonialSection />
            <Footer />
        </div>
    )
}