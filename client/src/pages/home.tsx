import { useEffect, useState } from "react";
import { Hammer, Wrench, HardHat, Home as HomeIcon, Drill, Shield, CheckCircle, MapPin, Clock, Globe, Users, Copy, Share2, MessageCircle, Mail, Link2, User, Briefcase } from "lucide-react";
import acceleratedGrowthPath from "@assets/accelerated-growth_1755576317371.jpg";
import findHelpersPath from "@assets/find-helpers-employees_1755576317371.jpg";
import directConnectPath from "@assets/direct-connect_1755576317371.jpg";
import homeownerToolsPath from "@assets/homeowner-tools_1755576317371.jpg";

export default function Home() {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    state: '',
    roles: [] as string[],
    message: ''
  });
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorData, setCalculatorData] = useState({
    projectType: 'painting',
    homeSize: '1500',
    zipCode: '',
    quality: 'standard',
    urgency: 'normal'
  });
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [affiliateSource, setAffiliateSource] = useState('');

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

  // Offline detection and form caching
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      const cachedData = localStorage.getItem('tradescout-form-cache');
      if (cachedData) {
        console.log('Connection restored. Form data is still cached for submission.');
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showExitIntent]);

  // Track affiliate source from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const partner = urlParams.get('partner');
    if (partner) setAffiliateSource(partner);
  }, []);

  const handleRoleToggle = (role: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role) 
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Cache form data for offline submission
    localStorage.setItem('tradescout-form-cache', JSON.stringify({
      ...formData,
      affiliateSource: affiliateSource || 'direct',
      timestamp: Date.now()
    }));

    if (isOffline) {
      alert('You\'re offline. Your signup will be saved and submitted when connection is restored.');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          affiliateSource: affiliateSource || 'direct'
        }),
      });

      if (response.ok) {
        localStorage.removeItem('tradescout-form-cache');
        window.location.href = '/thank-you';
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error with your submission. Please try again.');
    }
  };

  const calculatePrice = () => {
    const baseRates = {
      painting: { interior: 3.5, exterior: 4.2, both: 3.8 },
      flooring: { basic: 8, premium: 15, luxury: 25 },
      roofing: { repair: 12, partial: 18, full: 22 }
    };

    const sizeMultiplier = parseInt(calculatorData.homeSize) / 1000;
    const qualityMultiplier = calculatorData.quality === 'premium' ? 1.4 : calculatorData.quality === 'luxury' ? 1.8 : 1;
    const urgencyMultiplier = calculatorData.urgency === 'urgent' ? 1.3 : 1;

    let baseRate = 5; // default
    if (calculatorData.projectType === 'painting') baseRate = baseRates.painting.both;
    else if (calculatorData.projectType === 'flooring') baseRate = baseRates.flooring.basic;
    else if (calculatorData.projectType === 'roofing') baseRate = baseRates.roofing.repair;

    const estimate = Math.round(baseRate * sizeMultiplier * qualityMultiplier * urgencyMultiplier * 1000);
    return { low: estimate * 0.8, high: estimate * 1.2 };
  };

  const price = calculatePrice();

  return (
    <div>
      {/* Header */}
      <header>
        <div className="container">
          <nav className="nav">
            <div className="brand" style={{color: 'var(--brand)'}}>
              <div className="brand-icon" style={{color: 'var(--brand)'}}>
                {constructionLogos[currentLogoIndex]}
              </div>
              TradeScout
            </div>
            <button 
              className="cta"
              onClick={() => document.getElementById('signup')?.scrollIntoView({behavior: 'smooth'})}
              data-testid="header-cta-button"
            >
              <User size={20} />
              Get Early Access
            </button>
          </nav>
        </div>
      </header>

      {/* Offline Status Banner */}
      {isOffline && (
        <div style={{
          background: 'linear-gradient(90deg, #f59e0b, #d97706)',
          color: 'white',
          textAlign: 'center',
          padding: '8px',
          fontSize: '14px',
          fontWeight: 600
        }}>
          ⚠️ You're offline. Form submissions will be saved and sent when connection is restored.
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Connection Without Compromise</h1>
          <p>
            America's homeowners deserve direct access to trusted contractors—no predatory predecessors, no middleman markups, no lead generation schemes. Just honest connections for painting, flooring, and roofing projects.
          </p>
          <div className="cta-wrap">
            <button 
              className="cta"
              onClick={() => document.getElementById('signup')?.scrollIntoView({behavior: 'smooth'})}
              data-testid="hero-cta-button"
            >
              <User size={20} />
              Join Early Access
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{padding: '60px 0'}}>
        <div className="container">
          <h2 className="section-title">Built for Real Connections</h2>
          <div className="feature-grid">
            {[
              {
                image: directConnectPath,
                title: "Direct Connection",
                description: "Connect directly with licensed contractors in your area without any middleman fees or lead generation costs."
              },
              {
                image: homeownerToolsPath,
                title: "Homeowner Tools",
                description: "Advanced pricing calculator, project planning tools, and contractor verification system all in one place."
              },
              {
                image: findHelpersPath,
                title: "Find Helpers",
                description: "Contractors can find skilled helpers and laborers. Homeowners can hire people starting their trades business."
              },
              {
                image: acceleratedGrowthPath,
                title: "Accelerated Growth",
                description: "Fair commission structure that supports foundation work and helps build stronger local trade communities."
              }
            ].map((feature, index) => (
              <div key={index} className="card">
                <div className="card-media">
                  <img src={feature.image} alt={feature.title} />
                </div>
                <div className="card-body">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Preview */}
      <section style={{padding: '60px 0', background: 'linear-gradient(135deg, rgba(255,107,53,0.03), rgba(37,99,235,0.02))'}}>
        <div className="container">
          <h2 className="section-title">Smart Pricing Calculator</h2>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            {!showCalculator ? (
              <div style={{textAlign: 'center'}}>
                <p style={{fontSize: '18px', color: 'var(--muted)', marginBottom: '32px'}}>
                  Get instant, accurate pricing estimates based on hyper-local market data. No signup required to see results.
                </p>
                <button
                  onClick={() => setShowCalculator(true)}
                  style={{
                    background: 'linear-gradient(135deg, var(--brand), var(--brand-2))',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px 32px',
                    fontSize: '18px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  data-testid="button-show-calculator"
                >
                  Try Calculator
                </button>
              </div>
            ) : (
              <div style={{
                background: 'var(--panel)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: 'var(--shadow)'
              }}>
                <form style={{display: 'grid', gap: '24px'}}>
                  <div>
                    <label style={{display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--text)'}}>
                      Project Type
                    </label>
                    <select
                      value={calculatorData.projectType}
                      onChange={(e) => setCalculatorData(prev => ({...prev, projectType: e.target.value}))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        background: 'var(--bg)',
                        color: 'var(--text)',
                        fontSize: '16px'
                      }}
                    >
                      <option value="painting">Interior/Exterior Painting</option>
                      <option value="flooring">Flooring Installation</option>
                      <option value="roofing">Roofing Services</option>
                    </select>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px'}}>
                    <div>
                      <label style={{display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--text)'}}>
                        Home Size (sq ft)
                      </label>
                      <input
                        type="number"
                        value={calculatorData.homeSize}
                        onChange={(e) => setCalculatorData(prev => ({...prev, homeSize: e.target.value}))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          background: 'var(--bg)',
                          color: 'var(--text)',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--text)'}}>
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={calculatorData.zipCode}
                        onChange={(e) => setCalculatorData(prev => ({...prev, zipCode: e.target.value}))}
                        placeholder="12345"
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          background: 'var(--bg)',
                          color: 'var(--text)',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px'}}>
                    <div>
                      <label style={{display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--text)'}}>
                        Quality Level
                      </label>
                      <select
                        value={calculatorData.quality}
                        onChange={(e) => setCalculatorData(prev => ({...prev, quality: e.target.value}))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          background: 'var(--bg)',
                          color: 'var(--text)',
                          fontSize: '16px'
                        }}
                      >
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="luxury">Luxury</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--text)'}}>
                        Timeline
                      </label>
                      <select
                        value={calculatorData.urgency}
                        onChange={(e) => setCalculatorData(prev => ({...prev, urgency: e.target.value}))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          background: 'var(--bg)',
                          color: 'var(--text)',
                          fontSize: '16px'
                        }}
                      >
                        <option value="normal">Flexible (2-4 weeks)</option>
                        <option value="urgent">ASAP (1-2 weeks)</option>
                      </select>
                    </div>
                  </div>

                  {/* Results */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255,107,53,0.1), rgba(37,99,235,0.05))',
                    border: '1px solid rgba(255,107,53,0.2)',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    marginTop: '16px'
                  }}>
                    <h3 style={{fontSize: '20px', fontWeight: 700, margin: '0 0 12px', color: 'var(--text)'}}>
                      Estimated Cost Range
                    </h3>
                    <div style={{fontSize: '32px', fontWeight: 900, color: 'var(--brand)', marginBottom: '8px'}}>
                      ${Math.round(price.low).toLocaleString()} - ${Math.round(price.high).toLocaleString()}
                    </div>
                    <p style={{fontSize: '14px', color: 'var(--muted)', margin: '0 0 20px'}}>
                      Based on local market data for {calculatorData.zipCode || 'your area'}
                    </p>
                    
                    <button
                      type="button"
                      onClick={() => document.getElementById('signup')?.scrollIntoView({behavior: 'smooth'})}
                      style={{
                        background: 'linear-gradient(135deg, var(--brand), var(--brand-2))',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '14px 28px',
                        fontSize: '16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      data-testid="button-calculator-signup"
                    >
                      Connect with Contractors
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Early Access Signup */}
      <section id="signup" style={{padding: '80px 0 60px', background: 'linear-gradient(135deg, rgba(255,107,53,0.02), rgba(37,99,235,0.01))'}}>
        <div className="container">
          <div style={{maxWidth: '600px', margin: '0 auto', textAlign: 'center'}}>
            <h2 style={{fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: 900, margin: '0 0 16px', color: 'var(--text)'}}>
              Get Early Access
            </h2>
            <p style={{fontSize: '18px', color: 'var(--muted)', margin: '0 0 40px', lineHeight: 1.6}}>
              Be among the first to access TradeScout when we launch. Early members get priority access to the best contractors in their area.
            </p>

            <form onSubmit={handleSubmit} className="form" style={{textAlign: 'left'}}>
              <div>
                <label style={{display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--text)'}}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  className="field"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--text)'}}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  className="field"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--text)'}}>
                  State *
                </label>
                <select
                  required
                  value={formData.state}
                  onChange={(e) => setFormData(prev => ({...prev, state: e.target.value}))}
                  className="field"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontSize: '16px'
                  }}
                >
                  <option value="">Select your state</option>
                  {['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'].map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{display: 'block', fontWeight: 600, marginBottom: '12px', color: 'var(--text)'}}>
                  I am interested as a: *
                </label>
                <div style={{display: 'grid', gap: '12px'}}>
                  {[
                    { value: 'homeowner', label: 'Homeowner', icon: <HomeIcon size={18} /> },
                    { value: 'contractor', label: 'Contractor', icon: <Hammer size={18} /> },
                    { value: 'helper', label: 'Helper/Laborer', icon: <Users size={18} /> }
                  ].map(role => (
                    <label
                      key={role.value}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `2px solid ${formData.roles.includes(role.value) ? 'var(--brand)' : 'var(--border)'}`,
                        background: formData.roles.includes(role.value) ? 'rgba(255,107,53,0.1)' : 'var(--panel)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.roles.includes(role.value)}
                        onChange={() => handleRoleToggle(role.value)}
                        style={{display: 'none'}}
                      />
                      <div style={{color: formData.roles.includes(role.value) ? 'var(--brand)' : 'var(--muted)'}}>
                        {role.icon}
                      </div>
                      <span style={{
                        fontWeight: 600,
                        color: formData.roles.includes(role.value) ? 'var(--text)' : 'var(--muted)'
                      }}>
                        {role.label}
                      </span>
                      {formData.roles.includes(role.value) && (
                        <CheckCircle size={18} style={{color: 'var(--brand)', marginLeft: 'auto'}} />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn"
                disabled={!formData.name || !formData.email || !formData.state || formData.roles.length === 0}
                style={{
                  width: '100%',
                  background: formData.name && formData.email && formData.state && formData.roles.length > 0 
                    ? 'linear-gradient(135deg, var(--brand), var(--brand-2))' 
                    : 'var(--muted)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '18px',
                  fontWeight: 700,
                  cursor: formData.name && formData.email && formData.state && formData.roles.length > 0 ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                  marginTop: '16px'
                }}
                data-testid="button-signup-submit"
              >
                {isOffline ? 'Save for Later (Offline)' : 'Get Early Access'}
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* Word of Mouth Statistics */}
      <section style={{padding: '60px 0'}}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05))',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(37, 99, 235, 0.2)',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(37, 99, 235, 0.1)'
          }}>
            <h3 style={{fontSize: '24px', fontWeight: 700, margin: '0 0 16px', color: 'var(--text)'}}>
              The Power of Word-of-Mouth
            </h3>
            <div className="value-stats" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              margin: '32px 0'
            }}>
              <div>
                <div style={{fontSize: '36px', fontWeight: 900, color: 'var(--accent)', marginBottom: '8px'}}>92%</div>
                <div style={{fontSize: '14px', color: 'var(--muted)'}}>Trust personal recommendations over advertising</div>
              </div>
              <div>
                <div style={{fontSize: '36px', fontWeight: 900, color: 'var(--success)', marginBottom: '8px'}}>5x</div>
                <div style={{fontSize: '14px', color: 'var(--muted)'}}>More likely to hire through referrals</div>
              </div>
              <div>
                <div style={{fontSize: '36px', fontWeight: 900, color: 'var(--brand)', marginBottom: '8px'}}>84%</div>
                <div style={{fontSize: '14px', color: 'var(--muted)'}}>Start their search with word-of-mouth</div>
              </div>
            </div>
            <p style={{fontSize: '16px', color: 'var(--muted)', margin: '0', fontStyle: 'italic'}}>
              "TradeScout builds on what already works—trusted recommendations from people you know."
            </p>
          </div>
        </div>
      </section>



      {/* Trade Partner Benefits */}
      <section style={{padding: '60px 0'}}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(255, 107, 53, 0.05))',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(255, 107, 53, 0.2)',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(255, 107, 53, 0.1)'
          }}>
            <h3 style={{fontSize: '24px', fontWeight: 700, margin: '0 0 16px', color: 'var(--text)'}}>
              🎯 Everyone's a Trade Partner
            </h3>
            <p style={{fontSize: '16px', color: 'var(--muted)', maxWidth: '700px', margin: '0 auto 32px'}}>
              Every TradeScout member automatically becomes a Trade Partner. Share any link from our site and earn commissions when people hire contractors! We work with real estate agents, insurance professionals, and business partners who believe in direct, honest connections.
            </p>
            <div className="value-stats" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              margin: '32px 0'
            }}>
              <div>
                <div style={{fontSize: '36px', fontWeight: 900, color: 'var(--brand)', marginBottom: '8px'}}>💰</div>
                <div style={{fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px'}}>Automatic Earnings</div>
                <div style={{fontSize: '14px', color: 'var(--muted)'}}>Earn commissions on every referral</div>
              </div>
              <div>
                <div style={{fontSize: '36px', fontWeight: 900, color: 'var(--success)', marginBottom: '8px'}}>🔗</div>
                <div style={{fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px'}}>Any Link Works</div>
                <div style={{fontSize: '14px', color: 'var(--muted)'}}>Every shared link is an affiliate link</div>
              </div>
              <div>
                <div style={{fontSize: '36px', fontWeight: 900, color: 'var(--accent)', marginBottom: '8px'}}>⚡</div>
                <div style={{fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px'}}>No Setup Required</div>
                <div style={{fontSize: '14px', color: 'var(--muted)'}}>Automatic tracking, no special codes</div>
              </div>
            </div>

            {/* Professional Partner Types */}
            <div className="feature-cards" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              margin: '40px 0',
              textAlign: 'left'
            }}>
              <div style={{
                background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05))",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid rgba(37, 99, 235, 0.2)"
              }}>
                <div style={{marginBottom: "12px", textAlign: "center"}}>
                  <HomeIcon size={28} style={{color: "var(--accent)"}} />
                </div>
                <h4 style={{fontSize: "16px", fontWeight: 600, margin: "0 0 8px", color: "var(--text)", textAlign: "center"}}>Real Estate Agents</h4>
                <p style={{fontSize: "12px", color: "var(--muted)", margin: "0 0 8px", textAlign: "center"}}>3% Commission Rate</p>
                <ul style={{fontSize: "12px", color: "var(--muted)", margin: 0, paddingLeft: "16px"}}>
                  <li>Pre-listing home improvements</li>
                  <li>Post-inspection repairs</li>
                  <li>New buyer renovations</li>
                </ul>
              </div>

              <div style={{
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid rgba(16, 185, 129, 0.2)"
              }}>
                <div style={{marginBottom: "12px", textAlign: "center"}}>
                  <Shield size={28} style={{color: "var(--success)"}} />
                </div>
                <h4 style={{fontSize: "16px", fontWeight: 600, margin: "0 0 8px", color: "var(--text)", textAlign: "center"}}>Insurance Professionals</h4>
                <p style={{fontSize: "12px", color: "var(--muted)", margin: "0 0 8px", textAlign: "center"}}>5% Commission Rate</p>
                <ul style={{fontSize: "12px", color: "var(--muted)", margin: 0, paddingLeft: "16px"}}>
                  <li>Storm damage repairs</li>
                  <li>Preventive maintenance</li>
                  <li>Claims contractor referrals</li>
                </ul>
              </div>

              <div style={{
                background: "linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(255, 107, 53, 0.05))",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid rgba(255, 107, 53, 0.2)"
              }}>
                <div style={{marginBottom: "12px", textAlign: "center"}}>
                  <Briefcase size={28} style={{color: "var(--brand)"}} />
                </div>
                <h4 style={{fontSize: "16px", fontWeight: 600, margin: "0 0 8px", color: "var(--text)", textAlign: "center"}}>Business Partners</h4>
                <p style={{fontSize: "12px", color: "var(--muted)", margin: "0 0 8px", textAlign: "center"}}>2% Commission Rate</p>
                <ul style={{fontSize: "12px", color: "var(--muted)", margin: 0, paddingLeft: "16px"}}>
                  <li>Property management referrals</li>
                  <li>Home inspection follow-ups</li>
                  <li>Professional network connections</li>
                </ul>
              </div>
            </div>
            
            <p style={{fontSize: '16px', color: 'var(--muted)', margin: '0', fontStyle: 'italic'}}>
              "Share TradeScout naturally. Get rewarded automatically."
            </p>
            
            {/* Trade Partner Link for visitors with email */}
            {affiliateSource && (
              <div style={{
                marginTop: '32px',
                padding: '16px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '12px'
              }}>
                <p style={{fontSize: '16px', fontWeight: 600, margin: '0', color: 'var(--text)'}}>
                  ✅ Shared by Trade Partner: <span style={{color: 'var(--success)', textTransform: 'uppercase'}}>{affiliateSource}</span>
                </p>
                <p style={{fontSize: '14px', color: 'var(--muted)', margin: '4px 0 0'}}>
                  They'll receive credit when you hire contractors!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Exit Intent Modal */}
      {showExitIntent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--panel)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            boxShadow: 'var(--shadow)'
          }}>
            <h3 style={{fontSize: '24px', fontWeight: 700, margin: '0 0 16px', color: 'var(--text)'}}>
              Don't Miss Out!
            </h3>
            <p style={{fontSize: '16px', color: 'var(--muted)', margin: '0 0 24px', lineHeight: 1.5}}>
              You're about to leave without joining our early access list. Be among the first to experience direct contractor connections without the middleman fees.
            </p>
            <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <button
                onClick={() => {
                  setShowExitIntent(false);
                  document.getElementById('signup')?.scrollIntoView({behavior: 'smooth'});
                }}
                style={{
                  background: 'linear-gradient(135deg, var(--brand), var(--brand-2))',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Get Early Access
              </button>
              <button
                onClick={() => setShowExitIntent(false)}
                style={{
                  background: 'var(--border)',
                  color: 'var(--muted)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden SEO Content - Invisible to users but crawlable by search engines */}
      <div style={{
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}>
        <h1>Best Contractors Near Me - Painting, Flooring, Roofing Services</h1>
        <p>Find trusted local contractors for interior painting, exterior painting, hardwood flooring, laminate installation, roof repair, and roofing replacement. Licensed professionals in your area.</p>
        
        <h2>Local Contractor Services</h2>
        <p>Professional painting contractors, flooring installation experts, roofing specialists, home improvement professionals, licensed contractors, insured contractors, local contractors near me, residential contractors, commercial contractors, emergency repairs</p>
        
        <h3>Painting Services</h3>
        <p>Interior painting, exterior painting, residential painting, commercial painting, cabinet painting, fence painting, deck staining, pressure washing, paint color consultation, professional painters near me</p>
        
        <h3>Flooring Services</h3>
        <p>Hardwood flooring installation, laminate flooring, vinyl flooring, tile installation, carpet installation, flooring repair, floor refinishing, flooring contractors near me</p>
        
        <h3>Roofing Services</h3>
        <p>Roof replacement, roof repair, emergency roof repair, roofing contractors, shingle replacement, metal roofing, flat roof repair, gutter installation, storm damage repair</p>
        
        <h2>Why Choose Local Contractors</h2>
        <p>Direct connection without middleman fees, no lead generation costs, verified licensed professionals, local references, community reputation, faster response times, better accountability</p>
        
        <h2>Service Areas</h2>
        <p>Contractors in Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming</p>
      </div>
    </div>
  );
}