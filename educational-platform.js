const advancedLessons = {
  practica11: {
    title: "Consulta visual con Tkinter y Firebase",
    purpose: "Recuperar documentos de Firestore y representarlos en una tabla de escritorio funcional.",
    reading:
      "La conexión a Firebase ya existe. El nuevo aprendizaje consiste en recorrer documentos, conservar su ID y convertir cada diccionario en una fila de Treeview. La interfaz debe comunicar carga, colección vacía y errores sin depender de la consola.",
    concepts: ["Tkinter", "Treeview", "stream()", "doc.id", "tabla visual"],
    steps: [
      "Reutiliza firebase_service.py y obtener_plantas().",
      "Construye la ventana y las columnas del Treeview.",
      "Inserta una fila por cada documento recuperado.",
      "Prueba el botón Actualizar y documenta el recorrido de datos.",
    ],
    questions: [
      "¿Qué función cumple doc.id dentro de la tabla?",
      "¿Por qué se separa la conexión de la interfaz?",
      "Describe la evidencia obtenida al actualizar la ventana.",
    ],
  },
  practica12: {
    title: "Registro visual con Flet y Firebase",
    purpose: "Capturar, validar y guardar registros escolares desde una interfaz Flet.",
    reading:
      "Flet permite construir controles visuales con Python. Los valores del formulario se validan, se convierten en un diccionario y se envían al mismo servicio Firebase. El resultado debe confirmarse dentro de la aplicación.",
    concepts: ["Flet", "TextField", "Dropdown", "validación", "add()"],
    steps: [
      "Amplía el servicio con crear_planta().",
      "Construye el formulario Flet.",
      "Valida nombre, grupo y ubicación.",
      "Guarda, limpia controles y actualiza la tabla.",
    ],
    questions: [
      "¿Qué diferencia existe entre validar y guardar?",
      "¿Por qué se usan listas controladas en algunos campos?",
      "¿Cómo compruebas visualmente que el alta funcionó?",
    ],
  },
  practica13: {
    title: "Buscador visual con NiceGUI",
    purpose: "Localizar registros por nombre, grupo o ID y mostrar resultados en una tabla web.",
    reading:
      "NiceGUI representa controles web mediante Python. La búsqueda por ID usa una referencia directa; las búsquedas por nombre o grupo comparan los campos de los documentos y actualizan las filas visibles.",
    concepts: ["NiceGUI", "ui.table", "ui.select", "casefold()", "document ID"],
    steps: [
      "Crea selector, entrada y tabla.",
      "Implementa búsqueda por ID.",
      "Filtra nombre y grupo sin distinguir mayúsculas.",
      "Prueba resultados existentes, múltiples y vacíos.",
    ],
    questions: [
      "¿Por qué la búsqueda por ID es distinta?",
      "¿Qué representa una lista vacía?",
      "Describe una prueba realizada con cada criterio.",
    ],
  },
  practica14: {
    title: "Actualización visual con Flet",
    purpose: "Seleccionar, editar y actualizar un documento conservando su identificador.",
    reading:
      "El formulario de la práctica 12 se reutiliza. Una selección carga el documento, conserva su ID y cambia el botón al modo Actualizar. Firestore modifica campos con update() sin generar un documento nuevo.",
    concepts: ["selección", "update()", "ID", "modo edición", "cancelación"],
    steps: [
      "Agrega actualizar_planta() al servicio.",
      "Incluye un botón Editar por fila.",
      "Carga los datos en el formulario.",
      "Actualiza, cancela y verifica el mismo ID.",
    ],
    questions: [
      "¿Por qué update() no crea un ID nuevo?",
      "¿Cómo se distingue Crear de Editar?",
      "Describe cómo verificaste la actualización.",
    ],
  },
  practica15: {
    title: "Eliminación segura con Tkinter",
    purpose: "Eliminar el documento seleccionado solo después de una confirmación explícita.",
    reading:
      "La eliminación usa el ID guardado detrás de la fila Treeview. Antes de llamar delete(), messagebox pregunta al usuario. No seleccionar, cancelar y recibir un error son estados que la aplicación debe controlar.",
    concepts: ["selection()", "iid", "messagebox", "delete()", "confirmación"],
    steps: [
      "Amplía el servicio con eliminar_planta().",
      "Comprueba que exista una selección.",
      "Solicita confirmación con el nombre visible.",
      "Elimina, recarga y prueba también Cancelar.",
    ],
    questions: [
      "¿Por qué se elimina por ID?",
      "¿Qué debe ocurrir al cancelar?",
      "Describe las pruebas de eliminación segura.",
    ],
  },
  practica16: {
    title: "Panel administrativo con NiceGUI",
    purpose: "Transformar documentos en una tabla, conteos e indicadores visuales verificables.",
    reading:
      "El panel usa una sola lectura para calcular total, grupos, activos y tipos. set, sum y Counter convierten la lista en métricas; NiceGUI las representa con tarjetas, tabla y barras.",
    concepts: ["ui.card", "set", "Counter", "indicadores", "barra de progreso"],
    steps: [
      "Define las métricas.",
      "Construye tarjetas y tabla.",
      "Calcula desde una sola lista.",
      "Actualiza el panel después de modificar datos.",
    ],
    questions: [
      "¿Por qué se utiliza una sola lectura?",
      "¿Qué indicador necesita un conjunto?",
      "Describe un cambio observado en el panel.",
    ],
  },
  practica17: {
    title: "Proyecto integrador CRUD visual",
    purpose: "Reunir registro, consulta, búsqueda, actualización, eliminación y panel en una aplicación NiceGUI.",
    reading:
      "El producto final conserva el servicio Firebase y unifica las interfaces anteriores. Un solo refresco mantiene tabla e indicadores sincronizados y el formulario decide entre crear o actualizar según exista un ID seleccionado.",
    concepts: ["CRUD", "NiceGUI", "servicio", "validación", "pruebas"],
    steps: [
      "Organiza servicio e interfaz.",
      "Integra formulario, búsqueda y tabla.",
      "Agrega actualización y eliminación confirmada.",
      "Ejecuta una matriz de pruebas del flujo completo.",
    ],
    questions: [
      "¿Qué lógica se conservó entre interfaces?",
      "¿Qué operación presenta mayor riesgo?",
      "¿Qué evidencia demuestra que el CRUD funciona?",
    ],
  },
  practica18: {
    title: "Aplicación final lista para ponencia ABP",
    purpose: "Integrar autenticación, Firestore, consultas, seguridad e interfaz en una solución escolar demostrable.",
    reading:
      "Una aplicación final no se evalúa solamente porque abre sin errores. Debe resolver un problema, proteger los datos, explicar su modelo y mostrar evidencias de prueba. En una ponencia técnica debes comunicar el problema, la decisión de usar NoSQL, la arquitectura, los resultados y las mejoras futuras.",
    concepts: ["ABP", "producto mínimo viable", "seguridad", "pruebas", "comunicación técnica"],
    steps: [
      "Delimita el problema escolar y los usuarios beneficiados.",
      "Presenta el modelo de colecciones, documentos y reglas.",
      "Demuestra autenticación, escritura, consulta y recuperación.",
      "Realiza pruebas, documenta resultados y prepara la ponencia.",
    ],
    questions: [
      "¿Qué problema resuelve tu aplicación y para quién?",
      "¿Qué evidencia demuestra que los datos están protegidos?",
      "Resume el avance actual y la siguiente mejora prioritaria.",
    ],
  },
};

Object.assign(advancedLessons.practica11, {
  title: "Consulta visual con Flet y Firebase",
  purpose: "Recuperar documentos de Firestore y mostrarlos en la DataTable del mismo proyecto Flet.",
  reading: "PlantApp conserva Flet durante toda la etapa. La primera ampliación recupera documentos, conserva sus IDs y construye filas visuales que después servirán para buscar, editar y eliminar.",
  concepts: ["Flet", "DataTable", "DataRow", "stream()", "doc.id"],
  steps: ["Reutiliza firebase_service.py y main.py.", "Construye la DataTable Flet.", "Genera un DataRow por documento.", "Prueba el botón Actualizar."],
  questions: ["¿Qué función cumple DataRow.data?", "¿Por qué se conserva Flet?", "Describe la evidencia obtenida al actualizar la tabla."],
});
Object.assign(advancedLessons.practica13, {
  title: "Buscador de registros con Flet",
  purpose: "Agregar búsqueda por nombre, grupo o ID sin cambiar de aplicación ni framework.",
  reading: "El buscador se coloca encima de la DataTable existente. Los resultados se muestran con los mismos controles Flet y reutilizan la función que construye filas.",
  concepts: ["TextField", "Dropdown", "casefold()", "ID", "filtro visual"],
  steps: ["Conserva formulario y tabla.", "Agrega controles de búsqueda Flet.", "Implementa Nombre, Grupo e ID.", "Prueba resultados existentes y vacíos."],
  questions: ["¿Por qué se reutiliza la DataTable?", "¿Cuándo conviene buscar por ID?", "Describe una prueba por cada criterio."],
});
Object.assign(advancedLessons.practica15, {
  title: "Eliminación segura con Flet",
  purpose: "Eliminar desde la tabla Flet únicamente después de una confirmación.",
  reading: "La eliminación amplía la columna de acciones creada para editar. AlertDialog confirma el documento y conserva toda la interacción dentro de PlantApp.",
  concepts: ["IconButton", "AlertDialog", "delete()", "ID", "confirmación"],
  steps: ["Agrega Eliminar junto a Editar.", "Abre AlertDialog con el nombre.", "Prueba Cancelar.", "Confirma con un documento preparado."],
  questions: ["¿Por qué se elimina por ID?", "¿Qué ocurre al cancelar?", "Describe la prueba de eliminación segura."],
});
Object.assign(advancedLessons.practica16, {
  title: "Panel administrativo con Flet",
  purpose: "Agregar tarjetas e indicadores encima del CRUD existente.",
  reading: "El panel forma parte de la misma página Flet. Una sola lectura alimenta la tabla, los conteos y las barras para mantener resultados sincronizados.",
  concepts: ["Container", "ResponsiveRow", "Counter", "ProgressBar", "métricas"],
  steps: ["Define métricas.", "Crea tarjetas Flet.", "Calcula desde una sola lista.", "Sincroniza panel y tabla."],
  questions: ["¿Por qué se usa una sola lectura?", "¿Qué indicador utiliza set?", "Describe una actualización observada."],
});
Object.assign(advancedLessons.practica17, {
  title: "Proyecto integrador CRUD con Flet",
  purpose: "Presentar la versión acumulada de PlantApp con todas las operaciones CRUD.",
  reading: "El proyecto final no comienza de nuevo. Integra las funciones construidas desde la práctica 11 dentro de main.py y firebase_service.py.",
  concepts: ["Flet", "CRUD", "servicio Firebase", "validación", "pruebas"],
  steps: ["Conserva los dos archivos.", "Integra todas las operaciones.", "Unifica el refresco.", "Ejecuta la matriz de pruebas."],
  questions: ["¿Qué código se conservó desde la práctica 11?", "¿Qué operación presenta mayor riesgo?", "¿Qué evidencia demuestra que el CRUD funciona?"],
});

