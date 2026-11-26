"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import logo from "./assets/logo/logo.png";

const services = [
  {
    id: "website-development",
    num: "01",
    title: "Business Website Development",
    description: "High-converting, responsive websites built for speed, brand authority, and search visibility.",
    features: ["Corporate Sites", "Landing Pages", "Website Redesign", "SEO Optimization"],
    accent: "blue",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    id: "web-applications",
    num: "02",
    title: "Custom Web Application Development",
    description: "Powerful web portals, admin dashboards, and custom software that automate daily business operations.",
    features: ["Custom Dashboards", "Management Portals", "Workflow Automation", "API Integrations"],
    accent: "green",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    )
  },
  {
    id: "ecommerce-development",
    num: "03",
    title: "E-commerce Website Development",
    description: "Modern online storefronts with seamless product management, shopping carts, and payment gateways.",
    features: ["Custom Stores", "Cart & Checkout", "Payment Gateways", "Inventory Sync"],
    accent: "coral",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    )
  },
  {
    id: "mobile-development",
    num: "04",
    title: "Mobile Application Development",
    description: "High-performance iOS and Android applications delivering fluid, native mobile experiences.",
    features: ["iOS & Android", "React Native", "Flutter Apps", "Real-Time Sync"],
    accent: "blue",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    )
  },
  {
    id: "saas-development",
    num: "05",
    title: "SaaS & Software Development",
    description: "Scalable cloud software engineered with multi-tenant architectures, subscription billing, and secure APIs.",
    features: ["SaaS Architecture", "Multi-Tenant", "Subscription Billing", "Cloud Backends"],
    accent: "green",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
      </svg>
    )
  },
  {
    id: "ai-automation",
    num: "06",
    title: "AI Integration & Business Automation",
    description: "Intelligent AI chatbots, automated business pipelines, and smart voice systems that save time.",
    features: ["AI Chatbots", "Voice Automation", "Process Pipelines", "OpenAI APIs"],
    accent: "coral",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    )
  }
];

const valueProps = [
  {
    num: "01",
    title: "Business-Focused Solutions",
    description: "Engineered around your real business workflows, customer journeys, and measurable growth outcomes.",
    badge: "Strategy",
    metric: "Outcome-Driven",
    accent: "blue",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    )
  },
  {
    num: "02",
    title: "Modern Technology",
    description: "Clean code, modern frameworks, and cloud-native architecture ensuring speed and maintainability.",
    badge: "Engineering",
    metric: "Modern Stack",
    accent: "green",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  },
  {
    num: "03",
    title: "Performance & Security",
    description: "Sub-second load times, Core Web Vitals optimization, and security best practices built in from day one.",
    badge: "Reliability",
    metric: "99+ Performance",
    accent: "coral",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    )
  },
  {
    num: "04",
    title: "Built to Scale",
    description: "Flexible, cloud-ready infrastructures designed to accommodate growing traffic and seamless feature expansion.",
    badge: "Growth",
    metric: "Cloud-Native",
    accent: "blue",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.62 5-2 5-2" />
        <path d="M12 15v5s3.03-.55 4.5-2c1.62-1.62 2-5 2-5" />
      </svg>
    )
  }
];

const advantages = [
  {
    title: "Custom Development",
    description: "No unnecessary templates or one-size-fits-all solutions. Everything is engineered for your exact business requirements."
  },
  {
    title: "Modern UI/UX",
    description: "User-friendly interfaces crafted to make complex workflows intuitive, effortless, and conversion-oriented."
  },
  {
    title: "Performance First",
    description: "Fast-loading, optimized digital experiences tuned for search engines, high retention, and low latency."
  },
  {
    title: "Secure Architecture",
    description: "Security-conscious development, safe data handling, CSRF protection, and strict environment isolation."
  },
  {
    title: "Scalable Solutions",
    description: "Systems designed to handle growing traffic, high transaction volumes, and ongoing product evolution."
  },
  {
    title: "Ongoing Support",
    description: "Continued improvements, proactive maintenance, feature iterations, and dedicated technical assistance."
  }
];

