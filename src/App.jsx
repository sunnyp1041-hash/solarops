import { useState, useRef, useEffect } from "react";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/* ═══════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════ */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:      #070D1A;
  --bg2:     #0C1526;
  --bg3:     #112038;
  --card:    #0F1C33;
  --card2:   #142240;
  --border:  rgba(0,210,255,0.12);
  --border2: rgba(0,210,255,0.22);
  --sun:     #F5A623;
  --sun2:    #FFD166;
  --cyan:    #00D2FF;
  --green:   #00E676;
  --red:     #FF4757;
  --amber:   #FFA502;
  --purple:  #A55EEA;
  --text:    #E2EEF9;
  --text2:   #8AAEC8;
  --text3:   #4E6E8A;
  --radius:  14px;
  --shadow:  0 4px 24px rgba(0,0,0,0.4);
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
  height: 100vh;
}

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,210,255,0.18); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0,210,255,0.35); }

input, button, select, textarea { font-family: 'DM Sans', sans-serif; }
button { cursor: pointer; }

@keyframes blink    { 0%,100%{opacity:1} 50%{opacity:.25} }
@keyframes spinSun  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes glow     { 0%,100%{box-shadow:0 0 8px rgba(245,166,35,.3)} 50%{box-shadow:0 0 22px rgba(245,166,35,.7)} }
@keyframes fadeUp   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
@keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.45} }
@keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }

.fade-up { animation: fadeUp .4s ease both; }
.fade-up:nth-child(1){animation-delay:.04s}
.fade-up:nth-child(2){animation-delay:.08s}
.fade-up:nth-child(3){animation-delay:.12s}
.fade-up:nth-child(4){animation-delay:.16s}
.fade-up:nth-child(5){animation-delay:.20s}
.fade-up:nth-child(6){animation-delay:.24s}

.nav-link {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 14px; border-radius: 10px;
  font-size: 13.5px; font-weight: 500; color: var(--text2);
  border: 1px solid transparent; transition: all .2s;
  cursor: pointer; white-space: nowrap;
  background: none;
  width: 100%;
  text-align: left;
}
.nav-link:hover { background: rgba(0,210,255,.06); color: var(--text); }
.nav-link.active {
  background: rgba(0,210,255,.1);
  color: var(--cyan);
  border-color: rgba(0,210,255,.2);
}
.nav-link .icon { font-size: 17px; width: 22px; text-align:center; flex-shrink:0; }
.nav-link .badge {
  margin-left: auto; background: var(--red); color: #fff;
  font-size: 10px; font-weight: 700; padding: 1px 6px;
  border-radius: 10px; font-family: 'Share Tech Mono', monospace;
}
.nav-link .badge.amber { background: var(--amber); color: #000; }
.nav-link .badge.green { background: var(--green); color: #000; }

.btn-primary {
  background: linear-gradient(135deg, var(--sun), #d47d00);
  color: #000; font-weight: 700; font-size: 13px;
  padding: 9px 18px; border-radius: 9px; border: none;
  letter-spacing: .3px; transition: all .2s;
  font-family: 'Rajdhani', sans-serif; font-size: 14px;
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(245,166,35,.35); }

.btn-ghost {
  background: rgba(0,210,255,.08); border: 1px solid rgba(0,210,255,.25);
  color: var(--cyan); font-size: 12.5px; font-weight: 500;
  padding: 7px 14px; border-radius: 8px; transition: all .2s;
}
.btn-ghost:hover { background: rgba(0,210,255,.16); border-color: rgba(0,210,255,.5); }

.btn-danger {
  background: rgba(255,71,87,.12); border: 1px solid rgba(255,71,87,.3);
  color: var(--red); font-size: 12.5px; font-weight: 600;
  padding: 7px 14px; border-radius: 8px; transition: all .2s;
}
.btn-danger:hover { background: rgba(255,71,87,.22); }

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.card-header {
  padding: 18px 22px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
}

.section-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--text3); padding: 18px 14px 6px;
}

table { width: 100%; border-collapse: collapse; }
th {
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px; letter-spacing: 1.8px; text-transform: uppercase;
  color: var(--text3); padding: 11px 20px; text-align: left;
  background: rgba(0,0,0,.25); border-bottom: 1px solid var(--border);
  white-space: nowrap;
}
td { padding: 13px 20px; border-bottom: 1px solid rgba(255,255,255,.035); vertical-align: middle; }
tr:last-child td { border-bottom: none; }
tr:hover td { background: rgba(0,210,255,.03); }

.pill {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 11px; border-radius: 20px;
  font-size: 11px; font-weight: 600;
  font-family: 'Share Tech Mono', monospace;
  white-space: nowrap;
}
.pill-green  { background: rgba(0,230,118,.1); color: var(--green); border: 1px solid rgba(0,230,118,.25); }
.pill-amber  { background: rgba(255,165,2,.1);  color: var(--amber); border: 1px solid rgba(255,165,2,.25); }
.pill-red    { background: rgba(255,71,87,.1);  color: var(--red);   border: 1px solid rgba(255,71,87,.25); }
.pill-cyan   { background: rgba(0,210,255,.1);  color: var(--cyan);  border: 1px solid rgba(0,210,255,.25); }
.pill-purple { background: rgba(165,94,234,.1); color: var(--purple); border: 1px solid rgba(165,94,234,.25); }

.pbar-wrap { width: 100%; height: 6px; background: rgba(255,255,255,.07); border-radius: 3px; overflow: hidden; }
.pbar-fill  { height: 100%; border-radius: 3px; transition: width 1.2s cubic-bezier(.4,0,.2,1); }

.mono { font-family: 'Share Tech Mono', monospace; }

input[type=text], input[type=search], input[type=email], input[type=password], textarea, select {
  background: rgba(0,0,0,.35); border: 1px solid var(--border2);
  color: var(--text); border-radius: 9px; outline: none;
  padding: 10px 14px; font-size: 13px; width: 100%;
  transition: border-color .2s;
}
input:focus, textarea:focus, select:focus { border-color: var(--cyan); }
input::placeholder { color: var(--text3); }

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 999px rgba(11,20,40,1) inset !important;
  -webkit-text-fill-color: var(--text) !important;
  caret-color: var(--text) !important;
}

.tag {
  display: inline-block; padding: 3px 9px; border-radius: 6px;
  font-size: 11px; font-weight: 600;
  font-family: 'Share Tech Mono', monospace;
}

/* ── MOBILE BOTTOM NAV ── */
.bottom-nav {
  display: none;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 64px;
  background: rgba(7,13,26,.97);
  border-top: 1px solid var(--border);
  backdrop-filter: blur(20px);
  z-index: 200;
  padding: 0 4px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.bottom-nav::-webkit-scrollbar { display: none; }
.bottom-nav-inner {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 2px;
  min-width: max-content;
  padding: 0 4px;
}
.bottom-nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: none;
  color: var(--text3);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .3px;
  cursor: pointer;
  transition: all .2s;
  min-width: 60px;
  font-family: 'DM Sans', sans-serif;
  position: relative;
}
.bottom-nav-btn .bnav-icon { font-size: 20px; line-height: 1; }
.bottom-nav-btn.active { color: var(--cyan); background: rgba(0,210,255,.08); border-color: rgba(0,210,255,.2); }
.bottom-nav-btn .bnav-badge {
  position: absolute; top: 4px; right: 8px;
  background: var(--red); color: #fff;
  font-size: 9px; font-weight: 700;
  padding: 1px 4px; border-radius: 8px;
  font-family: 'Share Tech Mono', monospace;
  line-height: 1.4;
}
.bottom-nav-btn .bnav-badge.amber { background: var(--amber); color: #000; }

/* ── MOBILE TOPBAR ── */
.mobile-topbar {
  display: none;
  height: 52px;
  background: rgba(7,13,26,.97);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(20px);
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

/* ── RESPONSIVE BREAKPOINTS ── */
.desktop-topbar { display: flex; }
.desktop-sidebar { display: flex; }
.desktop-page-header { display: flex; }
.desktop-content { display: block; }
.desktop-layout { display: flex; }
.mobile-content { display: none; }

/* Dashboard layout */
.dash-grid { display: grid; grid-template-columns: 1fr 340px; gap: 20px; height: 100%; overflow: hidden; }
.dash-left { overflow-y: auto; display: flex; flex-direction: column; gap: 20px; padding-right: 4px; }
.dash-right { display: flex; flex-direction: column; gap: 16px; overflow-y: auto; }

/* KPI grid */
.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
/* Reports grid */
.reports-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
/* Schedule grid */
.schedule-grid { display: grid; grid-template-columns: 1fr 320px; gap: 20px; }
/* Zone cards grid */
.zone-cards-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
/* Incident form grid */
.incident-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 12px; }
/* Quick actions grid */
.quick-actions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
/* Week stats */
.week-stats-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }

/* Make all tables scroll horizontally on small screens */
.card { overflow-x: auto; }

@media (max-width: 768px) {
  body { overflow: auto; }

  .desktop-layout { display: none !important; }
  .desktop-topbar { display: none !important; }
  .desktop-sidebar { display: none !important; }
  .desktop-page-header { display: none !important; }
  .desktop-content { display: none !important; }

  /* Mobile dashboard: single column, right panel hidden */
  .dash-grid { display: flex; flex-direction: column; height: auto; overflow: visible; }
  .dash-left { padding-right: 0; }
  .dash-right { display: none; }

  /* KPI grid: 2 columns on mobile */
  .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
  /* Reports grid: 1 column on mobile */
  .reports-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
  /* Schedule: stack vertically */
  .schedule-grid { grid-template-columns: 1fr !important; }
  /* Zone cards: 2 per row */
  .zone-cards-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
  /* Incident form: 1 col */
  .incident-grid { grid-template-columns: 1fr !important; }
  /* Quick actions: 2 col stays fine */
  .quick-actions-grid { grid-template-columns: 1fr 1fr !important; }

  /* Tables: scroll horizontally */
  table { display: block; overflow-x: auto; white-space: nowrap; width: 100%; }

  /* Card headers: stack on mobile */
  .card-header { flex-wrap: wrap; gap: 10px !important; }
  .card-header > div, .card-header > button { flex-shrink: 0; }

  .mobile-topbar { display: flex !important; }
  .bottom-nav { display: block !important; }
  .mobile-content { display: block !important; }

  .kpi-grid-4 { grid-template-columns: repeat(2,1fr) !important; gap: 10px !important; }
  .kpi-grid-3 { grid-template-columns: repeat(2,1fr) !important; gap: 10px !important; }

  .dash-layout { grid-template-columns: 1fr !important; }
  .zone-grid-5 { grid-template-columns: repeat(2,1fr) !important; }
  .report-grid { grid-template-columns: 1fr !important; }
  .schedule-grid { grid-template-columns: 1fr !important; }

  .card-header {
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px 16px !important;
  }
  .card-header-actions { flex-wrap: wrap; gap: 6px; }

  table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  th, td { padding: 10px 14px !important; font-size: 12px !important; }

  .hide-mobile { display: none !important; }
  .mobile-full { width: 100% !important; }

  input[type=text], input[type=search], input[type=email], input[type=password], select {
    font-size: 16px !important;
  }

  .btn-primary, .btn-ghost, .btn-danger {
    padding: 10px 14px !important;
    font-size: 13px !important;
  }

  .kpi-value-big { font-size: 28px !important; }
  .section-title-text { font-size: 17px !important; }

  .progress-row { padding: 12px 16px !important; }
  .task-row { padding: 11px 16px !important; }
  .alert-banner { padding: 10px 12px !important; }

  .chat-panel { max-height: 260px !important; }
  .right-panel-mobile { display: flex; flex-direction: column; gap: 14px; }
}
`;

/* ═══════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════ */
const SectionTitle = ({ children, sub }) => (
  <div>
    <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)", display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ width: 4, height: 20, background: "linear-gradient(180deg,var(--cyan),var(--purple))", borderRadius: 2, display: "inline-block", flexShrink: 0 }} />
      {children}
    </div>
    {sub && <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2, paddingLeft: 14 }}>{sub}</div>}
  </div>
);

const KpiCard = ({ label, value, sub, trend, trendUp, color, icon }) => (
  <div className="card fade-up" style={{ padding: "20px 22px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${color}, transparent)` }} />
    <div style={{ position: "absolute", top: 14, right: 16, fontSize: 28, opacity: .12 }}>{icon}</div>
    <div className="mono" style={{ fontSize: 10, color: "var(--text3)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
    <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 38, fontWeight: 700, color, lineHeight: 1, marginBottom: 6 }}>{value}</div>
    <div style={{ fontSize: 12, color: "var(--text2)", marginBottom: 6 }}>{sub}</div>
    {trend && <div style={{ fontSize: 11, color: trendUp ? "var(--green)" : "var(--amber)", fontWeight: 600 }}>{trend}</div>}
  </div>
);

