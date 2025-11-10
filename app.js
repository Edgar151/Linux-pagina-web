<script>
(async () => {
  // 1) Datos de páginas (15 ejemplos). Cambia spline según tus escenas.
  const S = "https://prod.spline.design/GI4C-E-MV0RERVEJ/scene.splinecode";
  const pages = [
    { letter: "A", title: "Alert 911",         desc: "Llama a emergencias.",               icon: "emergency_share", spline: S },
    { letter: "B", title: "Bleeding: señales", desc: "Detecta sangrado grave.",            icon: "bloodtype",        spline: S },
    { letter: "C", title: "Compress: presión", desc: "Aplica presión directa.",            icon: "pan_tool_alt",     spline: S },
    { letter: "A", title: "Ubicación",         desc: "Indica dónde estás.",                icon: "my_location",      spline: S },
    { letter: "B", title: "Hemorragias A/B/C", desc: "Extremidad, torácica, abdominal.",   icon: "monitor_heart",    spline: S },
    { letter: "C", title: "Empaquetado",       desc: "Relleno de la herida (gauze).",      icon: "inventory_2",      spline: S },
    { letter: "C", title: "Torniquete",        desc: "Cuándo y cómo usarlo.",              icon: "watch",            spline: S },
    { letter: "B", title: "Puntos de presión", desc: "Compresión proximal.",               icon: "gesture",          spline: S },
    { letter: "A", title: "Escena segura",     desc: "Evalúa riesgos primero.",            icon: "warning",          spline: S },
    { letter: "A", title: "Pedir ayuda",       desc: "Coordina a más personas.",           icon: "group",            spline: S },
    { letter: "B", title: "Re-evaluación",     desc: "Comprueba si cesa el sangrado.",     icon: "loop",             spline: S },
    { letter: "C", title: "Vendaje",           desc: "Fijar la compresión.",               icon: "stacks",           spline: S },
    { letter: "B", title: "Shock",             desc: "Reconocer signos de shock.",         icon: "density_small",    spline: S },
    { letter: "A", title: "Traslado",          desc: "Prioriza el transporte.",            icon: "local_hospital",   spline: S },
    { letter: "C", title: "Resumen",           desc: "Repaso A-B-C completo.",             icon: "check_circle",     spline: S },
  ];

  // 2) Hooks del DOM
  const viewer = document.querySelector(".spline-box spline-viewer");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("netx"); // 👈 usa 'netx' aquí
  const countEl = document.getElementById("count");
  const totalEl = document.getElementById("total");
  const cards   = Array.from(document.querySelectorAll(".cards .card"));
  const box     = document.querySelector(".spline-box");

  // 3) CSS mínimo inyectado
  const injectStyles = () => {
    const css = `
      .spline-box{ position:relative; }
      .spline-loader{
        position:absolute; inset:0; display:none; place-items:center;
        font:600 13px/1 system-ui,-apple-system,Segoe UI,Roboto;
        background:linear-gradient(180deg, rgba(11,18,32,.85), rgba(11,18,32,.6));
        backdrop-filter: blur(4px) saturate(130%); color:#e8edff;
      }
      .spline-loader.show{ display:grid; }
      .cards .card.is-active{
        outline:2px solid var(--accent, #5468ff);
        box-shadow: 0 8px 24px rgba(84,104,255,.25);
      }
      .toolbar .btn[disabled]{ opacity:.5; pointer-events:none; }
      /* 🎨 clase activa para cambio de color */
      .card.active{
        background: var(--blue);
        color: #fff;
        transition: background 0.4s ease, color 0.4s ease;
      }
    `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  };

  injectStyles();

  // 4) Loader
  const loader = document.createElement("div");
  loader.className = "spline-loader";
  loader.textContent = "Cargando escena…";
  box.appendChild(loader);
  const showLoader = () => loader.classList.add("show");
  const hideLoader = () => loader.classList.remove("show");

  // 5) Estado/paginado
  let idx = 0;

  const pad2 = (n) => String(n).padStart(2, "0");
  const setButtonsState = () => {
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === pages.length - 1;
  };
  const highlightCards = () => {
    const letter = pages[idx].letter;
    cards.forEach(c => c.classList.toggle("is-active", c.dataset.letter === letter));
  };
  const setSpline = (url) => {
    if (!viewer) return;
    showLoader();
    const onLoaded = () => {
      viewer.removeEventListener("load", onLoaded);
      hideLoader();
    };
    viewer.addEventListener("load", onLoaded, { once: true });
    viewer.setAttribute("url", url);
  };
  const render = () => {
    countEl.textContent = pad2(idx + 1);
    totalEl.textContent = pad2(pages.length);
    setButtonsState();
    highlightCards();
    setSpline(pages[idx].spline);
  };

  // 6) Navegación
  prevBtn.addEventListener("click", () => { if (idx > 0) { idx--; render(); } });
  nextBtn.addEventListener("click", () => { if (idx < pages.length - 1) { idx++; render(); } });

  // 🔄 Efecto de cambio de color entre tarjetas
  let activeIndex = 0;
  const allCards = document.querySelectorAll(".card");

  function updateCardColors() {
    allCards.forEach((card, i) => {
      card.classList.toggle("active", i === activeIndex);
    });
  }

  updateCardColors(); // estado inicial

  nextBtn.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % allCards.length;
    updateCardColors();
  });

  // Flechas de teclado
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft")  prevBtn.click();
  });

  // Clic en tarjeta => ir a la primera página con esa letra
  const firstIndexOf = (letter) => pages.findIndex(p => p.letter === letter);
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const j = firstIndexOf(card.dataset.letter);
      if (j !== -1) { idx = j; render(); }
    });
  });

  // 7) Espera al elemento spline antes del primer render
  if (window.customElements && customElements.whenDefined) {
    await customElements.whenDefined("spline-viewer");
  }
  render();
})();


// 🔄 Efecto de cambio de color entre tarjetas (usa el botón con id="netx")
const nextBtn = document.getElementById("netx");
const allCards = document.querySelectorAll(".card");
let activeIndex = 0;

function updateCardColors() {
  allCards.forEach((card, i) => {
    card.classList.toggle("active", i === activeIndex);
  });
}

// Estado inicial: primera tarjeta activa
updateCardColors();

nextBtn.addEventListener("click", () => {
  activeIndex = (activeIndex + 1) % allCards.length;
  updateCardColors();
});

</script>
