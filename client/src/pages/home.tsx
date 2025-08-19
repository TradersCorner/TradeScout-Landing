import { useEffect } from "react";
import logoPath from "@assets/logo_1755576317372.png";
import acceleratedGrowthPath from "@assets/accelerated-growth_1755576317371.jpg";
import findHelpersPath from "@assets/find-helpers-employees_1755576317371.jpg";
import directConnectPath from "@assets/direct-connect_1755576317371.jpg";
import homeownerToolsPath from "@assets/homeowner-tools_1755576317371.jpg";

export default function Home() {
  useEffect(() => {
    document.title = "TradeScout — Connection Without Compromise";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "TradeScout connects homeowners and verified contractors directly—no gatekeepers, no spam. Get early access.");
    }

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
        msgBox.innerHTML = `<span class="kicker">${kicker}</span><p class="sub">${sub}</p>`;
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
        <p>Predatory predecessors sold your information as "leads." TradeScout builds a network where homeowners and contractors connect directly — no middlemen, no games.</p>
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
          <article className="card">
            <div className="card-media">
              <img src={homeownerToolsPath} alt="Homeowner Tools Interface" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
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
        Join 500,000+ people already connected through the TradeScout network.
      </div>

      {/* Email signup */}
      <section id="signup" className="email container" aria-labelledby="get-started">
        {/* Mirrored CTA above the form */}
        <div className="cta-top">
          <a className="cta" href="#signup" aria-label="Get early access">
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
          // Handle form submission here
          const formData = new FormData(e.currentTarget);
          console.log('Form submitted:', Object.fromEntries(formData));
        }} data-analytics="signup-form">
          {/* Email (required) */}
          <label className="sr-only" htmlFor="email">Email (required)</label>
          <input className="field" id="email" type="email" name="email" placeholder="Your Email (required)" required />

          {/* Name (optional) */}
          <label className="sr-only" htmlFor="name">Your name (optional)</label>
          <input className="field" id="name" type="text" name="name" placeholder="Your Name (optional)" />

          {/* State (optional) */}
          <label className="sr-only" htmlFor="state">Your state (optional)</label>
          <select className="field" id="state" name="state">
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

            <label>
              <input type="checkbox" name="roles[]" value="Homeowner" />
              Homeowner
            </label>

            <label>
              <input type="checkbox" name="roles[]" value="Contractor" />
              Contractor
            </label>

            <label>
              <input type="checkbox" name="roles[]" value="Service Provider" />
              Service Provider
            </label>
          </fieldset>

          {/* Submit */}
          <button className="btn" type="submit" aria-label="Notify me when TradeScout launches">Notify Me</button>
          <input type="hidden" name="_redirect" value="thank-you" />

          {/* Honeypot to reduce spam */}
          <input type="text" name="website" tabIndex={-1} style={{display:"none"}} />
        </form>
      </section>

      <footer>© 2025 TradeScout. All rights reserved.</footer>
    </>
  );
}
