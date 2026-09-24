# 🌿 Sendero Pampa — Reserva Natural y Vivero

Sitio web institucional de la **Reserva Natural Sendero Pampa** (UNICEN), que centraliza información sobre la reserva, el vivero de especies nativas, novedades y actividades de voluntariado/educación ambiental.

🔗 Producción: desplegado en Firebase Hosting (proyecto `sendero-pampa`).

---

## 📚 Índice

- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos previos](#-requisitos-previos)
- [Puesta en marcha](#-puesta-en-marcha)
- [Scripts disponibles](#-scripts-disponibles)
- [Configuración de Firebase](#-configuración-de-firebase)
- [Rutas de la aplicación](#-rutas-de-la-aplicación)
- [Convenciones de código](#-convenciones-de-código)
- [Despliegue](#-despliegue)
- [Estado del proyecto](#-estado-del-proyecto--pendientes)
- [Documentación técnica (ADRs)](#-documentación-técnica-adrs)

---

## 🛠 Stack tecnológico

| Categoría         | Tecnología                                      |
|--------------------|--------------------------------------------------|
| Framework UI       | [React 19](https://react.dev/)                  |
| Build tool         | [Vite 7](https://vite.dev/)                      |
| Estilos            | [Tailwind CSS v4](https://tailwindcss.com/) (config vía `@theme` en CSS, sin `tailwind.config.js`) |
| Ruteo              | [React Router DOM v7](https://reactrouter.com/) |
| Backend / datos    | [Firebase](https://firebase.google.com/) (Firestore + Analytics) |
| Mapas              | [Leaflet](https://leafletjs.com/) / react-leaflet |
| Íconos             | [lucide-react](https://lucide.dev/)             |
| Lint               | ESLint (config `standard` + reglas de React Hooks/Refresh) |
| Hosting / CI-CD    | Firebase Hosting + GitHub Actions               |

---

## 📁 Estructura del proyecto

```
Web-Vivero/
├── src/
│   ├── Pages/              # Vistas de nivel ruta (una por página)
│   │   ├── FrontPage.jsx   # Home
│   │   ├── Reserva.jsx     # Info de la reserva natural
│   │   ├── Vivero.jsx      # Catálogo del vivero (placeholder)
│   │   ├── Novedades.jsx   # Noticias, conectado a Firestore
│   │   └── Contacto.jsx    # Formulario de contacto (placeholder)
│   ├── Components/         # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── QuickInfo.jsx
│   │   ├── Novedad.jsx     # Card individual de novedad
│   │   └── Map.jsx         # Mapa con Leaflet (en desarrollo)
│   ├── assets/              # Imágenes e íconos estáticos
│   ├── firebaseConfig.js   # Inicialización de Firebase (app, db, analytics)
│   ├── App.jsx              # Definición de rutas
│   ├── main.jsx             # Entry point de React
│   └── index.css            # Estilos globales + theme de Tailwind (paletas de color)
├── public/                  # Archivos estáticos servidos tal cual
├── Extra/                   # Recursos de trabajo (textos, logo fuente, código descartado) — no forma parte del build
├── .github/workflows/       # CI/CD: deploy automático a Firebase Hosting
├── firebase.json / .firebaserc
├── vite.config.js
├── eslint.config.js
└── package.json
```

**Convención de carpetas:** `Pages/` contiene componentes que se mapean 1:1 a una ruta de `App.jsx`; `Components/` contiene piezas reutilizables sin ruta propia.

---

## ✅ Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior (recomendado 20+)
- npm (incluido con Node)
- Acceso al proyecto de Firebase `sendero-pampa` (para funcionalidades que dependen de Firestore, como Novedades)

---

## 🚀 Puesta en marcha

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd Web-Vivero

# Instalar dependencias
npm install

# Levantar entorno de desarrollo
npm run dev
```

El proyecto quedará disponible en `http://localhost:5173` (puerto por defecto de Vite).

---

## 📜 Scripts disponibles

| Comando           | Descripción                                      |
|--------------------|---------------------------------------------------|
| `npm run dev`      | Levanta el servidor de desarrollo con hot reload  |
| `npm run build`    | Genera el build de producción en `dist/`          |
| `npm run preview`  | Sirve localmente el build de producción           |
| `npm run lint`     | Corre ESLint sobre todo el proyecto               |

---

## 🔥 Configuración de Firebase

El archivo `src/firebaseConfig.js` inicializa la app de Firebase (Firestore + Analytics) y se conecta al proyecto `sendero-pampa`.


~~Actualmente la configuración está **hardcodeada directamente en el código fuente**. Es una práctica común ver esto en proyectos con Firebase (las claves del SDK cliente no son secretas por diseño, la seguridad real la dan las [reglas de Firestore](https://firebase.google.com/docs/firestore/security/get-started)), pero para facilitar mantenimiento y evitar reconfigurar código si cambia el proyecto, se recomienda migrar a variables de entorno:~~

Actualmente existen dos projectos de firebase, configurados a traves de variables de entorno .env.development y .env.production 

Se puede alternar entre entornos y bases de datos mediante el uso de:

bash:
firebase use production/development 

```bash
# .env (no versionar)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
# etc.
```

> 📌 Esto está anotado como pendiente en la sección [Estado del proyecto](#-estado-del-proyecto--pendientes).

**Colecciones de Firestore en uso:**
- `novedades` — noticias/actividades mostradas en la página Novedades (`title`, `description`, `imageUrl`, `date`, `link`)

---

## 🗺 Rutas de la aplicación

| Ruta          | Página      | Estado                          |
|----------------|-------------|----------------------------------|
| `/`, `/inicio` | FrontPage   | ✅ Implementada                  |
| `/reserva`     | Reserva     | 🚧 En desarrollo                 |
| `/vivero`      | Vivero      | 🚧 Placeholder                   |
| `/novedades`   | Novedades   | ✅ Implementada (conectada a Firestore) |
| `/contacto`    | Contacto    | 🚧 Placeholder                   |

> El `Navbar` ya referencia subrutas (`/reserva/actividades`, `/reserva/servicios`, `/reserva/ubicacion`) que todavía no están definidas en `App.jsx`.

---

## 🎨 Convenciones de código

- **Lint:** el proyecto usa ESLint con la configuración `standard` como base, más las reglas recomendadas de `eslint-plugin-react-hooks` y `eslint-plugin-react-refresh`. Correr `npm run lint` antes de subir cambios.
- **Componentes:** un componente por archivo, nombre de archivo en PascalCase, export default al final.
- **Estilos:** Tailwind utility-first. La paleta de colores del proyecto (`olive`, `olivine`, `asparagus`, etc.) está centralizada en `src/index.css` dentro del bloque `@theme` — no se usan colores sueltos fuera de esa paleta para mantener consistencia visual.
- **Assets:** las imágenes de contenido van en `src/assets/`, organizadas por sección cuando aplica (p. ej. `Images/`, `Logos Reserva-vivero/`).

---

## 🌐 Despliegue

El despliegue es automático vía **GitHub Actions + Firebase Hosting**:

- **Push a `production`** → build + deploy directo a producción (`.github/workflows/firebase-hosting-merge.yml`)
- **Pull Request** → build + deploy a un canal de preview, para revisar cambios antes de mergear (`.github/workflows/firebase-hosting-pull-request.yml`)

Despliegue manual (si hace falta):

```bash
npm run build
firebase deploy
```

---

## 📌 Estado del proyecto / Pendientes

Relevado del código y de `Tareas.md`. Actualizar esta sección a medida que se resuelvan:

- ~~[ ] Migrar configuración de Firebase a variables de entorno (`.env`)~~
- [ ] Dockerizar
- [ ] Definir las imagenes que seran servidas directamente al usuario y aquellas que se alojaran en Cloudinary.
- [ ] Migracion a Cloudinary
- [ ] Agregar autenticación
- [ ] crear panel de admin
- [ ] Completar contenido de las páginas placeholder: `Vivero`, `Contacto`
- [ ] Definir subrutas de `Reserva` (`/reserva/actividades`, `/servicios`, `/ubicacion`) que ya están linkeadas en el Navbar
- [ ] Terminar/corregir el componente `Map.jsx` (Leaflet) — actualmente no se usa en ninguna página
- [ ] Remover funcionalidad de prueba en `Novedades.jsx` (botón "Agregar novedad de prueba") antes de producción final
- [ ] Unificar el lockfile (hay un `package-lock-MSI.json`; se recomienda usar `package-lock.json` estándar)
- [ ] Revisar que todas las imágenes referenciadas en el código (`Vivero-reciente.jpeg`, `cartel-vivero.jpg`, etc.) estén efectivamente versionadas en `src/assets/`

---

## 🗂 Documentación técnica (ADRs)

Las decisiones de arquitectura relevantes (por qué Firebase y no otro backend, por qué Tailwind v4, estructura de carpetas, etc.) se documentan como **Architecture Decision Records** en `docs/adr/`. Ver ese directorio para el detalle y el contexto de cada decisión.
