const CRUD_PRACTICES = {
  11: {
    title: "Visualización avanzada de registros",
    icon: "📋",
    duration: "2 sesiones",
    context:
      "El registro de plantas ya guarda documentos en la colección plantas. Ahora el equipo necesita convertir esos documentos en información legible, ordenada y útil dentro de la misma aplicación Flet.",
    situation:
      "La brigada ambiental presentará el inventario del plantel. Los datos existen en Firebase, pero una lista sin formato no permite comparar nombres, tipos, responsables y ubicaciones.",
    expected: [
      "Recupera documentos de Firestore y conserva el ID de cada documento.",
      "Recorre los resultados con un ciclo y transforma cada documento en una fila.",
      "Presenta valores consistentes y controla campos ausentes sin detener la app.",
    ],
    materials: [
      "Proyecto PlantApp terminado hasta la práctica 10.",
      "Colección plantas con al menos cinco documentos.",
      "Entorno virtual con flet y firebase-admin ya configurados.",
      "Archivo conexion_firebase.py y credencial previamente probados.",
    ],
    previous: [
      "Se conserva el formulario, la conexión existente y la función para guardar.",
      "Se reutiliza la colección plantas y el modelo de campos acordado.",
    ],
    newParts: [
      "Función obtener_plantas() que añade doc.id a cada diccionario.",
      "DataTable dinámica y función cargar_tabla().",
      "Formato para textos vacíos y contador visible de registros.",
    ],
    steps: [
      ["1. Preparar la tabla", "Localiza la tabla de ejemplo de la práctica 9. Elimina sus filas fijas y guarda el control en la variable tabla_plantas."],
      ["2. Recuperar documentos", "En conexion_firebase.py crea una función que use stream(). Cada elemento recibido es un DocumentSnapshot."],
      ["3. Conservar el identificador", "Convierte el snapshot con to_dict() y agrega item['id'] = doc.id. El ID será indispensable para editar y eliminar después."],
      ["4. Construir filas", "Recorre la lista y crea un DataRow por planta. Usa get(campo, valor) para que un campo ausente no provoque KeyError."],
      ["5. Actualizar la interfaz", "Asigna las filas a tabla_plantas.rows, actualiza el contador y ejecuta page.update()."],
      ["6. Verificar el recorrido", "Agrega dos documentos desde Firebase Console, pulsa Actualizar y comprueba que cada documento produzca exactamente una fila."],
    ],
    snippetTitle: "Código incremental: lectura y tabla dinámica",
    snippet: `# conexion_firebase.py
def obtener_plantas():
    registros = []
    documentos = db.collection("plantas").stream()

    for doc in documentos:
        planta = doc.to_dict()
        planta["id"] = doc.id
        registros.append(planta)

    return registros


# main.py — controles nuevos
tabla_plantas = ft.DataTable(
    columns=[
        ft.DataColumn(ft.Text("Nombre")),
        ft.DataColumn(ft.Text("Tipo")),
        ft.DataColumn(ft.Text("Responsable")),
        ft.DataColumn(ft.Text("Ubicación")),
        ft.DataColumn(ft.Text("Estado")),
    ],
    rows=[],
)
contador = ft.Text("0 registros")


def texto(valor, reemplazo="Sin dato"):
    return str(valor).strip() if valor not in (None, "") else reemplazo


def cargar_tabla():
    registros = obtener_plantas()
    tabla_plantas.rows = [
        ft.DataRow(
            data=planta["id"],
            cells=[
                ft.DataCell(ft.Text(texto(planta.get("nombre_comun")))),
                ft.DataCell(ft.Text(texto(planta.get("tipo_planta")))),
                ft.DataCell(ft.Text(texto(planta.get("alumno_responsable")))),
                ft.DataCell(ft.Text(texto(planta.get("ubicacion")))),
                ft.DataCell(ft.Text(texto(planta.get("estado"), "Pendiente"))),
            ],
        )
        for planta in registros
    ]
    contador.value = f"{len(registros)} registros"
    page.update()`,
    explanation: [
      ["stream()", "Solicita los documentos de la colección y permite recorrerlos uno a uno."],
      ["doc.to_dict()", "Convierte los campos del documento en un diccionario de Python."],
      ["doc.id", "Recupera el identificador real de Firestore; no forma parte de to_dict()."],
      ["DataRow.data", "Guarda el ID detrás de la fila sin mostrarlo. Se reutilizará en las prácticas 13 y 14."],
      ["get()", "Lee un campo de forma segura y permite definir un valor alternativo."],
      ["page.update()", "Refresca los controles después de cambiar filas y contador."],
    ],
    guided: [
      "Registra o confirma cinco plantas con tipos y ubicaciones diferentes.",
      "Ejecuta la app y pulsa el botón Actualizar registros.",
      "Compara un documento en Firebase Console con su fila en Flet.",
      "Explica con flechas el recorrido: colección → snapshot → diccionario → DataRow.",
    ],
    challenge:
      "Ordena visualmente la lista por nombre común antes de crear las filas y agrega una columna corta con los primeros ocho caracteres del ID.",
    reflection: [
      "¿Por qué el ID debe agregarse manualmente al diccionario?",
      "¿Qué diferencia existe entre un documento, un snapshot y una fila?",
      "¿Qué ocurriría si un documento no incluye el campo ubicación?",
      "¿En qué momento se actualiza la pantalla?",
    ],
    evidence: [
      "Captura de la tabla con al menos cinco registros reales.",
      "Código de obtener_plantas() y cargar_tabla().",
      "Diagrama del recorrido de un documento.",
      "Respuesta breve a las preguntas de reflexión.",
    ],
  },
  12: {
    title: "Búsqueda de información",
    icon: "🔎",
    duration: "2 sesiones",
    context:
      "La tabla de la práctica 11 funciona, pero crecerá con cada recorrido de campo. La aplicación necesita encontrar una planta sin obligar al usuario a revisar todas las filas.",
    situation:
      "Una docente solicita localizar rápidamente una planta por nombre o por el identificador que aparece en el reporte. También necesita filtrar por tipo y recibir un mensaje claro si no hay coincidencias.",
    expected: [
      "Busca documentos por coincidencia de nombre y por ID exacto.",
      "Combina la búsqueda con un filtro básico de tipo.",
      "Distingue entre una consulta sin resultados y un error de conexión.",
    ],
    materials: [
      "Proyecto completado hasta la práctica 11.",
      "Tabla dinámica funcionando.",
      "IDs de dos documentos de prueba.",
      "Colección plantas con nombres y tipos variados.",
    ],
    previous: [
      "Se conservan obtener_plantas(), texto(), tabla_plantas y cargar_tabla().",
      "La tabla continúa usando DataRow.data para guardar cada ID.",
    ],
    newParts: [
      "Campo de búsqueda y selector de criterio.",
      "Consulta directa con document(id).get().",
      "Filtro por nombre y tipo, y estado vacío con mensaje.",
    ],
    steps: [
      ["1. Agregar controles", "Añade un TextField para el término, un Dropdown con Nombre o ID y otro Dropdown para el tipo."],
      ["2. Buscar por ID", "Cuando el criterio sea ID, usa document(valor).get(). Comprueba snapshot.exists antes de convertirlo."],
      ["3. Buscar por nombre", "Recupera los documentos y compara textos normalizados con casefold(). Así la búsqueda no dependerá de mayúsculas."],
      ["4. Aplicar el filtro", "Si se seleccionó un tipo, conserva únicamente los registros cuyo tipo_planta coincida."],
      ["5. Reutilizar la tabla", "Modifica cargar_tabla para aceptar una lista opcional. No construyas una segunda tabla."],
      ["6. Comunicar resultados", "Muestra 'Sin resultados' cuando la consulta termina correctamente con una lista vacía; reserva 'Error' para excepciones."],
    ],
    snippetTitle: "Código incremental: búsqueda y filtros",
    snippet: `# conexion_firebase.py
def buscar_por_id(documento_id):
    doc = db.collection("plantas").document(documento_id).get()
    if not doc.exists:
        return []

    planta = doc.to_dict()
    planta["id"] = doc.id
    return [planta]


# main.py
busqueda = ft.TextField(label="Nombre o ID", expand=True)
criterio = ft.Dropdown(
    label="Buscar por",
    value="Nombre",
    options=[ft.dropdown.Option("Nombre"), ft.dropdown.Option("ID")],
)
filtro_tipo = ft.Dropdown(
    label="Tipo",
    value="Todos",
    options=[
        ft.dropdown.Option("Todos"),
        ft.dropdown.Option("Ornamental"),
        ft.dropdown.Option("Medicinal"),
        ft.dropdown.Option("Aromática"),
        ft.dropdown.Option("Frutal"),
    ],
)
mensaje_resultado = ft.Text()


def buscar_registros(e):
    termino = busqueda.value.strip()

    try:
        if criterio.value == "ID":
            resultados = buscar_por_id(termino) if termino else []
        else:
            resultados = obtener_plantas()
            if termino:
                termino_normalizado = termino.casefold()
                resultados = [
                    planta for planta in resultados
                    if termino_normalizado
                    in planta.get("nombre_comun", "").casefold()
                ]

        if filtro_tipo.value != "Todos":
            resultados = [
                planta for planta in resultados
                if planta.get("tipo_planta") == filtro_tipo.value
            ]

        cargar_tabla(resultados)
        mensaje_resultado.value = (
            f"{len(resultados)} coincidencia(s)"
            if resultados else
            "No existen registros con esos criterios."
        )
    except Exception as error:
        mensaje_resultado.value = f"No se pudo buscar: {error}"

    page.update()`,
    explanation: [
      ["document(id).get()", "Hace una lectura directa cuando se conoce el ID completo."],
      ["snapshot.exists", "Permite saber si el documento solicitado realmente existe."],
      ["casefold()", "Normaliza texto para comparar de forma más robusta que lower()."],
      ["Lista por comprensión", "Produce una nueva lista que conserva solo las coincidencias."],
      ["Lista vacía", "Representa una búsqueda válida sin resultados; no significa que Firebase falló."],
      ["cargar_tabla(resultados)", "Reutiliza la misma presentación de la práctica anterior."],
    ],
    guided: [
      "Busca una planta usando parte de su nombre en minúsculas.",
      "Copia un ID desde Firebase y localízalo con el criterio ID.",
      "Combina un nombre con un tipo que no corresponda y verifica el mensaje.",
      "Limpia los filtros y vuelve a mostrar todos los documentos.",
    ],
    challenge:
      "Agrega un filtro por estado y un botón Limpiar búsqueda que restablezca controles, mensajes y tabla sin reiniciar la aplicación.",
    reflection: [
      "¿Cuándo conviene buscar por ID y cuándo por nombre?",
      "¿Por qué una coincidencia parcial se filtra en Python en esta versión?",
      "¿Cómo distingue la interfaz un resultado vacío de un error?",
      "¿Qué función de la práctica 11 se reutilizó?",
    ],
    evidence: [
      "Capturas de una búsqueda por nombre y otra por ID.",
      "Captura del mensaje sin resultados.",
      "Código de buscar_registros().",
      "Tabla de pruebas con criterio, entrada y resultado esperado.",
    ],
  },
  13: {
    title: "Actualización de registros",
    icon: "✏️",
    duration: "2 sesiones",
    context:
      "Los registros ya pueden consultarse y buscarse. El siguiente paso del mismo sistema es corregir información sin crear documentos duplicados.",
    situation:
      "Durante la revisión del inventario se detecta que una planta cambió de ubicación y que otra tiene un nombre escrito incorrectamente. El responsable debe seleccionar la fila, editar el formulario y guardar los cambios.",
    expected: [
      "Selecciona una fila y conserva el ID del documento.",
      "Carga la información existente en controles editables.",
      "Actualiza Firebase y comprueba el cambio en la tabla y en la consola.",
    ],
    materials: [
      "Proyecto completado hasta la práctica 12.",
      "Búsqueda y tabla funcionando.",
      "Dos registros creados específicamente para pruebas.",
      "Acceso a Firebase Console para verificar cambios.",
    ],
    previous: [
      "Se conservan los controles del formulario original.",
      "Se reutilizan tabla_plantas, cargar_tabla(), buscar_registros() y el ID guardado en cada fila.",
    ],
    newParts: [
      "Variable registro_seleccionado_id.",
      "Botón Editar por fila y función seleccionar_registro().",
      "Función actualizar_planta() con document(id).update().",
    ],
    steps: [
      ["1. Añadir acciones", "Agrega una columna Acciones y un IconButton de edición en cada DataRow."],
      ["2. Capturar el ID", "Envía el diccionario de la planta en el evento o usa una función lambda con un argumento predeterminado."],
      ["3. Llenar el formulario", "Asigna los valores del documento a los controles existentes. El usuario debe ver qué dato modificará."],
      ["4. Cambiar el modo", "Guarda el ID seleccionado y cambia el texto del botón principal de Guardar a Actualizar."],
      ["5. Escribir cambios", "Construye un diccionario validado y ejecuta update() sobre el documento exacto."],
      ["6. Confirmar", "Limpia la selección, recarga la tabla y verifica el mismo ID en Firebase Console."],
    ],
    snippetTitle: "Código incremental: selección y actualización",
    snippet: `# conexion_firebase.py
def actualizar_planta(documento_id, cambios):
    db.collection("plantas").document(documento_id).update(cambios)


# main.py
registro_seleccionado_id = None
boton_guardar = ft.FilledButton("Guardar registro")


def seleccionar_registro(planta):
    nonlocal registro_seleccionado_id
    registro_seleccionado_id = planta["id"]

    nombre_comun.value = planta.get("nombre_comun", "")
    nombre_cientifico.value = planta.get("nombre_cientifico", "")
    tipo_planta.value = planta.get("tipo_planta")
    alumno_responsable.value = planta.get("alumno_responsable", "")
    ubicacion.value = planta.get("ubicacion", "")
    estado.value = planta.get("estado", "Activa")

    boton_guardar.text = "Actualizar registro"
    page.update()


def guardar_o_actualizar(e):
    nonlocal registro_seleccionado_id
    error = validar_formulario()
    if error:
        mostrar_mensaje(error, es_error=True)
        return

    datos = obtener_datos_formulario()

    try:
        if registro_seleccionado_id:
            actualizar_planta(registro_seleccionado_id, datos)
            mostrar_mensaje("Registro actualizado correctamente.")
        else:
            guardar_en_firebase(datos)
            mostrar_mensaje("Registro creado correctamente.")

        registro_seleccionado_id = None
        boton_guardar.text = "Guardar registro"
        limpiar_formulario()
        cargar_tabla()
    except Exception as error:
        mostrar_mensaje(f"No se guardaron los cambios: {error}", True)`,
    explanation: [
      ["nonlocal", "Permite modificar la variable de selección definida dentro de main() desde funciones internas."],
      ["registro_seleccionado_id", "Distingue el modo crear del modo actualizar."],
      ["update(cambios)", "Modifica campos del documento existente sin crear otro ID."],
      ["Asignación a .value", "Carga el documento seleccionado en los controles que el alumno ya construyó."],
      ["Botón reutilizado", "Una misma acción decide si crea o actualiza según exista una selección."],
      ["Recarga final", "Confirma visualmente que Firebase y la tabla muestran los mismos datos."],
    ],
    guided: [
      "Selecciona una planta y cambia únicamente su ubicación.",
      "Comprueba que el ID siga siendo el mismo después de actualizar.",
      "Busca el registro modificado por nombre.",
      "Actualiza dos campos más y documenta el antes y el después.",
    ],
    challenge:
      "Agrega un botón Cancelar edición que limpie la selección y restaure el formulario sin escribir cambios en Firebase.",
    reflection: [
      "¿Por qué no se debe usar add() para editar?",
      "¿Qué dato conecta la fila con el documento correcto?",
      "¿Cómo sabe el botón si debe crear o actualizar?",
      "¿Por qué se recarga la tabla después de update()?",
    ],
    evidence: [
      "Capturas antes y después de una actualización.",
      "Documento con el mismo ID en Firebase Console.",
      "Código de seleccionar_registro() y guardar_o_actualizar().",
      "Registro de tres casos de prueba.",
    ],
  },
  14: {
    title: "Eliminación segura de registros",
    icon: "🗑️",
    duration: "2 sesiones",
    context:
      "El sistema ya crea, consulta, busca y actualiza. Eliminar completa las operaciones esenciales, pero también introduce la acción con mayor riesgo de pérdida accidental.",
    situation:
      "Un registro de prueba fue capturado dos veces. El equipo necesita retirarlo, pero debe confirmar el nombre y evitar que un clic accidental borre información válida.",
    expected: [
      "Elimina el documento exacto mediante su ID.",
      "Solicita confirmación antes de ejecutar una acción irreversible.",
      "Maneja errores y aplica medidas básicas para reducir pérdidas accidentales.",
    ],
    materials: [
      "Proyecto completado hasta la práctica 13.",
      "Un documento de prueba que pueda eliminarse.",
      "Tabla con columna de acciones.",
      "Acceso a Firebase Console para confirmar el resultado.",
    ],
    previous: [
      "Se conserva la selección por ID implementada para editar.",
      "Se reutilizan cargar_tabla(), mostrar_mensaje() y la columna Acciones.",
    ],
    newParts: [
      "Botón Eliminar por fila.",
      "AlertDialog con nombre, Cancelar y Eliminar.",
      "Función eliminar_planta() y control de excepciones.",
    ],
    steps: [
      ["1. Crear la operación", "Añade eliminar_planta(id) en la capa de conexión. La función debe recibir un ID, nunca un nombre."],
      ["2. Agregar el botón", "Coloca un icono de papelera junto al botón Editar de cada fila."],
      ["3. Preparar el diálogo", "Muestra el nombre de la planta y explica que la acción no se puede deshacer."],
      ["4. Cancelar de forma segura", "El botón Cancelar solo cierra el diálogo; no debe llamar a Firebase."],
      ["5. Confirmar y manejar errores", "Ejecuta delete() dentro de try/except, cierra el diálogo y muestra el resultado."],
      ["6. Verificar", "Recarga la tabla y confirma en Firebase Console que el documento específico ya no existe."],
    ],
    snippetTitle: "Código incremental: confirmación y eliminación",
    snippet: `# conexion_firebase.py
def eliminar_planta(documento_id):
    db.collection("plantas").document(documento_id).delete()


# main.py
def solicitar_eliminacion(planta):
    def cerrar_dialogo(e):
        dialogo.open = False
        page.update()

    def confirmar_eliminacion(e):
        try:
            eliminar_planta(planta["id"])
            dialogo.open = False
            cargar_tabla()
            mostrar_mensaje("Registro eliminado correctamente.")
        except Exception as error:
            dialogo.open = False
            mostrar_mensaje(f"No se pudo eliminar: {error}", True)

    dialogo = ft.AlertDialog(
        modal=True,
        title=ft.Text("Confirmar eliminación"),
        content=ft.Text(
            f"Se eliminará '{planta.get('nombre_comun', 'Sin nombre')}'. "
            "Esta acción no se puede deshacer."
        ),
        actions=[
            ft.TextButton("Cancelar", on_click=cerrar_dialogo),
            ft.FilledButton(
                "Eliminar",
                icon=ft.Icons.DELETE_FOREVER,
                on_click=confirmar_eliminacion,
                style=ft.ButtonStyle(bgcolor="#B3261E", color="#FFFFFF"),
            ),
        ],
        actions_alignment=ft.MainAxisAlignment.END,
    )
    page.open(dialogo)`,
    explanation: [
      ["delete()", "Elimina el documento cuya referencia contiene el ID indicado."],
      ["AlertDialog.modal", "Obliga a resolver la confirmación antes de volver a la pantalla principal."],
      ["Función interna", "Conserva planta y dialogo disponibles al confirmar o cancelar."],
      ["try/except", "Evita que un problema de red cierre la app y comunica que la operación no terminó."],
      ["Recarga posterior", "La fila desaparece solo después de solicitar la eliminación."],
      ["ID, no nombre", "Evita borrar el documento incorrecto cuando dos plantas comparten nombre."],
    ],
    guided: [
      "Crea una planta llamada REGISTRO DE PRUEBA.",
      "Pulsa Eliminar y primero elige Cancelar; confirma que continúa visible.",
      "Repite la acción, confirma y verifica que desaparece.",
      "Desconecta temporalmente la red y observa el mensaje de error sin borrar otro registro.",
    ],
    challenge:
      "Implementa borrado lógico: en lugar de delete(), cambia estado a 'Archivada' y oculta esos registros con un filtro. Explica cuándo sería preferible.",
    reflection: [
      "¿Por qué eliminar por nombre es peligroso?",
      "¿Qué diferencia existe entre borrar y archivar?",
      "¿En qué momento debe desaparecer la fila?",
      "¿Qué respaldos o permisos usarías en un sistema real?",
    ],
    evidence: [
      "Captura del diálogo de confirmación.",
      "Prueba documentada de Cancelar y Confirmar.",
      "Código de eliminar_planta() y solicitar_eliminacion().",
      "Lista de tres buenas prácticas contra pérdida accidental.",
    ],
  },
  15: {
    title: "Autenticación con Firebase",
    icon: "🔐",
    duration: "3 sesiones",
    context:
      "El CRUD de plantas ya funciona, pero cualquier persona que abra la interfaz puede intentar usarlo. En esta etapa se incorpora identidad para mostrar el sistema solo después de iniciar sesión.",
    situation:
      "La coordinación ambiental quiere saber quién utiliza PlantApp. Los alumnos autorizados deben iniciar sesión, ver su correo y cerrar la sesión al terminar.",
    expected: [
      "Inicia sesión con un usuario previamente registrado en Firebase Authentication.",
      "Conserva datos mínimos de la sesión y cambia entre vista de acceso y aplicación.",
      "Cierra sesión y explica el alcance real de la protección implementada.",
    ],
    materials: [
      "Proyecto completado hasta la práctica 14.",
      "Proveedor Correo/contraseña ya habilitado.",
      "Un usuario de prueba creado por el docente.",
      "Clave web del proyecto guardada en una variable de entorno.",
      "Paquete requests instalado.",
    ],
    previous: [
      "Todo el CRUD se conserva dentro de la vista principal.",
      "No se modifica la colección plantas ni se repite la configuración de Firebase.",
    ],
    newParts: [
      "Servicio auth_service.py para signInWithPassword.",
      "Vista de inicio de sesión y estado sesion_actual.",
      "Cierre de sesión y bloqueo visual de la vista CRUD.",
    ],
    steps: [
      ["1. Proteger la clave", "Guarda FIREBASE_WEB_API_KEY en una variable de entorno. No escribas contraseñas de usuarios ni la cuenta de servicio en el repositorio."],
      ["2. Crear el servicio", "Envía correo y contraseña al endpoint signInWithPassword y controla respuestas no exitosas."],
      ["3. Diseñar el acceso", "Crea campos correo y contraseña; configura password=True y can_reveal_password=True."],
      ["4. Cambiar de vista", "Si el acceso es correcto, conserva localId, email e idToken y muestra la vista CRUD."],
      ["5. Cerrar sesión", "Elimina los datos de sesión, limpia los controles sensibles y regresa al formulario de acceso."],
      ["6. Analizar seguridad", "Reconoce que firebase-admin usa privilegios de servidor y omite reglas. La cuenta de servicio debe permanecer en un entorno confiable."],
    ],
    snippetTitle: "Código incremental: inicio y cierre de sesión",
    snippet: `# auth_service.py
import os
import requests

API_KEY = os.environ["FIREBASE_WEB_API_KEY"]
URL_LOGIN = (
    "https://identitytoolkit.googleapis.com/v1/"
    f"accounts:signInWithPassword?key={API_KEY}"
)


def iniciar_sesion(correo, contrasena):
    respuesta = requests.post(
        URL_LOGIN,
        json={
            "email": correo,
            "password": contrasena,
            "returnSecureToken": True,
        },
        timeout=10,
    )
    datos = respuesta.json()

    if not respuesta.ok:
        codigo = datos.get("error", {}).get("message", "ERROR_DESCONOCIDO")
        raise ValueError(traducir_error(codigo))

    return {
        "uid": datos["localId"],
        "email": datos["email"],
        "id_token": datos["idToken"],
    }


# main.py
sesion_actual = None


def acceder(e):
    nonlocal sesion_actual
    try:
        sesion_actual = iniciar_sesion(correo.value.strip(), clave.value)
        usuario_activo.value = sesion_actual["email"]
        mostrar_vista_crud()
    except (ValueError, requests.RequestException) as error:
        mensaje_login.value = str(error)
        page.update()


def cerrar_sesion(e):
    nonlocal sesion_actual
    sesion_actual = None
    clave.value = ""
    mostrar_vista_login()`,
    explanation: [
      ["API key", "Identifica el proyecto para usar Firebase Auth; debe leerse desde el entorno, no mezclarse con contraseñas."],
      ["signInWithPassword", "Verifica las credenciales mediante el servicio de Firebase Authentication."],
      ["idToken", "Token temporal que representa la sesión autenticada."],
      ["localId", "UID estable del usuario autenticado."],
      ["sesion_actual", "Controla qué vista se muestra mientras la aplicación está abierta."],
      ["Advertencia Admin SDK", "firebase-admin está pensado para entornos confiables y no aplica las reglas de seguridad del cliente."],
    ],
    guided: [
      "Intenta entrar con una contraseña incorrecta y documenta el mensaje.",
      "Inicia sesión con el usuario de prueba y verifica el correo visible.",
      "Consulta y busca un registro después de autenticarte.",
      "Cierra sesión y confirma que el CRUD ya no está visible.",
    ],
    challenge:
      "Registra en cada documento creado los campos creado_por_uid y creado_por_correo, tomados de sesion_actual, y muéstralos solo en el detalle.",
    reflection: [
      "¿Cuál es la diferencia entre la API key, la contraseña y el idToken?",
      "¿Por qué ocultar botones no sustituye reglas o un backend?",
      "¿Qué información mínima debe conservar la sesión?",
      "¿Por qué no debe distribuirse la cuenta de servicio?",
    ],
    evidence: [
      "Capturas del acceso fallido, acceso correcto y cierre de sesión.",
      "Código de auth_service.py sin secretos.",
      "Explicación del alcance de seguridad de esta versión.",
      "Prueba del correo del usuario en la interfaz.",
    ],
  },
  16: {
    title: "Panel administrativo",
    icon: "📊",
    duration: "2 sesiones",
    context:
      "Una vez autenticado, el usuario puede operar registros. Ahora necesita comprender el estado general del inventario sin contar filas manualmente.",
    situation:
      "La dirección solicita un resumen para una reunión: total de plantas, especies o nombres únicos, registros activos y distribución por tipo.",
    expected: [
      "Calcula métricas a partir de los documentos recuperados.",
      "Presenta indicadores visuales claros y consistentes.",
      "Actualiza el panel después de crear, editar o eliminar.",
    ],
    materials: [
      "Proyecto completado hasta la práctica 15.",
      "Usuario autenticado.",
      "Al menos diez registros con tipos y estados variados.",
      "Funciones obtener_plantas() y cargar_tabla().",
    ],
    previous: [
      "Se reutiliza la misma lectura de Firestore; no se realiza una consulta por tarjeta.",
      "El panel se integra en la vista CRUD protegida.",
    ],
    newParts: [
      "Tarjetas de total, nombres únicos, activos y pendientes.",
      "Resumen por tipo con barras de progreso.",
      "Función actualizar_dashboard() conectada a cada operación CRUD.",
    ],
    steps: [
      ["1. Definir métricas", "Escribe qué significa cada indicador antes de programarlo. Un nombre único se calcula con un conjunto."],
      ["2. Crear tarjetas", "Diseña controles reutilizables con título, valor, icono y color."],
      ["3. Calcular una sola vez", "Obtén la lista de plantas y deriva todos los conteos de esa misma lista."],
      ["4. Agrupar por tipo", "Usa Counter para contar cuántas plantas corresponden a cada categoría."],
      ["5. Representar proporciones", "Divide cada conteo entre el total y asigna el resultado a ProgressBar."],
      ["6. Mantener sincronía", "Llama actualizar_dashboard() después de crear, actualizar o eliminar y al abrir la vista principal."],
    ],
    snippetTitle: "Código incremental: métricas e indicadores",
    snippet: `from collections import Counter

total_valor = ft.Text("0", size=30, weight=ft.FontWeight.BOLD)
unicas_valor = ft.Text("0", size=30, weight=ft.FontWeight.BOLD)
activas_valor = ft.Text("0", size=30, weight=ft.FontWeight.BOLD)
pendientes_valor = ft.Text("0", size=30, weight=ft.FontWeight.BOLD)
resumen_tipos = ft.Column()


def actualizar_dashboard(registros=None):
    plantas = registros if registros is not None else obtener_plantas()
    total = len(plantas)

    nombres = {
        planta.get("nombre_comun", "").strip().casefold()
        for planta in plantas
        if planta.get("nombre_comun")
    }
    activas = sum(
        planta.get("estado", "").casefold() == "activa"
        for planta in plantas
    )
    pendientes = sum(
        planta.get("estado", "").casefold() == "pendiente"
        for planta in plantas
    )
    tipos = Counter(
        planta.get("tipo_planta", "Sin tipo") for planta in plantas
    )

    total_valor.value = str(total)
    unicas_valor.value = str(len(nombres))
    activas_valor.value = str(activas)
    pendientes_valor.value = str(pendientes)

    resumen_tipos.controls = [
        ft.Column(
            controls=[
                ft.Row(
                    alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
                    controls=[ft.Text(tipo), ft.Text(str(cantidad))],
                ),
                ft.ProgressBar(
                    value=cantidad / total if total else 0,
                    color="#4F772D",
                ),
            ]
        )
        for tipo, cantidad in tipos.most_common()
    ]
    page.update()`,
    explanation: [
      ["set", "Conserva nombres sin repetir y permite contar valores únicos."],
      ["sum(condición)", "Python interpreta True como 1 y False como 0 para contar coincidencias."],
      ["Counter", "Agrupa categorías y devuelve la frecuencia de cada una."],
      ["most_common()", "Ordena los tipos desde el más frecuente."],
      ["cantidad / total", "Transforma un conteo en una proporción entre 0 y 1."],
      ["Una lectura", "Reduce trabajo y mantiene todas las tarjetas basadas en el mismo momento de datos."],
    ],
    guided: [
      "Anota manualmente las métricas esperadas antes de abrir el panel.",
      "Compara tus cálculos con las cuatro tarjetas.",
      "Crea una planta y verifica que total y tipo cambien.",
      "Actualiza su estado y comprueba el indicador correspondiente.",
    ],
    challenge:
      "Agrega un indicador de la ubicación con más registros y muestra el porcentaje que representa respecto del total.",
    reflection: [
      "¿Por qué las métricas deben tener una definición previa?",
      "¿Qué ventaja tiene calcular todo desde una sola lectura?",
      "¿Qué ocurre con las barras cuando no hay registros?",
      "¿Cuándo convendría guardar métricas precalculadas?",
    ],
    evidence: [
      "Captura del panel con datos reales.",
      "Tabla de cálculo manual contra resultado de la app.",
      "Código de actualizar_dashboard().",
      "Prueba de actualización tras una operación CRUD.",
    ],
  },
  17: {
    title: "Proyecto integrador: PlantApp CRUD",
    icon: "🚀",
    duration: "4 sesiones",
    context:
      "La etapa final reúne las funciones construidas de manera incremental. El resultado no es un ejercicio nuevo: es la versión integrada del mismo sistema escolar de registro de plantas.",
    situation:
      "El equipo entregará PlantApp a la comunidad escolar. La aplicación debe permitir iniciar sesión, crear, consultar, buscar, actualizar y eliminar, además de presentar un resumen administrativo.",
    expected: [
      "Integra el flujo CRUD completo sin duplicar lógica ni controles.",
      "Gestiona una sesión básica y registra quién realiza altas.",
      "Prueba el sistema con casos normales, vacíos y erróneos.",
      "Documenta decisiones, límites de seguridad y evidencias del producto.",
    ],
    materials: [
      "Proyecto completado hasta la práctica 16.",
      "Usuario de prueba y colección plantas.",
      "Variables de entorno configuradas.",
      "Lista de cotejo y datos preparados para pruebas.",
    ],
    previous: [
      "Se integran tabla, búsqueda, actualización, confirmación, autenticación y panel.",
      "Se conservan el diseño verde de PlantApp, los campos y la colección.",
    ],
    newParts: [
      "Organización final en servicios y vista principal.",
      "Flujo único guardar_o_actualizar() y refrescar_aplicacion().",
      "Pruebas integrales y lista de cotejo de entrega.",
    ],
    steps: [
      ["1. Ordenar archivos", "Separa conexión, autenticación y vista. La interfaz no debe construir directamente las URLs de Auth."],
      ["2. Integrar el acceso", "La app inicia en login y construye el CRUD únicamente después de autenticar."],
      ["3. Unificar refresco", "Crea refrescar_aplicacion() para recuperar una vez y enviar la misma lista a tabla y dashboard."],
      ["4. Completar CRUD", "Prueba crear, consultar, buscar, actualizar y eliminar con documentos reales."],
      ["5. Registrar autoría", "Al crear, añade UID, correo y fecha de servidor; no aceptes esos valores desde campos editables."],
      ["6. Probar errores", "Incluye credenciales incorrectas, campos vacíos, ID inexistente, cancelación y pérdida de conexión."],
      ["7. Entregar", "Presenta código sin secretos, evidencias, diagrama y demostración del flujo completo."],
    ],
    snippetTitle: "Código incremental final: integración del flujo",
    snippet: `# main.py — funciones que conectan todas las prácticas
def refrescar_aplicacion():
    plantas = obtener_plantas()
    cargar_tabla(plantas)
    actualizar_dashboard(plantas)


def datos_del_formulario():
    return {
        "nombre_comun": nombre_comun.value.strip(),
        "nombre_cientifico": nombre_cientifico.value.strip(),
        "tipo_planta": tipo_planta.value,
        "alumno_responsable": alumno_responsable.value.strip(),
        "ubicacion": ubicacion.value.strip(),
        "estado": estado.value,
    }


def guardar_o_actualizar(e):
    nonlocal registro_seleccionado_id
    error = validar_formulario()
    if error:
        mostrar_mensaje(error, True)
        return

    datos = datos_del_formulario()
    try:
        if registro_seleccionado_id:
            actualizar_planta(registro_seleccionado_id, datos)
            mensaje = "Registro actualizado."
        else:
            datos.update({
                "creado_por_uid": sesion_actual["uid"],
                "creado_por_correo": sesion_actual["email"],
                "creado_en": firestore.SERVER_TIMESTAMP,
            })
            crear_planta(datos)
            mensaje = "Registro creado."

        cancelar_edicion()
        refrescar_aplicacion()
        mostrar_mensaje(mensaje)
    except Exception as error:
        mostrar_mensaje(f"Operación no completada: {error}", True)`,
    explanation: [
      ["Servicios", "Firestore y Auth quedan fuera del código visual para reducir acoplamiento."],
      ["refrescar_aplicacion()", "Mantiene tabla y dashboard sincronizados usando una sola lista."],
      ["datos_del_formulario()", "Centraliza la transformación de controles a documento."],
      ["SERVER_TIMESTAMP", "Solicita a Firestore una fecha confiable del servidor al crear."],
      ["Autoría no editable", "El UID y correo se toman de la sesión, no de texto introducido por el usuario."],
      ["Flujo único", "Crear y actualizar comparten validación, mensajes y refresco."],
    ],
    guided: [
      "Ejecuta el caso completo: iniciar sesión → crear → buscar → actualizar → eliminar → cerrar sesión.",
      "Repite el flujo con un campo obligatorio vacío y registra el comportamiento.",
      "Comprueba autoría y fecha en Firebase Console.",
      "Intercambia equipo con un compañero y aplica la lista de cotejo sin explicar el código.",
    ],
    challenge:
      "Implementa roles básicos: lector puede consultar y buscar; editor también crea y actualiza; administrador puede eliminar. Documenta que la autorización real debe validarse en un backend o con reglas y tokens de cliente.",
    reflection: [
      "¿Qué función evita repetir lecturas al actualizar tabla y panel?",
      "¿Qué operación del CRUD consideras de mayor riesgo y por qué?",
      "¿Qué límites de seguridad conserva esta app escolar?",
      "¿Qué refactorización harías antes de publicar el sistema?",
      "¿Cómo demostrarías que el proyecto cumple el problema original?",
    ],
    evidence: [
      "Video corto del flujo completo.",
      "Repositorio o carpeta final sin claves ni credenciales.",
      "Diagrama de arquitectura y modelo del documento.",
      "Matriz de pruebas con al menos ocho casos.",
      "Conclusión individual sobre la evolución de la práctica 11 a la 17.",
    ],
  },
};