const genericQuestions = [
  "Resume con tus palabras la idea principal de esta práctica.",
  "¿Qué concepto o procedimiento necesitas comprobar durante la actividad?",
  "Describe tu evidencia o el avance que lograste.",
];

const state = {
  user: null,
  practiceId: null,
  form: null,
  firebase: null,
  firebaseReady: false,
};

const localDraftKey = () => `bdnosql-borrador-${state.practiceId || "inicio"}`;

const coursePhases = [
  {
    id: "fase1",
    number: 1,
    icon: "🧭",
    title: "Descubre el mundo NoSQL",
    description: "Comprende por qué existen las bases no relacionales y aprende a representar información con documentos.",
    objective: "Distinguir modelos de datos y construir estructuras JSON con criterio.",
    color: "#7857d8",
    practices: ["practica0", "practica01", "practica1", "practica2", "practica3", "practica4", "practica5"],
  },
  {
    id: "fase2",
    number: 2,
    icon: "🔐",
    title: "Conecta y protege",
    description: "Conoce Firebase, inicia sesión con Google y aplica reglas para cuidar los datos escolares.",
    objective: "Integrar servicios en la nube, autenticación y seguridad básica.",
    color: "#e6783d",
    practices: ["practica6", "practica7", "practica8"],
  },
  {
    id: "fase3",
    number: 3,
    icon: "🗂️",
    title: "Construye con documentos",
    description: "Diseña registros escolares, colecciones y documentos que una aplicación pueda utilizar.",
    objective: "Modelar y persistir información real mediante estructuras documentales.",
    color: "#278b78",
    practices: ["practica9", "practica10"],
  },
  {
    id: "fase4",
    number: 4,
    icon: "🖥️",
    title: "Construye aplicaciones visuales",
    description: "Consulta, registra, busca, actualiza y elimina datos de Firebase con interfaces gráficas en Python.",
    objective: "Construir un proyecto Flet incremental conectado a Firebase hasta completar un CRUD escolar.",
    color: "#3380c4",
    practices: ["practica11", "practica12", "practica13", "practica14", "practica15", "practica16", "practica17"],
  },
  {
    id: "fase5",
    number: 5,
    icon: "🚀",
    title: "Lanza tu proyecto escolar",
    description: "Integra lo aprendido en una solución funcional y prepara su presentación como proyecto ABP.",
    objective: "Demostrar una aplicación segura, útil, documentada y lista para comunicar.",
    color: "#c34667",
    practices: ["practica18", "practicaabp"],
  },
];

const practiceCatalog = {
  practica0: ["Práctica 0", "Fundamentos de bases de datos NoSQL", "practica-0.html"],
  practica01: ["Práctica 0.1", "Sintaxis MongoDB y simulación", "practica-0-1.html"],
  practica1: ["Práctica 1", "MongoDB Atlas", "practica-1.html"],
  practica2: ["Práctica 2", "Catálogo con Flet", "practica-2.html"],
  practica3: ["Práctica 3", "Formularios y datos", "practica-3.html"],
  practica4: ["Práctica 4", "Quiz interactivo", "practica-4.html"],
  practica5: ["Práctica 5", "Cacería de datos", "practica-5.html"],
  practica6: ["Práctica 6", "Firebase, Auth y reglas", "practica-6.html"],
  practica7: ["Práctica 7", "Pokedex", "practica-7.html"],
  practica8: ["Práctica 8", "PokeDesk", "practica-8.html"],
  practica9: ["Práctica 9", "Registro de plantas", "practica-9.html"],
  practica10: ["Práctica 10", "Datos y ciudad inteligente", "practica-10.html"],
  practica11: ["Práctica 11", "Consulta con Flet", "practica-11.html"],
  practica12: ["Práctica 12", "Registro con Flet", "practica-12.html"],
  practica13: ["Práctica 13", "Buscador con Flet", "practica-13.html"],
  practica14: ["Práctica 14", "Actualización con Flet", "practica-14.html"],
  practica15: ["Práctica 15", "Eliminación con Flet", "practica-15.html"],
  practica16: ["Práctica 16", "Panel con Flet", "practica-16.html"],
  practica17: ["Práctica 17", "CRUD integrador con Flet", "practica-17.html"],
  practica18: ["Práctica 18", "Aplicación final", "practica-18.html"],
  practicaabp: ["Proyecto ABP", "Reto escolar integrador", "practica-abp.html"],
};

const practiceReadingTopics = {
  practica0: `MongoDB ayuda a comprender este cambio porque utiliza documentos en lugar de filas rígidas. Una base contiene colecciones; una colección reúne documentos; cada documento está formado por campos. Los nombres recuerdan a bases, tablas, filas y columnas, pero no son equivalentes. En una colección documental dos registros pueden compartir campos y, al mismo tiempo, incluir datos diferentes cuando el problema lo necesita. JSON funciona como un lenguaje visual para representar estas estructuras antes de guardarlas.`,
  practica01: `La sintaxis de MongoDB se comprende mejor cuando cada comando se relaciona con una intención. Seleccionar una base, insertar un documento, buscarlo y modificarlo son pasos de una conversación con el sistema. La consola y los drivers expresan documentos mediante objetos parecidos a JSON. Practicar manualmente permite observar la creación de colecciones, el campo identificador y la diferencia entre pedir todos los registros o aplicar un selector.`,
  practica1: `MongoDB Atlas traslada la base de datos a una infraestructura administrada. Crear un clúster no es suficiente: también deben configurarse usuarios, redes permitidas y una cadena de conexión protegida. El driver de una aplicación abre la comunicación con el servidor, mientras que las credenciales permiten autenticarla. Una prueba de conexión debe confirmar tanto el acceso como la selección correcta de base y colección.`,
  practica2: `Una interfaz de catálogo convierte las consultas en una experiencia visible. La aplicación no debería conocer contraseñas escritas directamente en el código ni descargar documentos sin límite. El driver conecta Python con MongoDB; la consulta decide qué documentos recuperar; Flet transforma los resultados en tarjetas, listas y detalles. Separar esos pasos facilita encontrar errores y mejorar la aplicación sin alterar todo al mismo tiempo.`,
  practica3: `Un formulario no es únicamente un conjunto de cajas de texto. Cada control representa un campo del futuro documento y debe tener nombre, tipo y reglas de validación. Antes de guardar conviene transformar la información de la pantalla en un objeto coherente. Esa operación conecta la experiencia del usuario con el modelo documental y evita que la colección reciba datos incompletos o con formatos incompatibles.`,
  practica4: `Un quiz interactivo combina preguntas, respuestas, resultados y eventos. En un modelo documental se puede decidir si cada intento será un documento, si las preguntas vivirán embebidas o si se relacionarán mediante identificadores. La decisión depende de las consultas: revisar un intento completo favorece datos agrupados; reutilizar preguntas entre muchos cuestionarios puede favorecer referencias.`,
  practica5: `Los videojuegos y actividades visuales generan eventos: iniciar una partida, encontrar un objeto, sumar puntos o terminar un nivel. Guardar cada detalle sin criterio puede producir demasiadas escrituras. Conviene definir qué eventos son importantes, qué información resume el progreso y qué datos permiten continuar después. El documento debe contar la historia útil de la sesión, no copiar todo lo que ocurre en pantalla.`,
  practica6: `Firebase Authentication proporciona una identidad verificable mediante un UID. Firestore puede utilizar ese identificador para reconocer al propietario de un documento. La clave de configuración web identifica el proyecto, pero no sustituye las reglas. Una regla segura comprueba que exista una sesión y que el UID coincida con la ruta o con un campo autorizado antes de permitir lecturas o escrituras.`,
  practica7: `Una Pokedex es un buen ejemplo de datos externos y favoritos personales. La información general de cada criatura puede venir de una API, mientras los favoritos pertenecen al usuario autenticado. Separar ambos orígenes evita copiar información innecesaria. La aplicación debe presentar estados claros durante la carga, controlar errores de red y guardar solo los datos que realmente necesita recuperar.`,
  practica8: `Cuando una aplicación combina Python, una interfaz y Firebase aparecen varias responsabilidades. La interfaz captura acciones; un servicio consulta o guarda datos; la autenticación aporta identidad; el modelo define la forma de los documentos. Si estas piezas se mezclan en una sola función, cada cambio se vuelve riesgoso. Una arquitectura sencilla ayuda a localizar problemas y reutilizar operaciones.`,
  practica9: `Registrar plantas del patio transforma observaciones reales en documentos. Antes de programar es necesario acordar nombres de campos, unidades y valores permitidos. La altura debe conservar un tipo numérico, la fecha necesita un formato consistente y las características repetibles pueden almacenarse en arreglos. Un modelo flexible no significa capturar cada registro de manera diferente.`,
  practica10: `Las ciudades inteligentes reciben datos de sensores, teléfonos, transporte y servicios. El valor no está en acumular información, sino en responder preguntas que beneficien a la comunidad. También existen riesgos: rastreo excesivo, datos incorrectos y decisiones automatizadas sin explicación. Diseñar una base de datos implica elegir qué guardar, durante cuánto tiempo y quién podrá consultarlo.`,
  practica11: `Flet transforma la lectura de Firestore en una DataTable dentro de PlantApp. El servicio recupera documentos y la interfaz convierte cada diccionario en DataRow sin cambiar de proyecto.`,
  practica12: `Flet construye interfaces visuales con controles de Python. El formulario captura y valida datos antes de enviarlos al servicio Firebase. Crear un documento no termina con add(): la aplicación también debe comunicar el resultado, limpiar controles y actualizar la lista visible.`,
  practica13: `El buscador se agrega a la misma interfaz Flet y reutiliza la DataTable. Localiza documentos por nombre, grupo o ID sin reconstruir la aplicación.`,
  practica14: `Actualizar significa modificar un documento existente y conservar su ID. La tabla Flet permite seleccionar una fila, cargarla en el formulario y guardar cambios. Una variable de selección distingue el modo Crear del modo Editar y evita generar duplicados.`,
  practica15: `Eliminar es la operación con mayor riesgo. La DataTable Flet conserva el ID y AlertDialog solicita confirmación antes de llamar delete().`,
  practica16: `Un panel convierte registros en indicadores. Flet presenta tarjetas, tabla y proporciones calculadas desde una misma lectura.`,
  practica17: `El CRUD integrador reúne crear, leer, buscar, actualizar y eliminar en una sola aplicación visual. La interfaz puede cambiar, pero la colección, el modelo y el servicio Firebase se conservan. Centralizar validación y refresco evita inconsistencias entre formulario, tabla y panel.`,
  practica18: `La aplicación final debe demostrar un recorrido completo: identificar al usuario, validar datos, guardar documentos, consultar información y mostrar resultados. También debe contemplar errores, permisos y evidencia de prueba. Una demostración convincente explica la relación entre el problema escolar y cada decisión técnica, no solamente enseña pantallas.`,
  practicaabp: `El aprendizaje basado en proyectos conecta la tecnología con una necesidad observable. El equipo debe investigar a las personas usuarias, delimitar el problema, proponer una colección inicial y construir una versión mínima que pueda probarse. Las mejoras se priorizan mediante evidencias. Un proyecto pequeño que resuelve bien una necesidad es más valioso que una lista extensa de funciones sin integración.`,
};

