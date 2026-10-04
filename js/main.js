/**
 * Módulo Principal del Generador de Brochures
 * Arquitectura basada en Estado Centralizado y Renderizado Reactivo
 */

const STORAGE_KEY = 'brochure_pro_state_v1';

// Estado Centralizado de la Aplicación
let state = {
    nombre: '',
    titulo: '',
    registro: '',
    badge: '',
    titular: '',
    bio: '',
    enfoque: '',
    publico: '',
    modalidad: '',
    horarios: '',
    consulta: '',
    tel: '',
    email: '',
    web: '',
    lugar: '',
    razon: '',
    rut: '',
    fotourl: '',
    clientes: '',
    conf: true,
    fiscal: false,
    plantilla: 't1',
    acc: '#3f6f68',
    accUserModified: false,
    servicios: []
};

// Utilidades de Seguridad y Formateo
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nl = s => esc(s).replace(/\n/g, '<br>');
const initials = n => n.split(/\s+/).filter(w => w && !/\.$/.test(w)).slice(0,2).map(w => w[0]).join('').toUpperCase();

// Inicialización de Inputs Dinámicos de Servicios
function initServicesDOM() {
    const container = document.getElementById('svs');
    if (!container) return;
    
    container.innerHTML = [0, 1, 2, 3].map(i => `
        <div style="margin-top:8px; display:flex; flex-direction:column; gap:4px;">
            <input id="st${i}" placeholder="Servicio ${i+1}" data-index="${i}" data-field="t">
            <textarea id="sd${i}" rows="1" placeholder="Descripción breve" data-index="${i}" data-field="d"></textarea>
        </div>
    `).join('');
}

// Persistencia de Estado
function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.warn('No se pudo guardar en LocalStorage', e);
    }
}

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            state = { ...state, ...JSON.parse(saved) };
            return true;
        }
    } catch (e) {
        console.warn('No se pudo leer LocalStorage', e);
    }
    return false;
}

// Renderizado de la Vista Previa A4
function render() {
    const hoja = document.getElementById('hoja');
    if (!hoja) return;

    hoja.className = state.plantilla;
    // ... lógica de inyección de plantillas basada en state ...

    saveState();
}