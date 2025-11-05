document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.getElementById("netx"); // ojo: tu HTML tiene "netx"
  const cardsSection = document.querySelector(".cards");

  // Crear el contenedor de la imagen
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  imgContainer.innerHTML = `
    <img src="c1eb5d5e-abc4-4420-bf0d-009d06c18f35.png" alt="Bleeding control illustration" />
  `;
  imgContainer.style.display = "none"; // inicialmente oculta

  // Insertarla después de las tarjetas
  cardsSection.appendChild(imgContainer);

  // Alternar visibilidad al hacer clic
  nextButton.addEventListener("click", () => {
    if (imgContainer.style.display === "none") {
      imgContainer.style.display = "block";
    } else {
      imgContainer.style.display = "none";
    }
  });
});
