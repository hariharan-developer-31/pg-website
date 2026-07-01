"use client";

import { useEffect, useMemo, useState } from "react";

const features = [
  ["PG Management", ["Add/Edit/Delete PG", "Multiple PG Support", "PG Details", "Amenities", "Floor Management"]],
  ["Rooms & Beds", ["Create Rooms", "Single/Double/Triple", "Add Beds", "Availability", "Room Transfer", "Bed Transfer"]],
  ["Tenant Management", ["Tenant Profile", "Photo Upload", "Aadhaar Upload", "Emergency Contact", "Company/College", "Check-in/out", "Security Deposit"]],
  ["Rent Management", ["Monthly Rent", "Due Date", "Partial Payments", "Advance Payments", "Pending Rent", "Payment History", "PDF Receipts"]],
  ["Payments", ["Cash", "UPI", "Bank Transfer", "Payment Status", "Download Receipt"]],
  ["Documents", ["Rental Agreement", "Aadhaar", "PAN", "Other Documents", "Download Anytime"]],
  ["Complaints", ["Raise Complaint", "Assign Status", "Resolved/Pending", "Complaint History"]],
  ["Staff & Roles", ["Add Staff", "Staff Role", "Contact Details", "Super Admin", "PG Owner", "Manager"]],
  ["Reports & Filters", ["Monthly Revenue", "Occupancy Report", "Vacant Beds", "Tenant Report", "Income vs Expenses", "Search Tenant", "Filter Rent Status"]]
];

