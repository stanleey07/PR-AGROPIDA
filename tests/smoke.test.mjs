import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
const css=await readFile(new URL('../src/styles.css',import.meta.url),'utf8');
const js=await readFile(new URL('../src/app.js',import.meta.url),'utf8');
test('estructura y recursos enlazados',()=>{
 assert.match(html,/<html lang="es">/);
 assert.match(html,/href="src\/styles\.css"/);
 assert.match(html,/src="src\/app\.js"/);
});
test('vistas principales presentes',()=>{
 for(const id of ['authScreen','page-dashboard','page-horses','page-registerHorse','page-records','page-care','page-intelligence','page-contact'])
  assert.ok(html.includes('id="'+id+'"'),'Falta '+id);
});
test('formularios presentes',()=>{
 for(const id of ['authForm','horseForm','careForm'])assert.ok(html.includes('id="'+id+'"'));
});
test('almacenamiento local y aviso de demostración',()=>{
 assert.match(js,/localStorage\.setItem/);
 assert.match(js,/indexedDB\.open/);
 assert.match(js,/No es autenticación real/);
});
test('imágenes y CSS disponibles',async()=>{
 for(const path of ['../assets/logo-agropida.png','../assets/caballo-azabache.jpg'])assert.ok((await stat(new URL(path,import.meta.url))).size>1000);
 assert.match(html,/src="assets\/logo-agropida\.png"/);
 assert.match(css,/\.\.\/assets\/caballo-azabache\.jpg/);
});
