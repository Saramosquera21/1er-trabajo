// --- LOGIN Y VISIBILIDAD ---

// Mostrar/ocultar líneas de emergencia según selección de país
document.addEventListener('DOMContentLoaded', function() {
  const countrySelect = document.getElementById('country-select');
  const emergencyContainer = document.getElementById('emergency-container');
  
  // Datos de las líneas de emergencia por país
  const emergencyData = {
    'usa': {
      titulo: '📞 Líneas Nacionales de Emergencia y Apoyo en Salud Mental (USA)',
      lineas: [
        '<strong>988 Suicide & Crisis Lifeline</strong><br><span style="color:#7b96ff;">Número:</span> <b>988</b> (como el 911, pero para crisis emocionales, prevención del suicidio y salud mental).<br><span style="color:#888;">Disponible 24/7, gratuito y confidencial.</span>',
        '<strong>SAMHSA National Helpline</strong> <span style="color:#888;">(Administración de Servicios de Salud Mental y Abuso de Sustancias)</span><br><span style="color:#7b96ff;">Número:</span> <b>1-800-662-HELP (4357)</b><br>Asesoramiento y referencias a servicios de tratamiento de salud mental y adicciones.<br><span style="color:#888;">Disponible 24/7, gratuito y confidencial.</span>',
        '<strong>Crisis Text Line</strong><br>Envía la palabra <b>HELLO</b> al <b>741741</b><br>Apoyo por mensajes de texto en situaciones de crisis.',
        '<strong>Trevor Project</strong> <span style="color:#888;">(para jóvenes LGBTQ+)</span><br><span style="color:#7b96ff;">Número:</span> <b>1-866-488-7386</b><br>Texto: <b>START</b> al <b>678678</b><br>Chat en línea también disponible.',
        '<strong>Veterans Crisis Line</strong> <span style="color:#888;">(para veteranos y sus familias)</span><br><span style="color:#7b96ff;">Número:</span> <b>988</b>, luego presiona <b>1</b><br>Texto: <b>838255</b><br><span style="color:#888;">Disponible 24/7.</span>',
        '<strong>National Domestic Violence Hotline</strong> <span style="color:#888;">(si la crisis está relacionada con violencia doméstica)</span><br><span style="color:#7b96ff;">Número:</span> <b>1-800-799-SAFE (7233)</b><br>Texto: <b>START</b> al <b>88788</b>',
        '<strong>National Sexual Assault Hotline (RAINN)</strong><br><span style="color:#7b96ff;">Número:</span> <b>1-800-656-HOPE (4673)</b><br>Conexión confidencial a servicios locales de apoyo.'
      ]
    },
    'mexico': {
      titulo: '📞 Líneas Nacionales de Emergencia y Apoyo en Salud Mental (México)',
      lineas: [
        '<strong>Línea de la Vida – CONADIC</strong> <span style="color:#888;">(adicciones, salud mental y crisis emocionales)</span><br><span style="color:#7b96ff;">Número:</span> <b>800 911 2000</b><br><span style="color:#888;">Disponible 24/7, gratuito y confidencial.</span>',
        '<strong>Línea de Emergencias Nacionales</strong> <span style="color:#888;">(Cruz Roja / Protección Civil / Policía)</span><br><span style="color:#7b96ff;">Número:</span> <b>911</b><br>En caso de urgencias inmediatas, incluidas crisis de salud mental.',
        '<strong>SAPTEL</strong> <span style="color:#888;">(Apoyo psicológico a distancia, UNAM)</span><br><span style="color:#7b96ff;">Número:</span> <b>800 472 7835</b><br><span style="color:#888;">Disponible 24/7, gratuito y atendido por psicólogos.</span>',
        '<strong>Locatel</strong> <span style="color:#888;">(CDMX, pero orienta a nivel nacional)</span><br><span style="color:#7b96ff;">Número:</span> <b>55 5658 1111</b><br>Orientación en crisis, canalización a servicios de salud mental.',
        '<strong>Línea de Atención Psicológica a Distancia (UNAM)</strong><br><span style="color:#7b96ff;">Número:</span> <b>55 5025 0855</b><br>Apoyo telefónico y por videollamada con especialistas.',
        '<strong>Línea Nacional contra la Violencia Familiar</strong> <span style="color:#888;">(INMUJERES / DIF)</span><br><span style="color:#7b96ff;">Número:</span> <b>800 422 5256</b><br>Atención a mujeres y familias en situación de violencia.',
        '<strong>Línea Directa de Apoyo a la Comunidad LGBTQ+</strong><br>(ONGs como <b>It Gets Better México</b> y asociaciones locales ofrecen apoyo psicológico).'
      ]
    },
    'spain': {
      titulo: '📞 Líneas Nacionales de Emergencia y Salud Mental (España)',
      lineas: [
        '<strong>Teléfono 024 – Línea de Atención a la Conducta Suicida</strong><br><span style="color:#7b96ff;">Número:</span> <b>024</b><br><span style="color:#888;">Disponible 24/7, gratuito y confidencial. Apoyo en crisis emocionales, ideación suicida y prevención.</span>',
        '<strong>Emergencias Generales</strong><br><span style="color:#7b96ff;">Número:</span> <b>112</b><br>Para situaciones urgentes que requieran asistencia inmediata (incluye crisis de salud mental).',
        '<strong>Teléfono de la Esperanza</strong><br><span style="color:#7b96ff;">Número:</span> <b>717 003 717</b><br><span style="color:#888;">Disponible 24/7, atención emocional y prevención del suicidio.</span>',
        '<strong>Teléfono ANAR (niños/as y adolescentes)</strong><br><span style="color:#7b96ff;">Número:</span> <b>900 202 010</b><br>Gratuito, confidencial y disponible 24/7.',
        '<strong>Teléfono contra el Acoso Escolar (Ministerio de Educación)</strong><br><span style="color:#7b96ff;">Número:</span> <b>900 018 018</b><br>Gratuito y confidencial, especializado en bullying.',
        '<strong>Teléfono 016 – Violencia de Género</strong><br><span style="color:#7b96ff;">Número:</span> <b>016</b><br>Atención 24/7 en múltiples idiomas. No deja rastro en la factura.',
        '<strong>Cruz Roja – Apoyo Psicológico</strong><br><span style="color:#7b96ff;">Número:</span> <b>900 107 917</b><br>Atención psicológica gratuita para situaciones de crisis.'
      ]
    },
    'argentina': {
      titulo: '📞 Líneas Nacionales de Emergencia y Salud Mental (Argentina)',
      lineas: [
        '<strong>Línea 135 – Prevención del Suicidio (CABA y Gran Buenos Aires)</strong><br><span style="color:#7b96ff;">Número:</span> <b>135</b><br>Desde otras provincias: <b>011 5275 1135</b> o <b>0800 345 1435</b><br>Gratuita, confidencial y disponible 24/7.',
        '<strong>Línea 141 – SEDRONAR</strong> <span style="color:#888;">(adicciones y consumos problemáticos)</span><br><span style="color:#7b96ff;">Número:</span> <b>141</b><br>Disponible 24/7, gratuita y con asistencia profesional.',
        '<strong>Línea 144 – Violencia de Género</strong><br><span style="color:#7b96ff;">Número:</span> <b>144</b><br>Disponible 24/7 en todo el país. Atiende a mujeres y personas de la comunidad LGBTIQ+ en situación de violencia.',
        '<strong>SAME / Emergencias Médicas</strong><br><span style="color:#7b96ff;">Número:</span> <b>107</b> (en CABA, con variaciones en otras provincias).',
        '<strong>Policía / Emergencias Generales</strong><br><span style="color:#7b96ff;">Número:</span> <b>911</b><br>Para situaciones de peligro inmediato, incluidas crisis graves de salud mental.',
        '<strong>Línea Nacional de Salud Mental (Ministerio de Salud de la Nación)</strong><br><span style="color:#7b96ff;">Número:</span> <b>0800 999 0091</b><br>Orientación sobre recursos de salud mental en el sistema público.'
      ]
    },
    'colombia': {
      titulo: '📞 Líneas Nacionales y Departamentales de Salud Mental (Colombia)',
      lineas: [
        '<strong>Línea Nacional de Teleorientación en Salud Mental</strong><br><span style="color:#7b96ff;">Número:</span> <b>106</b> (24/7, gratuita, nacional)',
        '<strong>Antioquia / Medellín / Itagüí</strong><br>604 540 7180 / (604) 444 4448 / 304 549 1696 / Emergencias: (604) 444 5918',
        '<strong>Arauca</strong><br>312 424 0420 (+ CRUE 125)',
        '<strong>Atlántico / Barranquilla</strong><br>317 621 8394 • Línea de la Vida: (605) 339 9999 • Línea Distrital: 315 300 2003 • WhatsApp: 318 804 4000',
        '<strong>Bogotá D.C.</strong><br>Línea 106 • WhatsApp: 300 754 8933 • Línea Púrpura: 01 8000 112 137 / WhatsApp 300 755 1846',
        '<strong>Bolívar / Cartagena</strong><br>125 / 317 440 9651',
        '<strong>Boyacá</strong><br>Línea Amiga 106',
        '<strong>Duitama / Sogamoso / Tunja</strong><br>Duitama: 313 418 1243 • Sogamoso: 310 852 7372 • Tunja: 318 465 3854',
        '<strong>Caldas / Manizales</strong><br>106 • Opción 3 al 123',
        '<strong>Caquetá</strong><br>311 570 7002',
        '<strong>Casanare</strong><br>Línea Amiga y WhatsApp: 318 422 2722, 321 453 6248',
        '<strong>Cesar</strong><br>WhatsApp: 310 566 8234',
        '<strong>Chocó</strong><br>314 890 7244',
        '<strong>Córdoba</strong><br>321 576 3189 / 318 282 6134 / 604 795 5824',
        '<strong>Cundinamarca</strong><br>Cota: 315 564 0149; Zipaquirá: 322 814 2684',
        '<strong>Guaviare</strong><br>316 248 6297',
        '<strong>Huila (Neiva y municipios)</strong><br>Neiva: 318 222 1777; Municipios: 321 907 3439, 315 401 2466',
        '<strong>La Guajira</strong><br>313 694 4849 / 01 8000 943 782',
        '<strong>Meta / Villavicencio</strong><br>Meta: 312 575 1135 • Calle "Yo Te Escucho": 316 390 7010 / 018 000 931 089',
        '<strong>Nariño</strong><br>Plataforma GLIA: 317 805 4329',
        '<strong>Putumayo</strong><br>Mocoa: 314 320 0909, Puerto Asís: 316 727 4051',
        '<strong>Quindío</strong><br>Fundación Construyéndonos: (606) 735 9950 (llamada y WhatsApp)',
        '<strong>Risaralda</strong><br>Atención 106: (606) 333 9610 / 01 8000 949 999 / WhatsApp: 315 560 8849',
        '<strong>San Andrés / Providencia / Santa Catalina</strong><br>Secretaría Salud: (608) 513 0801 ext. 190 (8 h-12 h y 14 h-18 h)',
        '<strong>Sucre</strong><br>Línea Departamental: 310 636 3779 (teléfono y WhatsApp)',
        '<strong>Tolima</strong><br>Línea Naranja "Yo Te Escucho": 318 607 2341 • "Háblalo": 317 318 8854',
        '<strong>Valle del Cauca / Cali</strong><br>Línea 106 • WhatsApp: 316 245 8423',
        '<strong>Vaupés</strong><br>Hospital San Antonio: 302 622 8859'
      ]
    }
  };

  if (countrySelect && emergencyContainer) {
    countrySelect.addEventListener('change', function() {
      const selectedCountry = this.value;
      
      // Limpiar el contenedor
      emergencyContainer.innerHTML = '';
      
      // Si se seleccionó un país, mostrar sus líneas de emergencia
      if (selectedCountry && emergencyData[selectedCountry]) {
        const countryData = emergencyData[selectedCountry];
        
        // Crear el título
        const title = document.createElement('h2');
        title.style.color = '#7b96ff';
        title.style.fontSize = '1.5rem';
        title.style.marginBottom = '1rem';
        title.style.textAlign = 'center';
        title.textContent = countryData.titulo;
        emergencyContainer.appendChild(title);
        
        // Crear la lista
        const ul = document.createElement('ul');
        ul.style.listStyle = 'none';
        ul.style.padding = '0';
        ul.style.maxWidth = '700px';
        ul.style.margin = '0 auto';
        
        // Agregar cada línea de emergencia
        countryData.lineas.forEach(linea => {
          const li = document.createElement('li');
          li.style.background = '#f3f4fe';
          li.style.borderRadius = '16px';
          li.style.marginBottom = '1.2rem';
          li.style.padding = '1.2rem 1.5rem';
          li.style.boxShadow = '0 2px 8px #a084e81a';
          li.innerHTML = linea;
          ul.appendChild(li);
        });
        
        emergencyContainer.appendChild(ul);
      }
    });
  }
});
const STORAGE_KEY = 'user_session';

