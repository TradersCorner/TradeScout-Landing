import { useEffect } from "react";
import { Link } from "wouter";

export default function ThankYou() {
  useEffect(() => {
    document.title = "Thank You – TradeScout";
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text dark flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-black text-brand mb-4">Thank You!</h1>
        <p className="text-lg text-muted-text mb-6 leading-relaxed">
          Your email has been received. We'll notify you the moment TradeScout goes live.
        </p>
        <Link 
          href="/"
          className="inline-block bg-brand hover:bg-brand-2 text-white px-6 py-3 rounded-lg font-bold transition-colors duration-200"
          data-testid="link-home"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
