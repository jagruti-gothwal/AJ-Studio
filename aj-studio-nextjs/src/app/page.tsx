"use client";

import { useState } from "react";
import Image from "next/image";

// Solutions data matching Design Asylum structure
const SOLUTIONS = [
  {
    num: "01",
    icon: "📱",
    title: "Web and Mobile Apps",
    desc: "From zero-to-one product interfaces to high-performance Next.js web applications and mobile apps engineered for speed, engagement, and conversion.",
    features: [
      "Custom Next.js & React Web Platforms",
      "Mobile App UI/UX (iOS & Android)",
      "High-Converting Landing Pages",
      "Performance & Core Web Vitals (<1s)",
      "Responsive Cross-Device Architecture",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    num: "02",
    icon: "☁️",
    title: "Cloud Enterprise Software",
    desc: "Intuitive digital interfaces for complex business operations. We turn dense enterprise workflows into clear, frictionless dashboards and portals.",
    features: [
      "SaaS Multi-Tenant Dashboards",
      "CRM & ERP Custom Interfaces",
      "Data Visualization & BI Reporting",
      "Role-Based Access Management",
      "API Gateways & Webhooks",
    ],
    tags: ["Enterprise SaaS", "Dashboards", "REST APIs", "SQL"],
  },
  {
    num: "03",
    icon: "⚡",
    title: "Business Process & CRM Automation",
    desc: "Supercharge your operational velocity. We implement and customize Zoho CRM, build automated lead pipelines, and eliminate manual busywork.",
    features: [
      "Zoho CRM Setup & Custom Deluge Scripts",
      "Automated Invoicing & Lead Routing",
      "Third-Party Webhook Integrations",
      "Pipeline Tracking & Real-Time Alerts",
      "Zero-Manual Data Entry Workflows",
    ],
    tags: ["Zoho CRM", "Automation", "Workflows", "Webhooks"],
  },
  {
    num: "04",
    icon: "🎨",
    title: "Branding and Identity",
    desc: "Comprehensive visual identity systems that give scaling companies an authoritative, memorable presence in crowded global markets.",
    features: [
      "Strategic Brand Positioning",
      "Logo Systems & Visual Guidelines",
      "Figma Design Systems & Tokens",
      "Pitch Decks & Presentation Kits",
      "Digital Marketing & Social Creatives",
    ],
    tags: ["Brand Strategy", "Logo Design", "Design Systems"],
  },
  {
    num: "05",
    icon: "🤖",
    title: "AI Integration & Adoption",
    desc: "Practical, high-utility AI features integrated directly into your web products — from intelligent search engines to automated data summarization.",
    features: [
      "LLM Prompt Pipelines & Chat Assistants",
      "Semantic & Hybrid Search Architecture",
      "Automated Document Summaries",
      "AI-Assisted Workflow Triggers",
      "Actionable Insights Generation",
    ],
    tags: ["AI Integrations", "Semantic Search", "LLMs"],
  },
  {
    num: "06",
    icon: "📈",
    title: "Performance & Technical SEO",
    desc: "Engineering foundations that search engines love. Clean schema markup, instant server-rendered pages, and conversion-optimized architectures.",
    features: [
      "Core Web Vitals Perfection (99+ PageSpeed)",
      "Structured Data & JSON-LD Schemas",
      "Dynamic XML Sitemaps & Indexing",
      "Conversion Funnel Instrumentation",
      "Technical SEO Auditing & Remediation",
    ],
    tags: ["Technical SEO", "Speed", "Schema Markup"],
  },
];

// Featured Portfolio & Case Studies
const CASE_STUDIES = [
  {
    id: 1,
    num: "01",
    client: "Kaushik Sampath | India Codes",
    category: "Web and Mobile Apps",
    filterCat: "apps",
    scope: ["Research", "UI/UX Design", "Next.js Engineering", "Search Architecture"],
    headline: "High-speed directory & search engine indexing 50,000+ postal and banking codes.",
    narrative:
      "Engineered an ultra-fast searchable web directory for Kaushik Sampath powering India Codes. Features instant lookup across India's PIN codes, IFSC and SWIFT banking codes, and an editorial publication hub for engineering insights.",
    impactMetric: "350k+ Monthly Search Queries · <120ms Query Latency · 99.9% Uptime",
    image: "/assets/project_kaushik.jpg",
    logo: "/assets/indiacodes_logo.png",
    link: "https://indiacodes.co.in/",
    tech: ["Next.js", "Directory Engine", "REST APIs", "SEO Architecture"],
    challenges:
      "Handling thousands of concurrent queries across large postal datasets without lag, and structuring SEO for 50,000+ distinct pages.",
    solution:
      "Server-side caching with Next.js route handlers, pre-computed search indices, and dynamic metadata generation for flawless organic ranking.",
  },
  {
    id: 2,
    num: "02",
    client: "Jahan Polymers | JP JumboLite®",
    category: "Cloud Enterprise Software",
    filterCat: "cloud",
    scope: ["Brand Identity", "B2B Product Catalog", "Instant RFQ Engine", "Responsive UI"],
    headline: "Comprehensive B2B digital catalog and quotation engine for India's leading polymers brand.",
    narrative:
      "Re-engineered the digital presence of Jahan Polymers Private Limited, manufacturers of JP JumboLite® polycarbonate compact sheets. Upgraded from static brochures to a dynamic digital catalog with direct technical specification sheets and automated quote dispatches.",
    impactMetric: "+220% International RFQs · 100% Mobile Ready · 4.8/5 Usability Score",
    image: "/assets/project_jahan.jpg",
    logo: "/assets/jahan_logo.jpg",
    link: "https://jumbolite.co.in/",
    tech: ["Next.js", "B2B Catalog", "Quote Automation", "Mobile Optimization"],
    challenges:
      "Showcasing highly technical polymer specifications and certificates in an accessible layout for global industrial procurement managers.",
    solution:
      "Structured product spec tables, downloadable technical sheets, and a frictionless 2-click quote request pipeline directly connected to sales.",
  },
  {
    id: 3,
    num: "03",
    client: "Tree India Exports",
    category: "Web and Mobile Apps",
    filterCat: "apps",
    scope: ["UI/UX Design", "Global Trade Desk", "FMCG Showcase", "Cross-Border UX"],
    headline: "Global confectionery export platform showcasing FMCG goods across 15+ countries.",
    narrative:
      "Built a modern export trading showcase for Tree India, delivering premium Indian confectionery, candies, lollipops, and biscuits worldwide. Features multi-regional packaging presentations, international compliance documentation, and multi-currency inquiry routing.",
    impactMetric: "15+ Export Destinations · 4x Faster Lead Qualification · Global Reach",
    image: "/assets/project_treeindia.jpg",
    logo: "/assets/treeindia_logo.png",
    link: "https://www.treeindiaexports.com/",
    tech: ["Next.js", "Global Trade Desk", "FMCG Catalog", "Performance UI"],
    challenges:
      "Building confidence with international FMCG importers and managing large high-resolution confectionery catalogs on slow mobile networks.",
    solution:
      "Optimized Next.js image loading, compliance credential spotlights, and intuitive container-size estimation inquiry forms.",
  },
  {
    id: 4,
    num: "04",
    client: "Pulse Enterprise Systems",
    category: "Business Automation",
    filterCat: "automation",
    scope: ["Zoho CRM Architecture", "Custom Deluge Scripts", "BI Dashboards", "Webhooks"],
    headline: "Zero-manual-entry sales operations pipeline and real-time executive dashboard.",
    narrative:
      "Architected an end-to-end business automation system inside Zoho CRM. Automated client onboarding, payment milestone notifications, proposal generation, and synchronized customer interactions into interactive executive dashboards.",
    impactMetric: "18 Hours/Week Saved per Operator · 0 Missed Follow-ups · 100% Automated Invoicing",
    image: "/assets/bento_digital_craft.jpg",
    logo: "/assets/indiacodes_logo.png",
    link: "https://indiacodes.co.in/",
    tech: ["Zoho CRM", "Deluge Scripting", "Webhooks", "Analytics"],
    challenges:
      "Eliminating human error in multi-stage deal tracking and invoice generation across disparate sales teams.",
    solution:
      "Automated state machine workflows in Zoho CRM triggering milestone webhooks, payment alerts, and dynamic PDF quotes upon contract signature.",
  },
  {
    id: 5,
    num: "05",
    client: "Apex Cloud Technologies",
    category: "Cloud Enterprise Software",
    filterCat: "cloud",
    scope: ["SaaS Dashboard UI/UX", "Design System", "React & Next.js", "Analytics"],
    headline: "High-density cloud analytics console with real-time KPI streaming and widget customization.",
    narrative:
      "Designed an expansive multi-tenant SaaS dashboard from ground up. Features customizable layout grids, sub-second query filters, role-based security matrices, and accessible dark/light themes tailored for high-frequency operators.",
    impactMetric: "120+ Active Enterprise Workspaces · 4.9/5 Usability CSAT · Sub-Second Queries",
    image: "/assets/portfolio1.png",
    logo: "/assets/jahan_icon.jpg",
    link: "https://jumbolite.co.in/",
    tech: ["Next.js", "Tailwind CSS", "Data Visualizer", "Role RBAC"],
    challenges:
      "Presenting tens of thousands of data points without visual clutter or browser lag.",
    solution:
      "Virtual scroll lists, modular widget architecture, and a strict typography hierarchy built with a custom Figma design system.",
  },
  {
    id: 6,
    num: "06",
    client: "Finova Wealth & Banking",
    category: "Branding and Identity",
    filterCat: "branding",
    scope: ["Mobile App UI/UX", "Brand Guidelines", "Design Tokens", "Micro-Interactions"],
    headline: "Next-generation fintech mobile interface and visual brand system for modern wealth management.",
    narrative:
      "Crafted an elegant brand identity and intuitive mobile app experience for a consumer wealth management platform. Features streamlined biometric authentication, visual portfolio allocations, and frictionless fund transfers.",
    impactMetric: "40k+ Active Beta Users · 4.8 App Store Rating · 60% Faster Onboarding",
    image: "/assets/portfolio2.png",
    logo: "/assets/treeindia_icon.png",
    link: "https://www.treeindiaexports.com/",
    tech: ["Figma Systems", "Mobile UI", "Design Tokens", "Brand Strategy"],
    challenges:
      "Simplifying complex financial regulations and investment terminology into an approachable interface for Gen-Z and millennial investors.",
    solution:
      "Progressive disclosure UX patterns, contextual financial health indicators, and high-contrast micro-interactions.",
  },
];

// Process Steps (Design Asylum Methodology)
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "We analyze your business model, target audience, technical constraints, and strategic growth targets through structured discovery sessions.",
  },
  {
    num: "02",
    title: "Plan",
    desc: "We define the comprehensive technical architecture, wireframes, user journeys, sprint milestones, and exact scope deliverables.",
  },
  {
    num: "03",
    title: "Design",
    desc: "We craft pixel-perfect UI, interactive prototypes in Figma, and reusable design systems engineered for accessibility and brand authority.",
  },
  {
    num: "04",
    title: "Develop",
    desc: "We bring designs into production-ready code using modern Next.js, clean TypeScript, scalable API endpoints, and clean CSS styling.",
  },
  {
    num: "05",
    title: "Deliver",
    desc: "Rigorous cross-browser QA, mobile responsiveness verification, Core Web Vitals speed tuning, and smooth production deployment.",
  },
  {
    num: "06",
    title: "Support",
    desc: "Continuous post-launch monitoring, conversion optimization, iterative feature additions, and ongoing SLA maintenance.",
  },
];

