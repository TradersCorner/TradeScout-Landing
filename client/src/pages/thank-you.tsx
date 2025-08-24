import { useEffect } from "react";
import { Link } from "wouter";

export default function ThankYou() {
  useEffect(() => {
    document.title = "Thank You – TradeScout";
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text dark flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-black text-brand mb-4">🎉 You're In!</h1>
        <p className="text-lg text-muted-text mb-4 leading-relaxed">
          <strong>Welcome to the TradeScout early access list!</strong> You're now among the first to experience direct connections between homeowners and contractors.
        </p>
        <div className="bg-panel-2 border border-brand/20 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-brand mb-3">What happens next?</h2>
          <div className="space-y-2 text-muted-text">
            <p>✅ <strong>Priority access</strong> when we launch</p>
            <p>🔔 <strong>Exclusive updates</strong> on our progress</p>
            <p>🏠 <strong>Early bird benefits</strong> and special features</p>
            <p>📧 <strong>No spam, ever</strong> - just the important stuff</p>
          </div>
        </div>
        <p className="text-sm text-muted-text mb-6">
          Keep an eye on your inbox - we'll be in touch soon with exclusive early access details!
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/"
            className="inline-block bg-brand hover:bg-brand-2 text-white px-6 py-3 rounded-lg font-bold transition-colors duration-200"
            data-testid="link-home"
          >
            ← Back to Home
          </Link>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'TradeScout - Direct Contractor Connections',
                  text: 'Join me on the TradeScout early access list - direct connections between homeowners and contractors!',
                  url: window.location.origin
                });
              } else {
                navigator.clipboard?.writeText(window.location.origin);
                alert('Link copied! Share TradeScout with others.');
              }
            }}
            className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold transition-colors duration-200 border border-white/20"
            data-testid="button-share"
          >
            📤 Share TradeScout
          </button>
        </div>
      </div>
    </div>
  );
}