const processSteps = [
  {
    num: "01",
    phase: "DISCOVER",
    title: "Research & Scoping",
    deliverable: "Roadmap & Scope",
    description: "Understanding your business goals, target audience, and key features."
  },
  {
    num: "02",
    phase: "PLAN & DESIGN",
    title: "UI/UX & Architecture",
    deliverable: "Wireframes & Design",
    description: "System architecture, database schema, and high-fidelity interfaces."
  },
  {
    num: "03",
    phase: "DEVELOP",
    title: "Full-Stack Engineering",
    deliverable: "Production Code",
    description: "Clean frontend components, secure backend APIs, and integrations."
  },
  {
    num: "04",
    phase: "TEST & DEPLOY",
    title: "QA & Cloud Launch",
    deliverable: "Zero-Downtime Live",
    description: "Cross-device testing, performance audits, and secure deployment."
  },
  {
    num: "05",
    phase: "SUPPORT & SCALE",
    title: "Continuous Growth",
    deliverable: "24/7 Monitoring",
    description: "Ongoing maintenance, speed optimization, and feature iterations."
  }
];

const portfolioCategories = [
  "All Projects",
  "Websites",
  "Web Applications",
  "E-commerce",
  "Mobile Applications",
  "SaaS Platforms"
];

const portfolioProjects = [
  {
    id: "corp-website",
    name: "Corporate Business Website",
    category: "Websites",
    type: "Websites",
    description:
      "Modern corporate web presence with rapid loading, semantic SEO, interactive service catalogues, and lead capture workflows.",
    tech: ["Next.js", "Tailwind CSS", "Vercel", "SEO"],
    isConcept: true,
    accent: "blue",
    metrics: "98/100 Lighthouse · <1s FCP"
  },
  {
    id: "ecommerce-store",
    name: "E-commerce Shopping Platform",
    category: "E-commerce",
    type: "E-commerce",
    description:
      "High-conversion online storefront featuring smart search, variant filters, cart management, and seamless Razorpay checkout.",
    tech: ["React.js", "Node.js", "Razorpay", "PostgreSQL"],
    isConcept: true,
    accent: "coral",
    metrics: "Instant Checkout · Mobile-First"
  },
  {
    id: "pg-management",
    name: "PG Management System",
    category: "Web Applications",
    type: "Web Applications",
    description:
      "Comprehensive operations management platform for property owners, covering multi-property rooms, beds, rent collection, and tenant verification.",
    tech: ["Next.js", "Node.js", "MySQL", "REST APIs"],
    isConcept: false,
    accent: "green",
    metrics: "Multi-Property · Live Bed Tracking"
  },
  {
    id: "auto-service-app",
    name: "Vehicle Service Management System",
    category: "Web Applications",
    type: "Web Applications",
    description:
      "End-to-end service station web application managing customer job cards, mechanics assignment, parts inventory, and digital invoicing.",
    tech: ["React.js", "Express.js", "PostgreSQL", "Tailwind"],
    isConcept: true,
    accent: "blue",
    metrics: "Digital Job Cards · Inventory Flow"
  },
  {
    id: "saas-dashboard",
    name: "SaaS Business Dashboard",
    category: "SaaS Platforms",
    type: "SaaS Platforms",
    description:
      "Multi-tenant subscription and metrics portal providing real-time MRR tracking, user seat management, role permissions, and exportable reports.",
    tech: ["Next.js", "Supabase", "Chart.js", "Stripe"],
    isConcept: true,
    accent: "green",
    metrics: "Role-Based RBAC · Real-time Analytics"
  },
  {
    id: "campaign-app",
    name: "Campaign Management Web Application",
    category: "Web Applications",
    type: "Web Applications",
    description:
      "Marketing campaign orchestrator with lead attribution tracking, automated webhook dispatching, and conversion performance dashboards.",
    tech: ["React.js", "Node.js", "MongoDB", "Webhooks"],
    isConcept: true,
    accent: "coral",
    metrics: "Lead Attribution · Webhook Engine"
  }
];

const industries = [
  {
    title: "Retail & E-commerce",
    description:
      "Custom shopping experiences, inventory management, dynamic pricing engines, and multi-channel checkout solutions.",
    icon: "🛒"
  },
  {
    title: "Healthcare & Wellness",
    description:
      "Secure patient booking systems, clinic dashboards, tele-consultation portals, and HIPAA-conscious data management.",
    icon: "⚕️"
  },
  {
    title: "Education & Training",
    description:
      "LMS platforms, student management systems, automated certificate issuance, and interactive course platforms.",
    icon: "🎓"
  },
  {
    title: "Hospitality & Accommodation",
    description:
      "PG & hostel management systems, room booking engines, tenant verification portals, and automated rental invoicing.",
    icon: "🏨"
  },
  {
    title: "Automotive & Vehicle Services",
    description:
      "Workshop management portals, digital job card software, spare parts inventory systems, and customer service trackers.",
    icon: "🚗"
  },
  {
    title: "Startups & Professional Services",
    description:
      "Custom MVPs, client management portals, automated proposals, and robust SaaS architectures built for early traction.",
    icon: "🚀"
  }
];

