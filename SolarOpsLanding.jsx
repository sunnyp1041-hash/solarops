import { useState, useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:     #050B16;
  --bg2:    #080F1E;
  --sun:    #F5A623;
  --sun2:   #FFD166;
  --cyan:   #00D2FF;
  --green:  #00E676;
  --purple: #A55EEA;
  --text:   #E2EEF9;
  --text2:  #8AAEC8;
  --text3:  #3E5A76;
  --border: rgba(0,210,255,0.1);
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,210,255,0.2); border-radius: 2px; }

/* NOISE OVERLAY */
body::before {
  content: '';
  position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.022;
  pointer-events: none;
  z-index: 9999;
}

/* GRID BG */
.grid-bg {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(0,210,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,210,255,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, black 0%, transparent 100%);
}

/* ANIMATIONS */
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
@keyframes glow  { 0%,100%{box-shadow:0 0 30px rgba(245,166,35,.25)} 50%{box-shadow:0 0 60px rgba(245,166,35,.55)} }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
@keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
@keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
@keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
@keyframes rotateSun { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(0.97)} }
@keyframes orb1 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(60px,-40px)} 66%{transform:translate(-40px,30px)} }
@keyframes orb2 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(-70px,50px)} 66%{transform:translate(50px,-30px)} }

.animate-in { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
.animate-in-delay-1 { animation-delay: 0.1s; }
.animate-in-delay-2 { animation-delay: 0.2s; }
.animate-in-delay-3 { animation-delay: 0.3s; }
.animate-in-delay-4 { animation-delay: 0.4s; }

/* NAV */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  height: 64px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px;
  transition: all .3s;
}
nav.scrolled {
  background: rgba(5,11,22,.92);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(20px);
}
.nav-links { display: flex; gap: 36px; align-items: center; }
.nav-link-item {
  font-size: 13.5px; font-weight: 500; color: var(--text2);
  text-decoration: none; cursor: pointer;
  transition: color .2s; letter-spacing: .2px;
}
.nav-link-item:hover { color: var(--text); }
.nav-cta {
  background: linear-gradient(135deg, var(--sun), #c97a00);
  color: #000; font-weight: 700;
  padding: 9px 22px; border-radius: 9px; border: none;
  font-family: 'Rajdhani', sans-serif; font-size: 15px; letter-spacing: .5px;
  cursor: pointer; transition: all .2s;
}
.nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(245,166,35,.4); }

/* HERO */
.hero {
  min-height: 100vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center;
  position: relative;
  padding: 120px 24px 80px;
  overflow: hidden;
}

.hero-orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); pointer-events: none;
}

.badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 16px; border-radius: 100px;
  background: rgba(0,210,255,.07); border: 1px solid rgba(0,210,255,.2);
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px; letter-spacing: 2px; color: var(--cyan);
  margin-bottom: 28px;
}

.hero-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(52px, 8vw, 96px);
  font-weight: 700;
  line-height: .95;
  letter-spacing: -1px;
  margin-bottom: 24px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--sun) 0%, var(--sun2) 40%, var(--cyan) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite;
}

.hero-sub {
  font-size: clamp(16px, 2vw, 20px);
  color: var(--text2); font-weight: 300;
  max-width: 560px; line-height: 1.7;
  margin: 0 auto 40px;
}

.hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

