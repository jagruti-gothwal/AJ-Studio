"use client";

import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "Kaushik Sampath",
    client: "India Codes",
    clientType: "Freelancer & Blogger",
    logo: "/assets/indiacodes_logo.png",
    image: "/assets/project_kaushik.jpg",
    tags: ["Freelancer & Blogger", "India Codes", "PIN & IFSC Directory"],
    desc: "A fast, responsive web platform and blog for Kaushik Sampath, an independent creator and tech blogger. Powers India Codes with search tools for India's Postal/PIN codes, banking IFSC and SWIFT codes, STD/ISD directories, and developer articles.",
    link: "https://indiacodes.co.in/",
    tech: ["Next.js", "Search Directory", "Tech Blog", "REST APIs"],
  },
  {
    id: 2,
    num: "02",
    title: "Jahan Polymers",
    client: "JP JumboLite®",
    clientType: "Polymers Company",
    logo: "/assets/jahan_logo.jpg",
    image: "/assets/project_jahan.jpg",
    tags: ["Polymers Company", "JP JumboLite®", "Industrial B2B"],
    desc: "A modern B2B platform engineered for Jahan Polymers Private Limited, India's leading polymers company and manufacturer of JP JumboLite® polycarbonate compact sheets. Features comprehensive product catalogs and automated quote request systems.",
    link: "https://jumbolite.co.in/",
    tech: ["Next.js", "Product Catalog", "Instant RFQ", "Responsive UI"],
  },
  {
    id: 3,
    num: "03",
    title: "Tree India Exports",
    client: "Tree India Exports",
    clientType: "Global Confectionery Exporter",
    logo: "/assets/treeindia_logo.png",
    image: "/assets/project_treeindia.jpg",
    tags: ["Global Exporter", "Confectionery & Snacks", "15+ Countries"],
    desc: "A vibrant, international export platform built for Tree India, delivering premium Indian confectionery, candies, lollipops, biscuits, and chocolates across 15+ countries worldwide. Equipped with dynamic showcases and global compliance badges.",
    link: "https://www.treeindiaexports.com/",
    tech: ["Next.js", "Global Trade", "FMCG Catalog", "Export Desk"],
  },
];

const TESTIMONIALS = [
  {
    quote: "AJ Studio transformed my digital presence and engineered an exceptional platform for India Codes. Fast, reliable search tools and clean modern aesthetics.",
    name: "Kaushik Sampath",
    role: "Freelancer & Blogger • India Codes",
    avatar: "/assets/avatar1.png",
    isLogo: false,
  },
  {
    quote: "We needed a serious digital upgrade for our manufacturing business. The UI/UX overhaul and the new catalog flow they built has completely modernized Jahan Polymers.",
    name: "Management Team",
    role: "Jahan Polymers (JP JumboLite®)",
    avatar: "/assets/jahan_logo.jpg",
    isLogo: true,
  },
  {
    quote: "Our global snack and confectionery export platform has expanded our international reach to over 15 countries. Outstanding design quality and responsiveness.",
    name: "Export Division",
    role: "Tree India Exports",
    avatar: "/assets/treeindia_logo.png",
    isLogo: true,
  },
];

const SERVICES = [
  {
    icon: "⚡",
    title: "AI & Automation",
    desc: "Deploy intelligent workflows, automated agentic pipelines, and custom AI tools that accelerate business efficiency.",
  },
  {
    icon: "🖥️",
    title: "Modern Web Engineering",
    desc: "Ultra-fast Next.js web applications, responsive corporate platforms, and scalable cloud architectures.",
  },
  {
    icon: "🎨",
    title: "UI/UX & Design Systems",
    desc: "Intuitive user experiences, high-conversion interfaces, and cohesive design systems crafted in Figma.",
  },
  {
    icon: "📈",
    title: "Growth Strategy",
    desc: "Data-driven consulting, digital roadmaps, and continuous technical evolution tailored for high-growth brands.",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We analyze your business architecture, target market, and strategic goals to map a high-impact roadmap.",
  },
  {
    num: "02",
    title: "Design & Prototyping",
    desc: "Crafting wireframes and high-fidelity interactive prototypes with pixel-perfect modern aesthetics.",
  },
  {
    num: "03",
    title: "Intelligent Engineering",
    desc: "Developing robust, scalable web applications and automated systems using modern full-stack architectures.",
  },
  {
    num: "04",
    title: "Launch & Continuous Scale",
    desc: "Comprehensive testing, high-speed CDN deployment, and ongoing optimization for sustained digital leadership.",
  },
];

