# Generador Profesional de Brochures (SPA Vanilla)

## 1. Descripción General del Proyecto
Aplicación web de una sola página (**Single Page Application**) desarrollada con **HTML5, CSS3 y JavaScript vanilla** (sin frameworks ni dependencias externas de compilación). Su propósito es permitir a profesionales (psicólogos, consultores, ingenieros) generar, previsualizar en tiempo real y exportar a PDF/A4 brochures ejecutivos y comerciales altamente personalizados.

## 2. Arquitectura y Estructura de Archivos
El proyecto sigue estrictamente el principio de separación de responsabilidades:

```text
generador-brochures/
├── index.html        # Estructura HTML, interfaz del panel lateral y contenedor de vista previa
├── css/
│   └── styles.css    # Estilos globales, sistema de pestañas y las 6 plantillas visuales (t1-t6)
└── js/
    └── main.js       # Lógica de estado, presets de perfiles, renderizado dinámico y manejo de archivos
3. Stack Tecnológico y Reglas del Entorno
Frontend: Vanilla JavaScript (ES6+), HTML5 semántico.

Estilos: CSS Grid, Flexbox, Custom Properties (Variables CSS) para control dinámico de colores (--acc), y tipografías externas de Google Fonts (Figtree, Libre Franklin, Newsreader).

Diseño e Impresión: Estructurado en formato físico exacto A4 (210mm x 297mm) con reglas estrictas @media print para exportación limpia sin elementos de interfaz.

Escalabilidad Visual: Utiliza clamp() y transformaciones de escala en JS (scale()) para adaptar la vista previa de forma fluida a cualquier tamaño de pantalla.

4. Arquitectura Lógica y Flujo de Datos (js/main.js)
A. Estado Global y Lectura (leerDatos())
Toda la información del formulario se centraliza leyendo los inputs del DOM en tiempo real mediante un objeto de estado unificado que maneja:

Datos personales y profesionales (nombre, titulo, bio, etc.).

Listas dinámicas: Servicios estructurados (sv hasta 4 ítems) y clientes/aliados convertidos a arrays (clientesArr).

Opciones de visualización y datos fiscales (conf, fiscal, razon, rut).

B. Sistema de Plantillas (Plantillas object)
El renderizado es dinámico y modular. Dependiendo de la clase asignada al contenedor #hoja (t1 hasta t6), se ejecuta una función de mapeo que inyecta los datos procesados por prepararRender(d):

t1: Clínica (Lateral con foto y tono cálido).

t2: Organizacional (Portada ejecutiva y área de etiquetas de clientes).

t3: Minimal (Filas limpias y diseño aireado).

t4: Ejecutivo Corporativo (Azul marino y oro - Estilo SM Consultores).

t5: Corporativo Moderno (Gris Pizarra y estructura Tech).

t6: Bienestar Institucional (Verde Bosque y tonos neutros).

C. Sistema de Presets (PRE object)
Diccionario interno que almacena configuraciones predeterminadas para autocompletar perfiles con un solo clic:

clinica: Psicología Clínica (Pacientes).

org: Psicología Laboral / Organizacional.

oec: Consultoría OEC y Calidad.

dev: Ingeniería de Software & Tech.

5. Guía para la IA / Asistente al Modificar el Código
Si agregas un nuevo campo de entrada en index.html:

Añade su respectivo selector en el array global F dentro de js/main.js.

Inclúyelo en la función prepararRender() si debe reflejarse en las plantillas visuales.

Si creas una nueva plantilla visual (t7):

Define sus selectores de diseño y variables CSS correspondientes en css/styles.css.

Añade la función generadora de HTML en el objeto Plantillas dentro de js/main.js.

Regístrala en el elemento <select id="f-plantilla"> de index.html.

Manejo de Imágenes:

Soporta tanto enlaces directos (ej. Cloudinary a través de f-fotourl) como conversión a Base64 local mediante el evento FileReader en f-foto-file.