"use strict";

/*
  AGROPIDA — Prototipo visual de una sola página.

  IMPORTANTE:
  - La autenticación de esta versión es solo una demostración.
  - Los registros se guardan en localStorage del navegador.
  - No se usa una base de datos ni un servidor.
  - La IA es una respuesta demostrativa; no conecta con LM Studio.
  - No guardes contraseñas reales en este prototipo.
*/

const STORAGE_KEY = "agropida_demo_v1";

let authMode = "login";
let toastTimer = null;

const today = new Date().toISOString().slice(0, 10);

const defaultData = {
  horses: [
    {
      id: "PF-001",
      name: "Lucero de la Sabana",
      age: 6,
      sex: "Macho",
      color: "Castaño",
      owner: "Finca La Esperanza",
      photo: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1000&q=85",
      notes: "Ejemplar de demostración para la interfaz."
    },
    {
      id: "PF-002",
      name: "Dama del Robledal",
      age: 4,
      sex: "Hembra",
      color: "Alazán",
      owner: "Criadero El Robledal",
      photo: "https://images.unsplash.com/photo-1534307670685-6e7e8c5d1f45?auto=format&fit=crop&w=1000&q=85",
      notes: "Ejemplar de demostración para la interfaz."
    },
    {
      id: "PF-003",
      name: "Príncipe Andino",
      age: 8,
      sex: "Macho",
      color: "Zaino",
      owner: "Finca Los Arrayanes",
      photo: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=85",
      notes: "Ejemplar de demostración para la interfaz."
    }
  ],
  records: [
    {
      id: makeId(),
      horseId: "PF-001",
      type: "Salud",
      date: today,
      status: "Completado",
      description: "Revisión general de demostración."
    },
    {
      id: makeId(),
      horseId: "PF-002",
      type: "Alimentación",
      date: today,
      status: "Completado",
      description: "Registro de rutina alimentaria de demostración."
    },
    {
      id: makeId(),
      horseId: "PF-003",
      type: "Entrenamiento",
      date: today,
      status: "Pendiente",
      description: "Seguimiento de sesión de entrenamiento."
    },
    {
      id: makeId(),
      horseId: "PF-001",
      type: "Bienestar",
      date: today,
      status: "Pendiente",
      description: "Observación de rutina pendiente."
    }
  ]
};

function makeId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return "id-" + Date.now() + "-" + Math.random().toString(16).slice(2);
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredCloneFallback(defaultData);

    const parsed = JSON.parse(saved);

    if (!parsed || !Array.isArray(parsed.horses) || !Array.isArray(parsed.records)) {
      return structuredCloneFallback(defaultData);
    }

    return parsed;
  } catch (error) {
    return structuredCloneFallback(defaultData);
  }
}

function structuredCloneFallback(value) {
  return JSON.parse(JSON.stringify(value));
}

let data = loadData();

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    showToast("No se pudieron guardar los cambios en este navegador.");
    return false;
  }
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function formatDate(value) {
  if (!value) return "Sin fecha";
  const date = new Date(value + "T12:00:00");
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 4200);
}

function setAuthMode(mode) {
  authMode = mode;

  const isRegister = mode === "register";

  document.getElementById("loginTab").classList.toggle("active", !isRegister);
  document.getElementById("registerTab").classList.toggle("active", isRegister);

  document.getElementById("authTitle").innerHTML = isRegister
    ? "Tu historia<br>comienza aquí."
    : "Bienvenido<br>de nuevo.";

  document.getElementById("authDescription").textContent = isRegister
    ? "Crea un perfil de demostración para explorar el entorno Agropida."
    : "Accede a tu entorno de gestión y descubre una nueva forma de cuidar cada detalle.";

  document.getElementById("nameField").classList.toggle("hidden", !isRegister);
  document.getElementById("confirmField").classList.toggle("hidden", !isRegister);
  document.getElementById("authMeta").classList.toggle("hidden", isRegister);
  document.getElementById("authSubmit").textContent = isRegister
    ? "CREAR PERFIL DE DEMOSTRACIÓN ↗"
    : "ENTRAR A AGROPIDA ↗";

  document.getElementById("fullName").required = isRegister;
  document.getElementById("confirmPassword").required = isRegister;
  document.getElementById("password").autocomplete = isRegister ? "new-password" : "current-password";

  const message = document.getElementById("authMessage");
  message.classList.add("hidden");
  message.textContent = "";
}