const ProgressRow = ({ label, pct, color, detail }) => (
  <div style={{ padding: "14px 22px", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <div>
        <span style={{ fontSize: 13.5, fontWeight: 500 }}>{label}</span>
        {detail && <span style={{ fontSize: 11, color: "var(--text3)", marginLeft: 8 }}>{detail}</span>}
      </div>
      <span className="mono" style={{ fontSize: 12, color, fontWeight: 700 }}>{pct}%{pct === 100 ? " ✓" : ""}</span>
    </div>
    <div className="pbar-wrap">
      <div className="pbar-fill" style={{ width: `${pct}%`, background: color === "var(--green)" ? "var(--green)" : pct > 60 ? "linear-gradient(90deg,var(--cyan),var(--purple))" : pct > 30 ? "linear-gradient(90deg,var(--amber),var(--sun))" : "var(--red)" }} />
    </div>
  </div>
);

const AlertBanner = ({ type, icon, text, time, onDismiss }) => {
  const colors = { critical: ["rgba(255,71,87,.12)","var(--red)","rgba(255,71,87,.25)"], warn: ["rgba(255,165,2,.1)","var(--amber)","rgba(255,165,2,.2)"], info: ["rgba(0,210,255,.08)","var(--cyan)","rgba(0,210,255,.15)"], ok: ["rgba(0,230,118,.08)","var(--green)","rgba(0,230,118,.15)"] };
  const [bg, col, bdr] = colors[type] || colors.info;
  return (
    <div style={{ display: "flex", gap: 12, padding: "12px 16px", background: bg, border: `1px solid ${bdr}`, borderRadius: 10, alignItems: "flex-start" }}>
      <div style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--text)" }}>{text}</div>
        <div className="mono" style={{ fontSize: 10, color: col, marginTop: 4, letterSpacing: 1 }}>{time}</div>
      </div>
      {onDismiss && <button onClick={onDismiss} style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 16, lineHeight: 1, padding: "0 4px", flexShrink: 0 }}>×</button>}
    </div>
  );
};

/* ═══════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════ */
const DEFAULT_ALERTS = [
  { id: 1, type: "critical", icon: "⚠️", text: "Torque spec issue – Zone B Row 28. Ahmed stopped work pending foreman review.", time: "09:47 · CRITICAL" },
  { id: 2, type: "warn",     icon: "📦", text: "MC4 connector stock at 18%. Reorder 1,200 units before Monday.", time: "08:30 · MATERIALS" },
  { id: 3, type: "info",     icon: "🌬️", text: "Wind advisory 3–5 PM. Pause crane lifts in Zone D.", time: "07:15 · WEATHER" },
  { id: 4, type: "ok",       icon: "✅", text: "Zone A final inspection passed. Ready for interconnect sign-off.", time: "07:00 · COMPLETE" },
];
const DEFAULT_TASKS = [
  { id:1, done:true,  active:false, urgent:false, text:"Morning safety tailgate – all crew", time:"07:00", p:"high" },
  { id:2, done:true,  active:false, urgent:false, text:"Zone A punch list – final torque & QC sign-off", time:"09:30", p:"high" },
  { id:3, done:false, active:true,  urgent:false, text:"Zone B string testing – strings 1–12", time:"NOW", p:"high" },
  { id:4, done:false, active:true,  urgent:false, text:"Zone C panel install – target 200 panels by EOD", time:"NOW", p:"med" },
  { id:5, done:false, active:false, urgent:true,  text:"Resolve torque issue Zone B Row 28", time:"URGENT", p:"high" },
  { id:6, done:false, active:false, urgent:false, text:"Reorder confirmation – MC4 connectors (1,200 units)", time:"14:00", p:"med" },
  { id:7, done:false, active:false, urgent:false, text:"EOD photo documentation – all active zones", time:"17:00", p:"low" },
  { id:8, done:false, active:false, urgent:false, text:"Submit daily production report to PM", time:"17:30", p:"low" },
];

function useLocalState(key, def) {
  const [val, setVal] = useState(() => { try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : def; } catch { return def; } });
  const save = v => { setVal(v); try { localStorage.setItem(key, JSON.stringify(v)); } catch {} };
  return [val, save];
}