.btn-primary {
  background: linear-gradient(135deg, var(--sun), #c97a00);
  color: #000; font-weight: 700;
  padding: 14px 32px; border-radius: 11px; border: none;
  font-family: 'Rajdhani', sans-serif; font-size: 16px; letter-spacing: .5px;
  cursor: pointer; transition: all .2s;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(245,166,35,.4); }

.btn-outline {
  background: rgba(0,210,255,.07); border: 1px solid rgba(0,210,255,.25);
  color: var(--cyan); font-size: 15px; font-weight: 500;
  padding: 14px 32px; border-radius: 11px;
  cursor: pointer; transition: all .2s;
}
.btn-outline:hover { background: rgba(0,210,255,.14); border-color: rgba(0,210,255,.5); }

/* HERO MOCKUP */
.mockup-wrap {
  position: relative; margin-top: 70px;
  width: 100%; max-width: 900px;
}
.mockup-glow {
  position: absolute; inset: -40px;
  background: radial-gradient(ellipse at 50% 60%, rgba(0,210,255,.12) 0%, transparent 70%);
  pointer-events: none;
}
.mockup-screen {
  background: #080F1E;
  border: 1px solid rgba(0,210,255,.18);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.03);
  position: relative;
}
.mockup-topbar {
  height: 44px; background: rgba(5,11,22,.95);
  border-bottom: 1px solid rgba(0,210,255,.1);
  display: flex; align-items: center; padding: 0 16px; gap: 10px;
}
.mockup-dot { width: 10px; height: 10px; border-radius: 50%; }
.mockup-body { padding: 20px; display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; }
.mockup-kpi {
  background: rgba(0,210,255,.05); border: 1px solid rgba(0,210,255,.1);
  border-radius: 10px; padding: 16px;
  position: relative; overflow: hidden;
}
.mockup-kpi::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
}
.mockup-kpi-val { font-family: 'Rajdhani', sans-serif; font-size: 28px; font-weight: 700; line-height: 1; margin-bottom: 4px; }
.mockup-kpi-label { font-family: 'Share Tech Mono', monospace; font-size: 9px; letter-spacing: 1.5px; color: var(--text3); }
.mockup-chart {
  grid-column: span 2; background: rgba(0,210,255,.04);
  border: 1px solid rgba(0,210,255,.1); border-radius: 10px; padding: 16px;
  display: flex; flex-direction: column; gap: 10;
}
.mockup-bars { display: flex; align-items: flex-end; gap: 6px; height: 64px; margin-top: 10px; }
.mockup-bar { flex: 1; border-radius: 3px 3px 0 0; transition: height 1s ease; }
.scanline {
  position: absolute; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0,210,255,.4), transparent);
  animation: scanline 4s linear infinite;
  pointer-events: none;
}

/* STATS BAR */
.stats-bar {
  padding: 40px 48px;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: rgba(0,0,0,.2);
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.stat-item { text-align: center; }
.stat-val {
  font-family: 'Rajdhani', sans-serif; font-size: 42px; font-weight: 700;
  background: linear-gradient(135deg, var(--sun), var(--cyan));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  line-height: 1;
}
.stat-label { font-size: 12px; color: var(--text3); margin-top: 6px; letter-spacing: .5px; }

/* SECTIONS */
.section { padding: 100px 48px; max-width: 1200px; margin: 0 auto; }
.section-tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px; letter-spacing: 3px; color: var(--cyan);
  text-transform: uppercase; margin-bottom: 16px;
}
.section-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(36px, 5vw, 54px); font-weight: 700;
  line-height: 1.05; margin-bottom: 16px;
}
.section-sub {
  font-size: 17px; color: var(--text2); font-weight: 300;
  max-width: 480px; line-height: 1.7;
}

/* FEATURES GRID */
.features-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 20px; margin-top: 60px;
}
.feature-card {
  background: linear-gradient(145deg, rgba(15,28,51,.8), rgba(8,15,30,.9));
  border: 1px solid var(--border);
  border-radius: 16px; padding: 30px;
  position: relative; overflow: hidden;
  transition: all .3s; cursor: default;
}
.feature-card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(0,210,255,.04) 0%, transparent 60%);
  opacity: 0; transition: opacity .3s;
}
.feature-card:hover { transform: translateY(-4px); border-color: rgba(0,210,255,.25); box-shadow: 0 20px 60px rgba(0,0,0,.4); }
.feature-card:hover::before { opacity: 1; }
.feature-icon { font-size: 32px; margin-bottom: 18px; display: block; }
.feature-name {
  font-family: 'Rajdhani', sans-serif; font-size: 20px; font-weight: 700;
  margin-bottom: 10px; color: var(--text);
}
.feature-desc { font-size: 14px; color: var(--text2); line-height: 1.7; font-weight: 300; }
.feature-accent {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  opacity: 0; transition: opacity .3s;
}
.feature-card:hover .feature-accent { opacity: 1; }

