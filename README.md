# Aula Abierta Web

**Autor:** Freddy Potes · Universidad Politécnica Salesiana  
**Asignatura:** Aplicaciones Web · Unidad 1

Sitio de una propuesta académica de talleres de desarrollo web. Es una demostración educativa: no representa una convocatoria institucional y el formulario no envía ni almacena datos.

## Ejecutar

Abre `index.html` en un navegador. Todos los recursos están incluidos y las interacciones funcionan sin conexión; solo los enlaces a las guías externas requieren internet.

También puedes servir la carpeta del proyecto con `python -m http.server 8000` y abrir `http://localhost:8000`.

## Estructura

- `index.html`: seis secciones, HTML5 semántico, encabezados, navegación y formulario.
- `styles.css`: variables, enfoque mobile first, Flexbox, Grid y media queries.
- `app.js`: menú, filtro de talleres y validación accesible.
- `aula.svg`: ilustración original de escritorio y móvil, con texto alternativo en HTML.

## Decisiones

La base tiene una columna. A partir de 48rem (768px con fuente base de 16px), los talleres pasan a dos columnas y el método y formulario se distribuyen en dos. A partir de 64rem (1024px), los talleres pasan a tres columnas y la navegación completa reemplaza el menú plegable. Estos cambios evitan comprimir tarjetas y enlaces. La imagen conserva su proporción con `max-width:100%` y `height:auto`.

Se usan enlaces y botones nativos. El menú expone `aria-expanded`, se cierra con Escape y devuelve el foco al botón. El filtro informa resultados con `role=status` y marca el botón seleccionado con `aria-pressed`. El formulario asocia cada etiqueta, ayuda y error con su campo; marca `aria-invalid`, enfoca el primer error y comunica el resultado en una región viva. No tiene servidor de registro.

## Comprobaciones reproducibles

1. Abrir a 390×844, 768×1024 y 1440×900; verificar una, dos y tres columnas de talleres.
2. Probar también 320, 767, 1023 y 1024px; comprobar que no aparece desplazamiento horizontal.
3. Pulsar Tab desde el inicio: aparece el enlace «Saltar al contenido». Enter lleva a `main`. Recorrer controles con Tab y Mayús+Tab, activar botones con Enter/Espacio y cerrar el menú con Escape.
4. Elegir «Diseño»: queda un taller. Elegir «Todos»: vuelven tres. El enlace de cada tarjeta selecciona ese taller en el formulario.
5. Enviar vacío: aparecen tres errores y el foco pasa a Nombre. Probar nombre de un carácter y correo inválido. Corregir con datos de prueba: aparece confirmación y no se realiza ninguna petición de registro.
6. Ampliar texto al 200% y revisar legibilidad, ajuste de controles y ausencia de solapamientos. Revisar el reflujo a 720px, equivalente a reducir a la mitad el ancho lógico de un escritorio de 1440px.
7. Comprobar las relaciones de contraste usando los colores de `:root`; el texto normal requiere al menos 4.5:1 y el foco, al menos 3:1 frente a sus fondos adyacentes.

Las evidencias de la entrega documentan los resultados observados. Estas pruebas no constituyen una certificación WCAG completa. Queda pendiente una revisión con lector de pantalla, otros motores de navegador y usuarios reales.

## Fuentes técnicas

- MDN. Responsive web design. https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design
- W3C WAI. Validating input. https://www.w3.org/WAI/tutorials/forms/validation/
- W3C WAI. Understanding SC 1.4.3 Contrast Minimum. https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

## Bibliografía de la asignatura

Frain, B. (2022). *Responsive web design with HTML5 and CSS* (4.ª ed.). Packt.

DuRocher, D. (2021). *HTML and CSS quickstart guide*. ClydeBank Media.

Robbins, J. N. (2018). *Learning web design* (5.ª ed.). O’Reilly Media.


Repositorio: https://github.com/efrain-svg/Potes_Freddy_AplWeb_U1
