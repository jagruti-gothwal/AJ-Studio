"use client";

import { useState, useEffect, useRef } from "react";

const SERVICES = [
  {
    num: "01",
    title: "UI/UX Design",
    desc: "Intuitive, engaging digital interfaces that improve usability and turn complex product workflows into seamless user journeys.",
    items: [
      "Website UI/UX Design",
      "Mobile Application Design",
      "SaaS & Dashboard Design",
      "CRM & ERP Interface Design",
      "Wireframing & Prototyping",
      "Design Systems",
    ],
  },
  {
    num: "02",
    title: "Website Design & Development",
    desc: "Modern, ultra-fast websites built with Next.js and clean code that communicate your brand and convert visitors into customers.",
    items: [
      "Business Websites",
      "Portfolio Websites",
      "Landing Pages & Funnels",
      "Website Redesign",
      "Responsive Frontend (Next.js)",
      "Website Speed & SEO Optimization",
    ],
  },
  {
    num: "03",
    title: "Business Solutions",
    desc: "Optimize and automate your operational workflows through custom CRM configurations, data dashboards, and third-party integrations.",
    items: [
      "CRM Customization",
      "Zoho CRM Workflows",
      "Dashboards & Reporting",
      "Process Automation",
      "Business Application Interfaces",
      "Third-Party Integrations",
    ],
  },
  {
    num: "04",
    title: "Branding & Creative Design",
    desc: "Cohesive visual identities and scroll-stopping digital brand assets tailored to give your business an authoritative presence.",
    items: [
      "Logo Design",
      "Brand Identity & Style Guides",
      "Social Media Creatives",
      "Marketing Graphics",
      "Presentation Design",
      "Digital Brand Assets",
    ],
  },
];

const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "Kaushik Sampath",
    client: "India Codes",
    clientType: "Search Directory & Tech Blog",
    logo: "/assets/indiacodes_logo.png",
    image: "/assets/project_kaushik.jpg",
    tags: ["UI/UX Design", "Web Development", "PIN & IFSC Search"],
    desc: "A fast, responsive web platform and blog for Kaushik Sampath, powering India Codes with search tools for India's Postal/PIN codes, banking IFSC and SWIFT codes, STD/ISD directories, and developer articles.",
    link: "https://indiacodes.co.in/",
    tech: ["Next.js", "Directory Engine", "REST APIs", "SEO Architecture"],
  },
  {
    id: 2,
    num: "02",
    title: "Jahan Polymers",
    client: "JP JumboLite®",
    clientType: "Polymers Manufacturer",
    logo: "/assets/jahan_logo.jpg",
    image: "/assets/project_jahan.jpg",
    tags: ["Industrial B2B", "Product Catalog", "Instant RFQ"],
    desc: "A modern B2B platform engineered for Jahan Polymers Private Limited, India's leading polymers company and manufacturer of JP JumboLite® polycarbonate compact sheets. Features digital catalogs and automated quote request flows.",
    link: "https://jumbolite.co.in/",
    tech: ["Next.js", "B2B Catalog", "Quote Automation", "Responsive UI"],
  },
  {
    id: 3,
    num: "03",
    title: "Tree India Exports",
    client: "Tree India Exports",
    clientType: "Global Confectionery Exporter",
    logo: "/assets/treeindia_logo.png",
    image: "/assets/project_treeindia.jpg",
    tags: ["Global Exporter", "FMCG Showcase", "15+ Countries"],
    desc: "A vibrant international export platform built for Tree India, delivering premium Indian confectionery, candies, lollipops, biscuits, and chocolates across 15+ countries worldwide with global compliance showcases.",
    link: "https://www.treeindiaexports.com/",
    tech: ["Next.js", "Global Trade Desk", "FMCG Catalog", "Performance UI"],
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "We understand your business, goals, audience, and project requirements through an in-depth discovery session.",
  },
  {
    num: "02",
    title: "Plan",
    desc: "We define the comprehensive project scope, timeline, deliverables, architecture, and technical approach.",
  },
  {
    num: "03",
    title: "Design",
    desc: "We create user journeys, wireframes, and high-fidelity interactive prototypes in Figma with pixel-perfect precision.",
  },
  {
    num: "04",
    title: "Develop",
    desc: "We bring the approved designs to life using modern Next.js, clean scalable code, and performant web technologies.",
  },
  {
    num: "05",
    title: "Deliver",
    desc: "Rigorous quality testing, cross-device responsiveness check, and seamless production deployment.",
  },
  {
    num: "06",
    title: "Support",
    desc: "We provide agreed post-launch support, monitoring, and iterative improvements to support your business growth.",
  },
];