/* WORKFLOW */
.workflow { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-top: 60px; }
.workflow-steps { display: flex; flex-direction: column; gap: 6px; }
.workflow-step {
  display: flex; gap: 20px; padding: 20px;
  border-radius: 14px; border: 1px solid transparent;
  cursor: pointer; transition: all .25s;
}
.workflow-step.active {
  background: rgba(0,210,255,.06);
  border-color: rgba(0,210,255,.2);
}
.workflow-step-num {
  width: 36px; height: 36px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Share Tech Mono', monospace; font-size: 13px; font-weight: 700;
  flex-shrink: 0;
  background: rgba(0,210,255,.08); color: var(--cyan);
  border: 1px solid rgba(0,210,255,.2);
  transition: all .25s;
}
.workflow-step.active .workflow-step-num {
  background: var(--cyan); color: #000;
}
.workflow-step-title { font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 6px; }
.workflow-step-desc { font-size: 13.5px; color: var(--text2); line-height: 1.6; font-weight: 300; }
.workflow-visual {
  background: rgba(8,15,30,.8); border: 1px solid rgba(0,210,255,.15);
  border-radius: 20px; padding: 32px;
  aspect-ratio: 1;
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}

/* SOCIAL PROOF */
.testimonials { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 60px; }
.testimonial-card {
  background: rgba(15,28,51,.6); border: 1px solid var(--border);
  border-radius: 16px; padding: 28px;
  transition: all .3s;
}
.testimonial-card:hover { border-color: rgba(0,210,255,.2); transform: translateY(-3px); }
.testimonial-quote { font-size: 14px; color: var(--text2); line-height: 1.75; font-weight: 300; font-style: italic; margin-bottom: 22px; }
.testimonial-author { display: flex; align-items: center; gap: 12px; }
.testimonial-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 14px; color: #000; flex-shrink: 0;
}
.testimonial-name { font-size: 13.5px; font-weight: 600; }
.testimonial-role { font-size: 11.5px; color: var(--text3); margin-top: 2px; }
.stars { color: var(--sun); font-size: 12px; margin-bottom: 14px; letter-spacing: 2px; }

