/* =========================================================
   КОНФИГ — номер, ссылка на Kleinanzeigen и т.д.
   ========================================================= */
const CONFIG = {
  phone: "+4916091903033",          // номер в международном формате без пробелов
  phoneDisplay: "+49 160 9190 3033",
  whatsapp: "4916091903033",        // для wa.me — только цифры
  kleinanzeigen: "",                // ссылка на профиль Kleinanzeigen (появится кнопка в блоке отзывов)
};

/* =========================================================
   УСЛУГИ
   ========================================================= */
const SERVICES = [
  { id: "sofa",     icon: "s-sofa",     price: "ab 60 €",
    title: "Polsterreinigung", desc: "Tiefenreinigung von Sofas, Couches, Sesseln und Stühlen. Entfernung von Flecken und unangenehmen Gerüchen." },
  { id: "carpet",   icon: "s-carpet",   price: "nach Fläche",
    title: "Teppichreinigung", desc: "Gründliche Reinigung von Teppichen und fest verlegter Auslegeware. Strahlende Farben und hygienische Sauberkeit." },
  { id: "mattress", icon: "s-mattress", price: "ab 40 €",
    title: "Matratzenreinigung", desc: "Hygienische Entfernung von Hausstaubmilben, Bakterien und Schweiß. Für einen gesunden Schlaf." },
  { id: "car",      icon: "s-car",      price: "auf Anfrage",
    title: "Auto-Innenraumreinigung", desc: "Komplette Polsterreinigung im Auto: Sitze, Fußmatten, Teppichboden und Kofferraum. Stromanschluss vor Ort erforderlich." },
];

/* =========================================================
   ЦЕНЫ
   ========================================================= */
const PRICES = [
  ["Standard-Sofa (2–3 Sitzer)", "ab 60 €"],
  ["Sofa L-Form", "ab 90 €"],
  ["Sofa U-Form", "ab 130 €"],
  ["Matratze (eine Seite)", "ab 40 €"],
  ["Teppich / Auslegeware", "nach Fläche"],
  ["Auto-Innenraum", "auf Anfrage"],
];

/* =========================================================
   ОТЗЫВЫ — только настоящие, с Kleinanzeigen. Формат:
   { name: "Anna K.", city: "Essen", service: "Polsterreinigung", text: "..." },
   Пока список пустой — на сайте показывается приглашение оставить отзыв.
   ========================================================= */
const REVIEWS = [];

const FAQ = [
  ["Wie lange dauert das Trocknen?", "In der Regel 4–6 Stunden, je nach Material und Raumklima. Gutes Lüften beschleunigt die Trocknung."],
  ["Was brauche ich vor Ort?", "Nur einen Stromanschluss und etwas Wasser aus dem Hahn. Bei der Autoreinigung bitte eine Steckdose in der Nähe des Fahrzeugs."],
  ["Gehen alle Flecken raus?", "Die meisten Flecken und Gerüche lassen sich gut entfernen. Bei sehr alten oder eingefärbten Flecken gibt es keine Garantie – das sage ich Ihnen ehrlich vorab, am besten anhand eines Fotos."],
  ["Wie bekomme ich einen Preis?", "Schicken Sie ein Foto per WhatsApp oder rufen Sie an – Sie erhalten kostenlos und unverbindlich einen Festpreis."],
];

/* =========================================================
   ГОРОДА (Мюльхайм +35 км). Город определяется по IP, можно задать в ссылке: ?city=essen
   ========================================================= */
const CITIES = {
  muelheim:      "Mülheim an der Ruhr",
  essen:         "Essen",
  duisburg:      "Duisburg",
  oberhausen:    "Oberhausen",
  duesseldorf:   "Düsseldorf",
  bottrop:       "Bottrop",
  gelsenkirchen: "Gelsenkirchen",
  bochum:        "Bochum",
  ratingen:      "Ratingen",
  moers:         "Moers",
  dinslaken:     "Dinslaken",
  gladbeck:      "Gladbeck",
  velbert:       "Velbert",
  krefeld:       "Krefeld",
  herne:         "Herne",
  neuss:         "Neuss",
};

const params = new URLSearchParams(location.search);
let city = null; // ключ из CITIES или null (не определили)

/* =========================================================
   РЕНДЕР
   ========================================================= */
const $ = (id) => document.getElementById(id);
const esc = (str) => String(str).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

function waLink(text) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
}

function renderServices() {
  $("servicesGrid").innerHTML = SERVICES.map((s) => `
      <article class="card">
        <div class="card__icon"><svg><use href="#${s.icon}"/></svg></div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <div class="card__foot">
          <span class="card__price">${s.price}</span>
          <a class="card__link" href="${waLink(`Hallo! Ich interessiere mich für: ${s.title}`)}" target="_blank" rel="noopener">Anfragen →</a>
        </div>
      </article>`).join("");
}

function renderPrices() {
  $("priceTable").innerHTML = PRICES
    .map(([name, price]) => `<div class="price-row"><span>${name}</span><span>${price}</span></div>`).join("");
}

function renderReviews() {
  const box = $("reviewsBox");
  const kaBtn = CONFIG.kleinanzeigen
    ? `<a class="btn btn--ghost" href="${esc(CONFIG.kleinanzeigen)}" target="_blank" rel="noopener">Profil auf Kleinanzeigen</a>` : "";

  if (!REVIEWS.length) {
    box.innerHTML = `
      <div class="reviews-empty">
        <h3>Hier erscheinen bald die ersten Bewertungen</h3>
        <p>Sie waren bereits zufrieden? Ich freue mich über Ihre Bewertung auf Kleinanzeigen.</p>
        ${kaBtn}
      </div>`;
    return;
  }
  box.innerHTML = `<div class="grid reviews">${REVIEWS.map((r) => `
      <article class="review">
        ${r.service ? `<span class="review__svc">${esc(r.service)}</span>` : ""}
        <p>${esc(r.text)}</p>
        <div class="review__who">
          <span class="review__ava">${esc(r.name.charAt(0))}</span>
          <span><b>${esc(r.name)}</b>${r.city ? esc(r.city) + " · " : ""}Kleinanzeigen</span>
        </div>
      </article>`).join("")}</div>${kaBtn ? `<p class="note">${kaBtn}</p>` : ""}`;
}

