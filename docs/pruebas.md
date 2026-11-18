# Pruebas — AGROPIDA v1.0.0

## Pruebas automatizadas

Ejecutar: `npm test`

| Caso | Verificación |
| --- | --- |
| HTML | Idioma español y enlaces CSS/JS |
| Vistas | Panel, ejemplares, cuidados y contacto |
| Formularios | Acceso, ejemplar, cuidados |
| Almacenamiento | localStorage e IndexedDB presentes |
| Recursos | Logo y fondo localizados en assets/ |

**Resultado en la preparación del proyecto (18/11/2026): 5 de 5 pruebas básicas aprobadas**, junto con `node --check` de los scripts principales. Son pruebas de estructura y **no** pruebas integrales de navegación ni seguridad.

## Casos manuales pendientes

| Acción | Resultado esperado | Estado |
| --- | --- | --- |
| Iniciar sesión de demostración | Acceso al panel | Pendiente |
| Registrar ejemplar | Ficha visible | Pendiente |
| Cargar fotografía | Foto visible en tarjeta | Pendiente |
| Registrar cuidado | Evento agregado | Pendiente |
| Completar evento | Estado actualizado | Pendiente |
| Recargar navegador | Persistencia local | Pendiente |
| Acceso desde incógnito | Página abierta públicamente en Netlify | Pendiente |
| Tamaño móvil | Navegación utilizable | Pendiente |

No hay autenticación de servidor ni sincronización entre usuarios. El asistente de consulta proporciona textos de demostración, no un modelo IA conectado.