const WHY_US = [
  {
    icon: "💬",
    title: "Direct Communication",
    desc: "You talk directly with the specialist executing your project — no middle managers or lost requirements.",
  },
  {
    icon: "🎯",
    title: "Thoughtful Design Decisions",
    desc: "Every layout, button, and typography choice is purposefully crafted to solve specific business problems.",
  },
  {
    icon: "⚡",
    title: "Practical Development Approach",
    desc: "We engineer with modern, dependable stacks like Next.js for blazing fast performance and search ranking.",
  },
  {
    icon: "📋",
    title: "Transparent Project Scope",
    desc: "Clear timelines, defined milestones, and upfront scope so you always know what to expect.",
  },
  {
    icon: "✨",
    title: "Focus on Usability & Quality",
    desc: "Aesthetic interfaces that are remarkably simple for real humans to navigate and use effortlessly.",
  },
  {
    icon: "💼",
    title: "Aligned with Business Goals",
    desc: "Design + Development + Business Understanding: Solutions engineered to generate measurable business results.",
  },
];

const FAQS = [
  {
    q: "Is AJ Studio an agency or an independent studio?",
    a: "AJ Studio is an independent digital design and development studio working directly with businesses, founders, and companies on high-impact digital projects.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. Project inquiries from India and international markets across the globe are very welcome. All communication and project reviews are conducted smoothly via Google Meet, email, and WhatsApp.",
  },
  {
    q: "Can I hire AJ Studio for a single project?",
    a: "Yes. We work on fixed-scope individual projects (such as a website build, dashboard redesign, or brand identity) as well as ongoing advisory engagements.",
  },
  {
    q: "Do you provide website redesign services?",
    a: "Yes. We can modernize and rebuild your existing website through UI/UX overhaul, improved conversion architecture, faster load speeds, and modern Next.js engineering.",
  },
  {
    q: "How do I start a project?",
    a: "Simply reach out through the contact form or email us at ajstudio.projects@gmail.com with your project outline. We'll review your requirements, schedule a quick discovery call, and share a tailored proposal.",
  },
  {
    q: "Do you provide maintenance and ongoing support?",
    a: "Yes. Post-launch maintenance, feature enhancements, and ongoing updates can be agreed upon separately based on your product roadmap.",
  },
];

