import { Star } from "lucide-react";

export default function Header() {
  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup');
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-bg/70 border-b border-white/6">
      <div className="w-full max-w-container mx-auto px-4">
        <nav className="flex items-center justify-between py-3.5">
          <div className="flex items-center gap-2.5">
            <img 
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32" 
              alt="TradeScout Logo" 
              className="w-7 h-7 rounded-full object-cover border border-white/12"
            />
            <span className="font-black text-xl tracking-wider">TradeScout</span>
          </div>
          
          <button 
            onClick={scrollToSignup}
            className="inline-flex items-center gap-2.5 brand-gradient text-white px-4 py-3 rounded-full font-extrabold cursor-pointer shadow-lg shadow-brand/20 hover:-translate-y-0.5 focus:outline-none focus:ring-3 focus:ring-brand/35 transition-transform duration-150"
            data-testid="button-early-access"
          >
            <Star className="w-4 h-4 opacity-90" />
            Get Early Access
          </button>
        </nav>
      </div>
    </header>
  );
}
