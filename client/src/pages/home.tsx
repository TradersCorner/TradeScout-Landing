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
        <h1>Find Local Contractors Near Me - Direct Connection, Zero Lead Fees</h1>
        <p>Skip Angi, HomeAdvisor, and Thumbtack fees. TradeScout connects homeowners and contractors directly for home improvement, remodeling, and repair projects — no middlemen, no markups, no games.</p>
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
        <h2 id="whytitle" className="section-title">Why Choose TradeScout Over Angi & HomeAdvisor?</h2>
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
          const button = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
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

      {/* Value Proposition */}
      <section style={{
        padding: "80px 0", 
        background: "var(--panel)",
      }}>
        <div className="container" style={{maxWidth: "1200px", margin: "0 auto"}}>
          <div style={{textAlign: "center", marginBottom: "60px"}}>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              marginBottom: "20px",
              color: "var(--text)",
              fontWeight: 700
            }}>
              Zero Fees, Real Connections
            </h2>
            <p style={{
              fontSize: "18px",
              color: "var(--muted)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6
            }}>
              Contractors keep 100% of earnings while homeowners get direct access to trusted professionals.
            </p>
          </div>

          <div className="value-stats" style={{
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
            gap: "32px",
            maxWidth: "800px",
            margin: "0 auto 60px"
          }}>
            <div style={{
              textAlign: "center",
              background: "var(--panel-2)",
              borderRadius: "16px",
              padding: "32px 24px",
              border: "1px solid rgba(255,255,255,0.05)"
            }}>
              <div style={{fontSize: "40px", fontWeight: 900, color: "var(--brand)", marginBottom: "8px"}}>$0</div>
              <div style={{color: "var(--text)", fontSize: "16px"}}>Lead Fees</div>
            </div>
            
            <div style={{
              textAlign: "center",
              background: "var(--panel-2)",
              borderRadius: "16px",
              padding: "32px 24px",
              border: "1px solid rgba(255,255,255,0.05)"
            }}>
              <div style={{fontSize: "40px", fontWeight: 900, color: "var(--brand)", marginBottom: "8px"}}>1:1</div>
              <div style={{color: "var(--text)", fontSize: "16px"}}>Direct</div>
            </div>
            
            <div style={{
              textAlign: "center",
              background: "var(--panel-2)",
              borderRadius: "16px",
              padding: "32px 24px",
              border: "1px solid rgba(255,255,255,0.05)"
            }}>
              <div style={{fontSize: "40px", fontWeight: 900, color: "var(--brand)", marginBottom: "8px"}}>100%</div>
              <div style={{color: "var(--text)", fontSize: "16px"}}>Yours</div>
            </div>
            

          </div>

          <div className="feature-cards" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            marginBottom: "60px"
          }}>
            <div style={{
              background: "var(--panel-2)",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid rgba(255,255,255,0.05)",
              textAlign: "center"
            }}>
              <div style={{marginBottom: "16px"}}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{margin: "0 auto", display: "block"}}>
                  <rect x="2" y="3" width="20" height="14" rx="2" stroke="var(--brand)" strokeWidth="1.5" fill="none"/>
                  <rect x="6" y="7" width="4" height="2" fill="var(--brand)"/>
                  <rect x="6" y="11" width="6" height="2" fill="var(--brand)"/>
                  <rect x="14" y="7" width="4" height="2" fill="var(--brand)"/>
                  <rect x="14" y="11" width="4" height="2" fill="var(--brand)"/>
                </svg>
              </div>
              <h3 style={{fontSize: "20px", marginBottom: "12px", color: "var(--text)"}}>Calculator</h3>
              <p style={{color: "var(--muted)", lineHeight: 1.5, margin: 0, fontSize: "15px"}}>
                Hyper-local pricing data helping contractors bid accurately and homeowners understand fair costs.
              </p>
            </div>

            <div style={{
              background: "var(--panel-2)",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid rgba(255,255,255,0.05)",
              textAlign: "center"
            }}>
              <div style={{marginBottom: "16px"}}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{margin: "0 auto", display: "block"}}>
                  <circle cx="9" cy="7" r="3" stroke="var(--brand)" strokeWidth="1.5"/>
                  <path d="M2 21v-4a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v4" stroke="var(--brand)" strokeWidth="1.5"/>
                  <circle cx="19" cy="7" r="2" stroke="var(--brand)" strokeWidth="1.5"/>
                  <path d="M22 21v-3a3 3 0 0 0-3-3" stroke="var(--brand)" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3 style={{fontSize: "20px", marginBottom: "12px", color: "var(--text)"}}>Helpers</h3>
              <p style={{color: "var(--muted)", lineHeight: 1.5, margin: 0, fontSize: "15px"}}>
                Match contractors needing extra hands with homeowners wanting to learn trades skills.
              </p>
            </div>

            <div style={{
              background: "var(--panel-2)",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid rgba(255,255,255,0.05)",
              textAlign: "center"
            }}>
              <div style={{marginBottom: "16px"}}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{margin: "0 auto", display: "block"}}>
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="var(--brand)" strokeWidth="1.5"/>
                  <circle cx="8" cy="12" r="1" fill="var(--brand)"/>
                  <circle cx="12" cy="12" r="1" fill="var(--brand)"/>
                  <circle cx="16" cy="12" r="1" fill="var(--brand)"/>
                </svg>
              </div>
              <h3 style={{fontSize: "20px", marginBottom: "12px", color: "var(--text)"}}>Community</h3>
              <p style={{color: "var(--muted)", lineHeight: 1.5, margin: 0, fontSize: "15px"}}>
                Knowledge sharing between contractors and homeowners, solving problems together.
              </p>
            </div>

            <div style={{
              background: "var(--panel-2)",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid rgba(255,255,255,0.05)",
              textAlign: "center"
            }}>
              <div style={{marginBottom: "16px"}}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{margin: "0 auto", display: "block"}}>
                  <circle cx="18" cy="5" r="3" stroke="var(--brand)" strokeWidth="1.5"/>
                  <circle cx="6" cy="12" r="3" stroke="var(--brand)" strokeWidth="1.5"/>
                  <circle cx="18" cy="19" r="3" stroke="var(--brand)" strokeWidth="1.5"/>
                  <path d="M8.59 13.51L15.42 17.49" stroke="var(--brand)" strokeWidth="1.5"/>
                  <path d="M15.41 6.51L8.59 10.49" stroke="var(--brand)" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3 style={{fontSize: "20px", marginBottom: "12px", color: "var(--text)"}}>Exchange</h3>
              <p style={{color: "var(--muted)", lineHeight: 1.5, margin: 0, fontSize: "15px"}}>
                Marketplace where contractors and homeowners trade tools, equipment, and services.
              </p>
            </div>
          </div>

          <div style={{
            background: "rgba(255,107,53,0.1)",
            borderRadius: "16px",
            padding: "40px",
            border: "1px solid rgba(255,107,53,0.2)",
            textAlign: "center"
          }}>
            <h3 style={{
              color: "var(--brand)",
              fontSize: "24px",
              marginBottom: "16px",
              fontWeight: 700
            }}>
              Values-Driven Network
            </h3>
            <p style={{
              color: "var(--muted)",
              fontSize: "16px",
              lineHeight: 1.6,
              maxWidth: "700px",
              margin: "0 auto 24px"
            }}>
              Every connection contributes to supporting skilled trades education, community projects, 
              and worthy causes across America.
            </p>
            <p style={{
              color: "var(--text)",
              fontSize: "14px",
              opacity: 0.8
            }}>
              Supporting foundations including Mike Rowe WORKS and local community initiatives
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section style={{
        padding: "60px 0",
        background: "var(--background)",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div className="container" style={{maxWidth: "1200px", margin: "0 auto"}}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            marginBottom: "40px"
          }}>
            <div>
              <h3 style={{
                color: "var(--text)",
                fontSize: "20px",
                marginBottom: "16px",
                fontWeight: 700
              }}>
                Find Local Contractors Near You
              </h3>
              <p style={{color: "var(--muted)", lineHeight: 1.6, fontSize: "15px"}}>
                Connect directly with verified contractors in your area for home improvement, remodeling, repairs, and construction projects. Skip the middleman fees and build real relationships with skilled professionals who care about quality work.
              </p>
            </div>
            
            <div>
              <h3 style={{
                color: "var(--text)",
                fontSize: "20px",
                marginBottom: "16px",
                fontWeight: 700
              }}>
                Home Improvement Services
              </h3>
              <p style={{color: "var(--muted)", lineHeight: 1.6, fontSize: "15px"}}>
                Kitchen remodeling, bathroom renovation, roofing, plumbing, electrical, HVAC, flooring, painting, landscaping, decking, fencing, siding, windows, doors, and all your home repair needs.
              </p>
            </div>
            
            <div>
              <h3 style={{
                color: "var(--text)",
                fontSize: "20px",
                marginBottom: "16px",
                fontWeight: 700
              }}>
                Better Than Angi, HomeAdvisor & Thumbtack
              </h3>
              <p style={{color: "var(--muted)", lineHeight: 1.6, fontSize: "15px"}}>
                No lead fees, no middleman markups, no spam calls. TradeScout connects you directly with contractors who keep 100% of their earnings while homeowners get fair, transparent pricing.
              </p>
            </div>
          </div>
          
          <div style={{
            textAlign: "center",
            padding: "40px 0",
            borderTop: "1px solid rgba(255,255,255,0.05)"
          }}>
            <h2 style={{
              color: "var(--text)",
              fontSize: "28px",
              marginBottom: "16px",
              fontWeight: 700
            }}>
              Serving Homeowners & Contractors Nationwide
            </h2>
            <p style={{
              color: "var(--muted)",
              fontSize: "16px",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6
            }}>
              Whether you're a homeowner looking for reliable contractors or a contractor seeking direct client connections, TradeScout eliminates the middleman to create authentic professional relationships across all 50 states.
            </p>
          </div>
        </div>
      </section>

      <footer role="contentinfo">
        <div className="container">
          © 2025 TradeScout. All rights reserved. Direct contractor-homeowner connections nationwide. Alternative to Angi, HomeAdvisor, Thumbtack.
        </div>
      </footer>
    </>
  );
}
