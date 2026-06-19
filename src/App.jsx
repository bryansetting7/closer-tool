import { useState } from "react";

const ACCENT = "#00E5C4";
const PURPLE = "#6C63FF";
const RED = "#FF6584";

const SYSTEM_PROMPT = `Tu es un expert en closing et en vente pour des coachs fitness/perte de poids sur Instagram.

Bryan est un closer freelance qui cherche à collaborer avec des coachs fitness/perte de poids sur Instagram. Il travaille à la commission (10%), propose une période test de 30 jours sans engagement, et a un background fitness personnel. Il CLOSE UNIQUEMENT LES APPELS DÉJÀ BOOKÉS — il ne gère pas les DMs, pas le setting, uniquement les calls de vente.

Les coachs fitness n'affichent presque jamais leurs prix. Estime le ticket en fonction de l'audience, du type d'offre, du positionnement et des CTAs visibles.

Génère un kit de prospection complet EN FRANÇAIS. Réponds UNIQUEMENT avec du JSON brut, sans texte avant ni après, sans backticks.

{
  "analyse": {
    "nom": "prénom du coach",
    "type_offre": "type d'offre identifié",
    "ticket_estime": "fourchette ex: 500-900€ + justification courte",
    "signal_opportunite": "pourquoi ce coach a besoin d'un closer",
    "point_fort": "pourquoi c'est une bonne cible pour Bryan"
  },
  "messages": {
    "icebreaker_a": "message d'accroche version A, court, naturel, 1 question, zéro pitch",
    "icebreaker_b": "message d'accroche version B angle différent",
    "qualification": "question après première réponse pour savoir s'il fait des calls de vente",
    "pitch": "pitch closer : Bryan close les appels déjà bookés, commission 10%, période test 30j"
  },
  "objections": [
    { "objection": "objection probable 1", "reponse": "réponse personnalisée" },
    { "objection": "objection probable 2", "reponse": "réponse personnalisée" },
    { "objection": "objection probable 3", "reponse": "réponse personnalisée" }
  ],
  "script_call": "script d'ouverture de call complet pour Bryan quand le coach accepte de parler",
  "periode_test": "proposition structurée 30 jours adaptée à ce coach"
}`;

function Spinner() {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, padding:"52px 0" }}>
      <div style={{ width:34, height:34, borderRadius:"50%", border:"3px solid #1E1E2E", borderTopColor:ACCENT, animation:"spin 0.8s linear infinite" }}/>
      <span style={{ fontFamily:"monospace", fontSize:11, color:"#7070A0", letterSpacing:"0.12em" }}>GÉNÉRATION...</span>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setOk(true); setTimeout(() => setOk(false), 2000);
    }).catch(() => {
      const el = document.createElement("textarea");
      el.value = text;
      el.style.cssText = "position:fixed;top:-999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setOk(true);
      setTimeout(() => setOk(false), 2000);
    });
  };
  return (
    <button onClick={copy} style={{
      fontFamily:"monospace", fontSize:10, padding:"2px 9px", borderRadius:4,
      border: ok ? `1px solid ${ACCENT}` : "1px solid #2A2A3E",
      background:"none", color: ok ? ACCENT : "#555580", cursor:"pointer",
      transition:"all .15s", flexShrink:0
    }}>{ok ? "COPIÉ ✓" : "COPIER"}</button>
  );
}

