import { Star } from "lucide-react";

export default function Hero() {
  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup');
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-16 pb-8 text-center" itemScope itemType="https://schema.org/Organization">
      <div className="w-full max-w-container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-wide mb-4" itemProp="name">
          Connection Without Compromise
        </h1>
        <p className="text-base md:text-lg text-muted-text max-w-4xl mx-auto leading-relaxed" itemProp="description">
          Predatory predecessors sold your information as "leads." TradeScout USA builds a professional network where American homeowners and skilled US contractors connect directly for painting, flooring, roofing, and home improvement projects — no middlemen, no lead fees, no games.
        </p>
        <div className="mt-7">
          <button 
            onClick={scrollToSignup}
            className="inline-flex items-center gap-2.5 brand-gradient text-white px-4 py-3 rounded-full font-extrabold cursor-pointer shadow-lg shadow-brand/20 hover:-translate-y-0.5 focus:outline-none focus:ring-3 focus:ring-brand/35 transition-transform duration-150"
            data-testid="button-hero-cta"
          >
            <Star className="w-4 h-4 opacity-90" />
            Get Early Access
          </button>
        </div>
      </div>
    </section>
  );
}
