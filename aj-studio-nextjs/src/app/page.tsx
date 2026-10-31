"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const PROJECTS = [
  {
    id: 1,
    title: "Kaushik Sampath",
    client: "India Codes",
    clientType: "Freelancer & Blogger",
    logo: "/assets/indiacodes_logo.png",
    image: "/assets/kaushiksampath.jpg",
    tags: ["Freelancer & Blogger", "India Codes", "PIN & IFSC Directory"],
    desc: "A fast, responsive web platform and blog for Kaushik Sampath, an independent creator and tech blogger. Powers India Codes with search tools for India’s Postal/PIN codes, banking IFSC and SWIFT codes, STD/ISD directories, and developer articles.",
    link: "https://indiacodes.co.in/",
    tech: ["Next.js", "Search Directory", "Tech Blog", "REST APIs"],
    flip: false,
  },
  {
    id: 2,
    title: "Jahan Polymers",
    client: "JP JumboLite®",
    clientType: "Polymers Company",
    logo: "/assets/jahan_logo.jpg",
    image: "/assets/jahanpolymers.jpg",
    tags: ["Polymers Company", "JP JumboLite®", "Industrial B2B"],
    desc: "A modern B2B platform engineered for Jahan Polymers Private Limited, India’s leading polymers company and manufacturer of JP JumboLite® polycarbonate compact sheets. Features comprehensive product catalogs and automated quote request systems.",
    link: "https://jumbolite.co.in/",
    tech: ["Next.js", "Product Catalog", "Instant RFQ", "Responsive UI"],
    flip: true,
  },
  {
    id: 3,
    title: "Tree India Exports",
    client: "Tree India Exports",
    clientType: "Global Confectionery Exporter",
    logo: "/assets/treeindia_logo.png",
    image: "/assets/treeindia.jpg",
    tags: ["Global Exporter", "Confectionery & Snacks", "15+ Countries"],
    desc: "A vibrant, international export platform built for Tree India, delivering premium Indian confectionery, candies, lollipops, biscuits, and chocolates across 15+ countries worldwide. Equipped with dynamic showcases and global compliance badges.",
    link: "https://www.treeindiaexports.com/",
    tech: ["Next.js", "Global Trade", "FMCG Catalog", "Export Desk"],
    flip: false,
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
  { icon: "🖥️", title: "Web Design", desc: "Performant, SEO-optimized, and visually stunning websites that convert." },
  { icon: "⚡", title: "App Development", desc: "Dynamic web applications built with modern engineering and Next.js." },
  { icon: "🎨", title: "UI/UX Design", desc: "Intuitive user journeys mapped using Figma and industry-leading systems." },
  { icon: "📱", title: "Social & Video", desc: "Scroll-stopping designs and video edits that elevate your brand presence." },
];

const PROCESS = [
  { num: "01", title: "Discovery", desc: "We dive deep into your brand and goals to map a strategic roadmap." },
  { num: "02", title: "Design", desc: "Crafting wireframes and high-fidelity, interactive prototypes." },
  { num: "03", title: "Build", desc: "Engineering robust solutions using modern tech stacks." },
  { num: "04", title: "Launch", desc: "Testing rigorously, deploying, and providing ongoing growth support." },
];

