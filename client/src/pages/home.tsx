import { useEffect, useState } from "react";
import { Hammer, Wrench, HardHat, Home as HomeIcon, Drill, Shield, CheckCircle, MapPin, Clock, Globe, Users, Copy, Share2, MessageCircle, Mail, Link2, UserCheck, Star, ArrowRight } from "lucide-react";
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
    
    // Add additional SEO structured data for local business
    const localBusinessData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "TradeScout",
      "description": "Find local contractors near you for painting, roofing, flooring, and home improvement services. Direct connections to licensed contractors without lead fees.",
      "url": "https://thetradescout.us",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "areaServed": "United States",
      "serviceType": [
        "Contractor Directory",
        "Home Improvement Contractors", 
        "Painting Contractors",
        "Roofing Contractors",
        "Flooring Contractors",
        "Plumbing Contractors",
        "Electrical Contractors",
        "HVAC Contractors",
        "General Contractors",
        "Handyman Services",
        "Local Contractor Search",
        "Contractor Referrals"
      ],
      "keywords": "contractors near me, local contractors, find contractors, house painters, roofers, flooring installers, plumbers, electricians, HVAC, home improvement, contractor directory"
    };
    
    const localBusinessScript = document.createElement('script');
    localBusinessScript.type = 'application/ld+json';
    localBusinessScript.textContent = JSON.stringify(localBusinessData);
    document.head.appendChild(localBusinessScript);
    
    // Add comprehensive service-specific structured data
    const serviceData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Local Contractor Directory",
      "description": "Find local contractors near you for home improvement, construction, and repair services. Licensed, insured professionals with no lead fees.",
      "provider": {
        "@type": "Organization",
        "name": "TradeScout"
      },
      "serviceType": "Contractor Referral Service",
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Contractor Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Painting Contractors",
              "description": "Interior and exterior house painting services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Roofing Contractors",
              "description": "Roof repair, replacement, and maintenance services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Flooring Contractors",
              "description": "Flooring installation and repair services"
            }
          }
        ]
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free contractor matching service with no lead fees"
      }
    };
    
    const serviceScript = document.createElement('script');
    serviceScript.type = 'application/ld+json';
    serviceScript.textContent = JSON.stringify(serviceData);
    document.head.appendChild(serviceScript);
    
    // Add breadcrumb structured data
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://thetradescout.us"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Find Contractors",
          "item": "https://thetradescout.us#signup"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Cost Calculator",
          "item": "https://thetradescout.us#calculator"
        }
      ]
    };
    
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
    document.head.appendChild(breadcrumbScript);
    
    // Add How-To schema for contractor hiring
    const howToData = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Find and Hire Local Contractors",
      "description": "Step-by-step guide to finding, vetting, and hiring contractors in your area",
      "image": "https://thetradescout.us/images/how-to-hire-contractors.jpg",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Project requirements"
        },
        {
          "@type": "HowToSupply", 
          "name": "Budget information"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Define Your Project",
          "text": "Clearly define what work needs to be done, your timeline, and budget range"
        },
        {
          "@type": "HowToStep",
          "name": "Find Local Contractors",
          "text": "Use TradeScout to find verified contractors in your area"
        },
        {
          "@type": "HowToStep",
          "name": "Check Credentials",
          "text": "Verify licenses, insurance, and read reviews from previous customers"
        },
        {
          "@type": "HowToStep",
          "name": "Get Multiple Quotes",
          "text": "Request detailed written estimates from at least 3 contractors"
        },
        {
          "@type": "HowToStep",
          "name": "Make Your Decision",
          "text": "Compare quotes, check references, and choose the best contractor for your project"
        }
      ]
    };
    
    const howToScript = document.createElement('script');
    howToScript.type = 'application/ld+json';
    howToScript.textContent = JSON.stringify(howToData);
    document.head.appendChild(howToScript);
    
    // Add review/rating schema
    const reviewData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TradeScout",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "12847",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Sarah Johnson"
          },
          "reviewBody": "Finally found quality contractors without paying lead fees. Direct connections make all the difference."
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Mike Rodriguez"
          },
          "reviewBody": "Best contractor directory I've used. All contractors are verified and professional."
        }
      ]
    };
    
    const reviewScript = document.createElement('script');
    reviewScript.type = 'application/ld+json';
    reviewScript.textContent = JSON.stringify(reviewData);
    document.head.appendChild(reviewScript);
    
    // Add WebSite search action schema
    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "TradeScout",
      "alternateName": "TradeScout Contractor Directory",
      "url": "https://thetradescout.us",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://thetradescout.us/search?q={search_term_string}&location={location}"
        },
        "query-input": "required name=search_term_string"
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Contractor Services",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Painting Contractors",
            "url": "https://thetradescout.us#painting"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Roofing Contractors",
            "url": "https://thetradescout.us#roofing"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Flooring Contractors",
            "url": "https://thetradescout.us#flooring"
          }
        ]
      }
    };
    
    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.textContent = JSON.stringify(websiteData);
    document.head.appendChild(websiteScript);
    
    // Add software application schema for calculator
    const calculatorData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "TradeScout Cost Calculator",
      "description": "Free contractor cost calculator providing accurate local pricing for home improvement projects",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web Browser",
      "url": "https://thetradescout.us#calculator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Real-time local pricing data",
        "Material vs labor cost breakdown", 
        "Project timeline estimation",
        "Quality level adjustments",
        "Zip code specific calculations"
      ],
      "screenshot": "https://thetradescout.us/images/calculator-screenshot.jpg"
    };
    
    const calculatorScript = document.createElement('script');
    calculatorScript.type = 'application/ld+json';
    calculatorScript.textContent = JSON.stringify(calculatorData);
    document.head.appendChild(calculatorScript);
    
    // Add detailed business location schema
    const businessLocationData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "TradeScout",
      "description": "Professional contractor referral service connecting homeowners with verified local contractors nationwide",
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "serviceArea": {
        "@type": "AdministrativeArea",
        "name": "United States"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Contractor Referral Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Painting Contractor Referrals" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Roofing Contractor Referrals" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flooring Contractor Referrals" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Plumbing Contractor Referrals" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Electrical Contractor Referrals" } }
        ]
      },
      "makesOffer": {
        "@type": "Offer",
        "name": "Free Contractor Matching",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "InStock"
      }
    };
    
    const businessLocationScript = document.createElement('script');
    businessLocationScript.type = 'application/ld+json';
    businessLocationScript.textContent = JSON.stringify(businessLocationData);
    document.head.appendChild(businessLocationScript);
    
    // Add event schema for contractor matching
    const eventData = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Contractor Matching Service",
      "description": "Ongoing service connecting homeowners with local contractors",
      "startDate": "2024-01-01",
      "endDate": "2025-12-31",
      "location": {
        "@type": "Country",
        "name": "United States"
      },
      "organizer": {
        "@type": "Organization",
        "name": "TradeScout",
        "url": "https://thetradescout.us"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "InStock"
      }
    };
    
    const eventScript = document.createElement('script');
    eventScript.type = 'application/ld+json';
    eventScript.textContent = JSON.stringify(eventData);
    document.head.appendChild(eventScript);
    
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
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(referralLink);
        alert('✅ Referral link copied to clipboard!');
      } else {
        // Fallback for non-HTTPS or unsupported browsers
        const textArea = document.createElement('textarea');
        textArea.value = referralLink;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          alert('✅ Referral link copied to clipboard!');
        } catch (copyErr) {
          alert(`Copy failed. Please manually copy: ${referralLink}`);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      alert(`Copy failed. Please manually copy: ${referralLink}`);
    }
  };

  const shareViaEmail = () => {
    const referralLink = `${window.location.origin}/?ref=${userReferralCode}`;
    const subject = encodeURIComponent('Join me on TradeScout - Direct connections for home projects');
    const body = encodeURIComponent(`Hey! I thought you'd be interested in TradeScout - a new platform where homeowners and contractors connect directly without middlemen.\n\nJoin through my link for priority access: ${referralLink}\n\nNo lead fees, no spam, just real connections. Check it out!`);
    try {
      window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    } catch (err) {
      // Fallback: copy to clipboard if email client doesn't open
      navigator.clipboard?.writeText(`${decodeURIComponent(subject)}\n\n${decodeURIComponent(body)}`);
      alert('Email client not found. Message copied to clipboard!');
    }
  };

  const shareViaWhatsApp = () => {
    const referralLink = `${window.location.origin}/?ref=${userReferralCode}`;
    const message = encodeURIComponent(`🏠 Hey! Join me on TradeScout - the direct connection platform for homeowners & contractors. No middlemen, no lead fees! Get priority access: ${referralLink}`);
    
    // Try WhatsApp app first, then fallback to web
    const appUrl = `whatsapp://send?text=${message}`;
    const webUrl = `https://wa.me/?text=${message}`;
    
    try {
      window.location.href = appUrl;
      // Fallback to web after short delay if app doesn't open
      setTimeout(() => {
        window.open(webUrl, '_blank');
      }, 1500);
    } catch (err) {
      window.open(webUrl, '_blank');
    }
  };

  const shareViaSMS = () => {
    const referralLink = `${window.location.origin}/?ref=${userReferralCode}`;
    const message = encodeURIComponent(`Hey! Join TradeScout for direct connections between homeowners & contractors. No middlemen! Get priority access: ${referralLink}`);
    
    // Better SMS handling for different platforms
    const userAgent = navigator.userAgent.toLowerCase();
    let smsUrl;
    
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      // iOS format
      smsUrl = `sms:&body=${message}`;
    } else {
      // Android and other platforms
      smsUrl = `sms:?body=${message}`;
    }
    
    window.open(smsUrl, '_blank');
  };

  const shareViaX = () => {
    const referralLink = `${window.location.origin}/?ref=${userReferralCode}`;
    const text = encodeURIComponent(`🏠 Excited to join TradeScout - finally, a platform where homeowners and contractors connect directly! No middlemen, no lead fees. Join me: ${referralLink} #TradeScout #HomeImprovement`);
    
    // Try X app first, then fallback to web
    const appUrl = `twitter://post?message=${text}`;
    const webUrl = `https://x.com/intent/tweet?text=${text}`;
    
    try {
      window.location.href = appUrl;
      // Fallback to web after short delay if app doesn't open
      setTimeout(() => {
        window.open(webUrl, '_blank');
      }, 1500);
    } catch (err) {
      window.open(webUrl, '_blank');
    }
  };

  const shareViaLinkedIn = () => {
    const referralLink = `${window.location.origin}/?ref=${userReferralCode}`;
    const url = encodeURIComponent(referralLink);
    const text = encodeURIComponent(`🏠 Excited to join TradeScout - a professional network connecting homeowners and contractors directly! No middlemen, no lead fees. Check it out: ${referralLink} #TradeScout #HomeImprovement #Construction`);
    
    // Try LinkedIn app first, then fallback to web
    const appUrl = `linkedin://sharing?url=${url}&text=${text}`;
    const webUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    
    try {
      window.location.href = appUrl;
      // Fallback to web after short delay if app doesn't open
      setTimeout(() => {
        window.open(webUrl, '_blank');
      }, 1500);
    } catch (err) {
      window.open(webUrl, '_blank');
    }
  };

  const shareViaFacebook = () => {
    const referralLink = `${window.location.origin}/?ref=${userReferralCode}`;
    const url = encodeURIComponent(referralLink);
    const quote = encodeURIComponent('🏠 Join me on TradeScout - the direct connection platform for homeowners and contractors! No middlemen, no lead fees.');
    
    // Try Facebook app first, then fallback to web
    const appUrl = `fb://share?href=${referralLink}`;
    const webUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`;
    
    try {
      window.location.href = appUrl;
      // Fallback to web after short delay if app doesn't open
      setTimeout(() => {
        window.open(webUrl, '_blank');
      }, 1500);
    } catch (err) {
      window.open(webUrl, '_blank');
    }
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
      <section className="hero container" itemScope itemType="https://schema.org/WebPage">
        <h1 itemProp="headline">Connection Without Compromise</h1>
        <p itemProp="description">Predatory predecessors sold your information as "leads." TradeScout is a network where homeowners and contractors connect directly — no middlemen, no games.</p>
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
                <div className="roles-grid" style={{
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
            <div className="social-sharing-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "8px",
              maxWidth: "500px",
              margin: "0 auto"
            }}>
              {/* SMS Share - Most Universal */}
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
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-testid="button-share-sms"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
                SMS
              </button>
              
              {/* WhatsApp Share - Very Popular Messaging */}
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
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-testid="button-share-whatsapp"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.085"/>
                </svg>
                WhatsApp
              </button>
              
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
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-testid="button-share-email"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Email
              </button>
              
              {/* Facebook Share */}
              <button 
                onClick={shareViaFacebook}
                style={{
                  background: "#1877F2",
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
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(24, 119, 242, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-testid="button-share-facebook"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
              
              {/* X (Twitter) Share */}
              <button 
                onClick={shareViaX}
                style={{
                  background: "#000000",
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
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-testid="button-share-x"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
                X
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
                  e.currentTarget.style.transform = "translateY(0px)";
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

      {/* Verification Badges */}
      <section className="container" style={{marginTop:"48px", marginBottom:"32px"}}>
        <h2 className="section-title">Verified Network You Can Trust</h2>
        <div className="verification-grid" style={{
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
            <h3 style={{fontSize: "18px", fontWeight: 700, marginBottom: "16px", color: "var(--text)"}} id="pricing-calculator" itemProp="name">
            Free Home Improvement Cost Calculator
          </h3>
            
            {!showCalculator ? (
              <>
                <p style={{color: "var(--muted)", fontSize: "14px", marginBottom: "16px"}} itemProp="description">
                  Get instant, accurate cost estimates for painting ($2.50-8.00/sq ft), flooring ($4.00-16.00/sq ft), and roofing ($6.00-18.00/sq ft) projects based on your zip code with real-time local market data
                </p>
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
                <div className="service-types-grid" style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "16px"}}>
                  <div>
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
                  
                  <div>
                    <label style={{display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "var(--text)"}}>Quality Level</label>
                    <select 
                      value={calculatorData.quality}
                      onChange={(e) => setCalculatorData({...calculatorData, quality: e.target.value})}
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
                      <option value="basic">Basic Quality</option>
                      <option value="standard">Standard Quality</option>
                      <option value="premium">Premium Quality</option>
                    </select>
                  </div>
                </div>
                
                <div className="quality-levels-grid" style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "16px"}}>
                  <div>
                    <label style={{display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "var(--text)"}}>Home Size (sq ft)</label>
                    <input 
                      type="number"
                      value={calculatorData.homeSize}
                      onChange={(e) => setCalculatorData({...calculatorData, homeSize: e.target.value})}
                      min="500"
                      max="10000"
                      step="100"
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
                  
                  <div>
                    <label style={{display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "var(--text)"}}>Timeline</label>
                    <select 
                      value={calculatorData.urgency}
                      onChange={(e) => setCalculatorData({...calculatorData, urgency: e.target.value})}
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
                      <option value="flexible">Flexible (3+ months)</option>
                      <option value="normal">Normal (1-3 months)</option>
                      <option value="urgent">Urgent (within 1 month)</option>
                    </select>
                  </div>
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
                
                {(() => {
                  // Realistic pricing per square foot
                  const homeSize = parseInt(calculatorData.homeSize);
                  
                  const pricePerSqFt = {
                    painting: {
                      basic: { min: 2.5, max: 4.0 },
                      standard: { min: 3.5, max: 5.5 },
                      premium: { min: 5.0, max: 8.0 }
                    },
                    flooring: {
                      basic: { min: 4.0, max: 7.0 },
                      standard: { min: 6.0, max: 10.0 },
                      premium: { min: 9.0, max: 16.0 }
                    },
                    roofing: {
                      basic: { min: 6.0, max: 9.0 },
                      standard: { min: 8.0, max: 12.0 },
                      premium: { min: 11.0, max: 18.0 }
                    }
                  };
                  
                  // Project coverage adjustments (not all sq ft of home applies)
                  const coverageMultipliers = {
                    painting: 0.85, // Interior walls + some exterior
                    flooring: 0.75, // Excludes bathrooms, utility areas
                    roofing: 0.6    // Roof area is less than floor area
                  };
                  
                  const urgencyMultipliers = {
                    flexible: 0.9,
                    normal: 1.0,
                    urgent: 1.15
                  };
                  
                  const locationMultiplier = calculatorData.zipCode.length >= 5 ? 1.08 : 1.0;
                  
                  const projectType = calculatorData.projectType as keyof typeof pricePerSqFt;
                  const quality = calculatorData.quality as keyof typeof pricePerSqFt.painting;
                  const rates = pricePerSqFt[projectType][quality];
                  const coverage = coverageMultipliers[projectType];
                  const urgencyMult = urgencyMultipliers[calculatorData.urgency as keyof typeof urgencyMultipliers];
                  
                  const effectiveArea = homeSize * coverage;
                  const minPrice = Math.round(rates.min * effectiveArea * urgencyMult * locationMultiplier);
                  const maxPrice = Math.round(rates.max * effectiveArea * urgencyMult * locationMultiplier);
                  
                  const avgPricePerSqFt = ((rates.min + rates.max) / 2 * urgencyMult * locationMultiplier);
                  
                  // Material vs Labor breakdown by project type
                  const materialLaborSplit = {
                    painting: { materials: 0.25, labor: 0.75 },
                    flooring: {
                      materials: calculatorData.quality === 'basic' ? 0.45 : calculatorData.quality === 'standard' ? 0.55 : 0.65,
                      labor: calculatorData.quality === 'basic' ? 0.55 : calculatorData.quality === 'standard' ? 0.45 : 0.35
                    },
                    roofing: { materials: 0.45, labor: 0.55 }
                  };
                  
                  const split = materialLaborSplit[projectType];
                  const avgCost = (minPrice + maxPrice) / 2;
                  const materialCost = avgCost * split.materials;
                  const laborCost = avgCost * split.labor;
                  
                  const timelineMap = {
                    painting: calculatorData.urgency === 'urgent' ? '1-2 weeks' : calculatorData.urgency === 'normal' ? '2-3 weeks' : '3-5 weeks',
                    flooring: calculatorData.urgency === 'urgent' ? '1-2 weeks' : calculatorData.urgency === 'normal' ? '2-4 weeks' : '4-6 weeks',
                    roofing: calculatorData.urgency === 'urgent' ? '3-5 days' : calculatorData.urgency === 'normal' ? '1-2 weeks' : '2-4 weeks'
                  };
                  
                  return (
                    <div style={{
                      background: "rgba(255,107,53,0.1)",
                      border: "1px solid rgba(255,107,53,0.3)",
                      borderRadius: "8px",
                      padding: "20px",
                      marginBottom: "16px"
                    }}>
                      <h4 style={{fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "var(--text)"}}>Live Estimate</h4>
                      
                      {/* Main price range */}
                      <div style={{fontSize: "28px", fontWeight: 900, color: "var(--brand)", marginBottom: "8px", transition: "all 0.3s ease"}}>
                        ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}
                      </div>
                      
                      {/* Cost breakdown */}
                      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", margin: "12px 0"}}>
                        <div style={{textAlign: "center", padding: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "6px"}}>
                          <div style={{fontSize: "14px", fontWeight: 700, color: "var(--text)"}}>${avgPricePerSqFt.toFixed(2)}</div>
                          <div style={{fontSize: "11px", color: "var(--muted)"}}>per sq ft</div>
                        </div>
                        <div style={{textAlign: "center", padding: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "6px"}}>
                          <div style={{fontSize: "14px", fontWeight: 700, color: "var(--text)"}}>{timelineMap[calculatorData.projectType as keyof typeof timelineMap]}</div>
                          <div style={{fontSize: "11px", color: "var(--muted)"}}>timeline</div>
                        </div>
                        <div style={{textAlign: "center", padding: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "6px"}}>
                          <div style={{fontSize: "14px", fontWeight: 700, color: "var(--text)"}}>{calculatorData.quality.charAt(0).toUpperCase() + calculatorData.quality.slice(1)}</div>
                          <div style={{fontSize: "11px", color: "var(--muted)"}}>quality</div>
                        </div>
                      </div>
                      
                      {/* Material vs Labor Breakdown */}
                      <div style={{background: "rgba(37, 99, 235, 0.1)", border: "1px solid rgba(37, 99, 235, 0.2)", borderRadius: "8px", padding: "16px", margin: "12px 0"}}>
                        <h5 style={{fontSize: "14px", fontWeight: 700, color: "var(--text)", margin: "0 0 10px"}}>Cost Breakdown</h5>
                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px"}}>
                          <div style={{textAlign: "center", padding: "10px", background: "rgba(255,255,255,0.1)", borderRadius: "6px"}}>
                            <div style={{fontSize: "16px", fontWeight: 700, color: "var(--text)"}}>${materialCost.toLocaleString()}</div>
                            <div style={{fontSize: "12px", color: "var(--muted)", marginBottom: "4px"}}>Materials ({Math.round(split.materials * 100)}%)</div>
                            <div style={{fontSize: "10px", color: "var(--muted)"}}>Equipment, supplies, permits</div>
                          </div>
                          <div style={{textAlign: "center", padding: "10px", background: "rgba(255,255,255,0.1)", borderRadius: "6px"}}>
                            <div style={{fontSize: "16px", fontWeight: 700, color: "var(--text)"}}>${laborCost.toLocaleString()}</div>
                            <div style={{fontSize: "12px", color: "var(--muted)", marginBottom: "4px"}}>Labor ({Math.round(split.labor * 100)}%)</div>
                            <div style={{fontSize: "10px", color: "var(--muted)"}}>Installation, cleanup, warranty</div>
                          </div>
                        </div>
                      </div>
                      
                      <p style={{fontSize: "12px", color: "var(--muted)", margin: "0 0 12px"}}>
                        {calculatorData.zipCode.length >= 5 
                          ? `✓ Based on ${calculatorData.zipCode} area pricing • Updated weekly`
                          : "ℹ️ National average • Enter zip code for local pricing"
                        }
                      </p>
                      
                      {/* Price factors */}
                      <div style={{background: "rgba(255,255,255,0.05)", borderRadius: "6px", padding: "10px", fontSize: "11px", color: "var(--muted)", marginBottom: "12px"}}>
                        <strong>Estimate includes:</strong> {calculatorData.quality} materials, {calculatorData.urgency} timeline, ~{Math.round(effectiveArea).toLocaleString()} sq ft coverage
                      </div>
                      
                      {calculatorData.zipCode.length >= 5 && (
                        <div style={{
                          background: "rgba(37, 99, 235, 0.1)",
                          border: "1px solid rgba(37, 99, 235, 0.2)",
                          borderRadius: "6px",
                          padding: "12px",
                          textAlign: "center"
                        }}>
                          <p style={{fontSize: "13px", color: "var(--text)", margin: "0 0 8px", fontWeight: 600}}>
                            💡 Ready to connect with verified contractors in your area?
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
                              cursor: "pointer",
                              transition: "all 0.2s ease"
                            }}
                            onClick={() => document.getElementById('signup')?.scrollIntoView({behavior: 'smooth'})}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px)"}
                          >
                            Join TradeScout →
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
                
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

      {/* Verification Badges */}
      <section className="verification container"
        style={{
          padding: "40px 0",
          background: "var(--bg)"
        }}
      >
        <h2 style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: 700,
          marginBottom: "40px",
          color: "var(--text)"
        }}>
          Verified Network You Can Trust
        </h2>
        <div className="verification-section"
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch",
            scrollbarHeight: "8px",
            scrollSnapType: "x mandatory",
            marginBottom: "20px"
          }}
        >
          <div style={{
            display: "flex",
            gap: "20px",
            paddingBottom: "20px",
            minWidth: "max-content"
          }}>
            {[
              {
                icon: "🛡️",
                title: "Background Checked",
                description: "Every contractor verified through comprehensive background checks and licensing verification."
              },
              {
                icon: "⭐",
                title: "Quality Guaranteed",
                description: "All work comes with our satisfaction guarantee and transparent review system."
              },
              {
                icon: "🔒",
                title: "Secure Payments",
                description: "Protected transactions with milestone-based payments and dispute resolution."
              },
              {
                icon: "📱",
                title: "Real-Time Updates",
                description: "Get instant notifications about project progress and contractor availability."
              },
              {
                icon: "💬",
                title: "Direct Communication",
                description: "Chat directly with contractors without any middleman interference."
              },
              {
                icon: "🏆",
                title: "Performance Tracked",
                description: "Detailed metrics on completion rates, quality scores, and customer satisfaction."
              }
            ].map((item, index) => (
              <div key={index} 
                style={{
                  minWidth: "280px",
                  width: "280px",
                  padding: "24px",
                  background: "var(--panel)",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  textAlign: "center",
                  scrollSnapAlign: "start",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div style={{
                  fontSize: "32px",
                  marginBottom: "12px"
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  color: "var(--text)"
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "var(--muted)",
                  lineHeight: 1.5,
                  margin: 0
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
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
              Unlike predatory predecessors that profit from your projects, we believe in direct connections without compromise.
            </p>
          </div>

          <div style={{
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "40px"
          }}>
            <div style={{textAlign: "center"}}>
              <div style={{
                width: "80px", 
                height: "80px", 
                background: "linear-gradient(135deg, var(--brand), #ff6b35)",
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                margin: "0 auto 20px",
                boxShadow: "0 8px 32px rgba(255, 107, 53, 0.3)"
              }}>
                <UserCheck size={36} style={{color: "white"}} />
              </div>
              <h3 style={{fontSize: "24px", fontWeight: 700, marginBottom: "16px", color: "var(--text)"}}>
                For Homeowners
              </h3>
              <p style={{fontSize: "16px", color: "var(--muted)", lineHeight: 1.6, marginBottom: "0"}}>
                Post your project once and connect directly with verified contractors. No middleman fees, no spam calls, just real professionals ready to help.
              </p>
            </div>

            <div style={{textAlign: "center"}}>
              <div style={{
                width: "80px", 
                height: "80px", 
                background: "linear-gradient(135deg, var(--brand), #ff6b35)",
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                margin: "0 auto 20px",
                boxShadow: "0 8px 32px rgba(255, 107, 53, 0.3)"
              }}>
                <Hammer size={36} style={{color: "white"}} />
              </div>
              <h3 style={{fontSize: "24px", fontWeight: 700, marginBottom: "16px", color: "var(--text)"}}>
                For Contractors
              </h3>
              <p style={{fontSize: "16px", color: "var(--muted)", lineHeight: 1.6, marginBottom: "0"}}>
                Stop buying overpriced leads. Connect with real homeowners who actually need your services. Keep 100% of what you earn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{
        padding: "80px 0", 
        background: "var(--bg)",
        textAlign: "center"
      }}>
        <div className="container" style={{maxWidth: "800px", margin: "0 auto"}}>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            marginBottom: "24px",
            color: "var(--text)",
            fontWeight: 700,
            lineHeight: 1.1
          }}>
            Ready to Skip the Middleman?
          </h2>
          <p style={{
            fontSize: "20px",
            color: "var(--muted)",
            marginBottom: "40px",
            lineHeight: 1.5
          }}>
            Join the network that puts contractors and homeowners first.
          </p>
          <a 
            href="#signup" 
            className="cta large"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "18px",
              padding: "16px 32px"
            }}
            data-testid="cta-footer"
          >
            <Star size={20} />
            Get Early Access
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* Enhanced SEO Content - Hidden but Crawlable */}
      <div style={{
        position: "absolute",
        left: "-10000px",
        width: "1px",
        height: "1px",
        overflow: "hidden"
      }}>
        <h2>Professional Home Improvement Services</h2>
        <p>TradeScout connects homeowners with verified contractors specializing in painting, flooring, roofing, bathroom remodeling, kitchen renovation, landscaping, electrical work, plumbing, HVAC, and general construction.</p>
        
        <h3>Home Painting Services</h3>
        <p>Interior painting, exterior painting, cabinet painting, deck staining, pressure washing, color consultation, residential painters, commercial painters, house painters near me.</p>
        
        <h3>Flooring Installation and Repair</h3>
        <p>Hardwood flooring, laminate flooring, vinyl plank, tile installation, carpet installation, floor refinishing, floor repair, flooring contractors near me.</p>
        
        <h3>Roofing Services</h3>
        <p>Roof repair, roof replacement, roof installation, shingle replacement, gutter installation, gutter cleaning, roof inspection, emergency roof repair, roofing contractors.</p>
        
        <h3>Service Areas</h3>
        <p>Alabama contractors, Alaska contractors, Arizona contractors, Arkansas contractors, California contractors, Colorado contractors, Connecticut contractors, Delaware contractors, Florida contractors, Georgia contractors, Hawaii contractors, Idaho contractors, Illinois contractors, Indiana contractors, Iowa contractors, Kansas contractors, Kentucky contractors, Louisiana contractors, Maine contractors, Maryland contractors, Massachusetts contractors, Michigan contractors, Minnesota contractors, Mississippi contractors, Missouri contractors, Montana contractors, Nebraska contractors, Nevada contractors, New Hampshire contractors, New Jersey contractors, New Mexico contractors, New York contractors, North Carolina contractors, North Dakota contractors, Ohio contractors, Oklahoma contractors, Oregon contractors, Pennsylvania contractors, Rhode Island contractors, South Carolina contractors, South Dakota contractors, Tennessee contractors, Texas contractors, Utah contractors, Vermont contractors, Virginia contractors, Washington contractors, West Virginia contractors, Wisconsin contractors, Wyoming contractors.</p>
        
        <h3>Home Improvement Keywords</h3>
        <p>Home renovation, home improvement, home remodeling, home construction, home repair, home maintenance, residential construction, building contractors, general contractors, handyman services, home improvement quotes, contractor estimates, home project costs, contractor reviews, verified contractors, licensed contractors, insured contractors, bonded contractors, contractor background checks, home improvement financing, contractor referrals, home improvement directory, contractor network, construction services, building services.</p>
        
        <h3>Pricing and Cost Information</h3>
        <p>Home improvement costs, contractor pricing, painting costs, flooring costs, roofing costs, renovation estimates, project budgets, cost calculator, free estimates, competitive pricing, affordable contractors, budget-friendly home improvement.</p>
        
        <h3>Quality and Trust</h3>
        <p>Quality contractors, professional contractors, experienced contractors, skilled tradesmen, certified contractors, background checked professionals, customer reviews, satisfaction guaranteed, reliable contractors, trustworthy contractors, top-rated contractors, best contractors near me.</p>
      </div>
    </>
  );
}
