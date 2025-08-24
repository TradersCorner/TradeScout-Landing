import { User, Briefcase, Shield } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* Enhanced Footer Signup Section */}
      <section style={{
        background: "linear-gradient(135deg, rgba(255,107,53,0.05), rgba(37,99,235,0.03))",
        borderTop: "1px solid var(--border)",
        padding: "48px 0 32px"
      }}>
        <div className="w-full max-w-6xl mx-auto px-4">
          <div style={{
            textAlign: "center",
            marginBottom: "32px"
          }}>
            <h2 style={{fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, color: "var(--text)", marginBottom: "16px"}}>Ready to Get Started?</h2>
            <p style={{fontSize: "16px", color: "var(--muted)", maxWidth: "600px", margin: "0 auto 24px"}}>Join thousands of homeowners and contractors already connected through TradeScout</p>
            <a 
              href="#signup"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, var(--brand), var(--brand-2))",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: 600,
                transition: "all 0.2s ease"
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('signup')?.scrollIntoView({behavior: 'smooth'});
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px)"}
              data-testid="footer-signup-button"
            >
              <User size={18} />
              Get Early Access
            </a>
          </div>
          
          {/* Quick Benefits */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center"
          }}>
            <div style={{padding: "16px"}}>
              <Shield size={24} style={{color: "var(--brand)", margin: "0 auto 8px"}} />
              <div style={{fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "4px"}}>Verified Network</div>
              <div style={{fontSize: "12px", color: "var(--muted)"}}>Licensed & insured professionals</div>
            </div>
            <div style={{padding: "16px"}}>
              <Briefcase size={24} style={{color: "var(--success)", margin: "0 auto 8px"}} />
              <div style={{fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "4px"}}>No Lead Fees</div>
              <div style={{fontSize: "12px", color: "var(--muted)"}}>Direct connections, no middleman</div>
            </div>
            <div style={{padding: "16px"}}>
              <User size={24} style={{color: "var(--accent)", margin: "0 auto 8px"}} />
              <div style={{fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "4px"}}>Free to Join</div>
              <div style={{fontSize: "12px", color: "var(--muted)"}}>Always free for homeowners</div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="pt-8 pb-8 border-t border-white/6 text-gray-400 text-center text-sm">
        <div className="w-full max-w-container mx-auto px-4">
          <div style={{marginBottom: "16px"}}>
            <p style={{fontSize: "12px", color: "var(--muted)", margin: "0 0 8px"}}>Disclaimer: Homeowners should independently verify all contractor licenses, insurance, and credentials before hiring.</p>
            <p style={{fontSize: "12px", color: "var(--muted)", margin: 0}}>TradeScout provides a platform for connections but does not endorse or guarantee any contractor services.</p>
          </div>
          
          © 2025 TradeScout. Local connection. Without compromise.
        </div>
      </footer>
    </>
  );
}
