import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/home-page/HomePage";
import AboutUs from "./components/about-page/AboutUs";
import Portfolio from "./components/portfolio-page/Portfolio";
import ContactUs from "./components/contact-page/ContactUs";
import Newsletter from "./components/newsletter-page/Newsletter";
import BookNow from "./components/booking-page/BookNow";
import ChooseABarber from "./components/choose-a-barber/ChooseABarber";

export default function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-Us" element={<AboutUs />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/choose-a-barber/:selectedProducts" element={<ChooseABarber />} />
      </Routes>
      {/* <p>Logo</p> */}
    </div>
  );
}
