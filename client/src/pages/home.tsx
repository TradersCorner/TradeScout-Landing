import React, { useState, useEffect } from 'react';
import { Hammer, Wrench, HardHat, HomeIcon, Drill, Shield, Briefcase, Share2 } from 'lucide-react';
import Hero from '@/components/hero';
import Features from '@/components/features';
import SignupForm from '@/components/signup-form';
import Footer from '@/components/footer';

export default function Home() {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
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

  // Track affiliate source from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const partner = urlParams.get('partner');
    if (partner) setAffiliateSource(partner);
  }, []);

  return (
    <div>
      {/* Header with Orange Styling */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-bg/70 border-b border-white/6">
        <div className="w-full max-w-container mx-auto px-4">
          <nav className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-2.5" style={{color: 'var(--brand)'}}>
              <div style={{color: 'var(--brand)'}}>
                {constructionLogos[currentLogoIndex]}
              </div>
              <span className="font-black text-xl tracking-wider" style={{color: 'var(--brand)'}}>TradeScout</span>
            </div>
            
            <button 
              onClick={() => document.getElementById('signup')?.scrollIntoView({behavior: 'smooth'})}
              className="inline-flex items-center gap-2.5 brand-gradient text-white px-4 py-3 rounded-full font-extrabold cursor-pointer shadow-lg shadow-brand/20 hover:-translate-y-0.5 focus:outline-none focus:ring-3 focus:ring-brand/35 transition-transform duration-150"
              data-testid="button-early-access"
            >
              Get Early Access
            </button>
          </nav>
        </div>
      </header>

      {/* Original Hero Section */}
      <Hero />

      {/* Original Features Section */}
      <Features />

      {/* NEW: Trade Partner Benefits Section */}
      <section style={{padding: '60px 0', marginTop: '40px'}}>
        <div className="w-full max-w-container mx-auto px-4">
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
            
            {/* Trade Partner Link for visitors with affiliate source */}
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

      {/* Original Signup Form */}
      <SignupForm />

      {/* Original Footer */}
      <Footer />
    </div>
  );
}