function togglePassword() {
  const input = document.getElementById("password");
  const button = document.querySelector(".password-toggle");
  const visible = input.type === "password";

  input.type = visible ? "text" : "password";
  button.textContent = visible ? "OCULTAR" : "MOSTRAR";
}

function enterApp(displayName) {
  document.getElementById("authScreen").classList.add("hidden");
  document.getElementById("appScreen").classList.remove("hidden");

  if (displayName) {
    showToast("Bienvenido, " + displayName + ". Estás explorando la demostración de Agropida.");
  }

  renderAll();
  navigate("dashboard");
}

function logout() {
  document.getElementById("appScreen").classList.add("hidden");
  document.getElementById("authScreen").classList.remove("hidden");
  document.getElementById("password").value = "";
  document.getElementById("confirmPassword").value = "";
  setAuthMode("login");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("authForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("authMessage");

  if (authMode === "register") {
    const name = document.getElementById("fullName").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name) {
      showAuthMessage("Escribe tu nombre para continuar.");
      return;
    }

    if (password.length < 6) {
      showAuthMessage("Usa al menos 6 caracteres para esta demostración.");
      return;
    }

    if (password !== confirmPassword) {
      showAuthMessage("Las contraseñas no coinciden.");
      return;
    }

    /*
      No se guardan el correo ni la contraseña.
      Este formulario solo demuestra el flujo visual de registro.
    */
    enterApp(name.split(/\s+/)[0]);
    return;
  }

  if (!email || !password) {
    showAuthMessage("Completa los campos para continuar.");
    return;
  }

  /*
    En el prototipo se permite entrar con cualquier correo y contraseña
    no vacíos. No es autenticación real.
  */
  enterApp(email.split("@")[0]);
});

function showAuthMessage(text) {
  const message = document.getElementById("authMessage");
  message.textContent = text;
  message.classList.remove("hidden");
}

