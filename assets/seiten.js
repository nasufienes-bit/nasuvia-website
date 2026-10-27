// Zusatz für die eigenständigen Seiten (Ablauf, Für Firmen, Kontakt):
// die Animationen, die bisher nur das Startseiten-Skript kannte.
import { g as gsap, S as ScrollTrigger } from "./splice-Dpb2TkfY.js";

gsap.registerPlugin(ScrollTrigger);
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

/* ---------- Schweizer Karte (aus dem Startseiten-Skript übernommen) ---------- */
const V=[[.7921,.1293],[.7986,.1356],[.8146,.1588],[.8114,.1971],[.7929,.2596],[.7833,.3095],[.7825,.3488],[.7841,.3666],[.7873,.3666],[.805,.3693],[.8138,.3693],[.8411,.3791],[.8636,.3943],[.8684,.4112],[.8708,.4309],[.8973,.4576],[.9278,.4746],[.9382,.4692],[.9759,.4059],[.9912,.4166],[1,.4505],[.9992,.4674],[.9888,.5343],[.9872,.5709],[.996,.5941],[.9968,.6128],[.9944,.6298],[.9791,.6316],[.9591,.6218],[.9422,.5932],[.9286,.5968],[.9173,.6039],[.9117,.6316],[.9069,.6637],[.9085,.6824],[.9165,.6958],[.923,.7261],[.927,.7645],[.931,.7823],[.927,.7895],[.9165,.7948],[.9077,.7904],[.8917,.744],[.8844,.7261],[.8724,.7235],[.8507,.7342],[.8178,.76],[.8042,.76],[.7929,.7547],[.7825,.7333],[.7737,.6913],[.7705,.6646],[.764,.6655],[.7432,.6574],[.7335,.6682],[.7335,.711],[.7311,.7654],[.7207,.7993],[.691,.8599],[.6806,.8858],[.6758,.9045],[.675,.9206],[.6798,.9492],[.6854,.9759],[.6806,.992],[.6653,1],[.6541,.9831],[.6501,.9545],[.626,.9144],[.6364,.8814],[.6348,.8724],[.5955,.8555],[.5787,.8305],[.5546,.7859],[.5498,.7672],[.5514,.7056],[.5498,.6905],[.5465,.6833],[.5353,.6833],[.5193,.7047],[.504,.7368],[.4735,.7734],[.4703,.7806],[.4807,.8162],[.4799,.8296],[.4559,.8858],[.451,.9045],[.4197,.9393],[.4053,.9527],[.362,.9269],[.3499,.9233],[.3299,.9411],[.3026,.9572],[.2584,.9741],[.2416,.9616],[.2343,.95],[.2303,.9331],[.2191,.9037],[.2063,.8858],[.1974,.8662],[.1862,.8448],[.179,.8278],[.1886,.7707],[.1814,.7511],[.1774,.7226],[.1798,.7029],[.1758,.6985],[.1356,.6878],[.1019,.6913],[.0787,.7101],[.0586,.7413],[.0562,.7484],[.0578,.7538],[.0674,.7823],[.0514,.8136],[.0257,.8368],[.008,.8394],[0,.835],[0,.802],[.0144,.7904],[.0281,.769],[.0321,.7386],[.0337,.7181],[.0201,.6922],[.0217,.6771],[.0305,.6467],[.0353,.6209],[.0425,.5986],[.0698,.5611],[.0979,.5245],[.1019,.4844],[.1043,.4362],[.1083,.4246],[.1461,.3961],[.1549,.3845],[.1597,.3684],[.1894,.3149],[.2191,.2614],[.2247,.2435],[.2295,.2328],[.2295,.2239],[.2263,.2177],[.2119,.2132],[.2071,.1963],[.2223,.1659],[.2416,.1472],[.26,.1472],[.2673,.1552],[.2665,.165],[.2745,.1757],[.2889,.1793],[.3058,.1757],[.3234,.1641],[.3339,.1374],[.3395,.1169],[.3668,.0937],[.3852,.1053],[.4358,.1088],[.4735,.1026],[.4968,.0865],[.5257,.0865],[.5449,.0955],[.5482,.0946],[.5538,.0919],[.5586,.0839],[.577,.0776],[.5795,.0705],[.5787,.0633],[.5754,.0598],[.553,.0633],[.5441,.058],[.5425,.0446],[.5498,.0223],[.5658,.0045],[.5803,0],[.5899,.0045],[.6148,.0384],[.6204,.0401],[.6244,.0339],[.6292,.0303],[.638,.0366],[.6469,.058],[.6485,.0616],[.7039,.0535],[.7159,.0535],[.7536,.091],[.7921,.1293]],ut=1.578,B=[{name:"WINTERTHUR",x:.6148,y:.1421,home:!0},{name:"ZÜRICH",x:.5732,y:.2048},{name:"BASEL",x:.3607,y:.1109},{name:"BERN",x:.3292,y:.4252},{name:"LUZERN",x:.5214,y:.3725},{name:"ST. GALLEN",x:.7593,y:.1803},{name:"CHUR",x:.7934,y:.4751},{name:"LAUSANNE",x:.1475,y:.6453},{name:"GENF",x:.0385,y:.8073},{name:"SION",x:.3099,y:.7925},{name:"LUGANO",x:.6644,y:.9104}];function dt(t,o,r){let i=!1;for(let c=0,m=r.length-1;c<r.length;m=c++){const[y,u]=r[c],[x,w]=r[m];u>o!=w>o&&t<(x-y)*(o-u)/(w-u)+y&&(i=!i)}return i}const A="http://www.w3.org/2000/svg";function pt(t,{gsap:o,reducedMotion:r=!1}={}){const u=484/ut,x=(340-u)/2,w=l=>18+l*484,v=l=>x+l*u,E=document.createElementNS(A,"path");E.setAttribute("d","M "+V.map(([l,n])=>w(l).toFixed(1)+" "+v(n).toFixed(1)).join(" L ")+" Z"),E.setAttribute("fill","rgba(59, 85, 230, 0.03)"),E.setAttribute("stroke","rgba(28, 42, 123, 0.35)"),E.setAttribute("stroke-width","1.2"),t.appendChild(E);const D=document.createElementNS(A,"g"),P=11;for(let l=0;l<=484;l+=P)for(let n=0;n<=u;n+=P){const a=l/484,d=n/u;if(!dt(a,d,V))continue;const p=document.createElementNS(A,"circle");p.setAttribute("cx",18+l),p.setAttribute("cy",x+n),p.setAttribute("r",1.4),p.setAttribute("fill","rgba(28, 42, 123, 0.16)"),D.appendChild(p)}t.appendChild(D);const M=B.find(l=>l.home);for(const l of B){const n=document.createElementNS(A,"g"),a=document.createElementNS(A,"circle");if(a.setAttribute("cx",w(l.x)),a.setAttribute("cy",v(l.y)),l.home){a.setAttribute("r",5),a.setAttribute("fill","#1C2A7B");const d=document.createElementNS(A,"circle");d.setAttribute("cx",w(l.x)),d.setAttribute("cy",v(l.y)),d.setAttribute("r",5),d.setAttribute("fill","none"),d.setAttribute("stroke","rgba(59, 85, 230, 0.5)"),d.setAttribute("stroke-width","1"),n.appendChild(d),o&&!r&&o.to(d,{attr:{r:22},opacity:0,duration:2.4,repeat:-1,ease:"power1.out"});const p=document.createElementNS(A,"text");p.setAttribute("x",w(l.x)+11),p.setAttribute("y",v(l.y)-8),p.setAttribute("fill","#0C1226"),p.setAttribute("style",'font-family: "JetBrains Mono Variable", monospace; font-size: 10.5px; letter-spacing: 0.12em; font-weight: 500;'),p.textContent="WINTERTHUR",n.appendChild(p)}else a.setAttribute("r",2.6),a.setAttribute("fill","rgba(59, 85, 230, 0.75)");n.appendChild(a),t.appendChild(n)}if(o&&!r){const l=B.filter(a=>!a.home),n=4;for(let a=0;a<n;a++){const d=document.createElementNS(A,"circle");d.setAttribute("r",2.4),d.setAttribute("fill","#3B55E6"),t.appendChild(d);const p=()=>{const T=l[Math.floor(Math.random()*l.length)],g=w(M.x),R=v(M.y),k=w(T.x),U=v(T.y);o.fromTo(d,{attr:{cx:g,cy:R},opacity:0},{attr:{cx:k,cy:U},opacity:1,duration:1.4+Math.random()*1.2,delay:Math.random()*1.2,ease:"power1.inOut",onComplete:()=>{o.to(d,{opacity:0,duration:.35,onComplete:p})}})};setTimeout(p,a*700)}}}

