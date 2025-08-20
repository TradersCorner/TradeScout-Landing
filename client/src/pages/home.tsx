import { useEffect, useState } from "react";
import { Hammer, Wrench, HardHat, Home as HomeIcon, Drill } from "lucide-react";
import acceleratedGrowthPath from "@assets/accelerated-growth_1755576317371.jpg";
import findHelpersPath from "@assets/find-helpers-employees_1755576317371.jpg";
import directConnectPath from "@assets/direct-connect_1755576317371.jpg";
import homeownerToolsPath from "@assets/homeowner-tools_1755576317371.jpg";

export default function Home() {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  const constructionLogos = [
    <Hammer key="hammer" size={28} />,
    <Wrench key="wrench" size={28} />,
    <HardHat key="hardhat" size={28} />,
    <HomeIcon key="home" size={28} />,
    <Drill key="drill" size={28} />
  ];

  useEffect(() => {
    // Rotate logo every 3 seconds
    const logoInterval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % constructionLogos.length);
    }, 3000);

    return () => clearInterval(logoInterval);
  }, [constructionLogos.length]);

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
          // Clear existing content
          msgBox.textContent = '';
          
          // Create and append kicker span
          const kickerSpan = document.createElement('span');
          kickerSpan.className = 'kicker';
          kickerSpan.textContent = kicker;
          msgBox.appendChild(kickerSpan);
          
          // Create and append sub paragraph
          const subP = document.createElement('p');
          subP.className = 'sub';
          subP.textContent = sub;
          msgBox.appendChild(subP);
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
        <div className="container" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 0"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }}>
            <div className="brand-icon" style={{
              color: "var(--brand)", 
              transition: "all 0.3s ease",
              fontSize: "32px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {constructionLogos[currentLogoIndex]}
            </div>
            <span style={{
              fontSize: "24px",
              fontWeight: 900,
              letterSpacing: "0.2px",
              color: "var(--text)"
            }}>
              TradeScout
            </span>
          </div>
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
        <h2 id="whytitle" className="section-title">How It Works</h2>
        <div className="feature-grid">
          <article className="card" data-testid="card-homeowner-tools">
            <div className="card-media">
              <img src={homeownerToolsPath} alt="Homeowner Tools Interface" style={{width: '100%', height: '100%', objectFit: 'cover'}} data-testid="img-homeowner-tools" />
            </div>
            <div className="card-body">
              <h3>Homeowner Tools</h3>
              <p>Post your project. Review profiles. Choose who works on your home.</p>
            </div>
          </article>

          <article className="card">
            <div className="card-media">
              <img src={acceleratedGrowthPath} alt="Accelerated Growth Interface" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="card-body">
              <h3>Contractor Growth</h3>
              <p>Build your reputation. Show your work. Grow your business.</p>
            </div>
          </article>

          <article className="card">
            <div className="card-media">
              <img src={findHelpersPath} alt="Find Helpers Interface" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="card-body">
              <h3>Find Help</h3>
              <p>Need extra hands? Connect with people ready to work and learn.</p>
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
        Join 500,000+ people already connected through the TradeScout network.
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

        <h2 id="get-started" className="section-title" style={{textAlign:"center"}}>Join the Network</h2>
        <p className="lead">Be among the first when we launch.</p>



        <form className="form" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData);
          console.log('Form submitted:', data);
          
          // Show success message
          const button = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
          if (button) {
            const originalText = button.textContent;
            button.textContent = "Thanks! You'll hear from us when we go live.";
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
          <div style={{marginBottom: "20px"}}>
            <label style={{
              display: "block",
              marginBottom: "12px",
              fontSize: "14px",
              color: "var(--muted)",
              fontWeight: 500
            }}>
              I am a… (select all that apply)
            </label>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "12px"
            }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                background: "var(--panel-2)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "14px",
                color: "var(--text)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--panel)";
                e.currentTarget.style.borderColor = "var(--brand)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--panel-2)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
              data-testid="checkbox-homeowner">
                <input 
                  type="checkbox" 
                  name="roles[]" 
                  value="Homeowner" 
                  data-testid="input-homeowner"
                  style={{
                    accentColor: "var(--brand)",
                    margin: 0
                  }}
                />
                <span>Homeowner</span>
              </label>

              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                background: "var(--panel-2)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "14px",
                color: "var(--text)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--panel)";
                e.currentTarget.style.borderColor = "var(--brand)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--panel-2)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
              data-testid="checkbox-contractor">
                <input 
                  type="checkbox" 
                  name="roles[]" 
                  value="Contractor" 
                  data-testid="input-contractor"
                  style={{
                    accentColor: "var(--brand)",
                    margin: 0
                  }}
                />
                <span>Contractor</span>
              </label>

              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                background: "var(--panel-2)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "14px",
                color: "var(--text)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--panel)";
                e.currentTarget.style.borderColor = "var(--brand)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--panel-2)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
              data-testid="checkbox-service-provider">
                <input 
                  type="checkbox" 
                  name="roles[]" 
                  value="Service Provider" 
                  data-testid="input-service-provider"
                  style={{
                    accentColor: "var(--brand)",
                    margin: 0
                  }}
                />
                <span>Service Provider</span>
              </label>
            </div>
          </div>

          {/* Optional message */}
          <label className="sr-only" htmlFor="message">Your message (optional)</label>
          <textarea 
            className="field full" 
            id="message" 
            name="message" 
            placeholder="Share your thoughts or project needs (optional)" 
            rows={3}
            autoComplete="off"
            aria-describedby="message-help"
            data-testid="textarea-message"
          ></textarea>

          <div style={{
            textAlign: "center",
            margin: "20px 0",
            padding: "16px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.08)"
          }}>
            <p style={{
              color: "var(--muted)",
              fontSize: "14px",
              lineHeight: 1.5,
              margin: 0
            }}>
              <strong style={{color: "var(--text)"}}>We're not selling anything</strong> — including your information. 
              Zero spam, zero sharing with third parties.
            </p>
          </div>

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
          We'll notify you when TradeScout launches.
        </div>
        <div id="state-help" className="sr-only">
          Your state helps us prioritize where to launch first.
        </div>
        <div id="submit-help" className="sr-only">
          Get early access to the network.
        </div>
        <div id="message-help" className="sr-only">
          Tell us about your projects or experience.
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
              No lead fees. No middleman markup. Just fair pricing.
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
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
            marginBottom: "40px"
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
                Real costs in your neighborhood. No guessing, no surprises.
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
                Need an extra pair of hands? Find people eager to learn and work.
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
                Share what you know. Learn from others. Solve problems together.
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
                Buy, sell, trade what you need. Tools, equipment, services.
              </p>
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,107,53,0.05))",
            borderRadius: "20px",
            padding: "48px 40px",
            border: "2px solid rgba(255,107,53,0.3)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: "-50%",
              right: "-20%",
              width: "200px",
              height: "200px",
              background: "radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)",
              borderRadius: "50%"
            }} />
            <div style={{
              position: "absolute",
              bottom: "-30%",
              left: "-10%",
              width: "150px",
              height: "150px",
              background: "radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)",
              borderRadius: "50%"
            }} />
            
            <div style={{position: "relative", zIndex: 2}}>
              <div style={{
                width: "60px",
                height: "60px",
                background: "var(--brand)",
                borderRadius: "50%",
                margin: "0 auto 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{color: "white"}}>
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" fill="currentColor"/>
                </svg>
              </div>
              
              <h3 style={{
                color: "var(--brand)",
                fontSize: "28px",
                marginBottom: "20px",
                fontWeight: 800,
                letterSpacing: "-0.5px"
              }}>
                Building the Future of Work
              </h3>
              
              <p style={{
                color: "var(--text)",
                fontSize: "18px",
                lineHeight: 1.7,
                maxWidth: "650px",
                margin: "0 auto 28px",
                fontWeight: 500
              }}>
                Every connection on TradeScout helps fund trade education and workforce development programs that create pathways to meaningful careers.
              </p>
              
              <a 
                href="https://www.mikeroweworks.org" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "rgba(255,255,255,0.08)",
                  padding: "16px 28px",
                  borderRadius: "40px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{color: "var(--brand)"}}>
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                <span style={{
                  color: "var(--text)",
                  fontSize: "16px",
                  fontWeight: 600
                }}>
                  Proudly supporting Mike Rowe WORKS Foundation & skilled trade initiatives
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>



      <footer role="contentinfo">
        <div className="container">
          © 2025 TradeScout. All rights reserved. A professional network connecting homeowners and contractors directly nationwide.
        </div>
      </footer>
    </>
  );
}