const practiceReadingApplications = {
  practica0: `Imagina un expediente escolar. En una tabla tradicional todas las filas deben respetar columnas definidas previamente. En un modelo documental, el registro de un estudiante puede incluir datos básicos, un arreglo de materias y un objeto con información del tutor. Esa libertad permite representar mejor la realidad, pero también obliga a decidir nombres, tipos y reglas. La actividad de esta práctica construye el vocabulario necesario para comparar ambos enfoques y explicar por qué NoSQL no significa trabajar sin diseño.`,
  practica01: `La práctica en papel y el podcast técnico deben mostrar que comprendes la intención de los comandos. Insertar crea un documento; buscar utiliza un selector; actualizar modifica campos o reemplaza estructuras según la operación elegida; eliminar requiere un filtro preciso. Cuando expliques el proceso, utiliza un ejemplo propio y señala qué ocurriría si una consulta o eliminación se ejecutara sin condiciones. La evidencia debe demostrar comprensión, no solamente lectura de sintaxis.`,
  practica1: `En Atlas, una conexión atraviesa varias barreras. El clúster debe estar activo, la dirección del cliente debe estar permitida, el usuario necesita privilegios y la URI debe señalar el destino correcto. Un error de autenticación no se resuelve mostrando la contraseña en una captura. Se documenta el mensaje, se revisa cada capa y se protege la cadena de conexión. Esta forma ordenada de diagnosticar evita cambios improvisados y prepara la aplicación para trabajar con información real.`,
  practica2: `El catálogo de películas permite seguir el recorrido completo de los datos. Una consulta sale de Python, MongoDB selecciona documentos y el resultado regresa mediante un cursor. Después, la interfaz decide qué campos convertir en título, imagen, año o descripción. Si el catálogo tarda demasiado, el problema puede estar en la consulta, el número de documentos, la red o la construcción visual. Separar estas etapas permite medir y corregir la causa verdadera.`,
  practica3: `Diseñar el formulario antes de conectarlo a una base evita que la interfaz y el documento evolucionen por caminos distintos. Para cada campo debes responder: qué dato representa, si es obligatorio, qué tipo tendrá y cómo se validará. Un promedio no debería guardarse como texto y una lista de intereses no debería mezclarse en una sola cadena si después será consultada. El modelo comienza en la experiencia de captura y termina en una estructura preparada para futuras consultas.`,
  practica4: `En un quiz escolar conviene distinguir el contenido del cuestionario y la participación del alumno. Un documento de intento puede almacenar UID, fecha, respuestas, puntuación y duración. Las preguntas pueden quedar embebidas si cada quiz es independiente o referenciadas si se reutilizan. Esta decisión afecta la facilidad para revisar intentos históricos y modificar bancos de preguntas. El video de evidencia debe mostrar el flujo, pero también explicar brevemente la estructura elegida.`,
  practica5: `La cacería de datos convierte acciones rápidas en información persistente. No todas las coordenadas o movimientos merecen una escritura. Puede bastar con registrar inicio, final, objetos encontrados, puntuación y tiempo total. También debes considerar qué sucede si la aplicación se cierra antes de terminar. Diseñar puntos de guardado y un documento de sesión ayuda a recuperar progreso sin saturar la base. La evidencia debe relacionar eventos del juego con campos concretos.`,
  practica6: `Para proteger un documento de progreso, una ruta como usuarios/{uid}/practicas/{id} permite comparar el UID de la sesión con el propietario de los datos. La interfaz puede ocultar acciones, pero una persona todavía podría intentar escribir directamente. Por eso las reglas son la defensa real. En esta práctica debes probar tanto el camino permitido como uno rechazado y registrar el resultado. Una regla útil se entiende mejor cuando se comprueba su comportamiento.`,
  practica7: `La aplicación puede consultar Pokémon públicos sin exigir una cuenta, pero guardar favoritos requiere saber a quién pertenecen. El UID permite construir una colección privada o asociar cada favorito con su propietario. Al recuperar la sesión, la interfaz debe reconstruir el estado sin duplicar documentos. El video demostrativo debe enseñar búsqueda, inicio de sesión, guardado y recuperación para evidenciar que la información persiste y está vinculada a la identidad correcta.`,
  practica8: `PokeDesk agrega una dificultad: distintos componentes deben coordinarse sin convertirse en un archivo inmanejable. Conviene definir funciones para obtener datos externos, validar selecciones, administrar sesión y guardar favoritos. Cada función debe retornar información o errores claros para que la interfaz pueda responder. Esta separación prepara el sistema para cambiar de proveedor, agregar pruebas o reutilizar servicios sin rediseñar todas las pantallas.`,
  practica9: `Durante el trabajo de campo pueden aparecer datos desconocidos. En vez de inventarlos, el modelo debe permitir estados como “por identificar” y notas de observación. También conviene distinguir nombre común, nombre científico, ubicación y evidencia fotográfica. Cuando los estudiantes capturan con los mismos criterios, la colección se vuelve comparable. El objetivo no es llenar campos, sino transformar observaciones honestas en registros que otra persona pueda interpretar.`,
  practica10: `Antes de guardar datos de movilidad, rostros o ubicaciones, una ciudad debe justificar su utilidad y reducir riesgos. La minimización propone conservar solamente lo necesario; el control de acceso limita quién consulta; la retención define cuándo eliminar; la transparencia explica el propósito. Al responder las preguntas del video, conecta cada beneficio con una responsabilidad. Un sistema puede ser técnicamente avanzado y aun así resultar inadecuado si ignora privacidad y contexto.`,
  practica11: `El Treeview no conoce Firebase. Recibe valores ya transformados por obtener_plantas() y los presenta. Guardar el ID como iid permite seleccionar después el documento correcto sin mostrar identificadores largos en todas las columnas. La evidencia debe relacionar una fila con su documento original.`,
  practica12: `Un formulario visual debe guiar y limitar la captura. Los campos obligatorios se comprueban antes de llamar Firebase; los mensajes se muestran en Flet y el alta se confirma al recargar la tabla. Así la práctica incorpora Crear sin perder la consulta construida previamente.`,
  practica13: `Nombre y grupo pueden producir varias coincidencias; el ID representa un documento exacto. La interfaz debe explicar ambos comportamientos. Probar una búsqueda existente, una múltiple y una vacía permite comprobar que NiceGUI actualiza correctamente la tabla.`,
  practica14: `El modo edición reutiliza los controles de alta. La diferencia está en conservar registro_seleccionado_id y llamar update() en vez de add(). Después de guardar o cancelar, la selección se limpia para impedir que una captura posterior modifique accidentalmente el documento anterior.`,
  practica15: `El nombre visible ayuda al usuario a confirmar, pero el borrado se ejecuta con el ID. Primero se prueba Cancelar y luego Aceptar usando un documento preparado. En sistemas donde recuperar información es importante, archivar puede ser preferible a borrar físicamente.`,
  practica16: `Total, grupos únicos y activos se calculan desde la misma lista para que no representen momentos diferentes. Una barra expresa cantidad entre total y debe controlar el caso total igual a cero. La claridad de un panel depende de métricas definidas, no de añadir muchos gráficos.`,
  practica17: `El integrador reúne las piezas sin copiar la conexión en cada pestaña. Crear y actualizar comparten formulario; buscar filtra la lista visible; eliminar abre confirmación; refrescar vuelve a cargar tabla y métricas. La matriz de pruebas demuestra el funcionamiento mejor que una captura aislada.`,
  practica18: `La presentación final debe recorrer una historia verificable. Comienza con el problema y las personas usuarias; enseña el modelo de datos; inicia sesión; crea o actualiza un documento; ejecuta una consulta; demuestra una regla de seguridad; muestra una evidencia guardada. Después explica limitaciones y siguiente mejora. Esta secuencia permite evaluar arquitectura, funcionamiento y criterio, no solo apariencia. El enlace de demostración debe estar accesible para revisión.`,
  practicaabp: `El proyecto ABP avanza mediante ciclos: observar, definir, diseñar, construir, probar y mejorar. Cada ciclo debe producir una evidencia: entrevista, diagrama, documento JSON, regla, consulta, captura o video. El equipo debe distribuir responsabilidades sin fragmentar el producto. La entrega final conecta los Objetivos de Desarrollo Sostenible con una solución concreta y explica cómo los datos ayudan a comprender o atender el problema elegido.`,
};

