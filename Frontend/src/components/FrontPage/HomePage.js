import Header from "./Header/Header";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import CarouselSection from "./CarouselSection";
import MostWantedProducts from "./Most Wandted/MostWanted";
import LessCarbonFootPrintProduct from "./Carbon Footprint/CarbonFootprint";
import Categories from "../Categories/Categories";
import MostDiscountedProducts from "./Most Discounted/DiscountedProducts";

const HomePage = () => {
    return(
        <>
        <Header />
        <HeroSection />
        <Categories/>
        <CarouselSection />
        <hr/>
        <LessCarbonFootPrintProduct/>
        <hr/>
        <MostWantedProducts/>
        <hr/>
        <MostDiscountedProducts/>
        <Footer /></>
    );
}

export default HomePage;