const TRACKS = [
  { title: "Midnight Dreams", artist: "Lofi Aesthetic", emoji: "🌙" },
  { title: "Azure Horizon", artist: "Chill Synth", emoji: "☁️" },
  { title: "Linear Waves", artist: "Modern Ambient", emoji: "🌊" },
  { title: "Skyline Focus", artist: "Deep Chill", emoji: "✨" },
];

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", interest: "", message: "" });
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        setFormData({ name: "", email: "", interest: "", message: "" });
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
                {/* Stylized cloud-bridge logo mark from reference */}
                <svg width="26" height="20" viewBox="0 0 26 20" fill="currentColor">
                  <path d="M2 18V9.5C2 5.91 4.91 3 8.5 3C10.53 3 12.33 3.93 13.5 5.38C14.67 3.93 16.47 3 18.5 3C22.09 3 25 5.91 25 9.5V18H20.5V10C20.5 8.34 19.16 7 17.5 7C15.84 7 14.5 8.34 14.5 10V18H10.5V10C10.5 8.34 9.16 7 7.5 7C5.84 7 4.5 8.34 4.5 10V18H2Z" fill="white"/>
                </svg>
              </span>
              <span>Adine</span>
            </a>

            {/* Desktop Navigation Links */}
            <ul className="hero-nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About Us</a></li>
              <li className="hero-nav-dropdown">
                <a href="#work" onClick={(e) => e.preventDefault()}>
                  More Links
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <div className="hero-dropdown-menu">
                  <a href="#work">Featured Work</a>
                  <a href="#process">How We Work</a>
                  <a href="#testimonials">Client Reviews</a>
                  <a href="#contact">Get in Touch</a>
                </div>
              </li>
            </ul>

            {/* Right Action Button */}
            <div className="hero-nav-right">
              <a href="#contact" className="btn-lime">
                Buy Template
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
              <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", fontWeight: 600 }}>About Us</a>
              <a href="#work" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", fontWeight: 600 }}>Featured Work</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", fontWeight: 600 }}>Process</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", fontWeight: 600 }}>Contact</a>
              <a href="#contact" className="btn-lime" onClick={() => setMobileMenuOpen(false)} style={{ justifyContent: "center" }}>
                Get Started ↗
              </a>
            </div>
          )}

          {/* Hero Center Text Content */}
          <div className="hero-center" id="home">
            <h1 className="hero-heading">
              Building the future with<br />
              AI and strategy
            </h1>
            <p className="hero-subtitle">
              We help organizations unlock growth and efficiency through data-driven consulting and intelligent automation.
            </p>
            <div className="hero-cta-group">
              <a href="#work" className="btn-glass">
                View Demo
              </a>
              <a href="#contact" className="btn-lime">
                Get Started
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
                  <span style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 600 }}>Revenue</span>
                  <span className="card-metrics-badge">+18.4%</span>
                </div>
                <div className="card-metrics-val">$3,875</div>
                <svg className="mini-sparkline" viewBox="0 0 100 35" fill="none">
                  <path d="M0 28 Q 20 22 40 25 T 70 12 T 100 4" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M0 28 Q 20 22 40 25 T 70 12 T 100 4 L 100 35 L 0 35 Z" fill="rgba(34, 197, 94, 0.12)" />
                </svg>
              </div>

              {/* Card 3: Woman Profile Card */}
              <div className="arc-card card-profile card-pos-3">
                <img src="/assets/card_woman.jpg" alt="Client Spotlight" />
                <div className="card-profile-tag">
                  <span>$3,200</span>
                  <span>★ 4.9</span>
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
                <div className="pill">● Expertise</div>
                <div className="text">
                  Continuous Delivery<br />
                  Data, Architecture &amp; Intelligence
                </div>
                <div style={{ fontSize: "0.68rem", color: "#94a3b8" }}>Enterprise Cloud</div>
              </div>

              {/* Card 6: Cyan Frosted Glass Play Card */}
              <div className="arc-card card-cyan-glass card-pos-6">
                <div className="play-btn-circle">▶</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.02em" }}>Decisions</div>
              </div>

              {/* Card 7: 520k+ Stats Dashboard Card */}
              <div className="arc-card card-stats-preview card-pos-7">
                <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
                  <span className="label">Monthly Flow</span>
                  <span>•••</span>
                </div>
                <div className="num">520k+</div>
                <div style={{ height: "6px", width: "100%", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: "78%", height: "100%", background: "#0284c7" }} />
                </div>
              </div>

              {/* Card 8: Mobile Preview Card */}
              <div className="arc-card card-mobile-preview card-pos-8">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.65rem", color: "#94a3b8" }}>Overview</span>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
                </div>
                <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>89%</div>
                  <div style={{ fontSize: "0.62rem", color: "#94a3b8" }}>Efficiency</div>
                </div>
                <div style={{ fontSize: "0.62rem", color: "#38bdf8", textAlign: "center" }}>Synced Realtime</div>
              </div>
            </div>

            {/* Social Proof Rating */}
            <div className="hero-rating-wrap">
              <div className="hero-rating-text">Rated 4.9/5 by 4,900+ clients</div>
              <div className="hero-stars" aria-label="5 stars rating">★★★★★</div>
            </div>
          </div>
        </header>
      </div>

      <main>
        {/* ====================================================================
            MONOCHROMATIC PARTNER LOGO TICKER / MARQUEE (Pure White Background)
            ==================================================================== */}
        <section className="logo-ticker-section" aria-label="Trusted Partners">
          <div className="ticker-track">
            {[1, 2].map((group) => (
              <div key={group} style={{ display: "flex", gap: "3.5rem", alignItems: "center" }}>
                <div className="ticker-item">
                  <svg className="ticker-icon" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span>logipsum</span>
                </div>
                <div className="ticker-item">
                  <img src="/assets/indiacodes_logo.png" alt="India Codes" className="ticker-img" />
                  <span>India Codes</span>
                </div>
                <div className="ticker-item">
                  <svg className="ticker-icon" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                  </svg>
                  <span>logipsum</span>
                </div>
                <div className="ticker-item">
                  <img src="/assets/jahan_logo.jpg" alt="Jahan Polymers" className="ticker-img" />
                  <span>Jahan Polymers</span>
                </div>
                <div className="ticker-item">
                  <svg className="ticker-icon" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                  </svg>
                  <span>logipsum</span>
                </div>
                <div className="ticker-item">
                  <img src="/assets/treeindia_logo.png" alt="Tree India Exports" className="ticker-img" />
                  <span>Tree India</span>
                </div>
                <div className="ticker-item">
                  <svg className="ticker-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span>logipsum</span>
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
            {/* Centered Heading with inline circular badges */}
            <div className="about-header">
              <div className="pill-section-tag">• ABOUT US</div>
              <h2 className="about-title">
                A global consulting partner<br />
                dedicated to building
                <span className="inline-badge-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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

            {/* Signature 3-Column Bento Grid */}
            <div className="bento-grid">
              {/* Card 1: Left Blue Card with Young Founder & 120+ Overlay */}
              <div className="bento-card-blue">
                <div className="bento-blue-top">
                  <span className="bento-ipsum-logo">IPSUM</span>
                  <div className="bento-sound-btn" aria-label="Equalizer indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="bento-person-img-wrap">
                  <img
                    src="/assets/bento_person.jpg"
                    alt="Strategic AI Architect"
                    className="bento-person-img"
                  />
                </div>

                <div className="bento-blue-overlay-card">
                  <div className="bento-stat-num">120+</div>
                  <p className="bento-stat-text">
                    Collaborating with leading AI and Cloud technology providers.
                  </p>
                </div>
              </div>

              {/* Card 2: Middle Clean White Card with 100% & Avatars */}
              <div className="bento-card-white">
                <div>
                  <div className="bento-commitment-lbl">Commitment to measurable</div>
                  <div className="bento-100-num">100%</div>
                </div>

                <div className="bento-avatars-row">
                  <img src="/assets/avatar1.png" alt="Client 1" className="bento-avatar-circle" />
                  <img src="/assets/card_woman.jpg" alt="Client 2" className="bento-avatar-circle" />
                  <img src="/assets/avatar2.png" alt="Client 3" className="bento-avatar-circle" />
                  <img src="/assets/avatar3.jpg" alt="Client 4" className="bento-avatar-circle" />
                </div>

                <p className="bento-quote-text">
                  &ldquo;Their automation strategy completely reshaped how we work. It&apos;s efficient, intelligent, and seamless.&rdquo;
                </p>
              </div>

              {/* Column 3: Stacked Neon Lime Card + Dark Obsidian Card */}
              <div className="bento-col-stacked">
                {/* Top Card: Neon Lime Card */}
                <div className="bento-card-lime">
                  <div className="bento-lime-label">Data Points</div>
                  <div className="bento-lime-stat">520k+</div>
                  <p className="bento-lime-desc">
                    Analyzed monthly to power smarter business strategies.
                  </p>
                </div>

                {/* Bottom Card: Dark Obsidian Card */}
                <div className="bento-card-dark">
                  <div className="bento-dark-lbl">Continents</div>
                  <div className="bento-dark-val">20+</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            FEATURED WORK / PROJECTS SHOWCASE (Clean Light Mode)
            ==================================================================== */}
        <section className="projects-section" id="work">
          <div className="container">
            <div className="section-head-center">
              <span className="pill-section-tag">• FEATURED WORK</span>
              <h2 className="section-h2">Engineered for Impact</h2>
              <p className="section-desc">
                High-performance platforms crafted with precision for our industry-leading clients.
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
                        Visit Website ↗
                      </a>
                      <a href="#contact" className="btn-glass" style={{ color: "#0f172a", borderColor: "#cbd5e1" }}>
                        Start Similar Project
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            SERVICES & CORE CAPABILITIES (Clean Light Mode)
            ==================================================================== */}
        <section className="services-section" id="services">
          <div className="container">
            <div className="section-head-center">
              <span className="pill-section-tag">• CAPABILITIES</span>
              <h2 className="section-h2">What We Deliver</h2>
              <p className="section-desc">
                End-to-end digital mastery tailored to elevate ambitious brands and drive measurable business results.
              </p>
            </div>

            <div className="services-grid">
              {SERVICES.map((s) => (
                <div key={s.title} className="service-box">
                  <div className="service-icon-wrap">{s.icon}</div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            PROCESS / HOW WE WORK (Clean Light Mode - 0% Dark)
            ==================================================================== */}
        <section className="process-section" id="process">
          <div className="container">
            <div className="section-head-center">
              <span className="pill-section-tag">• HOW WE WORK</span>
              <h2 className="section-h2">The Strategic Execution</h2>
              <p className="section-desc">
                A refined 4-stage engineering sprint to take you from discovery to digital dominance.
              </p>
            </div>

            <div className="process-grid">
              {PROCESS.map((step) => (
                <div key={step.num} className="process-card">
                  <div className="process-step-num">{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            TESTIMONIALS / CLIENT REVIEWS (Clean Light Mode)
            ==================================================================== */}
        <section className="testi-section" id="testimonials">
          <div className="container">
            <div className="section-head-center">
              <span className="pill-section-tag">• TESTIMONIALS</span>
              <h2 className="section-h2">Client Trust &amp; Reviews</h2>
              <p className="section-desc">
                What industry leaders and founders say after partnering with AJ Studio.
              </p>
            </div>

            <div className="testi-grid">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="testi-card">
                  <div>
                    <div className="testi-stars">★★★★★</div>
                    <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
                  </div>
                  <div className="testi-author-row">
                    <img src={t.avatar} alt={t.name} className="testi-author-img" />
                    <div>
                      <div className="testi-author-name">{t.name}</div>
                      <div className="testi-author-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            CONTACT SECTION (Clean Light Mode)
            ==================================================================== */}
        <section className="contact-section" id="contact">
          <div className="container">
            <div className="contact-card-wrap">
              {/* Left Brand Panel */}
              <div className="contact-info-side">
                <div>
                  <span className="pill-section-tag" style={{ color: "var(--neon-lime)" }}>• GET IN TOUCH</span>
                  <h2>
                    Let&apos;s build something extraordinary.
                  </h2>
                  <p>
                    Ready to transform your business with AI, high-converting design, and modern engineering?
                  </p>
                </div>

                <ul className="contact-features-list">
                  <li className="contact-feature-item">
                    <span>⚡</span> Rapid 24-hour response time
                  </li>
                  <li className="contact-feature-item">
                    <span>🌐</span> Available for worldwide collaborations
                  </li>
                  <li className="contact-feature-item">
                    <span>✉️</span> hello@ajstudio.dev
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
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>Message Received!</h3>
                    <p style={{ color: "#64748b" }}>We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="e.g. Alex Morgan"
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
                        placeholder="alex@company.com"
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="interest">Area of Interest</label>
                      <select
                        id="interest"
                        className="form-select"
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        required
                      >
                        <option value="" disabled>Select your focus area</option>
                        <option value="ai-automation">AI &amp; Automation</option>
                        <option value="nextjs-web">Next.js Web Application</option>
                        <option value="uiux-design">UI/UX &amp; Design Systems</option>
                        <option value="consulting">Growth Strategy &amp; Consulting</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Project Details</label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your brand, goals, and timeline..."
                        className="form-textarea"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    {formState === "error" && (
                      <p style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "1rem" }}>
                        Something went wrong. Please check your fields and try again.
                      </p>
                    )}

                    <button
                      type="submit"
                      className="btn-submit"
                      disabled={formState === "loading"}
                    >
                      {formState === "loading" ? "Submitting Inquiry..." : "Submit Inquiry ↗"}
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
            <div className="footer-brand">
              AJ Studio<span style={{ color: "var(--sky-blue)" }}>.</span>
            </div>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-bottom-row">
            <div>&copy; 2026 AJ Studio. Designed for building smarter and adaptive digital experiences.</div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a href="#">X / Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
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
