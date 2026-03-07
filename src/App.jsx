import { useState, useRef, useEffect } from "react";

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

input[type=text], input[type=search], textarea, select {
  background: rgba(0,0,0,.35); border: 1px solid var(--border2);
  color: var(--text); border-radius: 9px; outline: none;
  padding: 10px 14px; font-size: 13px; width: 100%;
  transition: border-color .2s;
}
input:focus, textarea:focus, select:focus { border-color: var(--cyan); }
input::placeholder { color: var(--text3); }

.tag {
  display: inline-block; padding: 3px 9px; border-radius: 6px;
  font-size: 11px; font-weight: 600;
  font-family: 'Share Tech Mono', monospace;
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
function Dashboard() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "critical", icon: "⚠️", text: "Torque spec issue – Zone B Row 28. Ahmed stopped work pending foreman review.", time: "09:47 · CRITICAL" },
    { id: 2, type: "warn",     icon: "📦", text: "MC4 connector stock at 18%. Reorder 1,200 units before Monday.", time: "08:30 · MATERIALS" },
    { id: 3, type: "info",     icon: "🌬️", text: "Wind advisory 3–5 PM. Pause crane lifts in Zone D.", time: "07:15 · WEATHER" },
    { id: 4, type: "ok",       icon: "✅", text: "Zone A final inspection passed. Ready for interconnect sign-off.", time: "07:00 · COMPLETE" },
  ]);
  const [tasks, setTasks] = useState([
    { id:1, done:true,  active:false, urgent:false, text:"Morning safety tailgate – all crew", time:"07:00", p:"high" },
    { id:2, done:true,  active:false, urgent:false, text:"Zone A punch list – final torque & QC sign-off", time:"09:30", p:"high" },
    { id:3, done:false, active:true,  urgent:false, text:"Zone B string testing – strings 1–12", time:"NOW", p:"high" },
    { id:4, done:false, active:true,  urgent:false, text:"Zone C panel install – target 200 panels by EOD", time:"NOW", p:"med" },
    { id:5, done:false, active:false, urgent:true,  text:"Resolve torque issue Zone B Row 28", time:"URGENT", p:"high" },
    { id:6, done:false, active:false, urgent:false, text:"Reorder confirmation – MC4 connectors (1,200 units)", time:"14:00", p:"med" },
    { id:7, done:false, active:false, urgent:false, text:"EOD photo documentation – all active zones", time:"17:00", p:"low" },
    { id:8, done:false, active:false, urgent:false, text:"Submit daily production report to PM", time:"17:30", p:"low" },
  ]);
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

  const toggleTask = id => setTasks(t => t.map(x => x.id === id ? { ...x, done: !x.done, active: false } : x));
  const addTask = () => { if (!newTask.trim()) return; setTasks(t => [...t, { id: Date.now(), done:false, active:false, urgent:false, text: newTask, time:"—", p:"med" }]); setNewTask(""); };

  const pDot = { high:"var(--red)", med:"var(--amber)", low:"var(--green)" };

  const zones = [
    { label:"Zone A – Rows 1–20",    pct:100, detail:"1,680 panels" },
    { label:"Zone B – Rows 21–45",   pct:78,  detail:"2,100 panels" },
    { label:"Zone C – Rows 46–70",   pct:52,  detail:"2,100 panels" },
    { label:"Zone D – Rows 71–100",  pct:21,  detail:"2,520 panels" },
    { label:"Zone E – Inverter Pads",pct:0,   detail:"Scheduled next week" },
  ];

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:20, height:"100%", overflow:"hidden" }}>
      {/* LEFT */}
      <div style={{ overflowY:"auto", display:"flex", flexDirection:"column", gap:20, paddingRight:4 }}>
        {/* KPIs */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
          <KpiCard label="Panels Installed" value="4,821" sub="of 8,400 total" trend="↑ +312 today" trendUp color="var(--cyan)" icon="⚡" />
          <KpiCard label="Completion"       value="57.4%" sub="On schedule"     trend="+2.1% today"   trendUp color="var(--green)" icon="📈" />
          <KpiCard label="Active Crew"      value="34"    sub="of 38 on site"   trend="2 break · 2 travel" color="var(--amber)" icon="👷" />
          <KpiCard label="Open Issues"      value="4"     sub="1 critical · 3 minor" trend="⚠ Action needed" color="var(--red)" icon="🚨" />
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {alerts.map(a => <AlertBanner key={a.id} {...a} onDismiss={() => setAlerts(al => al.filter(x => x.id !== a.id))} />)}
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
            <div key={t.id} onClick={()=>toggleTask(t.id)} style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 22px", borderBottom: i<tasks.length-1?"1px solid rgba(255,255,255,.04)":"none", cursor:"pointer", transition:"background .15s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(0,210,255,.04)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:pDot[t.p], flexShrink:0 }} />
              <div style={{ width:22, height:22, borderRadius:"50%", border:`2px solid ${t.done?"var(--green)":t.active?"var(--cyan)":"var(--text3)"}`, background:t.done?"var(--green)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:11, color:t.done?"#000":t.active?"var(--cyan)":"transparent", fontWeight:700, transition:"all .2s" }}>
                {t.done?"✓":t.active?"▶":""}
              </div>
              <div style={{ flex:1, fontSize:13.5, textDecoration:t.done?"line-through":"none", color:t.done?"var(--text3)":t.urgent?"var(--red)":"var(--text)" }}>{t.text}</div>
              <span className="mono" style={{ fontSize:10, color:t.urgent?"var(--red)":t.active?"var(--cyan)":"var(--text3)", letterSpacing:1 }}>{t.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ display:"flex", flexDirection:"column", gap:16, overflowY:"auto" }}>
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
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginTop:14 }}>
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
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
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
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14 }}>
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
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
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
function Crew() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const allCrew = [
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
  const statLabel = { active:"● ACTIVE", break:"⏸ BREAK", issue:"⚠ ISSUE", travel:"→ TRAVEL" };
  const statPill  = { active:"pill-green", break:"pill-amber", issue:"pill-red", travel:"pill-cyan" };
  const filters   = ["All","Active","Break","Issue","Travel"];
  const visible   = allCrew.filter(w => (filter==="All" || w.status===filter.toLowerCase()) && (w.name.toLowerCase().includes(search.toLowerCase()) || w.role.toLowerCase().includes(search.toLowerCase())));

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, height:"100%", overflowY:"auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
        <KpiCard label="Total On Site" value="38" sub="Checked in today" color="var(--cyan)"   icon="👷" />
        <KpiCard label="Active"        value="34" sub="Currently working" color="var(--green)" icon="✅" />
        <KpiCard label="Issues"        value="1"  sub="Needs attention"   color="var(--red)"   icon="⚠️" />
        <KpiCard label="Panels Today"  value="312" sub="Total by crew"    color="var(--sun)"   icon="⚡" />
      </div>
      <div className="card fade-up">
        <div className="card-header">
          <SectionTitle sub={`Showing ${visible.length} of ${allCrew.length}`}>All Crew Members</SectionTitle>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or role…" style={{ width:200, padding:"7px 12px", fontSize:12 }} />
            <div style={{ display:"flex", gap:6 }}>
              {filters.map(f=>(
                <button key={f} onClick={()=>setFilter(f)} style={{ background:filter===f?"rgba(0,210,255,.15)":"rgba(255,255,255,.04)", border:`1px solid ${filter===f?"rgba(0,210,255,.4)":"var(--border)"}`, color:filter===f?"var(--cyan)":"var(--text2)", fontSize:11, fontWeight:600, padding:"5px 12px", borderRadius:7, transition:"all .2s" }}>{f}</button>
              ))}
            </div>
            <button className="btn-primary">+ Add Worker</button>
          </div>
        </div>
        <table>
          <thead><tr>
            <th>Worker</th><th>Role</th><th>Zone</th><th>Certification</th><th>Cert Expiry</th><th>PPE</th><th>Status</th><th>Panels</th><th>Hours</th><th>Contact</th>
          </tr></thead>
          <tbody>
            {visible.map((w,i)=>(
              <tr key={i}>
                <td style={{ fontWeight:600, fontSize:13.5 }}>{w.name}</td>
                <td><span style={{ fontSize:12, color:"var(--text2)" }}>{w.role}</span></td>
                <td><span className="mono" style={{ fontSize:12 }}>{w.zone}</span></td>
                <td><span className="pill pill-cyan" style={{ fontSize:10 }}>{w.cert}</span></td>
                <td><span className="mono" style={{ fontSize:11, color: new Date(w.certExp) < new Date("2026-01-01") ? "var(--amber)" : "var(--text3)" }}>{w.certExp}</span></td>
                <td><span style={{ color:w.ppe?"var(--green)":"var(--red)", fontSize:16 }}>{w.ppe?"✓":"✗"}</span></td>
                <td><span className={`pill ${statPill[w.status]}`}>{statLabel[w.status]}</span></td>
                <td><span className="mono" style={{ color:"var(--green)", fontSize:14 }}>{w.panels}</span></td>
                <td><span className="mono" style={{ fontSize:12 }}>{w.hours}h</span></td>
                <td><span className="mono" style={{ fontSize:11, color:"var(--cyan)" }}>{w.phone}</span></td>
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
function Materials() {
  const [items, setItems] = useState([
    { name:"Solar Panels (400W)",  sku:"SP-400W",  stock:3579, unit:"panels", min:500,  status:"ok",       reorder:500  },
    { name:"MC4 Connectors",       sku:"MC4-M/F",  stock:214,  unit:"pairs",  min:500,  status:"critical", reorder:1200 },
    { name:"Racking Rails (4m)",   sku:"RR-4M",    stock:890,  unit:"pcs",    min:200,  status:"ok",       reorder:200  },
    { name:"Mounting Bolts M8",    sku:"MB-M8",    stock:4200, unit:"units",  min:1000, status:"ok",       reorder:1000 },
    { name:"PV Wire 10AWG",        sku:"PVW-10",   stock:1100, unit:"ft",     min:2000, status:"warn",     reorder:2000 },
    { name:'Conduit 3/4" EMT',     sku:"EMT-34",   stock:650,  unit:"ft",     min:500,  status:"warn",     reorder:500  },
    { name:"Junction Boxes IP65",  sku:"JB-IP65",  stock:38,   unit:"units",  min:10,   status:"ok",       reorder:10   },
    { name:"Grounding Clips SS",   sku:"GC-SS",    stock:820,  unit:"units",  min:200,  status:"ok",       reorder:200  },
  ]);
  const [receiving, setReceiving] = useState({ show:false, item:"", qty:"" });
  const sc = { ok:"var(--green)", warn:"var(--amber)", critical:"var(--red)" };
  const sp = { ok:"pill-green",   warn:"pill-amber",   critical:"pill-red"   };

  const receive = () => {
    if (!receiving.item || !receiving.qty) return;
    setItems(it => it.map(x => x.sku===receiving.item ? { ...x, stock: x.stock + parseInt(receiving.qty||0) } : x));
    setReceiving({ show:false, item:"", qty:"" });
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, height:"100%", overflowY:"auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
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
                <td><span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700, color:sc[item.status] }}>{item.stock.toLocaleString()}</span></td>
                <td><span className="mono" style={{ fontSize:11, color:"var(--text3)" }}>{item.unit}</span></td>
                <td><span className="mono" style={{ fontSize:12 }}>{item.min.toLocaleString()}</span></td>
                <td><span className={`pill ${sp[item.status]}`}>{item.status.toUpperCase()}</span></td>
                <td>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span className="mono" style={{ color:"var(--cyan)", fontSize:13 }}>{item.reorder.toLocaleString()}</span>
                    {item.status!=="ok" && <button className="btn-ghost" style={{ fontSize:11, padding:"4px 10px" }}>Order Now</button>}
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
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
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
function Safety() {
  const [showLog, setShowLog] = useState(false);
  const [incident, setIncident] = useState({ type:"", desc:"", worker:"", zone:"" });
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
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
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
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:12, marginBottom:12 }}>
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
              <button className="btn-danger">Submit Incident Report</button>
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
    </div>
  );
}

/* ═══════════════════════════════════════════
   STRING TESTING
═══════════════════════════════════════════ */
function StringTesting() {
  const strings = [
    { id:"ZB-S01", zone:"Zone B", eff:99.1, voc:401.2, isc:10.22, status:"pass", tech:"DeShawn Harris", date:"Today 08:12" },
    { id:"ZB-S02", zone:"Zone B", eff:98.7, voc:399.8, isc:10.18, status:"pass", tech:"DeShawn Harris", date:"Today 08:45" },
    { id:"ZB-S03", zone:"Zone B", eff:97.4, voc:397.1, isc:10.05, status:"pass", tech:"DeShawn Harris", date:"Today 09:10" },
    { id:"ZB-S04", zone:"Zone B", eff:94.2, voc:388.3, isc:9.81,  status:"warn", tech:"DeShawn Harris", date:"Today 09:40" },
    { id:"ZB-S05", zone:"Zone B", eff:98.9, voc:400.5, isc:10.20, status:"pass", tech:"DeShawn Harris", date:"Today 10:05" },
    { id:"ZA-S01", zone:"Zone A", eff:99.3, voc:402.1, isc:10.28, status:"pass", tech:"Keisha Brown",   date:"Mar 6 14:20" },
    { id:"ZA-S02", zone:"Zone A", eff:98.1, voc:398.2, isc:10.12, status:"pass", tech:"Keisha Brown",   date:"Mar 6 15:00" },
    { id:"ZA-S03", zone:"Zone A", eff:82.3, voc:371.4, isc:9.41,  status:"fail", tech:"Keisha Brown",   date:"Mar 6 15:40" },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, height:"100%", overflowY:"auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
        <KpiCard label="Strings Tested" value="8"   sub="of 48 total"      color="var(--cyan)"  icon="🔌" />
        <KpiCard label="Pass Rate"      value="87%" sub="7 pass · 1 fail"  color="var(--green)" icon="✅" />
        <KpiCard label="Avg Efficiency" value="96.8%" sub="Target: ≥95%"   color="var(--sun)"   icon="⚡" />
        <KpiCard label="Flagged"        value="2"   sub="1 warn · 1 fail"  color="var(--amber)" icon="⚠️" />
      </div>
      <div className="card fade-up">
        <div className="card-header">
          <SectionTitle sub="All string test results">String Test Log</SectionTitle>
          <button className="btn-primary">+ Log New Test</button>
        </div>
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
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
        <KpiCard label="Days Ahead"    value="3"    sub="Ahead of schedule" trend="Excellent pace" trendUp color="var(--green)" icon="📅" />
        <KpiCard label="% Complete"    value="57.4%" sub="As of today"      color="var(--cyan)"  icon="📈" />
        <KpiCard label="Est. Complete" value="Mar 25" sub="3 days early"    trend="Original: Mar 28" color="var(--sun)" icon="🏁" />
        <KpiCard label="Weeks Left"    value="3"    sub="to panel complete" color="var(--amber)" icon="⏳" />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20 }}>
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
  const [tab, setTab] = useState("dashboard");
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(()=>setTime(new Date()), 1000); return ()=>clearInterval(t); }, []);

  const views = { dashboard:<Dashboard/>, sitemap:<SiteMap/>, crew:<Crew/>, materials:<Materials/>, strings:<StringTesting/>, schedule:<Schedule/>, reports:<Reports/>, safety:<Safety/> };
  const hh = time.getHours().toString().padStart(2,"0");
  const mm = time.getMinutes().toString().padStart(2,"0");
  const ss = time.getSeconds().toString().padStart(2,"0");

  return (
    <>
      <style>{G}</style>
      <div style={{ display:"flex", flexDirection:"column", height:"100vh", background:"var(--bg)", overflow:"hidden" }}>

        {/* TOP BAR */}
        <div style={{ height:56, background:"rgba(7,13,26,.97)", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", flexShrink:0, backdropFilter:"blur(20px)" }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, background:"linear-gradient(135deg,var(--sun),#c97a00)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, animation:"glow 3s ease-in-out infinite", flexShrink:0 }}>☀️</div>
            <div>
              <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:19, letterSpacing:.5, lineHeight:1 }}>
                <span style={{ color:"var(--sun)" }}>Solar</span><span style={{ color:"var(--cyan)" }}>Ops</span><span style={{ color:"var(--text2)" }}>.AI</span>
              </div>
              <div className="mono" style={{ fontSize:9, color:"var(--text3)", letterSpacing:2 }}>FIELD COMMAND PLATFORM</div>
            </div>
          </div>

          {/* Center info */}
          <div style={{ display:"flex", alignItems:"center", gap:24 }}>
            <div style={{ textAlign:"center" }}>
              <div className="mono" style={{ fontSize:9, color:"var(--text3)", letterSpacing:2, marginBottom:2 }}>PROJECT</div>
              <div style={{ fontSize:13, fontWeight:600, color:"var(--text)" }}>Sunrise Solar Farm — Phase 2</div>
            </div>
            <div style={{ width:1, height:30, background:"var(--border)" }} />
            <div style={{ textAlign:"center" }}>
              <div className="mono" style={{ fontSize:9, color:"var(--text3)", letterSpacing:2, marginBottom:2 }}>WEATHER</div>
              <div style={{ fontSize:13, color:"var(--sun2)" }}>☀️ 84°F · Wind 7mph · UV 9</div>
            </div>
            <div style={{ width:1, height:30, background:"var(--border)" }} />
            <div style={{ textAlign:"center" }}>
              <div className="mono" style={{ fontSize:9, color:"var(--text3)", letterSpacing:2, marginBottom:2 }}>LOCAL TIME</div>
              <div className="mono" style={{ fontSize:14, color:"var(--cyan)", fontWeight:700 }}>{hh}:{mm}:{ss}</div>
            </div>
          </div>

          {/* Right */}
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"var(--green)" }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--green)", animation:"blink 2s infinite" }} />
              <span className="mono" style={{ fontSize:10, letterSpacing:1 }}>LIVE</span>
            </div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:13, fontWeight:600 }}>J. Martinez</div>
                <div style={{ fontSize:10, color:"var(--text3)" }}>Site Foreman</div>
              </div>
              <div style={{ width:36, height:36, background:"linear-gradient(135deg,var(--cyan),#0050aa)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:14, color:"#fff", flexShrink:0 }}>JM</div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
          {/* SIDEBAR */}
          <div style={{ width:210, background:"var(--bg2)", borderRight:"1px solid var(--border)", display:"flex", flexDirection:"column", padding:"14px 10px", flexShrink:0, overflowY:"auto" }}>
            <div className="section-label" style={{ paddingTop:6 }}>Navigation</div>
            {NAV.map(n=>(
              <button key={n.id} className={`nav-link ${tab===n.id?"active":""}`} onClick={()=>setTab(n.id)}>
                <span className="icon">{n.icon}</span>
                {n.label}
                {n.badge && <span className={`badge ${n.badgeC||""}`}>{n.badge}</span>}
              </button>
            ))}

            <div style={{ marginTop:"auto", paddingTop:16, display:"flex", flexDirection:"column", gap:6 }}>
              <div className="section-label" style={{ paddingTop:0 }}>Site</div>
              <div style={{ padding:"10px 14px", background:"rgba(0,230,118,.06)", border:"1px solid rgba(0,230,118,.15)", borderRadius:10 }}>
                <div style={{ fontSize:11, color:"var(--green)", fontWeight:600, marginBottom:4 }}>✓ 43 Days Incident-Free</div>
                <div style={{ fontSize:11, color:"var(--text3)" }}>57.4% complete · 3d ahead</div>
              </div>
              <button className="nav-link" style={{ color:"var(--red)", borderColor:"rgba(255,71,87,.2)" }}>
                <span className="icon">🚨</span>Emergency SOS
              </button>
            </div>
          </div>

          {/* PAGE */}
          <div style={{ flex:1, padding:24, overflow:"hidden", display:"flex", flexDirection:"column" }}>
            {/* Page header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexShrink:0 }}>
              <div>
                <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:26, fontWeight:700, color:"var(--text)", lineHeight:1 }}>
                  {NAV.find(n=>n.id===tab)?.icon} {NAV.find(n=>n.id===tab)?.label}
                </div>
                <div className="mono" style={{ fontSize:10, color:"var(--text3)", marginTop:4, letterSpacing:2 }}>
                  SOLAROPS.AI · {new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).toUpperCase()}
                </div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button className="btn-ghost">🔔 Alerts (4)</button>
                <button className="btn-ghost">📱 Mobile View</button>
              </div>
            </div>

            {/* Content */}
            <div style={{ flex:1, overflow:"hidden" }}>
              {views[tab]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