const evidenceRequirements = {
  practica0: {
    icon: "🎙️",
    title: "Enlace del podcast académico",
    help: "Pega la URL pública o con acceso para el docente: Drive, YouTube, OneDrive, Spotify u otra plataforma.",
    name: "evidencia_podcast_url",
    label: "URL del podcast académico",
    required: true,
  },
  practica01: {
    icon: "🎙️",
    title: "Enlace del podcast técnico",
    help: "Verifica que el audio pueda reproducirse sin solicitar permisos adicionales.",
    name: "evidencia_podcast_url",
    label: "URL del podcast técnico",
    required: true,
  },
  practica1: {
    icon: "🔗",
    title: "Enlace del producto digital",
    help: "Si realizaste video, infografía o mini podcast, comparte aquí su URL.",
    name: "evidencia_producto_url",
    label: "URL del producto digital",
    required: false,
  },
  practica4: {
    icon: "🎥",
    title: "Enlace del video del quiz",
    help: "Comparte un video corto donde se observe el funcionamiento y el registro de resultados.",
    name: "evidencia_video_url",
    label: "URL del video demostrativo",
    required: true,
  },
  practica7: {
    icon: "🎥",
    title: "Enlace del video de Pokedex",
    help: "El video debe mostrar búsqueda, inicio de sesión, favoritos y consulta de datos.",
    name: "evidencia_video_url",
    label: "URL del video demostrativo",
    required: true,
  },
  practicaabp: {
    icon: "🚀",
    title: "Enlace del video final ABP",
    help: "Comparte el video explicativo de 3 a 5 minutos con acceso para el docente.",
    name: "evidencia_video_url",
    label: "URL del video final",
    required: true,
  },
};

// Agrega aquí una práctica cuando el docente decida utilizar Code.org.
// Si el contenido HTML ya menciona Code.org, la plataforma también lo detecta.
const codeOrgPractices = {};

function getCodeOrgRequirement(practiceId) {
  if (codeOrgPractices[practiceId]) return codeOrgPractices[practiceId];
  const sourceContent = document.querySelector("main .card")?.textContent || "";
  if (!/code\.org|code org/i.test(sourceContent)) return null;
  return {
    reason: "Se utilizará un entorno visual para representar el proceso antes de implementarlo con código y una base de datos.",
    activity: "Completa la actividad indicada por el docente en Code.org y relaciona su resultado con la misión de esta práctica.",
    competencies: [
      "Pensamiento computacional y descomposición de problemas.",
      "Representación visual de secuencias, decisiones o datos.",
      "Transferencia de una solución visual hacia una implementación técnica.",
    ],
    evidence: "Captura o enlace del proyecto de Code.org acompañado de una explicación breve del aprendizaje obtenido.",
  };
}

function buildStudentInformationNote() {
  const codeOrg = getCodeOrgRequirement(state.practiceId);
  return `
    <details class="student-information-note" open>
      <summary>
        <span class="student-note-icon">📘</span>
        <span>
          <strong>Nota Informativa para el Alumno</strong>
          <small>Cómo trabajar en esta plataforma y utilizar herramientas complementarias</small>
        </span>
        <span class="student-note-toggle" aria-hidden="true"></span>
      </summary>
      <div class="student-information-note__body">
        <p>
          Esta plataforma ha sido diseñada como el espacio principal de trabajo para la asignatura
          <strong>Implementa Bases de Datos No Relacionales</strong>. Aquí encontrarás lecturas,
          actividades, ejercicios, preguntas de reflexión y evidencias que te permitirán desarrollar
          las competencias establecidas en el programa de estudios.
        </p>
        <p>
          Durante algunas prácticas, el docente podrá solicitar el uso de herramientas complementarias
          como <strong>Code.org</strong>. Esto no significa que la práctica cambie de plataforma:
          Code.org funcionará como un entorno de apoyo para facilitar determinados conceptos mediante
          actividades visuales e interactivas.
        </p>
        <div class="student-note-reasons">
          <strong>Code.org puede utilizarse cuando:</strong>
          <ul>
            <li>✅ Se requiera comprender programación mediante bloques visuales.</li>
            <li>✅ Sea conveniente realizar simulaciones o ejercicios interactivos.</li>
            <li>✅ Se busque reforzar pensamiento computacional antes de soluciones más complejas.</li>
            <li>✅ La actividad necesite una herramienta especializada para facilitar el aprendizaje.</li>
          </ul>
        </div>
        <p>
          Las evidencias, respuestas, reflexiones y entregables seguirán registrándose dentro de esta
          plataforma, salvo que el docente indique lo contrario.
        </p>
        <p class="student-note-goal">
          🎯 <strong>Recuerda:</strong> el objetivo no es únicamente completar actividades, sino comprender
          cómo funcionan las bases de datos no relacionales y cómo pueden resolver problemas reales.
        </p>
        ${codeOrg ? `
          <section class="complementary-platform">
            <div class="complementary-platform__heading">
              <span>🚀</span>
              <div>
                <small>Esta misión utiliza una herramienta externa</small>
                <h3>Plataforma Complementaria: Code.org</h3>
              </div>
            </div>
            <div class="complementary-platform__grid">
              <article><strong>¿Por qué se utilizará?</strong><p>${escapeHtml(codeOrg.reason)}</p></article>
              <article><strong>Actividad</strong><p>${escapeHtml(codeOrg.activity)}</p></article>
              <article>
                <strong>Competencias</strong>
                <ul>${codeOrg.competencies.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              </article>
              <article><strong>Evidencia esperada</strong><p>${escapeHtml(codeOrg.evidence)}</p></article>
            </div>
          </section>` : `
          <p class="student-note-current-platform">
            <strong>En esta práctica:</strong> todo el trabajo se realiza en esta plataforma y en las
            herramientas técnicas señaladas dentro de la misión.
          </p>`}
      </div>
    </details>`;
}

function getLongReading(practiceId, fallback) {
  const topic = practiceReadingTopics[practiceId] || fallback;
  const application = practiceReadingApplications[practiceId]
    || `Relaciona esta lectura con una decisión concreta de tu aplicación escolar y documenta la evidencia obtenida.`;
  return `${topic}\n\n${application}`;
}

function getCurrentPhase(practiceId = state.practiceId) {
  return coursePhases.find((phase) => phase.practices.includes(practiceId)) || coursePhases[0];
}

function escapeHtml(value = "") {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);
}

function getPracticeId() {
  const file = location.pathname.split("/").pop() || "index.html";
  if (!file.startsWith("practica-")) return null;
  return file.replace(".html", "").replaceAll("-", "");
}

function inferLesson() {
  const heading = document.querySelector(".page-title")?.textContent.trim() || "Práctica";
  const purposeHeading = [...document.querySelectorAll(".section-title")].find((item) =>
    item.textContent.toLowerCase().includes("propósito") || item.textContent.toLowerCase().includes("objetivo"),
  );
  const purpose = purposeHeading?.nextElementSibling?.textContent.trim()
    || "Comprender y aplicar los contenidos de la práctica mediante una evidencia verificable.";
  return {
    title: heading,
    purpose,
    reading: `En esta práctica trabajarás “${heading}”. Lee las instrucciones completas antes de comenzar. Relaciona cada concepto con una acción concreta, registra tus decisiones y conserva una evidencia que permita explicar cómo obtuviste el resultado.`,
    concepts: ["comprensión", "aplicación", "evidencia", "reflexión"],
    steps: [
      "Lee el propósito y localiza los conceptos que aún no dominas.",
      "Sigue la actividad en el orden indicado y registra tus decisiones.",
      "Comprueba el resultado antes de preparar la evidencia.",
      "Responde la reflexión con tus propias palabras.",
    ],
    questions: genericQuestions,
  };
}

function createAuthBar() {
  const bar = document.createElement("header");
  bar.className = "school-toolbar";
  bar.innerHTML = `
    <div class="school-toolbar__course">
      <span class="school-toolbar__eyebrow">Aula digital</span>
      <strong>Implementa bases de datos no relacionales</strong>
    </div>
    <div class="auth-panel">
      <div id="auth-user" class="auth-user" hidden>
        <img id="auth-photo" alt="" referrerpolicy="no-referrer" />
        <span><strong id="auth-name"></strong><small id="auth-email"></small></span>
      </div>
      <button id="login-google" class="primary-action" type="button">Iniciar sesión con Google</button>
      <button id="logout-google" class="secondary-action" type="button" hidden>Cerrar sesión</button>
    </div>`;
  document.body.prepend(bar);

  bar.querySelector("#login-google").addEventListener("click", async () => {
    if (!state.firebaseReady) {
      setGlobalNotice("Firebase todavía está conectándose. Intenta de nuevo en un momento.", "warning");
      return;
    }
    setGlobalNotice("Abriendo inicio de sesión…", "info");
    try {
      await state.firebase.signInWithPopup(state.firebase.auth, state.firebase.googleProvider);
    } catch (error) {
      console.error(error);
      setGlobalNotice("No fue posible iniciar sesión. Revisa que el dominio esté autorizado en Firebase.", "error");
    }
  });
  bar.querySelector("#logout-google").addEventListener("click", () => {
    if (state.firebaseReady) state.firebase.signOut(state.firebase.auth);
  });
}