// Testimonials (Design Asylum style quote cards)
const TESTIMONIALS = [
  {
    quote:
      "AJ Studio delivered end-to-end with extraordinary speed and precision. The directory platform handles hundreds of thousands of searches without breaking a sweat. Working directly with someone who understands both design and code made all the difference.",
    name: "Kaushik Sampath",
    role: "Founder, India Codes",
    avatar: "/assets/avatar1.png",
    stars: "★★★★★",
  },
  {
    quote:
      "Our international B2B inquiries jumped dramatically within weeks of launching our new digital platform. The catalog makes it effortless for overseas procurement teams to review our specs and request quotes instantly.",
    name: "Procurement & Operations",
    role: "Jahan Polymers Private Limited",
    avatar: "/assets/avatar2.png",
    stars: "★★★★★",
  },
  {
    quote:
      "The export desk presentation built by AJ Studio gave our FMCG products a world-class international presence across 15+ countries. Fast, reliable, and deeply committed to our business success.",
    name: "Global Trade Desk",
    role: "Tree India Exports",
    avatar: "/assets/avatar3.jpg",
    stars: "★★★★★",
  },
];

// Insights & Articles (Design Asylum style)
const INSIGHTS = [
  {
    cat: "Brand Strategy",
    time: "5 min read",
    title: "The Complete Brand Design Guide: From Logo Creation to Scalable Visual Systems",
    desc: "Why scaling companies outgrow generic templates and how a cohesive design system drives valuation and customer trust.",
  },
  {
    cat: "UX/UI Architecture",
    time: "6 min read",
    title: "UX Design Principles: A Practical Guide to Creating High-Converting User Experiences",
    desc: "Key usability patterns, micro-interactions, and visual hierarchies that turn casual visitors into loyal paying customers.",
  },
  {
    cat: "Engineering & Speed",
    time: "4 min read",
    title: "Shipping 70% Faster: Next.js & Modern Component-Driven Architecture in 2026",
    desc: "How modern fullstack frameworks and pre-built design tokens compress product launch timelines from months to days.",
  },
];

