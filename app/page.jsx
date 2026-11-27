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
    id: "mobile-delivery-app",
    name: "On-Demand Delivery & Booking App",
    category: "Mobile Applications",
    type: "Mobile Applications",
    description:
      "High-performance cross-platform mobile application featuring live GPS tracking, instant order dispatching, and push notification pipelines.",
    tech: ["React Native", "Node.js", "Firebase", "WebSockets"],
    isConcept: true,
    accent: "blue",
    metrics: "iOS & Android · Real-Time GPS"
  },
  {
    id: "mobile-fitness-app",
    name: "Health & Fitness Member App",
    category: "Mobile Applications",
    type: "Mobile Applications",
    description:
      "Feature-rich mobile fitness suite featuring workout logs, real-time member check-ins, biometric health sync, and offline storage.",
    tech: ["Flutter", "GraphQL", "Supabase", "HealthKit"],
    isConcept: true,
    accent: "green",
    metrics: "Offline-First · Biometric Auth"
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

const policies = {
  privacy: {
    title: "Privacy Policy",
    content: (
      <>
        <p>
          At StackWebApp, we hold your business confidentiality, proprietary data, and project intellectual property in the highest regard.
        </p>
        <h4>Information We Collect</h4>
        <p>
          We only collect information directly submitted through our project consultation and enquiry forms (such as your name, business email, phone number, and project specifications). This information is solely used to scope, quote, and communicate regarding your product development.
        </p>
        <h4>Data Security & Confidentiality</h4>
        <p>
          We never sell, rent, or trade your personal or business information to third parties. All codebase repositories, database credentials, API keys, and business logic shared during development are strictly safeguarded under standard non-disclosure practices.
        </p>
        <h4>Hosting & Cookies</h4>
        <p>
          Our web applications use standard performance and security monitoring tools without invasive tracking cookies. You may contact us at any time at hariharansankar4@gmail.com to request deletion of your contact records.
        </p>
      </>
    )
  },
  terms: {
    title: "Terms & Conditions",
    content: (
      <>
        <p>
          Welcome to StackWebApp. By engaging our digital engineering, website, web application, or custom software development services, you agree to the following terms.
        </p>
        <h4>Project Scope & Milestones</h4>
        <p>
          Each project begins with a clear scope specification, architectural roadmap, and milestone schedule. Any feature additions or substantial changes beyond the agreed roadmap are scoped via mutual agreement.
        </p>
        <h4>Intellectual Property & Code Ownership</h4>
        <p>
          Upon final milestone payment completion, 100% full intellectual property rights, source code, database architectures, and design assets developed specifically for your project belong entirely to you and your business.
        </p>
        <h4>Client Collaboration</h4>
        <p>
          Timely provision of brand assets, third-party credentials (e.g. domain DNS, payment gateways, cloud providers), and milestone feedback ensures projects deliver on schedule.
        </p>
      </>
    )
  },
  refund: {
    title: "Refund Policy",
    content: (
      <>
        <p>
          We are committed to delivering high-performance, precision-engineered digital products with complete transparency at every development stage.
        </p>
        <h4>Milestone-Based Approvals</h4>
        <p>
          To ensure total alignment, our projects operate on staged deliverables (Discovery & Wireframing → Engineering Sprint → QA Testing & Deployment). Each milestone is reviewed and approved by you before moving forward.
        </p>
        <h4>Cancellation & Refunds</h4>
        <p>
          If a project is cancelled prior to the commencement of active engineering sprints, initial consultation deposits minus administrative discovery costs are refunded. In the rare event of dissatisfaction with a specific milestone before code handoff, we prioritize rework or pro-rata adjustments based on deliverables completed.
        </p>
        <h4>Post-Launch Support</h4>
        <p>
          All production deployments include a standard post-launch warranty period to resolve any functional bugs, ensuring your product runs flawlessly in live environments.
        </p>
      </>
    )
  }
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [activePolicyModal, setActivePolicyModal] = useState(null);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [sending, setSending] = useState(false);

  const heroWords = useMemo(
    () => "Ideas In. Innovation Out.".split(" "),
    []
  );

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;
    let scrollTimer = null;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY < 60) {
            setHeaderVisible(true);
          } else if (currentScrollY > lastScrollY + 10) {
            setHeaderVisible(false);
          } else if (currentScrollY < lastScrollY - 10) {
            setHeaderVisible(true);
          }
          lastScrollY = currentScrollY;

          // Interactive running graph animation while scrolling
          const chartEl = document.querySelector(".growth-chart-container");
          if (chartEl) {
            chartEl.classList.add("chart-running");
            const progress = Math.min(1, Math.max(0, currentScrollY / 260));
            chartEl.style.setProperty("--scroll-draw", (0.35 + progress * 0.65).toFixed(3));
            
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
              chartEl.classList.remove("chart-running");
            }, 600);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(scrollTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen || activePolicyModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setActivePolicyModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, activePolicyModal]);

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
      <header
        className={`site-header ${menuOpen ? "menu-active" : ""} ${
          headerVisible || menuOpen ? "header-visible" : "header-hidden"
        }`}
      >
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
      {menuOpen && (
        <div
          className="menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
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
                <h1 className="hero-title" aria-label="Ideas In. Innovation Out.">
                  <span className="hero-title-line">
                    <span className="word" style={{ animationDelay: "0.90s" }}>Ideas</span>
                    <span className="word" style={{ animationDelay: "0.96s" }}>In.</span>
                  </span>
                  <span className="hero-title-line">
                    <span className="word hero-highlight" style={{ animationDelay: "1.04s" }}>Innovation</span>
                    <span className="word hero-highlight" style={{ animationDelay: "1.12s" }}>Out.</span>
                  </span>
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

              {/* Animated Business Growth Visualizer: Before vs After */}
              <div
                className="hero-console growth-visualizer reveal"
                aria-label="StackWebApp business growth and sales impact visualizer"
              >
                <div className="growth-shell">
                  {/* Dynamic Graphic Chart: Before vs After Trajectory */}
                  <div className="growth-chart-container">
                    <div className="chart-legend">
                      <div className="legend-item legend-before">
                        <span className="legend-line line-before" />
                        <span>Before Website (Flat Sales)</span>
                      </div>
                      <div className="legend-item legend-after">
                        <span className="legend-line line-after" />
                        <span>After StackWebApp Launch</span>
                      </div>
                    </div>

                    <div className="chart-svg-wrap">
                      <svg viewBox="0 0 540 210" className="growth-svg" fill="none" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="growthAreaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#75C5DE" stopOpacity="0.4" />
                            <stop offset="60%" stopColor="#8CC8A8" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#8CC8A8" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="growthLineGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#94a3b8" />
                            <stop offset="35%" stopColor="#75C5DE" />
                            <stop offset="70%" stopColor="#8CC8A8" />
                            <stop offset="100%" stopColor="#F08C76" />
                          </linearGradient>
                          <filter id="glowGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        {/* Subtle Grid Lines */}
                        <line x1="20" y1="40" x2="520" y2="40" stroke="rgba(244, 241, 232, 0.08)" strokeDasharray="3 3" />
                        <line x1="20" y1="90" x2="520" y2="90" stroke="rgba(244, 241, 232, 0.08)" strokeDasharray="3 3" />
                        <line x1="20" y1="140" x2="520" y2="140" stroke="rgba(244, 241, 232, 0.08)" strokeDasharray="3 3" />
                        <line x1="20" y1="185" x2="520" y2="185" stroke="rgba(244, 241, 232, 0.14)" />

                        {/* Growth Gradient Area */}
                        <path
                          d="M 20 180 L 180 175 C 230 175, 270 140, 340 90 C 410 40, 470 24, 520 18 L 520 185 L 20 185 Z"
                          fill="url(#growthAreaGrad)"
                          className="growth-fill-path"
                        />

                        {/* Before Website Flat Baseline (Dashed Red/Muted) */}
                        <path
                          d="M 20 180 L 180 175 L 520 170"
                          stroke="rgba(248, 113, 113, 0.55)"
                          strokeWidth="2.5"
                          strokeDasharray="5 5"
                        />

                        {/* Launch Event Dividing Line & Marker */}
                        <line x1="180" y1="25" x2="180" y2="185" stroke="rgba(117, 197, 222, 0.35)" strokeDasharray="2 3" />
                        <circle cx="180" cy="175" r="6" fill="#75C5DE" className="launch-pulse-node" />

                        {/* After Website / Web App Surge Curve */}
                        <path
                          d="M 20 180 L 180 175 C 230 175, 270 140, 340 90 C 410 40, 470 24, 520 18"
                          stroke="url(#growthLineGrad)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          filter="url(#glowGlow)"
                          className="growth-curve-path"
                        />

                        {/* Running Telemetry Stream (Active on Scroll) */}
                        <path
                          d="M 20 180 L 180 175 C 230 175, 270 140, 340 90 C 410 40, 470 24, 520 18"
                          stroke="#ffffff"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className="growth-running-beam"
                        />

                        {/* Active Growth Nodes */}
                        <circle cx="340" cy="90" r="5" fill="#8CC8A8" className="growth-node" />
                        <circle cx="520" cy="18" r="7" fill="#F08C76" className="growth-peak-node" />
                      </svg>

                      {/* Callout Badges inside chart */}
                      <div className="launch-flag-tag">
                        <span>⚡ Launch Point</span>
                      </div>
                      <div className="growth-peak-tag">
                        <span>🚀 +340% Revenue Growth</span>
                      </div>
                    </div>

                    <div className="chart-timeline-labels">
                      <span>Q1: Traditional / No Site</span>
                      <span>Q2: Platform Launch</span>
                      <span>Q3: Automated Lead Flow</span>
                      <span>Q4: Market Leadership</span>
                    </div>
                  </div>

                  {/* Before vs After Split Comparison Grid */}
                  <div className="before-after-grid">
                    <div className="comparison-card before-card">
                      <div className="comparison-badge before-badge">
                        <span>BEFORE</span>
                        <b>Without Modern Platform</b>
                      </div>
                      <ul className="comparison-list">
                        <li>
                          <span className="x-icon">✕</span>
                          <span>Slow manual phone &amp; paper tracking</span>
                        </li>
                        <li>
                          <span className="x-icon">✕</span>
                          <span>Weak 1.2% visitor conversion rate</span>
                        </li>
                        <li>
                          <span className="x-icon">✕</span>
                          <span>Zero 24/7 automated lead capture</span>
                        </li>
                      </ul>
                    </div>

                    <div className="comparison-card after-card">
                      <div className="comparison-badge after-badge">
                        <span>AFTER</span>
                        <b>StackWebApp Digital Engine</b>
                      </div>
                      <ul className="comparison-list">
                        <li>
                          <span className="check-icon">✓</span>
                          <span>24/7 Automated client bookings &amp; sales</span>
                        </li>
                        <li>
                          <span className="check-icon">✓</span>
                          <span>3.8x High-converting responsive UX</span>
                        </li>
                        <li>
                          <span className="check-icon">✓</span>
                          <span>Sub-second FCP &amp; top SEO visibility</span>
                        </li>
                      </ul>
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
                    <li>
                      <button
                        type="button"
                        className="footer-policy-btn"
                        onClick={() => setActivePolicyModal("privacy")}
                      >
                        Privacy Policy
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="footer-policy-btn"
                        onClick={() => setActivePolicyModal("terms")}
                      >
                        Terms &amp; Conditions
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="footer-policy-btn"
                        onClick={() => setActivePolicyModal("refund")}
                      >
                        Refund Policy
                      </button>
                    </li>
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

      {/* Interactive Policy Modal */}
      {activePolicyModal && policies[activePolicyModal] && (
        <div
          className="policy-modal-overlay"
          onClick={() => setActivePolicyModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={policies[activePolicyModal].title}
        >
          <div
            className="policy-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="policy-modal-header">
              <h3>{policies[activePolicyModal].title}</h3>
              <button
                type="button"
                className="policy-modal-close"
                onClick={() => setActivePolicyModal(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="policy-modal-body">
              {policies[activePolicyModal].content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