const reviews = [
  ["AR", "Arjun Rao", "PG Owner, Bengaluru", "The dashboard gives us occupancy, vacant beds, and pending rent without calling every manager. It makes multi-PG monitoring much cleaner."],
  ["NP", "Nisha Patel", "Operations Manager", "Tenant check-ins are more organized now. Photo, Aadhaar, deposit, company details, and room assignment are all in one flow."],
  ["MK", "Manoj Kumar", "Finance Admin", "Rent collection is easier to audit. Partial payments, advances, receipts, and payment history are visible when we need them."],
  ["SI", "Sana Iqbal", "PG Manager", "Room and bed transfers used to create confusion. Now status changes are clear, and vacant beds are updated immediately."],
  ["VT", "Vikram T", "Property Supervisor", "Complaint history helped our staff close issues faster. Owners can see what is resolved and what still needs attention."],
  ["JD", "Joel D'Souza", "Co-living Operator", "Search and filters save a lot of time. We can find tenants, rooms, PGs, rent status, and vacancy data in seconds."]
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const heroWords = useMemo(
    () => "Run your PG business without spreadsheets".split(" "),
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
      { threshold: 0.14 }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("Sending...");
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
        throw new Error(result.message || "Please try again.");
      }
      form.reset();
      setStatus("Enquiry sent. We will contact you shortly.");
    } catch (error) {
      setStatus(error.message || "Could not send enquiry right now.");
    } finally {
      setSending(false);
    }
  }

  const navLinks = ["Dashboard", "Features", "Security", "Reviews"];
  const menuLinks = [...navLinks, "Enquiry"];

  return (
    <>
      <div className="splash" aria-hidden="true">
        <div className="splash-row splash-row-top">{Array.from({ length: 5 }).map((_, i) => <div className="splash-box" key={`top-${i}`} />)}</div>
        <div className="splash-row splash-row-bottom">{Array.from({ length: 5 }).map((_, i) => <div className="splash-box" key={`bottom-${i}`} />)}</div>
      </div>

      <header className={`site-header ${menuOpen ? "menu-active" : ""}`}>
        <a className="brand desktop-brand" href="#top" aria-label="Stack home">
          <span className="brand-mark">S</span>
          <span>Stack</span>
        </a>
        <nav className="nav-pill" aria-label="Primary navigation">
          <a className="nav-logo" href="#top" aria-label="Stack home">
            <span>Stack</span>
          </a>
          {navLinks.map((link) => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}
          <a className="nav-cta" href="#enquiry">Enquiry</a>
        </nav>
        <a className="header-cta" href="#enquiry">Enquiry</a>
        <button
          className={`menu-btn ${menuOpen ? "open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
        </button>
      </header>

      <aside className={`menu-panel ${menuOpen ? "open" : ""}`} aria-label="Mobile menu">
        {menuLinks.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{link}</a>
        ))}
        <a href="mailto:hello@stackpg.com" className="small-link">hello@stackpg.com</a>
      </aside>

      <main id="top">
        <section className="hero">
          <div className="hero-media" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-layout">
              <div className="hero-copy">
                <h1 className="hero-title" aria-label="Run your PG business without spreadsheets">
                  {heroWords.map((word, index) => (
                    <span className="word" style={{ animationDelay: `${1 + index * 0.045}s` }} key={`${word}-${index}`}>{word}</span>
                  ))}
                </h1>
                <p className="hero-lead">Track PGs, rooms, beds, tenants, rent, documents, complaints, staff, and reports from one fast webapp built for daily operations.</p>
                <div className="hero-actions">
                  <a className="cta-btn" href="#enquiry">
                    <span className="cta-bg" />
                    <span className="cta-text">Request a demo</span>
                    <span className="cta-circle" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </a>
                  <a className="ghost-link" href="#features">Explore features</a>
                </div>
              </div>

              <div className="hero-console reveal" aria-label="PG management dashboard preview">
                <div className="console-shell">
                  <div className="console-nav">
                    <div>
                      <strong>Operations Overview</strong>
                    </div>
                    <b>Live</b>
                  </div>
                  <div className="console-kpis">
                    <div><span>Total PGs</span><strong>04</strong></div>
                    <div><span>Rooms</span><strong>124</strong></div>
                    <div><span>Occupied</span><strong>386</strong></div>
                    <div><span>Vacant</span><strong>42</strong></div>
                  </div>
                  <div className="console-body">
                    <div className="occupancy-card">
                      <div className="ring"><span>91%</span></div>
                      <div>
                        <b>Occupancy health</b>
                        <p>Live bed status across properties, floors, rooms, and tenants.</p>
                      </div>
                    </div>
                    <div className="rent-card">
                      <span>Pending rent</span>
                      <strong>Track</strong>
                      <div className="rent-bars"><i /><i /><i /><i /></div>
                    </div>
                  </div>
                  <div className="console-flow">
                    <div><span>Tenant joined</span><b>New</b></div>
                    <div><span>UPI payment received</span><b>Paid</b></div>
                  </div>
                </div>
              </div>

              <div className="phone-showcase reveal" aria-label="Mobile PG Manager dashboard preview">
                <div className="phone-glow" aria-hidden="true" />
                <div className="phone-frame">
                  <div className="phone-topbar">
                    <strong>PG Manager</strong>
                    <div className="phone-actions">
                      <span className="bell-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      </span>
                      <span className="profile-dot">A</span>
                    </div>
                  </div>
                  <div className="phone-hero-art" aria-hidden="true">
                    <span className="sun" />
                    <span className="building">
                      <i /><i /><i /><i />
                    </span>
                    <span className="tree tree-one" />
                    <span className="tree tree-two" />
                  </div>
                  <div className="phone-greeting">
                    <h2>Good Afternoon,<br /><span>Admin.</span></h2>
                    <p>Wednesday, July 1, 2026 · 1:01 PM</p>
                  </div>
                  <div className="property-card">
                    <div className="property-head">
                      <div className="property-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 7h2M14 7h.01M8 11h2M14 11h.01M8 15h2M14 15h.01M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      </div>
                      <div>
                        <strong>Property Overview</strong>
                        <span>1:01 PM</span>
                      </div>
                    </div>
                    <div className="property-stats">
                      <div><b>4</b><span>Total PG</span></div>
                      <div><b>4</b><span>Available Rooms</span></div>
                      <div><b>19</b><span>Available Vacancy</span></div>
                    </div>
                  </div>
                  <div className="quick-block">
                    <div className="phone-section-title">Quick Actions</div>
                    <div className="quick-grid">
                      {[
                        ["Add PG", "building"],
                        ["Tenants", "users"],
                        ["Add Room", "room"],
                        ["Record Pay", "pay"],
                        ["Reports", "chart"],
                        ["Announce", "megaphone"]
                      ].map(([label, type]) => (
                        <div className={`quick-action ${type}`} key={label}>
                          <span>{label.slice(0, 1)}</span>
                          <b>{label}</b>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="recent-card">
                    <div className="recent-head"><strong>Recent Activities</strong><span>View All</span></div>
                    <div className="recent-item"><i>A</i><div><b>Admin added a new tenant</b><span>7 hours ago</span></div></div>
                  </div>
                  <div className="phone-nav" aria-hidden="true">
                    <span className="active">Dashboard</span><span>PG</span><span>Tenant</span><span>Payment</span><span>Settings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-band" id="dashboard">
          <div className="section-inner">
            <div className="section-heading reveal">
              <h2>One dashboard for every moving part.</h2>
              <p>Owners and managers can read the business at a glance: PG count, rooms, beds, occupancy, tenants, monthly revenue, pending rent, and recent activity.</p>
            </div>
            <div className="dashboard-grid">
              <div className="preview reveal">
                <div className="preview-top"><div className="dots"><span /><span /><span /></div><div className="preview-title">Live PG Operations Dashboard</div></div>
                <div className="metric-grid">
                  {["Total PGs:08", "Total Rooms:124", "Occupied Beds:386", "Vacant Beds:42", "Total Tenants:371", "Monthly Revenue:Live", "Pending Rent:Track", "Recent Activities:Feed"].map((item, index) => {
                    const [label, value] = item.split(":");
                    return <div className={`metric ${index === 0 ? "blue" : ""}`} key={item}><span>{label}</span><b>{value}</b></div>;
                  })}
                </div>
              </div>
              <div className="preview reveal">
                <div className="preview-top"><div className="preview-title">Recent Activities</div><div className="dots"><span /><span /></div></div>
                <div className="activity-list">
                  {["Room transfer requested:Pending", "UPI payment received:Paid", "Aadhaar uploaded by tenant:Verified", "Complaint assigned to staff:Open", "Vacant bed marked available:Live"].map((item) => {
                    const [label, value] = item.split(":");
                    return <div className="activity" key={item}><span>{label}</span><i>{value}</i></div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-map" id="features">
          <div className="section-inner">
            <div className="section-heading reveal">
              <h2>Built for daily PG operations, not spreadsheets.</h2>
              <p>Every module is structured around the actual work of managing beds, tenants, rent, documents, staff, and reports across one or many PG properties.</p>
            </div>
            <div className="feature-groups">
              {features.map(([title, chips], index) => (
                <article className="feature-card reveal" key={title}>
                  <div className="feature-icon">{String(index + 1).padStart(2, "0")}</div>
                  <h3>{title}</h3>
                  <div className="chips">{chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="workflow">
          <div className="section-inner">
            <div className="section-heading reveal">
              <h2>Smooth workflows from check-in to checkout.</h2>
              <p>The webapp keeps the full tenant lifecycle organized, searchable, and ready for owner-level reporting.</p>
            </div>
            <div className="workflow-grid">
              {[
                ["Create PG, floors, rooms, and beds.", "Set room types, amenities, floor structure, and bed availability for every property you manage."],
                ["Add tenants with documents.", "Capture profile details, photo, Aadhaar, emergency contact, company or college, deposit, and active status."],
                ["Collect rent and issue receipts.", "Track due dates, pending rent, partial payments, advance payments, and downloadable PDF receipts."],
                ["Handle complaints and staff tasks.", "Raise complaints, assign status, view history, and keep managers or staff accountable from one place."]
              ].map(([title, text], index) => (
                <div className="step reveal" key={title}>
                  <div className="step-num">{String(index + 1).padStart(2, "0")}</div>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="security-band" id="security">
          <div className="section-inner">
            <div className="section-heading reveal">
              <h2>Secure by structure, fast by design.</h2>
              <p>Designed for Vercel hosting with server-side enquiry mail, clean delivery, no exposed email secrets, and focused role-based product flows.</p>
            </div>
            <div className="security-grid">
              <div className="security-item reveal"><h3>Role-based access</h3><p>Separate views for Super Admin, PG Owner, and Manager keep sensitive actions limited to the right people.</p></div>
              <div className="security-item reveal"><h3>Document control</h3><p>Tenant documents such as Aadhaar, PAN, rental agreements, and uploads stay organized for quick retrieval.</p></div>
              <div className="security-item reveal"><h3>Fast experience</h3><p>Static-first rendering, responsive CSS, lightweight JavaScript, and a Vercel API route keep the site smooth.</p></div>
            </div>
          </div>
        </section>

        <section className="reviews" id="reviews">
          <div className="section-inner">
            <div className="section-heading reveal">
              <h2>PG teams can feel the difference quickly.</h2>
              <p>Clear records, better rent visibility, and fewer manual follow-ups make daily management easier for owners and managers.</p>
            </div>
            <div className="review-grid">
              {reviews.map(([initials, name, role, quote]) => (
                <article className="review-card reveal" key={name}>
                  <div className="stars">★★★★★</div>
                  <p>"{quote}"</p>
                  <div className="reviewer"><div className="avatar">{initials}</div><div><b>{name}</b><span>{role}</span></div></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="enquiry">
          <div className="section-inner">
            <div className="contact-layout">
              <div className="contact-copy reveal">
                <h2>Bring your PG operations online.</h2>
                <p>Send an enquiry with your PG details. The message is submitted through a server-side Next.js route and delivered to your configured email.</p>
                <div className="contact-points">
                  <span>Dashboard, rooms, beds, tenants, rent, receipts</span>
                  <span>Documents, complaints, staff, reports, search, filters</span>
                  <span>Settings for company details, GST, payments, notifications</span>
                </div>
              </div>
              <form className="form-card reveal" onSubmit={handleSubmit}>
                <div className="hidden-field"><label>Website <input type="text" name="website" tabIndex="-1" autoComplete="off" /></label></div>
                <div className="form-grid">
                  <label>Full name <input type="text" name="name" autoComplete="name" required /></label>
                  <label>Email <input type="email" name="email" autoComplete="email" required /></label>
                  <label>Phone <input type="tel" name="phone" autoComplete="tel" required /></label>
                  <label>City <input type="text" name="city" autoComplete="address-level2" /></label>
                  <label className="full">How many PGs do you manage?
                    <select name="pgCount" defaultValue="">
                      <option value="">Select range</option>
                      <option>1 PG</option>
                      <option>2-5 PGs</option>
                      <option>6-10 PGs</option>
                      <option>10+ PGs</option>
                    </select>
                  </label>
                  <label className="full">What do you need?
                    <textarea name="message" required placeholder="Tell us about your PGs, rooms, tenants, rent collection, or current management process." />
                  </label>
                </div>
                <div className="submit-row">
                  <button className="submit-btn" type="submit" disabled={sending}>{sending ? "Sending..." : "Send enquiry"}</button>
                  <p className="form-status" role="status" aria-live="polite">{status}</p>
                </div>
              </form>
            </div>
            <footer>
              <span>© {new Date().getFullYear()} Stack PG Management</span>
              <span>Secure enquiry flow for Vercel hosting</span>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
