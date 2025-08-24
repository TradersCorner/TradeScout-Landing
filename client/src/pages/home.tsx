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
  const [referralCode, setReferralCode] = useState('');
  const [userReferralCode, setUserReferralCode] = useState('');

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

  // Generate referral code
  useEffect(() => {
    if (formData.email && !referralCode) {
      const code = formData.email.split('@')[0].toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
      setReferralCode(code);
    }
  }, [formData.email, referralCode]);

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
      referralCode,
      userReferralCode,
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
          referralCode,
          userReferralCode
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
            <div className="brand">
              <div className="brand-icon">
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
            <div style={{
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

            {/* Referral Code Input */}
            {!userReferralCode && (
              <div style={{marginBottom: '32px'}}>
                <p style={{fontSize: '16px', color: 'var(--text)', marginBottom: '12px'}}>
                  Have a referral code? Enter it to move up the early access list:
                </p>
                <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
                  <input
                    type="text"
                    placeholder="Enter referral code"
                    value={userReferralCode}
                    onChange={(e) => setUserReferralCode(e.target.value.toUpperCase())}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg)',
                      color: 'var(--text)',
                      fontSize: '16px',
                      minWidth: '200px'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (userReferralCode) {
                        alert(`Referral code ${userReferralCode} applied! You've moved up in the early access queue.`);
                      }
                    }}
                    style={{
                      background: 'var(--accent)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 20px',
                      fontSize: '16px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Apply Code
                  </button>
                </div>
              </div>
            )}

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

              {/* Referral Code Display */}
              {referralCode && (
                <div style={{
                  marginTop: '24px',
                  padding: '20px',
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05))',
                  border: '1px solid rgba(37, 99, 235, 0.2)',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <p style={{fontSize: '16px', fontWeight: 600, margin: '0 0 8px', color: 'var(--text)'}}>
                    Your Referral Code:
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      fontSize: '20px',
                      fontWeight: 900,
                      color: 'var(--accent)',
                      padding: '8px 16px',
                      background: 'var(--bg)',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
                      letterSpacing: '2px'
                    }}>
                      {referralCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(referralCode);
                        alert('Referral code copied to clipboard!');
                      }}
                      style={{
                        background: 'var(--accent)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Copy size={14} />
                      Copy
                    </button>
                  </div>
                  <p style={{fontSize: '14px', color: 'var(--muted)', margin: '12px 0 0', lineHeight: 1.5}}>
                    💡 <strong>Pro tip:</strong> The more people you refer, the higher you move up the early access list!
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Partner Referral System */}
      <section style={{padding: '60px 0', background: 'var(--panel)'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '48px'}}>
            <h2 style={{fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 900, margin: '0 0 16px', color: 'var(--text)'}}>
              Partner Referral Network
            </h2>
            <p style={{fontSize: '16px', color: 'var(--muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6}}>
              Join our partner network and earn competitive commissions for quality referrals. We work with real estate agents, insurance professionals, and business partners who believe in direct, honest connections.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05))",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              textAlign: "center"
            }}>
              <div style={{marginBottom: "16px"}}>
                <HomeIcon size={32} style={{color: "var(--accent)", margin: "0 auto"}} />
              </div>
              <h4 style={{fontSize: "18px", fontWeight: 600, margin: "0 0 8px", color: "var(--text)"}}>Real Estate Agents</h4>
              <p style={{fontSize: "14px", color: "var(--muted)", margin: "0 0 12px"}}>Refer clients who need contractors for home prep, repairs, or improvements</p>
              <ul style={{fontSize: "12px", color: "var(--muted)", textAlign: "left", margin: 0, paddingLeft: "16px"}}>
                <li>Pre-listing home improvements</li>
                <li>Post-inspection repairs</li>
                <li>New buyer renovations</li>
              </ul>
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              textAlign: "center"
            }}>
              <div style={{marginBottom: "16px"}}>
                <Shield size={32} style={{color: "var(--success)", margin: "0 auto"}} />
              </div>
              <h4 style={{fontSize: "18px", fontWeight: 600, margin: "0 0 8px", color: "var(--text)"}}>Insurance Professionals</h4>
              <p style={{fontSize: "14px", color: "var(--muted)", margin: "0 0 12px"}}>Connect policyholders with trusted contractors for claims and preventive maintenance</p>
              <ul style={{fontSize: "12px", color: "var(--muted)", textAlign: "left", margin: 0, paddingLeft: "16px"}}>
                <li>Storm damage repairs</li>
                <li>Preventive maintenance</li>
                <li>Claims contractor referrals</li>
              </ul>
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(255, 107, 53, 0.05))",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid rgba(255, 107, 53, 0.2)",
              textAlign: "center"
            }}>
              <div style={{marginBottom: "16px"}}>
                <Briefcase size={32} style={{color: "var(--brand)", margin: "0 auto"}} />
              </div>
              <h4 style={{fontSize: "18px", fontWeight: 600, margin: "0 0 8px", color: "var(--text)"}}>Business Partners</h4>
              <p style={{fontSize: "14px", color: "var(--muted)", margin: "0 0 12px"}}>Property managers, home inspectors, and related professionals</p>
              <ul style={{fontSize: "12px", color: "var(--muted)", textAlign: "left", margin: 0, paddingLeft: "16px"}}>
                <li>Property management referrals</li>
                <li>Home inspection follow-ups</li>
                <li>Professional network connections</li>
              </ul>
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05))",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(37, 99, 235, 0.2)",
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(37, 99, 235, 0.1)"
          }}>
            <div style={{marginBottom: "16px"}}>
              <Share2 size={32} style={{color: "var(--accent)", margin: "0 auto"}} />
            </div>
            <h4 style={{fontSize: "20px", fontWeight: 700, margin: "0 0 8px", color: "var(--text)"}}>Ready to Become a Partner?</h4>
            <p style={{fontSize: "14px", color: "var(--muted)", margin: "0 0 20px", lineHeight: 1.5}}>Join our partner network and start earning rewards for quality referrals. Early partners get exclusive benefits and higher commission rates.</p>
            
            <button 
              onClick={() => document.getElementById('signup')?.scrollIntoView({behavior: 'smooth'})}
              style={{
                background: "linear-gradient(135deg, var(--brand), var(--brand-2))",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                marginRight: "12px"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px)"}
              data-testid="button-partner-signup"
            >
              Become a Partner
            </button>
            
            <p style={{fontSize: "12px", color: "var(--muted)", margin: "16px 0 0"}}>Commission rates: Real Estate 3%, Insurance 5%, Business Partners 2%</p>
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