function isAuthenticated() {
  return !!localStorage.getItem(STORAGE_KEY);
}

function updateUIVisibility() {
  const formulario = document.getElementById('formulario');
  const mainHeader = document.getElementById('main-header');
  const inicio = document.getElementById('inicio');
  const trastornos = document.getElementById('trastornos');
  const videos = document.getElementById('videos');
  const lineasEmergencia = document.getElementById('lineas-emergencia');
  const sobreNosotros = document.getElementById('sobre-nosotros');
  const cuestionario = document.getElementById('cuestionario');

  if (isAuthenticated()) {
    formulario.classList.add('hidden');
    mainHeader.classList.remove('hidden');
    inicio.classList.remove('hidden');
    trastornos.classList.add('hidden');
    videos.classList.add('hidden');
    lineasEmergencia.classList.add('hidden');
    sobreNosotros.classList.add('hidden');
    cuestionario.classList.add('hidden');
  } else {
    formulario.classList.remove('hidden');
    mainHeader.classList.add('hidden');
    inicio.classList.add('hidden');
    trastornos.classList.add('hidden');
    videos.classList.add('hidden');
    lineasEmergencia.classList.add('hidden');
    sobreNosotros.classList.add('hidden');
    cuestionario.classList.add('hidden');
  }
}

// Acordeón de grupos de trastornos
function toggleTrastornos(categoriaId) {
  const container = document.getElementById(categoriaId);
  const toggleIcon = container.previousElementSibling.querySelector('.toggle-icon');
  container.classList.toggle('active');
  toggleIcon.textContent = container.classList.contains('active') ? '−' : '+';
}