const MARQUEE_CLIENTS = [
  { name: "Kaushik Sampath", logo: "/assets/indiacodes_logo.png" },
  { name: "Jahan Polymers", logo: "/assets/jahan_logo.jpg" },
  { name: "Tree India Exports", logo: "/assets/treeindia_logo.png" },
  { name: "Kaushik Sampath", logo: "/assets/indiacodes_logo.png" },
  { name: "Jahan Polymers", logo: "/assets/jahan_logo.jpg" },
  { name: "Tree India Exports", logo: "/assets/treeindia_logo.png" },
];

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", interest: "", message: "" });
  const [formState, setFormState] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
        <div className="container nav-content">
          <a href="#home" className="logo">
            AJ Studio<span className="dot">.</span>
          </a>
          
          <ul className={`nav-links${menuOpen ? " open" : ""}`}>
            {["about", "services", "portfolio", "process", "contact"].map((s) => (
              <li key={s}>
                <a
                  href={`#${s}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {s === "portfolio" ? "Work" : s.charAt(0).toUpperCase() + s.slice(1)}
                </a>
              </li>
            ))}
            {menuOpen && (
              <li className="mobile-cta-item">
                <a
                  href="#contact"
                  className="btn btn-primary w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Start a Project
                </a>
              </li>
            )}
          </ul>

          <div className="nav-actions">
            <a href="#contact" className="btn btn-primary sm-hide">
              Start a Project
            </a>
            <button
              className={`mobile-menu-btn${menuOpen ? " active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="pill-badge">
                <span className="pulse" /> Premium Digital Agency
              </div>
              <h1 className="fade-in fade-in-delay-1">
                Building Modern<br />
                <span className="gradient-text">Digital Experiences</span><br />
                For Brands.
              </h1>
              <p className="hero-sub fade-in fade-in-delay-2">
                AJ Studio helps businesses elevate their digital presence. From immersive websites and web apps to scroll-stopping content, we design for impact.
              </p>
              <div className="hero-actions fade-in fade-in-delay-3">
                <a href="#portfolio" className="btn btn-primary">View Work</a>
                <a href="#contact" className="btn btn-secondary">Start a Project</a>
              </div>
            </div>

            <div className="hero-visual fade-in fade-in-delay-4">
              <div className="hero-visual-card">
                <div className="hero-img-container">
                  <img
                    src="/assets/hero.png"
                    alt="AJ Studio Digital Abstract Art"
                    className="hero-main-img"
                  />
                  <div className="hero-img-overlay" />
                </div>
                
                {/* Floating Badges */}
                <div className="floating-badge badge-top-right">
                  <span>✨</span> UI/UX Design
                </div>
                <div className="floating-badge badge-mid-left">
                  <span>⚡</span> Web Apps
                </div>
                <div className="floating-badge badge-bottom-right">
                  <span>📱</span> Content & Branding
                </div>

                <div className="hero-card-footer">
                  <div className="status-pill">
                    <span className="pulse" /> Available for New Projects
                  </div>
                  <div className="mini-stats">
                    <div className="mini-stat">
                      <span className="num">50+</span>
                      <span className="lbl">Projects</span>
                    </div>
                    <div className="mini-stat">
                      <span className="num">100%</span>
                      <span className="lbl">Satisfaction</span>
                    </div>
                    <div className="mini-stat">
                      <span className="num">3+</span>
                      <span className="lbl">Years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee-section">
          <div className="marquee-track">
            {[...MARQUEE_CLIENTS, ...MARQUEE_CLIENTS].map((client, i) => (
              <div key={i} className="marquee-item">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="marquee-logo"
                />
                <span className="marquee-name">{client.name}</span>
                <span className="marquee-star">✧</span>
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section className="section" id="about">
          <div className="container about-grid">
            <div className="about-text">
              <span className="section-label">About</span>
              <h2 className="section-title">Crafting digital<br />excellence.</h2>
              <p>AJ Studio is run by a passionate UI/UX designer and developer dedicated to helping brands thrive in the modern landscape.</p>
              <p>We believe that a strong digital presence is no longer optional. By combining minimal aesthetics with robust engineering, we create products that drive real results. From scalable web platforms to brand identities, we handle the complexity so you can focus on growth.</p>
              <div className="stats-row">
                <div className="stat"><div className="num">50+</div><div className="lbl">Projects Delivered</div></div>
                <div className="stat"><div className="num">100%</div><div className="lbl">Satisfaction Rate</div></div>
                <div className="stat"><div className="num">3+</div><div className="lbl">Years of Excellence</div></div>
              </div>
            </div>
            <div className="expertise-glass">
              <h3>Core Expertise</h3>
              <ul className="expertise-list">
                {[
                  { icon: "✨", title: "UI/UX Design", desc: "Premium, user-centered interfaces with Figma prototyping." },
                  { icon: "💻", title: "Modern Web Development", desc: "High-performance websites and full-stack web applications." },
                  { icon: "📱", title: "Content Creation", desc: "Dynamic video editing, motion graphics, and social content." },
                ].map(e => (
                  <li key={e.title} className="expertise-item">
                    <div className="exp-icon">{e.icon}</div>
                    <div><h4>{e.title}</h4><p>{e.desc}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section className="section section-dark" id="portfolio">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Work</span>
              <h2 className="section-title">Featured Work</h2>
              <p className="section-sub">A glimpse into recently launched products for our trusted partners.</p>
            </div>
            <div className="portfolio-grid">
              {PROJECTS.map((p) => (
                <div key={p.id} className={`project-card${p.flip ? " flip" : ""}`}>
                  <div className="project-img-wrap">
                    <img
                      src={p.image}
                      alt={`${p.title} - ${p.client}`}
                      className="project-img"
                    />
                    <div className="project-overlay">
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="view-btn">
                        Visit Live Website ↗
                      </a>
                    </div>
                  </div>
                  <div className="project-info">
                    <div className="project-client-badge">
                      <img src={p.logo} alt={`${p.client} Logo`} className="project-client-logo" />
                      <span className="project-client-type">{p.clientType}</span>
                    </div>
                    <div className="project-tags">
                      {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="project-actions">
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                        Explore Live Website ↗
                      </a>
                    </div>
                    <div className="tech-stack">
                      {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section" id="services">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Services</span>
              <h2 className="section-title">Our Capabilities</h2>
              <p className="section-sub">End-to-end digital solutions tailored for ambitious brands.</p>
            </div>
            <div className="services-grid">
              {SERVICES.map(s => (
                <div key={s.title} className="service-card">
                  <div className="svc-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section section-dark" id="process">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">How We Work</span>
              <h2 className="section-title">The Process</h2>
            </div>
            <div className="process-grid">
              {PROCESS.map(s => (
                <div key={s.num} className="process-card">
                  <div className="step-num">{s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Testimonials</span>
              <h2 className="section-title">Client Love</h2>
            </div>
            <div className="testi-grid">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="testi-card">
                  <div className="quote">&ldquo;</div>
                  <p className="testi-text">{t.quote}</p>
                  <div className="client-info">
                    {t.isLogo ? (
                      <img src={t.avatar} alt={t.name} className="client-avatar-logo" />
                    ) : (
                      <img src={t.avatar} alt={t.name} className="client-avatar-img" />
                    )}
                    <div>
                      <h4>{t.name}</h4>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section section-dark" id="contact">
          <div className="container contact-grid">
            <div className="contact-info">
              <span className="section-label">Contact</span>
              <h2>Let&apos;s build something<br /><span className="gradient-text">extraordinary.</span></h2>
              <p>Ready to elevate your digital presence? Reach out, and let&apos;s discuss your next big idea.</p>
              <div className="contact-detail">
                <span>✉️</span>
                <a href="mailto:hello@ajstudio.dev">hello@ajstudio.dev</a>
              </div>
              <div className="contact-detail">
                <span>📍</span>
                <span>Available Worldwide</span>
              </div>
            </div>
            <div className="form-glass">
              {formState === "success" ? (
                <div className="form-success">
                  <div style={{fontSize:"2.5rem",marginBottom:"1rem"}}>✅</div>
                  <p>Message sent! We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <select value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})} required>
                      <option value="" disabled>Area of Interest</option>
                      <option value="website">Website Design & Dev</option>
                      <option value="webapp">Web App</option>
                      <option value="uiux">UI/UX Interface</option>
                      <option value="other">Other / General</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea rows={4} placeholder="Tell us about your project..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required />
                  </div>
                  {formState === "error" && <p style={{color:"#f87171",fontSize:"0.85rem",marginBottom:"1rem"}}>Something went wrong. Please try again.</p>}
                  <button type="submit" className="btn btn-primary w-full" disabled={formState === "loading"}>
                    {formState === "loading" ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-logo">
            <a href="#home" className="logo">AJ Studio<span className="dot">.</span></a>
            <p>Building Digital Empires.</p>
          </div>
          <p className="footer-copy">&copy; 2026 AJ Studio. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter">X / Twitter</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Dribbble">Dribbble</a>
          </div>
        </div>
      </footer>
    </>
  );
}