const karte = $("#swiss-map");
if (karte) {
  let gezeichnet = false;
  ScrollTrigger.create({
    trigger: karte, start: "top 92%", once: true,
    onEnter: () => { if (!gezeichnet) { gezeichnet = true; pt(karte, { gsap, reducedMotion: reduce }); } },
  });
}

if (!reduce && $(".b2b")) {
  gsap.fromTo(".b2b-aurora", { yPercent: -14 }, { yPercent: 14, ease: "none", scrollTrigger: { trigger: ".b2b", start: "top bottom", end: "bottom top", scrub: 1 } });
  gsap.from(".b2b-list li", { x: -26, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".b2b-list", start: "top 85%", once: true } });
  gsap.from(".b2b-visual", { y: 46, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".b2b-visual", start: "top 88%", once: true } });
}

/* ---------- Ablauf: das Kabel wandert vom BEP zur OTO-Dose ---------- */
const kabel = $("#cable-lit");
if (kabel) {
  const svg = $("#building-svg");
  if (!$("#cableGrad")) {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = '<linearGradient id="cableGrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#1C2A7B"/><stop offset="1" stop-color="#3B55E6"/></linearGradient>';
    svg.prepend(defs);
  }
  const glow = $("#cable-glow"), puls = $("#cable-pulse"), pulsGlow = $("#cable-pulse-glow");
  const schritte = $$(".process-step"), zaehler = $("#process-counter"), ok = $("#ok-badge"), otdr = $("#otdr-line");
  const laenge = kabel.getTotalLength(), otdrLaenge = otdr.getTotalLength();
  [kabel, glow].forEach((p) => { if (p) { p.style.strokeDasharray = String(laenge); p.style.strokeDashoffset = String(laenge); } });
  otdr.style.strokeDasharray = String(otdrLaenge);
  otdr.style.strokeDashoffset = String(otdrLaenge);

  const zeige = (p) => {
    const rest = String(laenge * (1 - p));
    kabel.style.strokeDashoffset = rest;
    if (glow) glow.style.strokeDashoffset = rest;
    const pt2 = kabel.getPointAtLength(laenge * p);
    puls.setAttribute("cx", pt2.x); puls.setAttribute("cy", pt2.y);
    pulsGlow.setAttribute("cx", pt2.x); pulsGlow.setAttribute("cy", pt2.y);
    puls.style.opacity = p > 0.005 && p < 0.995 ? "1" : "0";
    pulsGlow.style.opacity = puls.style.opacity;
    $("#node-bep")?.classList.toggle("lit", p > 0.03);
    $("#node-oto")?.classList.toggle("lit", p > 0.97);
    const schritt = Math.min(3, Math.floor(p * 4));
    schritte.forEach((s, i) => s.classList.toggle("is-active", i === schritt));
    if (zaehler) zaehler.textContent = String(schritt + 1).padStart(2, "0");
    if (p > 0.86) {
      otdr.style.strokeDashoffset = String(otdrLaenge * Math.max(0, 1 - (p - 0.86) / 0.12));
      gsap.to(ok, { opacity: 1, y: 0, duration: 0.5, overwrite: "auto" });
    } else {
      otdr.style.strokeDashoffset = String(otdrLaenge);
      gsap.to(ok, { opacity: 0, y: 6, duration: 0.3, overwrite: "auto" });
    }
  };

  if (reduce) {
    zeige(1);
  } else {
    zeige(0);
    const stand = { p: 0 };
    gsap.matchMedia().add({
      desktop: "(min-width: 901px) and (pointer: fine)",
      mobile: "(max-width: 900px), (pointer: coarse)",
    }, (ctx) => {
      const st = ctx.conditions.desktop
        ? { trigger: ".process", start: "top top", end: "+=260%", pin: ".process-pin", scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true }
        : { trigger: ".process", start: "top 70%", end: "bottom 75%", scrub: 0.5 };
      gsap.to(stand, { p: 1, ease: "none", scrollTrigger: st, onUpdate: () => zeige(stand.p) });
    });
  }
}

/* ---------- Kontakt ---------- */
if (!reduce && $(".contact-direct")) {
  gsap.from(".contact-cta, .contact-meta .contact-block", { y: 34, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".contact-direct", start: "top 85%", once: true } });
}

document.fonts?.ready && document.fonts.ready.then(() => ScrollTrigger.refresh());
