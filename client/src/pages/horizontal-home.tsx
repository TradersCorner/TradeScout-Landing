import { useState, useEffect } from "react";
import { Hammer, Wrench, HardHat, Home as HomeIcon, Drill } from "lucide-react";

export default function HorizontalHome() {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  
  const constructionLogos = [
    <Hammer key="hammer" size={28} />,
    <Wrench key="wrench" size={28} />,
    <HardHat key="hardhat" size={28} />,
    <HomeIcon key="home" size={28} />,
    <Drill key="drill" size={28} />
  ];

  useEffect(() => {
    const logoInterval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % constructionLogos.length);
    }, 3000);

    return () => clearInterval(logoInterval);
  }, [constructionLogos.length]);

  return (
    <>
      {/* Header */}
      <header>
        <div className="container">
          <nav className="nav">
            <div className="brand">
              <div style={{position: "relative", width: "32px", height: "32px"}}>
                {constructionLogos[currentLogoIndex]}
              </div>
              TradeScout
            </div>
            <a href="#early-access" className="cta">Get Early Access</a>
          </nav>
        </div>
      </header>

      <div className="horizontal-wrapper">
        {/* Section 1: Hero */}
        <section className="horizontal-section" style={{background: "var(--background)"}}>
          <div className="container">
            <div className="hero">
              <h1 style={{
                margin: "0 0 20px",
                fontSize: "clamp(32px, 8vw, 60px)",
                lineHeight: 1.1,
                fontWeight: 900,
                textAlign: "center"
              }}>
                Real Contractors.<br/>
                Real Homeowners.<br/>
                Real Results.
              </h1>
              <p style={{
                margin: "0 auto 32px",
                maxWidth: "600px",
                color: "var(--muted)",
                fontSize: "18px",
                textAlign: "center",
                lineHeight: 1.5
              }}>
                The direct connection platform where quality work meets fair prices. 
                No middleman. No games. Just people doing great work together.
              </p>
              <div style={{textAlign: "center"}}>
                <a href="#early-access" className="cta" style={{fontSize: "18px", padding: "16px 32px"}}>
                  Join the Network →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Value Props */}
        <section className="horizontal-section" style={{background: "var(--panel)"}}>
          <div className="container">
            <h2 style={{
              textAlign: "center",
              fontSize: "36px",
              fontWeight: 900,
              marginBottom: "48px",
              color: "var(--text)"
            }}>
              Why TradeScout Works
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "40px",
              maxWidth: "900px",
              margin: "0 auto"
            }}>
              <div style={{textAlign: "center"}}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  background: "var(--brand)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px"
                }}>
                  <Hammer size={28} color="white" />
                </div>
                <h3 style={{fontSize: "20px", marginBottom: "12px", color: "var(--text)"}}>
                  Quality First
                </h3>
                <p style={{color: "var(--muted)", lineHeight: 1.5, margin: 0}}>
                  Work with contractors who take pride in their craft and deliver results that last.
                </p>
              </div>

              <div style={{textAlign: "center"}}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  background: "var(--brand)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px"
                }}>
                  <HomeIcon size={28} color="white" />
                </div>
                <h3 style={{fontSize: "20px", marginBottom: "12px", color: "var(--text)"}}>
                  Direct Connection
                </h3>
                <p style={{color: "var(--muted)", lineHeight: 1.5, margin: 0}}>
                  Connect directly with homeowners and contractors. No middleman, no inflated prices.
                </p>
              </div>

              <div style={{textAlign: "center"}}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  background: "var(--brand)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px"
                }}>
                  <Wrench size={28} color="white" />
                </div>
                <h3 style={{fontSize: "20px", marginBottom: "12px", color: "var(--text)"}}>
                  Fair Pricing
                </h3>
                <p style={{color: "var(--muted)", lineHeight: 1.5, margin: 0}}>
                  Transparent pricing tools help everyone get fair deals on quality work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Features */}
        <section className="horizontal-section" style={{background: "var(--background)"}}>
          <div className="container">
            <h2 style={{
              textAlign: "center",
              fontSize: "36px",
              fontWeight: 900,
              marginBottom: "48px",
              color: "var(--text)"
            }}>
              Everything You Need
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "32px",
              maxWidth: "800px",
              margin: "0 auto"
            }}>
              <div style={{
                background: "var(--panel-2)",
                borderRadius: "16px",
                padding: "32px",
                border: "1px solid rgba(255,255,255,0.05)"
              }}>
                <h3 style={{fontSize: "20px", marginBottom: "12px", color: "var(--text)"}}>
                  Calculator
                </h3>
                <p style={{color: "var(--muted)", lineHeight: 1.5, margin: 0, fontSize: "15px"}}>
                  Know what things actually cost in your area. Fair pricing for everyone.
                </p>
              </div>

              <div style={{
                background: "var(--panel-2)",
                borderRadius: "16px",
                padding: "32px",
                border: "1px solid rgba(255,255,255,0.05)"
              }}>
                <h3 style={{fontSize: "20px", marginBottom: "12px", color: "var(--text)"}}>
                  Helpers
                </h3>
                <p style={{color: "var(--muted)", lineHeight: 1.5, margin: 0, fontSize: "15px"}}>
                  Need an extra pair of hands? Find people eager to learn and work.
                </p>
              </div>

              <div style={{
                background: "var(--panel-2)",
                borderRadius: "16px",
                padding: "32px",
                border: "1px solid rgba(255,255,255,0.05)"
              }}>
                <h3 style={{fontSize: "20px", marginBottom: "12px", color: "var(--text)"}}>
                  Community
                </h3>
                <p style={{color: "var(--muted)", lineHeight: 1.5, margin: 0, fontSize: "15px"}}>
                  Share what you know. Learn from others. Solve problems together.
                </p>
              </div>

              <div style={{
                background: "var(--panel-2)",
                borderRadius: "16px",
                padding: "32px",
                border: "1px solid rgba(255,255,255,0.05)"
              }}>
                <h3 style={{fontSize: "20px", marginBottom: "12px", color: "var(--text)"}}>
                  Exchange
                </h3>
                <p style={{color: "var(--muted)", lineHeight: 1.5, margin: 0, fontSize: "15px"}}>
                  Buy, sell, trade what you need. Tools, equipment, services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Signup */}
        <section className="horizontal-section" id="early-access" style={{background: "var(--panel)"}}>
          <div className="container">
            <div className="email">
              <div style={{textAlign: "center", marginBottom: "40px"}}>
                <h2 style={{
                  fontSize: "32px",
                  fontWeight: 900,
                  marginBottom: "16px",
                  color: "var(--text)"
                }}>
                  Get Early Access
                </h2>
                <p className="lead" style={{
                  color: "var(--muted)",
                  fontSize: "16px",
                  maxWidth: "600px",
                  margin: "0 auto",
                  lineHeight: 1.6
                }}>
                  Join TradeScout early and help build the future of home improvement. 
                  Connect directly with quality contractors and homeowners in your area.
                </p>
              </div>

              <form className="form" style={{maxWidth: "600px", margin: "0 auto"}}>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="field"
                  required
                  data-testid="input-email"
                />
                
                <select name="state" className="field" required data-testid="select-state">
                  <option value="">Select State</option>
                  <option value="AL">Alabama</option>
                  <option value="CA">California</option>
                  <option value="FL">Florida</option>
                  <option value="TX">Texas</option>
                  <option value="NY">New York</option>
                </select>

                <div className="checkgroup">
                  <label>
                    <input type="checkbox" name="roles[]" value="Homeowner" />
                    <span>Homeowner</span>
                  </label>
                  <label>
                    <input type="checkbox" name="roles[]" value="Contractor" />
                    <span>Contractor</span>
                  </label>
                  <label>
                    <input type="checkbox" name="roles[]" value="Helper" />
                    <span>Helper</span>
                  </label>
                </div>

                <button type="submit" className="btn" data-testid="button-submit">
                  Join TradeScout
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <footer style={{
        position: "fixed",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "12px",
        color: "var(--muted)",
        background: "rgba(14,14,15,0.8)",
        padding: "8px 16px",
        borderRadius: "20px",
        backdropFilter: "blur(10px)"
      }}>
        © 2025 TradeScout - Scroll right to explore →
      </footer>
    </>
  );
}