// Mostrar información detallada de un trastorno (actualizado para botones)
function mostrarInfo(trastornoId) {
  // Mostrar mariposa animada
  const mariposa = document.getElementById('mariposa-animada');
  if (mariposa) {
    mariposa.classList.remove('hidden');
    mariposa.style.opacity = '1';
    // Reinicia animación
    const img = mariposa.querySelector('img');
    img.style.animation = 'none';
    void img.offsetWidth;
    img.style.animation = 'mariposaVuela 1.6s cubic-bezier(.68,-0.55,.27,1.55) forwards';
    setTimeout(() => {
      mariposa.classList.add('hidden');
      mariposa.style.opacity = '0';
      mostrarTarjeta(trastornoId);
    }, 1600);
  } else {
    mostrarTarjeta(trastornoId);
  }
}

function mostrarTarjeta(trastornoId) {
  const trastorno = trastornosData[trastornoId];
  if (!trastorno) return;
  document.getElementById('info-titulo').textContent = trastorno.titulo;
  document.getElementById('info-descripcion').textContent = trastorno.descripcion;
  const listaSintomas = document.getElementById('info-lista-sintomas');
  listaSintomas.innerHTML = '';
  if (trastorno.sintomas && trastorno.sintomas.length) {
    document.getElementById('info-sintomas-titulo').classList.remove('hidden');
    trastorno.sintomas.forEach(sintoma => {
      const li = document.createElement('li');
      li.textContent = sintoma;
      listaSintomas.appendChild(li);
    });
  } else {
    document.getElementById('info-sintomas-titulo').classList.add('hidden');
  }
  // Imagen
  const imagen = document.getElementById('info-imagen');
  if (imagen) {
    imagen.onerror = function() {
      this.src = 'imagenes/default.jpg'; // Imagen por defecto si no existe
    };
    imagen.src = `imagenes/${trastornoId}.jpg`;
    imagen.alt = trastorno.titulo;
  }
  // Video (si existe)
  if (trastorno.videoId) {
    document.getElementById('info-video-titulo').classList.remove('hidden');
    document.getElementById('video-container').innerHTML = `
      <iframe 
        width="100%" 
        height="220" 
        src="https://www.youtube.com/embed/${trastorno.videoId}" 
        frameborder="0" 
        allowfullscreen>
      </iframe>
    `;
  } else {
    document.getElementById('info-video-titulo').classList.add('hidden');
    document.getElementById('video-container').innerHTML = '';
  }
  document.getElementById('info-detallada').classList.add('active');
}

// Eventos DOM
document.addEventListener('DOMContentLoaded', function () {
  updateUIVisibility();

  // Registro/inicio de sesión
  const formularioRegistro = document.getElementById('formulario-registro');
  const mensajeError = document.getElementById('mensaje-error');
  const userWelcomeText = document.getElementById('userWelcomeText');

  if (formularioRegistro) {
    formularioRegistro.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const password = document.getElementById('password').value.trim();

      if (nombre && correo && password) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ nombre, correo }));
        userWelcomeText.textContent = `¡Bienvenido, ${nombre}!`;
        mensajeError.textContent = '';
        updateUIVisibility();
        document.querySelectorAll('main > section').forEach(section => {
          section.classList.add('hidden');
        });
        document.getElementById('inicio').classList.remove('hidden');
      } else {
        mensajeError.textContent = 'Por favor, completa todos los campos.';
      }
    });
  }

// Mostrar solo el formulario al inicio
document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.getElementById('formulario');
  const mainHeader = document.getElementById('main-header');
  const secciones = document.querySelectorAll('main > section:not(#formulario)');

  // Mostrar solo el formulario al cargar
  formulario.classList.remove('formulario-oculto');
  mainHeader.classList.add('hidden');
  secciones.forEach(sec => sec.classList.add('hidden'));

  // Ejemplo: al hacer login/registro exitoso
  // Reemplaza esto por tu lógica real de autenticación
  document.querySelector('.form-box form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    formulario.classList.add('formulario-oculto');
    mainHeader.classList.remove('hidden');
    document.getElementById('inicio').classList.remove('hidden');
  });
});
  // Cerrar sesión
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('user_session');
      updateUIVisibility();
    });
  }

  // Navegación entre secciones
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
      });
      document.getElementById(sectionId).classList.remove('hidden');
    });
  });

  // Menú hamburguesa responsive
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Carrusel de imágenes
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  if (slides.length > 0) {
    setInterval(nextSlide, 5000);
    showSlide(currentSlide);
  }

  // Buscador de trastornos funcional para botones
  const searchInput = document.getElementById('trastorno-search');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase();
      document.querySelectorAll('.trastorno-btn').forEach(btn => {
        const texto = btn.textContent.toLowerCase();
        if (texto.includes(query)) {
          btn.style.display = '';
        } else {
          btn.style.display = 'none';
        }
      });
    });
  }

  // Cerrar panel de información detallada
  const cerrarInfoBtn = document.getElementById('cerrar-info');
  if (cerrarInfoBtn) {
    cerrarInfoBtn.addEventListener('click', function () {
      document.getElementById('info-detallada').classList.remove('active');
    });
  }
  const infoDetallada = document.getElementById('info-detallada');
  if (infoDetallada) {
    infoDetallada.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });
  }

  // Botones de trastornos
  document.querySelectorAll('.trastorno-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      mostrarInfo(this.getAttribute('onclick').match(/'([^']+)'/)[1]);
    });
  });
});

