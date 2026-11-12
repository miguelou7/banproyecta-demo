# Banproyecta — sitio web

Sitio estático en HTML, CSS y JavaScript puro, sin dependencias ni paso de compilación.

## Archivos
- `index.html` — estructura y contenido de la página
- `styles.css` — estilos (los colores de marca están al inicio, en `:root`)
- `app.js` — interacciones: simulador, productos, sucursales, requisitos, FAQ y animaciones

## Cómo verlo
Abre `index.html` en el navegador. Para publicarlo, sube los tres archivos a cualquier hosting estático (Netlify, Vercel, S3, cPanel, etc.) o pégalos en el servidor del sitio actual.

## Antes de publicar
1. **Colores de marca:** edita `--brand` y `--accent` en `styles.css`. Si cambias `--accent`, actualiza también el color del favicon en `index.html`.
2. **Logo:** reemplaza el isotipo provisorio del header y del footer (bloques `.logo`) por el logo oficial.
3. **Tasa del simulador:** cambia `TASA_MENSUAL` en `app.js`. El valor actual (1,4 %) es solo referencial.
4. **Indicadores UF / Dólar / UTM:** hoy son estáticos (11-11-2026). Conviene conectarlos a una fuente diaria, por ejemplo mindicador.cl.
5. **Contenido:** los textos de productos, sucursales, requisitos y preguntas frecuentes están como datos al inicio de `app.js`.

Las tipografías (Geist y Geist Mono) se cargan desde Google Fonts.