function addPhaseNavigation() {
  document.querySelectorAll(".sidebar").forEach((sidebar) => {
    const nav = sidebar.querySelector(".nav");
    if (!nav) return;
    const navTitle = sidebar.querySelector(".nav-title");
    if (navTitle) navTitle.textContent = "Mapa de aprendizaje";
    const currentPhase = state.practiceId ? getCurrentPhase() : null;
    nav.className = "nav phase-navigation";
    nav.innerHTML = `
      <a class="phase-home-link${state.practiceId ? "" : " active"}" href="index.html">
        <span>🏠</span>
        <strong>Inicio y mapa del curso</strong>
      </a>
      <span class="phase-shortcuts__title">Ruta por fases</span>
      <div class="phase-shortcuts">
        ${coursePhases.map((phase) => `
          <a
            href="index.html#${phase.id}"
            class="${currentPhase?.id === phase.id ? "current-phase" : ""}"
            style="--phase-color:${phase.color}"
          >
            <span>${phase.icon}</span>
            <b>Fase ${phase.number}</b>
            <small>${escapeHtml(phase.title)}</small>
          </a>`).join("")}
      </div>
      ${currentPhase ? `
        <section class="current-phase-missions" style="--phase-color:${currentPhase.color}">
          <div class="current-phase-missions__heading">
            <span>${currentPhase.icon}</span>
            <div>
              <small>Estás en la Fase ${currentPhase.number}</small>
              <strong>${escapeHtml(currentPhase.title)}</strong>
            </div>
          </div>
          <div class="current-phase-missions__links">
            ${currentPhase.practices.map((practiceId) => {
    const practice = practiceCatalog[practiceId];
    return `
              <a class="${practiceId === state.practiceId ? "active" : ""}" href="${practice[2]}">
                <span class="mission-number">${escapeHtml(practice[0].replace("Práctica ", ""))}</span>
                <span>${escapeHtml(practice[1])}</span>
              </a>`;
  }).join("")}
          </div>
        </section>` : ""}
    `;
  });
}

function setGlobalNotice(message, kind = "info") {
  let notice = document.querySelector("#platform-notice");
  if (!notice) {
    notice = document.createElement("div");
    notice.id = "platform-notice";
    notice.className = "platform-notice";
    document.body.append(notice);
  }
  notice.dataset.kind = kind;
  notice.textContent = message;
  notice.hidden = false;
  clearTimeout(setGlobalNotice.timer);
  setGlobalNotice.timer = setTimeout(() => { notice.hidden = true; }, 5000);
}

function updateAuthUI(user) {
  const userBox = document.querySelector("#auth-user");
  const login = document.querySelector("#login-google");
  const logout = document.querySelector("#logout-google");
  userBox.hidden = !user;
  login.hidden = Boolean(user);
  logout.hidden = !user;
  if (user) {
    document.querySelector("#auth-name").textContent = user.displayName || "Estudiante";
    document.querySelector("#auth-email").textContent = user.email || "";
    const image = document.querySelector("#auth-photo");
    image.src = user.photoURL || "";
    image.hidden = !user.photoURL;
    const nameField = document.querySelector("#nombreAlumno");
    const emailField = document.querySelector("#correoAlumno");
    if (nameField && !nameField.value) nameField.value = user.displayName || "";
    if (emailField && !emailField.value) emailField.value = user.email || "";
  }
}

function buildLearningPanel(lesson) {
  const phase = getCurrentPhase();
  const evidence = evidenceRequirements[state.practiceId];
  const readingParagraphs = lesson.reading
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
  const questions = lesson.questions.map((question, index) => `
    <label class="answer-card">
      <span>${index + 1}. ${escapeHtml(question)}</span>
      <textarea name="respuesta_${index + 1}" rows="${index === 2 ? 4 : 3}" required></textarea>
    </label>`).join("");
  return `
    ${buildStudentInformationNote()}
    <section class="learning-panel" aria-labelledby="interactive-title">
      <div class="learning-panel__heading">
        <div>
          <div class="practice-meta">
            <span class="phase-pill" style="--phase-color:${phase.color}">${phase.icon} Fase ${phase.number}</span>
            <span class="practice-state" id="practice-state" data-state="not-started">No iniciado</span>
          </div>
          <p class="kicker">Aventura de aprendizaje</p>
          <h2 id="interactive-title">${escapeHtml(lesson.title)}</h2>
        </div>
        <div class="progress-ring" id="progress-ring" style="--progress: 0">
          <span id="progress-value">0%</span>
        </div>
      </div>
      <div class="learning-grid">
        <article class="learning-block purpose-block mission-block">
          <span class="block-icon" aria-hidden="true">🎯</span>
          <span class="step-label">1 · Misión</span>
          <h3>Tu misión de aprendizaje</h3>
          <p>${escapeHtml(lesson.purpose)}</p>
        </article>
        <article class="learning-block reading-block">
          <span class="block-icon" aria-hidden="true">📖</span>
          <span class="step-label">2 · Lectura</span>
          <h3>Lectura contextual</h3>
          <div id="context-reading" class="reading-copy">${readingParagraphs}</div>
          <p class="reading-attribution">
            Marco conceptual adaptado y actualizado a partir de
            <a href="https://github.com/uokesita/the-little-mongodb-book" target="_blank" rel="noopener noreferrer">
              <em>El pequeño libro MongoDB</em>
            </a>
            de Karl Seguin,
            <a href="https://creativecommons.org/licenses/by-nc/3.0/deed.es" target="_blank" rel="noopener noreferrer">
              licencia CC BY-NC 3.0
            </a>.
          </p>
          <div class="audio-reader" aria-label="Reproductor de lectura">
            <div class="audio-reader__heading">
              <span class="audio-reader__icon">🎧</span>
              <div>
                <strong>Escucha la lectura</strong>
                <small id="speech-status" role="status">Lista para reproducir</small>
              </div>
            </div>
            <div class="speech-actions">
              <button class="audio-action audio-action--play" id="speak-reading" type="button">▶ Escuchar</button>
              <button class="audio-action" id="pause-reading" type="button">⏸ Pausar</button>
              <button class="audio-action" id="resume-reading" type="button">⏯ Continuar</button>
              <button class="audio-action audio-action--stop" id="stop-reading" type="button">⏹ Detener</button>
            </div>
          </div>
        </article>
        <article class="learning-block">
          <span class="block-icon" aria-hidden="true">💡</span>
          <span class="step-label">3 · Descubre</span>
          <h3>Conceptos clave</h3>
          <div class="concept-chips">${lesson.concepts.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        </article>
        <article class="learning-block">
          <span class="block-icon" aria-hidden="true">🛠️</span>
          <span class="step-label">4 · Reto</span>
          <h3>Actividad paso a paso</h3>
          <ol class="activity-steps">${lesson.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
        </article>
      </div>
      <form id="cloud-practice-form" class="cloud-practice-form">
        <div class="form-intro">
          <div>
            <span class="step-label">5 · Responde</span>
            <h3>Bitácora de la misión</h3>
          </div>
          <p id="cloud-access-message">Inicia sesión con Google para guardar y recuperar tu avance.</p>
        </div>
        <div class="answer-list">${questions}</div>
        <label class="answer-card reflection-card">
          <span>Reflexión final: ¿qué aprendiste, qué dificultad enfrentaste y cómo la resolviste?</span>
          <textarea name="reflexion_final" rows="5" required></textarea>
        </label>
        ${evidence ? `
          <section class="evidence-link-card">
            <div class="evidence-link-card__heading">
              <span>${evidence.icon}</span>
              <div>
                <strong>${escapeHtml(evidence.title)}</strong>
                <small>${escapeHtml(evidence.help)}</small>
              </div>
            </div>
            <label>
              <span>${escapeHtml(evidence.label)}${evidence.required ? " *" : " (opcional)"}</span>
              <input
                type="url"
                name="${evidence.name}"
                data-question="${escapeHtml(evidence.label)}"
                placeholder="https://..."
                ${evidence.required ? "required" : ""}
              />
            </label>
          </section>` : ""}
        <label class="completion-check">
          <input type="checkbox" name="completed" />
          <span>Confirmo que revisé mis respuestas y preparé la evidencia solicitada.</span>
        </label>
        <div class="cloud-form-actions">
          <button class="primary-action save-progress-action" id="save-cloud-progress" type="submit">💾 Guardar avance</button>
          <span class="save-status" id="cloud-save-status" role="status">Sin guardar</span>
        </div>
      </form>
    </section>`;
}

function addInteractivePractice() {
  state.practiceId = getPracticeId();
  if (!state.practiceId) return;
  const card = document.querySelector("main .card");
  if (!card) return;

  const lesson = advancedLessons[state.practiceId] || inferLesson();
  lesson.reading = getLongReading(state.practiceId, lesson.reading);
  const phase = getCurrentPhase();
  document.body.dataset.phase = phase.id;
  document.documentElement.style.setProperty("--phase-accent", phase.color);
  [
    card.querySelector(".unit-label"),
    card.querySelector(":scope > .badge"),
    card.querySelector(":scope > .page-title"),
    card.querySelector(":scope > .page-subtitle"),
  ].filter(Boolean).forEach((element) => element.classList.add("source-practice-heading"));
  const subtitle = card.querySelector(".page-subtitle");
  const marker = subtitle || card.querySelector(".page-title");
  marker.insertAdjacentHTML("afterend", buildLearningPanel(lesson));
  state.form = document.querySelector("#cloud-practice-form");

  // Las prácticas visuales 11–17 incluyen tutorial, código incremental y
  // programas completos. Deben permanecer visibles, no dentro de un bloque
  // plegable de profundización.
  if (advancedLessons[state.practiceId] && !card.matches("[data-crud-practice]")) {
    const panel = document.querySelector(".learning-panel");
    const legacyNodes = [];
    let node = panel.nextElementSibling;
    while (node) {
      legacyNodes.push(node);
      node = node.nextElementSibling;
    }
    if (legacyNodes.length) {
      const details = document.createElement("details");
      details.className = "deep-dive";
      details.innerHTML = `
        <summary>
          <span>🧪</span>
          <span><strong>Laboratorio de profundización</strong><small>Ejemplos, ejercicios técnicos y retos adicionales</small></span>
        </summary>
        <div class="deep-dive__content"></div>`;
      legacyNodes.forEach((item) => details.lastElementChild.append(item));
      card.append(details);
    }
  }

  bindSpeech(lesson.reading);
  state.form.addEventListener("submit", saveProgress);
  updateProgress();
  updatePracticeState(0);
}

