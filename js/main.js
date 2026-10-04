const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nl = s => esc(s).replace(/\n/g, '<br>');
const F = ['nombre', 'titulo', 'registro', 'titular', 'bio', 'enfoque', 'publico', 'modalidad', 'horarios', 'consulta', 'tel', 'email', 'web', 'lugar', 'razon', 'rut', 'fotourl', 'clientes'];

let fotoUrlCustom = '', accU = 0;
const LS = 'brochure_pro_v4';

// Sistema de pestañas del panel lateral
function switchTab(index) {
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.tab-pane').forEach((pane, i) => {
        pane.classList.toggle('active', i === index);
    });
}

document.querySelectorAll('label:not(.chk)').forEach(l => {
    const n = l.nextElementSibling;
    if (n && /^(INPUT|SELECT|TEXTAREA)$/.test(n.tagName)) l.htmlFor = n.id;
});

$('svs').innerHTML = [0, 1, 2, 3].map(i => `
    <div style="margin-top:8px; display:flex; flex-direction:column; gap:4px;">
        <input id="st${i}" placeholder="Servicio ${i+1}">
        <textarea id="sd${i}" rows="1" placeholder="Descripción breve"></textarea>
    </div>
`).join('');

const PRE = {
    clinica: {
        pl: 't1',
        nombre: 'Lic. Lucía Pérez',
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
        tel: '+598 99 000 000',
        email: 'contacto@luciaperez.uy',
        web: '@luciaperez.psi',
        lugar: 'Montevideo, Uruguay',
        fotourl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    },
    org: {
        pl: 't4', // Por defecto ahora sugiere la plantilla ejecutiva t4 para perfiles organizacionales
        nombre: 'Lic. Lucía Pérez',
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
        tel: '+598 99 000 000',
        email: 'consultas@luciaperez.uy',
        web: 'www.luciaperez-org.uy',
        lugar: 'Montevideo, Uruguay',
        fotourl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
    },
    oec: {
        pl: 't4',
        nombre: 'Lic. Lucía Pérez',
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
        tel: '+598 99 000 000',
        email: 'oec@luciaperez.uy',
        web: 'www.luciaperez-oec.uy',
        lugar: 'Montevideo, Uruguay',
        fotourl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80'
    },
    dev: {
        pl: 't5',
        nombre: 'Ing. Lucía Pérez',
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
        tel: '+598 99 000 000',
        email: 'dev@luciaperez.uy',
        web: 'github.com/luciaperez',
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
    render();
}

function leerDatos() {
    const d = {};
    F.forEach(k => { if($('f-'+k)) d[k] =$('f-'+k).value.trim(); });
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
    const fotoHtml = imgSrc ? `<img src="${imgSrc}" alt="Foto">` : esc(ini(d.nombre));
    
    const cont = [
        ['Teléfono', d.tel],
        ['Correo', d.email],
        ['Web / Redes', d.web],
        ['Ubicación', d.lugar]
    ].filter(x => x[1]).map(([l, v]) => `<div><span class="lab">${l}</span>${esc(v)}</div>`).join('');

    let clientesHtml = '';
    if (d.clientesArr.length > 0) {
        clientesHtml = `<div style="margin-top:4mm;"><span class="lab" style="margin-bottom:1.5mm;">Clientes / Aliados Destacados</span><div class="clientes-grid">${d.clientesArr.map(c => `<span class="cliente-tag">${esc(c)}</span>`).join('')}</div></div>`;
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
        nota: d.conf ? '<p class="nota">Todo lo conversado en consulta es estrictamente confidencial y está amparado por el secreto profesional.</p>' : ''
    };
}

const Plantillas = {
    t1: (d, p) => `<aside class="lado"><div class="foto">${p.foto}</div><div class="cont">${p.cont}${p.fiscalTxt}</div></aside><div class="main"><h1>${esc(d.titular)}</h1><div class="quien">${p.quien}</div>${d.bio ? `<p>${nl(d.bio)}</p>` : ''}${S('Enfoque', d.enfoque && `<p>${nl(d.enfoque)}</p>`)}${S('Atiendo a', p.pub)}${S('Servicios', p.serv)}${p.clientesSec}<div class="meta">${p.meta}</div>${p.nota}</div>`,
    
    t2: (d, p) => `<div class="top"><div><h1>${esc(d.titular)}</h1><div class="quien">${p.quien}</div></div><div class="foto">${p.foto}</div></div><div class="cuerpo"><div>${d.bio ? `<p>${nl(d.bio)}</p>` : ''}${S('Enfoque', d.enfoque && `<p>${nl(d.enfoque)}</p>`)}${S('Dirigido a', p.pub)}${p.clientesSec}</div><div>${S('Servicios', p.serv)}${p.meta ? `<div class="meta">${p.meta}</div>` : ''}</div></div><div class="pie">${p.cont}${p.fiscalTxt}${p.nota}</div>`,
    
    t3: (d, p) => {
        const R = (l, h) => h ? `<div class="fila"><b>${l}</b><div>${h}</div></div>` : '';
        return `<div class="cab"><div><h1>${esc(d.nombre)}</h1><div class="quien">${esc(d.titulo)}${d.registro ? `<span class="lab">${esc(d.registro)}</span>` : ''}</div></div><div class="foto">${p.foto}</div></div>${d.titular ? `<p class="tit">${esc(d.titular)}</p>` : ''}${d.bio ? `<p>${nl(d.bio)}</p>` : ''}<div>${R('Enfoque', d.enfoque && nl(d.enfoque))}${R('Atiendo a', p.pub)}${d.sv.map(s => R(esc(s.t), esc(s.d))).join('')}${R('Modalidad', esc(d.modalidad))}${R('Horarios', esc(d.horarios))}${R('Primera consulta', esc(d.consulta))}${d.clientesArr.length ? R('Clientes', d.clientesArr.join(', ')) : ''}</div><div class="pie">${p.cont.replace(/<span class="lab">([^<]*)<\/span>/g,'<span class="lab" style="display:inline;margin-right:1.5mm">$1</span>')}${p.fiscalTxt}${p.nota}</div>`;
    },

    // Nueva t4: Ejecutivo Corporativo (Azul Marino y Oro)
    t4: (d, p) => `
        <div class="hero-exec">
            <div>
                <h1>${esc(d.titular)}</h1>
                <div class="quien" style="color: #cbd5e1;">${p.quien}</div>
            </div>
            <div style="font-size: 8.5pt; border: 1px solid #c59b27; padding: 2mm 4mm; color: #c59b27; border-radius: 3px; text-transform: uppercase; font-weight: 600;">Perfil Ejecutivo</div>
        </div>
        <div class="cuerpo-exec">
            <div class="perfil-exec">
                <div>
                    <h2>Perfil Profesional</h2>
                    <p>${nl(d.bio)}</p>
                    ${d.enfoque ? `<p style="margin-top: 3mm; font-size: 9pt; color: #475569;"><b>Enfoque:</b> ${esc(d.enfoque)}</p>` : ''}
                </div>
                <div class="foto">${p.foto}</div>
            </div>
            ${d.clientesArr.length ? `<div><h2>Clientes y Alianzas</h2><div class="clientes-grid">${d.clientesArr.map(c => `<span class="cliente-tag">${esc(c)}</span>`).join('')}</div></div>` : ''}
            <div>
                <h2>Nuestros Servicios</h2>
                <div class="servicios-grid">${p.servCards}</div>
            </div>
        </div>
        <div class="pie-exec">
            <div><b>Contacto</b><div>${esc(d.tel)}</div><div>${esc(d.email)}</div><div>${esc(d.lugar)}</div></div>
            <div><b>Profesional</b><div>${esc(d.web)}</div><div>${esc(d.modalidad)}</div></div>
            <div><b>Datos Fiscales</b><div>${esc(d.razon)}</div><div>${d.rut ? 'RUT: '+esc(d.rut) : ''}</div></div>
        </div>
    `,

    // Nueva t5: Corporativo Moderno (Gris Pizarra y Tech)
    t5: (d, p) => `
        <div class="top-modern">
            <div>
                <h1>${esc(d.titular)}</h1>
                <div class="quien" style="color: #cbd5e1;">${p.quien}</div>
            </div>
            <div class="foto">${p.foto}</div>
        </div>
        <div class="cuerpo-modern">
            <div>
                ${S('Presentación', `<p>${nl(d.bio)}</p>`)}
                ${S('Metodología', d.enfoque ? `<p>${nl(d.enfoque)}</p>` : '')}
                ${d.clientesArr.length ? `<div><h2>Aliados</h2><div class="clientes-grid">${d.clientesArr.map(c => `<span class="cliente-tag">${esc(c)}</span>`).join('')}</div></div>` : ''}
            </div>
            <div>
                ${S('Servicios', p.serv)}
                ${S('Disponibilidad', `<p>${esc(d.modalidad)} \vert{}${esc(d.horarios)}</p>`)}
            </div>
        </div>
        <div class="pie-modern">
            <div>${esc(d.tel)} | ${esc(d.email)} | ${esc(d.lugar)}</div>
            <div>${esc(d.razon)} ${d.rut ? '| RUT: '+esc(d.rut) : ''}</div>
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
                ${S('Enfoque y Perfil', `<p>${nl(d.bio)}</p>${d.enfoque ? '<p style="margin-top:2mm;"><b>Metodología:</b> '+esc(d.enfoque)+'</p>' : ''}`)}
                ${d.clientesArr.length ? `<div><h2 style="margin-top:4mm;">Organizaciones</h2><div class="clientes-grid">${d.clientesArr.map(c => `<span class="cliente-tag">${esc(c)}</span>`).join('')}</div></div>` : ''}
            </div>
            <div>
                ${S('Servicios Ofrecidos', p.serv)}
                ${S('Atención', `<p>${esc(d.modalidad)} -${esc(d.horarios)}</p>`)}
            </div>
        </div>
        <div class="pie-bio">
            <div><b>Contacto:</b> ${esc(d.tel)} | ${esc(d.email)} | ${esc(d.lugar)}</div>
            <div>${esc(d.razon)}</div>
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

$('preset').onchange = e => cargarPreset(e.target.value);
document.querySelector('.panel').addEventListener('input', render);
addEventListener('resize', ajustarEscala);
$('f-acc').addEventListener('input', () => { accU = 1; });$('f-plantilla').addEventListener('change', () => { accU = 0; render(); });

// Inicializar con Psicología Clínica
cargarPreset('clinica');