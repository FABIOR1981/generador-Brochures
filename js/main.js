const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nl = s => esc(s).replace(/\n/g, '<br>');
const F = ['nombre', 'titulo', 'registro', 'titular', 'bio', 'enfoque', 'publico', 'modalidad', 'horarios', 'consulta', 'tel', 'email', 'web', 'lugar', 'razon', 'rut', 'fotourl', 'clientes'];
const CONTACTO = { nombre: 'Lic. Rita Morales', tel: '+598 99140274', email: 'licritamorales@gmail.com' };

let fotoUrlCustom = '', accU = 0, logosCli = [];
const MAX_LOGOS = 8;
const LS = 'brochure_pro_v4';

// Sistema de pestañas del panel lateral
function switchTab(index) {
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
        btn.setAttribute('aria-selected', i === index ? 'true' : 'false');
        btn.tabIndex = i === index ? 0 : -1;
    });
    document.querySelectorAll('.tab-pane').forEach((pane, i) => {
        pane.classList.toggle('active', i === index);
    });
}

document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => switchTab(i));
    btn.addEventListener('keydown', e => {
        const n = document.querySelectorAll('.tab-btn').length;
        const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        const j = (i + dir + n) % n;
        switchTab(j);
        document.querySelectorAll('.tab-btn')[j].focus();
    });
});

document.querySelectorAll('label:not(.chk)').forEach(l => {
    const n = l.nextElementSibling;
    if (n && /^(INPUT|SELECT|TEXTAREA)$/.test(n.tagName)) l.htmlFor = n.id;
});

$('svs').innerHTML = [0, 1, 2, 3].map(i => `
    <div style="margin-top:8px; display:flex; flex-direction:column; gap:4px;">
        <input id="st${i}" placeholder="Servicio ${i+1}" aria-label="Servicio ${i+1}: nombre">
        <textarea id="sd${i}" rows="1" placeholder="Descripción breve" aria-label="Servicio ${i+1}: descripción"></textarea>
    </div>
`).join('');

