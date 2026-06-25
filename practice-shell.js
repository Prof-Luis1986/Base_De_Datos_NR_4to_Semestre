(() => {
  const number = Number(document.body.dataset.practice);
  const titles = {
    11: "Consulta de datos con Flet",
    12: "Registro de datos con Flet",
    13: "Buscador de registros con Flet",
    14: "Actualización de registros con Flet",
    15: "Eliminación segura con Flet",
    16: "Panel administrativo con Flet",
    17: "Proyecto integrador CRUD con Flet",
  };

  const link = (n) =>
    `<a ${n === number ? 'class="active"' : ""} href="practica-${n}.html">Práctica ${n} — ${titles[n]}</a>`;

  document.querySelector("#practice-shell").innerHTML = `
    <div class="layout">
      <aside class="sidebar">
        <h1 class="brand">📘 Bases de Datos<br />No Relacionales</h1>
        <div class="nav-title">Menú</div>
        <nav class="nav" aria-label="Navegación principal">
          <a href="index.html">Inicio</a>
          <details class="nav-section">
            <summary>Unidad 0 · Contextualización y Evolución</summary>
            <div class="nav-links">
              <a href="practica-0.html">Práctica 0 — Fundamentos NoSQL</a>
              <a href="practica-0-1.html">Práctica 0.1 — Sintaxis MongoDB</a>
            </div>
          </details>
          <details class="nav-section">
            <summary>Unidad I · Fundamentos y Arquitecturas</summary>
            <div class="nav-links">
              ${[1, 2, 3, 4, 5, 6].map((n) => `<a href="practica-${n}.html">Práctica ${n}</a>`).join("")}
            </div>
          </details>
          <details class="nav-section">
            <summary>Unidad II · Modelado Documental</summary>
            <div class="nav-links">
              ${[7, 8, 9, 10].map((n) => `<a href="practica-${n}.html">Práctica ${n}</a>`).join("")}
            </div>
          </details>
          <details class="nav-section" open>
            <summary>Unidad III · Aplicaciones visuales con Firebase</summary>
            <div class="nav-links">
              ${[11, 12, 13, 14, 15, 16, 17].map(link).join("")}
              <a href="practica-18.html">Práctica 18 — Aplicación final ABP</a>
            </div>
          </details>
          <details class="nav-section">
            <summary>Unidad ABP · Aprendizaje Basado en Proyectos</summary>
            <div class="nav-links"><a href="practica-abp.html">Proyectos ABP</a></div>
          </details>
        </nav>
      </aside>
      <main class="content">
        <section class="card" data-crud-practice="${number}"></section>
      </main>
    </div>
  `;
})();