function Block({ label, text, color }) {
  color = color || ACCENT;
  return (
    <div style={{ background:"#0A0A12", border:"1px solid #1E1E2E", borderRadius:8, overflow:"hidden", marginTop:10 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 12px", borderBottom:"1px solid #1E1E2E" }}>
        <span style={{ fontFamily:"monospace", fontSize:10, letterSpacing:"0.1em", color, textTransform:"uppercase" }}>{label}</span>
        <CopyBtn text={text} />
      </div>
      <div style={{ padding:"13px", fontSize:13.5, lineHeight:1.75, color:"#E0E0F0", whiteSpace:"pre-wrap" }}>{text}</div>
    </div>
  );
}

function Card({ title, tag, children }) {
  return (
    <div style={{ background:"#111118", border:"1px solid #1E1E2E", borderRadius:10, marginBottom:14, overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 18px", borderBottom:"1px solid #1E1E2E" }}>
        <span style={{ fontWeight:600, fontSize:14, color:"#E8E8F0", flex:1 }}>{title}</span>
        {tag && <span style={{ fontFamily:"monospace", fontSize:9, padding:"2px 8px", borderRadius:4, background:"#1A1A2E", border:"1px solid #1E1E2E", color:"#7070A0" }}>{tag}</span>}
      </div>
      <div style={{ padding:"15px 18px" }}>{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display:"flex", gap:12, paddingBottom:8, borderBottom:"1px solid #16162A", marginBottom:8 }}>
      <span style={{ fontFamily:"monospace", fontSize:10, color:"#7070A0", textTransform:"uppercase", letterSpacing:"0.08em", minWidth:108, paddingTop:1, flexShrink:0 }}>{label}</span>
      <span style={{ fontSize:13.5, color:"#C0C0D8", flex:1 }}>{value}</span>
    </div>
  );
}

function ObjItem({ obj, rep, idx }) {
  const c = [ACCENT, PURPLE, RED][idx % 3];
  return (
    <div style={{ background:"#0A0A12", border:"1px solid #1E1E2E", borderRadius:8, overflow:"hidden", marginBottom:10 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", borderBottom:"1px solid #1E1E2E" }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:c, flexShrink:0 }}/>
        <span style={{ fontSize:13.5, fontWeight:600, color:"#E8E8F0" }}>{obj}</span>
      </div>
      <div style={{ padding:"12px 14px" }}>
        <div style={{ fontSize:13.5, color:"#C0C0D8", lineHeight:1.65, whiteSpace:"pre-wrap", marginBottom:10 }}>{rep}</div>
        <div style={{ display:"flex", justifyContent:"flex-end" }}><CopyBtn text={rep}/></div>
      </div>
    </div>
  );
}

const iStyle = {
  width:"100%", background:"#0A0A12", border:"1px solid #1E1E2E",
  borderRadius:6, color:"#E8E8F0", fontFamily:"inherit",
  fontSize:13.5, padding:"10px 12px", outline:"none",
  transition:"border-color .15s", resize:"vertical", boxSizing:"border-box"
};
const lStyle = {
  fontFamily:"monospace", fontSize:10, letterSpacing:"0.12em",
  color:"#7070A0", textTransform:"uppercase", display:"block", marginBottom:6
};

const TABS = [
  { id:"msg", label:"💬 Messages" },
  { id:"obj", label:"⚡ Objections" },
  { id:"call", label:"📞 Script Call" },
  { id:"test", label:"🤝 Période Test" },
];

export default function App() {
  const [form, setForm] = useState({ nom:"", abonnes:"", offre:"", cta:"", notes:"" });
  const [step, setStep] = useState("form");
  const [result, setResult] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [tab, setTab] = useState("msg");

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const fin = e => e.target.style.borderColor = "#1E1E2E";
  const fon = e => e.target.style.borderColor = ACCENT;

  const generate = async () => {
    if (!form.offre.trim()) { setErrMsg("Décris l'offre du coach."); return; }
    setErrMsg("");
    setStep("loading");

    const userMsg = `Profil Instagram du coach :
- Pseudo : ${form.nom || "non précisé"}
- Abonnés : ${form.abonnes || "non précisé"}
- Offre : ${form.offre}
- Prix : non affiché — estime le ticket toi-même
- CTA : ${form.cta || "non précisé"}
- Notes : ${form.notes || "aucune"}

Génère le kit complet pour Bryan. JSON brut uniquement.`;

    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "user", content: SYSTEM_PROMPT + "\n\n" + userMsg }
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrMsg("Erreur " + response.status + " : " + (data.error || JSON.stringify(data)).slice(0, 200));
        setStep("error");
        return;
      }

      // Groq returns OpenAI format: choices[0].message.content
      const raw = data.choices?.[0]?.message?.content?.trim();

      if (!raw) {
        setErrMsg("Réponse vide. " + JSON.stringify(data).slice(0, 150));
        setStep("error");
        return;
      }

      const start = raw.indexOf("{");
      const end = raw.lastIndexOf("}");
      if (start === -1 || end === -1) {
        setErrMsg("JSON introuvable : " + raw.slice(0, 150));
        setStep("error");
        return;
      }

      const parsed = JSON.parse(raw.slice(start, end + 1));
      setResult(parsed);
      setTab("msg");
      setStep("result");

    } catch (err) {
      setErrMsg(err.name + ": " + err.message);
      setStep("error");
    }
  };

  const reset = () => { setStep("form"); setResult(null); setErrMsg(""); };

  return (
    <div style={{ minHeight:"100vh", background:"#0A0A0F", color:"#E8E8F0", fontFamily:"'Space Grotesk',system-ui,sans-serif", paddingBottom:60 }}>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"36px 20px 24px", borderBottom:"1px solid #1E1E2E" }}>
        <div style={{ fontFamily:"monospace", fontSize:10, letterSpacing:"0.2em", color:ACCENT, textTransform:"uppercase", marginBottom:10 }}>Closer Tool · Bryan · 2026</div>
        <h1 style={{ fontSize:"clamp(20px,4vw,32px)", fontWeight:700, color:"#fff", lineHeight:1.2, marginBottom:8 }}>
          Kit prospection<br/><span style={{ color:PURPLE }}>closer fitness</span>
        </h1>
        <p style={{ fontSize:13.5, color:"#7070A0", maxWidth:460 }}>Remplis les infos visibles sur le profil — messages, objections et script de call générés en secondes.</p>
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"0 20px" }}>

        {(step === "form" || step === "error") && (
          <div style={{ marginTop:28 }}>
            <div style={{ background:"#111118", border:"1px solid #1E1E2E", borderRadius:10, padding:"20px 18px" }}>
              <div style={{ fontFamily:"monospace", fontSize:10, letterSpacing:"0.14em", color:"#7070A0", textTransform:"uppercase", marginBottom:18 }}>Infos du profil</div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                <div>
                  <label style={lStyle}>Pseudo Instagram</label>
                  <input style={iStyle} placeholder="@coachsophie" value={form.nom} onChange={set("nom")} onFocus={fon} onBlur={fin}/>
                </div>
                <div>
                  <label style={lStyle}>Abonnés</label>
                  <input style={iStyle} placeholder="18k" value={form.abonnes} onChange={set("abonnes")} onFocus={fon} onBlur={fin}/>
                </div>
              </div>

              <div style={{ marginBottom:12 }}>
                <label style={lStyle}>Son offre <span style={{ color:RED }}>*</span></label>
                <textarea style={{ ...iStyle, minHeight:76 }} placeholder="Coaching nutrition + sport suivi 3 mois, programme perte de poids hommes..." value={form.offre} onChange={set("offre")} onFocus={fon} onBlur={fin}/>
                <div style={{ fontFamily:"monospace", fontSize:10, color:"#555580", marginTop:4 }}>Prix non nécessaire — estimé automatiquement</div>
              </div>

              <div style={{ marginBottom:12 }}>
                <label style={lStyle}>CTA visible (bio / stories)</label>
                <input style={iStyle} placeholder={`"DM PRIME", lien Calendly...`} value={form.cta} onChange={set("cta")} onFocus={fon} onBlur={fin}/>
              </div>

              <div style={{ marginBottom:18 }}>
                <label style={lStyle}>Notes (optionnel)</label>
                <textarea style={{ ...iStyle, minHeight:56 }} placeholder="Cible hommes 30+, before/after réguliers, très actif en stories..." value={form.notes} onChange={set("notes")} onFocus={fon} onBlur={fin}/>
              </div>

              {(errMsg || step === "error") && (
                <div style={{ background:"rgba(255,101,132,.08)", border:"1px solid rgba(255,101,132,.3)", borderRadius:6, padding:"10px 13px", marginBottom:14, fontSize:12, color:"#F0A0B0", fontFamily:"monospace", wordBreak:"break-all" }}>
                  {errMsg || "Erreur inconnue"}
                </div>
              )}

              <button onClick={generate} style={{
                width:"100%", padding:"13px",
                background:`linear-gradient(135deg,${PURPLE},${ACCENT})`,
                border:"none", borderRadius:8, color:"#fff",
                fontFamily:"inherit", fontWeight:700, fontSize:14,
                cursor:"pointer", letterSpacing:"0.03em"
              }}>⚡ Générer le kit de prospection</button>
            </div>
          </div>
        )}

        {step === "loading" && <Spinner/>}

        {step === "result" && result && (
          <div style={{ marginTop:24 }}>
            <Card title="Analyse du profil" tag="AUTO">
              <Row label="Coach" value={result.analyse?.nom || form.nom || "—"}/>
              <Row label="Offre" value={result.analyse?.type_offre || "—"}/>
              <Row label="Ticket estimé" value={result.analyse?.ticket_estime || "—"}/>
              <Row label="Opportunité" value={result.analyse?.signal_opportunite || "—"}/>
              <Row label="Intérêt" value={result.analyse?.point_fort || "—"}/>
            </Card>

            <div style={{ display:"flex", borderBottom:"1px solid #1E1E2E", marginBottom:14, overflowX:"auto" }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  fontFamily:"monospace", fontSize:11, padding:"11px 14px",
                  background:"none", border:"none",
                  borderBottom: tab===t.id ? `2px solid ${PURPLE}` : "2px solid transparent",
                  color: tab===t.id ? PURPLE : "#7070A0",
                  cursor:"pointer", whiteSpace:"nowrap", transition:"all .15s"
                }}>{t.label}</button>
              ))}
            </div>

            {tab === "msg" && <>
              <Block label="Icebreaker · Version A" text={result.messages?.icebreaker_a || ""} color={ACCENT}/>
              <Block label="Icebreaker · Version B" text={result.messages?.icebreaker_b || ""} color={ACCENT}/>
              <Block label="Question de qualification" text={result.messages?.qualification || ""} color={PURPLE}/>
              <Block label="Pitch Closer" text={result.messages?.pitch || ""} color={PURPLE}/>
            </>}

            {tab === "obj" && (result.objections || []).map((o, i) => (
              <ObjItem key={i} idx={i} obj={o.objection} rep={o.reponse}/>
            ))}

            {tab === "call" && <Block label="Script d'ouverture de call" text={result.script_call || ""} color={ACCENT}/>}
            {tab === "test" && <Block label="Proposition période test" text={result.periode_test || ""} color={PURPLE}/>}

            <button onClick={reset} style={{
              marginTop:20, width:"100%", padding:"11px",
              background:"none", border:"1px solid #1E1E2E",
              borderRadius:8, color:"#7070A0", fontFamily:"inherit",
              fontSize:13, cursor:"pointer", transition:"all .15s"
            }}
              onMouseEnter={e=>{e.target.style.borderColor="#7070A0";e.target.style.color="#E8E8F0"}}
              onMouseLeave={e=>{e.target.style.borderColor="#1E1E2E";e.target.style.color="#7070A0"}}
            >← Nouveau prospect</button>
          </div>
        )}

      </div>
    </div>
  );
}