const TRACKS = [
  { title: "Midnight Dreams", artist: "Lofi Aesthetic", emoji: "🌙" },
  { title: "Azure Horizon", artist: "Chill Synth", emoji: "☁️" },
  { title: "Linear Waves", artist: "Modern Ambient", emoji: "🌊" },
  { title: "Skyline Focus", artist: "Deep Chill", emoji: "✨" },
];

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Music Player
  const [musicOpen, setMusicOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      progressRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setTrackIdx((i) => (i + 1) % TRACKS.length);
            return 0;
          }
          return p + 0.4;
        });
      }, 300);
    } else {
      if (progressRef.current) clearInterval(progressRef.current);
    }
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [playing]);

  const nextTrack = () => {
    setTrackIdx((i) => (i + 1) % TRACKS.length);
    setProgress(0);
  };
  const prevTrack = () => {
    setTrackIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const currentTrack = TRACKS[trackIdx];

  return (
    <>
      {/* ====================================================================
          HERO SECTION (Vibrant Sky Blue Card with Clouds & 3D Arc)
          ==================================================================== */}
      <div className="hero-wrapper">
        <header className="hero-card">
          {/* Top Navbar */}
          <nav className="hero-navbar" aria-label="Main Navigation">
            <a href="#home" className="hero-brand">
              <span className="hero-logo-icon">
                {/* Stylized cloud-bridge logo mark */}
                <svg width="26" height="20" viewBox="0 0 26 20" fill="currentColor">
                  <path d="M2 18V9.5C2 5.91 4.91 3 8.5 3C10.53 3 12.33 3.93 13.5 5.38C14.67 3.93 16.47 3 18.5 3C22.09 3 25 5.91 25 9.5V18H20.5V10C20.5 8.34 19.16 7 17.5 7C15.84 7 14.5 8.34 14.5 10V18H10.5V10C10.5 8.34 9.16 7 7.5 7C5.84 7 4.5 8.34 4.5 10V18H2Z" fill="white"/>
                </svg>
              </span>
              <span>AJ Studio</span>
            </a>

            {/* Desktop Navigation Links */}
            <ul className="hero-nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>

            {/* Right Action Button */}
            <div className="hero-nav-right">
              <a href="#contact" className="btn-lime">
                Start a Project
              </a>
              <button
                className="hero-mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  {mobileMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  ) : (
                    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div style={{
              background: "rgba(15, 23, 42, 0.96)",
              padding: "1.5rem",
              borderRadius: "16px",
              margin: "0 1.5rem 1rem",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              zIndex: 100,
            }}>
              <a href="#home" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", fontWeight: 600 }}>Home</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", fontWeight: 600 }}>Services</a>
              <a href="#work" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", fontWeight: 600 }}>Work</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", fontWeight: 600 }}>About</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", fontWeight: 600 }}>Process</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", fontWeight: 600 }}>FAQ</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", fontWeight: 600 }}>Contact</a>
              <a href="#contact" className="btn-lime" onClick={() => setMobileMenuOpen(false)} style={{ justifyContent: "center" }}>
                Start a Project ↗
              </a>
            </div>
          )}

          {/* Hero Center Text Content */}
          <div className="hero-center" id="home">
            <div className="hero-tagline-pill">
              <span>⚡</span> Ideas into Digital Experiences
            </div>
            <h1 className="hero-heading">
              Design. Develop. Deliver.<br />
              Digital solutions for brands.
            </h1>
            <p className="hero-subtitle">
              AJ Studio is an independent digital design and development studio helping businesses transform ideas into meaningful digital experiences through thoughtful design, modern technology and business understanding.
            </p>
            <div className="hero-cta-group">
              <a href="#work" className="btn-glass">
                Explore Our Work
              </a>
              <a href="#contact" className="btn-lime">
                Start a Project
                <span className="btn-lime-circle">↗</span>
              </a>
            </div>
          </div>

          {/* 3D Curved Ribbon of Floating Showcase Cards */}
          <div className="hero-showcase-wrap">
            <div className="hero-arc-container">
              {/* Card 1: Vertical Bar Chart */}
              <div className="arc-card card-bar-chart card-pos-1">
                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#0284c7" }}>Growth Index</span>
                <div className="mini-bar-row">
                  <div className="mini-bar" style={{ height: "30%" }} />
                  <div className="mini-bar" style={{ height: "55%" }} />
                  <div className="mini-bar" style={{ height: "45%" }} />
                  <div className="mini-bar" style={{ height: "80%" }} />
                  <div className="mini-bar" style={{ height: "100%" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "#64748b" }}>
                  <span>Q1</span>
                  <span style={{ color: "#16a34a", fontWeight: 700 }}>+48%</span>
                </div>
              </div>

              {/* Card 2: Financial Metrics Card */}
              <div className="arc-card card-metrics card-pos-2">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 600 }}>Efficiency</span>
                  <span className="card-metrics-badge">+24.8%</span>
                </div>
                <div className="card-metrics-val">99.4%</div>
                <svg className="mini-sparkline" viewBox="0 0 100 35" fill="none">
                  <path d="M0 28 Q 20 22 40 25 T 70 12 T 100 4" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M0 28 Q 20 22 40 25 T 70 12 T 100 4 L 100 35 L 0 35 Z" fill="rgba(34, 197, 94, 0.12)" />
                </svg>
              </div>

              {/* Card 3: SaaS / CRM Card */}
              <div className="arc-card card-saas-crm card-pos-3">
                <div className="saas-crm-head">
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#0f172a" }}>CRM Engine</span>
                  <span className="saas-crm-pill">Active</span>
                </div>
                <div style={{ padding: "0.4rem 0" }}>
                  <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Automated Leads</div>
                  <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a" }}>1,480+</div>
                </div>
                <div style={{ fontSize: "0.65rem", color: "#16a34a", fontWeight: 700 }}>
                  ● Zoho &amp; Next.js Synced
                </div>
              </div>

              {/* Card 4: Analytics Area Chart */}
              <div className="arc-card card-area-chart card-pos-4">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="title">Engagement</span>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0284c7" }} />
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a" }}>94.6%</div>
                <svg viewBox="0 0 120 40" fill="none" style={{ width: "100%", height: "45px" }}>
                  <path d="M0 32 C 30 35, 45 15, 75 18 C 95 20, 105 5, 120 4" stroke="#0284c7" strokeWidth="2.5" fill="none" />
                  <path d="M0 32 C 30 35, 45 15, 75 18 C 95 20, 105 5, 120 4 L 120 40 L 0 40 Z" fill="rgba(2, 132, 199, 0.15)" />
                  <circle cx="120" cy="4" r="3.5" fill="#0284c7" />
                </svg>
              </div>

              {/* Card 5: Dark Expertise Card */}
              <div className="arc-card card-dark-expertise card-pos-5">
                <div className="pill">● Core Focus</div>
                <div className="text">
                  Thoughtful UI/UX &amp;<br />
                  Modern Web Engineering
                </div>
                <div style={{ fontSize: "0.68rem", color: "#94a3b8" }}>Design + Code</div>
              </div>

              {/* Card 6: Cyan Frosted Glass Play Card */}
              <div className="arc-card card-cyan-glass card-pos-6">
                <div className="play-btn-circle">▶</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.02em" }}>Interactive</div>
              </div>

              {/* Card 7: 520k+ Stats Dashboard Card */}
              <div className="arc-card card-stats-preview card-pos-7">
                <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
                  <span className="label">Monthly Flow</span>
                  <span>•••</span>
                </div>
                <div className="num">520k+</div>
                <div style={{ height: "6px", width: "100%", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: "82%", height: "100%", background: "#0284c7" }} />
                </div>
              </div>

              {/* Card 8: Mobile Preview Card */}
              <div className="arc-card card-mobile-preview card-pos-8">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.65rem", color: "#94a3b8" }}>Mobile UX</span>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
                </div>
                <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>100%</div>
                  <div style={{ fontSize: "0.62rem", color: "#94a3b8" }}>Responsive</div>
                </div>
                <div style={{ fontSize: "0.62rem", color: "#38bdf8", textAlign: "center" }}>Figma to Next.js</div>
              </div>
            </div>

            {/* Social Proof Rating */}
            <div className="hero-rating-wrap">
              <div className="hero-rating-text">Rated 4.9/5 by clients across India &amp; Worldwide</div>
              <div className="hero-stars" aria-label="5 stars rating">★★★★★</div>
            </div>
          </div>
        </header>
      </div>

      <main>
        {/* ====================================================================
            MONOCHROMATIC TOOLS & PARTNER TICKER (Pure White Background)
            ==================================================================== */}
        <section className="logo-ticker-section" aria-label="Tools and Selected Projects">
          <div className="ticker-track">
            {[1, 2].map((group) => (
              <div key={group} style={{ display: "flex", gap: "3.5rem", alignItems: "center" }}>
                <div className="ticker-item">
                  <svg className="ticker-icon" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span>Figma UI/UX</span>
                </div>
                <div className="ticker-item">
                  <img src="/assets/indiacodes_logo.png" alt="India Codes" className="ticker-img" />
                  <span>India Codes</span>
                </div>
                <div className="ticker-item">
                  <svg className="ticker-icon" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                  </svg>
                  <span>Next.js Architecture</span>
                </div>
                <div className="ticker-item">
                  <img src="/assets/jahan_logo.jpg" alt="Jahan Polymers" className="ticker-img" />
                  <span>Jahan Polymers</span>
                </div>
                <div className="ticker-item">
                  <svg className="ticker-icon" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                  </svg>
                  <span>Zoho CRM Workflows</span>
                </div>
                <div className="ticker-item">
                  <img src="/assets/treeindia_logo.png" alt="Tree India Exports" className="ticker-img" />
                  <span>Tree India</span>
                </div>
                <div className="ticker-item">
                  <svg className="ticker-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span>Cloud &amp; Automation</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================================
            • ABOUT US SECTION & SIGNATURE BENTO GRID (Pure White Background)
            ==================================================================== */}
        <section className="about-section" id="about">
          <div className="container">
            {/* Centered Heading with inline badges */}
            <div className="about-header">
              <div className="pill-section-tag">• ABOUT AJ STUDIO</div>
              <h2 className="about-title">
                An independent digital studio<br />
                dedicated to building
                <span className="inline-badge-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                smarter<br />
                and
                <span className="inline-badge-lime">
                  <span className="lime-dot" />
                </span>
                more adaptive
              </h2>
            </div>

            {/* Signature 3-Column Bento Grid - 100% Studio Brand (NO Personal Photos) */}
            <div className="bento-grid">
              {/* Card 1: Left Blue Card with 3D Digital Craft Visual */}
              <div className="bento-card-blue">
                <div className="bento-blue-top">
                  <span className="bento-studio-logo">AJ STUDIO</span>
                  <div className="bento-sound-btn" aria-label="Equalizer indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="bento-graphic-wrap">
                  <img
                    src="/assets/bento_digital_craft.jpg"
                    alt="AJ Studio 3D Digital Craft"
                    className="bento-graphic-img"
                  />
                </div>

                <div className="bento-blue-overlay-card">
                  <div className="bento-stat-num">50+</div>
                  <p className="bento-stat-text">
                    Digital products, web platforms, and automated business solutions delivered.
                  </p>
                </div>
              </div>

              {/* Card 2: Middle Clean White Card */}
              <div className="bento-card-white">
                <div>
                  <div className="bento-commitment-lbl">Commitment to measurable</div>
                  <div className="bento-100-num">100%</div>
                </div>

                <div className="bento-icons-stack">
                  <div className="bento-icon-badge" title="UI/UX Design">🎨</div>
                  <div className="bento-icon-badge" title="Web Development">💻</div>
                  <div className="bento-icon-badge" title="Zoho CRM & Automation">⚙️</div>
                  <div className="bento-icon-badge" title="Digital Branding">✨</div>
                </div>

                <p className="bento-quote-text">
                  &ldquo;AJ Studio transformed our product into a seamless, high-converting digital experience. Intuitive, fast, and remarkably crafted.&rdquo;
                </p>
              </div>

              {/* Column 3: Stacked Neon Lime Card + Dark Obsidian Card */}
              <div className="bento-col-stacked">
                {/* Top Card: Neon Lime Card */}
                <div className="bento-card-lime">
                  <div className="bento-lime-label">Data Points &amp; Workflows</div>
                  <div className="bento-lime-stat">520k+</div>
                  <p className="bento-lime-desc">
                    Analyzed monthly to power smarter digital products &amp; CRM workflows.
                  </p>
                </div>

                {/* Bottom Card: Dark Obsidian Card */}
                <div className="bento-card-dark">
                  <div className="bento-dark-lbl">Global Clients</div>
                  <div className="bento-dark-val">15+</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SERVICES SECTION (The 4 Core Categories from User Brief)
            ==================================================================== */}
        <section className="services-section" id="services">
          <div className="container">
            <div className="section-head-center">
              <span className="pill-section-tag">• OUR SERVICES</span>
              <h2 className="section-h2">Digital Solutions Designed Around Your Business</h2>
              <p className="section-desc">
                From user interface wireframes to high-performance Next.js code and CRM automations.
              </p>
            </div>

            <div className="services-grid-4">
              {SERVICES.map((s) => (
                <div key={s.title} className="service-card-4">
                  <div>
                    <div className="service-num-badge">{s.num}</div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                  <ul className="service-item-bullets">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            FEATURED WORK / PROJECTS SHOWCASE (Clean Light Mode)
            ==================================================================== */}
        <section className="projects-section" id="work">
          <div className="container">
            <div className="section-head-center">
              <span className="pill-section-tag">• SELECTED PROJECTS</span>
              <h2 className="section-h2">Thoughtful Solutions in Production</h2>
              <p className="section-desc">
                A selection of high-performing platforms engineered for our trusted partners.
              </p>
            </div>

            <div className="projects-list">
              {PROJECTS.map((p, idx) => (
                <div key={p.id} className={`project-item-card ${idx % 2 === 1 ? "reverse" : ""}`}>
                  {/* Visual Preview */}
                  <div className="project-visual-col">
                    <img
                      src={p.image}
                      alt={`${p.title} Preview`}
                      className="project-visual-img"
                    />
                    <div className="project-badge-overlay">
                      <span className="live-pulse-dot" />
                      PROJECT {p.num}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="project-info-col">
                    <div>
                      <div className="project-top-meta">
                        <img src={p.logo} alt={p.client} className="project-client-logo-img" />
                        <div>
                          <div className="project-type-tag">{p.clientType}</div>
                          <div style={{ fontSize: "0.82rem", color: "#64748b" }}>{p.client}</div>
                        </div>
                      </div>

                      <h3 className="project-title-h3">{p.title}</h3>
                      <p className="project-description">{p.desc}</p>

                      <div className="project-tech-pills">
                        {p.tech.map((t) => (
                          <span key={t} className="tech-tag-pill">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="project-action-row">
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-visit"
                      >
                        Visit Live Site ↗
                      </a>
                      <a href="#contact" className="btn-glass" style={{ color: "#0f172a", borderColor: "#cbd5e1" }}>
                        Discuss Similar Project
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            PROCESS / HOW WE WORK (6-Stage Sprint)
            ==================================================================== */}
        <section className="process-section" id="process">
          <div className="container">
            <div className="section-head-center">
              <span className="pill-section-tag">• HOW WE WORK</span>
              <h2 className="section-h2">From First Conversation to Final Delivery</h2>
              <p className="section-desc">
                A disciplined engineering and design workflow that guarantees transparency, speed, and high quality.
              </p>
            </div>

            <div className="process-grid-6">
              {PROCESS_STEPS.map((step) => (
                <div key={step.num} className="process-card-item">
                  <div className="process-num-val">{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            WHY AJ STUDIO (6 Core Principles from Brief)
            ==================================================================== */}
        <section className="why-section">
          <div className="container">
            <div className="section-head-center">
              <span className="pill-section-tag">• WHY AJ STUDIO</span>
              <h2 className="section-h2">Aesthetics Combined with Functionality</h2>
              <p className="section-desc">
                We believe great digital products are built through a balance of creativity, usability, and business understanding.
              </p>
            </div>

            <div className="why-grid-6">
              {WHY_US.map((item) => (
                <div key={item.title} className="why-card">
                  <div className="why-card-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            FREQUENTLY ASKED QUESTIONS (FAQ Accordion)
            ==================================================================== */}
        <section className="faq-section" id="faq">
          <div className="container">
            <div className="section-head-center">
              <span className="pill-section-tag">• FREQUENTLY ASKED QUESTIONS</span>
              <h2 className="section-h2">Everything You Need to Know</h2>
              <p className="section-desc">
                Common questions about how we work, project scopes, and collaborations.
              </p>
            </div>

            <div className="faq-list">
              {FAQS.map((faq, idx) => (
                <div
                  key={faq.q}
                  className="faq-item"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    <span style={{ fontSize: "1.2rem", color: "var(--sky-blue)" }}>
                      {openFaq === idx ? "−" : "+"}
                    </span>
                  </div>
                  {openFaq === idx && (
                    <div className="faq-answer">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            CONTACT SECTION (With ajstudio.projects@gmail.com & 6378151265)
            ==================================================================== */}
        <section className="contact-section" id="contact">
          <div className="container">
            <div className="contact-card-wrap">
              {/* Left Brand Panel */}
              <div className="contact-info-side">
                <div>
                  <span className="pill-section-tag" style={{ color: "var(--neon-lime)" }}>• START A PROJECT</span>
                  <h2>
                    Let&apos;s build something meaningful.
                  </h2>
                  <p>
                    Have an idea, a business challenge, or a project in mind? Let&apos;s discuss how AJ Studio can help turn your vision into an impactful digital solution.
                  </p>
                </div>

                <ul className="contact-features-list">
                  <li className="contact-feature-item">
                    <span>✉️</span>
                    <a href="mailto:ajstudio.projects@gmail.com">ajstudio.projects@gmail.com</a>
                  </li>
                  <li className="contact-feature-item">
                    <span>📞</span>
                    <a href="tel:+916378151265">+91 6378151265</a>
                  </li>
                  <li className="contact-feature-item">
                    <span>🌐</span>
                    <span>Serving Clients in India &amp; Worldwide</span>
                  </li>
                  <li className="contact-feature-item">
                    <span>⚡</span>
                    <span>Direct Communication &amp; 24h Response</span>
                  </li>
                </ul>

                <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)" }}>
                  AJ Studio &copy; 2026. All rights reserved.
                </div>
              </div>

              {/* Right Form Panel */}
              <div className="contact-form-side">
                {formState === "success" ? (
                  <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>Inquiry Received!</h3>
                    <p style={{ color: "#64748b" }}>We&apos;ll review your requirements and respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Your Name / Company</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="e.g. Rahul Sharma / TechCorp"
                        className="form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Work Email</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone / WhatsApp Number</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 63781 51265"
                        className="form-input"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="interest">Service Required</label>
                      <select
                        id="interest"
                        className="form-select"
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        required
                      >
                        <option value="" disabled>Select a service category</option>
                        <option value="uiux-design">UI/UX Design (Website / Mobile / SaaS / CRM)</option>
                        <option value="web-development">Website Design &amp; Development (Next.js)</option>
                        <option value="business-solutions">Business Solutions (Zoho CRM / Automation)</option>
                        <option value="branding">Branding &amp; Creative Design</option>
                        <option value="consulting">End-to-End Digital Solution</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Project Requirements</label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your project, goals, timeline, or questions..."
                        className="form-textarea"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    {formState === "error" && (
                      <p style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "1rem" }}>
                        Something went wrong. Please check your fields or email us directly at ajstudio.projects@gmail.com.
                      </p>
                    )}

                    <button
                      type="submit"
                      className="btn-submit"
                      disabled={formState === "loading"}
                    >
                      {formState === "loading" ? "Submitting Inquiry..." : "Submit Project Inquiry ↗"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          FOOTER (Clean Light Mode)
          ==================================================================== */}
      <footer className="footer-main">
        <div className="container">
          <div className="footer-top-row">
            <div>
              <div className="footer-brand">
                AJ Studio<span style={{ color: "var(--sky-blue)" }}>.</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "#64748b", marginTop: "0.4rem" }}>
                Ideas into digital experiences. Design. Develop. Deliver.
              </p>
            </div>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-bottom-row">
            <div>
              &copy; 2026 AJ Studio. Independent Digital Design &amp; Development Studio.
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a href="mailto:ajstudio.projects@gmail.com">ajstudio.projects@gmail.com</a>
              <a href="tel:+916378151265">+91 6378151265</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          FLOATING MUSIC PLAYER
          ==================================================================== */}
      <div className="music-player-wrap">
        <div className={`music-drawer ${musicOpen ? "visible" : "hidden"}`}>
          <div className="music-drawer-head">
            <span className="music-drawer-title">Atmospheric Lofi</span>
            <div className={`music-eq ${playing ? "" : "paused"}`}>
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="music-track-details">
            <div className="music-track-art">{currentTrack.emoji}</div>
            <div>
              <div className="music-track-name">{currentTrack.title}</div>
              <div className="music-artist-name">{currentTrack.artist}</div>
            </div>
          </div>

          <div className="music-bar-wrap">
            <div className="music-bar-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="music-ctrls">
            <button className="music-ctrl-btn" onClick={prevTrack} aria-label="Previous">⏮</button>
            <button
              className="music-ctrl-play"
              onClick={() => setPlaying(!playing)}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? "⏸" : "▶"}
            </button>
            <button className="music-ctrl-btn" onClick={nextTrack} aria-label="Next">⏭</button>
          </div>
        </div>

        <button
          className="music-toggle-btn"
          onClick={() => setMusicOpen(!musicOpen)}
          aria-label="Toggle background music"
        >
          {playing ? "🎵" : "🎶"}
        </button>
      </div>
    </>
  );
}
