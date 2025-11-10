<script>
(async () => {
  // 1) Datos de páginas
  const S = "https://prod.spline.design/GI4C-E-MV0RERVEJ/scene.splinecode";
  const pages = [
    { letter: "A", title: "Alert 911", desc: "Llama a emergencias.", icon: "emergency_share", spline: S },
    { letter: "B", title: "Bleeding: señales", desc: "Detecta sangrado grave.", icon: "bloodtype", spline: S },
    { letter: "C", title: "Compress: presión", desc: "Aplica presión directa.", icon: "pan_tool_alt", spline: S },
  ];

  // 2) Hooks del DOM
  const viewer = document.querySelector(".spline-box spline-viewer");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("netx") || document.getElementById("next"); // usa tu id
  const countEl = document.getElementById("count");
  const totalEl = document.getElementById("total");
  const cards = Array.from(document.querySelectorAll(".cards .card"));
  const box = document.querySelector(".spline-box");

  // 3) Inyectar estilos CSS dinámicos (animación suave)
  const style = document.createElement("style");
  style.textContent = `
    .cards .card {
      transition: background 0.4s ease, color 0.4s ease;
    }
    .cards .card.active[data-letter="A"] {
      background-color: #ff4747; /* Rojo - Alert 911 */
      color: white;
    }
    .cards .card.active[data-letter="B"] {
      background-color: #ffbb33; /* Amarillo - Bleeding */
      color: white;
    }
    .cards .card.active[data-letter="C"] {
      background-color: #4caf50; /* Verde - Compress */
      color: white;
    }
  `;
  document.head.appendChild(style);

  // 4) Estado inicial
  let idx = 0;
  const pad2 = (n) => String(n).padStart(2, "0");

  const updateUI = () => {
    // Actualiza número y tarjetas
    if (countEl) countEl.textContent = pad2(idx + 1);
    if (totalEl) totalEl.textContent = pad2(pages.length);

    cards.forEach((c, i) => {
      c.classList.toggle("active", i === idx);
    });

    // Cambiar spline si existe
    if (viewer) viewer.setAttribute("url", pages[idx].spline);
  };

  // 5) Navegación
  nextBtn.addEventListener("click", () => {
    idx = (idx + 1) % pages.length; // pasa de C → A
    updateUI();
  });

  prevBtn.addEventListener("click", () => {
    idx = (idx - 1 + pages.length) % pages.length; // retrocede circular
    updateUI();
  });

  // 6) Control con flechas del teclado
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });

  // 7) Click en tarjetas
  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      idx = i;
      updateUI();
    });
  });

  // 8) Inicialización
  if (window.customElements && customElements.whenDefined) {
    await customElements.whenDefined("spline-viewer");
  }
  updateUI();
})();

document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("netx"); // o "netx" si tu id está así
  const cards = Array.from(document.querySelectorAll(".card"));
  let activeIndex = 0; // inicia en la primera card

  function updateCards() {
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === activeIndex);
    });
  }

  // inicializa la primera en naranja
  updateCards();

  // al presionar next
  nextBtn.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % cards.length; // avanza y regresa al inicio
    updateCards();
  });
});

</script>
