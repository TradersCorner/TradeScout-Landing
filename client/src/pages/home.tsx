import { useEffect } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Reviews from "@/components/reviews";
import SignupForm from "@/components/signup-form";
import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    document.title = "TradeScout — Connection Without Compromise";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "TradeScout connects homeowners and verified contractors directly—no gatekeepers, no spam. Get early access.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text dark">
      <Header />
      <Hero />
      <Features />
      <Reviews />
      <div className="mt-7 mb-2 w-full max-w-container mx-auto bg-gradient-to-r from-orange-500 to-brand-2 text-white px-5 py-4 rounded-xl text-center font-black tracking-wide shadow-xl shadow-brand-2/25">
        Join 500,000+ people who trust TradeScout for their home projects.
      </div>
      <SignupForm />
      <Footer />
    </div>
  );
}