function isPromptList(list) {
  const previous = list.previousElementSibling;
  if (!previous) return false;
  return /(investigar|responder|analizar|reflexiona|desarrollar|explicar)/.test(
    previous.textContent.toLowerCase(),
  );
}

function buildAnswerControl(question, name) {
  const shortAnswer = question.length <= 55
    && /^(¿?(qué significa|qué es|cuál es|nombre|grupo|fecha)|[\w\s]+:)/i.test(question);
  if (shortAnswer) {
    return `<input
      name="${name}"
      type="text"
      class="inline-answer short-answer"
      data-question="${escapeHtml(question)}"
      placeholder="Escribe una respuesta breve…"
    />`;
  }
  return `<textarea
    name="${name}"
    rows="3"
    class="inline-answer"
    data-question="${escapeHtml(question)}"
    placeholder="Desarrolla aquí tu respuesta…"
  ></textarea>`;
}

function makeStaticQuestionsRespondable() {
  if (!state.practiceId) return;
  const card = document.querySelector("main .card");
  if (!card) return;

  let index = 0;
  card.querySelectorAll("ul, ol").forEach((list) => {
    const promptList = isPromptList(list);
    [...list.children].forEach((item) => {
      if (item.closest("form") || item.querySelector("textarea, input, select")) return;
      const question = item.textContent.replace(/\s+/g, " ").trim();
      if (!question || (!question.includes("?") && !promptList)) return;

      index += 1;
      item.classList.add("inline-question");
      item.dataset.question = question;
      item.innerHTML = `
        <label>
          <span class="texto-pregunta">${escapeHtml(question)}</span>
          ${buildAnswerControl(question, `contenido_${index}`)}
        </label>`;
    });
  });

  card.querySelectorAll("p").forEach((paragraph) => {
    if (paragraph.closest("form, .inline-question") || paragraph.querySelector("textarea, input, select")) return;
    const question = paragraph.textContent.replace(/\s+/g, " ").trim();
    if (!question.endsWith("?") || question.length > 280) return;

    index += 1;
    const block = document.createElement("div");
    block.className = "inline-question standalone-question";
    block.dataset.question = question;
    block.innerHTML = `
      <label>
        <span class="texto-pregunta">${escapeHtml(question)}</span>
        ${buildAnswerControl(question, `contenido_${index}`)}
      </label>`;
    paragraph.replaceWith(block);
  });
}

function organizePracticeWorkbook() {
  if (!state.practiceId || advancedLessons[state.practiceId]) return;
  const card = document.querySelector("main .card");
  const panel = card?.querySelector(".learning-panel");
  if (!card || !panel) return;

  const nodes = [];
  let node = panel.nextElementSibling;
  while (node) {
    nodes.push(node);
    node = node.nextElementSibling;
  }
  if (!nodes.length) return;

  const workbook = document.createElement("section");
  workbook.className = "mission-workbook";
  workbook.innerHTML = `
    <header class="mission-workbook__heading">
      <span class="mission-workbook__icon">🗺️</span>
      <div>
        <span class="step-label">Explora y construye</span>
        <h2>Cuaderno de la misión</h2>
        <p>Recorre las estaciones, completa los retos y registra tus evidencias.</p>
      </div>
    </header>
    <div class="mission-workbook__content"></div>`;
  nodes.forEach((item) => workbook.lastElementChild.append(item));
  card.append(workbook);
}

function addFinalSubmissionPanel() {
  if (!state.practiceId) return;
  const card = document.querySelector("main .card");
  if (!card) return;
  card.insertAdjacentHTML("beforeend", `
    <section class="submission-panel" aria-labelledby="submission-title">
      <div class="submission-heading">
        <div>
          <span class="step-label">Entrega de la práctica</span>
          <h2 id="submission-title">Enviar respuestas al docente</h2>
        </div>
        <span class="submission-badge">Apps Script + correo</span>
      </div>
      <p class="submission-help">
        El guardado en Firebase conserva tu avance. Este botón entrega al docente una copia
        de todas las respuestas escritas en la práctica.
      </p>
      <form id="practice-submission-form" novalidate>
        <div class="student-data-grid">
          <label>
            <span>Nombre completo</span>
            <input id="nombreAlumno" name="student_name" type="text" autocomplete="name" required />
          </label>
          <label>
            <span>Grupo</span>
            <input id="grupoAlumno" name="student_group" type="text" required />
          </label>
          <label>
            <span>Correo del alumno</span>
            <input id="correoAlumno" name="student_email" type="email" autocomplete="email" required />
          </label>
        </div>
        <div class="submission-actions">
          <button class="send-action" id="send-practice-answers" type="submit">Enviar respuestas</button>
          <span id="submission-status" class="submission-status" role="status"></span>
        </div>
      </form>
    </section>`);
  document.querySelector("#practice-submission-form").addEventListener("submit", sendPracticeAnswers);
}

function allAnswerControls() {
  return [...document.querySelectorAll("main .card textarea, main .card select, main .card input")]
    .filter((field) => (
      !field.closest("#practice-submission-form")
      && !["button", "submit", "reset", "hidden"].includes(field.type)
      && field.name !== "completed"
    ));
}

function saveLocalDraft() {
  if (!state.practiceId) return;
  const answers = {};
  allAnswerControls().forEach((field, index) => {
    const key = field.name || `campo_${index + 1}`;
    answers[key] = field.type === "checkbox" || field.type === "radio"
      ? field.checked
      : field.value;
  });
  localStorage.setItem(localDraftKey(), JSON.stringify({
    student: {
      nombre: document.querySelector("#nombreAlumno")?.value || "",
      grupo: document.querySelector("#grupoAlumno")?.value || "",
      correo: document.querySelector("#correoAlumno")?.value || "",
    },
    answers,
  }));
}

function loadLocalDraft() {
  if (!state.practiceId) return;
  try {
    const draft = JSON.parse(localStorage.getItem(localDraftKey()) || "{}");
    const student = draft.student || {};
    const fields = {
      nombreAlumno: student.nombre,
      grupoAlumno: student.grupo,
      correoAlumno: student.correo,
    };
    Object.entries(fields).forEach(([id, value]) => {
      const field = document.getElementById(id);
      if (field && !field.value) field.value = value || "";
    });
    Object.entries(draft.answers || {}).forEach(([name, value]) => {
      const field = [...document.querySelectorAll("[name]")].find((item) => item.name === name);
      if (!field) return;
      if (field.type === "checkbox" || field.type === "radio") field.checked = Boolean(value);
      else if (!field.value) field.value = value;
    });
    updateProgress();
  } catch (error) {
    console.warn("No fue posible recuperar el borrador local.", error);
  }
}

function collectAnswersForSubmission() {
  return allAnswerControls().map((field, index) => {
    const label = field.closest("label");
    const question = field.dataset.question
      || field.dataset.label
      || label?.querySelector("span")?.textContent.trim()
      || label?.textContent.replace(field.value, "").trim()
      || field.name
      || `Pregunta ${index + 1}`;
    const response = field.type === "checkbox" || field.type === "radio"
      ? (field.checked ? (field.value || "Sí") : "No seleccionado")
      : field.value.trim();
    return { pregunta: question, respuesta: response };
  });
}

async function sendPracticeAnswers(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector("#submission-status");
  const button = document.querySelector("#send-practice-answers");
  const nombre = form.elements.student_name.value.trim();
  const grupo = form.elements.student_group.value.trim();
  const correo = form.elements.student_email.value.trim();

  form.querySelectorAll("input").forEach((field) => field.classList.remove("field-error"));
  if (!nombre || !grupo || !correo || !form.elements.student_email.validity.valid) {
    form.querySelectorAll("input").forEach((field) => {
      if (!field.value.trim() || !field.validity.valid) field.classList.add("field-error");
    });
    status.dataset.kind = "error";
    status.textContent = "Completa nombre, grupo y un correo válido.";
    form.querySelector(".field-error")?.focus();
    return;
  }

  const requiredEvidence = document.querySelector(".evidence-link-card input[required]");
  if (requiredEvidence && !requiredEvidence.validity.valid) {
    requiredEvidence.classList.add("field-error");
    requiredEvidence.focus();
    status.dataset.kind = "error";
    status.textContent = "Agrega una URL válida para la evidencia antes de enviar.";
    return;
  }

  const endpoint = String(window.SCHOOL_APPS_SCRIPT_URL || "").trim();
  if (!endpoint.startsWith("https://script.google.com/")) {
    status.dataset.kind = "error";
    status.textContent = "Falta configurar la URL de Apps Script.";
    return;
  }

  const title = document.querySelector(".page-title")?.textContent.trim() || state.practiceId;
  const payload = {
    nombre,
    grupo,
    correo,
    practica: `${state.practiceId.replace("practica", "Práctica ")} — ${title}`,
    practicaId: state.practiceId,
    fecha: new Date().toISOString(),
    porcentaje: `${calculateProgress()}%`,
    respuestas: collectAnswersForSubmission(),
  };

  saveLocalDraft();
  button.disabled = true;
  button.textContent = "Enviando…";
  status.dataset.kind = "info";
  status.textContent = "Enviando respuestas al docente…";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "text/plain;charset=utf-8" },
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.error || "El servicio rechazó el envío.");
    status.dataset.kind = "success";
    status.textContent = "Respuestas enviadas correctamente.";
    setGlobalNotice("La práctica fue enviada al docente.", "success");
  } catch (error) {
    console.error(error);
    status.dataset.kind = "error";
    status.textContent = "Error al enviar. El borrador continúa guardado en este dispositivo.";
  } finally {
    button.disabled = false;
    button.textContent = "Enviar respuestas";
  }
}

