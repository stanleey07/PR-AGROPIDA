# Paper científico — AGROPIDA

El manuscrito en formato **IEEE de doble columna** corresponde al proyecto AGROPIDA de **Alan Stanley Villalobos Bernal**.

- [Fuente LaTeX del paper](AGROPIDA_Paper_IEEE.tex)
- [Matriz auditada de 5 KPIs de negocio y 5 KPIs tecnológicos](KPIs.md)
- [Captura real usada en el paper](../capturas/inicio.png)
- [Código fuente de AGROPIDA](../../src/app.js)

## Cómo compilar el PDF

Se requiere una distribución TeX con **IEEEtran**, TikZ, pgfplots y pdfLaTeX.

```bash
cd docs/paper
pdflatex AGROPIDA_Paper_IEEE.tex
pdflatex AGROPIDA_Paper_IEEE.tex
```

La captura de pantalla se lee desde `../capturas/inicio.png`, disponible en el repositorio.

**Nota:** el PDF final está disponible en la entrega del autor; este repositorio incluye su fuente reproducible. Las metas KPI se distinguen expresamente de los resultados, y BKT/mochila 0/1 figuran como propuestas, no como implementación concluida.