function renderFaq() {
  $("faqList").innerHTML = FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");
}

function renderFormOptions() {
  $("formService").innerHTML = SERVICES.map((s) => `<option value="${s.id}">${s.title}</option>`).join("")
    + `<option value="other">Sonstiges</option>`;
}

function renderContacts() {
  document.querySelectorAll(".js-wa").forEach((a) => (a.href = waLink("Hallo! Ich hätte gern ein Angebot für eine Reinigung.")));
  document.querySelectorAll(".js-tel").forEach((a) => (a.href = `tel:${CONFIG.phone}`));
  document.querySelectorAll(".js-phone-text").forEach((el) => (el.textContent = CONFIG.phoneDisplay));
}

/* Всё, что зависит от города */
function renderCity() {
  const name = CITIES[city];
  const short = city === "muelheim" ? "Mülheim" : name;

  $("heroBadge").textContent = name ? `${name} & Umgebung · Reinigung direkt bei Ihnen` : "Mülheim an der Ruhr & Umgebung (+35 km)";
  $("heroTitle").innerHTML = `Professionelle Polster- und Teppichreinigung <span class="hl">in ${name ? short : "Mülheim & Umgebung"}</span>`;
  $("contactArea").textContent = name ? `${name} und Umgebung` : "Mülheim an der Ruhr und Umgebung (+35 km)";
  $("areaChips").innerHTML = Object.entries(CITIES)
    .map(([key, n]) => `<li${key === city ? ' class="chip--alt"' : ""}>${n}</li>`).join("");

  document.title = `Polsterreinigung ${name ? short : "Mülheim & Umgebung"} | Nazar Iarovyi`;
}

/* =========================================================
   ОПРЕДЕЛЕНИЕ ГОРОДА ПО IP
   ========================================================= */
const norm = (str) => String(str).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ue/g, "u");

function matchCity(raw, countryCode) {
  if (!raw || (countryCode && countryCode.toUpperCase() !== "DE")) return null;
  const n = norm(raw);
  // «Mülheim an der Ruhr» подходит, «Mülheim-Kärlich» — нет
  return Object.keys(CITIES).find((key) => {
    const k = norm(CITIES[key].split(" ")[0]);
    return n === k || n.startsWith(k + " ");
  }) || null;
}

async function fetchJson(url, ms = 2500) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    return r.ok ? await r.json() : null;
  } finally {
    clearTimeout(timer);
  }
}

async function detectCity() {
  const forced = params.get("city");
  if (forced && CITIES[forced]) return forced;

  try {
    const saved = sessionStorage.getItem("city");
    if (saved !== null) return CITIES[saved] ? saved : null;
  } catch (e) {}

  let found = null;
  for (const url of ["https://get.geojs.io/v1/ip/geo.json", "https://ipapi.co/json/"]) {
    try {
      const d = await fetchJson(url);
      if (d) { found = matchCity(d.city, d.country_code); break; }
    } catch (e) {} // сервис недоступен/заблокирован — пробуем следующий
  }

  try { sessionStorage.setItem("city", found || ""); } catch (e) {}
  return found;
}

/* =========================================================
   АНАЛИТИКА: клики по WhatsApp / звонку = конверсии.
   Подключится автоматически, когда добавишь Google Ads (gtag) или Meta Pixel (fbq).
   ========================================================= */
function track(channel, extra) {
  const data = { event: "lead_click", channel, city: city || "unknown", ...extra };
  (window.dataLayer = window.dataLayer || []).push(data);
  if (typeof window.gtag === "function") window.gtag("event", "generate_lead", data);
  if (typeof window.fbq === "function") window.fbq("track", "Contact", data);
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (!a) return;
  if (a.href.startsWith("https://wa.me/")) track("whatsapp");
  else if (a.href.startsWith("tel:")) track("phone");
});

/* =========================================================
   МОБИЛЬНОЕ МЕНЮ
   ========================================================= */
const burger = $("burger");
const nav = $("nav");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }
});

/* =========================================================
   ФОРМА → WhatsApp (фото клиент отправляет уже в чате)
   ========================================================= */
$("requestForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const name = f.name.value.trim();
  f.name.classList.toggle("is-invalid", !name);
  if (!name) { f.name.focus(); return; }

  const sel = f.service;
  const lines = [
    `Hallo! Ich hätte gern ein Angebot für: ${sel.options[sel.selectedIndex].text}`,
    `Name: ${name}`,
  ];
  if (f.zip.value.trim()) lines.push(`PLZ/Ort: ${f.zip.value.trim()}`);
  if (f.msg.value.trim()) lines.push(`Details: ${f.msg.value.trim()}`);
  lines.push("Fotos schicke ich gleich hier im Chat.");
  track("whatsapp_form", { service: sel.value });
  window.open(waLink(lines.join("\n")), "_blank", "noopener");
});

/* =========================================================
   СТАРТ
   ========================================================= */
$("year").textContent = new Date().getFullYear();
renderContacts();
renderServices();
renderPrices();
renderReviews();
renderFaq();
renderFormOptions();
renderCity(); // сразу показываем Мюльхайм +35 км, потом уточняем по IP
detectCity().then((c) => { city = c; renderCity(); });
