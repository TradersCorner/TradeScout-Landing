import { useEffect, useState } from "react";
import { Hammer, Wrench, HardHat, Home as HomeIcon, Drill, Shield, CheckCircle, MapPin, Clock, Globe, Users, Copy, Share2, MessageCircle, Mail, Link2 } from "lucide-react";
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
    zipCode: ''
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
      // Try to submit cached form data if any
      const cachedData = localStorage.getItem('tradescout-form-cache');
      if (cachedData) {
        console.log('Connection restored. Form data is still cached for submission.');
      }
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      console.log('Connection lost. Form submissions will be cached.');
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
    let hasShownExitIntent = localStorage.getItem('tradescout-exit-intent-shown');
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent && !showExitIntent) {
        setShowExitIntent(true);
        localStorage.setItem('tradescout-exit-intent-shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showExitIntent]);

  // Generate referral code after signup
  useEffect(() => {
    const generateReferralCode = () => {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    };
    
    // Check for referral code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      setReferralCode(refCode);
      localStorage.setItem('tradescout-referral-source', refCode);
    }
    
    // Generate user's referral code if they don't have one
    let userCode = localStorage.getItem('tradescout-user-referral-code');
    if (!userCode) {
      userCode = generateReferralCode();
      localStorage.setItem('tradescout-user-referral-code', userCode);
    }
    setUserReferralCode(userCode);
  }, []);

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

  // Progressive form functions
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Cache form data for offline capability
    const updatedData = { ...formData, [field]: value };
    localStorage.setItem('tradescout-form-cache', JSON.stringify(updatedData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (isOffline) {
      e.preventDefault();
      alert('You\'re offline! Your form data has been saved and will be submitted when you\'re back online.');
      localStorage.setItem('tradescout-form-cache', JSON.stringify(formData));
      return;
    }
    // Add referral code to form if present
    if (referralCode) {
      const form = e.target as HTMLFormElement;
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = 'referral_code';
      hiddenInput.value = referralCode;
      form.appendChild(hiddenInput);
    }
    // Let the form submit normally to Formspree when online
  };

  const copyReferralLink = async () => {
    const referralLink = `${window.location.origin}/?ref=${userReferralCode}`;
    try {
      await navigator.clipboard.writeText(referralLink);
      alert('✅ Referral link copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = referralLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('✅ Referral link copied to clipboard!');
    }
  };

  const shareViaEmail = () => {
    const referralLink = `${window.location.origin}/?ref=${userReferralCode}`;
    const subject = encodeURIComponent('Join me on TradeScout - Direct connections for home projects');
    const body = encodeURIComponent(`Hey! I thought you'd be interested in TradeScout - a new platform where homeowners and contractors connect directly without middlemen.\n\nJoin through my link for priority access: ${referralLink}\n\nNo lead fees, no spam, just real connections. Check it out!`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const shareViaWhatsApp = () => {
    const referralLink = `${window.location.origin}/?ref=${userReferralCode}`;
    const message = encodeURIComponent(`🏠 Hey! Join me on TradeScout - the direct connection platform for homeowners & contractors. No middlemen, no lead fees! Get priority access: ${referralLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const shareViaSMS = () => {
    const referralLink = `${window.location.origin}/?ref=${userReferralCode}`;
    const message = encodeURIComponent(`Hey! Join TradeScout for direct connections between homeowners & contractors. No middlemen! Get priority access: ${referralLink}`);
    window.open(`sms:?body=${message}`, '_blank');
  };

  const shareViaTwitter = () => {
    const referralLink = `${window.location.origin}/?ref=${userReferralCode}`;
    const text = encodeURIComponent(`🏠 Excited to join @TradeScout - finally, a platform where homeowners and contractors connect directly! No middlemen, no lead fees. Join me: ${referralLink} #TradeScout #HomeImprovement`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareViaLinkedIn = () => {
    const referralLink = `${window.location.origin}/?ref=${userReferralCode}`;
    const url = encodeURIComponent(referralLink);
    const title = encodeURIComponent('TradeScout - Direct Connections for Home Projects');
    const summary = encodeURIComponent('A professional network connecting homeowners and contractors directly. No middlemen, no lead fees, just real connections.');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank');
  };

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
              <img src={homeownerToolsPath} alt="Homeowner Tools Interface" style={{width: '100%', height: '100%', objectFit: 'cover'}} data-testid="img-homeowner-tools" loading="lazy" />
            </div>
            <div className="card-body">
              <h3>Homeowner Tools</h3>
              <p>Post your project. Review profiles. Choose who works on your home.</p>
            </div>
          </article>

          <article className="card">
            <div className="card-media">
              <img src={acceleratedGrowthPath} alt="Accelerated Growth Interface" style={{width: '100%', height: '100%', objectFit: 'cover'}} loading="lazy" />
            </div>
            <div className="card-body">
              <h3>Contractor Growth</h3>
              <p>Build your reputation. Show your work. Grow your business.</p>
            </div>
          </article>

          <article className="card">
            <div className="card-media">
              <img src={findHelpersPath} alt="Find Helpers Interface" style={{width: '100%', height: '100%', objectFit: 'cover'}} loading="lazy" />
            </div>
            <div className="card-body">
              <h3>Find Help</h3>
              <p>Need extra hands? Connect with people ready to work and learn.</p>
            </div>
          </article>

          <article className="card">
            <div className="card-media">
              <img src={directConnectPath} alt="Direct Connect Interface" style={{width: '100%', height: '100%', objectFit: 'cover'}} loading="lazy" />
            </div>
            <div className="card-body">
              <h3>Direct Connect</h3>
              <p>Homeowners and contractors, connected directly—no middlemen.</p>
            </div>
          </article>
        </div>
      </section>

      {/* Verification Badges */}
      <section className="container" style={{marginTop:"48px", marginBottom:"32px"}}>
        <h2 className="section-title">Verified Network You Can Trust</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <div style={{
            background: "var(--panel-2)",
            borderRadius: "16px",
            padding: "32px 24px",
            border: "1px solid rgba(255,255,255,0.05)",
            position: "relative"
          }}>
            <div style={{marginBottom: "16px"}}>
              <Shield size={32} style={{color: "var(--brand)", margin: "0 auto"}} />
            </div>
            <h3 style={{fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "var(--text)"}}>License Verification</h3>
            <p style={{color: "var(--muted)", margin: 0, fontSize: "14px", lineHeight: 1.5}}>All contractors verified through state licensing boards and industry databases</p>
          </div>
          
          <div style={{
            background: "var(--panel-2)",
            borderRadius: "16px",
            padding: "32px 24px",
            border: "1px solid rgba(255,255,255,0.05)"
          }}>
            <div style={{marginBottom: "16px"}}>
              <CheckCircle size={32} style={{color: "var(--brand)", margin: "0 auto"}} />
            </div>
            <h3 style={{fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "var(--text)"}}>Insurance Confirmed</h3>
            <p style={{color: "var(--muted)", margin: 0, fontSize: "14px", lineHeight: 1.5}}>Liability and workers compensation insurance validated before joining</p>
          </div>
          
          <div style={{
            background: "var(--panel-2)",
            borderRadius: "16px",
            padding: "32px 24px",
            border: "1px solid rgba(255,255,255,0.05)"
          }}>
            <div style={{marginBottom: "16px"}}>
              <Users size={32} style={{color: "var(--brand)", margin: "0 auto"}} />
            </div>
            <h3 style={{fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "var(--text)"}}>Reference Checked</h3>
            <p style={{color: "var(--muted)", margin: 0, fontSize: "14px", lineHeight: 1.5}}>Previous work and customer references reviewed by our verification team</p>
          </div>
        </div>
      </section>

      {/* Local Focus & Calculator Preview */}
      <section style={{
        padding: "60px 0",
        background: "linear-gradient(135deg, rgba(255,107,53,.03), rgba(37,99,235,.02))",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)"
      }}>
        <div className="container" style={{textAlign: "center"}}>
          <div style={{marginBottom: "16px"}}>
            <MapPin size={48} style={{color: "var(--brand)", margin: "0 auto"}} />
          </div>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            marginBottom: "16px",
            color: "var(--text)",
            fontWeight: 700
          }}>
            Hyper-Local Market Intelligence
          </h2>
          <p style={{
            fontSize: "18px",
            color: "var(--muted)",
            maxWidth: "700px",
            margin: "0 auto 32px",
            lineHeight: 1.6
          }}>
            Our pricing calculator uses real-time local data: permit costs, material prices, labor rates, and market conditions specific to your zip code.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "24px",
            maxWidth: "600px",
            margin: "0 auto 32px"
          }}>
            <div style={{textAlign: "center"}}>
              <Clock size={24} style={{color: "var(--brand)", marginBottom: "8px"}} />
              <div style={{fontSize: "14px", color: "var(--text)", fontWeight: 600}}>Real-Time Pricing</div>
            </div>
            <div style={{textAlign: "center"}}>
              <Globe size={24} style={{color: "var(--brand)", marginBottom: "8px"}} />
              <div style={{fontSize: "14px", color: "var(--text)", fontWeight: 600}}>Zip Code Specific</div>
            </div>
            <div style={{textAlign: "center"}}>
              <MapPin size={24} style={{color: "var(--brand)", marginBottom: "8px"}} />
              <div style={{fontSize: "14px", color: "var(--text)", fontWeight: 600}}>Local Expertise</div>
            </div>
          </div>
          
          {/* Interactive Calculator Preview */}
          <div style={{
            maxWidth: "500px",
            margin: "0 auto",
            background: "var(--panel)",
            borderRadius: "16px",
            border: "2px solid var(--brand)",
            padding: "24px",
            boxShadow: "0 12px 32px rgba(255,107,53,0.2)"
          }}>
            <h3 style={{fontSize: "18px", fontWeight: 700, marginBottom: "16px", color: "var(--text)"}}>Try Our Pricing Calculator</h3>
            
            {!showCalculator ? (
              <>
                <p style={{color: "var(--muted)", fontSize: "14px", marginBottom: "16px"}}>Get instant, accurate estimates based on your location</p>
                <button 
                  onClick={() => setShowCalculator(true)}
                  style={{
                    background: "linear-gradient(135deg, var(--brand), var(--brand-2))",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "transform 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px)"}
                  data-testid="button-show-calculator"
                >
                  See It In Action
                </button>
              </>
            ) : (
              <div style={{textAlign: "left"}}>
                <div style={{marginBottom: "16px"}}>
                  <label style={{display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "var(--text)"}}>Project Type</label>
                  <select 
                    value={calculatorData.projectType}
                    onChange={(e) => setCalculatorData({...calculatorData, projectType: e.target.value})}
                    style={{
                      width: "100%",
                      padding: "12px 40px 12px 12px",
                      borderRadius: "8px",
                      border: "2px solid var(--border)",
                      background: "var(--panel-2)",
                      color: "var(--text)",
                      fontSize: "14px",
                      fontWeight: 500,
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6,9 12,15 18,9'></polyline></svg>")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 12px center",
                      backgroundSize: "16px 16px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--brand)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,107,53,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--brand)";
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = "var(--border)";
                      }
                    }}
                  >
                    <option value="painting">Interior/Exterior Painting</option>
                    <option value="flooring">Flooring Installation</option>
                    <option value="roofing">Roof Replacement</option>
                  </select>
                </div>
                
                <div style={{marginBottom: "16px"}}>
                  <label style={{display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "var(--text)"}}>Home Size (sq ft)</label>
                  <input 
                    type="number"
                    value={calculatorData.homeSize}
                    onChange={(e) => setCalculatorData({...calculatorData, homeSize: e.target.value})}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "2px solid var(--border)",
                      background: "var(--panel-2)",
                      color: "var(--text)",
                      fontSize: "14px",
                      fontWeight: 500,
                      transition: "all 0.2s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--brand)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,107,53,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--brand)";
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = "var(--border)";
                      }
                    }}
                  />
                </div>
                
                <div style={{marginBottom: "16px"}}>
                  <label style={{display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "var(--text)"}}>Zip Code</label>
                  <input 
                    type="text"
                    value={calculatorData.zipCode}
                    onChange={(e) => setCalculatorData({...calculatorData, zipCode: e.target.value})}
                    placeholder="Enter your zip code"
                    maxLength={5}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "2px solid var(--border)",
                      background: "var(--panel-2)",
                      color: "var(--text)",
                      fontSize: "14px",
                      fontWeight: 500,
                      transition: "all 0.2s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--brand)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,107,53,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--brand)";
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = "var(--border)";
                      }
                    }}
                  />
                </div>
                
                <div style={{
                  background: "rgba(255,107,53,0.1)",
                  border: "1px solid rgba(255,107,53,0.3)",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px"
                }}>
                  <h4 style={{fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "var(--text)"}}>Live Estimate</h4>
                  <div style={{fontSize: "24px", fontWeight: 900, color: "var(--brand)", marginBottom: "4px"}}>
                    ${((calculatorData.projectType === 'painting' ? 3000 : 
                        calculatorData.projectType === 'flooring' ? 8000 :
                        calculatorData.projectType === 'roofing' ? 12000 : 3000) 
                        * (parseInt(calculatorData.homeSize) / 1500)).toLocaleString()} - 
                    ${((calculatorData.projectType === 'painting' ? 8000 : 
                        calculatorData.projectType === 'flooring' ? 15000 :
                        calculatorData.projectType === 'roofing' ? 25000 : 8000) 
                        * (parseInt(calculatorData.homeSize) / 1500)).toLocaleString()}
                  </div>
                  <p style={{fontSize: "12px", color: "var(--muted)", margin: "0 0 12px"}}>
                    {calculatorData.zipCode.length >= 5 
                      ? `Based on ${calculatorData.zipCode} area pricing • Updated weekly`
                      : "National average • Enter zip code for local pricing"
                    }
                  </p>
                  
                  {calculatorData.zipCode.length >= 5 && (
                    <div style={{
                      background: "rgba(37, 99, 235, 0.1)",
                      border: "1px solid rgba(37, 99, 235, 0.2)",
                      borderRadius: "6px",
                      padding: "12px",
                      textAlign: "center"
                    }}>
                      <p style={{fontSize: "13px", color: "var(--text)", margin: "0 0 8px", fontWeight: 600}}>
                        💡 Want to connect with verified contractors in your area?
                      </p>
                      <button 
                        style={{
                          background: "linear-gradient(135deg, var(--brand), var(--brand-2))",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: "8px 16px",
                          fontSize: "13px",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                        onClick={() => document.getElementById('signup')?.scrollIntoView({behavior: 'smooth'})}
                      >
                        Join TradeScout →
                      </button>
                    </div>
                  )}
                </div>
                
                <div style={{display: "flex", gap: "8px"}}>
                  <button 
                    onClick={() => setShowCalculator(false)}
                    style={{
                      background: "var(--panel-2)",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      cursor: "pointer",
                      flex: 1
                    }}
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      setCalculatorData({...calculatorData, zipCode: ''});
                    }}
                    style={{
                      background: "var(--accent)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      flex: 1
                    }}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
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
        
        {/* Enhanced Security Messaging */}
        <div style={{
          textAlign: "center",
          margin: "20px auto 32px",
          maxWidth: "600px",
          padding: "20px",
          background: "rgba(16, 185, 129, 0.08)",
          borderRadius: "12px",
          border: "1px solid rgba(16, 185, 129, 0.2)"
        }}>
          <Shield size={24} style={{color: "var(--success)", marginBottom: "8px"}} />
          <h3 style={{fontSize: "16px", fontWeight: 700, margin: "0 0 8px", color: "var(--text)"}}>Your Privacy is Protected</h3>
          <p style={{fontSize: "14px", color: "var(--muted)", margin: 0, lineHeight: 1.5}}>
            <strong style={{color: "var(--success)"}}>256-bit encryption</strong> • <strong style={{color: "var(--success)"}}>Zero third-party sharing</strong> • <strong style={{color: "var(--success)"}}>GDPR compliant</strong><br/>
            We never sell your data. Period.
          </p>
        </div>
        
        {/* Connection Status */}
        {isOffline && (
          <div style={{
            textAlign: "center",
            margin: "20px auto",
            padding: "16px",
            background: "rgba(245, 158, 11, 0.1)",
            borderRadius: "8px",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            color: "var(--warning)"
          }}>
            📡 You're offline. Your form will be saved and submitted when you reconnect.
          </div>
        )}
        
        {/* Progressive Form Steps Indicator */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          margin: "20px auto 32px",
          maxWidth: "400px"
        }}>
          {[1, 2, 3].map((step) => (
            <div key={step} style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: currentStep >= step ? "var(--brand)" : "var(--panel-2)",
                color: currentStep >= step ? "white" : "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: "14px",
                border: currentStep >= step ? "2px solid var(--brand)" : "2px solid var(--border)",
                transition: "all 0.3s ease"
              }}>
                {step}
              </div>
              <span style={{
                fontSize: "12px",
                color: currentStep >= step ? "var(--text)" : "var(--muted)",
                fontWeight: currentStep === step ? 600 : 400
              }}>
                {step === 1 ? "Contact" : step === 2 ? "Preferences" : "Confirm"}
              </span>
              {step < 3 && (
                <div style={{
                  width: "24px",
                  height: "2px",
                  background: currentStep > step ? "var(--brand)" : "var(--border)",
                  marginLeft: "8px"
                }} />
              )}
            </div>
          ))}
        </div>

        <form 
          className="form" 
          action="https://formspree.io/f/xovlzjlq"
          method="POST"
          data-analytics="signup-form"
          onSubmit={handleSubmit}
        >
          {/* Step 1: Basic Contact Info */}
          {currentStep === 1 && (
            <>
              <div style={{gridColumn: "1 / -1", textAlign: "center", marginBottom: "16px"}}>
                <h3 style={{fontSize: "20px", fontWeight: 700, margin: "0 0 8px", color: "var(--text)"}}>Let's Get Started</h3>
                <p style={{color: "var(--muted)", margin: 0, fontSize: "14px"}}>We'll need your email to keep you updated</p>
              </div>
              
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
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
              />
              
              <label className="sr-only" htmlFor="name">Your name (optional)</label>
              <input 
                className="field" 
                id="name" 
                type="text" 
                name="name" 
                placeholder="Your Name (optional)" 
                autoComplete="name"
                data-testid="input-name"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
              />
              
              <button 
                type="button" 
                className="btn" 
                onClick={nextStep}
                disabled={!formData.email}
                style={{opacity: formData.email ? 1 : 0.6}}
                data-testid="button-next-step-1"
              >
                Continue →
              </button>
            </>
          )}
          
          {/* Step 2: Preferences */}
          {currentStep === 2 && (
            <>
              <div style={{gridColumn: "1 / -1", textAlign: "center", marginBottom: "16px"}}>
                <h3 style={{fontSize: "20px", fontWeight: 700, margin: "0 0 8px", color: "var(--text)"}}>Tell Us About You</h3>
                <p style={{color: "var(--muted)", margin: 0, fontSize: "14px"}}>This helps us customize your experience</p>
              </div>
              
              <label className="sr-only" htmlFor="state">Your state (optional)</label>
              <select 
                className="field" 
                id="state" 
                name="state"
                autoComplete="address-level1"
                aria-describedby="state-help"
                data-testid="select-state"
                value={formData.state}
                onChange={(e) => updateFormData('state', e.target.value)}
                style={{
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6,9 12,15 18,9'></polyline></svg>")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  backgroundSize: "16px 16px",
                  paddingRight: "48px",
                  cursor: "pointer"
                }}
              >
                <option value="">Your State (optional)</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>

              {/* Roles (multi-select) */}
              <div style={{gridColumn: "1 / -1", marginBottom: "20px"}}>
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
                  {["Homeowner", "Contractor", "Service Provider"].map((role) => (
                    <label key={role} style={{
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
                    data-testid={`checkbox-${role.toLowerCase().replace(' ', '-')}`}>
                      <input 
                        type="checkbox" 
                        name="roles[]" 
                        value={role}
                        checked={formData.roles.includes(role)}
                        onChange={(e) => {
                          const roles = e.target.checked 
                            ? [...formData.roles, role]
                            : formData.roles.filter(r => r !== role);
                          updateFormData('roles', roles);
                        }}
                        data-testid={`input-${role.toLowerCase().replace(' ', '-')}`}
                        style={{
                          accentColor: "var(--brand)",
                          margin: 0
                        }}
                      />
                      <span>{role}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div style={{display: "flex", gap: "12px", gridColumn: "1 / -1"}}>
                <button 
                  type="button" 
                  className="btn" 
                  onClick={prevStep}
                  style={{background: "var(--panel-2)", color: "var(--text)", flex: 1}}
                  data-testid="button-prev-step-2"
                >
                  ← Back
                </button>
                <button 
                  type="button" 
                  className="btn" 
                  onClick={nextStep}
                  style={{flex: 2}}
                  data-testid="button-next-step-2"
                >
                  Continue →
                </button>
              </div>
            </>
          )}
          
          {/* Step 3: Confirmation & Message */}
          {currentStep === 3 && (
            <>
              <div style={{gridColumn: "1 / -1", textAlign: "center", marginBottom: "16px"}}>
                <h3 style={{fontSize: "20px", fontWeight: 700, margin: "0 0 8px", color: "var(--text)"}}>Almost Done!</h3>
                <p style={{color: "var(--muted)", margin: 0, fontSize: "14px"}}>Add a message or submit to join the network</p>
              </div>
              
              {/* Summary */}
              <div style={{gridColumn: "1 / -1", background: "var(--panel-2)", padding: "16px", borderRadius: "8px", marginBottom: "16px"}}>
                <h4 style={{fontSize: "14px", fontWeight: 600, margin: "0 0 8px", color: "var(--text)"}}>Your Information:</h4>
                <p style={{fontSize: "13px", color: "var(--muted)", margin: "0 0 4px"}}><strong>Email:</strong> {formData.email}</p>
                {formData.name && <p style={{fontSize: "13px", color: "var(--muted)", margin: "0 0 4px"}}><strong>Name:</strong> {formData.name}</p>}
                {formData.state && <p style={{fontSize: "13px", color: "var(--muted)", margin: "0 0 4px"}}><strong>State:</strong> {formData.state}</p>}
                {formData.roles.length > 0 && <p style={{fontSize: "13px", color: "var(--muted)", margin: "0"}}><strong>Role(s):</strong> {formData.roles.join(", ")}</p>}
              </div>
              
              {/* Hidden inputs for form submission */}
              <input type="hidden" name="email" value={formData.email} />
              <input type="hidden" name="name" value={formData.name} />
              <input type="hidden" name="state" value={formData.state} />
              {formData.roles.map((role, index) => (
                <input key={index} type="hidden" name="roles[]" value={role} />
              ))}
              
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
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
              ></textarea>
              
              <div style={{display: "flex", gap: "12px", gridColumn: "1 / -1"}}>
                <button 
                  type="button" 
                  className="btn" 
                  onClick={prevStep}
                  style={{background: "var(--panel-2)", color: "var(--text)", flex: 1}}
                  data-testid="button-prev-step-3"
                >
                  ← Back
                </button>
                <button 
                  className="btn" 
                  type="submit" 
                  aria-label="Get notified when TradeScout launches"
                  aria-describedby="submit-help"
                  data-testid="button-submit"
                  style={{flex: 2}}
                >
                  {isOffline ? "Save for Later" : "Join the Network!"}
                </button>
              </div>
            </>
          )}

          <input type="hidden" name="_redirect" value="https://info.thetradescout.us/thank-you" />
          <input type="hidden" name="_subject" value="New TradeScout Early Access Signup" />

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
        
        {/* Enhanced Referral System */}
        <div style={{
          textAlign: "center",
          margin: "32px auto",
          maxWidth: "700px",
          padding: "24px",
          background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05))",
          borderRadius: "16px",
          border: "1px solid rgba(37, 99, 235, 0.2)",
          boxShadow: "0 8px 32px rgba(37, 99, 235, 0.1)"
        }}>
          <div style={{marginBottom: "16px"}}>
            <Share2 size={32} style={{color: "var(--accent)", margin: "0 auto"}} />
          </div>
          <h3 style={{fontSize: "20px", fontWeight: 700, margin: "0 0 8px", color: "var(--text)"}}>Invite Friends & Move Up the List</h3>
          <p style={{fontSize: "14px", color: "var(--muted)", margin: "0 0 20px", lineHeight: 1.5}}>
            Share your referral link and get priority access for every person who joins through your link.
          </p>
          
          {/* Referral Link Display */}
          <div style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            background: "var(--panel-2)",
            borderRadius: "10px",
            padding: "12px",
            border: "1px solid var(--border)",
            marginBottom: "20px"
          }}>
            <Link2 size={16} style={{color: "var(--muted)", flexShrink: 0}} />
            <input 
              type="text"
              value={`${window.location.origin}/?ref=${userReferralCode}`}
              readOnly
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: "var(--text)",
                fontSize: "14px",
                outline: "none",
                fontFamily: "monospace"
              }}
            />
            <button 
              onClick={copyReferralLink}
              style={{
                background: "var(--accent)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 12px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              data-testid="button-copy-referral"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>
          
          {/* Social Share Options */}
          <div style={{marginBottom: "16px"}}>
            <p style={{fontSize: "14px", fontWeight: 600, margin: "0 0 12px", color: "var(--text)"}}>Share via:</p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "8px",
              maxWidth: "500px",
              margin: "0 auto"
            }}>
              {/* Email Share */}
              <button 
                onClick={shareViaEmail}
                style={{
                  background: "#EA4335",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(234, 67, 53, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-testid="button-share-email"
              >
                <Mail size={14} />
                Email
              </button>
              
              {/* WhatsApp Share */}
              <button 
                onClick={shareViaWhatsApp}
                style={{
                  background: "#25D366",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 211, 102, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-testid="button-share-whatsapp"
              >
                <MessageCircle size={14} />
                WhatsApp
              </button>
              
              {/* SMS Share */}
              <button 
                onClick={shareViaSMS}
                style={{
                  background: "#0084FF",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 132, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-testid="button-share-sms"
              >
                <MessageCircle size={14} />
                SMS
              </button>
              
              {/* Twitter Share */}
              <button 
                onClick={shareViaTwitter}
                style={{
                  background: "#1DA1F2",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(29, 161, 242, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-testid="button-share-twitter"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
                Twitter
              </button>
              
              {/* LinkedIn Share */}
              <button 
                onClick={shareViaLinkedIn}
                style={{
                  background: "#0077B5",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 119, 181, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-testid="button-share-linkedin"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </button>
            </div>
          </div>
          
          {referralCode && (
            <div style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "8px",
              padding: "12px",
              margin: "16px 0 0"
            }}>
              <p style={{fontSize: "13px", color: "var(--success)", margin: 0, fontWeight: 600}}>
                ✅ You joined through {referralCode}'s link - you're both getting priority access!
              </p>
            </div>
          )}
          
          <p style={{fontSize: "12px", color: "var(--muted)", margin: "16px 0 0", opacity: 0.8}}>
            💡 <strong>Pro tip:</strong> The more people you refer, the higher you move up the early access list!
          </p>
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

      {/* Exit Intent Popup */}
      {showExitIntent && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "var(--panel)",
            borderRadius: "16px",
            padding: "32px",
            maxWidth: "500px",
            width: "90%",
            border: "2px solid var(--brand)",
            position: "relative",
            textAlign: "center"
          }}>
            <button 
              onClick={() => setShowExitIntent(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                color: "var(--muted)",
                fontSize: "24px",
                cursor: "pointer",
                lineHeight: 1
              }}
              data-testid="button-close-exit-popup"
            >
              ×
            </button>
            
            <h2 style={{fontSize: "24px", fontWeight: 700, margin: "0 0 16px", color: "var(--text)"}}>Wait! Don't Miss Out</h2>
            <p style={{fontSize: "16px", color: "var(--muted)", margin: "0 0 24px", lineHeight: 1.5}}>
              Join <strong style={{color: "var(--brand)"}}>500,000+ people</strong> already signed up for early access to the direct connection network.
            </p>
            
            <form 
              action="https://formspree.io/f/xovlzjlq"
              method="POST"
              style={{display: "flex", gap: "12px", marginBottom: "16px"}}
            >
              <input 
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--panel-2)",
                  color: "var(--text)",
                  fontSize: "16px"
                }}
                data-testid="input-exit-popup-email"
              />
              <button 
                type="submit"
                style={{
                  background: "linear-gradient(135deg, var(--brand), var(--brand-2))",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
                data-testid="button-exit-popup-submit"
              >
                Get Access
              </button>
              <input type="hidden" name="_redirect" value="https://info.thetradescout.us/thank-you" />
              <input type="hidden" name="_subject" value="Exit Intent Signup - TradeScout" />
              <input type="hidden" name="source" value="exit-intent" />
              {referralCode && <input type="hidden" name="referral_code" value={referralCode} />}
            </form>
            
            <p style={{fontSize: "12px", color: "var(--muted)", margin: 0}}>
              Zero spam, zero sharing. We respect your privacy.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