const PRE = {
    clinica: {
        pl: 't1',
        nombre: CONTACTO.nombre,
        titulo: 'Psicóloga clínica',
        registro: 'Registro profesional N.º 0000',
        titular: 'Un espacio seguro para entender lo que sentís y empezar a cambiar',
        bio: 'Acompaño a adultos y jóvenes en procesos de ansiedad, estrés, duelo y cambios vitales con escucha atenta y objetivos claros.',
        enfoque: 'Terapia cognitivo-conductual con herramientas de regulación emocional.',
        publico: 'Adultos y jóvenes desde 18 años\nPersonas que atraviesan duelos o cambios vitales',
        sv: [
            ['Psicoterapia individual', 'Sesiones semanales de 50 minutos, presenciales u online.'],
            ['Terapia de pareja', 'Espacio para ordenar la comunicación y acordar objetivos.'],
            ['Orientación vocacional', 'Acompañamiento para elegir camino de estudio o trabajo.']
        ],
        clientes: '',
        modalidad: 'Presencial y online',
        horarios: 'Lunes a viernes de 9 a 19 h',
        consulta: 'Primera entrevista de 50 minutos para conocer necesidades y definir objetivos.',
        tel: CONTACTO.tel,
        email: CONTACTO.email,
        web: '',
        lugar: 'Montevideo, Uruguay',
        fotourl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    },
    org: {
        pl: 't4', // Por defecto ahora sugiere la plantilla ejecutiva t4 para perfiles organizacionales
        nombre: CONTACTO.nombre,
        titulo: 'Psicóloga laboral y organizacional',
        registro: '',
        titular: 'Psicología organizacional para equipos que quieren trabajar mejor',
        bio: 'Acompaño a organizaciones en selección de personas, clima laboral y prevención de riesgos psicosociales con informes claros.',
        enfoque: 'Diagnóstico con instrumentos validados y planes de acción con indicadores.',
        publico: 'Pymes y empresas medianas\nÁreas de recursos humanos\nLíderes de equipos',
        sv: [
            ['Selección y reclutamiento', 'Perfiles por competencias y evaluaciones psicolaborales.'],
            ['Clima y cultura laboral', 'Diagnóstico, devolución a dirección y planes de mejora.'],
            ['Riesgos psicosociales', 'Relevamiento, prevención y talleres para equipos.'],
            ['Capacitación a medida', 'Formación para mandos medios y liderazgo efectivo.']
        ],
        clientes: 'Empresa Alfa S.A., Logística del Sur, Corporación Delta, TechSolutions',
        modalidad: 'In-company y remoto',
        horarios: 'Coordinación previa',
        consulta: 'Reunión inicial de relevamiento sin cargo para definir alcance.',
        tel: CONTACTO.tel,
        email: CONTACTO.email,
        web: '',
        lugar: 'Montevideo, Uruguay',
        fotourl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
    },
    oec: {
        pl: 't4',
        nombre: CONTACTO.nombre,
        titulo: 'Especialista en OEC y Calidad',
        registro: '',
        titular: 'Estrategia, gestión y cumplimiento para organizaciones de alto desempeño',
        bio: 'Especialista en implementación de Programas de Operador Económico Calificado (OEC), comercio exterior y sistemas integrados.',
        enfoque: 'Auditoría de procesos y mejora continua bajo normas internacionales.',
        publico: 'Empresas exportadoras e importadoras\nOperadores logísticos\nCadenas de suministro',
        sv: [
            ['Implementación OEC', 'Diagnóstico, manuales de procesos y gestión de riesgos aduaneros.'],
            ['Auditorías Previas', 'Simulacros de auditoría y levantamiento de no conformidades.'],
            ['Gestión de Procesos', 'Mapeo de flujos, indicadores y optimización operativa.']
        ],
        clientes: 'Comercio Exterior S.A., Aduanas y Carga Ltda., Zona Franca Global',
        modalidad: 'Presencial en planta y auditoría remota',
        horarios: 'Lunes a viernes',
        consulta: 'Reunión técnica preliminar para evaluar estado de cumplimiento.',
        tel: CONTACTO.tel,
        email: CONTACTO.email,
        web: '',
        lugar: 'Montevideo, Uruguay',
        fotourl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80'
    },
    dev: {
        pl: 't5',
        nombre: CONTACTO.nombre,
        titulo: 'Ingeniera de Software & Cloud Architecture',
        registro: '',
        titular: 'Arquitectura de software escalable y desarrollo backend de alto rendimiento',
        bio: 'Diseño e implementación de aplicaciones robustas, APIs seguras y soluciones en la nube para proyectos tecnológicos complejos.',
        enfoque: 'Clean Code, arquitectura hexagonal, microservicios y despliegue continuo.',
        publico: 'Startups en crecimiento\nEmpresas de tecnología\nEquipos de desarrollo',
        sv: [
            ['Arquitectura de Software', 'Diseño de sistemas distribuidos y migración a la nube.'],
            ['Desarrollo Backend', 'APIs RESTful, optimización de bases de datos y seguridad.'],
            ['Code Review y Testing', 'Auditoría de código, refactorización y buenas prácticas.']
        ],
        clientes: 'Fintech Nova, Software House Uy, CloudNet Inc.',
        modalidad: 'Remoto internacional / Híbrido',
        horarios: 'Horario flexible',
        consulta: 'Evaluación técnica inicial de arquitectura y requerimientos.',
        tel: CONTACTO.tel,
        email: CONTACTO.email,
        web: '',
        lugar: 'Montevideo, Uruguay',
        fotourl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    }
};

function cargarPreset(k) {
    const p = PRE[k];
    F.forEach(f => { if($('f-'+f))$('f-'+f).value = p[f] || ''; });
    for(let i=0; i<4; i++) {
        $('st'+i).value = p.sv[i] ? p.sv[i][0] : '';
        $('sd'+i).value = p.sv[i] ? p.sv[i][1] : '';
    }
    accU = 0;
    $('f-plantilla').value = p.pl;
    $('f-conf').checked = true;
    $('f-fiscal').checked = false;
    fotoUrlCustom = '';
    logosCli = [];
    panelLogos();
    render();
}

