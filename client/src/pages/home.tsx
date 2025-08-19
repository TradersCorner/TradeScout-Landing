import { useEffect } from "react";
import logoPath from "@assets/logo_1755576317372.png";
import acceleratedGrowthPath from "@assets/accelerated-growth_1755576317371.jpg";
import findHelpersPath from "@assets/find-helpers-employees_1755576317371.jpg";
import directConnectPath from "@assets/direct-connect_1755576317371.jpg";
import homeownerToolsPath from "@assets/homeowner-tools_1755576317371.jpg";

export default function Home() {
  useEffect(() => {
    // SEO optimization is handled in index.html, but we can add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TradeScout",
      "description": "Direct connection platform for homeowners and contractors",
      "url": "https://thetradescout.us",
      "logo": "https://thetradescout.us/assets/logo.png",
      "sameAs": [],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "availableLanguage": "English"
      },
      "areaServed": "United States",
      "serviceType": ["Home Improvement", "Construction", "Contractor Services"]
    };
    
    // Add structured data to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      // Cleanup structured data script on component unmount
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) existingScript.remove();
    };

    // Smooth scroll for in-page anchors
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        const el = id ? document.querySelector(id) : null;
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Dynamic audience message based on selected roles
    const msgBox = document.getElementById('form-message');
    if (msgBox) {
      const TXT = {
        hybrid: {
          kicker: 'Get Matched the Right Way.',
          sub: 'Whether you are a contractor or a homeowner, TradeScout makes direct connection simple.'
        },
        contractor: {
          kicker: 'Get In Early. Stay Ahead.',
          sub: 'Start building reviews and telling your customers to recommend you before competitors catch up.'
        },
        homeowner: {
          kicker: 'Be First. Shape the Network.',
          sub: 'Invite your contractors, leave recommendations, and help build a trusted community from the start.'
        }
      };

      const roles = Array.from(document.querySelectorAll('input[name="roles[]"]')) as HTMLInputElement[];
      const render = ({ kicker, sub }: { kicker: string; sub: string }) => {
        if (msgBox) {
          msgBox.innerHTML = `<span class="kicker">${kicker}</span><p class="sub">${sub}</p>`;
        }
      };

      const update = () => {
        const selected = roles.filter(c => c.checked).map(c => c.value);
        if (selected.length === 1) {
          if (selected[0] === 'Contractor') return render(TXT.contractor);
          if (selected[0] === 'Homeowner') return render(TXT.homeowner);
          return render(TXT.hybrid);
        }
        render(TXT.hybrid);
      };

      roles.forEach(c => c.addEventListener('change', update));
      update();
    }
  }, []);

  return (
    <>
      {/* Header */}
      <header>
        <div className="container nav">
          <div className="brand">
            <img className="brand-icon" src={logoPath} alt="" width="28" height="28" />
            <span>TradeScout</span>
          </div>
          <a className="cta" href="#signup" aria-label="Get early access">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l3 7h7l-5.7 4.1 2.3 7-6.6-4.8-6.6 4.8 2.3-7L2 9h7z"/>
            </svg>
            Get Early Access
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="hero container">
        <h1>Connection Without Compromise</h1>
        <p>Predatory predecessors sold your information as "leads." TradeScout is a network where homeowners and contractors connect directly — no middlemen, no games.</p>
        <div className="cta-wrap">
          <a className="cta" href="#signup" aria-label="Get early access">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l3 7h7l-5.7 4.1 2.3 7-6.6-4.8-6.6 4.8 2.3-7L2 9h7z"/>
            </svg>
            Get Early Access
          </a>
        </div>
      </section>

      {/* Why TradeScout */}
      <section className="container" id="why" aria-labelledby="whytitle" style={{marginTop:"32px"}}>
        <h2 id="whytitle" className="section-title">Why TradeScout?</h2>
        <div className="feature-grid">
          <article className="card" data-testid="card-homeowner-tools">
            <div className="card-media">
              <img src={homeownerToolsPath} alt="Homeowner Tools Interface" style={{width: '100%', height: '100%', objectFit: 'cover'}} data-testid="img-homeowner-tools" />
            </div>
            <div className="card-body">
              <h3>Homeowner Tools</h3>
              <p>Plan projects, request bids, and hire with confidence.</p>
            </div>
          </article>

          <article className="card">
            <div className="card-media">
              <img src={acceleratedGrowthPath} alt="Accelerated Growth Interface" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="card-body">
              <h3>Accelerated Growth</h3>
              <p>Get in front of real homeowners—no paywall, no junk leads.</p>
            </div>
          </article>

          <article className="card">
            <div className="card-media">
              <img src={findHelpersPath} alt="Find Helpers Interface" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="card-body">
              <h3>Find Helpers &amp; Employees</h3>
              <p>Post roles, meet reliable helpers, and build your crew faster.</p>
            </div>
          </article>

          <article className="card">
            <div className="card-media">
              <img src={directConnectPath} alt="Direct Connect Interface" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="card-body">
              <h3>Direct Connect</h3>
              <p>Homeowners and contractors, connected directly—no middlemen.</p>
            </div>
          </article>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews container" aria-labelledby="reviewstitle">
        <h2 id="reviewstitle">What People Are Saying</h2>
        <div className="reviews-grid">
          <blockquote className="review" aria-label="Review from Real Homeowner From The Future">
            <p className="quote">"TradeScout made it simple to post my project and hire fast. Zero spam — just real pros."</p>
            <p className="author">— Real Homeowner From The Future</p>
          </blockquote>

          <blockquote className="review" aria-label="Review from Real Contractor From The Future">
            <p className="quote">"I connected with real homeowners directly and booked work without buying leads. Finally."</p>
            <p className="author">— Real Contractor From The Future</p>
          </blockquote>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works container" style={{padding: "80px 0"}}>
        <h2 style={{textAlign: "center", marginBottom: "48px", fontSize: "32px", color: "var(--text)"}}>How TradeScout Works</h2>
        
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", maxWidth: "1000px", margin: "0 auto"}}>
          <div style={{padding: "32px", background: "var(--panel-2)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center"}}>
            <div style={{width: "60px", height: "60px", background: "var(--brand)", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px"}}>1</div>
            <h3 style={{marginBottom: "16px", fontSize: "20px"}}>Connect Directly</h3>
            <p style={{color: "var(--muted)", margin: 0, fontSize: "16px", lineHeight: 1.5}}>
              Homeowners and contractors find each other without middlemen taking a cut or selling your information.
            </p>
          </div>
          
          <div style={{padding: "32px", background: "var(--panel-2)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center"}}>
            <div style={{width: "60px", height: "60px", background: "var(--brand)", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px"}}>2</div>
            <h3 style={{marginBottom: "16px", fontSize: "20px"}}>Build Trust</h3>
            <p style={{color: "var(--muted)", margin: 0, fontSize: "16px", lineHeight: 1.5}}>
              Real reviews and recommendations from actual customers help everyone make better decisions.
            </p>
          </div>
          
          <div style={{padding: "32px", background: "var(--panel-2)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center"}}>
            <div style={{width: "60px", height: "60px", background: "var(--brand)", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px"}}>3</div>
            <h3 style={{marginBottom: "16px", fontSize: "20px"}}>Keep More Money</h3>
            <p style={{color: "var(--muted)", margin: 0, fontSize: "16px", lineHeight: 1.5}}>
              No lead fees, no commission, no hidden costs. What you earn is what you keep.
            </p>
          </div>
        </div>
      </section>

      {/* Network banner */}
      <div className="ribbon">
        Join 500,000+ people already connected on TradeScout.
      </div>

      {/* Email signup */}
      <section id="signup" className="email container" aria-labelledby="get-started">
        {/* Mirrored CTA above the form */}
        <div className="cta-top" style={{textAlign:"center",marginBottom:"24px"}}>
          <a className="cta" href="#signup" aria-label="Get early access" data-testid="cta-signup">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l3 7h7l-5.7 4.1 2.3 7-6.6-4.8-6.6 4.8 2.3-7L2 9h7z"/>
            </svg>
            Get Early Access
          </a>
        </div>

        <h2 id="get-started" className="section-title" style={{textAlign:"center"}}>Get Early Access</h2>
        <p className="lead">Drop your email and we'll notify you the moment we go live.</p>

        {/* Dynamic message (changes when roles are toggled) */}
        <div id="form-message" className="audience-msg" aria-live="polite">
          <span className="kicker">Get Matched the Right Way.</span>
          <p className="sub">Whether you're a contractor or a homeowner, TradeScout makes direct connection simple.</p>
        </div>

        <form className="form" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData);
          console.log('Form submitted:', data);
          
          // Show success message
          const button = e.currentTarget.querySelector('button[type="submit"]');
          if (button) {
            const originalText = button.textContent;
            button.textContent = "🎉 You're In! Check Your Email";
            button.disabled = true;
            button.style.background = "linear-gradient(135deg, #10b981, #059669)";
            
            setTimeout(() => {
              button.textContent = originalText;
              button.disabled = false;
              button.style.background = "";
              e.currentTarget.reset();
            }, 3000);
          }
        }} data-analytics="signup-form">
          {/* Email (required) */}
          <label className="sr-only" htmlFor="email">Email (required)</label>
          <input 
            className="field" 
            id="email" 
            type="email" 
            name="email" 
            placeholder="Your Email (required)" 
            required 
            autoComplete="email"
            aria-describedby="email-help"
            data-testid="input-email"
          />

          {/* Name (optional) */}
          <label className="sr-only" htmlFor="name">Your name (optional)</label>
          <input 
            className="field" 
            id="name" 
            type="text" 
            name="name" 
            placeholder="Your Name (optional)" 
            autoComplete="name"
            data-testid="input-name"
          />

          {/* State (optional) */}
          <label className="sr-only" htmlFor="state">Your state (optional)</label>
          <select 
            className="field" 
            id="state" 
            name="state"
            autoComplete="address-level1"
            aria-describedby="state-help"
            data-testid="select-state"
          >
            <option value="">Your State (optional)</option>
            <option>AL</option><option>AK</option><option>AZ</option><option>AR</option>
            <option>CA</option><option>CO</option><option>CT</option><option>DE</option>
            <option>FL</option><option>GA</option><option>HI</option><option>ID</option>
            <option>IL</option><option>IN</option><option>IA</option><option>KS</option>
            <option>KY</option><option>LA</option><option>ME</option><option>MD</option>
            <option>MA</option><option>MI</option><option>MN</option><option>MS</option>
            <option>MO</option><option>MT</option><option>NE</option><option>NV</option>
            <option>NH</option><option>NJ</option><option>NM</option><option>NY</option>
            <option>NC</option><option>ND</option><option>OH</option><option>OK</option>
            <option>OR</option><option>PA</option><option>RI</option><option>SC</option>
            <option>SD</option><option>TN</option><option>TX</option><option>UT</option>
            <option>VT</option><option>VA</option><option>WA</option><option>WV</option>
            <option>WI</option><option>WY</option>
          </select>

          {/* Roles (multi-select) */}
          <fieldset className="checkgroup full" aria-labelledby="roles-legend">
            <legend id="roles-legend">I am a… (select all that apply)</legend>

            <label data-testid="checkbox-homeowner">
              <input type="checkbox" name="roles[]" value="Homeowner" data-testid="input-homeowner" />
              Homeowner
            </label>

            <label data-testid="checkbox-contractor">
              <input type="checkbox" name="roles[]" value="Contractor" data-testid="input-contractor" />
              Contractor
            </label>

            <label data-testid="checkbox-service-provider">
              <input type="checkbox" name="roles[]" value="Service Provider" data-testid="input-service-provider" />
              Service Provider
            </label>
          </fieldset>

          {/* Optional message */}
          <label className="sr-only" htmlFor="message">Your message (optional)</label>
          <textarea 
            className="field full" 
            id="message" 
            name="message" 
            placeholder="Tell us how lead companies screwed you over. We're tired of it too. (optional)" 
            rows={3}
            autoComplete="off"
            aria-describedby="message-help"
            data-testid="textarea-message"
          ></textarea>

          {/* Submit */}
          <button 
            className="btn" 
            type="submit" 
            aria-label="Get notified when TradeScout launches"
            aria-describedby="submit-help"
            data-testid="button-submit"
          >
            Notify Me
          </button>
          <input type="hidden" name="_redirect" value="thank-you" />

          {/* Honeypot to reduce spam */}
          <input 
            type="text" 
            name="website" 
            tabIndex={-1} 
            style={{display:"none"}} 
            aria-hidden="true"
            autoComplete="off"
          />
        </form>
        
        {/* Hidden help text for screen readers */}
        <div id="email-help" className="sr-only">
          We'll only use your email to notify you when TradeScout launches. No spam.
        </div>
        <div id="state-help" className="sr-only">
          Your state helps us prioritize regional rollout.
        </div>
        <div id="submit-help" className="sr-only">
          Join our early access list to be among the first to experience direct contractor connections.
        </div>
        <div id="message-help" className="sr-only">
          Share your frustrations with lead companies and middlemen that take advantage of contractors and homeowners.
        </div>
      </section>

      <footer role="contentinfo">
        <div className="container">
          © 2025 TradeScout. All rights reserved. Connecting homeowners and contractors directly since 2025.
        </div>
      </footer>
    </>
  );
}