// Frequently Asked Questions (Matching Design Asylum)
const FAQS = [
  {
    q: "Who are we?",
    a: "AJ Studio is an independent digital design and technology studio based in India serving companies worldwide. We specialize in UI/UX design, full-stack Next.js web development, Zoho CRM business automation, and strategic branding.",
  },
  {
    q: "What do we do?",
    a: "We partner with ambitious startups, growing businesses, and enterprises to design and build high-performance web applications, SaaS dashboards, B2B catalogs, and automated business workflows that drive revenue.",
  },
  {
    q: "How can you start working with AJ Studio?",
    a: "Simply submit the inquiry form below or email us directly at ajstudio.projects@gmail.com with your project brief. We will review your goals, schedule a quick discovery call, and provide a clear milestone proposal within 24 business hours.",
  },
  {
    q: "Who should work with us?",
    a: "Founders, product leaders, and scaling companies who need high-velocity design and development without the red tape, slow layers, or high overhead of traditional bloated agencies.",
  },
  {
    q: "How are we different?",
    a: "We bridge strategic UI/UX design, production-grade Next.js code, and business automation under one roof. You work directly with experienced practitioners who understand business ROI, pipelines, and user conversion.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We work seamlessly with clients across India, the Middle East, the US, and Europe. All sprint reviews, demos, and communications are held via Google Meet, email, and WhatsApp.",
  },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCase, setSelectedCase] = useState<(typeof CASE_STUDIES)[0] | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "UI/UX Design & Next.js Website",
    message: "",
  });
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const filteredProjects =
    activeFilter === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.filterCat === activeFilter);

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
        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: "UI/UX Design & Next.js Website",
          message: "",
        });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <>
      {/* ====================================================================
          STICKY NAVBAR (Design Asylum Minimalist Style)
          ==================================================================== */}
      <header className="site-header">
        <div className="nav-container">
          {/* Brand Mark */}
          <a href="#home" className="brand-link" aria-label="AJ Studio Home">
            <div className="brand-glyph">AJ</div>
            <div className="brand-text">
              <span className="brand-name">AJ STUDIO</span>
              <span className="brand-sub">DESIGN &amp; TECHNOLOGY</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links-desktop" aria-label="Main Navigation">
            <a href="#work">Work</a>
            <a href="#solutions">Solutions</a>
            <a href="#story">Our Story</a>
            <a href="#process">Process</a>
            <a href="#insights">Insights</a>
            <a href="#faq">FAQ</a>
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="nav-actions">
            <a href="#contact" className="btn-primary">
              <span>Talk To Us</span>
              <span className="btn-arrow">↗</span>
            </a>
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}>
          <ul className="mobile-nav-list">
            <li><a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a></li>
            <li><a href="#solutions" onClick={() => setMobileMenuOpen(false)}>Solutions</a></li>
            <li><a href="#story" onClick={() => setMobileMenuOpen(false)}>Our Story</a></li>
            <li><a href="#process" onClick={() => setMobileMenuOpen(false)}>Process</a></li>
            <li><a href="#insights" onClick={() => setMobileMenuOpen(false)}>Insights</a></li>
            <li><a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a></li>
            <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
          <a href="#contact" className="btn-primary" style={{ width: "100%" }} onClick={() => setMobileMenuOpen(false)}>
            <span>Talk To Us</span>
            <span className="btn-arrow">↗</span>
          </a>
        </div>
      </header>

      <main>
        {/* ====================================================================
            HERO SECTION (Design Asylum Editorial Hero)
            ==================================================================== */}
        <section className="hero-section" id="home">
          <div className="container">
            <div className="hero-content">
              {/* Eyebrow Pill */}
              <div className="hero-pill-badge">
                <span className="status-dot"></span>
                <span>Design &amp; Technology Partner for Scaling Companies</span>
              </div>

              {/* Massive Headline */}
              <h1 className="hero-h1">
                Design Partner for scaling companies in{" "}
                <span className="highlight-dark">India and Worldwide.</span>
              </h1>

              {/* Refined Subhead */}
              <p className="hero-lead">
                Fueling growth through strategic branding, intuitive UI/UX design, modern Next.js development,
                and intelligent business automation. We deliver end-to-end, from breakthrough concept to production-ready code.
              </p>

              {/* Action Buttons */}
              <div className="hero-cta-group">
                <a href="#contact" className="btn-primary">
                  <span>Get In Touch</span>
                  <span className="btn-arrow">↗</span>
                </a>
                <a href="#work" className="btn-secondary">
                  <span>View Our Impact</span>
                  <span>↓</span>
                </a>
              </div>

              {/* 4 Quantitative Metrics Strip */}
              <div className="hero-metrics-strip">
                <div className="metric-pill-item">
                  <div className="metric-pill-num">50+</div>
                  <div className="metric-pill-label">Digital Products Shipped</div>
                </div>
                <div className="metric-pill-item">
                  <div className="metric-pill-num">70%</div>
                  <div className="metric-pill-label">Faster Time to Market</div>
                </div>
                <div className="metric-pill-item">
                  <div className="metric-pill-num">3x</div>
                  <div className="metric-pill-label">Team Delivery Velocity</div>
                </div>
                <div className="metric-pill-item">
                  <div className="metric-pill-num">85%</div>
                  <div className="metric-pill-label">Client Retention &amp; Referrals</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            INFINITE MARQUEE (Design Asylum Style Tech & Solutions Ribbon)
            ==================================================================== */}
        <div className="marquee-ribbon" aria-hidden="true">
          <div className="marquee-track">
            <div className="marquee-item">
              <span>Next.js Fullstack</span><span className="marquee-divider"></span>
              <span>UI/UX Design</span><span className="marquee-divider"></span>
              <span>Figma Design Systems</span><span className="marquee-divider"></span>
              <span>Zoho CRM Workflows</span><span className="marquee-divider"></span>
              <span>Cloud Enterprise Software</span><span className="marquee-divider"></span>
              <span>B2B Platforms</span><span className="marquee-divider"></span>
              <span>AI Integration</span><span className="marquee-divider"></span>
              <span>Brand Identity</span><span className="marquee-divider"></span>
              <span>REST APIs &amp; Supabase</span><span className="marquee-divider"></span>
              <span>Technical SEO</span><span className="marquee-divider"></span>
            </div>
            {/* Duplicated for seamless infinite scroll */}
            <div className="marquee-item">
              <span>Next.js Fullstack</span><span className="marquee-divider"></span>
              <span>UI/UX Design</span><span className="marquee-divider"></span>
              <span>Figma Design Systems</span><span className="marquee-divider"></span>
              <span>Zoho CRM Workflows</span><span className="marquee-divider"></span>
              <span>Cloud Enterprise Software</span><span className="marquee-divider"></span>
              <span>B2B Platforms</span><span className="marquee-divider"></span>
              <span>AI Integration</span><span className="marquee-divider"></span>
              <span>Brand Identity</span><span className="marquee-divider"></span>
              <span>REST APIs &amp; Supabase</span><span className="marquee-divider"></span>
              <span>Technical SEO</span><span className="marquee-divider"></span>
            </div>
          </div>
        </div>

        {/* ====================================================================
            SOLUTIONS SECTION (Design Asylum 6-Card Solutions Grid)
            ==================================================================== */}
        <section className="solutions-section" id="solutions">
          <div className="container">
            <div className="solutions-header">
              <div className="section-eyebrow-pill">Solutions</div>
              <h2 className="section-h2">Comprehensive Solutions Tailored For Scale</h2>
              <p className="section-desc">
                From zero-to-one product design to enterprise workflow automation, we engineer digital solutions
                that solve real operational problems and drive revenue.
              </p>
            </div>

            <div className="solutions-grid">
              {SOLUTIONS.map((sol) => (
                <div key={sol.num} className="solution-card">
                  <div className="solution-card-top">
                    <div className="solution-badge-row">
                      <span className="solution-index">{sol.num}</span>
                      <div className="solution-icon-wrap">{sol.icon}</div>
                    </div>
                    <h3 className="solution-title">{sol.title}</h3>
                    <p className="solution-desc">{sol.desc}</p>
                    <ul className="solution-features">
                      {sol.features.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="solution-tags">
                    {sol.tags.map((tag, idx) => (
                      <span key={idx} className="solution-tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            VIEW OUR IMPACT / FEATURED CASE STUDIES SHOWCASE
            ==================================================================== */}
        <section className="impact-section" id="work">
          <div className="container">
            <div className="impact-header-row">
              <div>
                <div className="section-eyebrow-pill">View Our Impact</div>
                <h2 className="section-h2">Selected Work &amp; Case Studies</h2>
                <p className="section-desc">
                  Explore how we combine thoughtful design, modern Next.js engineering, and business understanding
                  to build measurable client outcomes.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="filter-pill-bar">
                <button
                  className={`filter-pill-btn ${activeFilter === "all" ? "active" : ""}`}
                  onClick={() => setActiveFilter("all")}
                >
                  All Works
                </button>
                <button
                  className={`filter-pill-btn ${activeFilter === "apps" ? "active" : ""}`}
                  onClick={() => setActiveFilter("apps")}
                >
                  Web &amp; Mobile
                </button>
                <button
                  className={`filter-pill-btn ${activeFilter === "cloud" ? "active" : ""}`}
                  onClick={() => setActiveFilter("cloud")}
                >
                  Cloud Enterprise
                </button>
                <button
                  className={`filter-pill-btn ${activeFilter === "automation" ? "active" : ""}`}
                  onClick={() => setActiveFilter("automation")}
                >
                  Business Automation
                </button>
                <button
                  className={`filter-pill-btn ${activeFilter === "branding" ? "active" : ""}`}
                  onClick={() => setActiveFilter("branding")}
                >
                  Branding
                </button>
              </div>
            </div>

            {/* Project Cards List */}
            <div className="impact-cards-list">
              {filteredProjects.map((project) => (
                <article key={project.id} className="impact-case-card">
                  {/* Left Column: Context & Narrative */}
                  <div className="impact-card-content">
                    <div>
                      <div className="impact-meta-top">
                        <span className="impact-index-pill">{project.num}</span>
                        <span className="impact-cat-pill">{project.category}</span>
                      </div>
                      <h3 className="impact-client-name">{project.client}</h3>
                      <div className="impact-scope-chips">
                        {project.scope.map((tag, idx) => (
                          <span key={idx} className="scope-chip">{tag}</span>
                        ))}
                      </div>
                      <p className="impact-narrative">{project.narrative}</p>

                      {/* Result Strip */}
                      <div className="impact-result-strip">
                        <div className="result-strip-label">Measurable Client Impact</div>
                        <div className="result-strip-value">{project.impactMetric}</div>
                      </div>
                    </div>

                    {/* Card Actions & Tech Stack */}
                    <div className="impact-card-bottom">
                      <div className="impact-tech-row">
                        {project.tech.map((t, idx) => (
                          <span key={idx} className="tech-tag-sm">{t}</span>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button
                          className="btn-secondary"
                          style={{ padding: "0.55rem 1.1rem", fontSize: "0.82rem" }}
                          onClick={() => setSelectedCase(project)}
                        >
                          Case Study ▾
                        </button>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                          style={{ padding: "0.55rem 1.1rem", fontSize: "0.82rem" }}
                        >
                          <span>Live Site</span>
                          <span className="btn-arrow">↗</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Frame */}
                  <div className="impact-card-visual">
                    <div className="visual-browser-mockup">
                      <div className="browser-header-dots">
                        <span className="b-dot b-dot-red"></span>
                        <span className="b-dot b-dot-yellow"></span>
                        <span className="b-dot b-dot-green"></span>
                      </div>
                      <div className="browser-screen-frame">
                        <Image
                          src={project.image}
                          alt={`${project.client} project preview`}
                          width={800}
                          height={500}
                          className="project-mockup-image"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            METRICS & SOCIAL PROOF BANNER (Design Asylum Dark Band)
            ==================================================================== */}
        <section className="metrics-banner-section">
          <div className="container">
            <h2 className="metrics-banner-headline">
              Where <span>85% of clients stay</span>, and 90% pass the word.
            </h2>
            <div className="metrics-4-grid">
              <div className="metric-banner-box">
                <div className="metric-banner-num">50<span>+</span></div>
                <div className="metric-banner-text">Products, platforms, and automated systems shipped</div>
              </div>
              <div className="metric-banner-box">
                <div className="metric-banner-num">70<span>%</span></div>
                <div className="metric-banner-text">Faster to production using modern Next.js workflows</div>
              </div>
              <div className="metric-banner-box">
                <div className="metric-banner-num">3<span>x</span></div>
                <div className="metric-banner-text">Engineering and design velocity with zero agency bloat</div>
              </div>
              <div className="metric-banner-box">
                <div className="metric-banner-num">15<span>+</span></div>
                <div className="metric-banner-text">Countries and global markets reached by our client platforms</div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            OUR STORY SECTION (Design Asylum Philosophy)
            ==================================================================== */}
        <section className="story-section" id="story">
          <div className="container">
            <div className="story-grid-2">
              <div className="story-left">
                <div className="section-eyebrow-pill">Our Story</div>
                <h2>Creative Thinking Meets Scalable Digital Technology.</h2>
                <p>
                  AJ Studio is an independent digital studio founded on a clear belief: great digital products
                  are not created by bloated agency committees or disconnected handoffs.
                </p>
                <p>
                  They are built through the tight union of <strong>thoughtful UI/UX design</strong>,
                  <strong> modern Next.js engineering</strong>, and <strong>practical business understanding</strong>.
                  When you partner with us, you work directly with experienced practitioners who understand
                  conversion rates, system architecture, and authentic brand presence.
                </p>
                <a href="#contact" className="btn-primary" style={{ marginTop: "1rem" }}>
                  <span>Partner With Us</span>
                  <span className="btn-arrow">↗</span>
                </a>
              </div>

              <div className="story-pillars-grid">
                <div className="story-pillar-item">
                  <div className="pillar-icon">🎯</div>
                  <h4 className="pillar-title">Design with Purpose</h4>
                  <p className="pillar-desc">
                    Every layout, typography scale, and button placement is chosen for a measurable reason — never decorative fluff.
                  </p>
                </div>
                <div className="story-pillar-item">
                  <div className="pillar-icon">⚡</div>
                  <h4 className="pillar-title">Engineered for Velocity</h4>
                  <p className="pillar-desc">
                    We code with modern Next.js, TypeScript, and clean CSS, achieving sub-second loads and 99+ PageSpeed scores.
                  </p>
                </div>
                <div className="story-pillar-item">
                  <div className="pillar-icon">💼</div>
                  <h4 className="pillar-title">Business Understanding</h4>
                  <p className="pillar-desc">
                    We align technical solutions with your bottom line — lead funnels, operational savings, and customer retention.
                  </p>
                </div>
                <div className="story-pillar-item">
                  <div className="pillar-icon">🔄</div>
                  <h4 className="pillar-title">Continuous Evolution</h4>
                  <p className="pillar-desc">
                    Digital products should evolve as your business scales. We provide proactive post-launch improvements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            OUR PROCESS SECTION (Design Asylum Methodology)
            ==================================================================== */}
        <section className="process-section" id="process">
          <div className="container">
            <div style={{ marginBottom: "3rem" }}>
              <div className="section-eyebrow-pill">Our Process</div>
              <h2 className="section-h2">From First Conversation to Production Launch</h2>
              <p className="section-desc">
                A proven, disciplined sprint framework that delivers products to market 70% faster without sacrificing craftsmanship.
              </p>
            </div>

            <div className="process-grid-6">
              {PROCESS_STEPS.map((step) => (
                <div key={step.num} className="process-step-card">
                  <div>
                    <div className="process-step-num">{step.num}</div>
                    <h3 className="process-step-title">{step.title}</h3>
                  </div>
                  <p className="process-step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            TESTIMONIALS SECTION (Design Asylum Quote Style)
            ==================================================================== */}
        <section className="testimonials-section">
          <div className="container">
            <div style={{ marginBottom: "3rem" }}>
              <div className="section-eyebrow-pill">Client Voices</div>
              <h2 className="section-h2">What Founders &amp; Operators Say</h2>
              <p className="section-desc">
                Real feedback from companies whose platforms we designed, developed, and automated.
              </p>
            </div>

            <div className="testimonials-grid-3">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="testimonial-card-item">
                  <div>
                    <div className="quote-stars-row">{t.stars}</div>
                    <blockquote className="quote-body-text">&ldquo;{t.quote}&rdquo;</blockquote>
                  </div>
                  <div className="quote-author-row">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="author-avatar"
                    />
                    <div className="author-info">
                      <span className="author-name">{t.name}</span>
                      <span className="author-role">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            INSIGHTS SECTION (Design Asylum Thought Leadership)
            ==================================================================== */}
        <section className="insights-section" id="insights">
          <div className="container">
            <div style={{ marginBottom: "3rem" }}>
              <div className="section-eyebrow-pill">Insights &amp; Inspiration</div>
              <h2 className="section-h2">Perspectives on Design, Code &amp; Growth</h2>
              <p className="section-desc">
                Actionable thoughts on modern UI/UX design, Next.js architecture, and operational automation.
              </p>
            </div>

            <div className="insights-grid-3">
              {INSIGHTS.map((item, idx) => (
                <article key={idx} className="insight-card-item">
                  <div>
                    <div className="insight-tag-row">
                      <span className="insight-cat-tag">{item.cat}</span>
                      <span className="insight-read-time">{item.time}</span>
                    </div>
                    <h3 className="insight-title">{item.title}</h3>
                    <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                  <span className="insight-read-link">
                    Read Guide <span>→</span>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            FAQ SECTION (Interactive Accordion)
            ==================================================================== */}
        <section className="faq-section" id="faq">
          <div className="container">
            <div className="faq-layout-2">
              <div>
                <div className="section-eyebrow-pill">FAQ</div>
                <h2 className="section-h2">Frequently Asked Questions</h2>
                <p className="section-desc">
                  Have questions about working with AJ Studio? Here are answers to the most common questions we receive.
                </p>
                <div style={{ marginTop: "2rem" }}>
                  <a href="#contact" className="btn-primary">
                    <span>Have Another Question?</span>
                    <span className="btn-arrow">↗</span>
                  </a>
                </div>
              </div>

              <div className="faq-list">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`faq-accordion-item ${openFaq === idx ? "open" : ""}`}
                  >
                    <button
                      className="faq-question-btn"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      aria-expanded={openFaq === idx}
                    >
                      <span>{faq.q}</span>
                      <span className="faq-toggle-icon">+</span>
                    </button>
                    {openFaq === idx && (
                      <div className="faq-answer-pane">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            CONTACT SECTION (Design Asylum "Got a project? Let's Connect")
            ==================================================================== */}
        <section className="contact-section" id="contact">
          <div className="container">
            <div className="contact-layout-2">
              {/* Left Column: Direct Inquiries */}
              <div>
                <div className="section-eyebrow-pill">Let&apos;s Connect</div>
                <h2 className="section-h2">
                  Got a project, collaboration, or question? Let&apos;s Connect
                </h2>
                <p className="section-desc">
                  Have an idea, business challenge, or need a dedicated digital design &amp; engineering partner?
                  Reach out directly and we will respond within 24 business hours.
                </p>

                <div className="contact-direct-cards">
                  <a href="mailto:ajstudio.projects@gmail.com" className="contact-channel-card">
                    <div className="channel-icon-glyph">✉</div>
                    <div className="channel-text-info">
                      <span className="channel-label">Official Studio Email</span>
                      <span className="channel-val">ajstudio.projects@gmail.com</span>
                    </div>
                  </a>

                  <a href="tel:+916378151265" className="contact-channel-card">
                    <div className="channel-icon-glyph">📞</div>
                    <div className="channel-text-info">
                      <span className="channel-label">Direct Phone &amp; Call</span>
                      <span className="channel-val">+91 6378151265</span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/916378151265"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-channel-card"
                  >
                    <div className="channel-icon-glyph" style={{ background: "#10b981" }}>💬</div>
                    <div className="channel-text-info">
                      <span className="channel-label">WhatsApp Quick Chat</span>
                      <span className="channel-val">Chat on WhatsApp ↗</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="contact-form-card">
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.45rem", fontWeight: 800, marginBottom: "1.5rem" }}>
                  Schedule a Project Discussion
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-grid-2">
                    <div className="form-field-group">
                      <label className="field-label" htmlFor="clientName">Your Name *</label>
                      <input
                        id="clientName"
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        className="field-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-field-group">
                      <label className="field-label" htmlFor="clientEmail">Work Email *</label>
                      <input
                        id="clientEmail"
                        type="email"
                        required
                        placeholder="you@company.com"
                        className="field-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-field-group">
                      <label className="field-label" htmlFor="clientPhone">Phone / WhatsApp *</label>
                      <input
                        id="clientPhone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="field-input"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-field-group">
                      <label className="field-label" htmlFor="serviceInterest">Solution Needed *</label>
                      <select
                        id="serviceInterest"
                        className="field-select"
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      >
                        <option value="UI/UX Design & Next.js Website">UI/UX Design &amp; Next.js Website</option>
                        <option value="Cloud Enterprise & SaaS Dashboard">Cloud Enterprise &amp; SaaS Dashboard</option>
                        <option value="Zoho CRM & Business Automation">Zoho CRM &amp; Business Automation</option>
                        <option value="Brand Identity & Design System">Brand Identity &amp; Design System</option>
                        <option value="Full Digital Transformation">Full Digital Transformation</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label" htmlFor="projectMessage">Project Overview &amp; Goals *</label>
                    <textarea
                      id="projectMessage"
                      required
                      placeholder="Briefly describe your project, timeline, target audience, or specific challenge..."
                      className="field-textarea"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="btn-primary form-submit-btn"
                  >
                    <span>{formState === "loading" ? "Submitting Inquiry..." : "Submit Project Inquiry"}</span>
                    <span className="btn-arrow">↗</span>
                  </button>

                  {formState === "success" && (
                    <div className="form-feedback-alert alert-success">
                      <span>✓</span>
                      <span>Thank you! Your inquiry has been received. We will contact you within 24 hours.</span>
                    </div>
                  )}

                  {formState === "error" && (
                    <div className="form-feedback-alert alert-error">
                      <span>✕</span>
                      <span>Submission encountered an issue. Please email us directly at ajstudio.projects@gmail.com</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          FOOTER SECTION (Design Asylum Agency Footer)
          ==================================================================== */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top-row">
            {/* Brand Col */}
            <div className="footer-brand-col">
              <a href="#home" className="brand-link" style={{ color: "#ffffff" }}>
                <div className="brand-glyph" style={{ background: "#ffffff", color: "#0a0d14" }}>AJ</div>
                <div className="brand-text">
                  <span className="brand-name" style={{ color: "#ffffff" }}>AJ STUDIO</span>
                  <span className="brand-sub" style={{ color: "var(--text-light-muted)" }}>DIGITAL STUDIO</span>
                </div>
              </a>
              <p>
                Independent digital design and technology studio helping scaling companies transform ideas into
                meaningful, high-impact digital experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <div className="footer-col-title">Navigation</div>
              <ul className="footer-link-list">
                <li><a href="#work">Featured Work</a></li>
                <li><a href="#solutions">Solutions</a></li>
                <li><a href="#story">Our Story</a></li>
                <li><a href="#process">Our Process</a></li>
                <li><a href="#insights">Insights</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <div className="footer-col-title">Capabilities</div>
              <ul className="footer-link-list">
                <li><a href="#solutions">Web &amp; Mobile Apps</a></li>
                <li><a href="#solutions">Cloud Enterprise</a></li>
                <li><a href="#solutions">Zoho CRM Automation</a></li>
                <li><a href="#solutions">Branding &amp; Identity</a></li>
                <li><a href="#solutions">AI Adoption</a></li>
                <li><a href="#solutions">Technical SEO</a></li>
              </ul>
            </div>

            {/* Direct Connect */}
            <div>
              <div className="footer-col-title">Direct Inquiries</div>
              <div className="footer-contact-items">
                <a href="mailto:ajstudio.projects@gmail.com">ajstudio.projects@gmail.com</a>
                <a href="tel:+916378151265">+91 6378151265</a>
                <span style={{ fontSize: "0.84rem", color: "var(--text-light-muted)", marginTop: "0.5rem" }}>
                  India &amp; Global Remote Collaboration
                </span>
                <a href="/secret-admin" style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "0.75rem" }}>
                  Portal Sign-In →
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <p className="footer-copy-text">
              &copy; 2026 AJ Studio. All Rights Reserved. Ideas into digital experiences.
            </p>
            <div className="footer-social-row">
              <a href="https://wa.me/916378151265" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="https://github.com/jagruti-gothwal/AJ-Studio" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="mailto:ajstudio.projects@gmail.com">Email</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          MODAL: CASE STUDY DEEP DIVE (Framer / Design Asylum Style)
          ==================================================================== */}
      {selectedCase && (
        <div className="modal-overlay" onClick={() => setSelectedCase(null)}>
          <div
            className="modal-dialog-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedCase(null)}
              aria-label="Close dialog"
            >
              ✕
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span className="impact-index-pill">{selectedCase.num}</span>
              <span className="impact-cat-pill">{selectedCase.category}</span>
            </div>

            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800, color: "var(--text-dark)", marginBottom: "0.5rem" }}>
              {selectedCase.client}
            </h3>

            <div className="impact-scope-chips" style={{ marginBottom: "1.5rem" }}>
              {selectedCase.scope.map((tag, idx) => (
                <span key={idx} className="scope-chip">{tag}</span>
              ))}
            </div>

            <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "1.75rem", background: "#0f1422" }}>
              <Image
                src={selectedCase.image}
                alt={selectedCase.client}
                width={800}
                height={460}
                style={{ width: "100%", height: "auto", maxHeight: "360px", objectFit: "cover" }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                The Challenge
              </h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.96rem", lineHeight: 1.65 }}>
                {selectedCase.challenges}
              </p>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Our Solution &amp; Technical Execution
              </h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.96rem", lineHeight: 1.65 }}>
                {selectedCase.solution}
              </p>
            </div>

            <div className="impact-result-strip" style={{ marginBottom: "2rem" }}>
              <div className="result-strip-label">Verified Client Result</div>
              <div className="result-strip-value">{selectedCase.impactMetric}</div>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href={selectedCase.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Visit Live Platform</span>
                <span className="btn-arrow">↗</span>
              </a>
              <button
                className="btn-secondary"
                onClick={() => setSelectedCase(null)}
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