function leerDatos() {
    const d = {};
    F.forEach(k => { if($('f-'+k)) d[k] =$('f-'+k).value.trim(); });
    Object.entries(CONTACTO).forEach(([key, value]) => {
        $('f-' + key).value = value;
        d[key] = value;
    });
    d.conf = $('f-conf').checked;
    d.fiscal = $('f-fiscal').checked;
    d.pub = d.publico ? d.publico.split('\n').map(s => s.trim()).filter(Boolean) : [];
    d.clientesArr = d.clientes ? d.clientes.split(',').map(s => s.trim()).filter(Boolean) : [];
    d.sv = [0,1,2,3].map(i => ({t: $('st'+i).value.trim(), d:$('sd'+i).value.trim()})).filter(s => s.t);
    return d;
}

const ini = n => n.split(/\s+/).filter(w => w && !/\.$/.test(w)).slice(0,2).map(w => w[0]).join('').toUpperCase();
const S = (t, h) => h ? `<section><h2>${t}</h2>${h}</section>` : '';

function prepararRender(d) {
    const imgSrc = fotoUrlCustom || d.fotourl;
    const fotoHtml = imgSrc ? `<img src="${esc(imgSrc)}" alt="Foto de ${esc(d.nombre)}">` : esc(ini(d.nombre));
    
    const cont = [
        ['Teléfono', d.tel],
        ['Correo', d.email],
        ['Web / Redes', d.web],
        ['Ubicación', d.lugar]
    ].filter(x => x[1]).map(([l, v]) => `<div><span class="lab">${l}</span>${esc(v)}</div>`).join('');

    const tags = d.clientesArr.map(c => `<span class="cliente-tag">${esc(c)}</span>`).join('');
    const logosHtml = logosCli.length
        ? `<div class="logos-grid">${logosCli.map((s, i) => `<img src="${esc(s)}" alt="Logo de cliente ${i + 1}">`).join('')}</div>`
        : '';
    const hayCli = d.clientesArr.length > 0 || logosCli.length > 0;
    const cliInner = logosHtml + (d.clientesArr.length ? `<div class="clientes-grid">${tags}</div>` : '');
    let clientesHtml = '';
    if (hayCli) {
        clientesHtml = `<div class="clientes-bloque"><span class="lab">Clientes / Aliados Destacados</span>${cliInner}</div>`;
    }

    let fiscalTxt = '';
    if (d.fiscal && (d.razon || d.rut)) {
        fiscalTxt = `<div><span class="lab">Datos Fiscales</span>${esc(d.razon)}${d.rut ? '<br>RUT: '+esc(d.rut) : ''}</div>`;
    }

    return {
        foto: fotoHtml,
        cont: cont,
        fiscalTxt: fiscalTxt,
        serv: d.sv.map(s => `<div class="serv"><b>${esc(s.t)}</b>${esc(s.d)}</div>`).join(''),
        servCards: d.sv.map(s => `<div class="serv-card"><b>${esc(s.t)}</b>${esc(s.d)}</div>`).join(''),
        pub: d.pub.length ? `<ul>${d.pub.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '',
        meta: [
            ['Modalidad', d.modalidad],
            ['Horarios', d.horarios],
            ['Primera consulta', d.consulta]
        ].filter(m => m[1]).map(([l, v]) => `<div><span class="lab">${l}</span>${esc(v)}</div>`).join(''),
        quien: `<b>${esc(d.nombre)}</b>${esc(d.titulo)}${d.registro ? `<span class="lab">${esc(d.registro)}</span>` : ''}`,
        clientesSec: clientesHtml,
        tags: tags,
        hayCli: hayCli,
        cliInner: cliInner,
        nota: d.conf ? '<p class="nota">Todo lo conversado en consulta es estrictamente confidencial y está amparado por el secreto profesional.</p>' : ''
    };
}

const Plantillas = {
    t1: (d, p) => `<aside class="lado"><div class="foto">${p.foto}</div><div class="cont">${p.cont}${p.fiscalTxt}</div></aside><div class="main"><h1>${esc(d.titular)}</h1><div class="quien">${p.quien}</div>${d.bio ? `<p>${nl(d.bio)}</p>` : ''}${S('Enfoque', d.enfoque && `<p>${nl(d.enfoque)}</p>`)}${S('Atiendo a', p.pub)}${S('Servicios', p.serv)}${p.clientesSec}<div class="meta">${p.meta}</div>${p.nota}</div>`,
    
    t2: (d, p) => `<div class="top"><div><h1>${esc(d.titular)}</h1><div class="quien">${p.quien}</div></div><div class="foto">${p.foto}</div></div><div class="cuerpo"><div>${d.bio ? `<p>${nl(d.bio)}</p>` : ''}${S('Enfoque', d.enfoque && `<p>${nl(d.enfoque)}</p>`)}${S('Dirigido a', p.pub)}${p.clientesSec}</div><div>${S('Servicios', p.serv)}${p.meta ? `<div class="meta">${p.meta}</div>` : ''}</div></div><div class="pie">${p.cont}${p.fiscalTxt}${p.nota}</div>`,
    
    t3: (d, p) => {
        const R = (l, h) => h ? `<div class="fila"><b>${l}</b><div>${h}</div></div>` : '';
        return `<div class="cab"><div><h1>${esc(d.nombre)}</h1><div class="quien">${esc(d.titulo)}${d.registro ? `<span class="lab">${esc(d.registro)}</span>` : ''}</div></div><div class="foto">${p.foto}</div></div>${d.titular ? `<p class="tit">${esc(d.titular)}</p>` : ''}${d.bio ? `<p>${nl(d.bio)}</p>` : ''}<div>${R('Enfoque', d.enfoque && nl(d.enfoque))}${R('Atiendo a', p.pub)}${d.sv.map(s => R(esc(s.t), esc(s.d))).join('')}${R('Modalidad', esc(d.modalidad))}${R('Horarios', esc(d.horarios))}${R('Primera consulta', esc(d.consulta))}${p.hayCli ? R('Clientes', p.cliInner) : ''}</div><div class="pie">${p.cont.replace(/<span class="lab">([^<]*)<\/span>/g,'<span class="lab" style="display:inline;margin-right:1.5mm">$1</span>')}${p.fiscalTxt}${p.nota}</div>`;
    },

    // Nueva t4: Ejecutivo Corporativo (Azul Marino y Oro)
    t4: (d, p) => `
        <div class="hero-exec">
            <div>
                <h1>${esc(d.titular)}</h1>
                <div class="quien">${p.quien}</div>
            </div>
            <div class="sello-exec">Perfil Ejecutivo</div>
        </div>
        <div class="cuerpo-exec">
            <div class="perfil-exec">
                <div>
                    <h2>Perfil Profesional</h2>
                    ${d.bio ? `<p>${nl(d.bio)}</p>` : ''}
                    ${d.enfoque ? `<p class="enfoque-exec"><b>Enfoque:</b> ${esc(d.enfoque)}</p>` : ''}
                    ${d.pub.length ? `<p class="enfoque-exec"><b>Dirigido a:</b> ${d.pub.map(esc).join(' · ')}</p>` : ''}
                </div>
                <div class="foto">${p.foto}</div>
            </div>
            ${p.hayCli ? `<div><h2>Clientes y Alianzas</h2>${p.cliInner}</div>` : ''}
            ${d.sv.length ? `<div>
                <h2>Nuestros Servicios</h2>
                <div class="servicios-grid">${p.servCards}</div>
            </div>` : ''}
            ${p.meta ? `<div class="meta-exec">${p.meta}</div>` : ''}
        </div>
        <div class="pie-exec">
            <div><b>Contacto</b>${[d.tel, d.email, d.lugar].filter(Boolean).map(v => `<div>${esc(v)}</div>`).join('')}</div>
            <div><b>Profesional</b>${[d.web, d.modalidad].filter(Boolean).map(v => `<div>${esc(v)}</div>`).join('')}</div>
            ${p.fiscalTxt ? `<div><b>Datos Fiscales</b><div>${esc(d.razon)}</div>${d.rut ? `<div>RUT: ${esc(d.rut)}</div>` : ''}</div>` : ''}
            ${p.nota}
        </div>
    `,

    // Nueva t5: Corporativo Moderno (Gris Pizarra y Tech)
    t5: (d, p) => `
        <div class="top-modern">
            <div>
                <h1>${esc(d.titular)}</h1>
                <div class="quien">${p.quien}</div>
            </div>
            <div class="foto">${p.foto}</div>
        </div>
        <div class="cuerpo-modern">
            <div>
                ${S('Presentación', d.bio && `<p>${nl(d.bio)}</p>`)}
                ${S('Metodología', d.enfoque && `<p>${nl(d.enfoque)}</p>`)}
                ${S('Dirigido a', p.pub)}
                ${p.hayCli ? `<section><h2>Aliados</h2>${p.cliInner}</section>` : ''}
            </div>
            <div>
                ${S('Servicios', p.serv)}
                ${S('Disponibilidad', p.meta)}
            </div>
        </div>
        <div class="pie-modern">
            <div>${[d.tel, d.email, d.lugar].filter(Boolean).map(esc).join(' | ')}</div>
            ${p.fiscalTxt ? `<div>${esc(d.razon)}${d.rut ? ' | RUT: ' + esc(d.rut) : ''}</div>` : ''}
            ${p.nota}
        </div>
    `,

    // Nueva t6: Bienestar Institucional (Verde Bosque)
    t6: (d, p) => `
        <div class="header-bio">
            <div class="foto">${p.foto}</div>
            <div>
                <h1>${esc(d.titular)}</h1>
                <div class="quien">${p.quien}</div>
            </div>
        </div>
        <div class="cuerpo-bio">
            <div>
                ${S('Enfoque y Perfil', (d.bio ? `<p>${nl(d.bio)}</p>` : '') + (d.enfoque ? `<p class="aparte"><b>Metodología:</b> ${esc(d.enfoque)}</p>` : ''))}
                ${S('Dirigido a', p.pub)}
                ${p.hayCli ? `<section><h2>Organizaciones</h2>${p.cliInner}</section>` : ''}
            </div>
            <div>
                ${S('Servicios Ofrecidos', p.serv)}
                ${S('Atención', p.meta)}
            </div>
        </div>
        <div class="pie-bio">
            <div><b>Contacto:</b> ${[d.tel, d.email, d.lugar].filter(Boolean).map(esc).join(' | ')}</div>
            ${p.fiscalTxt ? `<div>${esc(d.razon)}${d.rut ? ' | RUT: ' + esc(d.rut) : ''}</div>` : ''}
            ${p.nota}
        </div>
    `
};

function ajustarEscala() {
    const vista = document.querySelector('.vista');
    const wA4 = 210 * 3.7795;
    const escala = Math.min(1.5, (vista.clientWidth - (innerWidth < 1000 ? 24 : 64)) / wA4);
    $('hoja').style.transform = `scale(${escala})`;
    $('stage').style.width = (wA4 * escala) + 'px';$('stage').style.height = (297 * 3.7795 * escala) + 'px';
}

function guardar() {
    try {
        const est = {};
        F.forEach(f => { if ($('f-' + f)) est[f] = $('f-' + f).value; });
        est.sv = [0,1,2,3].map(i => [$('st'+i).value, $('sd'+i).value]);
        est.pl = $('f-plantilla').value;
        est.conf = $('f-conf').checked;
        est.fiscal = $('f-fiscal').checked;
        est.acc = accU ? $('f-acc').value : '';
        est.foto = fotoUrlCustom;
        est.logos = logosCli;
        localStorage.setItem(LS, JSON.stringify(est));
    } catch (e) { /* almacenamiento lleno o bloqueado: se ignora */ }
}

function restaurar() {
    try {
        const est = JSON.parse(localStorage.getItem(LS) || 'null');
        if (!est) return false;
        F.forEach(f => { if ($('f-' + f)) $('f-' + f).value = est[f] || ''; });
        for (let i = 0; i < 4; i++) {
            $('st'+i).value = est.sv?.[i]?.[0] || '';
            $('sd'+i).value = est.sv?.[i]?.[1] || '';
        }
        if (Plantillas[est.pl]) $('f-plantilla').value = est.pl;
        $('f-conf').checked = !!est.conf;
        $('f-fiscal').checked = !!est.fiscal;
        fotoUrlCustom = est.foto || '';
        if (est.acc) { $('f-acc').value = est.acc; accU = 1; }
        logosCli = Array.isArray(est.logos) ? est.logos.filter(s => typeof s === 'string').slice(0, MAX_LOGOS) : [];
        panelLogos();
        render();
        return true;
    } catch (e) { return false; }
}

function render() {
    const d = leerDatos();
    const hoja = $('hoja');
    const plantillaId = $('f-plantilla').value;
    
    hoja.className = plantillaId;
    hoja.innerHTML = Plantillas[plantillaId](d, prepararRender(d));
    document.title = 'Brochure - ' + d.nombre;

    if (accU) {
        hoja.style.setProperty('--acc', $('f-acc').value);
    } else {
        hoja.style.removeProperty('--acc');
        const colorCalculado = getComputedStyle(hoja).getPropertyValue('--acc').trim();
        if (/^#[0-9a-f]{6}$/i.test(colorCalculado)) $('f-acc').value = colorCalculado;
    }

    $('aviso').style.display = hoja.scrollHeight > hoja.clientHeight + 2 ? 'block' : 'none';
    ajustarEscala();
    guardar();
}

// Manejo de imagen por archivo local
$('f-foto-file').onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        const img = new Image();
        img.onload = () => {
            const max = 700;
            const scale = Math.min(1, max / Math.max(img.width, img.height));
            const canvas = document.createElement('canvas');
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            fotoUrlCustom = canvas.toDataURL('image/jpeg', 0.88);
            $('f-fotourl').value = '';
            render();
        };
        img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
};

$('sinfoto').onclick = () => {
    fotoUrlCustom = '';
    $('f-fotourl').value = '';$('f-foto-file').value = '';
    render();
};

// ---- Logos de clientes ----
function mensajeLogos(t) { $('logos-msg').textContent = t || ''; }

function panelLogos() {
    $('logos-lista').innerHTML = logosCli.map((s, i) => `
        <div class="logo-item"><img src="${esc(s)}" alt="Logo ${i + 1}"><button type="button" data-i="${i}" aria-label="Quitar logo ${i + 1}">×</button></div>`).join('');
}

function agregarLogo(src) {
    if (logosCli.length >= MAX_LOGOS) { mensajeLogos(`Máximo ${MAX_LOGOS} logos. Quitá alguno para agregar otro.`); return false; }
    logosCli.push(src);
    mensajeLogos('');
    panelLogos();
    render();
    return true;
}

function logoDesdeArchivo(file) {
    return new Promise((ok, no) => {
        const r = new FileReader();
        r.onerror = no;
        r.onload = ev => {
            const img = new Image();
            img.onerror = no;
            img.onload = () => {
                const w0 = img.naturalWidth || 300, h0 = img.naturalHeight || 150;
                const k = Math.min(1, 400 / Math.max(w0, h0));
                const c = document.createElement('canvas');
                c.width = Math.max(1, Math.round(w0 * k));
                c.height = Math.max(1, Math.round(h0 * k));
                c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
                ok(c.toDataURL(file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png', 0.9));
            };
            img.src = ev.target.result;
        };
        r.readAsDataURL(file);
    });
}

$('f-logos-file').onchange = async e => {
    const archivos = [...e.target.files];
    e.target.value = '';
    let fallos = 0;
    for (const f of archivos) {
        if (logosCli.length >= MAX_LOGOS) { mensajeLogos(`Máximo ${MAX_LOGOS} logos. Se omitieron los restantes.`); return; }
        try { agregarLogo(await logoDesdeArchivo(f)); } catch (err) { fallos++; }
    }
    if (fallos) mensajeLogos(`No se pudo leer ${fallos} archivo(s). Probá con PNG, JPG o SVG.`);
};

$('btn-logo-url').onclick = () => {
    const u = $('f-logo-url').value.trim();
    if (!/^https?:\/\/\S+$/i.test(u)) { mensajeLogos('Ingresá una URL que empiece con http:// o https://'); return; }
    if (agregarLogo(u)) $('f-logo-url').value = '';
};
$('f-logo-url').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); $('btn-logo-url').click(); } });

$('logos-lista').addEventListener('click', e => {
    const b = e.target.closest('button[data-i]');
    if (!b) return;
    logosCli.splice(+b.dataset.i, 1);
    mensajeLogos('');
    panelLogos();
    render();
});

$('btn-imprimir').onclick = () => print();
$('preset').onchange = e => cargarPreset(e.target.value);
document.querySelector('.panel').addEventListener('input', render);
addEventListener('resize', ajustarEscala);
$('f-acc').addEventListener('input', () => { accU = 1; });$('f-plantilla').addEventListener('change', () => { accU = 0; render(); });

// Inicializar: retoma el trabajo guardado o carga Psicología Clínica
if (!restaurar()) cargarPreset('clinica');