function bindSpeech(text) {
  const speak = document.querySelector("#speak-reading");
  const pause = document.querySelector("#pause-reading");
  const resume = document.querySelector("#resume-reading");
  const stop = document.querySelector("#stop-reading");
  const status = document.querySelector("#speech-status");
  if (!speak || !("speechSynthesis" in window)) {
    document.querySelectorAll("#speak-reading, #pause-reading, #resume-reading, #stop-reading").forEach((button) => {
      button.disabled = true;
      button.title = "Este navegador no ofrece lectura en voz alta.";
    });
    if (status) status.textContent = "La lectura por voz no está disponible en este navegador";
    return;
  }
  const synthesis = window.speechSynthesis;
  let playbackId = 0;
  let selectedVoice = null;

  const setStatus = (message) => {
    if (status) status.textContent = message;
  };

  const selectSpanishVoice = () => {
    const voices = synthesis.getVoices();
    selectedVoice = voices.find((voice) => /^es-MX$/i.test(voice.lang))
      || voices.find((voice) => /^es-(419|US)$/i.test(voice.lang))
      || voices.find((voice) => /^es/i.test(voice.lang))
      || null;
  };

  const prepareSpeechText = (value) => {
    const replacements = [
      [/\bMongoDB Atlas\b/gi, "Mongo de bé Atlas"],
      [/\bMongoDB\b/gi, "Mongo de bé"],
      [/\bNoSQL\b/gi, "no ese cu ele"],
      [/\bSQL\b/gi, "ese cu ele"],
      [/\bJSON\b/gi, "jéison"],
      [/\bBSON\b/gi, "bíson"],
      [/\bFirestore\b/gi, "Fáierstor"],
      [/\bFirebase\b/gi, "Fáierbeis"],
      [/\bAuthentication\b/gi, "autenticación"],
      [/\bUID\b/gi, "identificador único de usuario"],
      [/\bCRUD\b/gi, "crear, leer, actualizar y eliminar"],
      [/\bAPI\b/gi, "a pe i"],
      [/\bURL\b/gi, "u erre ele"],
      [/\bPython\b/gi, "Páiton"],
      [/\bCode\.org\b/gi, "Code punto org"],
      [/\bObjectId\b/gi, "identificador de objeto"],
      [/\bwhere\b/gi, "güer"],
      [/\borderBy\b/gi, "órder bai"],
      [/\blimit\b/gi, "límite"],
      [/\bstartAfter\b/gi, "comenzar después de"],
      [/\bonSnapshot\b/gi, "escucha de cambios en tiempo real"],
      [/\$gt\b/gi, "mayor que"],
      [/\$gte\b/gi, "mayor o igual que"],
      [/\$lt\b/gi, "menor que"],
      [/\$lte\b/gi, "menor o igual que"],
      [/\$set\b/gi, "establecer"],
      [/\$inc\b/gi, "incrementar"],
      [/\{uid\}/gi, "identificador del usuario"],
      [/\{id\}/gi, "identificador de la práctica"],
    ];
    return replacements.reduce(
      (prepared, [pattern, replacement]) => prepared.replace(pattern, replacement),
      value,
    )
      .replace(/[()[\]{}]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const splitForSpeech = (value, maxLength = 230) => {
    const sentences = value.match(/[^.!?;:]+[.!?;:]?|.+$/g) || [value];
    const chunks = [];
    let current = "";
    sentences.forEach((sentence) => {
      const candidate = `${current} ${sentence}`.trim();
      if (candidate.length <= maxLength) {
        current = candidate;
        return;
      }
      if (current) chunks.push(current);
      if (sentence.length <= maxLength) {
        current = sentence.trim();
        return;
      }
      const words = sentence.trim().split(/\s+/);
      current = "";
      words.forEach((word) => {
        const wordCandidate = `${current} ${word}`.trim();
        if (wordCandidate.length > maxLength && current) {
          chunks.push(current);
          current = word;
        } else {
          current = wordCandidate;
        }
      });
    });
    if (current) chunks.push(current);
    return chunks;
  };

  const getReadingText = () => {
    return document.querySelector("#context-reading")?.textContent.trim() || text;
  };

  const playChunks = (chunks, index, currentPlaybackId) => {
    if (currentPlaybackId !== playbackId) return;
    if (index >= chunks.length) {
      setStatus("Lectura finalizada");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.lang = selectedVoice?.lang || "es-MX";
    utterance.voice = selectedVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setStatus(`Reproduciendo · parte ${index + 1} de ${chunks.length}`);
    utterance.onpause = () => setStatus("Lectura en pausa");
    utterance.onresume = () => setStatus("Continuando lectura…");
    utterance.onend = () => playChunks(chunks, index + 1, currentPlaybackId);
    utterance.onerror = (event) => {
      if (
        currentPlaybackId === playbackId
        && event.error !== "canceled"
        && event.error !== "interrupted"
      ) {
        setStatus("No fue posible reproducir la lectura");
      }
    };
    synthesis.speak(utterance);
  };

  selectSpanishVoice();
  synthesis.addEventListener?.("voiceschanged", selectSpanishVoice);

  speak.addEventListener("click", () => {
    playbackId += 1;
    synthesis.cancel();
    const chunks = splitForSpeech(prepareSpeechText(getReadingText()));
    setTimeout(() => playChunks(chunks, 0, playbackId), 80);
  });
  pause.addEventListener("click", () => {
    if (synthesis.speaking && !synthesis.paused) synthesis.pause();
  });
  resume.addEventListener("click", () => {
    if (synthesis.paused) synthesis.resume();
  });
  stop.addEventListener("click", () => {
    playbackId += 1;
    synthesis.cancel();
    setStatus("Lectura detenida");
  });
  window.addEventListener("pagehide", () => {
    playbackId += 1;
    synthesis.cancel();
  }, { once: true });
}

function formValues() {
  const values = {};
  allAnswerControls().forEach((field, index) => {
    const key = field.name || `campo_${index + 1}`;
    if (field.type === "checkbox" || field.type === "radio") {
      values[key] = field.checked;
    } else {
      values[key] = field.value;
    }
  });
  values.completed = state.form.elements.completed.checked;
  return values;
}

function calculateProgress() {
  if (!state.form) return 0;
  const fields = allAnswerControls();
  if (!fields.length) return 0;
  const answered = fields.filter((field) => {
    if (field.type === "checkbox" || field.type === "radio") return field.checked;
    return String(field.value || "").trim().length >= 3;
  }).length;
  const responseProgress = Math.round((answered / fields.length) * 90);
  return Math.min(100, responseProgress + (state.form.elements.completed.checked ? 10 : 0));
}

function updateProgress() {
  const progress = calculateProgress();
  const ring = document.querySelector("#progress-ring");
  if (ring) ring.style.setProperty("--progress", progress);
  const value = document.querySelector("#progress-value");
  if (value) value.textContent = `${progress}%`;
  updatePracticeState(progress);
}

function updatePracticeState(progress, dirty = false) {
  const badge = document.querySelector("#practice-state");
  if (!badge) return;
  let stateName = "not-started";
  let label = "No iniciado";
  if (progress >= 100) {
    stateName = "completed";
    label = "Completado";
  } else if (progress > 0 || dirty) {
    stateName = "in-progress";
    label = "En progreso";
  }
  if (badge.dataset.state === stateName && badge.textContent === label) return;
  badge.dataset.state = stateName;
  badge.textContent = label;
}

async function saveProgress(event) {
  event.preventDefault();
  const status = document.querySelector("#cloud-save-status");
  const requiredEvidence = state.form.querySelector(".evidence-link-card input[required]");
  if (requiredEvidence && !requiredEvidence.validity.valid) {
    requiredEvidence.classList.add("field-error");
    requiredEvidence.focus();
    status.dataset.state = "error";
    status.textContent = "Agrega una URL válida para la evidencia solicitada.";
    return;
  }
  saveLocalDraft();
  updateProgress();
  if (!state.user) {
    status.dataset.state = "local";
    status.textContent = "Borrador guardado en este dispositivo · inicia sesión para usar Firebase";
    setGlobalNotice("Puedes responder, pero necesitas iniciar sesión para guardar el progreso.", "warning");
    return;
  }
  status.dataset.state = "saving";
  status.textContent = "Guardando…";
  const progress = calculateProgress();
  try {
    const {
      db, doc, serverTimestamp, setDoc,
    } = state.firebase;
    await setDoc(doc(db, "usuarios", state.user.uid), {
      nombre: state.user.displayName || "",
      correo: state.user.email || "",
      foto: state.user.photoURL || "",
      ultimaActividad: serverTimestamp(),
    }, { merge: true });
    await setDoc(doc(db, "usuarios", state.user.uid, "practicas", state.practiceId), {
      practica: state.practiceId,
      fase: getCurrentPhase().id,
      faseNumero: getCurrentPhase().number,
      ruta: location.pathname.split("/").pop(),
      titulo: document.querySelector(".page-title")?.textContent.trim() || state.practiceId,
      respuestas: formValues(),
      porcentaje: progress,
      completada: state.form.elements.completed.checked && progress === 100,
      fechaActualizacion: serverTimestamp(),
    }, { merge: true });
    status.dataset.state = "saved";
    status.textContent = `Avance guardado · ${progress}%`;
    setGlobalNotice("Tu progreso se guardó en Firestore.", "success");
  } catch (error) {
    console.error(error);
    status.dataset.state = "error";
    status.textContent = "No se pudo guardar en Firebase.";
    setGlobalNotice("Firestore rechazó el guardado. Revisa las reglas del proyecto.", "error");
  }
}

async function loadPracticeProgress() {
  if (!state.firebaseReady || !state.user || !state.practiceId || !state.form) return;
  const status = document.querySelector("#cloud-save-status");
  status.textContent = "Recuperando avance…";
  try {
    const {
      db, doc, getDoc,
    } = state.firebase;
    const snapshot = await getDoc(doc(db, "usuarios", state.user.uid, "practicas", state.practiceId));
    if (!snapshot.exists()) {
      status.textContent = "Aún no hay progreso guardado.";
      return;
    }
    const data = snapshot.data().respuestas || {};
    Object.entries(data).forEach(([name, value]) => {
      const field = [...document.querySelectorAll("[name]")].find((item) => item.name === name);
      if (!field) return;
      if (field.type === "checkbox" || field.type === "radio") field.checked = Boolean(value);
      else field.value = value;
    });
    updateProgress();
    status.dataset.state = "saved";
    status.textContent = `Progreso recuperado · ${snapshot.data().porcentaje || 0}%`;
  } catch (error) {
    console.error(error);
    status.textContent = "No se pudo recuperar el progreso.";
  }
}

function addHomeDashboard() {
  if (location.pathname.split("/").pop() && !location.pathname.endsWith("index.html")) return;
  const card = document.querySelector("main .card");
  if (!card) return;
  const phaseCards = coursePhases.map((phase) => `
    <article class="phase-card" id="${phase.id}" style="--phase-color:${phase.color}">
      <div class="phase-card__top">
        <span class="phase-icon" aria-hidden="true">${phase.icon}</span>
        <div>
          <span class="phase-number">Fase ${phase.number}</span>
          <h3>${escapeHtml(phase.title)}</h3>
        </div>
        <span class="phase-percent" id="${phase.id}-percent">0%</span>
      </div>
      <p>${escapeHtml(phase.description)}</p>
      <div class="phase-objective"><strong>Objetivo:</strong> ${escapeHtml(phase.objective)}</div>
      <div class="phase-progress" aria-label="Progreso de ${escapeHtml(phase.title)}">
        <span id="${phase.id}-bar" style="width:0%"></span>
      </div>
      <div class="phase-practices">
        ${phase.practices.map((practiceId) => {
    const practice = practiceCatalog[practiceId];
    return `
          <a class="phase-practice" href="${practice[2]}" data-practice-id="${practiceId}" data-state="not-started">
            <span class="practice-status-dot"></span>
            <span><strong>${escapeHtml(practice[0])}</strong><small>${escapeHtml(practice[1])}</small></span>
            <b class="practice-card-progress">0%</b>
          </a>`;
  }).join("")}
      </div>
    </article>`).join("");
  card.insertAdjacentHTML("afterbegin", `
    <section class="course-hero">
      <div>
        <p class="kicker">Tu aventura NoSQL comienza aquí</p>
        <h2>Aprende por fases. Supera misiones. Construye tu proyecto.</h2>
        <p>Avanza a tu ritmo y conserva cada logro. Las cinco fases te llevan desde los fundamentos hasta una aplicación escolar completa.</p>
        <a class="hero-action" href="#ruta-por-fases">Explorar la ruta</a>
      </div>
      <div class="course-hero__stats">
        <strong id="home-completed">0</strong>
        <span>misiones completadas</span>
        <div class="general-progress"><span id="general-progress-bar" style="width:0%"></span></div>
        <small id="general-progress-label">0% de la aventura</small>
      </div>
    </section>
    <section class="progress-dashboard" id="progress-dashboard">
      <div>
        <span class="dashboard-icon">🏅</span>
        <h3>Mi progreso general</h3>
        <p id="dashboard-message">Inicia sesión para recuperar tus logros en cualquier dispositivo.</p>
      </div>
      <div id="practice-progress-list" class="practice-progress-list"></div>
    </section>
    <section class="phase-route" id="ruta-por-fases">
      <div class="route-heading">
        <div>
          <p class="kicker">Mapa del curso</p>
          <h2>Ruta de aprendizaje por fases</h2>
        </div>
        <p>Cada fase desbloquea conocimientos para el reto siguiente.</p>
      </div>
      <div class="phase-grid">${phaseCards}</div>
    </section>`);

  const route = card.querySelector(".phase-route");
  let oldNode = route?.nextElementSibling;
  while (oldNode) {
    const nextNode = oldNode.nextElementSibling;
    oldNode.remove();
    oldNode = nextNode;
  }
}

function applyDashboardRecords(records) {
  const byPractice = new Map(records.map((record) => [record.practica, record]));
  let totalProgress = 0;
  let completed = 0;

  coursePhases.forEach((phase) => {
    let phaseProgress = 0;
    phase.practices.forEach((practiceId) => {
      const record = byPractice.get(practiceId);
      const progress = Number(record?.porcentaje || 0);
      phaseProgress += progress;
      totalProgress += progress;
      if (record?.completada) completed += 1;
      const card = document.querySelector(`[data-practice-id="${practiceId}"]`);
      if (!card) return;
      const stateName = record?.completada ? "completed" : progress > 0 ? "in-progress" : "not-started";
      card.dataset.state = stateName;
      card.querySelector(".practice-card-progress").textContent = `${progress}%`;
    });
    const average = Math.round(phaseProgress / phase.practices.length);
    const percent = document.querySelector(`#${phase.id}-percent`);
    const bar = document.querySelector(`#${phase.id}-bar`);
    if (percent) percent.textContent = `${average}%`;
    if (bar) bar.style.width = `${average}%`;
  });

  const totalPractices = coursePhases.reduce((sum, phase) => sum + phase.practices.length, 0);
  const average = Math.round(totalProgress / totalPractices);
  const completedLabel = document.querySelector("#home-completed");
  const generalBar = document.querySelector("#general-progress-bar");
  const generalLabel = document.querySelector("#general-progress-label");
  if (completedLabel) completedLabel.textContent = completed;
  if (generalBar) generalBar.style.width = `${average}%`;
  if (generalLabel) generalLabel.textContent = `${average}% de la aventura`;
}

async function loadDashboard() {
  const list = document.querySelector("#practice-progress-list");
  if (!state.firebaseReady || !list || !state.user) return;
  document.querySelector("#dashboard-message").textContent = "Cargando avances…";
  try {
    const {
      collection, db, getDocs,
    } = state.firebase;
    const snapshot = await getDocs(collection(db, "usuarios", state.user.uid, "practicas"));
    const records = snapshot.docs.map((item) => item.data()).sort((a, b) =>
      String(a.practica).localeCompare(String(b.practica), "es", { numeric: true }),
    );
    applyDashboardRecords(records);
    document.querySelector("#dashboard-message").textContent = records.length
      ? "Tus logros están sincronizados. Continúa desde la misión que está en progreso."
      : "Tu mapa está listo. Elige una misión para comenzar.";
    list.innerHTML = records.length
      ? `<span class="progress-legend completed">● Completado</span>
         <span class="progress-legend in-progress">● En progreso</span>
         <span class="progress-legend not-started">● No iniciado</span>`
      : "";
  } catch (error) {
    console.error(error);
    document.querySelector("#dashboard-message").textContent = "No fue posible cargar los avances.";
  }
}

function refreshVisualPracticeLinks() {
  const labels = {
    "practica-11.html": "Práctica 11 — Consulta de datos con Flet y Firebase",
    "practica-12.html": "Práctica 12 — Registro de datos con Flet",
    "practica-13.html": "Práctica 13 — Buscador de registros con Flet",
    "practica-14.html": "Práctica 14 — Actualización de registros con Flet",
    "practica-15.html": "Práctica 15 — Eliminación segura con Flet",
    "practica-16.html": "Práctica 16 — Panel administrativo con Flet",
    "practica-17.html": "Práctica 17 — Proyecto integrador CRUD con Flet",
  };

  Object.entries(labels).forEach(([href, label]) => {
    document.querySelectorAll(`a[href="${href}"]`).forEach((anchor) => {
      anchor.textContent = label;
    });
  });

  document.querySelectorAll(".nav-section summary").forEach((summary) => {
    if (summary.textContent.includes("Unidad III")) {
      summary.textContent = "Unidad III · Aplicaciones visuales con Python y Firebase";
    }
  });
}

refreshVisualPracticeLinks();
state.practiceId = getPracticeId();
createAuthBar();
addPhaseNavigation();
addHomeDashboard();
applyDashboardRecords([]);
addInteractivePractice();
makeStaticQuestionsRespondable();
organizePracticeWorkbook();
addFinalSubmissionPanel();
loadLocalDraft();

function handleDraftChange(event) {
  if (!event.target.matches("main .card textarea, main .card input, main .card select")) return;
  event.target.classList.remove("field-error");
  const status = document.querySelector("#cloud-save-status");
  if (status && status.textContent !== "Sin guardar") {
    status.dataset.state = "dirty";
    status.textContent = "Sin guardar";
  }
  updatePracticeState(calculateProgress(), true);
  clearTimeout(saveLocalDraft.timer);
  saveLocalDraft.timer = setTimeout(() => {
    saveLocalDraft();
    if (status?.dataset.state === "dirty") {
      status.dataset.state = "local";
      status.textContent = "Borrador local guardado · usa “Guardar avance” para sincronizar";
    }
  }, 4000);
}

document.addEventListener("input", handleDraftChange);
document.addEventListener("change", handleDraftChange);

async function handleAuthState(user) {
  state.user = user;
  updateAuthUI(user);
  const access = document.querySelector("#cloud-access-message");
  if (access) {
    access.textContent = user
      ? `Avance vinculado a ${user.email}.`
      : "Inicia sesión con Google para guardar y recuperar tu avance.";
  }
  if (user) {
    await Promise.all([loadPracticeProgress(), loadDashboard()]);
  } else {
    applyDashboardRecords([]);
    const status = document.querySelector("#cloud-save-status");
    if (status) status.textContent = "Sin guardar · requiere inicio de sesión";
    const dashboard = document.querySelector("#dashboard-message");
    if (dashboard) dashboard.textContent = "Inicia sesión para consultar tus avances guardados.";
  }
}

async function connectFirebase() {
  const login = document.querySelector("#login-google");
  login.disabled = true;
  login.textContent = "Conectando…";
  try {
    state.firebase = await import("./firebase-config.js");
    state.firebaseReady = true;
    login.disabled = false;
    login.textContent = "Iniciar sesión con Google";
    state.firebase.onAuthStateChanged(state.firebase.auth, handleAuthState);
  } catch (error) {
    console.error("No fue posible cargar Firebase:", error);
    login.textContent = "Inicio de sesión no disponible";
    const access = document.querySelector("#cloud-access-message");
    if (access) {
      access.textContent = "Puedes trabajar sin conexión; el guardado en la nube no está disponible.";
    }
  }
}

connectFirebase();
