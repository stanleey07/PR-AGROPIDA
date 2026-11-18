# Arquitectura de AGROPIDA

La aplicación es un prototipo **estático, cliente único por navegador**. Netlify entrega los archivos HTML, CSS, JS y recursos; el procesamiento sucede en el navegador.

```mermaid
flowchart TD
  H[Netlify / hosting estático] --> B[Navegador]
  B --> UI[HTML + CSS]
  UI --> J[JavaScript de interfaz]
  J --> LS[(localStorage: ejemplares y eventos)]
  J --> IDB[(IndexedDB: fotografías)]
  B --> EXT[Fuentes e imágenes de demostración externas]
```

## Registro de ejemplares

```mermaid
flowchart TD
 A[Ingresar en modo demostración] --> B[Registrar ejemplar]
 B --> C[Validar campos]
 C --> D[Guardar ficha en localStorage]
 D --> E{¿Fotografía cargada?}
 E -- Sí --> F[Guardar foto en IndexedDB]
 E -- No --> G[Mostrar ficha]
 F --> G
```

## Cuidados y seguimiento

```mermaid
flowchart LR
 A[Seleccionar ejemplar] --> B[Registrar evento]
 B --> C[Tipo, fecha, descripción y estado]
 C --> D[Guardar evento local]
 D --> E[Consultar pendientes y completados]
```

**Límites actuales:** no hay API de autenticación, base de datos central, sincronización entre docentes, algoritmos BKT/mochila 0/1 integrados en este HTML, ni diagnóstico veterinario automático.
