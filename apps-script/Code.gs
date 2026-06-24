const DESTINATARIOS = [
  "luisalfonsomartinez@cetis50cdmx.com",
  "lmartinez@cetis50cdmx.edu.mx",
].join(",");

function escaparHtml(valor) {
  return String(valor || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const respuestas = Array.isArray(data.respuestas) ? data.respuestas : [];
    if (!data.nombre || !data.grupo || !data.correo || !data.practica) {
      throw new Error("Faltan datos obligatorios.");
    }

    const fecha = new Date(data.fecha || Date.now()).toLocaleString("es-MX", {
      timeZone: "America/Mexico_City",
    });
    const detalle = respuestas.map((item, index) => `
      <div style="margin:0 0 16px;padding:12px;border:1px solid #eadfe3;border-radius:10px">
        <p><strong>Pregunta ${index + 1}:</strong> ${escaparHtml(item.pregunta)}</p>
        <p style="white-space:pre-wrap"><strong>Respuesta:</strong> ${escaparHtml(item.respuesta)}</p>
      </div>`).join("");
    const cuerpo = `
      <div style="font-family:Arial,sans-serif;color:#2b2b2b">
        <h2 style="color:#5c162e">Respuestas de práctica</h2>
        <p><strong>Alumno:</strong> ${escaparHtml(data.nombre)}</p>
        <p><strong>Grupo:</strong> ${escaparHtml(data.grupo)}</p>
        <p><strong>Correo:</strong> ${escaparHtml(data.correo)}</p>
        <p><strong>Práctica:</strong> ${escaparHtml(data.practica)}</p>
        <p><strong>Fecha:</strong> ${escaparHtml(fecha)}</p>
        <p><strong>Avance:</strong> ${escaparHtml(data.porcentaje || "Sin dato")}</p>
        <hr>${detalle}
      </div>`;

    GmailApp.sendEmail(
      DESTINATARIOS,
      `Respuestas enviadas - ${data.practica}`,
      "Se recibieron respuestas desde la plataforma escolar.",
      {
        htmlBody: cuerpo,
        name: "Plataforma escolar CETIS 50",
        replyTo: data.correo,
      },
    );

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, servicio: "Plataforma escolar CETIS 50" }))
    .setMimeType(ContentService.MimeType.JSON);
}
