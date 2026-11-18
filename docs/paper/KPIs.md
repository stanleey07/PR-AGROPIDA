# Matriz de indicadores AGROPIDA — v1.0

**Responsable del paper:** Alan Stanley Villalobos Bernal  
**Fecha:** 18 de noviembre de 2026  
**Estado general:** las **metas son propuestas**; aún no existen mediciones de campo que permitan declararlas alcanzadas.

## Cinco KPIs de negocio

| ID | Indicador | Fórmula / instrumento | Unidad | Meta | Medición |
|---|---|---|---|---|---|
| B1 | Cobertura de digitalización | Fichas digitales / ejemplares del inventario piloto × 100 | % | ≥ 90 % | Pendiente |
| B2 | Completitud de fichas | Fichas con campos esenciales completos / fichas revisadas × 100 | % | ≥ 95 % | Pendiente |
| B3 | Trazabilidad del cuidado | Eventos documentados en AGROPIDA / eventos de bitácora de referencia × 100 | % | ≥ 90 % | Pendiente |
| B4 | Ahorro de tiempo administrativo | (Mediana tiempo manual − mediana tiempo web) / mediana tiempo manual × 100 | % | ≥ 25 % | Pendiente |
| B5 | Usabilidad percibida | Cuestionario System Usability Scale (SUS), 10 ítems | Puntos (0–100) | ≥ 75 | Pendiente |

## Cinco KPIs tecnológicos

| ID | Indicador | Fórmula / instrumento | Unidad | Meta | Medición |
|---|---|---|---|---|---|
| T1 | Largest Contentful Paint, p75 | Percentil 75 del LCP en navegadores de prueba | s | ≤ 2,5 s | Pendiente |
| T2 | Interaction to Next Paint, p75 | Percentil 75 del INP | ms | ≤ 200 ms | Pendiente |
| T3 | Cumulative Layout Shift, p75 | Percentil 75 del CLS | Sin unidad | ≤ 0,10 | Pendiente |
| T4 | Éxito de tareas críticas | Tareas completas exitosas / intentos × 100 | % | ≥ 95 % | Pendiente |
| T5 | Persistencia local correcta | Restauraciones completas tras recarga / escenarios guardados × 100 | % | ≥ 99 % | Pendiente |

### Procedencia de las metas
- **B1–B4, T4 y T5:** objetivos internos propuestos para el piloto; no son datos oficiales.
- **B5:** meta de proyecto orientada a buena usabilidad; el SUS está fundamentado en Brooke (1996).
- **T1–T3:** umbrales de experiencia web recomendados en [Web Vitals](https://web.dev/articles/vitals).
- El diseño de evaluación y los criterios de aceptación se detallan en [paper IEEE](AGROPIDA_Paper_IEEE.tex) y [plan de pruebas](../pruebas.md).

### Resultados disponibles y limitación
Se ejecutaron **5 pruebas estructurales**, con **5 aprobadas** (100 % de esa batería). Esto **no** demuestra que B1–B5 o T1–T5 se hayan cumplido, ni mide usabilidad, beneficios clínicos o funcionamiento multiusuario. La aplicación actual utiliza almacenamiento por navegador.