function Dashboard({ user }) {
  const [alerts, setAlerts] = useLocalState("so_alerts", DEFAULT_ALERTS);
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [chatMsgs, setChatMsgs] = useState([
    { from:"ai",   text:"Good morning ☀️  Zone A is complete. Today: fix torque issue Zone B Row 28, push Zone C to 200 panels. You're 3 days ahead of schedule — great pace." },
    { from:"user", text:"How many panels do we need today?" },
    { from:"ai",   text:"Target 280+ to hold your 3-day buffer. At current pace (312 projected) you'll extend it to 3.5 days. Keep Zone C at full strength." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatRef = useRef(null);
  const aiReplies = [
    "Zone C will hit 52% by EOD. Recommend moving 2 installers from Zone B Row 35 (ahead of target) to Zone C to accelerate.",
    "String 7 Zone B: 98.2% efficiency — within spec. DeShawn is clear to proceed to strings 8–12.",
    "MC4 connectors: at current rate you'll run out Wednesday. Want me to draft the reorder request now?",
    "Zone A is ready for utility interconnect inspection. I can schedule the inspector and generate the full as-built package.",
    "Tomorrow's forecast: 79°F, low wind, UV 8. Ideal conditions — great day to run an extended shift in Zone D.",
  ];
  const [rIdx, setRIdx] = useState(0);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const m = [...chatMsgs, { from:"user", text: chatInput }];
    setChatMsgs(m); setChatInput("");
    setTimeout(() => { setChatMsgs(prev => [...prev, { from:"ai", text: aiReplies[rIdx % aiReplies.length] }]); setRIdx(r=>r+1); }, 700);
  };
  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [chatMsgs]);

  // Load tasks from Supabase
  useEffect(() => {
    if (!user) return;
    setTasksLoading(true);
    supabase.from("tasks").select("*").eq("user_id", user.id).order("created_at").then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setTasks(data.map(t => ({ id: t.id, done: t.done, active: false, urgent: t.urgent, text: t.text, time: t.time, p: t.priority })));
      }
      setTasksLoading(false);
    });
  }, [user]);

  const toggleTask = async (id) => {
    const task = tasks.find(x => x.id === id);
    const newDone = !task.done;
    setTasks(tasks.map(x => x.id === id ? { ...x, done: newDone, active: false } : x));
    await supabase.from("tasks").update({ done: newDone }).eq("id", id);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    const newT = { user_id: user.id, text: newTask, done: false, urgent: false, priority: "med", time: "—" };
    const { data } = await supabase.from("tasks").insert(newT).select().single();
    if (data) setTasks([...tasks, { id: data.id, done: false, active: false, urgent: false, text: newTask, time: "—", p: "med" }]);
    setNewTask("");
  };

  const deleteTask = async (id) => {
    setTasks(tasks.filter(x => x.id !== id));
    await supabase.from("tasks").delete().eq("id", id);
  };

  const pDot = { high:"var(--red)", med:"var(--amber)", low:"var(--green)" };

  const zones = [
    { label:"Zone A – Rows 1–20",    pct:100, detail:"1,680 panels" },
    { label:"Zone B – Rows 21–45",   pct:78,  detail:"2,100 panels" },
    { label:"Zone C – Rows 46–70",   pct:52,  detail:"2,100 panels" },
    { label:"Zone D – Rows 71–100",  pct:21,  detail:"2,520 panels" },
    { label:"Zone E – Inverter Pads",pct:0,   detail:"Scheduled next week" },
  ];

  return (
    <div className="dash-grid">
      {/* LEFT */}
      <div className="dash-left">
        {/* KPIs */}
        <div className="kpi-grid">
          <KpiCard label="Panels Installed" value="4,821" sub="of 8,400 total" trend="↑ +312 today" trendUp color="var(--cyan)" icon="⚡" />
          <KpiCard label="Completion"       value="57.4%" sub="On schedule"     trend="+2.1% today"   trendUp color="var(--green)" icon="📈" />
          <KpiCard label="Active Crew"      value="34"    sub="of 38 on site"   trend="2 break · 2 travel" color="var(--amber)" icon="👷" />
          <KpiCard label="Open Issues"      value="4"     sub="1 critical · 3 minor" trend="⚠ Action needed" color="var(--red)" icon="🚨" />
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {alerts.map(a => <AlertBanner key={a.id} {...a} onDismiss={() => setAlerts(alerts.filter(x => x.id !== a.id))} />)}
          </div>
        )}

        {/* Zone Progress */}
        <div className="card">
          <div className="card-header">
            <SectionTitle sub="Tap any zone for details">Installation Progress by Zone</SectionTitle>
            <button className="btn-primary">+ Log Panels</button>
          </div>
          {zones.map((z,i) => <ProgressRow key={i} {...z} color={z.pct===100?"var(--green)":z.pct>60?"var(--cyan)":z.pct>30?"var(--amber)":"var(--red)"} />)}
          <div style={{ padding:"14px 22px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontSize:12, color:"var(--text3)" }}>Total: <span style={{ color:"var(--text)", fontWeight:600 }}>8,400 panels</span> across 5 zones</div>
            <button className="btn-ghost">View Full Breakdown</button>
          </div>
        </div>

        {/* Crew snapshot */}
        <div className="card">
          <div className="card-header">
            <SectionTitle sub="Live GPS positions">Crew Status</SectionTitle>
            <button className="btn-ghost">View All 38 →</button>
          </div>
          <table>
            <thead><tr>
              <th>Worker</th><th>Zone / Task</th><th>Status</th><th>Panels</th><th>Hours</th>
            </tr></thead>
            <tbody>
              {[
                { n:"Carlos Mendez",    r:"Lead Installer", z:"Zone B · Row 32",  t:"Panel racking",    s:"active", sl:"● ACTIVE",  p:48,  h:"6.2h" },
                { n:"DeShawn Harris",   r:"Electrician",    z:"Zone B · String 7", t:"String wiring",   s:"active", sl:"● ACTIVE",  p:"—", h:"6.2h" },
                { n:"Maria Santos",     r:"Installer",      z:"Zone C · Row 47",  t:"Panel placement",  s:"active", sl:"● ACTIVE",  p:41,  h:"6.2h" },
                { n:"Tyler Webb",       r:"Foreman",        z:"Zone C",           t:"QC Inspection",    s:"break",  sl:"⏸ BREAK",   p:"—", h:"5.8h" },
                { n:"Ahmed Al-Rashid",  r:"Installer",      z:"Zone B · Row 28",  t:"Torque issue ⚠",   s:"issue",  sl:"⚠ ISSUE",   p:22,  h:"6.2h" },
                { n:"Rosa Jimenez",     r:"Installer",      z:"Laydown Yard",     t:"Material staging", s:"travel", sl:"→ TRAVEL",  p:36,  h:"6.2h" },
              ].map((w,i) => (
                <tr key={i}>
                  <td>
                    <div style={{ fontWeight:600, fontSize:13.5 }}>{w.n}</div>
                    <div style={{ fontSize:11, color:"var(--text3)", marginTop:2 }}>{w.r}</div>
                  </td>
                  <td>
                    <div className="mono" style={{ fontSize:12, color:"var(--text2)" }}>{w.z}</div>
                    <div style={{ fontSize:11, color:"var(--text3)", marginTop:2 }}>{w.t}</div>
                  </td>
                  <td>
                    <span className={`pill pill-${w.s==="active"?"green":w.s==="break"?"amber":w.s==="issue"?"red":"cyan"}`}>{w.sl}</span>
                  </td>
                  <td><span className="mono" style={{ color:"var(--green)", fontSize:14 }}>{w.p}</span></td>
                  <td><span className="mono" style={{ fontSize:12 }}>{w.h}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Work Orders */}
        <div className="card" style={{ marginBottom:8 }}>
          <div className="card-header">
            <SectionTitle sub="Today's field tasks">Work Orders</SectionTitle>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTask()} placeholder="Add new task…" style={{ width:220, padding:"7px 12px", fontSize:12 }} />
              <button className="btn-primary" onClick={addTask}>+ Add</button>
            </div>
          </div>
          {tasks.map((t,i) => (
            <div key={t.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderBottom: i<tasks.length-1?"1px solid rgba(255,255,255,.04)":"none", cursor:"pointer", transition:"background .15s", minHeight:56 }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(0,210,255,.04)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div onClick={()=>toggleTask(t.id)} style={{ display:"flex", alignItems:"center", gap:12, flex:1 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:pDot[t.p], flexShrink:0 }} />
                <div style={{ width:26, height:26, borderRadius:"50%", border:`2px solid ${t.done?"var(--green)":t.active?"var(--cyan)":"var(--text3)"}`, background:t.done?"var(--green)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:12, color:t.done?"#000":t.active?"var(--cyan)":"transparent", fontWeight:700, transition:"all .2s" }}>
                  {t.done?"✓":t.active?"▶":""}
                </div>
                <div style={{ flex:1, fontSize:14, textDecoration:t.done?"line-through":"none", color:t.done?"var(--text3)":t.urgent?"var(--red)":"var(--text)", lineHeight:1.4 }}>{t.text}</div>
                <span className="mono" style={{ fontSize:10, color:t.urgent?"var(--red)":t.active?"var(--cyan)":"var(--text3)", letterSpacing:1, flexShrink:0 }}>{t.time}</span>
              </div>
              <button onClick={()=>deleteTask(t.id)} style={{ background:"none", border:"none", color:"var(--text3)", fontSize:18, padding:"4px 6px", flexShrink:0, lineHeight:1 }}>×</button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="dash-right">
        {/* Production Today */}
        <div className="card">
          <div style={{ padding:"18px 20px 14px" }}>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:14, fontWeight:600, color:"var(--text3)", letterSpacing:1, textTransform:"uppercase", marginBottom:14 }}>📈 Week Production</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:90 }}>
              {[["M",45,"187"],["T",62,"260"],["W",55,"231"],["T",80,"336"],["F",74,"312",true]].map(([d,h,v,today],i)=>(
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:5, height:"100%", justifyContent:"flex-end" }}>
                  <div className="mono" style={{ fontSize:9, color:today?"var(--sun)":"transparent" }}>▲</div>
                  <div title={`${v} panels`} style={{ width:"100%", height:`${h}%`, borderRadius:"4px 4px 0 0", background:today?"linear-gradient(0deg,rgba(245,166,35,.5),rgba(245,166,35,.9))":"linear-gradient(0deg,rgba(0,210,255,.25),rgba(0,210,255,.55))", cursor:"pointer" }} />
                  <span className="mono" style={{ fontSize:9, color:today?"var(--sun)":"var(--text3)" }}>{d}</span>
                </div>
              ))}
            </div>
            <div className="week-stats-grid" style={{ marginTop:14 }}>
              {[["312","PANELS","var(--sun)"],["86%","EFFICIENCY","var(--cyan)"],["3d","AHEAD","var(--green)"]].map(([v,l,c])=>(
                <div key={l} style={{ background:"rgba(0,0,0,.25)", border:"1px solid var(--border)", borderRadius:10, padding:"10px 8px", textAlign:"center" }}>
                  <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700, color:c }}>{v}</div>
                  <div className="mono" style={{ fontSize:9, color:"var(--text3)", letterSpacing:1 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mini Site Map */}
        <div className="card">
          <div style={{ padding:"18px 20px 14px" }}>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:14, fontWeight:600, color:"var(--text3)", letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>📡 Live Site Grid</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(10,1fr)", gap:3, padding:"10px", background:"rgba(0,0,0,.3)", borderRadius:10, border:"1px solid var(--border)" }}>
              {Array.from({length:50},(_,i)=>{
                const s = i<20?"done":i<32?"active":i===27?"issue":i<40?"active":"pending";
                const bg = {done:"rgba(0,230,118,.55)",active:"rgba(245,166,35,.7)",issue:"rgba(255,71,87,.8)",pending:"rgba(255,255,255,.07)"}[s];
                return <div key={i} style={{ aspectRatio:"1", borderRadius:2, background:bg, animation:(s==="active"||s==="issue")?"pulse 2s ease-in-out infinite":"none", animationDelay:`${i*0.05}s` }} />;
              })}
            </div>
            <div style={{ display:"flex", gap:12, marginTop:10, flexWrap:"wrap" }}>
              {[["rgba(0,230,118,.55)","Done"],["rgba(245,166,35,.7)","Active"],["rgba(255,71,87,.8)","Issue"],["rgba(255,255,255,.07)","Pending"]].map(([c,l])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:"var(--text3)" }}>
                  <div style={{ width:9, height:9, borderRadius:2, background:c }} />{l}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div style={{ padding:"18px 20px 14px" }}>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:14, fontWeight:600, color:"var(--text3)", letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>⚡ Quick Actions</div>
            <div className="quick-actions-grid">
              {[["📋","Log Panels","var(--cyan)"],["📸","Add Photo","var(--purple)"],["⚠️","Flag Issue","var(--red)"],["🔌","String Test","var(--green)"],["⏱️","Time Entry","var(--amber)"],["📊","Generate Report","var(--sun)"]].map(([icon,label,col])=>(
                <button key={label} style={{ background:"rgba(255,255,255,.04)", border:"1px solid var(--border)", borderRadius:10, padding:"12px 10px", textAlign:"center", color:"var(--text2)", transition:"all .2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=col; e.currentTarget.style.color=col; e.currentTarget.style.background=`${col}18`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text2)"; e.currentTarget.style.background="rgba(255,255,255,.04)"; }}>
                  <div style={{ fontSize:22, marginBottom:5 }}>{icon}</div>
                  <div style={{ fontSize:11, fontWeight:600, letterSpacing:.2 }}>{label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Chat */}
        <div className="card" style={{ flexShrink:0 }}>
          <div style={{ padding:"18px 20px 14px", display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:32, height:32, background:"linear-gradient(135deg,var(--cyan),var(--purple))", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🤖</div>
              <div>
                <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:15, fontWeight:700 }}>AI Field Assistant</div>
                <div style={{ fontSize:11, color:"var(--green)", display:"flex", alignItems:"center", gap:4 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--green)", animation:"blink 2s infinite" }} /> Online · Site-aware
                </div>
              </div>
            </div>
            <div ref={chatRef} style={{ display:"flex", flexDirection:"column", gap:10, maxHeight:220, overflowY:"auto", paddingRight:4 }}>
              {chatMsgs.map((m,i)=>(
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:m.from==="ai"?"flex-start":"flex-end" }}>
                  <div className="mono" style={{ fontSize:9, color:"var(--text3)", marginBottom:3, letterSpacing:1 }}>{m.from==="ai"?"SOLAROPS AI":"YOU"}</div>
                  <div style={{ padding:"9px 13px", borderRadius:m.from==="ai"?"4px 12px 12px 12px":"12px 4px 12px 12px", fontSize:12.5, lineHeight:1.55, background:m.from==="ai"?"rgba(0,210,255,.08)":"rgba(245,166,35,.1)", border:`1px solid ${m.from==="ai"?"rgba(0,210,255,.15)":"rgba(245,166,35,.2)"}`, maxWidth:"90%", color:"var(--text)" }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask anything about your site…" style={{ fontSize:12 }} />
              <button onClick={sendChat} style={{ background:"var(--cyan)", border:"none", borderRadius:9, width:38, height:38, fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:"#000", fontWeight:700, transition:"all .2s" }}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.08)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>➤</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SITE MAP
═══════════════════════════════════════════ */
function SiteMap() {
  const [selected, setSelected] = useState(null);
  const zones = [
    { id:"A", rows:"1–20",   pct:100, panels:1680, workers:0,  color:"var(--green)",  status:"Complete" },
    { id:"B", rows:"21–45",  pct:78,  panels:2100, workers:12, color:"var(--cyan)",   status:"Active" },
    { id:"C", rows:"46–70",  pct:52,  panels:2100, workers:14, color:"var(--cyan)",   status:"Active" },
    { id:"D", rows:"71–100", pct:21,  panels:2520, workers:8,  color:"var(--amber)",  status:"In Progress" },
    { id:"E", rows:"Inv Pads",pct:0,  panels:0,    workers:0,  color:"var(--text3)",  status:"Scheduled" },
  ];
  const sel = zones.find(z=>z.id===selected);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, height:"100%", overflowY:"auto" }}>
      <div className="card fade-up">
        <div className="card-header">
          <SectionTitle sub="Click a zone to inspect">Interactive Site Layout</SectionTitle>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn-ghost">🗺️ Export PDF</button>
            <button className="btn-primary">+ New Zone</button>
          </div>
        </div>
        <div style={{ padding:24, display:"flex", flexDirection:"column", gap:16 }}>
          {/* Zone cards */}
          <div className="zone-cards-grid">
            {zones.map(z=>(
              <div key={z.id} onClick={()=>setSelected(s=>s===z.id?null:z.id)}
                style={{ background:selected===z.id?"rgba(0,210,255,.08)":"rgba(0,0,0,.25)", border:`2px solid ${selected===z.id?z.color:"var(--border)"}`, borderRadius:14, padding:20, cursor:"pointer", transition:"all .2s", textAlign:"center" }}
                onMouseEnter={e=>{ if(selected!==z.id){ e.currentTarget.style.borderColor=z.color; e.currentTarget.style.background="rgba(0,0,0,.4)"; }}}
                onMouseLeave={e=>{ if(selected!==z.id){ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.background="rgba(0,0,0,.25)"; }}}>
                <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:42, fontWeight:700, color:z.color, lineHeight:1, marginBottom:4 }}>{z.id}</div>
                <div style={{ fontSize:11, color:"var(--text3)", marginBottom:12 }}>Rows {z.rows}</div>
                <div className="pbar-wrap" style={{ marginBottom:8 }}>
                  <div className="pbar-fill" style={{ width:`${z.pct}%`, background:z.color }} />
                </div>
                <div className="mono" style={{ fontSize:13, color:z.color, fontWeight:700, marginBottom:4 }}>{z.pct}%</div>
                <div style={{ fontSize:11, color:"var(--text3)" }}>👷 {z.workers} workers</div>
                <div style={{ marginTop:8 }}>
                  <span className={`pill ${z.pct===100?"pill-green":z.pct>50?"pill-cyan":z.pct>0?"pill-amber":"pill-purple"}`} style={{ fontSize:10 }}>{z.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {sel && (
            <div style={{ background:"rgba(0,0,0,.3)", border:`1px solid ${sel.color}40`, borderRadius:14, padding:24, animation:"fadeUp .3s ease" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700, color:sel.color }}>Zone {sel.id} — Detailed View</div>
                <span className={`pill ${sel.pct===100?"pill-green":sel.pct>50?"pill-cyan":sel.pct>0?"pill-amber":"pill-purple"}`}>{sel.status}</span>
              </div>
              <div className="kpi-grid">
                {[["Completion",`${sel.pct}%`,sel.color],["Total Panels",sel.panels.toLocaleString(),"var(--text)"],["Active Workers",sel.workers,"var(--amber)"],["Installed",Math.round(sel.panels*sel.pct/100).toLocaleString(),"var(--green)"]].map(([l,v,c])=>(
                  <div key={l} style={{ background:"rgba(0,0,0,.3)", border:"1px solid var(--border)", borderRadius:12, padding:"16px 18px", textAlign:"center" }}>
                    <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:28, fontWeight:700, color:c }}>{v}</div>
                    <div className="mono" style={{ fontSize:10, color:"var(--text3)", marginTop:4 }}>{l.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grid visual */}
          <div>
            <div style={{ fontSize:12, color:"var(--text3)", marginBottom:10, fontWeight:500 }}>Panel Installation Grid (visual representation)</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(20,1fr)", gap:3, background:"rgba(0,0,0,.3)", padding:16, borderRadius:12, border:"1px solid var(--border)" }}>
              {Array.from({length:100},(_,i)=>{
                const s = i<20?"done":i<38?"active":i===27?"issue":i<50?"active":i<60?"pending2":"pending";
                const bg = {done:"rgba(0,230,118,.6)",active:"rgba(245,166,35,.7)",issue:"rgba(255,71,87,.9)",pending2:"rgba(0,210,255,.3)",pending:"rgba(255,255,255,.07)"}[s];
                return <div key={i} title={`Panel ${i+1}`} style={{ aspectRatio:"1", borderRadius:2, background:bg, cursor:"pointer", transition:"transform .15s" }}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.4)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"} />;
              })}
            </div>
            <div style={{ display:"flex", gap:16, marginTop:10, flexWrap:"wrap" }}>
              {[["rgba(0,230,118,.6)","Installed"],["rgba(245,166,35,.7)","Active Install"],["rgba(255,71,87,.9)","Issue"],["rgba(0,210,255,.3)","Wiring"],["rgba(255,255,255,.07)","Pending"]].map(([c,l])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:"var(--text3)" }}>
                  <div style={{ width:10, height:10, borderRadius:2, background:c }} />{l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CREW
═══════════════════════════════════════════ */
const DEFAULT_CREW = [
    { name:"Carlos Mendez",   role:"Lead Installer", zone:"Zone B", cert:"OSHA-30", certExp:"2026-01", status:"active", panels:48,  hours:6.2, phone:"555-0101", ppe:true  },
    { name:"DeShawn Harris",  role:"Electrician",    zone:"Zone B", cert:"NABCEP",  certExp:"2025-11", status:"active", panels:"—", hours:6.2, phone:"555-0102", ppe:true  },
    { name:"Maria Santos",    role:"Installer",      zone:"Zone C", cert:"OSHA-10", certExp:"2027-03", status:"active", panels:41,  hours:6.2, phone:"555-0103", ppe:true  },
    { name:"Tyler Webb",      role:"Foreman",        zone:"Zone C", cert:"OSHA-30", certExp:"2026-08", status:"break",  panels:"—", hours:5.8, phone:"555-0104", ppe:true  },
    { name:"Ahmed Al-Rashid", role:"Installer",      zone:"Zone B", cert:"OSHA-10", certExp:"2025-09", status:"issue",  panels:22,  hours:6.2, phone:"555-0105", ppe:false },
    { name:"Rosa Jimenez",    role:"Installer",      zone:"Yard",   cert:"OSHA-10", certExp:"2026-05", status:"travel", panels:36,  hours:6.2, phone:"555-0106", ppe:true  },
    { name:"James Patel",     role:"Installer",      zone:"Zone D", cert:"OSHA-10", certExp:"2026-11", status:"active", panels:39,  hours:6.2, phone:"555-0107", ppe:true  },
    { name:"Keisha Brown",    role:"Electrician",    zone:"Zone D", cert:"NABCEP",  certExp:"2027-02", status:"active", panels:"—", hours:6.2, phone:"555-0108", ppe:true  },
    { name:"Luis Vega",       role:"Installer",      zone:"Zone C", cert:"OSHA-10", certExp:"2026-07", status:"active", panels:44,  hours:6.2, phone:"555-0109", ppe:true  },
    { name:"Sarah Kim",       role:"QC Inspector",   zone:"Zone A", cert:"OSHA-30", certExp:"2027-01", status:"active", panels:"—", hours:6.2, phone:"555-0110", ppe:true  },
];

function Crew() {
  const [crew, setCrew] = useLocalState("so_crew", DEFAULT_CREW);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newWorker, setNewWorker] = useState({ name:"", role:"Installer", zone:"Zone B", cert:"OSHA-10", certExp:"2027-01", phone:"", status:"active", panels:0, hours:0, ppe:true });
  const statLabel = { active:"● ACTIVE", break:"⏸ BREAK", issue:"⚠ ISSUE", travel:"→ TRAVEL" };
  const statPill  = { active:"pill-green", break:"pill-amber", issue:"pill-red", travel:"pill-cyan" };
  const filters   = ["All","Active","Break","Issue","Travel"];
  const visible   = crew.filter(w => (filter==="All" || w.status===filter.toLowerCase()) && (w.name.toLowerCase().includes(search.toLowerCase()) || w.role.toLowerCase().includes(search.toLowerCase())));
  const addWorker = () => { if (!newWorker.name.trim()) return; setCrew([...crew, newWorker]); setNewWorker({ name:"", role:"Installer", zone:"Zone B", cert:"OSHA-10", certExp:"2027-01", phone:"", status:"active", panels:0, hours:0, ppe:true }); setShowAdd(false); };
  const removeWorker = name => setCrew(crew.filter(w => w.name !== name));

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, height:"100%", overflowY:"auto" }}>
      <div className="kpi-grid">
        <KpiCard label="Total On Site" value="38" sub="Checked in today" color="var(--cyan)"   icon="👷" />
        <KpiCard label="Active"        value="34" sub="Currently working" color="var(--green)" icon="✅" />
        <KpiCard label="Issues"        value="1"  sub="Needs attention"   color="var(--red)"   icon="⚠️" />
        <KpiCard label="Panels Today"  value="312" sub="Total by crew"    color="var(--sun)"   icon="⚡" />
      </div>
      <div className="card fade-up">
        <div className="card-header">
          <SectionTitle sub={`Showing ${visible.length} of ${crew.length}`}>All Crew Members</SectionTitle>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or role…" style={{ width:200, padding:"7px 12px", fontSize:12 }} />
            <div style={{ display:"flex", gap:6 }}>
              {filters.map(f=>(
                <button key={f} onClick={()=>setFilter(f)} style={{ background:filter===f?"rgba(0,210,255,.15)":"rgba(255,255,255,.04)", border:`1px solid ${filter===f?"rgba(0,210,255,.4)":"var(--border)"}`, color:filter===f?"var(--cyan)":"var(--text2)", fontSize:11, fontWeight:600, padding:"5px 12px", borderRadius:7, transition:"all .2s" }}>{f}</button>
              ))}
            </div>
            <button className="btn-primary" onClick={()=>setShowAdd(a=>!a)}>+ Add Worker</button>
          </div>
        </div>
        {showAdd && (
          <div style={{ padding:"16px", background:"rgba(0,210,255,.05)", borderBottom:"1px solid var(--border)", display:"flex", flexDirection:"column", gap:10 }}>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:15, fontWeight:700, color:"var(--cyan)" }}>Add New Worker</div>
            <div className="incident-grid">
              <div><div style={{ fontSize:11, color:"var(--text3)", marginBottom:4 }}>FULL NAME</div><input value={newWorker.name} onChange={e=>setNewWorker(x=>({...x,name:e.target.value}))} placeholder="Full name" /></div>
              <div><div style={{ fontSize:11, color:"var(--text3)", marginBottom:4 }}>ROLE</div>
                <select value={newWorker.role} onChange={e=>setNewWorker(x=>({...x,role:e.target.value}))}>
                  {["Installer","Lead Installer","Electrician","Foreman","QC Inspector"].map(r=><option key={r}>{r}</option>)}
                </select>
              </div>
              <div><div style={{ fontSize:11, color:"var(--text3)", marginBottom:4 }}>ZONE</div>
                <select value={newWorker.zone} onChange={e=>setNewWorker(x=>({...x,zone:e.target.value}))}>
                  {["Zone A","Zone B","Zone C","Zone D","Yard"].map(z=><option key={z}>{z}</option>)}
                </select>
              </div>
              <div><div style={{ fontSize:11, color:"var(--text3)", marginBottom:4 }}>PHONE</div><input value={newWorker.phone} onChange={e=>setNewWorker(x=>({...x,phone:e.target.value}))} placeholder="555-0100" /></div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn-primary" onClick={addWorker}>✓ Add to Crew</button>
              <button className="btn-ghost" onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        )}
        <table>
          <thead><tr>
            <th>Worker</th><th>Role</th><th>Zone</th><th>Cert</th><th>PPE</th><th>Status</th><th>Panels</th><th>Hours</th><th>Contact</th><th></th>
          </tr></thead>
          <tbody>
            {visible.map((w,i)=>(
              <tr key={i}>
                <td style={{ fontWeight:600, fontSize:13.5 }}>{w.name}</td>
                <td><span style={{ fontSize:12, color:"var(--text2)" }}>{w.role}</span></td>
                <td><span className="mono" style={{ fontSize:12 }}>{w.zone}</span></td>
                <td><span className="pill pill-cyan" style={{ fontSize:10 }}>{w.cert}</span></td>
                <td><span style={{ color:w.ppe?"var(--green)":"var(--red)", fontSize:16 }}>{w.ppe?"✓":"✗"}</span></td>
                <td><span className={`pill ${statPill[w.status]}`}>{statLabel[w.status]}</span></td>
                <td><span className="mono" style={{ color:"var(--green)", fontSize:14 }}>{w.panels}</span></td>
                <td><span className="mono" style={{ fontSize:12 }}>{w.hours}h</span></td>
                <td><span className="mono" style={{ fontSize:11, color:"var(--cyan)" }}>{w.phone}</span></td>
                <td><button onClick={()=>removeWorker(w.name)} style={{ background:"none", border:"none", color:"var(--text3)", fontSize:16, padding:"4px 8px", cursor:"pointer" }}>×</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length===0 && <div style={{ padding:"40px 20px", textAlign:"center", color:"var(--text3)", fontSize:13 }}>No crew members match your filter.</div>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MATERIALS
═══════════════════════════════════════════ */
const DEFAULT_MATERIALS = [
  { name:"Solar Panels (400W)",  sku:"SP-400W",  stock:3579, unit:"panels", min:500,  reorder:500  },
  { name:"MC4 Connectors",       sku:"MC4-M/F",  stock:214,  unit:"pairs",  min:500,  reorder:1200 },
  { name:"Racking Rails (4m)",   sku:"RR-4M",    stock:890,  unit:"pcs",    min:200,  reorder:200  },
  { name:"Mounting Bolts M8",    sku:"MB-M8",    stock:4200, unit:"units",  min:1000, reorder:1000 },
  { name:"PV Wire 10AWG",        sku:"PVW-10",   stock:1100, unit:"ft",     min:2000, reorder:2000 },
  { name:'Conduit 3/4" EMT',     sku:"EMT-34",   stock:650,  unit:"ft",     min:500,  reorder:500  },
  { name:"Junction Boxes IP65",  sku:"JB-IP65",  stock:38,   unit:"units",  min:10,   reorder:10   },
  { name:"Grounding Clips SS",   sku:"GC-SS",    stock:820,  unit:"units",  min:200,  reorder:200  },
];

function Materials() {
  const [items, setItems] = useLocalState("so_materials", DEFAULT_MATERIALS);
  const [receiving, setReceiving] = useState({ show:false, item:"", qty:"" });
  const getStatus = item => item.stock < item.min * 0.5 ? "critical" : item.stock < item.min ? "warn" : "ok";
  const sc = { ok:"var(--green)", warn:"var(--amber)", critical:"var(--red)" };
  const sp = { ok:"pill-green",   warn:"pill-amber",   critical:"pill-red"   };

  const receive = () => {
    if (!receiving.item || !receiving.qty) return;
    setItems(items.map(x => x.sku===receiving.item ? { ...x, stock: x.stock + parseInt(receiving.qty||0) } : x));
    setReceiving({ show:false, item:"", qty:"" });
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, height:"100%", overflowY:"auto" }}>
      <div className="kpi-grid">
        <KpiCard label="Items OK"       value="5"  sub="Fully stocked"     color="var(--green)" icon="📦" />
        <KpiCard label="Low Stock"      value="2"  sub="Order soon"        color="var(--amber)" icon="⚠️" />
        <KpiCard label="Critical"       value="1"  sub="Order immediately" color="var(--red)"   icon="🚨" />
        <KpiCard label="Deliveries Due" value="2"  sub="This week"         color="var(--cyan)"  icon="🚚" />
      </div>
      <div className="card fade-up">
        <div className="card-header">
          <SectionTitle sub="Real-time inventory levels">Inventory Tracker</SectionTitle>
          <button className="btn-primary" onClick={()=>setReceiving(r=>({...r,show:!r.show}))}>+ Receive Delivery</button>
        </div>

        {receiving.show && (
          <div style={{ padding:"16px 22px", background:"rgba(0,210,255,.05)", borderBottom:"1px solid var(--border)", display:"flex", gap:12, alignItems:"flex-end" }}>
            <div style={{ flex:2 }}>
              <div style={{ fontSize:11, color:"var(--text3)", marginBottom:6, fontWeight:600 }}>MATERIAL</div>
              <select value={receiving.item} onChange={e=>setReceiving(r=>({...r,item:e.target.value}))} style={{ width:"100%" }}>
                <option value="">Select item…</option>
                {items.map(x=><option key={x.sku} value={x.sku}>{x.name}</option>)}
              </select>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:"var(--text3)", marginBottom:6, fontWeight:600 }}>QTY RECEIVED</div>
              <input type="text" value={receiving.qty} onChange={e=>setReceiving(r=>({...r,qty:e.target.value}))} placeholder="e.g. 1200" />
            </div>
            <button className="btn-primary" onClick={receive}>Confirm Receipt</button>
            <button className="btn-ghost" onClick={()=>setReceiving({ show:false, item:"", qty:"" })}>Cancel</button>
          </div>
        )}

        <table>
          <thead><tr><th>Material</th><th>SKU</th><th>In Stock</th><th>Unit</th><th>Min Stock</th><th>Status</th><th>Reorder Qty</th></tr></thead>
          <tbody>
            {items.map((item,i)=>(
              <tr key={i}>
                <td style={{ fontWeight:600, fontSize:13.5 }}>{item.name}</td>
                <td><span className="mono" style={{ fontSize:12 }}>{item.sku}</span></td>
                <td><span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700, color:sc[getStatus(item)] }}>{item.stock.toLocaleString()}</span></td>
                <td><span className="mono" style={{ fontSize:11, color:"var(--text3)" }}>{item.unit}</span></td>
                <td><span className="mono" style={{ fontSize:12 }}>{item.min.toLocaleString()}</span></td>
                <td><span className={`pill ${sp[getStatus(item)]}`}>{getStatus(item).toUpperCase()}</span></td>
                <td>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span className="mono" style={{ color:"var(--cyan)", fontSize:13 }}>{item.reorder.toLocaleString()}</span>
                    {getStatus(item)!=="ok" && <button className="btn-ghost" style={{ fontSize:11, padding:"4px 10px" }}>Order Now</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   REPORTS
═══════════════════════════════════════════ */
function Reports() {
  const reports = [
    { title:"Daily Production Report",     desc:"Auto-generated from today's panel logs & crew time entries", icon:"📊", tag:"Ready",  tagC:"pill-green",  date:"Today 17:30" },
    { title:"Zone A Completion Package",   desc:"As-builts, inspection photos, QC sign-off documentation",   icon:"✅", tag:"Ready",  tagC:"pill-green",  date:"Mar 6" },
    { title:"Weekly Progress Summary",     desc:"Week of Mar 3–7: 1,326 panels, 86% avg efficiency",         icon:"📈", tag:"Draft",  tagC:"pill-amber",  date:"Today 18:00" },
    { title:"Material Usage Report",       desc:"Consumption vs forecast, variance analysis",                 icon:"📦", tag:"Ready",  tagC:"pill-green",  date:"Today" },
    { title:"Safety & Incident Log",       desc:"Zero incidents · 1 near-miss · PPE compliance: 97%",        icon:"🦺", tag:"0 Issues",tagC:"pill-green",  date:"Daily auto" },
    { title:"String Test Results",         desc:"Zones A & B complete · Strings 1–12 results attached",       icon:"🔌", tag:"Pending",tagC:"pill-cyan",   date:"ETA Today" },
    { title:"Torque Issue Report",         desc:"Zone B Row 28 non-conformance · corrective action pending",  icon:"⚠️", tag:"Urgent", tagC:"pill-red",    date:"Today 09:47" },
    { title:"Monthly Budget Tracker",      desc:"Labor, materials & equipment vs PO budget",                  icon:"💰", tag:"On Track",tagC:"pill-green",  date:"Mar 2026" },
    { title:"Subcontractor Summary",       desc:"Hours logged, tasks completed per sub-crew",                 icon:"🤝", tag:"Ready",  tagC:"pill-green",  date:"This Week" },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, height:"100%", overflowY:"auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <SectionTitle sub="All project documentation & auto-generated reports">Reports & Documentation</SectionTitle>
        <button className="btn-primary">📊 Generate Custom Report</button>
      </div>
      <div className="reports-grid">
        {reports.map((r,i)=>(
          <div key={i} className="card fade-up" style={{ padding:22, cursor:"pointer", transition:"all .2s" }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(0,210,255,.35)"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.transform="translateY(0)"; }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div style={{ fontSize:32 }}>{r.icon}</div>
              <span className={`pill ${r.tagC}`} style={{ fontSize:10 }}>{r.tag}</span>
            </div>
            <div style={{ fontWeight:700, fontSize:15, marginBottom:6, lineHeight:1.3 }}>{r.title}</div>
            <div style={{ fontSize:12, color:"var(--text3)", lineHeight:1.5, marginBottom:14 }}>{r.desc}</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span className="mono" style={{ fontSize:10, color:"var(--text3)" }}>{r.date}</span>
              <div style={{ display:"flex", gap:6 }}>
                <button className="btn-ghost" style={{ fontSize:11, padding:"4px 10px" }}>Preview</button>
                <button className="btn-primary" style={{ fontSize:11, padding:"5px 12px" }}>↓ Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SAFETY
═══════════════════════════════════════════ */
const DEFAULT_INCIDENTS = [];

function Safety() {
  const [incidents, setIncidents] = useLocalState("so_incidents", DEFAULT_INCIDENTS);
  const [showLog, setShowLog] = useState(false);
  const [incident, setIncident] = useState({ type:"", desc:"", worker:"", zone:"" });
  const submitIncident = () => {
    if (!incident.type) return;
    const now = new Date();
    setIncidents([{ ...incident, id:Date.now(), time:`${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")} · TODAY` }, ...incidents]);
    setIncident({ type:"", desc:"", worker:"", zone:"" });
    setShowLog(false);
  };
  const crew = [
    { name:"Carlos Mendez",   osha:"OSHA-30", exp:"2026-01", ppe:true,  tailgate:true,  status:"ok"       },
    { name:"DeShawn Harris",  osha:"NABCEP",  exp:"2025-11", ppe:true,  tailgate:true,  status:"warn"     },
    { name:"Maria Santos",    osha:"OSHA-10", exp:"2027-03", ppe:true,  tailgate:true,  status:"ok"       },
    { name:"Tyler Webb",      osha:"OSHA-30", exp:"2026-08", ppe:true,  tailgate:true,  status:"ok"       },
    { name:"Ahmed Al-Rashid", osha:"OSHA-10", exp:"2025-09", ppe:false, tailgate:true,  status:"critical" },
    { name:"Rosa Jimenez",    osha:"OSHA-10", exp:"2026-05", ppe:true,  tailgate:true,  status:"ok"       },
    { name:"James Patel",     osha:"OSHA-10", exp:"2026-11", ppe:true,  tailgate:true,  status:"ok"       },
    { name:"Keisha Brown",    osha:"NABCEP",  exp:"2027-02", ppe:true,  tailgate:false, status:"warn"     },
  ];
  const sp = { ok:"pill-green", warn:"pill-amber", critical:"pill-red" };
  const sl = { ok:"✓ COMPLIANT", warn:"⚠ REVIEW", critical:"✗ ACTION REQ" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, height:"100%", overflowY:"auto" }}>
      <div className="kpi-grid">
        <KpiCard label="Incidents This Month" value="0"  sub="Zero harm target" trend="✓ On target" trendUp color="var(--green)" icon="🦺" />
        <KpiCard label="Near Misses"          value="1"  sub="Reported & logged" color="var(--amber)" icon="⚠️" />
        <KpiCard label="PPE Compliance"       value="97%" sub="1 non-compliant" color="var(--cyan)" icon="⛑️" />
        <KpiCard label="Days Without Incident" value="43" sub="Site record: 87" trend="↑ Active streak" trendUp color="var(--sun)" icon="🏆" />
      </div>

      {/* Active hazards */}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        <AlertBanner type="critical" icon="⛑️" text="Ahmed Al-Rashid: PPE non-compliance flagged. Hardhat missing Zone B Row 28. Foreman notified." time="09:47 · ACTION REQUIRED" />
        <AlertBanner type="warn"    icon="📋" text="Keisha Brown: Morning tailgate sign-in not recorded. Please confirm attendance." time="07:00 · PENDING" />
        <AlertBanner type="info"    icon="🌬️" text="Wind speed exceeding 20mph in Zone D forecast 3–5 PM. Suspend overhead lifts." time="07:15 · WEATHER ALERT" />
      </div>

      <div className="card fade-up">
        <div className="card-header">
          <SectionTitle sub="Daily compliance tracking">Safety Compliance</SectionTitle>
          <button className="btn-danger" onClick={()=>setShowLog(l=>!l)}>🚨 Log Incident</button>
        </div>

        {showLog && (
          <div style={{ padding:"18px 22px", background:"rgba(255,71,87,.05)", borderBottom:"1px solid rgba(255,71,87,.2)" }}>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700, color:"var(--red)", marginBottom:14 }}>Log New Incident / Near-Miss</div>
            <div className="incident-grid">
              <div>
                <div style={{ fontSize:11, color:"var(--text3)", marginBottom:5 }}>TYPE</div>
                <select value={incident.type} onChange={e=>setIncident(x=>({...x,type:e.target.value}))}>
                  <option value="">Select…</option>
                  <option>Near Miss</option><option>First Aid</option><option>PPE Violation</option><option>Property Damage</option>
                </select>
              </div>
              <div>
                <div style={{ fontSize:11, color:"var(--text3)", marginBottom:5 }}>WORKER INVOLVED</div>
                <input type="text" value={incident.worker} onChange={e=>setIncident(x=>({...x,worker:e.target.value}))} placeholder="Full name" />
              </div>
              <div>
                <div style={{ fontSize:11, color:"var(--text3)", marginBottom:5 }}>ZONE</div>
                <input type="text" value={incident.zone} onChange={e=>setIncident(x=>({...x,zone:e.target.value}))} placeholder="e.g. Zone B Row 28" />
              </div>
            </div>
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:11, color:"var(--text3)", marginBottom:5 }}>DESCRIPTION</div>
              <textarea value={incident.desc} onChange={e=>setIncident(x=>({...x,desc:e.target.value}))} placeholder="Describe what happened…" rows={3} style={{ resize:"vertical" }} />
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn-danger" onClick={submitIncident}>✓ Submit Incident Report</button>
              <button className="btn-ghost" onClick={()=>setShowLog(false)}>Cancel</button>
            </div>
          </div>
        )}

        <table>
          <thead><tr><th>Worker</th><th>Certification</th><th>Cert Expiry</th><th>PPE Check</th><th>Tailgate Sign-In</th><th>Status</th></tr></thead>
          <tbody>
            {crew.map((w,i)=>(
              <tr key={i}>
                <td style={{ fontWeight:600, fontSize:13.5 }}>{w.name}</td>
                <td><span className="pill pill-cyan" style={{ fontSize:10 }}>{w.osha}</span></td>
                <td><span className="mono" style={{ fontSize:11, color:w.exp<"2026-03"?"var(--amber)":"var(--text3)" }}>{w.exp}</span></td>
                <td><span style={{ color:w.ppe?"var(--green)":"var(--red)", fontSize:18, fontWeight:700 }}>{w.ppe?"✓":"✗"}</span></td>
                <td><span style={{ color:w.tailgate?"var(--green)":"var(--amber)", fontSize:18, fontWeight:700 }}>{w.tailgate?"✓":"—"}</span></td>
                <td><span className={`pill ${sp[w.status]}`}>{sl[w.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {incidents.length > 0 && (
        <div className="card fade-up">
          <div className="card-header">
            <SectionTitle sub="All logged incidents & near-misses">Incident Log</SectionTitle>
            <button className="btn-ghost" onClick={()=>setIncidents([])}>Clear All</button>
          </div>
          {incidents.map((inc,i)=>(
            <div key={inc.id} style={{ padding:"14px 18px", borderBottom:i<incidents.length-1?"1px solid rgba(255,255,255,.04)":"none", display:"flex", gap:12, alignItems:"flex-start" }}>
              <span style={{ fontSize:20, flexShrink:0 }}>🚨</span>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4, flexWrap:"wrap" }}>
                  <span className="pill pill-red" style={{ fontSize:10 }}>{inc.type}</span>
                  {inc.worker && <span style={{ fontSize:12, color:"var(--text2)" }}>{inc.worker}</span>}
                  {inc.zone && <span className="mono" style={{ fontSize:11, color:"var(--text3)" }}>{inc.zone}</span>}
                </div>
                {inc.desc && <div style={{ fontSize:12, color:"var(--text3)", lineHeight:1.4 }}>{inc.desc}</div>}
                <div className="mono" style={{ fontSize:10, color:"var(--red)", marginTop:4 }}>{inc.time}</div>
              </div>
              <button onClick={()=>setIncidents(incidents.filter(x=>x.id!==inc.id))} style={{ background:"none", border:"none", color:"var(--text3)", fontSize:16, padding:"4px", cursor:"pointer" }}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   STRING TESTING
═══════════════════════════════════════════ */
const DEFAULT_STRINGS = [
  { id:"ZB-S01", zone:"Zone B", eff:99.1, voc:401.2, isc:10.22, status:"pass", tech:"DeShawn Harris", date:"Today 08:12" },
  { id:"ZB-S02", zone:"Zone B", eff:98.7, voc:399.8, isc:10.18, status:"pass", tech:"DeShawn Harris", date:"Today 08:45" },
  { id:"ZB-S03", zone:"Zone B", eff:97.4, voc:397.1, isc:10.05, status:"pass", tech:"DeShawn Harris", date:"Today 09:10" },
  { id:"ZB-S04", zone:"Zone B", eff:94.2, voc:388.3, isc:9.81,  status:"warn", tech:"DeShawn Harris", date:"Today 09:40" },
  { id:"ZB-S05", zone:"Zone B", eff:98.9, voc:400.5, isc:10.20, status:"pass", tech:"DeShawn Harris", date:"Today 10:05" },
  { id:"ZA-S01", zone:"Zone A", eff:99.3, voc:402.1, isc:10.28, status:"pass", tech:"Keisha Brown",   date:"Mar 6 14:20" },
  { id:"ZA-S02", zone:"Zone A", eff:98.1, voc:398.2, isc:10.12, status:"pass", tech:"Keisha Brown",   date:"Mar 6 15:00" },
  { id:"ZA-S03", zone:"Zone A", eff:82.3, voc:371.4, isc:9.41,  status:"fail", tech:"Keisha Brown",   date:"Mar 6 15:40" },
];

function StringTesting() {
  const [strings, setStrings] = useLocalState("so_strings", DEFAULT_STRINGS);
  const [showForm, setShowForm] = useState(false);
  const [newTest, setNewTest] = useState({ id:"", zone:"Zone B", eff:"", voc:"", isc:"", tech:"" });
  const logTest = () => {
    if (!newTest.id || !newTest.eff) return;
    const eff = parseFloat(newTest.eff);
    const status = eff >= 97 ? "pass" : eff >= 90 ? "warn" : "fail";
    const now = new Date();
    const timeStr = `Today ${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;
    setStrings([{ ...newTest, eff, voc:parseFloat(newTest.voc)||0, isc:parseFloat(newTest.isc)||0, status, date:timeStr }, ...strings]);
    setNewTest({ id:"", zone:"Zone B", eff:"", voc:"", isc:"", tech:"" });
    setShowForm(false);
  };
  const passCount = strings.filter(s=>s.status==="pass").length;
  const avgEff = (strings.reduce((a,s)=>a+s.eff,0)/strings.length).toFixed(1);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, height:"100%", overflowY:"auto" }}>
      <div className="kpi-grid">
        <KpiCard label="Strings Tested" value={strings.length} sub={`of 48 total`} color="var(--cyan)" icon="🔌" />
        <KpiCard label="Pass Rate" value={`${Math.round(passCount/strings.length*100)}%`} sub={`${passCount} pass · ${strings.length-passCount} fail`} color="var(--green)" icon="✅" />
        <KpiCard label="Avg Efficiency" value={`${avgEff}%`} sub="Target: ≥95%" color="var(--sun)" icon="⚡" />
        <KpiCard label="Flagged" value={strings.filter(s=>s.status!=="pass").length} sub="warn + fail" color="var(--amber)" icon="⚠️" />
      </div>
      <div className="card fade-up">
        <div className="card-header">
          <SectionTitle sub="All string test results">String Test Log</SectionTitle>
          <button className="btn-primary" onClick={()=>setShowForm(f=>!f)}>+ Log New Test</button>
        </div>
        {showForm && (
          <div style={{ padding:"16px 16px", background:"rgba(0,210,255,.05)", borderBottom:"1px solid var(--border)", display:"flex", flexDirection:"column", gap:10 }}>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:15, fontWeight:700, color:"var(--cyan)" }}>Log New String Test</div>
            <div className="incident-grid">
              <div><div style={{ fontSize:11, color:"var(--text3)", marginBottom:4 }}>STRING ID</div><input value={newTest.id} onChange={e=>setNewTest(x=>({...x,id:e.target.value}))} placeholder="e.g. ZB-S06" /></div>
              <div><div style={{ fontSize:11, color:"var(--text3)", marginBottom:4 }}>ZONE</div>
                <select value={newTest.zone} onChange={e=>setNewTest(x=>({...x,zone:e.target.value}))}>
                  {["Zone A","Zone B","Zone C","Zone D"].map(z=><option key={z}>{z}</option>)}
                </select>
              </div>
              <div><div style={{ fontSize:11, color:"var(--text3)", marginBottom:4 }}>EFFICIENCY %</div><input value={newTest.eff} onChange={e=>setNewTest(x=>({...x,eff:e.target.value}))} placeholder="e.g. 98.5" /></div>
              <div><div style={{ fontSize:11, color:"var(--text3)", marginBottom:4 }}>TECHNICIAN</div><input value={newTest.tech} onChange={e=>setNewTest(x=>({...x,tech:e.target.value}))} placeholder="Name" /></div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn-primary" onClick={logTest}>✓ Submit Test</button>
              <button className="btn-ghost" onClick={()=>setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}
        <table>
          <thead><tr><th>String ID</th><th>Zone</th><th>Efficiency</th><th>Voc (V)</th><th>Isc (A)</th><th>Result</th><th>Technician</th><th>Tested</th></tr></thead>
          <tbody>
            {strings.map((s,i)=>(
              <tr key={i}>
                <td><span className="mono" style={{ fontSize:13, fontWeight:700, color:"var(--cyan)" }}>{s.id}</span></td>
                <td><span className="mono" style={{ fontSize:12 }}>{s.zone}</span></td>
                <td>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:18, fontWeight:700, color:s.eff>=97?"var(--green)":s.eff>=90?"var(--amber)":"var(--red)" }}>{s.eff}%</span>
                    <div style={{ width:60 }}><div className="pbar-wrap"><div className="pbar-fill" style={{ width:`${s.eff}%`, background:s.eff>=97?"var(--green)":s.eff>=90?"var(--amber)":"var(--red)" }}/></div></div>
                  </div>
                </td>
                <td><span className="mono">{s.voc}</span></td>
                <td><span className="mono">{s.isc}</span></td>
                <td><span className={`pill ${s.status==="pass"?"pill-green":s.status==="warn"?"pill-amber":"pill-red"}`}>{s.status.toUpperCase()}</span></td>
                <td style={{ fontSize:12 }}>{s.tech}</td>
                <td><span className="mono" style={{ fontSize:11, color:"var(--text3)" }}>{s.date}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCHEDULE
═══════════════════════════════════════════ */
function Schedule() {
  const weeks = [
    { week:"Feb 24–28", planned:1200, actual:1247, status:"complete" },
    { week:"Mar 3–7",   planned:1400, actual:1326, status:"active" },
    { week:"Mar 10–14", planned:1400, actual:null,  status:"upcoming" },
    { week:"Mar 17–21", planned:1400, actual:null,  status:"upcoming" },
    { week:"Mar 24–28", planned:1400, actual:null,  status:"upcoming" },
    { week:"Mar 31+",   planned:800,  actual:null,  status:"upcoming" },
  ];
  const milestones = [
    { label:"Zone A Complete",         date:"Mar 4",  done:true  },
    { label:"Zone B 80% Complete",     date:"Mar 7",  done:false, today:true },
    { label:"String Testing Zones A-B",date:"Mar 10", done:false },
    { label:"Zone C Complete",         date:"Mar 14", done:false },
    { label:"Zone D 50% Complete",     date:"Mar 19", done:false },
    { label:"All Panels Installed",    date:"Mar 28", done:false },
    { label:"Final Inspection",        date:"Apr 2",  done:false },
    { label:"Interconnect / PTO",      date:"Apr 7",  done:false },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, height:"100%", overflowY:"auto" }}>
      <div className="kpi-grid">
        <KpiCard label="Days Ahead"    value="3"    sub="Ahead of schedule" trend="Excellent pace" trendUp color="var(--green)" icon="📅" />
        <KpiCard label="% Complete"    value="57.4%" sub="As of today"      color="var(--cyan)"  icon="📈" />
        <KpiCard label="Est. Complete" value="Mar 25" sub="3 days early"    trend="Original: Mar 28" color="var(--sun)" icon="🏁" />
        <KpiCard label="Weeks Left"    value="3"    sub="to panel complete" color="var(--amber)" icon="⏳" />
      </div>
      <div className="schedule-grid">
        {/* Weekly table */}
        <div className="card fade-up">
          <div className="card-header"><SectionTitle sub="Planned vs actual production">Weekly Schedule</SectionTitle></div>
          <table>
            <thead><tr><th>Week</th><th>Planned</th><th>Actual</th><th>Variance</th><th>Status</th></tr></thead>
            <tbody>
              {weeks.map((w,i)=>{
                const variance = w.actual != null ? w.actual - w.planned : null;
                return (
                  <tr key={i}>
                    <td style={{ fontWeight:600 }}>{w.week}</td>
                    <td><span className="mono">{w.planned.toLocaleString()}</span></td>
                    <td><span className="mono" style={{ color:w.actual?"var(--text)":"var(--text3)" }}>{w.actual?.toLocaleString() ?? "—"}</span></td>
                    <td>{variance!=null && <span style={{ color:variance>=0?"var(--green)":"var(--red)", fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700 }}>{variance>=0?"+":""}{variance}</span>}</td>
                    <td><span className={`pill ${w.status==="complete"?"pill-green":w.status==="active"?"pill-cyan":"pill-purple"}`}>{w.status.toUpperCase()}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Milestones */}
        <div className="card fade-up">
          <div className="card-header"><SectionTitle>Milestones</SectionTitle></div>
          <div style={{ padding:"8px 0" }}>
            {milestones.map((m,i)=>(
              <div key={i} style={{ display:"flex", gap:14, padding:"12px 22px", borderBottom:i<milestones.length-1?"1px solid rgba(255,255,255,.04)":"none" }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:3 }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:m.done?"var(--green)":m.today?"var(--cyan)":"rgba(255,255,255,.08)", border:`2px solid ${m.done?"var(--green)":m.today?"var(--cyan)":"var(--border)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:m.done?"#000":"transparent", fontWeight:700, flexShrink:0 }}>{m.done?"✓":""}</div>
                  {i<milestones.length-1 && <div style={{ width:2, height:24, background:"rgba(255,255,255,.07)", marginTop:4 }} />}
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:m.done?"var(--text3)":m.today?"var(--cyan)":"var(--text)", textDecoration:m.done?"line-through":"none" }}>{m.label}</div>
                  <div className="mono" style={{ fontSize:10, color:m.today?"var(--cyan)":"var(--text3)", marginTop:3 }}>{m.date}{m.today?" · TODAY":""}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   APP SHELL
═══════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════
   AUTH SCREEN
═══════════════════════════════════════════ */
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError(""); setSuccess("");
    if (!email || !password) { setError("Please enter your email and password."); return; }
    if (mode === "signup" && password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
        if (error) throw error;
        setSuccess("✅ Check your email to confirm your account, then come back to log in!");
        setMode("login");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuth(data.user);
      }
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#070D1A", display:"flex", alignItems:"center", justifyContent:"center", padding:20, fontFamily:"'DM Sans',sans-serif" }}>
      <style>{G}</style>
      <style>{`
        .auth-input {
          font-size: 16px !important;
          background: #0a1628 !important;
          border: 1px solid rgba(0,210,255,0.25) !important;
          color: #e2eef9 !important;
          border-radius: 10px !important;
          padding: 12px 16px !important;
          width: 100% !important;
          outline: none !important;
          box-shadow: 0 0 0 999px #0a1628 inset !important;
          -webkit-box-shadow: 0 0 0 999px #0a1628 inset !important;
          -webkit-text-fill-color: #e2eef9 !important;
        }
        .auth-input::placeholder { color: #4E6E8A !important; }
        .auth-input:focus { border-color: #00D2FF !important; }
      `}</style>
      <div style={{ width:"100%", maxWidth:420 }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:56, height:56, background:"linear-gradient(135deg,var(--sun),#c97a00)", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 16px", animation:"glow 3s ease-in-out infinite" }}>☀️</div>
          <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:32, letterSpacing:.5 }}>
            <span style={{ color:"var(--sun)" }}>Solar</span><span style={{ color:"var(--cyan)" }}>Ops</span><span style={{ color:"var(--text2)" }}>.AI</span>
          </div>
          <div className="mono" style={{ fontSize:10, color:"var(--text3)", letterSpacing:2, marginTop:4 }}>FIELD COMMAND PLATFORM</div>
        </div>

        {/* Card */}
        <div className="card" style={{ padding:32 }}>
          {/* Tabs */}
          <div style={{ display:"flex", gap:0, marginBottom:28, background:"rgba(0,0,0,.3)", borderRadius:10, padding:4 }}>
            {[["login","Log In"],["signup","Sign Up"]].map(([m,l])=>(
              <button key={m} onClick={()=>{ setMode(m); setError(""); setSuccess(""); }} style={{ flex:1, padding:"9px 0", borderRadius:8, border:"none", background:mode===m?"rgba(0,210,255,.12)":"transparent", color:mode===m?"var(--cyan)":"var(--text3)", fontWeight:600, fontSize:14, transition:"all .2s", cursor:"pointer" }}>{l}</button>
            ))}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {mode === "signup" && (
              <div>
                <div style={{ fontSize:11, color:"var(--text3)", marginBottom:6, fontWeight:600, letterSpacing:.5 }}>FULL NAME</div>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" className="auth-input" />
              </div>
            )}
            <div>
              <div style={{ fontSize:11, color:"var(--text3)", marginBottom:6, fontWeight:600, letterSpacing:.5 }}>EMAIL</div>
              <input type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="you@company.com" className="auth-input" />
            </div>
            <div>
              <div style={{ fontSize:11, color:"var(--text3)", marginBottom:6, fontWeight:600, letterSpacing:.5 }}>PASSWORD</div>
              <input type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder={mode==="signup"?"Min. 6 characters":"Your password"} className="auth-input" style={{ WebkitTextSecurity:"disc" }} />
            </div>

            {error && <div style={{ background:"rgba(255,71,87,.1)", border:"1px solid rgba(255,71,87,.3)", borderRadius:9, padding:"10px 14px", fontSize:13, color:"var(--red)", lineHeight:1.5 }}>{error}</div>}
            {success && <div style={{ background:"rgba(0,230,118,.1)", border:"1px solid rgba(0,230,118,.3)", borderRadius:9, padding:"10px 14px", fontSize:13, color:"var(--green)", lineHeight:1.5 }}>{success}</div>}

            <button onClick={handleSubmit} disabled={loading} style={{ background:"linear-gradient(135deg,var(--sun),#d47d00)", color:"#000", fontWeight:700, fontSize:15, padding:"13px 0", borderRadius:10, border:"none", cursor:loading?"not-allowed":"pointer", marginTop:4, fontFamily:"'Rajdhani',sans-serif", letterSpacing:.5, opacity:loading?0.7:1, transition:"all .2s" }}>
              {loading ? "Please wait…" : mode==="login" ? "Log In →" : "Create Account →"}
            </button>
          </div>
        </div>

        <div style={{ textAlign:"center", marginTop:20, fontSize:12, color:"var(--text3)" }}>
          {mode==="login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={()=>{ setMode(mode==="login"?"signup":"login"); setError(""); setSuccess(""); }} style={{ background:"none", border:"none", color:"var(--cyan)", cursor:"pointer", fontSize:12, fontWeight:600 }}>
            {mode==="login" ? "Sign up free" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Landing({ onEnter }) {
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
          <button className="btn-outline" style={{ padding: "8px 20px", fontSize: 14 }} onClick={onEnter}>Log in</button>
          <button className="nav-cta" onClick={onEnter}>Get Started →</button>
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
                <button className={p.featured ? "btn-primary" : "btn-outline"} style={{ width: "100%", marginTop: 24, padding: "13px", borderRadius: 10 }} onClick={onEnter}>
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

/* ═══════════════════════════════════════════
   APP SHELL — LANDING + DASHBOARD
═══════════════════════════════════════════ */
const NAV = [
  { id:"dashboard",   label:"Dashboard",     icon:"⚡", badge:null },
  { id:"sitemap",     label:"Site Map",       icon:"🗺️", badge:"3" },
  { id:"crew",        label:"Crew",           icon:"👷", badge:null },
  { id:"materials",   label:"Materials",      icon:"📦", badge:"!", badgeC:"amber" },
  { id:"strings",     label:"String Testing", icon:"🔌", badge:null },
  { id:"schedule",    label:"Schedule",       icon:"📅", badge:null },
  { id:"reports",     label:"Reports",        icon:"📊", badge:null },
  { id:"safety",      label:"Safety",         icon:"🦺", badge:"2", badgeC:"amber" },
];

export default function App() {
  const [screen, setScreen] = useState("landing"); // "landing" | "auth" | "app"
  const [tab, setTab] = useState("dashboard");
  const [time, setTime] = useState(new Date());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = setInterval(()=>setTime(new Date()), 1000);
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) { setUser(session.user); setScreen("app"); }
    });
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) { setUser(session.user); setScreen("app"); }
      else { setUser(null); setScreen("landing"); }
    });
    return () => { clearInterval(t); subscription.unsubscribe(); };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setScreen("landing");
  };

  if (screen === "landing") return <Landing onEnter={() => setScreen("auth")} />;
  if (screen === "auth") return <AuthScreen onAuth={(u) => { setUser(u); setScreen("app"); }} />;

  // Show the app dashboard
  const views = { dashboard:<Dashboard user={user}/>, sitemap:<SiteMap/>, crew:<Crew/>, materials:<Materials/>, strings:<StringTesting/>, schedule:<Schedule/>, reports:<Reports/>, safety:<Safety/> };
  const hh = time.getHours().toString().padStart(2,"0");
  const mm = time.getMinutes().toString().padStart(2,"0");
  const ss = time.getSeconds().toString().padStart(2,"0");
  const currentNav = NAV.find(n=>n.id===tab);

  return (
    <>
      <style>{G}</style>
      <div style={{ display:"flex", flexDirection:"column", height:"100vh", background:"var(--bg)" }}>
        <div className="desktop-topbar" style={{ height:56, background:"rgba(7,13,26,.97)", borderBottom:"1px solid var(--border)", alignItems:"center", justifyContent:"space-between", padding:"0 24px", flexShrink:0, backdropFilter:"blur(20px)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, background:"linear-gradient(135deg,var(--sun),#c97a00)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, animation:"glow 3s ease-in-out infinite", flexShrink:0 }}>☀️</div>
            <div>
              <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:19, letterSpacing:.5, lineHeight:1 }}>
                <span style={{ color:"var(--sun)" }}>Solar</span><span style={{ color:"var(--cyan)" }}>Ops</span><span style={{ color:"var(--text2)" }}>.AI</span>
              </div>
              <div className="mono" style={{ fontSize:9, color:"var(--text3)", letterSpacing:2 }}>FIELD COMMAND PLATFORM</div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:24 }}>
            <div style={{ textAlign:"center" }}>
              <div className="mono" style={{ fontSize:9, color:"var(--text3)", letterSpacing:2, marginBottom:2 }}>PROJECT</div>
              <div style={{ fontSize:13, fontWeight:600 }}>Sunrise Solar Farm — Phase 2</div>
            </div>
            <div style={{ width:1, height:30, background:"var(--border)" }} />
            <div style={{ textAlign:"center" }}>
              <div className="mono" style={{ fontSize:9, color:"var(--text3)", letterSpacing:2, marginBottom:2 }}>WEATHER</div>
              <div style={{ fontSize:13, color:"var(--sun2)" }}>☀️ 84°F · Wind 7mph · UV 9</div>
            </div>
            <div style={{ width:1, height:30, background:"var(--border)" }} />
            <div style={{ textAlign:"center" }}>
              <div className="mono" style={{ fontSize:9, color:"var(--text3)", letterSpacing:2, marginBottom:2 }}>TIME</div>
              <div className="mono" style={{ fontSize:14, color:"var(--cyan)", fontWeight:700 }}>{hh}:{mm}:{ss}</div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--green)", animation:"blink 2s infinite" }} />
              <span className="mono" style={{ fontSize:10, color:"var(--green)", letterSpacing:1 }}>LIVE</span>
            </div>
            <button onClick={handleSignOut} style={{ background:"rgba(255,71,87,.08)", border:"1px solid rgba(255,71,87,.2)", color:"var(--red)", fontSize:11, borderRadius:8, padding:"5px 12px", cursor:"pointer" }}>Sign Out</button>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:13, fontWeight:600 }}>{user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"}</div>
                <div style={{ fontSize:10, color:"var(--text3)" }}>{user?.email}</div>
              </div>
              <div style={{ width:36, height:36, background:"linear-gradient(135deg,var(--cyan),#0050aa)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:14, color:"#fff" }}>{(user?.user_metadata?.full_name || user?.email || "U")[0].toUpperCase()}</div>
            </div>
          </div>
        </div>

        <div className="mobile-topbar">
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:30, height:30, background:"linear-gradient(135deg,var(--sun),#c97a00)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>☀️</div>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:18 }}>
              <span style={{ color:"var(--sun)" }}>Solar</span><span style={{ color:"var(--cyan)" }}>Ops</span><span style={{ color:"var(--text2)" }}>.AI</span>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ fontSize:12, color:"var(--sun2)" }}>☀️ 84°F</div>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--green)", animation:"blink 2s infinite" }} />
              <span className="mono" style={{ fontSize:9, color:"var(--green)", letterSpacing:1 }}>LIVE</span>
            </div>
            <div style={{ width:30, height:30, background:"linear-gradient(135deg,var(--cyan),#0050aa)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:12, color:"#fff" }}>JM</div>
          </div>
        </div>

        <div className="desktop-layout" style={{ flex:1, overflow:"hidden" }}>
          <div className="desktop-sidebar" style={{ width:210, background:"var(--bg2)", borderRight:"1px solid var(--border)", flexDirection:"column", padding:"14px 10px", flexShrink:0, overflowY:"auto" }}>
            <div className="section-label" style={{ paddingTop:6 }}>Navigation</div>
            {NAV.map(n=>(
              <button key={n.id} className={`nav-link ${tab===n.id?"active":""}`} onClick={()=>setTab(n.id)}>
                <span className="icon">{n.icon}</span>
                {n.label}
                {n.badge && <span className={`badge ${n.badgeC||""}`}>{n.badge}</span>}
              </button>
            ))}
            <div style={{ marginTop:"auto", paddingTop:16, display:"flex", flexDirection:"column", gap:6 }}>
              <div className="section-label" style={{ paddingTop:0 }}>Site Status</div>
              <div style={{ padding:"10px 14px", background:"rgba(0,230,118,.06)", border:"1px solid rgba(0,230,118,.15)", borderRadius:10 }}>
                <div style={{ fontSize:11, color:"var(--green)", fontWeight:600, marginBottom:4 }}>✓ 43 Days Incident-Free</div>
                <div style={{ fontSize:11, color:"var(--text3)" }}>57.4% complete · 3d ahead</div>
              </div>
              <button className="nav-link" style={{ color:"var(--red)", borderColor:"rgba(255,71,87,.2)" }}>
                <span className="icon">🚨</span>Emergency SOS
              </button>
            </div>
          </div>

          <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
            <div className="desktop-page-header" style={{ alignItems:"center", justifyContent:"space-between", padding:"16px 24px 0", flexShrink:0 }}>
              <div>
                <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:26, fontWeight:700, lineHeight:1 }}>
                  {currentNav?.icon} {currentNav?.label}
                </div>
                <div className="mono" style={{ fontSize:10, color:"var(--text3)", marginTop:4, letterSpacing:2 }}>
                  SOLAROPS.AI · {new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).toUpperCase()}
                </div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button className="btn-ghost">🔔 Alerts (4)</button>
              </div>
            </div>
            <div style={{ flex:1, padding:24, paddingTop:20, overflow:"hidden" }} className="desktop-content">
              {views[tab]}
            </div>
          </div>
        </div>

        <div className="mobile-content" style={{ padding:"16px 16px 80px", overflowY:"auto", flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700 }}>
              {currentNav?.icon} {currentNav?.label}
            </div>
            <button style={{ background:"rgba(255,71,87,.12)", border:"1px solid rgba(255,71,87,.25)", color:"var(--red)", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700, cursor:"pointer" }}>🚨 SOS</button>
          </div>
          {views[tab]}
        </div>

        <nav className="bottom-nav">
          <div className="bottom-nav-inner">
            {NAV.map(n=>(
              <button key={n.id} className={`bottom-nav-btn ${tab===n.id?"active":""}`} onClick={()=>setTab(n.id)}>
                {n.badge && <span className={`bnav-badge ${n.badgeC||""}`}>{n.badge}</span>}
                <span className="bnav-icon">{n.icon}</span>
                <span>{n.label}</span>
              </button>
            ))}
            <button className="bottom-nav-btn" style={{ color:"var(--red)" }}>
              <span className="bnav-icon">🚨</span>
              <span>SOS</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
