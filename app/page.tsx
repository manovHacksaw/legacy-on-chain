"use client";
import Hero from "../components/Hero";
import Features from "../components/Features";
import WillInfo from "../components/WillInfo";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"; // Import Navbar

export default function Home() {
  return (
  <div className="min-h-screen bg-black">
     <Navbar />
      <main>
       <Hero />
        {/* <Partners /> */}
        <Features />
        <WillInfo />
        {/* <ImpactSection /> */}
        <FAQ />
      </main>
      
      <Footer />

      </div >
  );
}