function navigate(page) {
  document.querySelectorAll(".page").forEach(element => {
    element.classList.toggle("active", element.id === "page-" + page);
  });

  document.querySelectorAll(".nav-item").forEach(element => {
    element.classList.toggle("active", element.dataset.page === page);
  });

  if (page === "horses") renderHorses();
  if (page === "records") renderRecords();
  if (page === "care") renderCare();
  if (page === "registerHorse") updateHorseSelect();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getHorse(horseId) {
  return data.horses.find(horse => horse.id === horseId);
}

function getHorseName(horseId) {
  const horse = getHorse(horseId);
  return horse ? horse.name : "Ejemplar no disponible";
}

const HORSE_PHOTO_PLACEHOLDER = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="#e9e8dc"/><path d="M0 455 Q220 390 420 455 T900 440 V600 H0Z" fill="#d8dfd0"/><g fill="#536c57"><path d="M245 370 Q290 285 420 300 L520 345 610 330 655 365 620 395 535 390 480 430 390 425 335 395 275 410Z"/><path d="M595 340 Q620 270 665 245 L710 260 700 310 665 360Z"/><path d="M674 250 L690 205 705 252Z"/><path d="M650 252 L642 211 670 245Z"/><path d="M335 395 L320 500 345 500 375 410 M455 410 L465 500 490 500 500 405 M560 385 L575 490 600 490 595 380" stroke="#536c57" stroke-width="25" fill="none" stroke-linecap="round"/></g><text x="450" y="555" font-family="Arial" font-size="25" text-anchor="middle" fill="#536c57">AGROPIDA · SIN FOTOGRAFÍA</text></svg>`
);

function getHorsePhoto(horse) {
  return horse.photoKey ? HORSE_PHOTO_PLACEHOLDER : (horse.photo || HORSE_PHOTO_PLACEHOLDER);
}

// Las fotografías se guardan en IndexedDB, no en localStorage: así se pueden
// añadir varios ejemplares sin agotar el pequeño límite de almacenamiento de texto.
const HORSE_PHOTO_DB = "agropida_photos_v1";
const HORSE_PHOTO_STORE = "photos";
let horsePhotoDBPromise;
function openHorsePhotoDB() {
  if (!('indexedDB' in window)) return Promise.reject(new Error("Este navegador no permite guardar fotografías localmente."));
  if (!horsePhotoDBPromise) horsePhotoDBPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(HORSE_PHOTO_DB, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(HORSE_PHOTO_STORE)) request.result.createObjectStore(HORSE_PHOTO_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("No se pudo abrir el almacenamiento de fotografías."));
  });
  return horsePhotoDBPromise;
}
function storeHorsePhoto(key, blob) {
  return openHorsePhotoDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(HORSE_PHOTO_STORE, "readwrite");
    tx.objectStore(HORSE_PHOTO_STORE).put(blob, key);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(new Error("No se pudo guardar la fotografía en este navegador."));
  }));
}
function readHorsePhoto(key) {
  return openHorsePhotoDB().then(db => new Promise((resolve, reject) => {
    const request = db.transaction(HORSE_PHOTO_STORE, "readonly").objectStore(HORSE_PHOTO_STORE).get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(new Error("No se pudo recuperar una fotografía guardada."));
  }));
}
function deleteHorsePhoto(key) {
  return openHorsePhotoDB().then(db => new Promise(resolve => {
    const tx = db.transaction(HORSE_PHOTO_STORE, "readwrite");
    tx.objectStore(HORSE_PHOTO_STORE).delete(key);
    tx.oncomplete = resolve;
    tx.onerror = resolve;
  }));
}
function hydrateHorsePhotos(root = document) {
  root.querySelectorAll("img[data-photo-key]").forEach(async img => {
    try {
      const blob = await readHorsePhoto(img.dataset.photoKey);
      if (!blob || !img.isConnected) return;
      const objectUrl = URL.createObjectURL(blob);
      img.onload = () => URL.revokeObjectURL(objectUrl);
      img.onerror = () => { URL.revokeObjectURL(objectUrl); img.src = HORSE_PHOTO_PLACEHOLDER; };
      img.src = objectUrl;
    } catch (error) {
      img.src = HORSE_PHOTO_PLACEHOLDER;
    }
  });
}
function prepareHorsePhoto(file) {
  return new Promise((resolve, reject) => {
    if (!file || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) return reject(new Error("Selecciona un archivo de imagen válido."));
    if (file.size > 20 * 1024 * 1024) return reject(new Error("La imagen debe pesar menos de 20 MB."));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("No se pudo leer la fotografía."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("El archivo no se pudo abrir como imagen."));
      img.onload = () => {
        const maxSide = 1600;
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("No se pudo procesar la fotografía.")), "image/jpeg", 0.82);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function renderStats() {
  document.getElementById("statHorses").textContent =
    String(data.horses.length).padStart(2, "0");

  document.getElementById("statRecords").textContent =
    String(data.records.length).padStart(2, "0");

  const pending = data.records.filter(record => record.status === "Pendiente").length;

  document.getElementById("statCare").textContent =
    String(pending).padStart(2, "0");
}

function renderFeaturedHorses() {
  const container = document.getElementById("featuredHorses");
  const horses = data.horses.slice(0, 3);

  if (!horses.length) {
    container.innerHTML = '<div class="empty-state"><strong>Tu colección comienza aquí.</strong>Registra tu primer ejemplar.</div>';
    return;
  }

  container.innerHTML = horses.map(horse => `
    <article class="horse-mini">
      <img ${horse.photoKey ? `data-photo-key="${escapeHTML(horse.photoKey)}" src="${HORSE_PHOTO_PLACEHOLDER}"` : `src="${escapeHTML(getHorsePhoto(horse))}"`} onerror="this.onerror=null;this.src=HORSE_PHOTO_PLACEHOLDER" alt="Fotografía de ${escapeHTML(horse.name)}" loading="lazy">
      <div class="horse-mini-copy">
        <strong>${escapeHTML(horse.name)}</strong>
        <span>${escapeHTML(horse.id)} · ${escapeHTML(horse.color || "Color no registrado")}</span>
      </div>
      <span class="tag">Registrado</span>
    </article>
  `).join("");
  hydrateHorsePhotos(container);
}

function renderRecentEvents() {
  const container = document.getElementById("recentEvents");
  const events = [...data.records]
    .sort((a,b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  if (!events.length) {
    container.innerHTML = '<p class="section-note">Todavía no hay eventos registrados.</p>';
    return;
  }

  const icons = {
    "Salud": "✚",
    "Alimentación": "◇",
    "Entrenamiento": "↗",
    "Bienestar": "♡",
    "Otro": "◷"
  };

  container.innerHTML = events.map(record => `
    <article class="event">
      <div class="event-mark">${icons[record.type] || "◷"}</div>
      <div class="event-copy">
        <strong>${escapeHTML(record.type)} · ${escapeHTML(getHorseName(record.horseId))}</strong>
        <p>${escapeHTML(record.description)}<br>${formatDate(record.date)} · ${escapeHTML(record.status)}</p>
      </div>
    </article>
  `).join("");
}

function renderHorses() {
  const container = document.getElementById("horseGrid");
  const search = (document.getElementById("horseSearch")?.value || "").toLowerCase().trim();

  const horses = data.horses.filter(horse =>
    [horse.name, horse.id, horse.owner, horse.color]
      .some(value => String(value || "").toLowerCase().includes(search))
  );

  if (!horses.length) {
    container.innerHTML = '<div class="empty-state"><strong>No encontramos ejemplares.</strong>Prueba otra búsqueda o registra un nuevo perfil.</div>';
    return;
  }

  container.innerHTML = horses.map(horse => `
    <article class="horse-card">
      <div class="horse-image">
        <img ${horse.photoKey ? `data-photo-key="${escapeHTML(horse.photoKey)}" src="${HORSE_PHOTO_PLACEHOLDER}"` : `src="${escapeHTML(getHorsePhoto(horse))}"`} onerror="this.onerror=null;this.src=HORSE_PHOTO_PLACEHOLDER" alt="Caballo ${escapeHTML(horse.name)}" loading="lazy">
        <span class="tag">Paso Fino · Perfil</span>
      </div>
      <div class="horse-card-body">
        <h3>${escapeHTML(horse.name)}</h3>
        <div class="horse-code">${escapeHTML(horse.id)}</div>

        <div class="horse-details">
          <div><span>Edad</span><strong>${horse.age === "" || horse.age == null ? "No registrada" : escapeHTML(horse.age + " años")}</strong></div>
          <div><span>Sexo</span><strong>${escapeHTML(horse.sex || "No especificado")}</strong></div>
          <div><span>Color</span><strong>${escapeHTML(horse.color || "No registrado")}</strong></div>
          <div><span>Responsable</span><strong>${escapeHTML(horse.owner || "No registrado")}</strong></div>
        </div>

        <div class="card-actions">
          <button class="card-primary" onclick="viewHorse('${escapeHTML(horse.id)}')">Ver ficha ↗</button>
          <button class="card-secondary" onclick="addRecordFor('${escapeHTML(horse.id)}')">Añadir evento</button>
        </div>
      </div>
    </article>
  `).join("");
  hydrateHorsePhotos(container);
}

function viewHorse(horseId) {
  const horse = getHorse(horseId);
  if (!horse) return;
  const records = data.records.filter(record => record.horseId === horseId).sort((a,b) => b.date.localeCompare(a.date));
  const photo = horse.photoKey ? `data-photo-key="${escapeHTML(horse.photoKey)}" src="${HORSE_PHOTO_PLACEHOLDER}"` : `src="${escapeHTML(getHorsePhoto(horse))}"`;
  const fields = [["Registro",horse.id],["Edad",horse.age === 0 ? "0 años" : horse.age ? horse.age + " años" : "No registrada"],["Sexo",horse.sex || "No especificado"],["Pelaje",horse.color || "No registrado"],["Responsable",horse.owner || "No registrado"]];
  document.getElementById("horseDetailContent").innerHTML = `
    <div class="premium-photo"><img ${photo} alt="Fotografía de ${escapeHTML(horse.name)}" onerror="this.onerror=null;this.src=HORSE_PHOTO_PLACEHOLDER"></div>
    <div class="premium-body"><div class="premium-kicker">AGROPIDA · COLECCIÓN EQUINA</div><h2>${escapeHTML(horse.name)}</h2>
    <div class="premium-fields">${fields.map(([label,value])=>`<div class="premium-field"><small>${label}</small><strong>${escapeHTML(value)}</strong></div>`).join("")}</div>
    <div class="premium-history"><h3>Observaciones</h3><p>${escapeHTML(horse.notes || "Sin observaciones registradas.")}</p><h3>Historial del ejemplar</h3>
    ${records.length ? records.map(r=>`<p><strong>${escapeHTML(formatDate(r.date))} · ${escapeHTML(r.type)}</strong> — ${escapeHTML(r.description)} (${escapeHTML(r.status)})</p>`).join("") : "<p>Sin eventos registrados.</p>"}</div>
    <div class="premium-actions"><button type="button" onclick="closeHorseDetail();addRecordFor(decodeURIComponent('${encodeURIComponent(horse.id)}'))">＋ Añadir evento</button><button class="secondary" type="button" onclick="changeHorsePhoto(decodeURIComponent('${encodeURIComponent(horse.id)}'))">Cambiar fotografía</button></div></div>`;
  const modal = document.getElementById("horseDetailModal");
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  hydrateHorsePhotos(document.getElementById("horseDetailContent"));
  modal.querySelector(".premium-close").focus();
}
function closeHorseDetail() {
  document.getElementById("horseDetailModal").classList.add("hidden");
  document.body.style.overflow = "";
}
document.addEventListener("keydown", event => { if (event.key === "Escape") closeHorseDetail(); });
async function changeHorsePhoto(horseId) {
  const horse = getHorse(horseId);
  if (!horse) return;
  const input = document.createElement("input");
  input.type = "file"; input.accept = "image/jpeg,image/png,image/webp";
  input.onchange = async () => {
    const file = input.files?.[0]; if (!file) return;
    try {
      const blob = await prepareHorsePhoto(file);
      const key = makeId();
      await storeHorsePhoto(key, blob);
      const oldKey = horse.photoKey;
      horse.photoKey = key;
      if (!saveData()) { horse.photoKey = oldKey; await deleteHorsePhoto(key); return; }
      if (oldKey) await deleteHorsePhoto(oldKey);
      renderAll(); viewHorse(horseId);
      showToast("Fotografía actualizada correctamente.");
    } catch (error) { showToast(error.message || "No se pudo actualizar la fotografía."); }
  };
  input.click();
}

function addRecordFor(horseId) {
  navigate("care");
  const select = document.getElementById("careHorse");
  select.value = horseId;
  document.getElementById("careDescription").focus();
}

let selectedHorsePhoto = null;

const horsePhotoInput = document.getElementById("horsePhotoFile");
const horsePhotoPreview = document.getElementById("horsePhotoPreview");

horsePhotoInput.addEventListener("change", async function() {
  const file = this.files && this.files[0];
  if (!file) { selectedHorsePhoto = null; horsePhotoPreview.innerHTML = "<span>La fotografía que elijas aparecerá aquí</span>"; return; }
  try {
    selectedHorsePhoto = await prepareHorsePhoto(file);
    const previewUrl = URL.createObjectURL(selectedHorsePhoto);
    horsePhotoPreview.innerHTML = `<img src="${previewUrl}" alt="Vista previa de la fotografía del ejemplar">`;
    horsePhotoPreview.querySelector("img").addEventListener("load", () => URL.revokeObjectURL(previewUrl), {once:true});
  } catch (error) {
    selectedHorsePhoto = null;
    this.value = "";
    horsePhotoPreview.innerHTML = "<span>La fotografía que elijas aparecerá aquí</span>";
    showToast(error.message);
  }
});

document.getElementById("horseForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  const submitButton = this.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "GUARDANDO PERFIL…";

  const horse = {
    id: document.getElementById("horseCode").value.trim(),
    name: document.getElementById("horseName").value.trim(),
    age: document.getElementById("horseAge").value === ""
      ? ""
      : Number(document.getElementById("horseAge").value),
    sex: document.getElementById("horseSex").value,
    color: document.getElementById("horseColor").value.trim(),
    owner: document.getElementById("horseOwner").value.trim(),
    photo: document.getElementById("horsePhoto").value.trim(),
    photoKey: selectedHorsePhoto ? makeId() : "",
    notes: document.getElementById("horseNotes").value.trim()
  };

  if (data.horses.some(existing => existing.id.toLowerCase() === horse.id.toLowerCase())) {
    showToast("Ya existe un ejemplar con ese número de registro.");
    submitButton.disabled = false;
    submitButton.textContent = "GUARDAR PERFIL ↗";
    return;
  }

  if (!horse.name || !horse.id) {
    showToast("El nombre y el número de registro son obligatorios.");
    submitButton.disabled = false;
    submitButton.textContent = "GUARDAR PERFIL ↗";
    return;
  }

  try {
    if (selectedHorsePhoto) await storeHorsePhoto(horse.photoKey, selectedHorsePhoto);
  } catch (error) {
    showToast(error.message || "No se pudo guardar la fotografía.");
    submitButton.disabled = false;
    submitButton.textContent = "GUARDAR PERFIL ↗";
    return;
  }

  data.horses.push(horse);

  data.records.push({
    id: makeId(),
    horseId: horse.id,
    type: "Otro",
    date: today,
    status: "Completado",
    description: "Creación del perfil del ejemplar."
  });

  if (!saveData()) {
    data.horses = data.horses.filter(item => item.id !== horse.id);
    data.records = data.records.filter(record => record.horseId !== horse.id || record.description !== "Creación del perfil del ejemplar.");
    if (horse.photoKey) await deleteHorsePhoto(horse.photoKey);
    submitButton.disabled = false;
    submitButton.textContent = "GUARDAR PERFIL ↗";
    return;
  }
  this.reset();
  selectedHorsePhoto = null;
  submitButton.disabled = false;
  submitButton.textContent = "GUARDAR PERFIL ↗";
  horsePhotoPreview.innerHTML = "<span>La fotografía que elijas aparecerá aquí</span>";
  renderAll();
  navigate("horses");
  showToast(horse.photoKey ? "Perfil y fotografía guardados en este navegador." : "Perfil creado correctamente.");
});

function updateHorseSelect() {
  const select = document.getElementById("careHorse");
  const previous = select.value;

  if (!data.horses.length) {
    select.innerHTML = '<option value="">Primero registra un ejemplar</option>';
    return;
  }

  select.innerHTML = data.horses.map(horse =>
    `<option value="${escapeHTML(horse.id)}">${escapeHTML(horse.name)} · ${escapeHTML(horse.id)}</option>`
  ).join("");

  if (data.horses.some(horse => horse.id === previous)) {
    select.value = previous;
  }
}

document.getElementById("careDate").value = today;

document.getElementById("careForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const horseId = document.getElementById("careHorse").value;
  const type = document.getElementById("careType").value;
  const date = document.getElementById("careDate").value;
  const status = document.getElementById("careStatus").value;
  const description = document.getElementById("careDescription").value.trim();

  if (!horseId || !date || !description) {
    showToast("Completa los campos obligatorios.");
    return;
  }

  data.records.push({
    id: makeId(),
    horseId,
    type,
    date,
    status,
    description
  });

  saveData();
  this.reset();
  document.getElementById("careDate").value = today;
  document.getElementById("careStatus").value = "Pendiente";

  renderAll();
  renderCare();
  showToast("Evento registrado en el historial de demostración.");
});

function renderRecords() {
  const container = document.getElementById("recordList");
  const records = [...data.records].sort((a,b) => b.date.localeCompare(a.date));

  if (!records.length) {
    container.innerHTML = '<div class="empty-state"><strong>El historial comienza con el primer evento.</strong>Registra un cuidado para empezar a construir la trazabilidad.</div>';
    return;
  }

  container.innerHTML = records.map(record => `
    <article class="record-row">
      <div>
        <strong>${escapeHTML(record.type)} · ${escapeHTML(getHorseName(record.horseId))}</strong>
        <p>${escapeHTML(record.description)}<br>Estado: ${escapeHTML(record.status)}</p>
      </div>
      <span class="record-date">${formatDate(record.date)}</span>
    </article>
  `).join("");
}

function renderCare() {
  updateHorseSelect();

  const container = document.getElementById("careList");
  const records = [...data.records].sort((a,b) => {
    if (a.status !== b.status) return a.status === "Pendiente" ? -1 : 1;
    return b.date.localeCompare(a.date);
  });

  if (!records.length) {
    container.innerHTML = '<div class="empty-state"><strong>Sin cuidados registrados.</strong>Usa el formulario para añadir el primer evento.</div>';
    return;
  }

  container.innerHTML = records.map(record => `
    <article class="record-row">
      <div>
        <strong>${escapeHTML(record.type)} · ${escapeHTML(getHorseName(record.horseId))}</strong>
        <p>${escapeHTML(record.description)}</p>
        <p style="margin-top:6px">${escapeHTML(record.status)}</p>
        ${record.status === "Pendiente"
          ? `<button class="text-button" style="margin-top:9px" onclick="completeRecord('${escapeHTML(record.id)}')">Marcar como completado ✓</button>`
          : ""}
      </div>
      <span class="record-date">${formatDate(record.date)}</span>
    </article>
  `).join("");
}

function completeRecord(recordId) {
  const record = data.records.find(item => item.id === recordId);
  if (!record) return;

  record.status = "Completado";
  saveData();
  renderAll();
  renderCare();
  showToast("Evento marcado como completado.");
}

function askDemoAI() {
  const question = document.getElementById("aiQuestion").value.trim();
  const response = document.getElementById("aiResponse");

  if (!question) {
    showToast("Escribe una pregunta para continuar.");
    return;
  }

  response.textContent =
    "Respuesta de demostración\n\n" +
    "Para organizar mejor esta consulta, conviene identificar el ejemplar, la fecha, el tipo de actividad y las observaciones relevantes.\n\n" +
    "En el registro de Agropida puedes documentar:\n" +
    "• Ejemplar al que corresponde la observación.\n" +
    "• Fecha y responsable del registro.\n" +
    "• Actividad, alimentación, entrenamiento o evento de salud.\n" +
    "• Cambios observados y seguimiento recomendado por el profesional responsable.\n\n" +
    "Tu pregunta fue: “" + question + "”\n\n" +
    "Nota: esta respuesta es fija y demostrativa. No fue generada por IA ni constituye un diagnóstico veterinario.";

  response.classList.remove("hidden");
}

function renderAll() {
  renderStats();
  renderFeaturedHorses();
  renderRecentEvents();
  renderHorses();
  renderRecords();
  renderCare();
  updateHorseSelect();
}

/* Preparar la vista inicial sin iniciar sesión automáticamente. */
renderAll();