const COMPLETE_CODE = {
  11: `import flet as ft
from conexion_firebase import obtener_plantas


def main(page: ft.Page):
    page.title = "PlantApp · Registros"
    page.theme = ft.Theme(color_scheme_seed="#4F772D")
    page.scroll = ft.ScrollMode.AUTO

    contador = ft.Text("0 registros", color="#2D6A4F")
    tabla = ft.DataTable(
        columns=[
            ft.DataColumn(ft.Text("Nombre")),
            ft.DataColumn(ft.Text("Tipo")),
            ft.DataColumn(ft.Text("Responsable")),
            ft.DataColumn(ft.Text("Ubicación")),
            ft.DataColumn(ft.Text("Estado")),
        ],
        rows=[],
    )

    def texto(valor, reemplazo="Sin dato"):
        return str(valor).strip() if valor not in (None, "") else reemplazo

    def cargar_tabla(e=None):
        try:
            registros = obtener_plantas()
            tabla.rows = [
                ft.DataRow(
                    data=p["id"],
                    cells=[
                        ft.DataCell(ft.Text(texto(p.get("nombre_comun")))),
                        ft.DataCell(ft.Text(texto(p.get("tipo_planta")))),
                        ft.DataCell(ft.Text(texto(p.get("alumno_responsable")))),
                        ft.DataCell(ft.Text(texto(p.get("ubicacion")))),
                        ft.DataCell(ft.Text(texto(p.get("estado"), "Pendiente"))),
                    ],
                )
                for p in registros
            ]
            contador.value = f"{len(registros)} registros"
        except Exception as error:
            contador.value = f"Error al recuperar datos: {error}"
        page.update()

    page.add(
        ft.Row([
            ft.Text("Inventario de plantas", size=28, weight=ft.FontWeight.BOLD),
            ft.IconButton(ft.Icons.REFRESH, on_click=cargar_tabla),
        ], alignment=ft.MainAxisAlignment.SPACE_BETWEEN),
        contador,
        ft.Row([tabla], scroll=ft.ScrollMode.AUTO),
    )
    cargar_tabla()


ft.app(target=main)`,
  12: `import flet as ft
from conexion_firebase import obtener_plantas, buscar_por_id


def main(page: ft.Page):
    page.title = "PlantApp · Búsqueda"
    page.theme = ft.Theme(color_scheme_seed="#4F772D")
    page.scroll = ft.ScrollMode.AUTO

    busqueda = ft.TextField(label="Nombre o ID", expand=True)
    criterio = ft.Dropdown(
        label="Buscar por", value="Nombre",
        options=[ft.dropdown.Option("Nombre"), ft.dropdown.Option("ID")],
    )
    filtro_tipo = ft.Dropdown(
        label="Tipo", value="Todos",
        options=[ft.dropdown.Option(x) for x in
                 ["Todos", "Ornamental", "Medicinal", "Aromática", "Frutal"]],
    )
    mensaje = ft.Text()
    tabla = ft.DataTable(
        columns=[ft.DataColumn(ft.Text(x)) for x in
                 ["Nombre", "Tipo", "Responsable", "Ubicación", "Estado"]],
        rows=[],
    )

    def cargar_tabla(registros=None):
        plantas = obtener_plantas() if registros is None else registros
        tabla.rows = [
            ft.DataRow(data=p["id"], cells=[
                ft.DataCell(ft.Text(str(p.get("nombre_comun", "Sin dato")))),
                ft.DataCell(ft.Text(str(p.get("tipo_planta", "Sin dato")))),
                ft.DataCell(ft.Text(str(p.get("alumno_responsable", "Sin dato")))),
                ft.DataCell(ft.Text(str(p.get("ubicacion", "Sin dato")))),
                ft.DataCell(ft.Text(str(p.get("estado", "Pendiente")))),
            ]) for p in plantas
        ]

    def buscar(e):
        termino = busqueda.value.strip()
        try:
            if criterio.value == "ID":
                resultados = buscar_por_id(termino) if termino else []
            else:
                resultados = obtener_plantas()
                if termino:
                    normalizado = termino.casefold()
                    resultados = [p for p in resultados
                                  if normalizado in p.get("nombre_comun", "").casefold()]
            if filtro_tipo.value != "Todos":
                resultados = [p for p in resultados
                              if p.get("tipo_planta") == filtro_tipo.value]
            cargar_tabla(resultados)
            mensaje.value = (f"{len(resultados)} coincidencia(s)" if resultados
                             else "No existen registros con esos criterios.")
        except Exception as error:
            mensaje.value = f"No se pudo buscar: {error}"
        page.update()

    def limpiar(e):
        busqueda.value = ""
        criterio.value = "Nombre"
        filtro_tipo.value = "Todos"
        cargar_tabla()
        mensaje.value = "Mostrando todos los registros."
        page.update()

    page.add(
        ft.Text("Buscar plantas", size=28, weight=ft.FontWeight.BOLD),
        ft.ResponsiveRow([busqueda, criterio, filtro_tipo]),
        ft.Row([ft.FilledButton("Buscar", on_click=buscar),
                ft.OutlinedButton("Limpiar", on_click=limpiar)]),
        mensaje,
        ft.Row([tabla], scroll=ft.ScrollMode.AUTO),
    )
    limpiar(None)


ft.app(target=main)`,
  13: `# main.py — versión completa de la práctica 13
import flet as ft
from conexion_firebase import (
    obtener_plantas, guardar_en_firebase, actualizar_planta
)


def main(page: ft.Page):
    page.title = "PlantApp · Crear y actualizar"
    page.theme = ft.Theme(color_scheme_seed="#4F772D")
    registro_seleccionado_id = None

    nombre = ft.TextField(label="Nombre común")
    tipo = ft.Dropdown(label="Tipo", options=[
        ft.dropdown.Option(x) for x in
        ["Ornamental", "Medicinal", "Aromática", "Frutal"]
    ])
    responsable = ft.TextField(label="Alumno responsable")
    ubicacion = ft.TextField(label="Ubicación")
    estado = ft.Dropdown(label="Estado", value="Activa", options=[
        ft.dropdown.Option("Activa"), ft.dropdown.Option("Pendiente")
    ])
    aviso = ft.Text()
    tabla = ft.DataTable(
        columns=[ft.DataColumn(ft.Text(x)) for x in
                 ["Nombre", "Tipo", "Ubicación", "Acciones"]],
        rows=[],
    )
    boton_guardar = ft.FilledButton("Guardar registro")

    def datos_formulario():
        return {
            "nombre_comun": nombre.value.strip(),
            "tipo_planta": tipo.value,
            "alumno_responsable": responsable.value.strip(),
            "ubicacion": ubicacion.value.strip(),
            "estado": estado.value,
        }

    def limpiar():
        nonlocal registro_seleccionado_id
        registro_seleccionado_id = None
        for control in [nombre, responsable, ubicacion]:
            control.value = ""
        tipo.value = None
        estado.value = "Activa"
        boton_guardar.text = "Guardar registro"

    def seleccionar(planta):
        nonlocal registro_seleccionado_id
        registro_seleccionado_id = planta["id"]
        nombre.value = planta.get("nombre_comun", "")
        tipo.value = planta.get("tipo_planta")
        responsable.value = planta.get("alumno_responsable", "")
        ubicacion.value = planta.get("ubicacion", "")
        estado.value = planta.get("estado", "Activa")
        boton_guardar.text = "Actualizar registro"
        page.update()

    def cargar_tabla():
        registros = obtener_plantas()
        tabla.rows = [
            ft.DataRow(data=p["id"], cells=[
                ft.DataCell(ft.Text(p.get("nombre_comun", "Sin dato"))),
                ft.DataCell(ft.Text(p.get("tipo_planta", "Sin dato"))),
                ft.DataCell(ft.Text(p.get("ubicacion", "Sin dato"))),
                ft.DataCell(ft.IconButton(
                    ft.Icons.EDIT,
                    tooltip="Editar",
                    on_click=lambda e, planta=p: seleccionar(planta),
                )),
            ]) for p in registros
        ]
        page.update()

    def guardar_o_actualizar(e):
        nonlocal registro_seleccionado_id
        datos = datos_formulario()
        if not datos["nombre_comun"] or not datos["tipo_planta"]:
            aviso.value = "Completa nombre y tipo."
            page.update()
            return
        try:
            if registro_seleccionado_id:
                actualizar_planta(registro_seleccionado_id, datos)
                aviso.value = "Registro actualizado."
            else:
                guardar_en_firebase(datos)
                aviso.value = "Registro creado."
            limpiar()
            cargar_tabla()
        except Exception as error:
            aviso.value = f"No se guardaron los cambios: {error}"
            page.update()

    boton_guardar.on_click = guardar_o_actualizar
    page.add(
        ft.Text("Administrar plantas", size=28, weight=ft.FontWeight.BOLD),
        ft.ResponsiveRow([nombre, tipo, responsable, ubicacion, estado]),
        ft.Row([boton_guardar, ft.OutlinedButton("Cancelar", on_click=lambda e: (limpiar(), page.update()))]),
        aviso,
        ft.Row([tabla], scroll=ft.ScrollMode.AUTO),
    )
    cargar_tabla()


ft.app(target=main)`,
  14: `# main.py — añade eliminación a la versión de la práctica 13
# Conserva formulario, cargar_tabla(), seleccionar() y guardar_o_actualizar().

def eliminar_planta(documento_id):
    db.collection("plantas").document(documento_id).delete()


def solicitar_eliminacion(planta):
    def cerrar(e):
        dialogo.open = False
        page.update()

    def confirmar(e):
        try:
            eliminar_planta(planta["id"])
            dialogo.open = False
            cargar_tabla()
            aviso.value = "Registro eliminado correctamente."
        except Exception as error:
            dialogo.open = False
            aviso.value = f"No se pudo eliminar: {error}"
        page.update()

    dialogo = ft.AlertDialog(
        modal=True,
        title=ft.Text("Confirmar eliminación"),
        content=ft.Text(
            f"¿Eliminar '{planta.get('nombre_comun', 'Sin nombre')}'? "
            "La acción no se puede deshacer."
        ),
        actions=[
            ft.TextButton("Cancelar", on_click=cerrar),
            ft.FilledButton(
                "Eliminar",
                icon=ft.Icons.DELETE_FOREVER,
                on_click=confirmar,
                style=ft.ButtonStyle(bgcolor="#B3261E", color="#FFFFFF"),
            ),
        ],
    )
    page.open(dialogo)


# Sustituye la celda Acciones de cargar_tabla() por:
acciones = ft.Row([
    ft.IconButton(
        ft.Icons.EDIT,
        tooltip="Editar",
        on_click=lambda e, planta=p: seleccionar(planta),
    ),
    ft.IconButton(
        ft.Icons.DELETE_OUTLINE,
        tooltip="Eliminar",
        icon_color="#B3261E",
        on_click=lambda e, planta=p: solicitar_eliminacion(planta),
    ),
])

# La fila queda:
fila = ft.DataRow(data=p["id"], cells=[
    ft.DataCell(ft.Text(p.get("nombre_comun", "Sin dato"))),
    ft.DataCell(ft.Text(p.get("tipo_planta", "Sin dato"))),
    ft.DataCell(ft.Text(p.get("ubicacion", "Sin dato"))),
    ft.DataCell(acciones),
])`,
  15: `# auth_service.py
import os
import requests

API_KEY = os.environ["FIREBASE_WEB_API_KEY"]
URL_LOGIN = (
    "https://identitytoolkit.googleapis.com/v1/"
    f"accounts:signInWithPassword?key={API_KEY}"
)


def traducir_error(codigo):
    if codigo == "EMAIL_NOT_FOUND":
        return "El usuario no existe."
    if codigo == "INVALID_PASSWORD":
        return "La contraseña es incorrecta."
    if codigo in ("INVALID_LOGIN_CREDENTIALS", "INVALID_EMAIL"):
        return "Correo o contraseña incorrectos."
    if codigo == "USER_DISABLED":
        return "La cuenta está deshabilitada."
    return "No fue posible iniciar sesión."


def iniciar_sesion(correo, contrasena):
    respuesta = requests.post(
        URL_LOGIN,
        json={"email": correo, "password": contrasena,
              "returnSecureToken": True},
        timeout=10,
    )
    datos = respuesta.json()
    if not respuesta.ok:
        codigo = datos.get("error", {}).get("message", "ERROR")
        raise ValueError(traducir_error(codigo))
    return {"uid": datos["localId"], "email": datos["email"],
            "id_token": datos["idToken"]}


# main.py — integra estas vistas con el CRUD de la práctica 14
import flet as ft
import requests
from auth_service import iniciar_sesion


def main(page: ft.Page):
    page.title = "PlantApp · Acceso"
    page.theme = ft.Theme(color_scheme_seed="#4F772D")
    sesion_actual = None

    correo = ft.TextField(label="Correo", prefix_icon=ft.Icons.EMAIL)
    clave = ft.TextField(
        label="Contraseña", password=True, can_reveal_password=True,
        prefix_icon=ft.Icons.LOCK,
    )
    mensaje_login = ft.Text(color="#B3261E")
    usuario_activo = ft.Text()

    def mostrar_login():
        page.clean()
        page.add(
            ft.Container(
                width=420, padding=30, border_radius=24, bgcolor="#FFFFFF",
                content=ft.Column([
                    ft.Icon(ft.Icons.ECO, size=56, color="#4F772D"),
                    ft.Text("Iniciar sesión", size=28,
                            weight=ft.FontWeight.BOLD),
                    correo, clave, mensaje_login,
                    ft.FilledButton("Acceder", on_click=acceder),
                ]),
            )
        )

    def mostrar_crud():
        page.clean()
        page.add(
            ft.Row([
                ft.Text("PlantApp", size=28, weight=ft.FontWeight.BOLD),
                ft.Row([usuario_activo,
                        ft.TextButton("Cerrar sesión", on_click=cerrar_sesion)]),
            ], alignment=ft.MainAxisAlignment.SPACE_BETWEEN),
            construir_vista_crud(),  # función conservada de práctica 14
        )

    def acceder(e):
        nonlocal sesion_actual
        try:
            sesion_actual = iniciar_sesion(correo.value.strip(), clave.value)
            usuario_activo.value = sesion_actual["email"]
            mensaje_login.value = ""
            mostrar_crud()
        except (ValueError, requests.RequestException) as error:
            mensaje_login.value = str(error)
            page.update()

    def cerrar_sesion(e):
        nonlocal sesion_actual
        sesion_actual = None
        clave.value = ""
        mostrar_login()

    mostrar_login()


ft.app(target=main)`,
  16: `# dashboard.py
from collections import Counter
import flet as ft


def tarjeta(titulo, icono, color):
    valor = ft.Text("0", size=30, weight=ft.FontWeight.BOLD)
    control = ft.Container(
        bgcolor="#FFFFFF", border_radius=18, padding=18, expand=True,
        content=ft.Column([
            ft.Row([ft.Text(titulo), ft.Icon(icono, color=color)],
                   alignment=ft.MainAxisAlignment.SPACE_BETWEEN),
            valor,
        ]),
    )
    return control, valor


total_card, total_valor = tarjeta("Total", ft.Icons.GRASS, "#4F772D")
unicas_card, unicas_valor = tarjeta("Nombres únicos", ft.Icons.SPA, "#2D6A4F")
activas_card, activas_valor = tarjeta("Activas", ft.Icons.CHECK_CIRCLE, "#40916C")
pendientes_card, pendientes_valor = tarjeta("Pendientes", ft.Icons.PENDING, "#D97706")
resumen_tipos = ft.Column()


def actualizar_dashboard(plantas, page):
    total = len(plantas)
    nombres = {p.get("nombre_comun", "").strip().casefold()
               for p in plantas if p.get("nombre_comun")}
    activas = sum(p.get("estado", "").casefold() == "activa"
                  for p in plantas)
    pendientes = sum(p.get("estado", "").casefold() == "pendiente"
                     for p in plantas)
    tipos = Counter(p.get("tipo_planta", "Sin tipo") for p in plantas)

    total_valor.value = str(total)
    unicas_valor.value = str(len(nombres))
    activas_valor.value = str(activas)
    pendientes_valor.value = str(pendientes)
    resumen_tipos.controls = [
        ft.Column([
            ft.Row([ft.Text(tipo), ft.Text(str(cantidad))],
                   alignment=ft.MainAxisAlignment.SPACE_BETWEEN),
            ft.ProgressBar(value=cantidad / total if total else 0,
                           color="#4F772D"),
        ]) for tipo, cantidad in tipos.most_common()
    ]
    page.update()


def vista_dashboard():
    return ft.Column([
        ft.Text("Resumen administrativo", size=24,
                weight=ft.FontWeight.BOLD),
        ft.ResponsiveRow([total_card, unicas_card,
                          activas_card, pendientes_card]),
        ft.Container(
            bgcolor="#FFFFFF", border_radius=18, padding=20,
            content=ft.Column([
                ft.Text("Distribución por tipo",
                        weight=ft.FontWeight.BOLD),
                resumen_tipos,
            ]),
        ),
    ])


# main.py — reutiliza una sola lectura
def refrescar_aplicacion():
    plantas = obtener_plantas()
    cargar_tabla(plantas)
    actualizar_dashboard(plantas, page)

# Llama refrescar_aplicacion() al entrar y después de crear,
# actualizar o eliminar.`,
  17: `# Estructura final
# plantapp/
# ├── main.py
# ├── firebase_service.py
# ├── auth_service.py
# └── credenciales/firebase-key.json  (ignorado por Git)

# firebase_service.py
import firebase_admin
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    cred = credentials.Certificate("credenciales/firebase-key.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()
coleccion = db.collection("plantas")


def crear_planta(datos):
    _, ref = coleccion.add(datos)
    return ref.id


def obtener_plantas():
    plantas = []
    for doc in coleccion.stream():
        planta = doc.to_dict()
        planta["id"] = doc.id
        plantas.append(planta)
    return plantas


def buscar_por_id(documento_id):
    doc = coleccion.document(documento_id).get()
    if not doc.exists:
        return []
    planta = doc.to_dict()
    planta["id"] = doc.id
    return [planta]


def actualizar_planta(documento_id, cambios):
    coleccion.document(documento_id).update(cambios)


def eliminar_planta(documento_id):
    coleccion.document(documento_id).delete()


# main.py — núcleo integrado
import flet as ft
from firebase_admin import firestore
from auth_service import iniciar_sesion
from firebase_service import (
    crear_planta, obtener_plantas, buscar_por_id,
    actualizar_planta, eliminar_planta,
)


def main(page: ft.Page):
    page.title = "PlantApp CRUD"
    page.theme = ft.Theme(color_scheme_seed="#4F772D")
    page.scroll = ft.ScrollMode.AUTO
    sesion_actual = None
    registro_seleccionado_id = None

    # Conserva aquí los controles creados en prácticas 11 a 16:
    # login, formulario, búsqueda, tabla, diálogo y dashboard.

    def refrescar_aplicacion():
        plantas = obtener_plantas()
        cargar_tabla(plantas)
        actualizar_dashboard(plantas)

    def validar_formulario():
        if not nombre_comun.value.strip():
            return "Escribe el nombre común."
        if not tipo_planta.value:
            return "Selecciona el tipo."
        if not ubicacion.value.strip():
            return "Escribe la ubicación."
        return None

    def datos_del_formulario():
        return {
            "nombre_comun": nombre_comun.value.strip(),
            "nombre_cientifico": nombre_cientifico.value.strip(),
            "tipo_planta": tipo_planta.value,
            "alumno_responsable": alumno_responsable.value.strip(),
            "ubicacion": ubicacion.value.strip(),
            "estado": estado.value,
        }

    def guardar_o_actualizar(e):
        nonlocal registro_seleccionado_id
        error = validar_formulario()
        if error:
            mostrar_mensaje(error, True)
            return
        datos = datos_del_formulario()
        try:
            if registro_seleccionado_id:
                actualizar_planta(registro_seleccionado_id, datos)
                mensaje = "Registro actualizado."
            else:
                datos.update({
                    "creado_por_uid": sesion_actual["uid"],
                    "creado_por_correo": sesion_actual["email"],
                    "creado_en": firestore.SERVER_TIMESTAMP,
                })
                crear_planta(datos)
                mensaje = "Registro creado."
            cancelar_edicion()
            refrescar_aplicacion()
            mostrar_mensaje(mensaje)
        except Exception as error:
            mostrar_mensaje(f"Operación no completada: {error}", True)

    # mostrar_login() abre la app. Al autenticar:
    # 1. asigna sesion_actual;
    # 2. construye la vista CRUD;
    # 3. llama refrescar_aplicacion().
    mostrar_login()


ft.app(target=main)

# Nota: construir_vista_crud(), cargar_tabla(), actualizar_dashboard(),
# seleccionar(), solicitar_eliminacion(), buscar() y mostrar_login()
# son las funciones completas desarrolladas y probadas en prácticas 11–16.
# Se integran sin duplicarlas.`,
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function list(items) {
  return `<ul class="checklist">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function createTokenStash() {
  const values = [];
  return {
    save(value) {
      const key = `__CODE_TOKEN_${values.length}__`;
      values.push(value);
      return key;
    },
    restore(value) {
      return value.replace(
        /__CODE_TOKEN_(\d+)__/g,
        (_, index) => values[Number(index)],
      );
    },
  };
}

function highlightPython(code) {
  const stash = createTokenStash();
  let html = escapeHtml(code);

  html = html.replace(/(#.*$)/gm, (match) =>
    stash.save(`<span class="token comment">${match}</span>`));
  html = html.replace(
    /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')/g,
    (match) => stash.save(`<span class="token string">${match}</span>`),
  );
  html = html.replace(
    /\b(async|await|import|from|as|def|return|if|elif|else|for|while|in|try|except|finally|with|class|lambda|pass|break|continue|raise|yield|global|nonlocal|and|or|not|is|None|True|False)\b/g,
    '<span class="token keyword">$1</span>',
  );
  html = html.replace(
    /\b(\d+(?:\.\d+)?)\b/g,
    '<span class="token number">$1</span>',
  );
  html = html.replace(
    /\b([A-Z][A-Za-z0-9_]*)\b/g,
    '<span class="token class-name">$1</span>',
  );
  html = html.replace(
    /\b([a-zA-Z_][A-Za-z0-9_]*)(?=\s*\()/g,
    '<span class="token function">$1</span>',
  );

  return stash.restore(html);
}

function highlightBash(code) {
  const stash = createTokenStash();
  let html = escapeHtml(code);

  html = html.replace(/(#.*$)/gm, (match) =>
    stash.save(`<span class="token comment">${match}</span>`));
  html = html.replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, (match) =>
    stash.save(`<span class="token string">${match}</span>`));
  html = html.replace(
    /\b(pip|python|python3|flet|install|run|source|cd|mkdir|export)\b/g,
    '<span class="token keyword">$1</span>',
  );
  html = html.replace(
    /(^|\s)(--?[a-zA-Z][\w-]*)/gm,
    '$1<span class="token property">$2</span>',
  );

  return stash.restore(html);
}

function highlightCodeBlocks(container) {
  container.querySelectorAll("pre.code-block.language-python code").forEach((block) => {
    block.innerHTML = highlightPython(block.textContent);
  });
  container.querySelectorAll("pre.code-block.language-bash code").forEach((block) => {
    block.innerHTML = highlightBash(block.textContent);
  });
}

const RUN_GUIDES = {
  11: {
    files: ["firebase_service.py", "consulta_tkinter.py"],
    install: "pip install firebase-admin",
    run: "python consulta_tkinter.py",
    note: "Tkinter normalmente viene incluido con Python.",
  },
  12: {
    files: ["firebase_service.py", "registro_flet.py"],
    install: "pip install flet firebase-admin",
    run: "flet run registro_flet.py",
    note: "También puede ejecutarse con python registro_flet.py.",
  },
  13: {
    files: ["firebase_service.py", "buscador_nicegui.py"],
    install: "pip install nicegui firebase-admin",
    run: "python buscador_nicegui.py",
    note: "NiceGUI mostrará en la terminal la dirección local que debe abrirse.",
  },
  14: {
    files: ["firebase_service.py", "actualizar_flet.py"],
    install: "pip install flet firebase-admin",
    run: "flet run actualizar_flet.py",
    note: "Se conserva el formulario Flet de la práctica 12.",
  },
  15: {
    files: ["firebase_service.py", "eliminar_tkinter.py"],
    install: "pip install firebase-admin",
    run: "python eliminar_tkinter.py",
    note: "La eliminación se prueba únicamente con documentos preparados para ello.",
  },
  16: {
    files: ["firebase_service.py", "panel_nicegui.py"],
    install: "pip install nicegui firebase-admin",
    run: "python panel_nicegui.py",
    note: "El navegador abre el panel servido por NiceGUI.",
  },
  17: {
    files: ["firebase_service.py", "app_crud.py"],
    install: "pip install nicegui firebase-admin",
    run: "python app_crud.py",
    note: "El CRUD final reutiliza las operaciones desarrolladas en las prácticas anteriores.",
  },
};

function renderPractice() {
  const root = document.querySelector("[data-crud-practice]");
  if (!root) return;

  const number = Number(root.dataset.crudPractice);
  const practice = CRUD_PRACTICES[number];
  const runGuide = RUN_GUIDES[number];
  if (!practice) return;

  document.title = `Práctica ${number} · ${practice.title}`;
  root.innerHTML = `
    <div class="unit-label">Unidad III · PlantApp: aplicación incremental con Python y Firebase</div>
    <div class="badge">${practice.icon} Práctica ${number}</div>
    <h2 class="page-title">${practice.title}</h2>
    <p class="page-subtitle">Proyecto continuo: PlantApp · Modalidad: laboratorio · Duración: ${practice.duration}</p>

    <div class="project-thread">
      <span>Práctica 11<br><strong>Consultar</strong></span>
      <span>Práctica 12<br><strong>Registrar</strong></span>
      <span>Práctica 13<br><strong>Buscar</strong></span>
      <span>Práctica 14<br><strong>Actualizar</strong></span>
      <span>Práctica 15<br><strong>Eliminar</strong></span>
      <span>Práctica 16<br><strong>Analizar</strong></span>
      <span>Práctica 17<br><strong>Integrar</strong></span>
    </div>

    <h2 class="section-title">1. Contexto</h2>
    <p>${practice.context}</p>

    <h2 class="section-title">2. Situación de aprendizaje</h2>
    <div class="callout"><strong>Reto escolar:</strong> ${practice.situation}</div>

    <h2 class="section-title">3. Aprendizaje esperado</h2>
    ${list(practice.expected)}

    <h2 class="section-title">4. Materiales</h2>
    ${list(practice.materials)}
    <div class="continuity-grid">
      <article>
        <h3>♻️ Se reutiliza</h3>
        ${list(practice.previous)}
      </article>
      <article>
        <h3>✨ Se incorpora</h3>
        ${list(practice.newParts)}
      </article>
    </div>

    <section class="programming-route">
      <div>
        <span class="step-label">Antes de escribir el código</span>
        <h2>Archivos y ejecución de la práctica</h2>
        <p>Trabaja dentro de la misma carpeta de PlantApp. No reemplaces tu credencial ni repitas la configuración inicial.</p>
      </div>
      <div class="file-route">
        ${runGuide.files.map((file, index) => `
          <span><small>${index === 0 ? "Servicio compartido" : "Aplicación visual"}</small><code>${file}</code></span>
        `).join('<b aria-hidden="true">→</b>')}
      </div>
      <div class="command-grid">
        <article>
          <strong>Instalar o comprobar dependencias</strong>
          <pre class="code-block language-bash"><code>${escapeHtml(runGuide.install)}</code></pre>
        </article>
        <article>
          <strong>Ejecutar la aplicación</strong>
          <pre class="code-block language-bash"><code>${escapeHtml(runGuide.run)}</code></pre>
        </article>
      </div>
      <p class="run-note">💡 ${runGuide.note}</p>
    </section>

    <h2 class="section-title">5. Desarrollo paso a paso</h2>
    <div class="lesson-steps">
      ${practice.steps.map(([title, text]) => `
        <article class="lesson-step"><h3>${title}</h3><p>${text}</p></article>
      `).join("")}
    </div>

    <h2 class="section-title">6. Explicación detallada del código</h2>
    <div class="code-explanation">
      ${practice.explanation.map(([term, text]) => `
        <article><code>${escapeHtml(term)}</code><p>${text}</p></article>
      `).join("")}
    </div>

    <h2 class="section-title">7. ${practice.snippetTitle}</h2>
    <p class="increment-note">
      <strong>Programa este cambio primero.</strong> Copia el fragmento en el archivo señalado, ejecútalo y comprueba
      el resultado antes de continuar con el programa completo.
    </p>
    <pre class="code-block editor-block language-python" data-title="cambio de la práctica ${number}"><code>${escapeHtml(practice.snippet)}</code></pre>

    <h2 class="section-title">8. Código completo listo para probar</h2>
    <div class="callout">
      <strong>Instrucción para el alumno:</strong> crea los archivos con los nombres indicados, copia cada sección en
      su archivo correspondiente y ejecuta el comando anterior. Los comentarios <code># archivo.py</code> indican
      dónde comienza cada archivo.
    </div>
    <pre class="code-block editor-block language-python" data-title="PlantApp · práctica ${number}"><code>${escapeHtml(COMPLETE_CODE[number])}</code></pre>

    <h2 class="section-title">9. Actividad guiada</h2>
    <ol class="guided-list">${practice.guided.map((item) => `<li>${item}</li>`).join("")}</ol>

    <h2 class="section-title">10. Reto adicional</h2>
    <div class="challenge-card"><strong>Extensión:</strong> ${practice.challenge}</div>

    <h2 class="section-title">11. Preguntas de reflexión</h2>
    ${list(practice.reflection)}

    <h2 class="section-title">12. Evidencia de aprendizaje</h2>
    <div class="evidence-card">
      ${list(practice.evidence)}
      <p><strong>Nombre sugerido:</strong> <code>P${number}_Apellido_Nombre</code></p>
    </div>

    <div class="practice-navigation">
      ${number > 11 ? `<a href="practica-${number - 1}.html">← Práctica ${number - 1}</a>` : `<a href="practica-10.html">← Práctica 10</a>`}
      ${number < 17 ? `<a href="practica-${number + 1}.html">Práctica ${number + 1} →</a>` : `<a href="index.html">Volver al inicio →</a>`}
    </div>
  `;

  highlightCodeBlocks(root);
}

// Secuencia visual solicitada para esta etapa. Todas las prácticas comparten
// firebase_service.py, la colección "plantas" y el mismo modelo de documento.
Object.assign(CRUD_PRACTICES[11], {
  title: "Consulta de datos con Tkinter y Firebase",
  icon: "🪟",
  context:
    "La colección plantas ya contiene documentos creados en las prácticas anteriores. En esta práctica no se configura Firebase de nuevo: se reutiliza la conexión existente para construir la primera vista de escritorio del inventario.",
  situation:
    "La brigada ambiental necesita consultar desde una computadora escolar las plantas registradas, sin entrar a Firebase Console ni leer resultados en la terminal.",
  expected: [
    "Recupera documentos de Firestore mediante el servicio existente.",
    "Muestra los registros en una tabla Treeview de Tkinter.",
    "Relaciona colección, documento, diccionario y fila visual.",
    "Controla colecciones vacías y errores de lectura.",
  ],
  materials: [
    "Proyecto PlantApp y conexión a Firebase ya funcional.",
    "Colección plantas con al menos cinco documentos.",
    "Python, tkinter y firebase-admin instalados.",
    "Archivo de credenciales ya protegido y probado.",
  ],
  previous: [
    "firebase_service.py y la colección plantas.",
    "Los campos nombre_comun, tipo_planta, alumno_responsable, grupo_responsable, ubicacion y estado.",
  ],
  newParts: [
    "Ventana de escritorio con Tkinter.",
    "Tabla ttk.Treeview y barras de desplazamiento.",
    "Botón Actualizar y mensaje de estado.",
  ],
  steps: [
    ["1. Reutilizar la conexión", "Importa obtener_plantas() desde firebase_service.py. No vuelvas a inicializar Firebase dentro de la ventana."],
    ["2. Crear la ventana", "Configura título, tamaño, colores y un encabezado que identifique el inventario escolar."],
    ["3. Construir la tabla", "Crea un Treeview con columnas para nombre, tipo, grupo, ubicación y estado."],
    ["4. Recorrer documentos", "Llama obtener_plantas(), elimina las filas anteriores e inserta una fila por cada diccionario recuperado."],
    ["5. Mostrar estados", "Informa cuántos registros se cargaron o si la colección está vacía."],
    ["6. Probar visualmente", "Compara dos documentos de Firebase Console con sus filas en la ventana."],
  ],
  snippetTitle: "Código incremental: cargar Firestore en Treeview",
  snippet: `# consulta_tkinter.py
from firebase_service import obtener_plantas

def cargar_registros():
    for fila in tabla.get_children():
        tabla.delete(fila)

    try:
        plantas = obtener_plantas()
        for planta in plantas:
            tabla.insert("", "end", iid=planta["id"], values=(
                planta.get("nombre_comun", "Sin dato"),
                planta.get("tipo_planta", "Sin dato"),
                planta.get("grupo_responsable", "Sin grupo"),
                planta.get("ubicacion", "Sin dato"),
                planta.get("estado", "Pendiente"),
            ))
        estado_var.set(f"{len(plantas)} registro(s) cargado(s)")
    except Exception as error:
        estado_var.set(f"Error de lectura: {error}")`,
  explanation: [
    ["obtener_plantas()", "Conserva la lectura de Firebase fuera del código visual."],
    ["Treeview", "Presenta datos tabulares dentro de una aplicación de escritorio."],
    ["get_children()", "Devuelve las filas actuales para limpiarlas antes de recargar."],
    ["iid=planta['id']", "Asocia cada fila con el ID real de su documento."],
    ["dict.get()", "Evita detener la ventana cuando falta un campo."],
    ["StringVar", "Actualiza el mensaje visible de estado."],
  ],
  guided: [
    "Abre la ventana y carga al menos cinco documentos.",
    "Identifica una fila cuyo grupo o ubicación estén vacíos.",
    "Agrega un documento desde Firebase Console y pulsa Actualizar.",
    "Dibuja el recorrido colección → documento → diccionario → fila.",
  ],
  challenge:
    "Agrega una columna ID que muestre solo los primeros ocho caracteres y permite ordenar las filas al pulsar el encabezado Nombre.",
  reflection: [
    "¿Por qué la ventana importa un servicio en lugar de inicializar Firebase?",
    "¿Qué función cumple el ID guardado como iid?",
    "¿Por qué se eliminan las filas antes de recargar?",
    "¿Cómo se comunica una colección vacía sin usar la consola?",
  ],
  evidence: [
    "Captura de la ventana con registros reales.",
    "Código de cargar_registros().",
    "Comparación entre un documento y su fila.",
    "Diagrama del recorrido de datos.",
  ],
});

Object.assign(CRUD_PRACTICES[12], {
  title: "Registro de datos con Flet y Firebase",
  icon: "📝",
  context:
    "La práctica 11 permitió consultar el inventario. Ahora se agrega la operación Crear mediante una interfaz Flet, conservando el servicio Firebase y el modelo de datos del mismo proyecto.",
  situation:
    "Durante un recorrido por el plantel, los alumnos necesitan capturar una nueva planta con controles claros, validación y confirmación visual de que Firebase la recibió.",
  expected: [
    "Construye un formulario visual con Flet.",
    "Valida campos escolares antes de guardar.",
    "Crea documentos en la colección plantas.",
    "Actualiza una vista previa después del registro.",
  ],
  materials: [
    "Proyecto completado hasta la práctica 11.",
    "Python, flet y firebase-admin instalados.",
    "Servicio Firebase ya conectado.",
    "Datos de una planta observada en el plantel.",
  ],
  previous: [
    "firebase_service.py, colección plantas y función obtener_plantas().",
    "El mismo modelo mostrado en la tabla Tkinter.",
  ],
  newParts: [
    "Función crear_planta().",
    "Formulario Flet con TextField y Dropdown.",
    "Validación, SnackBar y tabla de últimos registros.",
  ],
  steps: [
    ["1. Ampliar el servicio", "Agrega crear_planta(datos) a firebase_service.py; debe devolver el ID generado."],
    ["2. Diseñar el formulario", "Crea controles para nombre, tipo, responsable, grupo, ubicación y estado."],
    ["3. Validar", "Impide guardar cuando nombre, grupo o ubicación estén vacíos."],
    ["4. Construir el documento", "Transforma los valores de los controles en un diccionario consistente."],
    ["5. Guardar y comunicar", "Llama crear_planta(), muestra el ID creado y limpia el formulario."],
    ["6. Confirmar visualmente", "Recarga la tabla inferior y comprueba que el nuevo registro aparezca."],
  ],
  snippetTitle: "Código incremental: formulario y alta",
  snippet: `# firebase_service.py
def crear_planta(datos):
    _, referencia = db.collection("plantas").add(datos)
    return referencia.id

# registro_flet.py
def guardar(e):
    if not nombre.value.strip() or not grupo.value.strip():
        mostrar_mensaje("Completa nombre y grupo.", True)
        return

    datos = {
        "nombre_comun": nombre.value.strip(),
        "tipo_planta": tipo.value,
        "alumno_responsable": responsable.value.strip(),
        "grupo_responsable": grupo.value.strip(),
        "ubicacion": ubicacion.value.strip(),
        "estado": estado.value,
    }
    try:
        documento_id = crear_planta(datos)
        mostrar_mensaje(f"Registro guardado: {documento_id}")
        limpiar_formulario()
        cargar_tabla()
    except Exception as error:
        mostrar_mensaje(f"No se pudo guardar: {error}", True)`,
  explanation: [
    ["add(datos)", "Crea un documento con ID automático en la colección plantas."],
    ["TextField", "Captura texto mediante un control visual."],
    ["Dropdown", "Limita valores como tipo y estado a opciones válidas."],
    ["strip()", "Evita aceptar campos que solo contienen espacios."],
    ["SnackBar", "Comunica éxito o error sin depender de mensajes de consola."],
    ["cargar_tabla()", "Confirma visualmente el alta usando la consulta anterior."],
  ],
  guided: [
    "Intenta guardar con el grupo vacío y observa la validación.",
    "Registra una planta con todos los campos.",
    "Copia el ID mostrado y localiza el documento en Firebase.",
    "Registra una segunda planta del mismo grupo y comprueba la tabla.",
  ],
  challenge:
    "Añade un campo de observaciones y una fecha de servidor usando firestore.SERVER_TIMESTAMP.",
  reflection: [
    "¿Qué partes se conservaron de la práctica 11?",
    "¿Por qué conviene usar Dropdown para valores controlados?",
    "¿Qué diferencia existe entre validar y guardar?",
    "¿Cómo confirma la interfaz que Firebase recibió el documento?",
  ],
  evidence: [
    "Captura del formulario y la tabla actualizada.",
    "Prueba de validación de un campo vacío.",
    "Documento creado en Firebase Console.",
    "Código de crear_planta() y guardar().",
  ],
});

Object.assign(CRUD_PRACTICES[13], {
  title: "Buscador de registros con NiceGUI y Firebase",
  icon: "🔎",
  context:
    "El proyecto ya consulta y registra plantas. En esta práctica se reutiliza la colección para localizar documentos por nombre, grupo responsable o ID mediante una aplicación web visual con NiceGUI.",
  situation:
    "El inventario creció y la docente necesita encontrar rápidamente lo capturado por un grupo o localizar un documento específico incluido en un reporte.",
  expected: [
    "Busca por nombre, grupo o ID.",
    "Muestra resultados en una tabla NiceGUI.",
    "Distingue una búsqueda sin coincidencias de un error de conexión.",
    "Reutiliza las funciones del servicio compartido.",
  ],
  materials: [
    "Proyecto completado hasta la práctica 12.",
    "Python, nicegui y firebase-admin instalados.",
    "IDs y grupos de documentos de prueba.",
    "Servicio Firebase del proyecto.",
  ],
  previous: [
    "crear_planta() y obtener_plantas().",
    "Colección y campos capturados con Flet.",
  ],
  newParts: [
    "buscar_por_id() y filtro textual.",
    "Selector Nombre, Grupo o ID.",
    "Tabla web y notificaciones NiceGUI.",
  ],
  steps: [
    ["1. Crear la página", "Construye un encabezado, input, selector de criterio y botón Buscar."],
    ["2. Resolver ID", "Usa document(id).get() y comprueba exists."],
    ["3. Resolver nombre o grupo", "Recupera la colección y filtra con casefold() para ignorar mayúsculas."],
    ["4. Actualizar la tabla", "Asigna una nueva lista a rows y ejecuta table.update()."],
    ["5. Informar", "Usa ui.notify para mostrar coincidencias, resultados vacíos o errores."],
    ["6. Probar", "Busca por los tres criterios y documenta el resultado esperado."],
  ],
  snippetTitle: "Código incremental: búsqueda visual",
  snippet: `def ejecutar_busqueda():
    termino = entrada.value.strip()
    criterio_actual = criterio.value

    try:
        if criterio_actual == "ID":
            resultados = buscar_por_id(termino) if termino else []
        else:
            campo = (
                "nombre_comun"
                if criterio_actual == "Nombre"
                else "grupo_responsable"
            )
            resultados = [
                planta for planta in obtener_plantas()
                if termino.casefold()
                in planta.get(campo, "").casefold()
            ]

        tabla.rows = resultados
        tabla.update()
        ui.notify(
            f"{len(resultados)} coincidencia(s)"
            if resultados else "No existen resultados",
            type="positive" if resultados else "warning",
        )
    except Exception as error:
        ui.notify(f"Error al buscar: {error}", type="negative")`,
  explanation: [
    ["ui.select", "Permite elegir visualmente el criterio."],
    ["document(id).get()", "Hace una lectura directa cuando el ID es conocido."],
    ["casefold()", "Normaliza texto para búsquedas sin distinguir mayúsculas."],
    ["table.rows", "Contiene los diccionarios que NiceGUI representa como filas."],
    ["table.update()", "Redibuja la tabla después de cambiar los resultados."],
    ["ui.notify", "Muestra mensajes visuales breves."],
  ],
  guided: [
    "Busca una planta por una parte de su nombre.",
    "Busca todos los documentos de tu grupo.",
    "Copia un ID de Firebase y localízalo.",
    "Escribe un valor inexistente y comprueba el mensaje.",
  ],
  challenge:
    "Agrega un filtro adicional de tipo de planta y un botón Mostrar todos.",
  reflection: [
    "¿Por qué buscar por ID es diferente a buscar por nombre?",
    "¿Qué campo conecta el registro Flet con el buscador NiceGUI?",
    "¿Por qué una lista vacía no es un error?",
    "¿Qué función del servicio se reutiliza?",
  ],
  evidence: [
    "Capturas de búsquedas por nombre, grupo e ID.",
    "Captura de un resultado vacío.",
    "Código de ejecutar_busqueda().",
    "Tabla de casos de prueba.",
  ],
});

Object.assign(CRUD_PRACTICES[14], {
  title: "Actualización de registros con Flet y Firebase",
  icon: "✏️",
  context:
    "Después de consultar, registrar y buscar, PlantApp debe corregir información existente sin duplicar documentos. Se vuelve a Flet y se amplía el formulario de la práctica 12.",
  situation:
    "Una planta cambió de ubicación y otro registro tiene el grupo incorrecto. El alumno debe seleccionar la fila, cargar sus datos, editarlos y mantener el mismo ID.",
  expected: [
    "Selecciona un documento desde una tabla Flet.",
    "Carga sus datos en el formulario.",
    "Actualiza el documento exacto en Firestore.",
    "Comprueba que el ID no cambió.",
  ],
  materials: [
    "Proyecto completado hasta la práctica 13.",
    "Formulario Flet de la práctica 12.",
    "Dos documentos preparados para corrección.",
    "Acceso a Firebase Console para verificar.",
  ],
  previous: [
    "Formulario, validación, tabla y crear_planta().",
    "Campos e IDs usados en consulta y búsqueda.",
  ],
  newParts: [
    "actualizar_planta(id, cambios).",
    "Botón Editar por fila.",
    "Modo edición, botón Cancelar y recarga.",
  ],
  steps: [
    ["1. Agregar la operación", "Crea actualizar_planta() en el servicio usando document(id).update(cambios)."],
    ["2. Añadir acciones", "Incluye un IconButton Editar en cada fila."],
    ["3. Conservar el ID", "Guarda el ID seleccionado en una variable; no lo pidas al usuario en un TextField."],
    ["4. Llenar controles", "Copia los valores del diccionario seleccionado al formulario existente."],
    ["5. Guardar cambios", "El botón principal decide entre crear o actualizar según exista una selección."],
    ["6. Verificar", "Recarga la tabla y confirma en Firebase que cambió el contenido, no el ID."],
  ],
  snippetTitle: "Código incremental: modo edición",
  snippet: `def seleccionar(planta):
    nonlocal registro_seleccionado_id
    registro_seleccionado_id = planta["id"]
    nombre.value = planta.get("nombre_comun", "")
    grupo.value = planta.get("grupo_responsable", "")
    ubicacion.value = planta.get("ubicacion", "")
    tipo.value = planta.get("tipo_planta")
    estado.value = planta.get("estado", "Activa")
    boton_guardar.text = "Actualizar registro"
    page.update()

def guardar_o_actualizar(e):
    datos = datos_formulario()
    try:
        if registro_seleccionado_id:
            actualizar_planta(registro_seleccionado_id, datos)
            mensaje = "Registro actualizado."
        else:
            crear_planta(datos)
            mensaje = "Registro creado."
        cancelar_edicion()
        cargar_tabla()
        mostrar_mensaje(mensaje)
    except Exception as error:
        mostrar_mensaje(f"No se guardaron los cambios: {error}", True)`,
  explanation: [
    ["registro_seleccionado_id", "Indica si el formulario está creando o editando."],
    ["update(cambios)", "Modifica campos del documento sin generar un ID nuevo."],
    ["nonlocal", "Permite modificar la selección definida dentro de main()."],
    [".value", "Carga y recupera datos de los controles Flet."],
    ["Cancelar", "Sale del modo edición sin escribir en Firebase."],
    ["cargar_tabla()", "Muestra inmediatamente los datos actualizados."],
  ],
  guided: [
    "Selecciona una fila y cambia solo la ubicación.",
    "Verifica que el ID permanezca igual.",
    "Edita el grupo y busca el registro con la práctica 13.",
    "Entra en modo edición y cancela sin guardar.",
  ],
  challenge:
    "Muestra una etiqueta Modo edición con el ID abreviado y resalta el formulario mientras exista una selección.",
  reflection: [
    "¿Por qué no se usa add() al editar?",
    "¿Cómo sabe el botón qué operación realizar?",
    "¿Qué riesgo evita el botón Cancelar?",
    "¿Cómo se verifica que no se creó un duplicado?",
  ],
  evidence: [
    "Capturas antes y después de actualizar.",
    "Documento con el mismo ID en Firebase.",
    "Código de seleccionar() y guardar_o_actualizar().",
    "Prueba de cancelación.",
  ],
});

Object.assign(CRUD_PRACTICES[15], {
  title: "Eliminación segura con Tkinter y Firebase",
  icon: "🗑️",
  context:
    "La aplicación ya crea, consulta, busca y actualiza. Para completar las operaciones básicas se amplía la ventana Tkinter de la práctica 11 con una eliminación protegida.",
  situation:
    "Un documento de prueba está duplicado. Debe eliminarse sin depender de la consola y sin permitir que un clic accidental borre otra fila.",
  expected: [
    "Selecciona una fila de Tkinter y obtiene su ID.",
    "Solicita confirmación con messagebox.",
    "Elimina el documento exacto.",
    "Maneja selección vacía y errores de Firebase.",
  ],
  materials: [
    "Ventana Tkinter de la práctica 11.",
    "Proyecto completado hasta la práctica 14.",
    "Un documento de prueba que pueda borrarse.",
    "Acceso a Firebase Console.",
  ],
  previous: [
    "Treeview, botón Actualizar y obtener_plantas().",
    "ID asociado a cada fila mediante iid.",
  ],
  newParts: [
    "eliminar_planta(id).",
    "Botón Eliminar seleccionado.",
    "Confirmación askyesno y mensajes de error.",
  ],
  steps: [
    ["1. Añadir delete", "Crea eliminar_planta(id) en firebase_service.py."],
    ["2. Revisar selección", "Obtén tabla.selection(); si está vacío, muestra una advertencia."],
    ["3. Identificar", "Usa el iid de la fila como ID del documento y muestra su nombre en la confirmación."],
    ["4. Confirmar", "Ejecuta askyesno antes de llamar Firebase."],
    ["5. Eliminar y recargar", "Si la respuesta es afirmativa, elimina, vuelve a consultar y muestra éxito."],
    ["6. Probar cancelación", "Primero cancela y confirma que el documento continúa."],
  ],
  snippetTitle: "Código incremental: eliminación confirmada",
  snippet: `from tkinter import messagebox

def eliminar_seleccionado():
    seleccion = tabla.selection()
    if not seleccion:
        messagebox.showwarning("Sin selección", "Selecciona un registro.")
        return

    documento_id = seleccion[0]
    nombre = tabla.item(documento_id, "values")[0]
    confirmar = messagebox.askyesno(
        "Confirmar eliminación",
        f"¿Eliminar '{nombre}'?\\nEsta acción no se puede deshacer.",
    )
    if not confirmar:
        return

    try:
        eliminar_planta(documento_id)
        cargar_registros()
        messagebox.showinfo("Listo", "Registro eliminado.")
    except Exception as error:
        messagebox.showerror("Error", f"No se pudo eliminar:\\n{error}")`,
  explanation: [
    ["selection()", "Devuelve la fila seleccionada por el usuario."],
    ["iid", "Es el ID de Firestore guardado detrás de la fila."],
    ["askyesno", "Detiene el flujo hasta confirmar o cancelar."],
    ["delete()", "Elimina la referencia exacta del documento."],
    ["showwarning", "Evita intentar borrar cuando no existe selección."],
    ["showerror", "Comunica una falla sin cerrar la aplicación."],
  ],
  guided: [
    "Pulsa Eliminar sin seleccionar una fila.",
    "Selecciona el registro de prueba y cancela.",
    "Comprueba que continúa en la tabla.",
    "Confirma la eliminación y verifica Firebase Console.",
  ],
  challenge:
    "Implementa una alternativa de archivado que cambie estado a Archivada en lugar de eliminar físicamente.",
  reflection: [
    "¿Por qué se elimina por ID y no por nombre?",
    "¿Qué ocurre cuando el usuario cancela?",
    "¿Cuál es la diferencia entre eliminar y archivar?",
    "¿Qué respaldo sería adecuado en un sistema real?",
  ],
  evidence: [
    "Captura de la advertencia sin selección.",
    "Captura del cuadro de confirmación.",
    "Pruebas de Cancelar y Aceptar.",
    "Código de eliminar_seleccionado().",
  ],
});

Object.assign(CRUD_PRACTICES[16], {
  title: "Panel administrativo con NiceGUI y Firebase",
  icon: "📊",
  context:
    "Con las operaciones CRUD disponibles, el proyecto necesita transformar los documentos en información resumida. El panel NiceGUI consulta la misma colección y presenta indicadores visuales.",
  situation:
    "La coordinación escolar solicita conocer total de registros, grupos participantes, plantas activas y distribución por tipo sin revisar documento por documento.",
  expected: [
    "Calcula métricas desde una sola lectura.",
    "Presenta tarjetas, tabla y barras visuales.",
    "Actualiza indicadores bajo demanda.",
    "Explica cómo se obtienen los conteos.",
  ],
  materials: [
    "Proyecto completado hasta la práctica 15.",
    "Python, nicegui y firebase-admin.",
    "Al menos diez documentos variados.",
    "Servicio Firebase compartido.",
  ],
  previous: [
    "obtener_plantas() y todos los campos del proyecto.",
    "Tabla NiceGUI utilizada en el buscador.",
  ],
  newParts: [
    "Tarjetas de total, grupos y activos.",
    "Conteo por tipo con Counter.",
    "Panel y tabla sincronizados con una lectura.",
  ],
  steps: [
    ["1. Definir indicadores", "Especifica qué significa total, grupos y activos."],
    ["2. Crear tarjetas", "Construye labels dentro de cards para actualizar sus valores."],
    ["3. Consultar una vez", "Obtén las plantas y usa esa lista para tabla y métricas."],
    ["4. Calcular", "Usa set para grupos únicos, sum para activos y Counter para tipos."],
    ["5. Dibujar", "Genera barras de progreso proporcionales al total."],
    ["6. Actualizar", "Conecta un botón que vuelva a consultar y redibuje el panel."],
  ],
  snippetTitle: "Código incremental: métricas visuales",
  snippet: `from collections import Counter

def actualizar_panel():
    try:
        plantas = obtener_plantas()
        total = len(plantas)
        grupos = {
            p.get("grupo_responsable", "").strip().casefold()
            for p in plantas if p.get("grupo_responsable")
        }
        activas = sum(
            p.get("estado", "").casefold() == "activa"
            for p in plantas
        )
        tipos = Counter(p.get("tipo_planta", "Sin tipo") for p in plantas)

        valor_total.text = str(total)
        valor_grupos.text = str(len(grupos))
        valor_activas.text = str(activas)
        tabla.rows = plantas
        barras.clear()
        with barras:
            for tipo, cantidad in tipos.most_common():
                ui.label(f"{tipo}: {cantidad}")
                ui.linear_progress(value=cantidad / total if total else 0)
        tabla.update()
    except Exception as error:
        ui.notify(f"No se pudo actualizar: {error}", type="negative")`,
  explanation: [
    ["set", "Elimina grupos repetidos para contar participantes únicos."],
    ["sum(condición)", "Cuenta documentos que cumplen el estado Activa."],
    ["Counter", "Agrupa documentos por tipo."],
    ["ui.card", "Presenta cada indicador como bloque visual."],
    ["ui.linear_progress", "Representa una proporción entre 0 y 1."],
    ["Una lectura", "Mantiene tabla e indicadores en el mismo estado de datos."],
  ],
  guided: [
    "Calcula manualmente los indicadores antes de abrir el panel.",
    "Compara tus resultados con las tarjetas.",
    "Crea un registro desde la práctica 12 y actualiza el panel.",
    "Modifica un estado y comprueba la nueva métrica.",
  ],
  challenge:
    "Añade una tarjeta con la ubicación más frecuente y muestra el porcentaje que representa.",
  reflection: [
    "¿Por qué se consulta una sola vez?",
    "¿Qué indicador usa un conjunto y por qué?",
    "¿Qué ocurre con las barras cuando no hay datos?",
    "¿Cuándo convendría precalcular métricas?",
  ],
  evidence: [
    "Captura completa del panel.",
    "Comparación de cálculo manual y resultado.",
    "Código de actualizar_panel().",
    "Prueba de actualización tras un cambio.",
  ],
});

Object.assign(CRUD_PRACTICES[17], {
  title: "Proyecto integrador CRUD visual con NiceGUI y Firebase",
  icon: "🚀",
  context:
    "La práctica final integra en una sola aplicación web visual lo construido con diferentes interfaces: consulta, registro, búsqueda, actualización, eliminación segura y panel.",
  situation:
    "PlantApp se presentará como producto escolar funcional. Un usuario debe poder administrar el inventario completo desde una sola pantalla, sin usar Firebase Console para las operaciones normales.",
  expected: [
    "Integra Crear, Leer, Buscar, Actualizar y Eliminar.",
    "Reutiliza un servicio Firebase común.",
    "Sincroniza formulario, tabla y panel.",
    "Valida entradas y prueba errores de forma sistemática.",
  ],
  materials: [
    "Proyecto completado hasta la práctica 16.",
    "Python, NiceGUI y firebase-admin.",
    "Colección plantas con datos de prueba.",
    "Matriz de casos y lista de cotejo.",
  ],
  previous: [
    "Todas las funciones de firebase_service.py.",
    "Formulario Flet, buscador NiceGUI, selección por ID, confirmación y métricas.",
  ],
  newParts: [
    "Una sola aplicación NiceGUI con pestañas.",
    "Formulario reutilizado para crear y editar.",
    "Función refrescar() para tabla e indicadores.",
  ],
  steps: [
    ["1. Ordenar el proyecto", "Mantén firebase_service.py separado de app_crud.py."],
    ["2. Crear pestañas", "Organiza Panel, Registros y Formulario sin duplicar la conexión."],
    ["3. Unificar crear y editar", "El formulario crea cuando no hay ID seleccionado y actualiza cuando sí existe."],
    ["4. Integrar búsqueda", "Filtra la lista visible por nombre, grupo o ID."],
    ["5. Proteger eliminación", "Solicita confirmación en un dialog antes de delete()."],
    ["6. Sincronizar", "Después de cada cambio ejecuta refrescar() para tabla y métricas."],
    ["7. Evaluar", "Prueba datos válidos, campos vacíos, ID inexistente, cancelación y error de red."],
  ],
  snippetTitle: "Código incremental final: flujo CRUD",
  snippet: `registro_id = None

def guardar():
    global registro_id
    datos = leer_formulario()
    error = validar(datos)
    if error:
        ui.notify(error, type="warning")
        return
    try:
        if registro_id:
            actualizar_planta(registro_id, datos)
            ui.notify("Registro actualizado", type="positive")
        else:
            crear_planta(datos)
            ui.notify("Registro creado", type="positive")
        cancelar_edicion()
        refrescar()
    except Exception as error:
        ui.notify(f"Operación no completada: {error}", type="negative")

def refrescar():
    plantas = obtener_plantas()
    tabla.rows = aplicar_filtro(plantas)
    tabla.update()
    actualizar_indicadores(plantas)`,
  explanation: [
    ["firebase_service.py", "Centraliza las operaciones y evita repetir conexión."],
    ["registro_id", "Determina si el formulario crea o actualiza."],
    ["refrescar()", "Sincroniza tabla y panel después de cada escritura."],
    ["ui.dialog", "Solicita confirmación antes de eliminar."],
    ["aplicar_filtro()", "Reutiliza la búsqueda sin modificar Firebase."],
    ["validar()", "Impide enviar documentos incompletos."],
  ],
  guided: [
    "Ejecuta crear → buscar → editar → eliminar desde una sola aplicación.",
    "Comprueba el panel después de cada operación.",
    "Prueba un formulario incompleto y una eliminación cancelada.",
    "Intercambia equipo y aplica la lista de cotejo sin explicar el uso.",
  ],
  challenge:
    "Agrega autenticación ya conocida por el curso y muestra el correo del usuario activo; documenta que la autorización debe reforzarse con reglas o un backend.",
  reflection: [
    "¿Qué partes cambiaron de interfaz pero conservaron la misma lógica?",
    "¿Por qué el servicio Firebase debe estar separado?",
    "¿Qué operación presenta mayor riesgo?",
    "¿Cómo demuestra la matriz de pruebas que el CRUD funciona?",
    "¿Qué mejorarías antes de publicar la aplicación?",
  ],
  evidence: [
    "Video del flujo CRUD completo.",
    "Código final sin credenciales ni secretos.",
    "Diagrama de componentes.",
    "Matriz con al menos ocho casos de prueba.",
    "Conclusión individual del proyecto.",
  ],
});

COMPLETE_CODE[11] = `# firebase_service.py (se conserva en todas las prácticas)
import firebase_admin
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    cred = credentials.Certificate("credenciales/firebase-key.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()
coleccion = db.collection("plantas")

def obtener_plantas():
    registros = []
    for doc in coleccion.stream():
        planta = doc.to_dict()
        planta["id"] = doc.id
        registros.append(planta)
    return registros


# consulta_tkinter.py
import tkinter as tk
from tkinter import ttk
from firebase_service import obtener_plantas

ventana = tk.Tk()
ventana.title("PlantApp · Consulta de registros")
ventana.geometry("980x560")
ventana.configure(bg="#eef4ed")

tk.Label(
    ventana, text="Inventario escolar de plantas",
    font=("Arial", 22, "bold"), bg="#eef4ed", fg="#1b4332",
).pack(pady=(24, 6))
tk.Label(
    ventana, text="Datos recuperados desde Firebase",
    font=("Arial", 11), bg="#eef4ed", fg="#52796f",
).pack()

contenedor = tk.Frame(ventana, bg="white", padx=16, pady=16)
contenedor.pack(fill="both", expand=True, padx=24, pady=20)

columnas = ("nombre", "tipo", "grupo", "ubicacion", "estado")
tabla = ttk.Treeview(contenedor, columns=columnas, show="headings")
for clave, titulo, ancho in [
    ("nombre", "Nombre", 180), ("tipo", "Tipo", 130),
    ("grupo", "Grupo", 110), ("ubicacion", "Ubicación", 180),
    ("estado", "Estado", 110),
]:
    tabla.heading(clave, text=titulo)
    tabla.column(clave, width=ancho, anchor="center")

scroll = ttk.Scrollbar(contenedor, orient="vertical", command=tabla.yview)
tabla.configure(yscrollcommand=scroll.set)
tabla.pack(side="left", fill="both", expand=True)
scroll.pack(side="right", fill="y")

estado_var = tk.StringVar(value="Listo para consultar")

def cargar_registros():
    for fila in tabla.get_children():
        tabla.delete(fila)
    try:
        plantas = obtener_plantas()
        for p in plantas:
            tabla.insert("", "end", iid=p["id"], values=(
                p.get("nombre_comun", "Sin dato"),
                p.get("tipo_planta", "Sin dato"),
                p.get("grupo_responsable", "Sin grupo"),
                p.get("ubicacion", "Sin dato"),
                p.get("estado", "Pendiente"),
            ))
        estado_var.set(f"{len(plantas)} registro(s) cargado(s)")
    except Exception as error:
        estado_var.set(f"Error de lectura: {error}")

pie = tk.Frame(ventana, bg="#eef4ed")
pie.pack(fill="x", padx=24, pady=(0, 20))
tk.Button(
    pie, text="Actualizar", command=cargar_registros,
    bg="#4f772d", fg="white", padx=18, pady=8,
).pack(side="left")
tk.Label(pie, textvariable=estado_var, bg="#eef4ed", fg="#31572c").pack(side="right")

cargar_registros()
ventana.mainloop()`;

COMPLETE_CODE[12] = `# firebase_service.py — agrega a la versión de la práctica 11
def crear_planta(datos):
    _, referencia = coleccion.add(datos)
    return referencia.id


# registro_flet.py
import flet as ft
from firebase_service import obtener_plantas, crear_planta

def main(page: ft.Page):
    page.title = "PlantApp · Registro"
    page.theme = ft.Theme(color_scheme_seed="#4F772D")
    page.bgcolor = "#EEF4ED"
    page.scroll = ft.ScrollMode.AUTO

    nombre = ft.TextField(label="Nombre común", col={"md": 6})
    tipo = ft.Dropdown(
        label="Tipo", col={"md": 6},
        options=[ft.dropdown.Option(x) for x in
                 ["Ornamental", "Medicinal", "Aromática", "Frutal"]],
    )
    responsable = ft.TextField(label="Alumno responsable", col={"md": 6})
    grupo = ft.TextField(label="Grupo responsable", col={"md": 6})
    ubicacion = ft.TextField(label="Ubicación", col={"md": 6})
    estado = ft.Dropdown(
        label="Estado", value="Activa", col={"md": 6},
        options=[ft.dropdown.Option("Activa"), ft.dropdown.Option("Pendiente")],
    )
    tabla = ft.DataTable(
        columns=[ft.DataColumn(ft.Text(x)) for x in
                 ["Nombre", "Grupo", "Ubicación", "Estado"]],
        rows=[],
    )

    def mensaje(texto, error=False):
        page.open(ft.SnackBar(
            ft.Text(texto), bgcolor="#B3261E" if error else "#31572C"
        ))

    def limpiar():
        for control in [nombre, responsable, grupo, ubicacion]:
            control.value = ""
        tipo.value = None
        estado.value = "Activa"

    def cargar_tabla():
        tabla.rows = [
            ft.DataRow(cells=[
                ft.DataCell(ft.Text(p.get("nombre_comun", "Sin dato"))),
                ft.DataCell(ft.Text(p.get("grupo_responsable", "Sin grupo"))),
                ft.DataCell(ft.Text(p.get("ubicacion", "Sin dato"))),
                ft.DataCell(ft.Text(p.get("estado", "Pendiente"))),
            ]) for p in obtener_plantas()
        ]
        page.update()

    def guardar(e):
        if not nombre.value.strip() or not grupo.value.strip() or not ubicacion.value.strip():
            mensaje("Completa nombre, grupo y ubicación.", True)
            return
        datos = {
            "nombre_comun": nombre.value.strip(),
            "tipo_planta": tipo.value or "Sin clasificar",
            "alumno_responsable": responsable.value.strip(),
            "grupo_responsable": grupo.value.strip(),
            "ubicacion": ubicacion.value.strip(),
            "estado": estado.value,
        }
        try:
            documento_id = crear_planta(datos)
            limpiar()
            cargar_tabla()
            mensaje(f"Registro guardado: {documento_id}")
        except Exception as error:
            mensaje(f"No se pudo guardar: {error}", True)

    page.add(
        ft.Text("Registro de plantas", size=30, weight=ft.FontWeight.BOLD),
        ft.Text("Formulario visual conectado a Firebase"),
        ft.Container(
            bgcolor="white", border_radius=20, padding=24,
            content=ft.Column([
                ft.ResponsiveRow([nombre, tipo, responsable, grupo, ubicacion, estado]),
                ft.FilledButton("Guardar registro", icon=ft.Icons.SAVE, on_click=guardar),
            ]),
        ),
        ft.Text("Registros guardados", size=22, weight=ft.FontWeight.BOLD),
        ft.Row([tabla], scroll=ft.ScrollMode.AUTO),
    )
    cargar_tabla()

ft.app(target=main)`;

COMPLETE_CODE[13] = `# firebase_service.py — agrega a la versión anterior
def buscar_por_id(documento_id):
    doc = coleccion.document(documento_id).get()
    if not doc.exists:
        return []
    planta = doc.to_dict()
    planta["id"] = doc.id
    return [planta]


# buscador_nicegui.py
from nicegui import ui
from firebase_service import obtener_plantas, buscar_por_id

columnas = [
    {"name": "id", "label": "ID", "field": "id"},
    {"name": "nombre", "label": "Nombre", "field": "nombre_comun"},
    {"name": "grupo", "label": "Grupo", "field": "grupo_responsable"},
    {"name": "tipo", "label": "Tipo", "field": "tipo_planta"},
    {"name": "ubicacion", "label": "Ubicación", "field": "ubicacion"},
]

with ui.header().classes("bg-green-900"):
    ui.label("PlantApp · Buscador").classes("text-h5")

with ui.card().classes("w-full max-w-6xl mx-auto mt-6"):
    ui.label("Buscar registros").classes("text-h5 text-green-900")
    with ui.row().classes("w-full items-end"):
        criterio = ui.select(["Nombre", "Grupo", "ID"], value="Nombre", label="Criterio")
        entrada = ui.input("Nombre, grupo o ID").classes("grow")
        ui.button("Buscar", icon="search", on_click=lambda: buscar())
        ui.button("Mostrar todos", on_click=lambda: mostrar_todos()).props("outline")
    tabla = ui.table(columns=columnas, rows=[], row_key="id").classes("w-full")

def buscar():
    termino = entrada.value.strip()
    try:
        if criterio.value == "ID":
            resultados = buscar_por_id(termino) if termino else []
        else:
            campo = "nombre_comun" if criterio.value == "Nombre" else "grupo_responsable"
            resultados = [
                p for p in obtener_plantas()
                if termino.casefold() in p.get(campo, "").casefold()
            ]
        tabla.rows = resultados
        tabla.update()
        ui.notify(
            f"{len(resultados)} coincidencia(s)" if resultados else "No existen resultados",
            type="positive" if resultados else "warning",
        )
    except Exception as error:
        ui.notify(f"Error al buscar: {error}", type="negative")

def mostrar_todos():
    try:
        tabla.rows = obtener_plantas()
        tabla.update()
    except Exception as error:
        ui.notify(str(error), type="negative")

mostrar_todos()
ui.run(title="PlantApp · Buscador", reload=False)`;

COMPLETE_CODE[14] = `# firebase_service.py — agrega a la versión anterior
def actualizar_planta(documento_id, cambios):
    coleccion.document(documento_id).update(cambios)


# actualizar_flet.py
import flet as ft
from firebase_service import crear_planta, obtener_plantas, actualizar_planta

def main(page: ft.Page):
    page.title = "PlantApp · Actualización"
    page.theme = ft.Theme(color_scheme_seed="#4F772D")
    page.scroll = ft.ScrollMode.AUTO
    registro_id = None

    nombre = ft.TextField(label="Nombre común")
    grupo = ft.TextField(label="Grupo")
    ubicacion = ft.TextField(label="Ubicación")
    tipo = ft.Dropdown(label="Tipo", options=[
        ft.dropdown.Option(x) for x in
        ["Ornamental", "Medicinal", "Aromática", "Frutal"]
    ])
    estado = ft.Dropdown(label="Estado", value="Activa", options=[
        ft.dropdown.Option("Activa"), ft.dropdown.Option("Pendiente")
    ])
    boton = ft.FilledButton("Guardar registro")
    tabla = ft.DataTable(
        columns=[ft.DataColumn(ft.Text(x)) for x in
                 ["Nombre", "Grupo", "Ubicación", "Acciones"]],
        rows=[],
    )

    def datos():
        return {
            "nombre_comun": nombre.value.strip(),
            "grupo_responsable": grupo.value.strip(),
            "ubicacion": ubicacion.value.strip(),
            "tipo_planta": tipo.value,
            "estado": estado.value,
        }

    def cancelar(e=None):
        nonlocal registro_id
        registro_id = None
        nombre.value = grupo.value = ubicacion.value = ""
        tipo.value = None
        estado.value = "Activa"
        boton.text = "Guardar registro"
        page.update()

    def seleccionar(planta):
        nonlocal registro_id
        registro_id = planta["id"]
        nombre.value = planta.get("nombre_comun", "")
        grupo.value = planta.get("grupo_responsable", "")
        ubicacion.value = planta.get("ubicacion", "")
        tipo.value = planta.get("tipo_planta")
        estado.value = planta.get("estado", "Activa")
        boton.text = "Actualizar registro"
        page.update()

    def cargar():
        tabla.rows = [
            ft.DataRow(data=p["id"], cells=[
                ft.DataCell(ft.Text(p.get("nombre_comun", ""))),
                ft.DataCell(ft.Text(p.get("grupo_responsable", ""))),
                ft.DataCell(ft.Text(p.get("ubicacion", ""))),
                ft.DataCell(ft.IconButton(
                    ft.Icons.EDIT, tooltip="Editar",
                    on_click=lambda e, planta=p: seleccionar(planta),
                )),
            ]) for p in obtener_plantas()
        ]
        page.update()

    def guardar(e):
        nonlocal registro_id
        if not nombre.value.strip() or not grupo.value.strip():
            page.open(ft.SnackBar(ft.Text("Completa nombre y grupo.")))
            return
        try:
            if registro_id:
                actualizar_planta(registro_id, datos())
                texto = "Registro actualizado."
            else:
                crear_planta(datos())
                texto = "Registro creado."
            cancelar()
            cargar()
            page.open(ft.SnackBar(ft.Text(texto)))
        except Exception as error:
            page.open(ft.SnackBar(ft.Text(f"Error: {error}")))

    boton.on_click = guardar
    page.add(
        ft.Text("Crear y actualizar", size=30, weight=ft.FontWeight.BOLD),
        ft.ResponsiveRow([nombre, grupo, ubicacion, tipo, estado]),
        ft.Row([boton, ft.OutlinedButton("Cancelar edición", on_click=cancelar)]),
        ft.Row([tabla], scroll=ft.ScrollMode.AUTO),
    )
    cargar()

ft.app(target=main)`;

COMPLETE_CODE[15] = `# firebase_service.py — agrega a la versión anterior
def eliminar_planta(documento_id):
    coleccion.document(documento_id).delete()


# eliminar_tkinter.py
import tkinter as tk
from tkinter import ttk, messagebox
from firebase_service import obtener_plantas, eliminar_planta

ventana = tk.Tk()
ventana.title("PlantApp · Eliminación segura")
ventana.geometry("900x520")
ventana.configure(bg="#eef4ed")

tk.Label(
    ventana, text="Administrar registros",
    font=("Arial", 22, "bold"), bg="#eef4ed", fg="#1b4332",
).pack(pady=20)

columnas = ("nombre", "grupo", "ubicacion", "estado")
tabla = ttk.Treeview(ventana, columns=columnas, show="headings", selectmode="browse")
for clave, titulo in [
    ("nombre", "Nombre"), ("grupo", "Grupo"),
    ("ubicacion", "Ubicación"), ("estado", "Estado"),
]:
    tabla.heading(clave, text=titulo)
    tabla.column(clave, width=180, anchor="center")
tabla.pack(fill="both", expand=True, padx=24)

def cargar_registros():
    for fila in tabla.get_children():
        tabla.delete(fila)
    try:
        for p in obtener_plantas():
            tabla.insert("", "end", iid=p["id"], values=(
                p.get("nombre_comun", "Sin dato"),
                p.get("grupo_responsable", "Sin grupo"),
                p.get("ubicacion", "Sin dato"),
                p.get("estado", "Pendiente"),
            ))
    except Exception as error:
        messagebox.showerror("Error", str(error))

def eliminar_seleccionado():
    seleccion = tabla.selection()
    if not seleccion:
        messagebox.showwarning("Sin selección", "Selecciona un registro.")
        return
    documento_id = seleccion[0]
    nombre = tabla.item(documento_id, "values")[0]
    if not messagebox.askyesno(
        "Confirmar eliminación",
        f"¿Eliminar '{nombre}'?\\nEsta acción no se puede deshacer.",
    ):
        return
    try:
        eliminar_planta(documento_id)
        cargar_registros()
        messagebox.showinfo("Listo", "Registro eliminado.")
    except Exception as error:
        messagebox.showerror("Error", f"No se pudo eliminar:\\n{error}")

acciones = tk.Frame(ventana, bg="#eef4ed")
acciones.pack(fill="x", padx=24, pady=18)
tk.Button(acciones, text="Actualizar", command=cargar_registros).pack(side="left")
tk.Button(
    acciones, text="Eliminar seleccionado", command=eliminar_seleccionado,
    bg="#b3261e", fg="white", padx=14,
).pack(side="right")

cargar_registros()
ventana.mainloop()`;

COMPLETE_CODE[16] = `from collections import Counter
from nicegui import ui
from firebase_service import obtener_plantas

with ui.header().classes("bg-green-900"):
    ui.label("PlantApp · Panel administrativo").classes("text-h5")

with ui.column().classes("w-full max-w-7xl mx-auto p-6"):
    ui.button("Actualizar panel", icon="refresh", on_click=lambda: actualizar())
    with ui.row().classes("w-full"):
        with ui.card().classes("grow"):
            ui.label("Total de registros")
            total_label = ui.label("0").classes("text-h3 text-green-900")
        with ui.card().classes("grow"):
            ui.label("Grupos participantes")
            grupos_label = ui.label("0").classes("text-h3 text-green-900")
        with ui.card().classes("grow"):
            ui.label("Registros activos")
            activas_label = ui.label("0").classes("text-h3 text-green-900")

    with ui.row().classes("w-full items-start"):
        with ui.card().classes("grow"):
            ui.label("Distribución por tipo").classes("text-h6")
            barras = ui.column().classes("w-full")
        with ui.card().classes("grow"):
            ui.label("Inventario").classes("text-h6")
            tabla = ui.table(
                columns=[
                    {"name": "nombre", "label": "Nombre", "field": "nombre_comun"},
                    {"name": "grupo", "label": "Grupo", "field": "grupo_responsable"},
                    {"name": "tipo", "label": "Tipo", "field": "tipo_planta"},
                    {"name": "estado", "label": "Estado", "field": "estado"},
                ],
                rows=[], row_key="id",
            ).classes("w-full")

def actualizar():
    try:
        plantas = obtener_plantas()
        total = len(plantas)
        grupos = {p.get("grupo_responsable", "").strip().casefold()
                  for p in plantas if p.get("grupo_responsable")}
        activas = sum(p.get("estado", "").casefold() == "activa" for p in plantas)
        tipos = Counter(p.get("tipo_planta", "Sin tipo") for p in plantas)

        total_label.text = str(total)
        grupos_label.text = str(len(grupos))
        activas_label.text = str(activas)
        tabla.rows = plantas
        tabla.update()

        barras.clear()
        with barras:
            for tipo, cantidad in tipos.most_common():
                ui.label(f"{tipo}: {cantidad}")
                ui.linear_progress(value=cantidad / total if total else 0)
    except Exception as error:
        ui.notify(f"No se pudo actualizar: {error}", type="negative")

actualizar()
ui.run(title="PlantApp · Panel", reload=False)`;

COMPLETE_CODE[17] = `# firebase_service.py
import firebase_admin
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    cred = credentials.Certificate("credenciales/firebase-key.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()
coleccion = db.collection("plantas")

def crear_planta(datos):
    _, referencia = coleccion.add(datos)
    return referencia.id

def obtener_plantas():
    registros = []
    for doc in coleccion.stream():
        planta = doc.to_dict()
        planta["id"] = doc.id
        registros.append(planta)
    return registros

def actualizar_planta(documento_id, cambios):
    coleccion.document(documento_id).update(cambios)

def eliminar_planta(documento_id):
    coleccion.document(documento_id).delete()


# app_crud.py
from collections import Counter
from nicegui import ui
from firebase_service import (
    crear_planta, obtener_plantas,
    actualizar_planta, eliminar_planta,
)

registro_id = None
plantas_cache = []

with ui.header().classes("bg-green-900"):
    ui.label("PlantApp · CRUD escolar").classes("text-h5")

with ui.tabs().classes("w-full") as tabs:
    tab_panel = ui.tab("Panel")
    tab_registros = ui.tab("Registros")
    tab_formulario = ui.tab("Formulario")

with ui.tab_panels(tabs, value=tab_panel).classes("w-full"):
    with ui.tab_panel(tab_panel):
        with ui.row().classes("w-full"):
            total = ui.label("Total: 0").classes("text-h5")
            grupos = ui.label("Grupos: 0").classes("text-h5")
            activas = ui.label("Activas: 0").classes("text-h5")
        resumen = ui.column().classes("w-full")

    with ui.tab_panel(tab_registros):
        with ui.row().classes("w-full items-end"):
            criterio = ui.select(["Nombre", "Grupo", "ID"], value="Nombre")
            buscar_texto = ui.input("Buscar").classes("grow")
            ui.button("Buscar", on_click=lambda: aplicar_busqueda())
            ui.button("Mostrar todos", on_click=lambda: mostrar_todos()).props("outline")
        tabla = ui.table(
            columns=[
                {"name": "nombre", "label": "Nombre", "field": "nombre_comun"},
                {"name": "grupo", "label": "Grupo", "field": "grupo_responsable"},
                {"name": "tipo", "label": "Tipo", "field": "tipo_planta"},
                {"name": "ubicacion", "label": "Ubicación", "field": "ubicacion"},
                {"name": "acciones", "label": "Acciones", "field": "acciones"},
            ],
            rows=[], row_key="id",
        ).classes("w-full")
        tabla.add_slot("body-cell-acciones", """
            <q-td :props="props">
              <q-btn flat color="primary" icon="edit"
                     @click="$parent.$emit('editar', props.row)" />
              <q-btn flat color="negative" icon="delete"
                     @click="$parent.$emit('eliminar', props.row)" />
            </q-td>
        """)

    with ui.tab_panel(tab_formulario):
        nombre = ui.input("Nombre común").classes("w-full")
        grupo = ui.input("Grupo responsable").classes("w-full")
        ubicacion = ui.input("Ubicación").classes("w-full")
        tipo = ui.select(
            ["Ornamental", "Medicinal", "Aromática", "Frutal"],
            label="Tipo",
        ).classes("w-full")
        estado = ui.select(
            ["Activa", "Pendiente"], value="Activa", label="Estado"
        ).classes("w-full")
        ui.button("Guardar", icon="save", on_click=lambda: guardar())
        ui.button("Cancelar edición", on_click=lambda: cancelar()).props("outline")

def leer_formulario():
    return {
        "nombre_comun": nombre.value.strip(),
        "grupo_responsable": grupo.value.strip(),
        "ubicacion": ubicacion.value.strip(),
        "tipo_planta": tipo.value,
        "estado": estado.value,
    }

def cancelar():
    global registro_id
    registro_id = None
    nombre.value = grupo.value = ubicacion.value = ""
    tipo.value = None
    estado.value = "Activa"

def guardar():
    global registro_id
    datos = leer_formulario()
    if not datos["nombre_comun"] or not datos["grupo_responsable"]:
        ui.notify("Completa nombre y grupo", type="warning")
        return
    try:
        if registro_id:
            actualizar_planta(registro_id, datos)
            ui.notify("Registro actualizado", type="positive")
        else:
            crear_planta(datos)
            ui.notify("Registro creado", type="positive")
        cancelar()
        refrescar()
        tabs.value = tab_registros
    except Exception as error:
        ui.notify(str(error), type="negative")

def editar(planta):
    global registro_id
    registro_id = planta["id"]
    nombre.value = planta.get("nombre_comun", "")
    grupo.value = planta.get("grupo_responsable", "")
    ubicacion.value = planta.get("ubicacion", "")
    tipo.value = planta.get("tipo_planta")
    estado.value = planta.get("estado", "Activa")
    tabs.value = tab_formulario

def confirmar_eliminar(planta):
    with ui.dialog() as dialog, ui.card():
        ui.label(f"¿Eliminar {planta.get('nombre_comun', 'este registro')}?")
        with ui.row():
            ui.button("Cancelar", on_click=dialog.close).props("outline")
            ui.button(
                "Eliminar",
                color="negative",
                on_click=lambda: ejecutar_eliminacion(planta["id"], dialog),
            )
    dialog.open()

def ejecutar_eliminacion(documento_id, dialog):
    try:
        eliminar_planta(documento_id)
        dialog.close()
        refrescar()
        ui.notify("Registro eliminado", type="positive")
    except Exception as error:
        ui.notify(str(error), type="negative")

def mostrar_todos():
    tabla.rows = plantas_cache
    tabla.update()

def aplicar_busqueda():
    termino = buscar_texto.value.strip().casefold()
    campo = {
        "Nombre": "nombre_comun",
        "Grupo": "grupo_responsable",
        "ID": "id",
    }[criterio.value]
    tabla.rows = [
        p for p in plantas_cache
        if termino in str(p.get(campo, "")).casefold()
    ]
    tabla.update()

def refrescar():
    global plantas_cache
    plantas_cache = obtener_plantas()
    mostrar_todos()
    total.text = f"Total: {len(plantas_cache)}"
    grupos_unicos = {p.get("grupo_responsable", "") for p in plantas_cache}
    grupos.text = f"Grupos: {len(grupos_unicos - {''})}"
    activas.text = "Activas: " + str(sum(
        p.get("estado", "").casefold() == "activa" for p in plantas_cache
    ))
    tipos = Counter(p.get("tipo_planta", "Sin tipo") for p in plantas_cache)
    resumen.clear()
    with resumen:
        for tipo_actual, cantidad in tipos.most_common():
            ui.label(f"{tipo_actual}: {cantidad}")

tabla.on("editar", lambda e: editar(e.args))
tabla.on("eliminar", lambda e: confirmar_eliminar(e.args))
refrescar()
ui.run(title="PlantApp CRUD", reload=False)`;

// Ajuste metodológico final: PlantApp conserva Flet de la práctica 11 a la 17.
// La progresión cambia las operaciones de Firebase, no el framework visual.
Object.assign(RUN_GUIDES, {
  11: { files: ["firebase_service.py", "main.py"], install: "pip install flet firebase-admin", run: "flet run main.py", note: "Este mismo main.py continuará creciendo hasta la práctica 17." },
  12: { files: ["firebase_service.py", "main.py"], install: "pip install flet firebase-admin", run: "flet run main.py", note: "Conserva la tabla de consulta y agrega el formulario." },
  13: { files: ["firebase_service.py", "main.py"], install: "pip install flet firebase-admin", run: "flet run main.py", note: "No crees otra aplicación: añade la barra de búsqueda al mismo main.py." },
  14: { files: ["firebase_service.py", "main.py"], install: "pip install flet firebase-admin", run: "flet run main.py", note: "El formulario de alta se convierte también en formulario de edición." },
  15: { files: ["firebase_service.py", "main.py"], install: "pip install flet firebase-admin", run: "flet run main.py", note: "Añade confirmación de eliminación a las acciones de la misma tabla." },
  16: { files: ["firebase_service.py", "main.py"], install: "pip install flet firebase-admin", run: "flet run main.py", note: "Las tarjetas se colocan encima de la tabla existente." },
  17: { files: ["firebase_service.py", "main.py"], install: "pip install flet firebase-admin", run: "flet run main.py", note: "La entrega es la versión acumulada del proyecto, no una aplicación nueva." },
});

Object.assign(CRUD_PRACTICES[11], {
  title: "Consulta de datos con Flet y Firebase",
  context: "PlantApp ya cuenta con conexión a Firebase. En esta práctica se conserva Flet, utilizado previamente por el curso, y se convierte la lectura de Firestore en una tabla visual que será la base de todas las prácticas siguientes.",
  situation: "La brigada ambiental necesita consultar los registros desde la aplicación PlantApp sin entrar a Firebase Console.",
  previous: ["Conexión Firebase y colección plantas.", "Estructura visual de PlantApp creada con Flet."],
  newParts: ["Función obtener_plantas().", "DataTable dinámica.", "Botón Actualizar y mensajes visuales."],
  materials: ["Proyecto PlantApp de la práctica anterior.", "Python, Flet y firebase-admin.", "Colección plantas con al menos cinco documentos.", "Conexión Firebase ya probada."],
  steps: [
    ["1. Abrir el mismo proyecto", "Continúa con firebase_service.py y main.py; no crees una aplicación en otro framework."],
    ["2. Recuperar documentos", "Convierte cada snapshot en diccionario y agrega doc.id."],
    ["3. Construir la tabla", "Crea una DataTable vacía con las columnas acordadas."],
    ["4. Crear filas", "Recorre la lista y genera un DataRow por documento."],
    ["5. Actualizar Flet", "Asigna las filas y ejecuta page.update()."],
    ["6. Verificar", "Compara la tabla con Firebase Console."],
  ],
  snippetTitle: "Código incremental: consulta y tabla Flet",
  snippet: `def cargar_tabla(e=None):
    try:
        plantas = obtener_plantas()
        tabla.rows = [
            ft.DataRow(data=p["id"], cells=[
                ft.DataCell(ft.Text(p.get("nombre_comun", "Sin dato"))),
                ft.DataCell(ft.Text(p.get("grupo_responsable", "Sin grupo"))),
                ft.DataCell(ft.Text(p.get("ubicacion", "Sin dato"))),
                ft.DataCell(ft.Text(p.get("estado", "Pendiente"))),
            ])
            for p in plantas
        ]
        contador.value = f"{len(plantas)} registro(s)"
    except Exception as error:
        contador.value = f"Error: {error}"
    page.update()`,
  explanation: [
    ["DataTable", "Mantiene la visualización dentro de la misma aplicación Flet."],
    ["DataRow.data", "Conserva el ID para editar y eliminar después."],
    ["doc.id", "Identifica de forma única el documento."],
    ["get()", "Evita errores por campos ausentes."],
    ["page.update()", "Refresca la interfaz."],
  ],
  guided: ["Ejecuta PlantApp y carga cinco documentos.", "Compara dos filas con Firebase Console.", "Agrega un documento y pulsa Actualizar.", "Explica cómo el ID queda asociado con DataRow.data."],
  challenge: "Agrega una columna ID abreviado y ordena la lista por nombre antes de construir las filas.",
  reflection: ["¿Por qué se conserva Flet durante toda la etapa?", "¿Qué función cumple DataRow.data?", "¿Por qué se limpian o reemplazan las filas al actualizar?", "¿Cómo comunica la app una colección vacía?"],
  evidence: ["Captura de la DataTable Flet.", "Código de obtener_plantas() y cargar_tabla().", "Comparación documento-fila.", "Explicación del recorrido de datos."],
});

Object.assign(CRUD_PRACTICES[13], {
  title: "Buscador de registros con Flet y Firebase",
  context: "La aplicación Flet ya consulta y registra. Ahora se agrega una barra de búsqueda sobre la misma tabla; no se reconstruye la interfaz.",
  situation: "La docente necesita localizar plantas por nombre, grupo o ID dentro de PlantApp.",
  previous: ["Formulario de registro.", "DataTable y funciones crear_planta() y obtener_plantas()."],
  newParts: ["TextField de búsqueda.", "Dropdown de criterio.", "Filtrado y mensaje sin resultados."],
  materials: ["PlantApp completada hasta la práctica 12.", "Python, Flet y firebase-admin.", "Registros con nombres y grupos variados.", "Dos IDs de prueba."],
  steps: [
    ["1. Conservar la vista", "Mantén formulario y tabla en main.py."],
    ["2. Agregar controles", "Coloca TextField, Dropdown y botones Buscar y Limpiar."],
    ["3. Buscar por ID", "Usa buscar_por_id() cuando el criterio sea ID."],
    ["4. Filtrar textos", "Compara nombre o grupo con casefold()."],
    ["5. Reutilizar la tabla", "Envía resultados a cargar_tabla(resultados)."],
    ["6. Probar", "Comprueba coincidencias y búsquedas vacías."],
  ],
  snippetTitle: "Código incremental: buscador Flet",
  snippet: `def buscar(e):
    termino = entrada_busqueda.value.strip()
    try:
        if criterio.value == "ID":
            resultados = buscar_por_id(termino) if termino else []
        else:
            campo = "nombre_comun" if criterio.value == "Nombre" else "grupo_responsable"
            resultados = [
                p for p in obtener_plantas()
                if termino.casefold() in p.get(campo, "").casefold()
            ]
        cargar_tabla(resultados)
        mensaje.value = (
            f"{len(resultados)} coincidencia(s)"
            if resultados else "No existen resultados."
        )
    except Exception as error:
        mensaje.value = f"Error: {error}"
    page.update()`,
  explanation: [
    ["TextField", "Captura el término sin abandonar Flet."],
    ["Dropdown", "Selecciona Nombre, Grupo o ID."],
    ["casefold()", "Compara sin distinguir mayúsculas."],
    ["cargar_tabla(resultados)", "Reutiliza la tabla existente."],
    ["Lista vacía", "Representa una búsqueda correcta sin coincidencias."],
  ],
  guided: ["Busca por una parte del nombre.", "Busca todos los registros de tu grupo.", "Localiza un documento por ID.", "Limpia la búsqueda y recupera la tabla completa."],
  challenge: "Agrega un filtro por tipo usando otro Dropdown Flet.",
  reflection: ["¿Por qué se reutiliza la misma DataTable?", "¿Cuándo conviene buscar por ID?", "¿Por qué una lista vacía no es un error?", "¿Qué parte de la práctica 12 se conservó?"],
  evidence: ["Capturas de búsquedas por nombre, grupo e ID.", "Captura de búsqueda sin resultados.", "Código de buscar().", "Tabla de casos de prueba."],
});

Object.assign(CRUD_PRACTICES[15], {
  title: "Eliminación segura con Flet y Firebase",
  context: "PlantApp ya crea, consulta, busca y actualiza. La eliminación se incorpora en la misma columna de acciones de la DataTable Flet.",
  situation: "Debe retirarse un registro duplicado sin que un clic accidental elimine información válida.",
  previous: ["DataTable con acciones.", "Selección por ID y formulario de edición."],
  newParts: ["IconButton Eliminar.", "AlertDialog de confirmación.", "Función eliminar_planta()."],
  materials: ["PlantApp completada hasta la práctica 14.", "Python, Flet y firebase-admin.", "Un documento creado específicamente para eliminar.", "Acceso a Firebase Console para verificar."],
  steps: [
    ["1. Conservar la tabla", "Agrega el botón Eliminar junto a Editar."],
    ["2. Enviar el documento", "La acción recibe el diccionario y conserva su ID."],
    ["3. Abrir confirmación", "Muestra nombre y advertencia en AlertDialog."],
    ["4. Cancelar", "Cierra el diálogo sin escribir en Firebase."],
    ["5. Confirmar", "Ejecuta delete(), recarga tabla y comunica el resultado."],
    ["6. Probar", "Usa un registro preparado y verifica ambos caminos."],
  ],
  snippetTitle: "Código incremental: eliminación segura en Flet",
  snippet: `def confirmar_eliminacion(planta):
    def eliminar(e):
        try:
            eliminar_planta(planta["id"])
            page.close(dialogo)
            cargar_tabla()
            mostrar_mensaje("Registro eliminado.")
        except Exception as error:
            mostrar_mensaje(f"No se pudo eliminar: {error}", True)

    dialogo = ft.AlertDialog(
        modal=True,
        title=ft.Text("Confirmar eliminación"),
        content=ft.Text(
            f"¿Eliminar {planta.get('nombre_comun', 'este registro')}?"
        ),
        actions=[
            ft.TextButton("Cancelar", on_click=lambda e: page.close(dialogo)),
            ft.FilledButton("Eliminar", icon=ft.Icons.DELETE, on_click=eliminar),
        ],
    )
    page.open(dialogo)`,
  explanation: [
    ["AlertDialog", "Mantiene la confirmación dentro de Flet."],
    ["planta['id']", "Elimina el documento exacto."],
    ["page.close()", "Cierra el diálogo al cancelar o terminar."],
    ["try/except", "Muestra errores sin cerrar PlantApp."],
  ],
  guided: ["Crea un registro de prueba.", "Pulsa Eliminar y elige Cancelar.", "Confirma que la fila continúa.", "Repite y confirma la eliminación."],
  challenge: "Implementa un botón Archivar que cambie el estado en vez de borrar físicamente.",
  reflection: ["¿Por qué se elimina por ID?", "¿Qué debe ocurrir al cancelar el AlertDialog?", "¿Cuándo conviene archivar?", "¿Por qué la tabla se recarga después de eliminar?"],
  evidence: ["Captura del AlertDialog.", "Pruebas de Cancelar y Eliminar.", "Código de confirmar_eliminacion().", "Verificación en Firebase Console."],
});

Object.assign(CRUD_PRACTICES[16], {
  title: "Panel administrativo con Flet y Firebase",
  context: "La misma aplicación incorpora tarjetas de métricas sobre el formulario y la tabla. No se crea un panel en otro framework.",
  situation: "La coordinación necesita total de registros, grupos participantes, plantas activas y distribución por tipo.",
  previous: ["CRUD parcial dentro de main.py.", "Lista recuperada por obtener_plantas()."],
  newParts: ["Tarjetas Flet.", "Cálculos con set, sum y Counter.", "Barras de progreso."],
  materials: ["PlantApp completada hasta la práctica 15.", "Python, Flet y firebase-admin.", "Al menos diez registros variados.", "Funciones CRUD ya probadas."],
  steps: [
    ["1. Mantener una lectura", "Recupera una lista y úsala para tabla y métricas."],
    ["2. Crear tarjetas", "Usa Containers reutilizables para mostrar valores."],
    ["3. Calcular", "Obtén total, grupos únicos y activos."],
    ["4. Agrupar", "Usa Counter para los tipos."],
    ["5. Dibujar", "Construye ProgressBar por categoría."],
    ["6. Sincronizar", "Actualiza el panel después de cada operación."],
  ],
  snippetTitle: "Código incremental: dashboard Flet",
  snippet: `def actualizar_dashboard(plantas):
    total = len(plantas)
    grupos = {
        p.get("grupo_responsable", "").strip().casefold()
        for p in plantas if p.get("grupo_responsable")
    }
    activas = sum(
        p.get("estado", "").casefold() == "activa"
        for p in plantas
    )
    tipos = Counter(p.get("tipo_planta", "Sin tipo") for p in plantas)

    total_valor.value = str(total)
    grupos_valor.value = str(len(grupos))
    activas_valor.value = str(activas)
    barras.controls = [
        ft.Column([
            ft.Text(f"{tipo}: {cantidad}"),
            ft.ProgressBar(value=cantidad / total if total else 0),
        ])
        for tipo, cantidad in tipos.most_common()
    ]`,
  explanation: [
    ["Container", "Construye tarjetas dentro del mismo diseño Flet."],
    ["set", "Cuenta grupos sin repetir."],
    ["Counter", "Agrupa tipos."],
    ["ProgressBar", "Representa proporciones."],
    ["Una lectura", "Sincroniza tabla e indicadores."],
  ],
  guided: ["Calcula manualmente total, grupos y activos.", "Compara con las tarjetas.", "Crea un registro y refresca.", "Actualiza un estado y revisa los indicadores."],
  challenge: "Agrega una tarjeta con la ubicación que contiene más registros.",
});

Object.assign(CRUD_PRACTICES[17], {
  title: "Proyecto integrador CRUD con Flet y Firebase",
  context: "La entrega final es la versión acumulada de PlantApp. Se conservan main.py, firebase_service.py, controles, colores y navegación construidos desde la práctica 11.",
  situation: "El alumno demostrará en una sola aplicación Flet el flujo crear, consultar, buscar, actualizar y eliminar.",
  previous: ["Todas las funciones desarrolladas en prácticas 11–16.", "Una sola interfaz Flet y una sola colección."],
  newParts: ["Organización final.", "Función refrescar_aplicacion().", "Matriz de pruebas del CRUD completo."],
  steps: [
    ["1. Revisar archivos", "Conserva firebase_service.py y main.py."],
    ["2. Unificar refresco", "Una lectura actualiza tabla y dashboard."],
    ["3. Verificar Crear", "Registra y valida datos."],
    ["4. Verificar Leer y Buscar", "Consulta todos y filtra por criterios."],
    ["5. Verificar Actualizar y Eliminar", "Mantén IDs y confirmación."],
    ["6. Entregar", "Ejecuta la matriz de pruebas y presenta el producto."],
  ],
  snippetTitle: "Código incremental final: sincronización del CRUD Flet",
  snippet: `def refrescar_aplicacion():
    plantas = obtener_plantas()
    cargar_tabla(plantas)
    actualizar_dashboard(plantas)
    page.update()`,
  explanation: [
    ["main.py", "Conserva toda la interfaz Flet acumulada."],
    ["firebase_service.py", "Centraliza CRUD de Firestore."],
    ["refrescar_aplicacion()", "Sincroniza tabla y métricas."],
    ["registro_seleccionado_id", "Distingue alta y edición."],
    ["AlertDialog", "Protege la eliminación."],
  ],
});

const FLET_SERVICE = `# firebase_service.py
import firebase_admin
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    cred = credentials.Certificate("credenciales/firebase-key.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()
coleccion = db.collection("plantas")

def crear_planta(datos):
    _, referencia = coleccion.add(datos)
    return referencia.id

def obtener_plantas():
    plantas = []
    for doc in coleccion.stream():
        planta = doc.to_dict()
        planta["id"] = doc.id
        plantas.append(planta)
    return plantas

def buscar_por_id(documento_id):
    doc = coleccion.document(documento_id).get()
    if not doc.exists:
        return []
    planta = doc.to_dict()
    planta["id"] = doc.id
    return [planta]

def actualizar_planta(documento_id, cambios):
    coleccion.document(documento_id).update(cambios)

def eliminar_planta(documento_id):
    coleccion.document(documento_id).delete()`;

const FLET_READ_SERVICE = `# firebase_service.py
import firebase_admin
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    cred = credentials.Certificate("credenciales/firebase-key.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()
coleccion = db.collection("plantas")

def obtener_plantas():
    plantas = []
    for doc in coleccion.stream():
        planta = doc.to_dict()
        planta["id"] = doc.id
        plantas.append(planta)
    return plantas`;

const FLET_SEARCH_SERVICE = `${FLET_READ_SERVICE}

def crear_planta(datos):
    _, referencia = coleccion.add(datos)
    return referencia.id

def buscar_por_id(documento_id):
    doc = coleccion.document(documento_id).get()
    if not doc.exists:
        return []
    planta = doc.to_dict()
    planta["id"] = doc.id
    return [planta]`;

COMPLETE_CODE[11] = `${FLET_READ_SERVICE}


# main.py
import flet as ft
from firebase_service import obtener_plantas

def main(page: ft.Page):
    page.title = "PlantApp"
    page.theme = ft.Theme(color_scheme_seed="#4F772D")
    page.bgcolor = "#EEF4ED"
    contador = ft.Text("0 registros")
    tabla = ft.DataTable(
        columns=[ft.DataColumn(ft.Text(x)) for x in
                 ["Nombre", "Grupo", "Ubicación", "Estado"]],
        rows=[],
    )

    def cargar_tabla(e=None):
        try:
            plantas = obtener_plantas()
            tabla.rows = [
                ft.DataRow(data=p["id"], cells=[
                    ft.DataCell(ft.Text(p.get("nombre_comun", "Sin dato"))),
                    ft.DataCell(ft.Text(p.get("grupo_responsable", "Sin grupo"))),
                    ft.DataCell(ft.Text(p.get("ubicacion", "Sin dato"))),
                    ft.DataCell(ft.Text(p.get("estado", "Pendiente"))),
                ]) for p in plantas
            ]
            contador.value = f"{len(plantas)} registro(s)"
        except Exception as error:
            contador.value = f"Error: {error}"
        page.update()

    page.add(
        ft.Text("Inventario de plantas", size=30, weight=ft.FontWeight.BOLD),
        ft.Row([contador, ft.IconButton(ft.Icons.REFRESH, on_click=cargar_tabla)],
               alignment=ft.MainAxisAlignment.SPACE_BETWEEN),
        ft.Row([tabla], scroll=ft.ScrollMode.AUTO),
    )
    cargar_tabla()

ft.app(target=main)`;

COMPLETE_CODE[13] = `${FLET_SEARCH_SERVICE}


# main.py — conserva también el formulario de la práctica 12
import flet as ft
from firebase_service import obtener_plantas, buscar_por_id

def main(page: ft.Page):
    page.title = "PlantApp · Buscador"
    page.theme = ft.Theme(color_scheme_seed="#4F772D")
    entrada = ft.TextField(label="Nombre, grupo o ID", expand=True)
    criterio = ft.Dropdown(
        label="Buscar por", value="Nombre",
        options=[ft.dropdown.Option(x) for x in ["Nombre", "Grupo", "ID"]],
    )
    mensaje = ft.Text()
    tabla = ft.DataTable(
        columns=[ft.DataColumn(ft.Text(x)) for x in
                 ["Nombre", "Grupo", "Tipo", "Ubicación"]],
        rows=[],
    )

    def cargar_tabla(registros=None):
        plantas = obtener_plantas() if registros is None else registros
        tabla.rows = [
            ft.DataRow(data=p["id"], cells=[
                ft.DataCell(ft.Text(p.get("nombre_comun", ""))),
                ft.DataCell(ft.Text(p.get("grupo_responsable", ""))),
                ft.DataCell(ft.Text(p.get("tipo_planta", ""))),
                ft.DataCell(ft.Text(p.get("ubicacion", ""))),
            ]) for p in plantas
        ]

    def buscar(e):
        termino = entrada.value.strip()
        try:
            if criterio.value == "ID":
                resultados = buscar_por_id(termino) if termino else []
            else:
                campo = "nombre_comun" if criterio.value == "Nombre" else "grupo_responsable"
                resultados = [p for p in obtener_plantas()
                              if termino.casefold() in p.get(campo, "").casefold()]
            cargar_tabla(resultados)
            mensaje.value = f"{len(resultados)} coincidencia(s)" if resultados else "No existen resultados."
        except Exception as error:
            mensaje.value = f"Error: {error}"
        page.update()

    def limpiar(e):
        entrada.value = ""
        criterio.value = "Nombre"
        cargar_tabla()
        mensaje.value = "Mostrando todos los registros."
        page.update()

    page.add(
        ft.Text("Buscar plantas", size=30, weight=ft.FontWeight.BOLD),
        ft.Row([entrada, criterio, ft.FilledButton("Buscar", on_click=buscar),
                ft.OutlinedButton("Limpiar", on_click=limpiar)]),
        mensaje,
        ft.Row([tabla], scroll=ft.ScrollMode.AUTO),
    )
    limpiar(None)

ft.app(target=main)`;

COMPLETE_CODE[15] = `${FLET_SERVICE}


# main.py — se integra sobre la tabla y formulario de la práctica 14
import flet as ft
from firebase_service import obtener_plantas, eliminar_planta

def main(page: ft.Page):
    page.title = "PlantApp · Eliminación segura"
    page.theme = ft.Theme(color_scheme_seed="#4F772D")
    mensaje = ft.Text()
    tabla = ft.DataTable(
        columns=[ft.DataColumn(ft.Text(x)) for x in
                 ["Nombre", "Grupo", "Ubicación", "Acciones"]],
        rows=[],
    )

    def mostrar(texto):
        mensaje.value = texto
        page.update()

    def confirmar_eliminacion(planta):
        def eliminar(e):
            try:
                eliminar_planta(planta["id"])
                page.close(dialogo)
                cargar_tabla()
                mostrar("Registro eliminado correctamente.")
            except Exception as error:
                mostrar(f"No se pudo eliminar: {error}")

        dialogo = ft.AlertDialog(
            modal=True,
            title=ft.Text("Confirmar eliminación"),
            content=ft.Text(
                f"¿Eliminar '{planta.get('nombre_comun', 'Sin nombre')}'? "
                "Esta acción no se puede deshacer."
            ),
            actions=[
                ft.TextButton("Cancelar", on_click=lambda e: page.close(dialogo)),
                ft.FilledButton("Eliminar", icon=ft.Icons.DELETE, on_click=eliminar),
            ],
        )
        page.open(dialogo)

    def cargar_tabla():
        plantas = obtener_plantas()
        tabla.rows = [
            ft.DataRow(data=p["id"], cells=[
                ft.DataCell(ft.Text(p.get("nombre_comun", ""))),
                ft.DataCell(ft.Text(p.get("grupo_responsable", ""))),
                ft.DataCell(ft.Text(p.get("ubicacion", ""))),
                ft.DataCell(ft.IconButton(
                    ft.Icons.DELETE_OUTLINE,
                    icon_color="#B3261E",
                    on_click=lambda e, planta=p: confirmar_eliminacion(planta),
                )),
            ]) for p in plantas
        ]
        page.update()

    page.add(
        ft.Text("Eliminación segura", size=30, weight=ft.FontWeight.BOLD),
        mensaje,
        ft.Row([tabla], scroll=ft.ScrollMode.AUTO),
    )
    cargar_tabla()

ft.app(target=main)`;

COMPLETE_CODE[16] = `${FLET_SERVICE}


# main.py — agrega este panel encima de la tabla CRUD
from collections import Counter
import flet as ft
from firebase_service import obtener_plantas

def main(page: ft.Page):
    page.title = "PlantApp · Panel"
    page.theme = ft.Theme(color_scheme_seed="#4F772D")
    total = ft.Text("0", size=30, weight=ft.FontWeight.BOLD)
    grupos = ft.Text("0", size=30, weight=ft.FontWeight.BOLD)
    activas = ft.Text("0", size=30, weight=ft.FontWeight.BOLD)
    barras = ft.Column()
    tabla = ft.DataTable(
        columns=[ft.DataColumn(ft.Text(x)) for x in ["Nombre", "Grupo", "Tipo", "Estado"]],
        rows=[],
    )

    def tarjeta(titulo, valor, icono):
        return ft.Container(
            bgcolor="white", border_radius=18, padding=18, expand=True,
            content=ft.Column([ft.Row([ft.Text(titulo), ft.Icon(icono)]), valor]),
        )

    def actualizar(e=None):
        plantas = obtener_plantas()
        total.value = str(len(plantas))
        grupos.value = str(len({p.get("grupo_responsable", "") for p in plantas} - {""}))
        activas.value = str(sum(p.get("estado", "").casefold() == "activa" for p in plantas))
        tipos = Counter(p.get("tipo_planta", "Sin tipo") for p in plantas)
        barras.controls = [
            ft.Column([
                ft.Text(f"{tipo}: {cantidad}"),
                ft.ProgressBar(value=cantidad / len(plantas) if plantas else 0),
            ]) for tipo, cantidad in tipos.most_common()
        ]
        tabla.rows = [
            ft.DataRow(cells=[
                ft.DataCell(ft.Text(p.get("nombre_comun", ""))),
                ft.DataCell(ft.Text(p.get("grupo_responsable", ""))),
                ft.DataCell(ft.Text(p.get("tipo_planta", ""))),
                ft.DataCell(ft.Text(p.get("estado", ""))),
            ]) for p in plantas
        ]
        page.update()

    page.add(
        ft.Row([
            ft.Text("Panel administrativo", size=30, weight=ft.FontWeight.BOLD),
            ft.IconButton(ft.Icons.REFRESH, on_click=actualizar),
        ], alignment=ft.MainAxisAlignment.SPACE_BETWEEN),
        ft.ResponsiveRow([
            tarjeta("Total", total, ft.Icons.GRASS),
            tarjeta("Grupos", grupos, ft.Icons.GROUPS),
            tarjeta("Activas", activas, ft.Icons.CHECK_CIRCLE),
        ]),
        ft.Container(bgcolor="white", padding=20, border_radius=18, content=barras),
        ft.Row([tabla], scroll=ft.ScrollMode.AUTO),
    )
    actualizar()

ft.app(target=main)`;

COMPLETE_CODE[17] = `${FLET_SERVICE}


# main.py — estructura final acumulada
import flet as ft
from collections import Counter
from firebase_service import (
    crear_planta, obtener_plantas, buscar_por_id,
    actualizar_planta, eliminar_planta,
)

def main(page: ft.Page):
    page.title = "PlantApp CRUD"
    page.theme = ft.Theme(color_scheme_seed="#4F772D")
    page.bgcolor = "#EEF4ED"
    page.scroll = ft.ScrollMode.AUTO
    registro_id = None
    cache = []

    nombre = ft.TextField(label="Nombre común")
    grupo = ft.TextField(label="Grupo")
    ubicacion = ft.TextField(label="Ubicación")
    tipo = ft.Dropdown(label="Tipo", options=[
        ft.dropdown.Option(x) for x in ["Ornamental", "Medicinal", "Aromática", "Frutal"]
    ])
    estado = ft.Dropdown(label="Estado", value="Activa", options=[
        ft.dropdown.Option("Activa"), ft.dropdown.Option("Pendiente")
    ])
    entrada = ft.TextField(label="Buscar", expand=True)
    criterio = ft.Dropdown(value="Nombre", options=[
        ft.dropdown.Option(x) for x in ["Nombre", "Grupo", "ID"]
    ])
    mensaje = ft.Text()
    total = ft.Text("0", size=26, weight=ft.FontWeight.BOLD)
    grupos_total = ft.Text("0", size=26, weight=ft.FontWeight.BOLD)
    tabla = ft.DataTable(
        columns=[ft.DataColumn(ft.Text(x)) for x in
                 ["Nombre", "Grupo", "Tipo", "Ubicación", "Acciones"]],
        rows=[],
    )
    boton_guardar = ft.FilledButton("Guardar")

    def datos_formulario():
        return {
            "nombre_comun": nombre.value.strip(),
            "grupo_responsable": grupo.value.strip(),
            "ubicacion": ubicacion.value.strip(),
            "tipo_planta": tipo.value,
            "estado": estado.value,
        }

    def cancelar(e=None):
        nonlocal registro_id
        registro_id = None
        nombre.value = grupo.value = ubicacion.value = ""
        tipo.value = None
        estado.value = "Activa"
        boton_guardar.text = "Guardar"

    def seleccionar(planta):
        nonlocal registro_id
        registro_id = planta["id"]
        nombre.value = planta.get("nombre_comun", "")
        grupo.value = planta.get("grupo_responsable", "")
        ubicacion.value = planta.get("ubicacion", "")
        tipo.value = planta.get("tipo_planta")
        estado.value = planta.get("estado", "Activa")
        boton_guardar.text = "Actualizar"
        page.update()

    def construir_filas(plantas):
        tabla.rows = [
            ft.DataRow(data=p["id"], cells=[
                ft.DataCell(ft.Text(p.get("nombre_comun", ""))),
                ft.DataCell(ft.Text(p.get("grupo_responsable", ""))),
                ft.DataCell(ft.Text(p.get("tipo_planta", ""))),
                ft.DataCell(ft.Text(p.get("ubicacion", ""))),
                ft.DataCell(ft.Row([
                    ft.IconButton(ft.Icons.EDIT,
                        on_click=lambda e, planta=p: seleccionar(planta)),
                    ft.IconButton(ft.Icons.DELETE_OUTLINE,
                        on_click=lambda e, planta=p: confirmar_eliminacion(planta)),
                ])),
            ]) for p in plantas
        ]

    def refrescar():
        nonlocal cache
        cache = obtener_plantas()
        construir_filas(cache)
        total.value = str(len(cache))
        grupos_total.value = str(len(
            {p.get("grupo_responsable", "") for p in cache} - {""}
        ))
        page.update()

    def guardar(e):
        nonlocal registro_id
        datos = datos_formulario()
        if not datos["nombre_comun"] or not datos["grupo_responsable"]:
            mensaje.value = "Completa nombre y grupo."
            page.update()
            return
        try:
            if registro_id:
                actualizar_planta(registro_id, datos)
                mensaje.value = "Registro actualizado."
            else:
                crear_planta(datos)
                mensaje.value = "Registro creado."
            cancelar()
            refrescar()
        except Exception as error:
            mensaje.value = f"Error: {error}"
            page.update()

    def buscar(e):
        termino = entrada.value.strip()
        if criterio.value == "ID":
            resultados = buscar_por_id(termino) if termino else []
        else:
            campo = "nombre_comun" if criterio.value == "Nombre" else "grupo_responsable"
            resultados = [p for p in cache
                          if termino.casefold() in p.get(campo, "").casefold()]
        construir_filas(resultados)
        mensaje.value = f"{len(resultados)} coincidencia(s)"
        page.update()

    def confirmar_eliminacion(planta):
        def eliminar(e):
            try:
                eliminar_planta(planta["id"])
                page.close(dialogo)
                refrescar()
            except Exception as error:
                mensaje.value = f"Error: {error}"
                page.update()
        dialogo = ft.AlertDialog(
            modal=True,
            title=ft.Text("Confirmar eliminación"),
            content=ft.Text(f"¿Eliminar {planta.get('nombre_comun', '')}?"),
            actions=[
                ft.TextButton("Cancelar", on_click=lambda e: page.close(dialogo)),
                ft.FilledButton("Eliminar", on_click=eliminar),
            ],
        )
        page.open(dialogo)

    boton_guardar.on_click = guardar
    page.add(
        ft.Text("PlantApp CRUD", size=32, weight=ft.FontWeight.BOLD),
        ft.ResponsiveRow([
            ft.Container(col={"md": 6}, content=ft.Text(f"Total: ", size=18)),
            ft.Container(col={"md": 6}, content=ft.Row([ft.Text("Registros"), total])),
            ft.Container(col={"md": 6}, content=ft.Row([ft.Text("Grupos"), grupos_total])),
        ]),
        ft.Container(bgcolor="white", padding=20, border_radius=18, content=ft.Column([
            nombre, grupo, ubicacion, tipo, estado,
            ft.Row([boton_guardar, ft.OutlinedButton("Cancelar", on_click=cancelar)]),
        ])),
        ft.Row([
            entrada, criterio,
            ft.FilledButton("Buscar", on_click=buscar),
            ft.OutlinedButton("Mostrar todos", on_click=lambda e: refrescar()),
        ]),
        mensaje,
        ft.Row([tabla], scroll=ft.ScrollMode.AUTO),
    )
    refrescar()

ft.app(target=main)`;

renderPractice();