const faqs = [
  {
    question: "What types of websites do you develop?",
    answer:
      "We develop corporate websites, business websites, high-converting landing pages, portfolio websites, and custom-designed responsive web portals engineered for your specific business requirements."
  },
  {
    question: "Can you develop custom web applications?",
    answer:
      "Yes. We develop custom business applications, management systems, operations dashboards, customer portals, and workflow automation platforms tailored to automate your operations and save hours of manual effort."
  },
  {
    question: "Do you develop e-commerce websites?",
    answer:
      "Yes. We create custom online stores with product catalog management, intuitive shopping carts, secure payment gateway integration (Razorpay, Cashfree, Stripe), and efficient order management systems."
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes. We can redesign your existing website while carefully maintaining your established brand identity, logos, and recognizable aesthetic, while massively upgrading user experience, speed, SEO, and responsiveness."
  },
  {
    question: "Do you provide mobile application development?",
    answer:
      "Yes. We provide mobile application development solutions for Android, iOS, and cross-platform frameworks like React Native and Flutter, connected seamlessly with your backend APIs."
  },
  {
    question: "How long does a development project take?",
    answer:
      "Project timelines depend on complexity, feature scope, and integrations. A modern corporate website typically takes 1–3 weeks, while custom web applications or full SaaS platforms range from 3–8 weeks. We provide a detailed delivery timeline after reviewing your specifications."
  },
  {
    question: "Do you provide maintenance and support?",
    answer:
      "Yes. We provide post-launch technical support, security patching, dependency updates, server monitoring, performance enhancements, and iterative feature improvements based on the agreed service scope."
  },
  {
    question: "How can I get a quotation?",
    answer:
      "Simply fill out our project enquiry form below or click 'Start a Project'. Share your goals, required features, and budget tier. Our team will review your specifications and contact you promptly with recommendations and a clear proposal."
  }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [sending, setSending] = useState(false);

  const heroWords = useMemo(
    () => "We Build Digital Products That Move Businesses Forward.".split(" "),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("Submitting your project details...");
    setStatusType("info");
    setSending(true);

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Failed to submit enquiry. Please try again or reach out on WhatsApp.");
      }

      form.reset();
      setSelectedService("");
      setStatus(result.message || "Enquiry sent! We will review your project and get in touch shortly.");
      setStatusType("success");
    } catch (error) {
      setStatus(error.message || "Could not send enquiry right now. Please message us directly.");
      setStatusType("error");
    } finally {
      setSending(false);
    }
  }

  function handleServiceSelect(serviceTitle) {
    setSelectedService(serviceTitle);
    const enquirySection = document.getElementById("contact");
    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: "smooth" });
    }
  }

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All Projects") return portfolioProjects;
    return portfolioProjects.filter((p) => p.category === activeFilter || p.type === activeFilter);
  }, [activeFilter]);

  const navLinks = [
    { label: "Home", href: "#top" },
    { label: "Services", href: "#services" },
    { label: "Our Work", href: "#work" },
    { label: "About Us", href: "#why-us" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      {/* Brand Opening Curtain Animation */}
      <div className="splash" aria-hidden="true">
        <div className="splash-row splash-row-top">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="splash-box" key={`top-${i}`} />
          ))}
        </div>
        <div className="splash-row splash-row-bottom">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="splash-box" key={`bottom-${i}`} />
          ))}
        </div>
      </div>

      {/* Site Header */}
      <header className={`site-header ${menuOpen ? "menu-active" : ""}`}>
        <a className="brand desktop-brand" href="#top" aria-label="StackWebApp home">
          <img
            className="brand-logo-image"
            src={logo.src}
            alt="StackWebApp logo"
            width="1024"
            height="1024"
          />
        </a>

        {/* Desktop Centered Pill Navigation */}
        <nav className="nav-pill" aria-label="Primary navigation">
          <a className="nav-logo" href="#top" aria-label="StackWebApp home">
            <img
              className="brand-logo-image"
              src={logo.src}
              alt="StackWebApp logo"
              width="1024"
              height="1024"
            />
          </a>
          <a href="#services">Services</a>
          <a href="#work">Our Work</a>
          <a href="#why-us">About Us</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
          <a className="nav-cta" href="#contact">Start a Project</a>
        </nav>

        <a className="header-cta" href="#contact">Start a Project</a>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`menu-btn ${menuOpen ? "open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      {/* Mobile Slide-down Menu */}
      <aside className={`menu-panel ${menuOpen ? "open" : ""}`} aria-label="Mobile menu">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          style={{ color: "var(--blue)", marginTop: "12px", display: "inline-block" }}
        >
          Start a Project →
        </a>
      </aside>

      <main id="top">
        {/* SECTION 1: HERO */}
        <section className="hero">
          <div className="hero-media" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-layout">
              <div className="hero-copy">
                <h1 className="hero-title" aria-label="We Build Digital Products That Move Businesses Forward.">
                  {heroWords.map((word, index) => {
                    const isHighlight =
                      word === "Digital" || word === "Products" || word === "Move" || word === "Forward.";
                    return (
                      <Fragment key={`${word}-${index}`}>
                        <span
                          className={`word ${isHighlight ? "hero-highlight" : ""}`}
                          style={{ animationDelay: `${0.9 + index * 0.04}s` }}
                        >
                          {word}
                        </span>
                        {(word === "Products" || word === "Businesses") && (
                          <br className="mobile-title-break" />
                        )}
                      </Fragment>
                    );
                  })}
                </h1>

                <p className="hero-lead">
                  We design and develop modern websites, custom web applications, e-commerce platforms,
                  and mobile applications that solve real business problems and create opportunities for growth.
                </p>

                <div className="hero-actions">
                  <a className="cta-btn" href="#contact">
                    <span className="cta-bg" />
                    <span className="cta-text">Start Your Project</span>
                    <span className="cta-circle" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M5 13L13 5M13 5H6M13 5V12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                  <a className="ghost-link" href="#work">
                    Explore Our Work
                  </a>
                </div>
              </div>

              {/* Realistic Studio Dashboard / Code Workspace Visual */}
              <div className="hero-console reveal" aria-label="StackWebApp digital product engineering console">
                <div className="console-shell">
                  <div className="console-nav">
                    <div className="console-nav-left">
                      <span className="console-window-dots">
                        <i className="dot-red" />
                        <i className="dot-yellow" />
                        <i className="dot-green" />
                      </span>
                      <strong>StackWebApp Engine</strong>
                    </div>
                    <b>Production Ready</b>
                  </div>

                  <div className="console-kpis">
                    <div>
                      <span>Core Web Vitals</span>
                      <strong>99+</strong>
                    </div>
                    <div>
                      <span>Uptime Target</span>
                      <strong>99.9%</strong>
                    </div>
                    <div>
                      <span>API Latency</span>
                      <strong>&lt;45ms</strong>
                    </div>
                    <div>
                      <span>Security Grade</span>
                      <strong>A+</strong>
                    </div>
                  </div>

                  <div className="console-body">
                    <div className="code-editor-card">
                      <div className="editor-tab-bar">
                        <span className="editor-tab">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          stack.config.ts
                        </span>
                        <span className="editor-status-pill">Active</span>
                      </div>
                      <div className="code-content">
                        <div className="code-line"><span className="line-no">1</span><span><span className="kwd">const</span> <span className="def">project</span> = <span className="fn">createDigitalProduct</span>({'{'}</span></div>
                        <div className="code-line"><span className="line-no">2</span><span>  <span className="prop">stack</span>: [<span className="str">"Next.js"</span>, <span className="str">"Node.js"</span>, <span className="str">"Cloud"</span>],</span></div>
                        <div className="code-line"><span className="line-no">3</span><span>  <span className="prop">architecture</span>: <span className="str">"Scalable &amp; Secure"</span>,</span></div>
                        <div className="code-line"><span className="line-no">4</span><span>  <span className="prop">performance</span>: <span className="str">"Sub-second FCP"</span></span></div>
                        <div className="code-line"><span className="line-no">5</span><span>{'}'});</span></div>
                      </div>
                    </div>

                    <div className="rent-card">
                      <span>Performance Metrics</span>
                      <strong>Optimized</strong>
                      <div className="rent-bars">
                        <i title="Frontend Optimization" />
                        <i title="API Response" />
                        <i title="Caching Layer" />
                        <i title="Database Query Speed" />
                      </div>
                    </div>
                  </div>

                  <div className="console-flow">
                    <div>
                      <span>System Status</span>
                      <b>High Availability</b>
                    </div>
                    <div>
                      <span>Deployment Pipeline</span>
                      <b>CI/CD Active</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: TRUST / VALUE PROPOSITION */}
        <section className="value-band" id="trust">
          <div className="section-inner">
            <div className="section-heading reveal">
              <div>
                <h2>Technology Built Around Your Business.</h2>
              </div>
              <p>
                Every business has different goals. We create tailored digital solutions that match your
                requirements, simplify operations, improve customer experiences, and support long-term growth.
              </p>
            </div>

            <div className="value-grid">
              {valueProps.map((item, index) => (
                <article
                  className={`value-pillar-card reveal value-item-${index + 1}`}
                  key={item.title}
                  style={{ animationDelay: `${0.1 + index * 0.12}s` }}
                >
                  <div className="value-card-shimmer" aria-hidden="true" />
                  <div className="value-card-head">
                    <div className="value-icon-box">
                      <div className={`value-icon accent-${item.accent}`} aria-hidden="true">
                        {item.icon}
                      </div>
                      <span className="value-badge">{item.badge}</span>
                    </div>
                    <span className="value-index-num">{item.num}</span>
                  </div>

                  <h3 className="value-card-title">{item.title}</h3>
                  <p className="value-card-desc">{item.description}</p>

                  <div className="value-card-footer">
                    <span className="value-metric-tag">✦ {item.metric}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: OUR SERVICES */}
        <section className="feature-map" id="services">
          <div className="section-inner">
            <div className="section-heading reveal">
              <div>
                <h2>Everything You Need to Build Your Digital Future.</h2>
              </div>
              <p>
                From your first business website to advanced software platforms, we provide end-to-end
                development solutions built to scale.
              </p>
            </div>

            <div className="feature-groups">
              {services.map((service) => (
                <article className="feature-card service-card reveal" key={service.id}>
                  <div className="feature-header-row">
                    <div className="service-icon-wrap">
                      <div className={`feature-icon accent-${service.accent}`} aria-hidden="true">
                        {service.icon}
                      </div>
                      <span className="service-number">{service.num}</span>
                    </div>
                    <button
                      type="button"
                      className="service-select-btn"
                      onClick={() => handleServiceSelect(service.title)}
                    >
                      Discuss Project →
                    </button>
                  </div>
                  <h3>{service.title}</h3>
                  <p className="service-desc">{service.description}</p>
                  <div className="chips">
                    {service.features.map((feature) => (
                      <span className="chip" key={feature}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: WHY CHOOSE STACKWEBAPP */}
        <section className="dashboard-band" id="why-us">
          <div className="section-inner">
            <div className="section-heading reveal">
              <div>
                <span className="section-eyebrow dark">WHY CHOOSE US</span>
                <h2>More Than Development. We're Your Technology Partner.</h2>
              </div>
              <p>
                We combine thoughtful design, modern engineering, and business-focused thinking to create
                digital solutions that deliver real value.
              </p>
            </div>

            <div className="advantages-grid">
              {advantages.map((adv, index) => (
                <div className="preview advantage-card reveal" key={adv.title}>
                  <div className="preview-top">
                    <div className="dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="preview-title">Advantage 0{index + 1}</div>
                  </div>
                  <h3>{adv.title}</h3>
                  <p>{adv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: OUR DEVELOPMENT PROCESS */}
        <section className="workflow" id="process">
          <div className="section-inner">
            <div className="section-heading reveal">
              <div>
                <h2>From Idea to Launch. We Make It Happen.</h2>
              </div>
              <p>
                A transparent and structured development pipeline that turns your business concept into a scalable digital product.
              </p>
            </div>

            {/* Animative Step-by-Step Flow */}
            <div className="process-flow-track reveal">
              <div className="flow-progress-beam" aria-hidden="true" />
              <div className="process-flow-grid">
                {processSteps.map((step, index) => (
                  <div
                    className={`process-step-card reveal step-item-${index + 1}`}
                    key={step.num}
                  >
                    <div className="step-card-top">
                      <span className="step-node-number">{step.num}</span>
                      {index < processSteps.length - 1 && (
                        <span className="step-flow-arrow" aria-hidden="true">→</span>
                      )}
                    </div>
                    <span className="step-phase-badge">{step.phase}</span>
                    <h3 className="step-card-title">{step.title}</h3>
                    <p className="step-card-desc">{step.description}</p>
                    <span className="step-deliverable-chip">✓ {step.deliverable}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: OUR WORK / PORTFOLIO */}
        <section className="portfolio-section" id="work">
          <div className="section-inner">
            <div className="section-heading reveal">
              <div>
                <span className="section-eyebrow">OUR PORTFOLIO</span>
                <h2>Ideas Turned Into Digital Solutions.</h2>
              </div>
              <p>
                Explore digital experiences and software solutions designed to solve real-world business
                challenges and unlock operational efficiency.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="portfolio-filters reveal" role="tablist" aria-label="Portfolio filters">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === cat}
                  className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div className="portfolio-grid">
              {filteredProjects.map((project) => (
                <article className="portfolio-card reveal" key={project.id}>
                  {/* Concept / Production Preview Graphic */}
                  <div className={`project-preview-mockup bg-${project.accent}`}>
                    <div className="mockup-header">
                      <span className="mockup-dots"><i /><i /><i /></span>
                      <span className="mockup-category">{project.category}</span>
                    </div>
                    <div className="mockup-content">
                      <div className="mockup-screen-title">{project.name}</div>
                      <div className="mockup-signal-bar">
                        <span>Status: Active</span>
                        <b>{project.metrics}</b>
                      </div>
                    </div>
                  </div>

                  <div className="portfolio-body">
                    <div className="portfolio-tag-row">
                      <span className="project-category-tag">{project.category}</span>
                      {project.isConcept ? (
                        <span className="concept-badge">Concept Project</span>
                      ) : (
                        <span className="live-badge">Verified System</span>
                      )}
                    </div>

                    <h3>{project.name}</h3>
                    <p>{project.description}</p>

                    <div className="chips project-tech-chips">
                      {project.tech.map((t) => (
                        <span className="chip" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      className="project-cta-link"
                      href="#contact"
                      onClick={() => handleServiceSelect(project.category)}
                    >
                      Discuss Similar Project →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: INDUSTRIES WE SERVE */}
        <section className="industries-band" id="industries">
          <div className="section-inner">
            <div className="section-heading reveal">
              <div>
                <span className="section-eyebrow">EXPERTISE ACROSS SECTORS</span>
                <h2>Digital Solutions for Every Industry.</h2>
              </div>
              <p>
                We help businesses across different industries digitize their operations, improve customer
                experiences, and build efficient digital systems.
              </p>
            </div>

            <div className="industries-grid">
              {industries.map((ind) => (
                <article className="feature-card industry-card reveal" key={ind.title}>
                  <div className="industry-icon">{ind.icon}</div>
                  <h3>{ind.title}</h3>
                  <p>{ind.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ */}
        <section className="faq-band" id="faq">
          <div className="section-inner">
            <div className="section-heading reveal">
              <div>
                <span className="section-eyebrow">COMMON QUESTIONS</span>
                <h2>Frequently Asked Questions.</h2>
              </div>
              <p>
                Clear answers regarding our development process, tech capabilities, timelines, and post-launch
                support.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    className={`faq-item reveal ${isOpen ? "open" : ""}`}
                    key={faq.question}
                  >
                    <button
                      type="button"
                      className="faq-question"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-toggle-icon">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 10: FINAL CTA & CONTACT FORM */}
        <section className="contact" id="contact">
          <div className="section-inner">
            <div className="contact-layout">
              <div className="contact-copy reveal">
                <h2>Have an Idea? Let's Build Something Powerful.</h2>
                <p>
                  Whether you need a business website, a custom web application, an e-commerce platform,
                  or a complete software solution, we're ready to help bring your vision to life.
                </p>

                <div className="direct-channels">
                  <a className="direct-link" href="mailto:hariharansankar4@gmail.com">
                    ✉ hariharansankar4@gmail.com
                  </a>
                  <a
                    className="whatsapp-btn"
                    href="https://wa.me/?text=Hello%20StackWebApp%2C%20I%20would%20like%20to%20discuss%20a%20development%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>💬 Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Enquiry Form */}
              <form className="form-card reveal" onSubmit={handleSubmit} id="enquiry">
                <h3 className="form-title">Start a Project</h3>

                {/* Honeypot field */}
                <div className="hidden-field">
                  <label>
                    Website <input type="text" name="website" tabIndex="-1" autoComplete="off" />
                  </label>
                </div>

                <div className="form-grid">
                  <label>
                    Full Name *
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label>
                    Business / Company Name
                    <input
                      type="text"
                      name="businessName"
                      autoComplete="organization"
                    />
                  </label>

                  <label>
                    Email Address *
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                    />
                  </label>

                  <label>
                    Phone Number *
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                    />
                  </label>

                  <label>
                    Service Required *
                    <select
                      name="service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      required
                    >
                      <option value="">Select a Service</option>
                      <option value="Website Development">Business Website Development</option>
                      <option value="Web Application">Custom Web Application</option>
                      <option value="E-commerce">E-commerce Development</option>
                      <option value="Mobile Application">Mobile Application</option>
                      <option value="SaaS Development">SaaS & Software Development</option>
                      <option value="AI & Automation">AI & Automation Solutions</option>
                      <option value="Other">Other Custom Development</option>
                    </select>
                  </label>

                  <label>
                    Project Budget Range
                    <select name="budget" defaultValue="">
                      <option value="">Select Budget Range</option>
                      <option value="Below ₹15,000">Below ₹15,000</option>
                      <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000</option>
                      <option value="₹30,000 – ₹50,000">₹30,000 – ₹50,000</option>
                      <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                      <option value="₹1,00,000+">₹1,00,000+</option>
                    </select>
                  </label>

                  <label className="full">
                    Project Description *
                    <textarea
                      name="message"
                      required
                      rows={4}
                    />
                  </label>
                </div>

                <div className="submit-row">
                  <button className="submit-btn" type="submit" disabled={sending}>
                    {sending ? "Submitting..." : "Let's Discuss Your Project"}
                  </button>
                  {status && (
                    <p className={`form-status ${statusType}`} role="status" aria-live="polite">
                      {status}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* SECTION 11: FOOTER */}
        <footer className="site-footer">
          <div className="section-inner footer-inner">
            <div className="footer-top">
              <div className="footer-brand-col">
                <a className="footer-brand" href="#top" aria-label="StackWebApp home">
                  <img
                    className="brand-logo-image"
                    src={logo.src}
                    alt="StackWebApp logo"
                    width="1024"
                    height="1024"
                  />
                  <span className="brand-name-text">StackWebApp</span>
                </a>
                <p className="footer-description">
                  StackWebApp builds modern websites, custom web applications, e-commerce platforms,
                  and scalable software solutions that help businesses grow in the digital world.
                </p>
              </div>

              <div className="footer-columns">
                <div className="footer-col">
                  <strong>Services</strong>
                  <ul>
                    <li><a href="#services">Website Development</a></li>
                    <li><a href="#services">Web Applications</a></li>
                    <li><a href="#services">E-commerce Stores</a></li>
                    <li><a href="#services">Mobile Applications</a></li>
                    <li><a href="#services">SaaS Development</a></li>
                    <li><a href="#services">AI & Automation</a></li>
                  </ul>
                </div>

                <div className="footer-col">
                  <strong>Company</strong>
                  <ul>
                    <li><a href="#why-us">About Us</a></li>
                    <li><a href="#services">Our Services</a></li>
                    <li><a href="#work">Our Work</a></li>
                    <li><a href="#process">Development Process</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                  </ul>
                </div>

                <div className="footer-col">
                  <strong>Quick Links</strong>
                  <ul>
                    <li><a href="#top">Privacy Policy</a></li>
                    <li><a href="#top">Terms & Conditions</a></li>
                    <li><a href="#top">Refund Policy</a></li>
                  </ul>
                </div>

                <div className="footer-col">
                  <strong>Contact</strong>
                  <ul className="footer-contact-list">
                    <li>
                      <a href="mailto:hariharansankar4@gmail.com">
                        hariharansankar4@gmail.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://wa.me/?text=Hello%20StackWebApp%2C%20I%20would%20like%20to%20discuss%20a%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp Inquiries
                      </a>
                    </li>
                    <li>
                      <span>India (Serving Worldwide)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} StackWebApp. All Rights Reserved.</span>
              <span>Building Digital Experiences. Engineering Business Growth.</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
