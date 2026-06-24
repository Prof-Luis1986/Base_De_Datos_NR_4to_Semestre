# Configuración necesaria en Firebase

El código del sitio ya usa el proyecto `intersemestral-cetis`. Para activar el
guardado en producción se requieren estos pasos en Firebase Console:

1. En **Authentication > Sign-in method**, habilitar el proveedor **Google**.
2. En **Authentication > Settings > Authorized domains**, registrar:
   - `prof-luis1986.github.io`
   - `nosql.profmartinez.site`
   - `localhost` para pruebas locales
3. Crear Cloud Firestore en modo nativo.
4. Publicar las reglas incluidas en `firestore.rules`.

Con Firebase CLI instalado y una sesión autorizada, las reglas se pueden
publicar desde esta carpeta con:

```bash
firebase deploy --only firestore:rules
```

## Estructura de datos

```text
usuarios/{uid}
  nombre
  correo
  foto
  ultimaActividad

usuarios/{uid}/practicas/{practicaId}
  practica
  ruta
  titulo
  respuestas
  porcentaje
  completada
  fechaActualizacion
```

La clave web de Firebase incluida en `firebase-config.js` identifica el
proyecto y no funciona como contraseña. La protección depende de
Authentication y de las reglas de Firestore.

## Envío por correo con Apps Script

1. Crear un proyecto en Google Apps Script.
2. Copiar el contenido de `apps-script/Code.gs`.
3. Implementar como **Aplicación web**:
   - Ejecutar como: el propietario.
   - Quién tiene acceso: cualquier usuario.
4. Autorizar Gmail cuando Google lo solicite.
5. Copiar la URL terminada en `/exec`.
6. Pegarla en `apps-script-config.js`:

```javascript
window.SCHOOL_APPS_SCRIPT_URL = "https://script.google.com/macros/s/.../exec";
```

El envío llegará a:

- `luisalfonsomartinez@cetis50cdmx.com`
- `lmartinez@cetis50cdmx.edu.mx`