const trastornosData = {
    'discapacidad-intelectual': {
    titulo: 'Discapacidad intelectual',
    descripcion: 'Limitaciones en el funcionamiento intelectual y adaptativo.',
    sintomas: [
      'Dificultad en el razonamiento y resolución de problemas',
      'Retraso en el aprendizaje académico',
      'Problemas en la comunicación',
      'Dificultades en habilidades sociales'
    ],
  },
  'tea': {
    titulo: 'Trastornos del espectro autista (TEA)',
    descripcion: 'Dificultades en comunicación e interacción social.',
    sintomas: [
      'Dificultad para interpretar señales sociales',
      'Patrones de comportamiento repetitivos',
      'Intereses restringidos',
      'Sensibilidad sensorial'
    ],
  },
  'tdah': {
    titulo: 'TDAH',
    descripcion: 'Dificultad para mantener la atención y controlar impulsos.',
    sintomas: [
      'Inatención en tareas',
      'Comportamiento impulsivo',
      'Hiperactividad inapropiada para la edad'
    ],
  },
  'aprendizaje': {
    titulo: 'Trastornos específicos del aprendizaje',
    descripcion: 'Dificultades en la adquisición de habilidades académicas.',
    sintomas: [
      'Problemas con la lectura, escritura o matemáticas',
      'Rendimiento escolar bajo',
      'Necesidad de apoyo educativo'
    ],
  },
  'comunicacion': {
    titulo: 'Trastornos de la comunicación',
    descripcion: 'Problemas en el habla, lenguaje o comunicación social.',
    sintomas: [
      'Dificultad para expresar ideas',
      'Problemas para comprender el lenguaje',
      'Alteraciones en la pronunciación'
    ],
  },
  'motores': {
    titulo: 'Trastornos motores (tics, Tourette, etc.)',
    descripcion: 'Alteraciones en el control del movimiento.',
    sintomas: [
      'Movimientos involuntarios',
      'Tics motores o vocales',
      'Dificultad para controlar impulsos motores'
    ],
  },
  'depresivo-mayor': {
    titulo: 'Trastorno depresivo mayor',
    descripcion: 'Episodios de ánimo deprimido y pérdida de interés.',
    sintomas: [
      'Tristeza persistente',
      'Pérdida de interés',
      'Fatiga',
      'Alteraciones del sueño'
    ],
  },
  'distimia': {
    titulo: 'Trastorno depresivo persistente (distimia)',
    descripcion: 'Estado depresivo crónico de menor intensidad.',
    sintomas: [
      'Ánimo bajo durante años',
      'Baja autoestima',
      'Poca energía'
    ],
  },
  'disforico-premenstrual': {
    titulo: 'Trastorno disfórico premenstrual',
    descripcion: 'Síntomas afectivos y físicos marcados en la fase lútea.',
    sintomas: [
      'Irritabilidad',
      'Cambios de humor',
      'Fatiga',
      'Síntomas físicos'
    ],
  },
  'depresivo-sustancias': {
    titulo: 'Trastorno depresivo inducido por sustancias',
    descripcion: 'Síntomas depresivos atribuibles a una sustancia.',
    sintomas: [
      'Ánimo bajo tras consumo de sustancias',
      'Pérdida de interés',
      'Fatiga'
    ],
  },
  // --- Grupo 3: Trastornos de ansiedad ---
  'tag': {
    titulo: 'Trastorno de ansiedad generalizada (TAG)',
    descripcion: 'Preocupación excesiva y persistente sobre diversas áreas de la vida.',
    sintomas: [
      'Ansiedad constante',
      'Dificultad para controlar la preocupación',
      'Inquietud',
      'Problemas de concentración'
    ],
  },
  'panico': {
    titulo: 'Trastorno de pánico',
    descripcion: 'Ataques repentinos de miedo intenso y síntomas físicos.',
    sintomas: [
      'Palpitaciones',
      'Sudoración',
      'Sensación de ahogo',
      'Miedo a perder el control'
    ],
  },
  'fobia-especifica': {
    titulo: 'Fobia específica',
    descripcion: 'Miedo intenso y persistente a objetos o situaciones concretas.',
    sintomas: [
      'Evitación de la situación temida',
      'Ansiedad intensa',
      'Síntomas físicos al exponerse'
    ],
  },
  'fobia-social': {
    titulo: 'Fobia social (ansiedad social)',
    descripcion: 'Miedo intenso a situaciones sociales o de desempeño.',
    sintomas: [
      'Temor a ser juzgado',
      'Evitación de eventos sociales',
      'Ansiedad anticipatoria'
    ],
  },
  'agorafobia': {
    titulo: 'Agorafobia',
    descripcion: 'Miedo a estar en lugares donde escapar podría ser difícil.',
    sintomas: [
      'Evitar espacios públicos',
      'Ansiedad fuera de casa',
      'Dependencia de acompañantes'
    ],
  },
  'ansiedad-separacion': {
    titulo: 'Ansiedad por separación',
    descripcion: 'Ansiedad excesiva al separarse de figuras de apego.',
    sintomas: [
      'Preocupación por separación',
      'Miedo a perder a seres queridos',
      'Síntomas físicos al separarse'
    ],
  },
  'mutismo-selectivo': {
    titulo: 'Mutismo selectivo',
    descripcion: 'Incapacidad para hablar en ciertas situaciones sociales.',
    sintomas: [
      'Silencio en contextos específicos',
      'Comunicación normal en casa',
      'Interferencia en el rendimiento escolar'
    ],
  },
  // --- 4. Trastornos bipolares y relacionados ---
  'bipolar-i': {
    titulo: 'Trastorno bipolar tipo I',
    descripcion: 'Episodios maníacos y depresivos severos.',
    sintomas: [
      'Alteraciones del estado de ánimo',
      'Energía elevada o irritable',
      'Dificultades en las relaciones interpersonales'
    ],
  },
  'bipolar-ii': {
    titulo: 'Trastorno bipolar tipo II',
    descripcion: 'Episodios hipomaníacos y depresivos.',
    sintomas: [
      'Alteraciones del estado de ánimo',
      'Energía elevada o irritable',
      'Dificultades en las relaciones interpersonales'
    ],
  },
    'ciclotimico': {
    titulo: 'Trastorno ciclotímico',
    descripcion: 'Trastorno del estado de ánimo caracterizado por períodos de síntomas hipomaníacos y depresivos.',
    sintomas: [
      'Cambios de humor',
      'Energía variable',
      'Dificultades en las relaciones interpersonales'
    ],
  },

  // --- Grupo 1: Trastornos de ansiedad ---
  'trastorno-ansioso-generalizado': {
    titulo: 'Trastorno de ansiedad generalizada',
    descripcion: 'Preocupación excesiva y persistente sobre diversas actividades o eventos.',
    sintomas: [
      'Inquietud o sensación de estar atrapado',
      'Fatiga fácil',
      'Dificultad para concentrarse',
      'Irritabilidad',
      'Tensión muscular',
      'Trastornos del sueño'
    ],
  },
  'trastorno-panic': {
    titulo: 'Trastorno de pánico',
    descripcion: 'Episodios recurrentes de miedo intenso acompañados de síntomas físicos.',
    sintomas: [
      'Palpitaciones o ritmo cardíaco acelerado',
      'Sudoración',
      'T temblores o sacudidas',
      'Sensación de falta de aliento',
      'Dolor o malestar en el pecho',
      'Náuseas o malestar abdominal',
      'Mareos, aturdimiento o desmayo',
      'Escalofríos o sensación de calor',
      'Parestesias (sensaciones de hormigueo o adormecimiento)',
      'Desrealización o despersonalización',
      'Miedo a perder el control o "volverse loco"',
      'Miedo a morir'
    ],
  },
  'fobia-social': {
    titulo: 'Fobia social',
    descripcion: 'Miedo intenso y persistente a situaciones sociales o de desempeño.',
    sintomas: [
      'Ansiedad en situaciones sociales',
      'Preocupación por ser juzado o humillado',
      'Evitación de situaciones sociales',
      'Síntomas físicos como rubor, sudoración o temblor'
    ],
  },
  'especifica': {
    titulo: 'Fobia específica',
    descripcion: 'Miedo intenso y persistente a un objeto o situación específica.',
    sintomas: [
      'Ansiedad al estar expuesto al objeto o situación temida',
      'Evitación del objeto o situación temida',
      'Síntomas físicos como palpitaciones, sudoración o temblor'
    ],
  },
  'trastorno-obsesivo-compulsivo': {
    titulo: 'Trastorno obsesivo-compulsivo (TOC)',
    descripcion: 'Presencia de obsesiones y compulsiones que causan malestar significativo.',
    sintomas: [
      'Obsesiones (pensamientos intrusivos y no deseados)',
      'Compulsiones (conductas repetitivas para reducir la ansiedad)',
      'Interferencia en la vida diaria'
    ],
  },
  'trastorno-estrés-postraumático': {
    titulo: 'Trastorno de estrés postraumático (TEPT)',
    descripcion: 'Síntomas tras experimentar un evento traumático.',
    sintomas: [
      'Recuerdos intrusivos',
      'Pesadillas',
      'Evitación de recuerdos',
      'Hipervigilancia'
    ],
  },
  'trastorno-estrés-agudo': {
    titulo: 'Trastorno de estrés agudo',
    descripcion: 'Síntomas similares al TEPT pero de corta duración.',
    sintomas: [
      'Ansiedad intensa',
      'Despersonalización',
      'Alteraciones del sueño'
    ],
  },
  'trastorno-adaptacion': {
    titulo: 'Trastorno de adaptación',
    descripcion: 'Malestar emocional tras un cambio o evento estresante.',
    sintomas: [
      'Tristeza',
      'Ansiedad',
      'Dificultad para adaptarse'
    ],
  },
  'trastorno-reactivo-vinculacion': {
    titulo: 'Trastorno reactivo de la vinculación (en infancia)',
    descripcion: 'Dificultad para establecer vínculos afectivos.',
    sintomas: [
      'Retraimiento social',
      'Falta de respuesta emocional',
      'Dificultad para relacionarse'
    ],
  },
  'relacion-desinhibida': {
    titulo: 'Trastorno de relación social desinhibida',
    descripcion: 'Conducta social excesivamente familiar con desconocidos.',
    sintomas: [
      'Falta de cautela con extraños',
      'Conducta social inapropiada'
    ],
  },

  // --- Grupo 2: Trastornos del estado de ánimo ---
  'trastorno-depresivo-mayor': {
    titulo: 'Trastorno depresivo mayor',
    descripcion: 'Estado de ánimo persistentemente bajo y pérdida de interés en actividades.',
    sintomas: [
      'Tristeza profunda',
      'Pérdida de interés o placer',
      'Fatiga o falta de energía',
      'Sentimientos de inutilidad o culpa',
      'Dificultad para concentrarse',
      'Alteraciones del sueño',
      'Cambios en el apetito o peso'
    ],
  },
  'trastorno-distimico': {
    titulo: 'Trastorno distímico',
    descripcion: 'Tristeza crónica y falta de interés, menos severo que el trastorno depresivo mayor.',
    sintomas: [
      'Estado de ánimo bajo la mayor parte del día',
      'Pérdida de interés en actividades habituales',
      'Fatiga o falta de energía',
      'Baja autoestima',
      'Dificultad para concentrarse',
      'Alteraciones del sueño o apetito'
    ],
  },
  'trastorno-bipolar-1': {
    titulo: 'Trastorno bipolar tipo I',
    descripcion: 'Episodios de manía y depresión mayor.',
    sintomas: [
      'Euforia o irritabilidad',
      'Aumento de energía',
      'Pensamientos acelerados',
      'Episodios depresivos'
    ],
  },
  'trastorno-bipolar-2': {
    titulo: 'Trastorno bipolar tipo II',
    descripcion: 'Episodios de hipomanía y depresión mayor.',
    sintomas: [
      'Ánimo elevado menos intenso',
      'Depresión recurrente',
      'Cambios de energía'
    ],
  },
  'trastorno-ciclotimico': {
    titulo: 'Trastorno ciclotímico',
    descripcion: 'Oscilaciones crónicas entre síntomas hipomaníacos y depresivos leves.',
    sintomas: [
      'Cambios frecuentes de ánimo',
      'Síntomas leves de manía y depresión'
    ],
  },

  // --- Grupo 3: Trastornos psicóticos ---
  'esquizofrenia': {
    titulo: 'Esquizofrenia',
    descripcion: 'Trastorno psicótico con síntomas positivos y negativos.',
    sintomas: [
      'Alucinaciones',
      'Delirios',
      'Afecto plano',
      'Dificultad para pensar claramente'
    ],
  },
  'trastorno-esquizoafectivo': {
    titulo: 'Trastorno esquizoafectivo',
    descripcion: 'Síntomas de esquizofrenia y trastornos del estado de ánimo.',
    sintomas: [
      'Alucinaciones',
      'Delirios',
      'Episodios depresivos o maníacos'
    ],
  },
  'trastorno-esquizofreniforme': {
    titulo: 'Trastorno esquizofreniforme',
    descripcion: 'Síntomas de esquizofrenia de duración breve.',
    sintomas: [
      'Alucinaciones',
      'Delirios',
      'Desorganización del pensamiento'
    ],
  },
  'trastorno-delirante': {
    titulo: 'Trastorno delirante',
    descripcion: 'Presencia de delirios persistentes sin otros síntomas psicóticos.',
    sintomas: [
      'Ideas delirantes',
      'Funcionamiento relativamente conservado'
    ],
  },
  'trastorno-psicotico-breve': {
    titulo: 'Trastorno psicótico breve',
    descripcion: 'Síntomas psicóticos de corta duración.',
    sintomas: [
      'Alucinaciones',
      'Delirios',
      'Desorganización'
    ],
  },

  // --- Grupo 4: Trastornos obsesivo-compulsivos y relacionados ---
  'toc': {
    titulo: 'Trastorno obsesivo-compulsivo (TOC)',
    descripcion: 'Pensamientos obsesivos y conductas compulsivas repetitivas.',
    sintomas: [
      'Obsesiones recurrentes',
      'Compulsiones para reducir ansiedad',
      'Interferencia en la vida diaria'
    ],
  },
  'dismorfico': {
    titulo: 'Trastorno dismórfico corporal',
    descripcion: 'Preocupación excesiva por defectos físicos imaginarios o mínimos.',
    sintomas: [
      'Autoobservación frecuente',
      'Evitar situaciones sociales',
      'Conductas repetitivas para ocultar defectos'
    ],
  },
  'acumulacion': {
    titulo: 'Trastorno de acumulación',
    descripcion: 'Dificultad para desechar objetos, acumulando excesivamente.',
    sintomas: [
      'Dificultad para tirar cosas',
      'Desorden en el hogar',
      'Ansiedad al desechar objetos'
    ],
  },
  'tricotilomania': {
    titulo: 'Trastotno por arrancarse el cabello',
    descripcion: 'Arrancarse el cabello de forma recurrente.',
    sintomas: [
      'Pérdida de cabello',
      'Intentos fallidos de detener la conducta',
      'Malestar emocional'
    ],
  },
  'dermatilomania': {
    titulo: 'Dermatilomanía (rascado compulsivo de piel)',
    descripcion: 'Rascarse la piel de forma repetitiva y compulsiva.',
    sintomas: [
      'Lesiones cutáneas',
      'Intentos de controlar el rascado',
      'Ansiedad asociada'
    ],
  },

  // --- Grupo 5: Trastornos relacionados con trauma y factores de estrés ---
  'tept': {
    titulo: 'Trastorno de estrés postraumático (TEPT)',
    descripcion: 'Síntomas tras experimentar un evento traumático.',
    sintomas: [
      'Recuerdos intrusivos',
      'Pesadillas',
      'Evitación de recuerdos',
      'Hipervigilancia'
    ],
  },
  'estres-agudo': {
    titulo: 'Trastorno de estrés agudo',
    descripcion: 'Síntomas similares al TEPT pero de corta duración.',
    sintomas: [
      'Ansiedad intensa',
      'Despersonalización',
      'Alteraciones del sueño'
    ],
  },
  'adaptacion': {
    titulo: 'Trastorno de adaptación',
    descripcion: 'Malestar emocional tras un cambio o evento estresante.',
    sintomas: [
      'Tristeza',
      'Ansiedad',
      'Dificultad para adaptarse'
    ],
  },
  'reactivo-vinculacion': {
    titulo: 'Trastorno reactivo de la vinculación (en infancia)',
    descripcion: 'Dificultad para establecer vínculos afectivos.',
    sintomas: [
      'Retraimiento social',
      'Falta de respuesta emocional',
      'Dificultad para relacionarse'
    ],
  },
  'relacion-social-desinhibida': {
    titulo: 'Trastorno de relación social desinhibida (en infancia)',
    descripcion: 'Conducta social excesivamente familiar con desconocidos.',
    sintomas: [
      'Falta de cautela con extraños',
      'Conducta social inapropiada'
    ],
  },

  // --- Grupo 6: Trastornos del sueño-vigilia ---
  'insomnio': {
    titulo: 'Insomnio',
    descripcion: 'Dificultad para iniciar o mantener el sueño.',
    sintomas: [
      'Despertares frecuentes',
      'Fatiga diurna',
      'Irritabilidad'
    ],
  },
  'hipersomnia': {
    titulo: 'Hipersomnia',
    descripcion: 'Somnolencia excesiva durante el día.',
    sintomas: [
      'Dormir demasiado',
      'Dificultad para despertar',
      'Falta de energía'
    ],
  },
  'narcolepsia': {
    titulo: 'Narcolepsia',
    descripcion: 'Ataques súbitos de sueño durante el día.',
    sintomas: [
      'Pérdida súbita de tono muscular',
      'Sueño irresistible',
      'Alucinaciones al dormir'
    ],
  },
  'apnea': {
    titulo: 'Apnea del sueño',
    descripcion: 'Interrupciones de la respiración durante el sueño.',
    sintomas: [
      'Ronquidos fuertes',
      'Despertares bruscos',
      'Somnolencia diurna'
    ],
  },
  'ritmo-circadiano': {
    titulo: 'Trastornos del ritmo circadiano',
    descripcion: 'Desajuste entre el reloj biológico y el entorno.',
    sintomas: [
      'Dificultad para dormir en horarios convencionales',
      'Fatiga',
      'Problemas de concentración'
    ],
  },
  'parasomnias': {
    titulo: 'Parasomnias (sonambulismo, terrores nocturnos, pesadillas recurrentes)',
    descripcion: 'Conductas anormales durante el sueño.',
    sintomas: [
      'Sonambulismo',
      'Terrores nocturnos',
      'Pesadillas frecuentes'
    ],
  },

  // --- Grupo 7: Trastornos de la conducta alimentaria y de la ingesta ---
  'anorexia': {
    titulo: 'Anorexia nerviosa',
    descripcion: 'Restricción de la ingesta y miedo intenso a ganar peso.',
    sintomas: [
      'Pérdida de peso significativa',
      'Distorsión de la imagen corporal',
      'Restricción alimentaria'
    ],
  },
  'bulimia': {
    titulo: 'Bulimia nerviosa',
    descripcion: 'Episodios de ingesta excesiva seguidos de conductas compensatorias.',
    sintomas: [
      'Atracones',
      'Vómitos autoinducidos',
      'Preocupación por el peso'
    ],
  },
  'atracon': {
    titulo: 'Trastorno por atracón',
    descripcion: 'Episodios recurrentes de ingesta excesiva sin conductas compensatorias.',
    sintomas: [
      'Comer grandes cantidades de comida',
      'Sentimiento de culpa',
      'Falta de control'
    ],
  },
  'pica': {
    titulo: 'Pica',
    descripcion: 'Ingesta de sustancias no nutritivas.',
    sintomas: [
      'Comer tierra, papel, cabello, etc.',
      'Problemas digestivos'
    ],
  },
  'rumiacion': {
    titulo: 'Trastorno de rumiación',
    descripcion: 'Regurgitación repetida de alimentos.',
    sintomas: [
      'Regurgitación frecuente',
      'Malestar abdominal'
    ],
  },
  'evitacion-ingesta': {
    titulo: 'Evitación/restricción de la ingesta de alimentos',
    descripcion: 'Evitar ciertos alimentos sin preocupación por el peso.',
    sintomas: [
      'Pérdida de peso',
      'Deficiencias nutricionales',
      'Evitar texturas o sabores'
    ],
  },

  // --- Grupo 8: Trastornos relacionados con sustancias y adicciones ---
  'alcohol': {
    titulo: 'Trastornos por consumo de alcohol',
    descripcion: 'Consumo problemático y dependencia del alcohol.',
    sintomas: [
      'Dificultad para controlar el consumo',
      'Síntomas de abstinencia',
      'Impacto en la vida social y laboral'
    ],
  },
  'otras-sustancias': {
    titulo: 'Trastornos por consumo de cannabis, cocaína, opioides, etc.',
    descripcion: 'Consumo problemático y dependencia de sustancias.',
    sintomas: [
      'Uso recurrente de sustancias',
      'Síntomas de abstinencia',
      'Problemas legales o sociales'
    ],
  },
  'ludopatia': {
    titulo: 'Juego patológico (ludopatía)',
    descripcion: 'Necesidad incontrolable de apostar o jugar.',
    sintomas: [
      'Pérdida de control',
      'Problemas económicos',
      'Mentiras sobre el juego'
    ],
  },

  // --- Grupo 9: Trastornos de la personalidad ---
  'antisocial': {
    titulo: 'Trastorno de la personalidad antisocial',
    descripcion: 'Desprecio por normas sociales y derechos de los demás.',
    sintomas: [
      'Conducta impulsiva',
      'Falta de remordimiento',
      'Engaño frecuente'
    ],
  },
  'borderline': {
    titulo: 'Trastorno límite (Borderline)',
    descripcion: 'Inestabilidad emocional y de relaciones interpersonales.',
    sintomas: [
      'Cambios bruscos de ánimo',
      'Miedo al abandono',
      'Impulsividad'
    ],
  },
  'narcisista': {
    titulo: 'Trastorno de la personalidad narcisista',
    descripcion: 'Sentimiento de grandeza y necesidad de admiración.',
    sintomas: [
      'Falta de empatía',
      'Necesidad de atención',
      'Sentimiento de superioridad'
    ],
  },
  'histrionico': {
    titulo: 'Trastorno de la personalidad histriónica',
    descripcion: 'Búsqueda constante de atención y aprobación.',
    sintomas: [
      'Comportamiento teatral',
      'Emociones superficiales',
      'Necesidad de ser el centro de atención'
    ],
  },
  'ocd-personalidad': {
    titulo: 'Trastorno obsesivo-compulsivo de la personalidad',
    descripcion: 'Preocupación excesiva por el orden y el perfeccionismo.',
    sintomas: [
      'Rigidez',
      'Perfeccionismo',
      'Dificultad para delegar'
    ],
  },
  'evitativo': {
    titulo: 'Trastorno de la personalidad evitativa',
    descripcion: 'Evitación de situaciones sociales por miedo al rechazo.',
    sintomas: [
      'Baja autoestima',
      'Miedo a la crítica',
      'Aislamiento social'
    ],
  },
  'dependiente': {
    titulo: 'Trastorno de la personalidad dependiente',
    descripcion: 'Necesidad excesiva de ser cuidado por otros.',
    sintomas: [
      'Dificultad para tomar decisiones',
      'Miedo a la separación',
      'Sumisión'
    ],
  },
  'esquizoide': {
    titulo: 'Trastorno de la personalidad esquizoide',
    descripcion: 'Desapego de las relaciones sociales y restricción emocional.',
    sintomas: [
      'Preferencia por la soledad',
      'Falta de interés en relaciones',
      'Emociones limitadas'
    ],
  },
  'esquizotipico': {
    titulo: 'Trastorno de la personalidad esquizotípica',
    descripcion: 'Patrones de pensamiento y comportamiento excéntricos.',
    sintomas: [
      'Creencias extrañas',
      'Pensamiento mágico',
      'Aislamiento social'
    ],
  },
  'paranoide': {
    titulo: 'Trastorno de la personalidad paranoide',
    descripcion: 'Desconfianza y suspicacia hacia los demás.',
    sintomas: [
      'Sospechas infundadas',
      'Rencor persistente',
      'Sensibilidad excesiva'
    ],
  },

  // --- Grupo 10: Espectro de la esquizofrenia y otros trastornos psicóticos ---
  'esquizofrenia': {
    titulo: 'Esquizofrenia',
    descripcion: 'Trastorno psicótico con síntomas positivos y negativos.',
    sintomas: [
      'Alucinaciones',
      'Delirios',
      'Afecto plano',
      'Dificultad para pensar claramente'
    ],
  },
  'esquizoafectivo': {
    titulo: 'Trastorno esquizoafectivo',
    descripcion: 'Síntomas de esquizofrenia y trastornos del estado de ánimo.',
    sintomas: [
      'Alucinaciones',
      'Delirios',
      'Episodios depresivos o maníacos'
    ],
  },
  'esquizofreniforme': {
    titulo: 'Trastorno esquizofreniforme',
    descripcion: 'Síntomas de esquizofrenia de duración breve.',
    sintomas: [
      'Alucinaciones',
      'Delirios',
      'Desorganización del pensamiento'
    ],
  },
  'delirante': {
    titulo: 'Trastorno delirante',
    descripcion: 'Presencia de delirios persistentes sin otros síntomas psicóticos.',
    sintomas: [
      'Ideas delirantes',
      'Funcionamiento relativamente conservado'
    ],
  },
  'psicotico-breve': {
    titulo: 'Trastorno psicótico breve',
    descripcion: 'Síntomas psicóticos de corta duración.',
    sintomas: [
      'Alucinaciones',
      'Delirios',
      'Desorganización'
    ],
  },

  // --- Grupo 11: Trastornos disociativos ---
  'amnesia-disociativa': {
    titulo: 'Amnesia disociativa',
    descripcion: 'Pérdida de memoria de información personal importante.',
    sintomas: [
      'Olvidos significativos',
      'Desorientación',
      'Confusión'
    ],
  },
  'identidad-disociativa': {
    titulo: 'Trastorno de identidad disociativo (personalidades múltiples)',
    descripcion: 'Presencia de dos o más identidades distintas.',
    sintomas: [
      'Cambios de personalidad',
      'Lagunas de memoria',
      'Alteraciones en el comportamiento'
    ],
  },
  'despersonalizacion': {
    titulo: 'Despersonalización / desrealización',
    descripcion: 'Sensación de estar separado de uno mismo o del entorno.',
    sintomas: [
      'Sentirse irreal',
      'Desconexión emocional',
      'Alteración de la percepción'
    ],
  },

  // --- Grupo 12: Trastornos de síntomas somáticos y relacionados ---
  'sintomas-somaticos': {
    titulo: 'Trastorno de síntomas somáticos',
    descripcion: 'Preocupación excesiva por síntomas físicos.',
    sintomas: [
      'Dolores recurrentes',
      'Preocupación por la salud',
      'Visitas frecuentes al médico'
    ],
  },
  'hipocondria': {
    titulo: 'Trastorno de ansiedad por enfermedad (hipocondría)',
    descripcion: 'Preocupación por tener una enfermedad grave.',
    sintomas: [
      'Interpretación errónea de síntomas',
      'Ansiedad por la salud',
      'Búsqueda de pruebas médicas'
    ],
  },
  'conversion': {
    titulo: 'Trastorno de conversión',
    descripcion: 'Síntomas neurológicos sin causa médica identificable.',
    sintomas: [
      'Parálisis',
      'Ceguera',
      'Convulsiones no epilépticas'
    ],
  },

  // --- Grupo 13: Trastornos del control de impulsos y conducta en la infancia ---
  'negativista': {
    titulo: 'Trastorno negativista desafiante',
    descripcion: 'Patrón de comportamiento desafiante y desobediente.',
    sintomas: [
      'Discusión frecuente con adultos',
      'Desafío a la autoridad',
      'Irritabilidad'
    ],
  },
  'explosivo': {
    titulo: 'Trastorno explosivo intermitente',
    descripcion: 'Episodios de agresividad impulsiva.',
    sintomas: [
      'Arranques de ira',
      'Agresión física o verbal',
      'Falta de control'
    ],
  },
  'conducta': {
    titulo: 'Trastorno de conducta',
    descripcion: 'Patrón persistente de violación de normas sociales.',
    sintomas: [
      'Agresión a personas o animales',
      'Destrucción de propiedad',
      'Robo o engaño'
    ],
  },
  'piromania': {
    titulo: 'Piromanía',
    descripcion: 'Impulso recurrente de prender fuego.',
    sintomas: [
      'Fascinación por el fuego',
      'Incendios intencionados',
      'Placer o alivio tras prender fuego'
    ],
  },
  'cleptomania': {
    titulo: 'Cleptomanía',
    descripcion: 'Impulso recurrente de robar objetos.',
    sintomas: [
      'Robo de objetos sin valor',
      'Tensión antes del robo',
      'Alivio tras el robo'
    ],
  },

  // --- Grupo 14: Disforia de género ---
  'disforia-genero': {
    titulo: 'Disforia de género',
    descripcion: 'Malestar por incongruencia entre género sentido y asignado.',
    sintomas: [
      'Deseo de ser del otro género',
      'Malestar con características sexuales',
      'Búsqueda de transición'
    ],
  },

  // --- Grupo 15: Trastornos parafílicos ---
  'voyeurismo': {
    titulo: 'Voyeurismo',
    descripcion: 'Obtención de placer al observar personas desnudas o en actividad sexual.',
    sintomas: [
      'Observación secreta',
      'Excitación sexual por mirar',
      'Dificultad para controlar el impulso'
    ],
  },
  'exhibicionismo': {
    titulo: 'Exhibicionismo',
    descripcion: 'Exposición de los propios genitales a personas desconocidas.',
    sintomas: [
      'Exposición pública',
      'Excitación sexual por mostrar',
      'Malestar o problemas legales'
    ],
  },
  'frotteurismo': {
    titulo: 'Frotteurismo',
    descripcion: 'Frotarse contra personas sin su consentimiento.',
    sintomas: [
      'Conducta repetitiva',
      'Excitación sexual',
      'Problemas legales'
    ],
  },
  'sadismo-sexual': {
    titulo: 'Sadismo sexual',
    descripcion: 'Excitación sexual al infligir sufrimiento físico o psicológico.',
    sintomas: [
      'Conductas de dominación',
      'Placer por el dolor ajeno',
      'Fantasías recurrentes'
    ],
  },
  'masoquismo-sexual': {
    titulo: 'Masoquismo sexual',
    descripcion: 'Excitación sexual al recibir sufrimiento físico o psicológico.',
    sintomas: [
      'Placer por el dolor propio',
      'Búsqueda de situaciones humillantes',
      'Fantasías recurrentes'
    ],
  },
  'pedofilia': {
    titulo: 'Pedofilia',
    descripcion: 'Atracción sexual hacia niños prepuberales.',
    sintomas: [
      'Fantasías sexuales con menores',
      'Intentos de contacto',
      'Malestar o problemas legales'
    ],
  },
  'fetichismo': {
    titulo: 'Fetichismo',
    descripcion: 'Excitación sexual por objetos inanimados o partes del cuerpo.',
    sintomas: [
      'Fantasías con objetos',
      'Necesidad de objetos para excitación',
      'Interferencia en la vida sexual'
    ],
  }
};