/* PRICING */
.pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 60px; }
.pricing-card {
  background: rgba(15,28,51,.6); border: 1px solid var(--border);
  border-radius: 20px; padding: 36px 30px;
  position: relative; overflow: hidden;
  transition: all .3s;
}
.pricing-card.featured {
  background: linear-gradient(145deg, rgba(0,210,255,.08), rgba(245,166,35,.05));
  border-color: rgba(0,210,255,.3);
  transform: scale(1.03);
}
.pricing-card:hover { transform: translateY(-4px); }
.pricing-card.featured:hover { transform: scale(1.03) translateY(-4px); }
.pricing-badge {
  position: absolute; top: 20px; right: 20px;
  background: linear-gradient(135deg, var(--sun), #c97a00);
  color: #000; font-size: 10px; font-weight: 700;
  padding: 4px 10px; border-radius: 20px;
  font-family: 'Share Tech Mono', monospace; letter-spacing: 1px;
}
.pricing-tier { font-family: 'Share Tech Mono', monospace; font-size: 11px; letter-spacing: 2px; color: var(--text3); margin-bottom: 12px; }
.pricing-price { font-family: 'Rajdhani', sans-serif; font-size: 52px; font-weight: 700; line-height: 1; margin-bottom: 6px; }
.pricing-price span { font-size: 18px; color: var(--text3); font-weight: 400; }
.pricing-desc { font-size: 13px; color: var(--text2); margin-bottom: 28px; }
.pricing-divider { height: 1px; background: var(--border); margin-bottom: 24px; }
.pricing-feature { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: var(--text2); margin-bottom: 12px; }
.pricing-check { color: var(--green); font-size: 14px; }

/* CTA SECTION */
.cta-section {
  margin: 0 48px 100px;
  background: linear-gradient(135deg, rgba(0,210,255,.06) 0%, rgba(245,166,35,.04) 100%);
  border: 1px solid rgba(0,210,255,.15);
  border-radius: 28px;
  padding: 80px 60px;
  text-align: center;
  position: relative; overflow: hidden;
}
.cta-section::before {
  content: '';
  position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
  width: 600px; height: 300px;
  background: radial-gradient(ellipse, rgba(245,166,35,.08) 0%, transparent 70%);
  pointer-events: none;
}

/* FOOTER */
footer {
  border-top: 1px solid var(--border);
  padding: 48px;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 20px;
}
.footer-links { display: flex; gap: 28px; }
.footer-link { font-size: 13px; color: var(--text3); cursor: pointer; transition: color .2s; }
.footer-link:hover { color: var(--text2); }

@media (max-width: 900px) {
  nav { padding: 0 24px; }
  .nav-links { display: none; }
  .stats-bar { grid-template-columns: repeat(2, 1fr); padding: 32px 24px; }
  .section { padding: 70px 24px; }
  .features-grid { grid-template-columns: 1fr; }
  .workflow { grid-template-columns: 1fr; }
  .workflow-visual { display: none; }
  .testimonials { grid-template-columns: 1fr; }
  .pricing-grid { grid-template-columns: 1fr; }
  .pricing-card.featured { transform: none; }
  .cta-section { margin: 0 24px 60px; padding: 50px 28px; }
  footer { padding: 32px 24px; flex-direction: column; align-items: flex-start; }
  .mockup-body { grid-template-columns: 1fr 1fr; }
}
`;

const FEATURES = [
  { icon: "⚡", name: "Live Field Dashboard", desc: "Real-time KPIs, crew GPS positions, and zone-level progress — all on one command screen. No more WhatsApp status updates.", accent: "linear-gradient(90deg, var(--cyan), var(--purple))" },
  { icon: "🤖", name: "AI Field Assistant", desc: "Site-aware AI that knows your schedule, crew, and inventory. Ask anything — get answers, flag issues, and draft reports instantly.", accent: "linear-gradient(90deg, var(--purple), var(--sun))" },
  { icon: "🗺️", name: "Interactive Site Map", desc: "Visualize every panel, row, and zone in real time. Click any zone to drill into install status, flagged issues, and worker assignments.", accent: "linear-gradient(90deg, var(--sun), var(--green))" },
  { icon: "🔌", name: "String Testing Logs", desc: "Log Voc, Isc, and efficiency readings per string. Auto-flag deviations from spec and generate test certificates in one click.", accent: "linear-gradient(90deg, var(--green), var(--cyan))" },
  { icon: "📦", name: "Materials Tracking", desc: "Track panels, racking, and BoS inventory from delivery to install. Get low-stock alerts before you hit a jobsite stoppage.", accent: "linear-gradient(90deg, var(--amber), var(--sun))", amber: true },
  { icon: "🦺", name: "Safety & Compliance", desc: "Digital toolbox talks, incident reporting, and permit tracking. Keep your site inspection-ready every single day.", accent: "linear-gradient(90deg, var(--red), var(--amber))" },
];

const STEPS = [
  { num: "01", title: "Connect your project", desc: "Import your project schedule, crew roster, and BOM in minutes. Works with Procore, Buildertrend, or a simple CSV upload." },
  { num: "02", title: "Deploy to your crew", desc: "Every worker gets the mobile app. Foremen see the command dashboard. Roles and permissions auto-configured from your org chart." },
  { num: "03", title: "Track everything live", desc: "Panel counts, string test results, safety incidents, and material levels update in real time as crew works in the field." },
  { num: "04", title: "Ship faster, bill sooner", desc: "AI-generated daily reports, completion forecasts, and punch lists keep your PM and owner informed — and your milestones on track." },
];

const TESTIMONIALS = [
  { quote: "We cut our daily reporting time from 2 hours to 15 minutes. The AI just knows what happened on site — I review and send.", name: "Marcus Chen", role: "Project Manager · 18MW utility project", initials: "MC", color: "var(--cyan)" },
  { quote: "String testing used to be a nightmare of spreadsheets. Now my electricians log in the field and the report generates itself.", name: "Sara Okonkwo", role: "Electrical Superintendent", initials: "SO", color: "var(--green)" },
  { quote: "We caught a torque spec defect in Zone C before inspection. The AI flagged a pattern from crew logs we would have missed entirely.", name: "Raj Patel", role: "EPC Director · 40MW portfolio", initials: "RP", color: "var(--sun)" },
];

const PRICING = [
  { tier: "STARTER", price: "$299", unit: "/mo", desc: "For small teams on single-site projects", features: ["Up to 20 crew members", "1 active project", "Dashboard + Site Map", "Daily report generation", "Email support"], featured: false },
  { tier: "PROFESSIONAL", price: "$799", unit: "/mo", desc: "For EPC contractors running multiple sites", features: ["Unlimited crew members", "Up to 5 active projects", "Full AI Field Assistant", "String testing module", "Safety & compliance suite", "Priority support"], featured: true, badge: "MOST POPULAR" },
  { tier: "ENTERPRISE", price: "Custom", unit: "", desc: "For large EPC firms and portfolio operators", features: ["Unlimited projects", "Custom integrations", "Dedicated onboarding", "SLA guarantee", "White-label option", "Account manager"], featured: false },
];

function MockupVisual() {
  const bars = [45, 62, 55, 80, 74, 88];
  return (
    <div className="mockup-screen">
      <div className="scanline" />
      <div className="mockup-topbar">
        <div className="mockup-dot" style={{ background: "#FF5F57" }} />
        <div className="mockup-dot" style={{ background: "#FFBD2E" }} />
        <div className="mockup-dot" style={{ background: "#28C840" }} />
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ background: "rgba(0,210,255,.08)", border: "1px solid rgba(0,210,255,.15)", borderRadius: 6, padding: "3px 16px", fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: "var(--text3)", letterSpacing: 1 }}>
            SOLAROPS.AI · FIELD COMMAND
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "blink 2s infinite" }} />
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "var(--green)", letterSpacing: 1 }}>LIVE</span>
        </div>
      </div>
      <div className="mockup-body">
        {[
          { val: "4,821", label: "PANELS TODAY", color: "var(--cyan)", accent: "var(--cyan)" },
          { val: "57.4%", label: "COMPLETION", color: "var(--green)", accent: "var(--green)" },
          { val: "34", label: "ACTIVE CREW", color: "var(--amber)", accent: "var(--amber)" },
          { val: "3d ↑", label: "AHEAD OF SCHED", color: "var(--sun)", accent: "var(--sun)" },
        ].map((k, i) => (
          <div key={i} className="mockup-kpi" style={{ "--accent": k.accent }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: k.color, opacity: .6 }} />
            <div className="mockup-kpi-val" style={{ color: k.color }}>{k.val}</div>
            <div className="mockup-kpi-label">{k.label}</div>
          </div>
        ))}
        <div className="mockup-chart" style={{ gridColumn: "span 2" }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "var(--text3)", letterSpacing: 1.5 }}>WEEKLY OUTPUT</div>
          <div className="mockup-bars">
            {bars.map((h, i) => (
              <div key={i} className="mockup-bar" style={{
                height: `${h}%`,
                background: i === bars.length - 1
                  ? "linear-gradient(0deg, rgba(245,166,35,.5), rgba(245,166,35,.9))"
                  : "linear-gradient(0deg, rgba(0,210,255,.2), rgba(0,210,255,.5))"
              }} />
            ))}
          </div>
        </div>
        <div className="mockup-chart" style={{ gridColumn: "span 2" }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "var(--text3)", letterSpacing: 1.5, marginBottom: 10 }}>ZONE PROGRESS</div>
          {[["Zone A", 100, "var(--green)"], ["Zone B", 78, "var(--cyan)"], ["Zone C", 52, "var(--cyan)"], ["Zone D", 21, "var(--amber)"]].map(([z, p, c]) => (
            <div key={z} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "var(--text3)" }}>{z}</span>
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: c }}>{p}%</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,.06)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${p}%`, background: c, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkflowVisual({ step }) {
  const visuals = [
    // Step 0: connect
    <div key={0} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
      {["procore_export.csv", "crew_roster.xlsx", "project_schedule.mpp"].map((f, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(0,210,255,.05)", border: "1px solid rgba(0,210,255,.12)", borderRadius: 10, animation: `fadeUp .4s ${i * .1}s both` }}>
          <span style={{ fontSize: 20 }}>{["📋", "👷", "📅"][i]}</span>
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: "var(--text2)" }}>{f}</span>
          <div style={{ marginLeft: "auto", background: "rgba(0,230,118,.1)", border: "1px solid rgba(0,230,118,.2)", borderRadius: 6, padding: "3px 8px", fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "var(--green)" }}>IMPORTED</div>
        </div>
      ))}
    </div>,
    // Step 1: deploy
    <div key={1} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {[["JM", "J. Martinez", "Foreman", "var(--sun)"], ["CH", "C. Hernandez", "Installer", "var(--cyan)"], ["DH", "D. Harris", "Electrician", "var(--green)"], ["MS", "M. Santos", "Installer", "var(--purple)"]].map(([init, name, role, col], i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "rgba(0,210,255,.04)", border: "1px solid rgba(0,210,255,.1)", borderRadius: 10, animation: `fadeUp .4s ${i * .08}s both` }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${col}, #004)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: "#fff", flexShrink: 0 }}>{init}</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{name}</div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "var(--text3)" }}>{role}</div>
          </div>
          <div style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: "var(--green)", animation: "blink 2s infinite" }} />
        </div>
      ))}
    </div>,
    // Step 2: track
    <div key={2} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
      {[["⚡", "312 panels installed · Zone C", "09:47", "var(--green)"], ["🔌", "String 7 test passed — 98.2% eff.", "09:31", "var(--cyan)"], ["📦", "MC4 connectors: 18% stock remaining", "08:30", "var(--amber)"], ["⚠️", "Torque issue flagged · Row 28", "08:15", "var(--red)"]].map(([icon, text, time, col], i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: `rgba(0,0,0,.3)`, border: `1px solid ${col}25`, borderRadius: 10, animation: `fadeUp .4s ${i * .08}s both` }}>
          <span>{icon}</span>
          <span style={{ fontSize: 12, color: "var(--text2)", flex: 1 }}>{text}</span>
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: col }}>{time}</span>
        </div>
      ))}
    </div>,
    // Step 3: ship
    <div key={3} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
      <div style={{ background: "rgba(0,230,118,.06)", border: "1px solid rgba(0,230,118,.2)", borderRadius: 14, padding: "20px 28px", textAlign: "center", width: "100%" }}>
        <div style={{ fontFamily: "'Rajdhani',monospace", fontSize: 32, fontWeight: 700, color: "var(--green)" }}>3 Days Ahead</div>
        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: "var(--text3)", letterSpacing: 1.5, marginTop: 4 }}>OF SCHEDULE</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
        {[["📋", "Daily Report", "READY"], ["✅", "Milestone Sign-off", "SENT"]].map(([icon, label, status], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(0,210,255,.04)", border: "1px solid rgba(0,210,255,.1)", borderRadius: 10 }}>
            <span>{icon}</span>
            <span style={{ fontSize: 12 }}>{label}</span>
            <span style={{ marginLeft: "auto", fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "var(--green)" }}>{status}</span>
          </div>
        ))}
      </div>
    </div>
  ];
  return visuals[step] || visuals[0];
}

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % 4), 3000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,var(--sun),#c97a00)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, animation: "glow 3s ease-in-out infinite" }}>☀️</div>
          <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: .5 }}>
            <span style={{ color: "var(--sun)" }}>Solar</span><span style={{ color: "var(--cyan)" }}>Ops</span><span style={{ color: "var(--text2)" }}>.AI</span>
          </div>
        </div>
        <div className="nav-links">
          {["features", "workflow", "pricing"].map(id => (
            <span key={id} className="nav-link-item" onClick={() => scrollTo(id)} style={{ textTransform: "capitalize" }}>{id}</span>
          ))}
          <span className="nav-link-item">Docs</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="btn-outline" style={{ padding: "8px 20px", fontSize: 14 }}>Log in</button>
          <button className="nav-cta">Get Started →</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="grid-bg" />

        {/* Orbs */}
        <div className="hero-orb" style={{ width: 500, height: 500, top: -100, left: "60%", background: "radial-gradient(circle, rgba(245,166,35,.12), transparent 70%)", animation: "orb1 18s ease-in-out infinite" }} />
        <div className="hero-orb" style={{ width: 600, height: 400, top: "20%", left: "-10%", background: "radial-gradient(circle, rgba(0,210,255,.08), transparent 70%)", animation: "orb2 22s ease-in-out infinite" }} />

        <div className="badge animate-in">
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", animation: "blink 2s infinite" }} />
          NOW IN GENERAL AVAILABILITY · V2.4
        </div>

        <h1 className="hero-title animate-in animate-in-delay-1">
          The Command Center<br />
          <span className="gradient-text">The Field Deserves</span>
        </h1>

        <p className="hero-sub animate-in animate-in-delay-2">
          Real-time dashboards, AI-powered field intelligence, and end-to-end project tracking — built for the crews installing the energy grid of tomorrow.
        </p>

        <div className="hero-btns animate-in animate-in-delay-3">
          <button className="btn-primary" onClick={() => scrollTo("pricing")}>Start Free Trial →</button>
          <button className="btn-outline" onClick={() => scrollTo("features")}>See Features</button>
        </div>

        <div className="mockup-wrap animate-in animate-in-delay-4">
          <div className="mockup-glow" />
          <MockupVisual />
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {[["2.4 GW", "Solar capacity managed"], ["840+", "Active project sites"], ["99.8%", "Platform uptime SLA"], ["4.1h", "Avg daily time saved/PM"]].map(([val, label]) => (
          <div key={label} className="stat-item">
            <div className="stat-val">{val}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div id="features" style={{ background: "rgba(0,0,0,.15)" }}>
        <div className="section">
          <div className="section-tag">Platform Capabilities</div>
          <h2 className="section-title">Every module your<br />field team needs</h2>
          <p className="section-sub">Built by solar EPC veterans who were tired of running $20M projects on spreadsheets and group chats.</p>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-accent" style={{ background: f.accent }} />
                <span className="feature-icon">{f.icon}</span>
                <div className="feature-name">{f.name}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WORKFLOW */}
      <div id="workflow">
        <div className="section">
          <div className="section-tag">How It Works</div>
          <h2 className="section-title">From first panel to<br />final sign-off</h2>
          <div className="workflow">
            <div className="workflow-steps">
              {STEPS.map((s, i) => (
                <div key={i} className={`workflow-step ${activeStep === i ? "active" : ""}`} onClick={() => setActiveStep(i)}>
                  <div className="workflow-step-num">{s.num}</div>
                  <div>
                    <div className="workflow-step-title">{s.title}</div>
                    <div className="workflow-step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="workflow-visual">
              <WorkflowVisual step={activeStep} />
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ background: "rgba(0,0,0,.15)" }}>
        <div className="section">
          <div className="section-tag">Customer Stories</div>
          <h2 className="section-title">Trusted by the crews<br />building utility-scale solar</h2>
          <div className="testimonials">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <div className="testimonial-quote">"{t.quote}"</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: `linear-gradient(135deg, ${t.color}, rgba(0,0,0,.5))` }}>{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing">
        <div className="section">
          <div className="section-tag">Pricing</div>
          <h2 className="section-title">Simple, project-based<br />pricing</h2>
          <p className="section-sub">No per-seat surprises. Pay for the projects you run, not the people on them.</p>
          <div className="pricing-grid">
            {PRICING.map((p, i) => (
              <div key={i} className={`pricing-card ${p.featured ? "featured" : ""}`}>
                {p.badge && <div className="pricing-badge">{p.badge}</div>}
                <div className="pricing-tier">{p.tier}</div>
                <div className="pricing-price" style={{ color: p.featured ? "var(--cyan)" : "var(--text)" }}>
                  {p.price}<span>{p.unit}</span>
                </div>
                <div className="pricing-desc">{p.desc}</div>
                <div className="pricing-divider" />
                {p.features.map((f, j) => (
                  <div key={j} className="pricing-feature">
                    <span className="pricing-check">✓</span>
                    {f}
                  </div>
                ))}
                <button className={p.featured ? "btn-primary" : "btn-outline"} style={{ width: "100%", marginTop: 24, padding: "13px", borderRadius: 10 }}>
                  {p.price === "Custom" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="section-tag" style={{ justifyContent: "center", display: "flex" }}>Get Early Access</div>
        <h2 className="section-title" style={{ maxWidth: 600, margin: "0 auto 16px" }}>
          Ready to run your site<br />
          <span className="gradient-text">like a mission control?</span>
        </h2>
        <p style={{ color: "var(--text2)", fontSize: 17, maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.7, fontWeight: 300 }}>
          Join 840+ EPC teams who replaced their spreadsheets and walkie-talkies with SolarOps.AI.
        </p>
        {submitted ? (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", background: "rgba(0,230,118,.1)", border: "1px solid rgba(0,230,118,.3)", borderRadius: 12, color: "var(--green)", fontWeight: 600 }}>
            ✓ We'll be in touch — check your inbox!
          </div>
        ) : (
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@company.com"
              style={{ width: 280, padding: "13px 18px", borderRadius: 11, background: "rgba(0,0,0,.4)", border: "1px solid rgba(0,210,255,.25)", color: "var(--text)", fontSize: 15, outline: "none" }}
              onKeyDown={e => e.key === "Enter" && email && setSubmitted(true)}
            />
            <button className="btn-primary" style={{ padding: "13px 28px", fontSize: 16 }} onClick={() => email && setSubmitted(true)}>
              Start Free Trial →
            </button>
          </div>
        )}
        <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 16 }}>No credit card required · 14-day free trial · Cancel anytime</p>
      </div>

      {/* FOOTER */}
      <footer>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,var(--sun),#c97a00)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>☀️</div>
          <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 17 }}>
            <span style={{ color: "var(--sun)" }}>Solar</span><span style={{ color: "var(--cyan)" }}>Ops</span><span style={{ color: "var(--text2)" }}>.AI</span>
          </div>
          <span style={{ fontSize: 12, color: "var(--text3)", marginLeft: 8 }}>© 2026 SolarOps Technologies, Inc.</span>
        </div>
        <div className="footer-links">
          {["Privacy", "Terms", "Security", "Status", "Docs", "Blog"].map(l => (
            <span key={l} className="footer-link">{l}</span>
          ))}
        </div>
      </footer>
    </>
  );
}
