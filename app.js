<script>
(async () => {
  // 1) Datos de páginas
  const S = "https://prod.spline.design/GI4C-E-MV0RERVEJ/scene.splinecode";
  const pages = [
    { letter: "A", title: "Alert 911",         desc: "Llama a emergencias.",             icon: "emergency_share", spline: S },
    { letter: "B", title: "Bleeding: señales", desc: "Detecta sangrado grave.",          icon: "bloodtype",        spline: S },
    { letter: "C", title: "Compress: presión", desc: "Aplica presión directa.",          icon: "pan_tool_alt",     spline: S },
  ];

  // 2) Hooks del DOM
  const viewer = document.querySelector(".spline-box spline-viewer");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("netx"); // usa tu id netx
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
      .cards .card.active{
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

  // 5) Estado
  let idx = 0;

  const pad2 = (n) => String(n).padStart(2, "0");
  const setButtonsState = () => {
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === pages.length - 1;
  };
  const highlightCards = () => {
    const letter = pages[idx].letter;
    cards.forEach(c => c.classList.toggle("active", c.dataset.letter === letter));
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
  prevBtn.addEventListener("click", () => {
    if (idx > 0) {
      idx--;
      render();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (idx < pages.length - 1) {
      idx++;
      render();
    } else {
      // Si ya está en la última, vuelve a la primera
      idx = 0;
      render();
    }
  });

  // 7) Teclas (flechas)
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });

  // 8) Click en tarjetas
  const firstIndexOf = (letter) => pages.findIndex(p => p.letter === letter);
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const j = firstIndexOf(card.dataset.letter);
      if (j !== -1) {
        idx = j;
        render();
      }
    });
  });

  // Inicialización
  if (window.customElements && customElements.whenDefined) {
    await customElements.whenDefined("spline-viewer");
  }
  render();
})();
</script>
