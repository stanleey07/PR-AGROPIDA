# AGROPIDA — Excelencia Equina 🐎

**Prototipo de plataforma web para registrar ejemplares, centralizar información y organizar cuidados del caballo de Paso Fino Colombiano.**

![Vista ilustrativa del inicio de AGROPIDA](docs/capturas/vista-inicio.svg)
*Vista ilustrativa recreada con el fondo y textos originales. La captura real del navegador se agrega en `docs/capturas/` cuando esté disponible.*

## 🌐 Demostración
**[Abrir AGROPIDA en Netlify](https://agropida.netlify.app/)**

> Verificar su acceso en una ventana de incógnito antes de entregar el enlace.

## 🎯 Problema y solución
En los criaderos ecuestres, la información sobre identificación, seguimiento y cuidados puede quedar dispersa en archivos y anotaciones. AGROPIDA propone una interfaz que reúne los registros del ejemplar y sus eventos de cuidado para facilitar su organización y consulta. **Es una versión académica de demostración**, no un sistema clínico certificado.

## ✨ Funcionalidades
- Inicio de sesión y creación de cuenta **simulados**, sin servidor de autenticación.
- Panel de control e indicadores de ejemplares y actividades.
- Alta y consulta de fichas de caballos (datos de identificación, responsable y observaciones).
- Fotografías guardadas en **IndexedDB**, con opción de enlace externo.
- Registro de eventos de cuidado: salud, alimentación, entrenamiento y bienestar.
- Consulta de actividades pendientes y cambio de estado a completado.
- Sección de contacto y una consulta de orientación **con respuestas predeterminadas** (no IA conectada).
- Interfaz responsive con identidad verde oscuro y dorado.

## 🛠️ Tecnologías
| Tecnología | Función |
| --- | --- |
| HTML5 | Vistas y formularios |
| CSS3 | Diseño responsive de AGROPIDA |
| JavaScript vanilla | Interactividad y validación |
| localStorage | Fichas y eventos, localmente |
| IndexedDB | Fotografías locales |
| Google Fonts | Tipografías externas |
| Node.js 18+ | Servidor opcional y pruebas |
| Netlify | Despliegue estático de demostración |

La interfaz no necesita dependencias externas de npm; `package.json` ofrece los comandos de ejecución y prueba.

## ▶️ Cómo instalar y ejecutar
**Opción A:**

1. Descarga el código de este repositorio y descomprímelo.
2. Abre `index.html` en el navegador.
3. Usa datos **ficticios** para iniciar sesión y explorar los módulos.

**Opción B (recomendada para desarrollo):**

Requiere **Node.js 18 o superior**.

```bash
npm start
```

Abre **http://localhost:3000**. No hace falta ejecutar `npm install`, pues no hay paquetes externos.

**Opción C:** ejecuta `python -m http.server 8000` y entra a **http://localhost:8000**.

## ✅ Pruebas y resultados
```bash
npm test
```

En la preparación del proyecto se aprobaron **5/5 verificaciones básicas** de estructura y recursos. No son pruebas de seguridad, ni de navegación automatizada. Consulta [plan de pruebas](docs/pruebas.md).

## 📂 Estructura
```text
PR-AGROPIDA/
├── index.html
├── src/
│   ├── app.js
│   └── styles.css
├── assets/
│   ├── logo-agropida.png
│   └── caballo-azabache.jpg
├── docs/
│   ├── arquitectura.md
│   ├── guia-uso.md
│   ├── pruebas.md
│   ├── RELEASE_NOTES.md
│   └── capturas/
│       ├── vista-inicio.svg
│       └── README.md
├── scripts/server.mjs
├── tests/smoke.test.mjs
├── .github/workflows/tests.yml
├── .gitignore
├── package.json
├── LICENSE
└── README.md
```

## 🏛️ Arquitectura
Proyecto **estático y sin backend**. La interfaz se ejecuta en el navegador; los datos se almacenan en `localStorage` y las imágenes en `IndexedDB`. Ver [diagramas Mermaid](docs/arquitectura.md) y [guía de uso](docs/guia-uso.md).

## 🔒 Seguridad y alcance
- El acceso es demostrativo; no valida usuarios reales ni almacena cuentas en servidor.
- **Cada navegador conserva sus propios datos**, sin sincronización entre profesores.
- No introducir datos personales, contraseñas reales ni historiales clínicos privados.
- La sección de consulta no está conectada a un modelo de inteligencia artificial.
- AGROPIDA no sustituye la atención veterinaria, ni asegura resultados de salud.
- BKT y mochila 0/1 no forman parte de este HTML y no se presentan como implementados.

## 🚀 Publicación
Para desplegar en Netlify, usa la **raíz del repositorio** como carpeta de publicación, sin comando de compilación: contiene `index.html`.

## 👥 Autores
**Equipo AGROPIDA — Bogotá D. C., Colombia.**  
**Pendiente de completar:** ALAN STANLEY VILLALOBOS BERNAL ~ DDYA ~ECI.

## 📄 Licencia
Código bajo la [Licencia MIT](LICENSE). Las fuentes y fotografías de terceros, si se usan, conservan sus condiciones de licencia.

## 📦 Versión
**v1.0.0 (entrega académica)**. Ver [notas de versión](docs/RELEASE_NOTES.md). Crear un GitHub Release y adjuntar un video de demostración es opcional.

**AGROPIDA — Más que gestionar caballos, es impulsar la excelencia equina.**
