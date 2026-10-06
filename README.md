# Generador de Brochures

Herramienta web para armar brochures profesionales de una página. Se completan los datos en un panel lateral, se ve el resultado al instante y se guarda como PDF o se imprime en A4.

Sitio publicado: https://generador-brochures.netlify.app

## Funcionalidades

- **Perfiles predeterminados** para empezar rápido: psicología clínica, psicología organizacional, OEC y calidad, e ingeniería de software.
- Panel con 5 pestañas:
  1. **Perfil**: nombre, título profesional, registro profesional, frase principal, presentación y foto (por URL o subida desde el equipo).
  2. **Servicios**: enfoque, a quién está dirigido y hasta 4 servicios principales.
  3. **Clientes**: nombres de empresas y hasta 8 logos (subidos desde el equipo o por URL).
  4. **Contacto**: datos de contacto y modalidad de atención.
  5. **Estilo**: plantilla visual y color de acento.
- **Vista previa** en tiempo real, escalada a la pantalla.
- **Guardado automático** en el navegador: al volver a abrir la página, sigue el trabajo donde quedó.
- Botón **Guardar como PDF / Imprimir** con formato A4.

## Cómo se usa

1. Abrí la página y elegí un perfil predeterminado, o completá los datos desde cero.
2. Recorré las pestañas y ajustá textos, foto, servicios, clientes y estilo.
3. Revisá la vista previa.
4. Tocá **Guardar como PDF / Imprimir** y en el diálogo de impresión elegí "Guardar como PDF" o tu impresora.

## Ejecutar localmente

No necesita instalación ni build. Abrí `index.html` en el navegador o serví la carpeta con cualquier servidor estático (por ejemplo `npx serve`).

## Estructura

```
index.html        Panel de edición y vista previa
css/styles.css    Estilos del panel y de las plantillas del brochure
js/main.js        Pestañas, perfiles, render de la vista previa, logos y guardado
PRODUCT.md        Notas de producto
```
