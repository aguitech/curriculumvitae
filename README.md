# Curriculum Vitae — Héctor Aguilar

Sitio web estático con mi currículum vitae premium, deployado en GitHub Pages.

- **Stack**: HTML5 + CSS3 vanilla + JS (sin dependencias, carga instantánea)
- **Diseño**: Glassmorphism dark mode con animaciones suaves
- **Deploy**: GitHub Pages desde la rama `main`, root

## Local

Abrir `index.html` directamente en cualquier navegador.

## Deploy

Push a `main` y GitHub Pages publica automáticamente en:

- `https://aguitech.github.io/curriculumvitae/`

O bajo dominio custom (configurar `CNAME` + DNS) en `https://aguitech.com/curriculumvitae/`.

## Estructura

```
.
├── index.html       # Página principal (semántica, OG, accesibilidad)
├── styles.css       # Tokens, glassmorphism, animaciones, responsive
├── script.js        # Theme toggle, scroll reveal, counters
├── .nojekyll        # Evita procesamiento Jekyll en Pages
└── README.md
```

## Personalización

- **Colores**: editar los custom properties en `:root` de `styles.css`
- **Contenido**: editar `index.html` (estructura semántica)
- **Contacto**: cambiar email en `index.html` línea del CTA
