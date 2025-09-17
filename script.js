// Variables globales
let timerInterval = null;
let elapsedTime = 0;
let selectedActions = new Set();
let breathingActive = false;
let breathingInterval = null;
let lineChart = null;
let pieChart = null;

// Elementos del DOM
const timerDisplay = document.querySelector('.timer-circle');
const currentDuration = document.getElementById('currentDuration');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const intensitySlider = document.getElementById('intensity');
const intensityValue = document.getElementById('intensityValue');
const breathBtn = document.getElementById('breathBtn');
const saveBtn = document.getElementById('saveBtn');
const exportBtn = document.getElementById('exportBtn');
const activitiesList = document.getElementById('activitiesList');
const moodForm = document.getElementById('moodForm');
const reminderTime = document.getElementById('reminderTime');
const saveReminder = document.getElementById('saveReminder');
const streakElement = document.getElementById('streak');
const monthSummary = document.getElementById('monthSummary');
const comparison = document.getElementById('comparison');
const recommendations = document.getElementById('recommendations');
const backBtn = document.getElementById('backBtn');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    // Configurar event listeners
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    intensitySlider.addEventListener('input', updateIntensityValue);
    breathBtn.addEventListener('click', toggleBreathing);
    moodForm.addEventListener('submit', saveMoodRecord);
    exportBtn.addEventListener('click', exportToCSV);
    saveReminder.addEventListener('click', setReminder);
    backBtn.addEventListener('click', goBack);
    
    // Configurar botones de acción
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const action = this.dataset.action;
            if (selectedActions.has(action)) {
                selectedActions.delete(action);
            } else {
                selectedActions.add(action);
            }
        });
    });
    
    // Configurar cambio de fondo según el estado de ánimo
    document.querySelectorAll('input[name="mood"]').forEach(radio => {
        radio.addEventListener('change', function() {
            updateBackgroundBasedOnMood(this.value);
        });
    });
    
    // Inicializar con el estado de ánimo por defecto
    updateBackgroundBasedOnMood(document.querySelector('input[name="mood"]:checked').value);
    
    // Cargar datos existentes
    loadRecords();
    updateCharts();
    updateStreak();
}

// Función para el botón de volver
function goBack(e) {
    e.preventDefault();
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

// Cambiar fondo según el estado de ánimo
function updateBackgroundBasedOnMood(moodValue) {
    document.body.classList.remove('bg-happy', 'bg-neutral', 'bg-sad', 'bg-angry');
    
    switch(moodValue) {
        case '6': // 😡
            document.body.classList.add('bg-angry');
            break;
        case '5': // 😀
        case '4': // 🙂
            document.body.classList.add('bg-happy');
            break;
        case '3': // 😐
            document.body.classList.add('bg-neutral');
            break;
        case '2': // 😔
        case '1': // 😢
            document.body.classList.add('bg-sad');
            break;
    }
}

// Funciones del temporizador
function startTimer() {
    if (timerInterval) return;
    
    timerInterval = setInterval(() => {
        elapsedTime++;
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    timerDisplay.textContent = timeString;
    currentDuration.textContent = timeString;
}

// Funciones de intensidad
function updateIntensityValue() {
    intensityValue.textContent = `${intensitySlider.value}/10`;
}

// Funciones de respiración
function toggleBreathing() {
    if (breathingActive) {
        stopBreathing();
    } else {
        startBreathing();
    }
}

function startBreathing() {
    breathingActive = true;
    breathBtn.textContent = 'Detener respiración';
    const lung = document.getElementById('breathingLung');
    if (lung) {
        lung.classList.add('grow');
        setTimeout(() => {
            if (breathingActive) lung.classList.remove('grow');
        }, 7000); // mitad del ciclo
    }
    // Animación de respiración (simplificada)
    breathingInterval = setInterval(() => {
        if (lung) {
            lung.classList.add('grow');
            setTimeout(() => {
                if (breathingActive) lung.classList.remove('grow');
            }, 7000);
        }
        // Aquí iría la animación real de respiración
        console.log("Inhalar... mantener... exhalar");
    }, 14000); // 14 segundos como valor predeterminado
}

function stopBreathing() {
    breathingActive = false;
    breathBtn.textContent = 'Iniciar respiración';
    clearInterval(breathingInterval);
    const lung = document.getElementById('breathingLung');
    if (lung) lung.classList.remove('grow');
}

// Funciones de recordatorios
function setReminder() {
    const time = reminderTime.value;
    if (!time) {
        alert('Por favor, selecciona una hora para el recordatorio');
        return;
    }
    
    // Aquí iría la lógica para programar notificaciones
    alert(`Recordatorio establecido para las ${time}`);
    // Guardar en localStorage
    localStorage.setItem('moodReminder', time);
}

// Funciones de guardado y carga
function saveMoodRecord(e) {
    e.preventDefault();
    
    const moodValue = document.querySelector('input[name="mood"]:checked').value;
    const intensityValue = intensitySlider.value;
    const triggersValue = document.getElementById('triggers').value;
    const notesValue = document.getElementById('activityNotes').value;
    
    const record = {
        id: Date.now(),
        date: new Date().toISOString(),
        mood: parseInt(moodValue),
        intensity: parseInt(intensityValue),
        triggers: triggersValue,
        actions: Array.from(selectedActions),
        notes: notesValue,
        duration: elapsedTime
    };
    
    // Guardar en localStorage
    const existingRecords = JSON.parse(localStorage.getItem('moodRecords') || '[]');
    existingRecords.push(record);
    localStorage.setItem('moodRecords', JSON.stringify(existingRecords));
    
    // Actualizar UI
    addRecordToUI(record);
    resetForm();
    updateCharts();
    updateStreak();
    
    // Mostrar mensaje de confirmación
    alert('Registro guardado correctamente');
}

function loadRecords() {
    const records = JSON.parse(localStorage.getItem('moodRecords') || '[]');
    activitiesList.innerHTML = '';
    
    records.forEach(record => {
        addRecordToUI(record);
    });
}

function addRecordToUI(record) {
    const li = document.createElement('li');
    li.className = 'record-item';
    
    const date = new Date(record.date);
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString();
    
    // Mapear valores de estado de ánimo a emojis
    const moodMap = {
        1: '😢', 2: '😔', 3: '😐', 4: '🙂', 5: '😀', 6: '😡'
    };
    
    li.innerHTML = `
        <div class="record-date">${dateStr} ${timeStr}</div>
        <div class="record-mood">
            <span>${moodMap[record.mood]}</span>
            <span>Intensidad: ${record.intensity}/10</span>
        </div>
        <div class="record-details">
            ${record.triggers ? `Desencadenante: ${record.triggers}<br>` : ''}
            ${record.actions.length > 0 ? `Acciones: ${record.actions.join(', ')}<br>` : ''}
            ${record.notes ? `Notas: ${record.notes}` : ''}
        </div>
    `;
    
    activitiesList.appendChild(li);
}

function resetForm() {
    // Restablecer el formulario
    moodForm.reset();
    selectedActions.clear();
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    resetTimer();
}

function exportToCSV() {
    const records = JSON.parse(localStorage.getItem('moodRecords') || '[]');
    
    if (records.length === 0) {
        alert('No hay registros para exportar');
        return;
    }
    
    // Crear contenido CSV
    let csvContent = 'Fecha,Estado de ánimo,Intensidad,Desencadenantes,Acciones,Notas,Duración\n';
    
    records.forEach(record => {
        const date = new Date(record.date);
        const dateStr = date.toLocaleDateString();
        
        csvContent += `"${dateStr}",${record.mood},${record.intensity},"${record.triggers || ''}","${record.actions.join(',')}","${record.notes || ''}",${record.duration}\n`;
    });
    
    // Descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'registros_estado_animo.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function updateStreak() {
    const records = JSON.parse(localStorage.getItem('moodRecords') || '[]');
    if (records.length === 0) {
        streakElement.textContent = '0';
        return;
    }
    
    // Ordenar registros por fecha
    records.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Calcular racha (días consecutivos con registros)
    let streak = 1;
    let lastDate = new Date(records[records.length - 1].date);
    lastDate.setHours(0, 0, 0, 0);
    
    for (let i = records.length - 2; i >= 0; i--) {
        const currentDate = new Date(records[i].date);
        currentDate.setHours(0, 0, 0, 0);
        
        const diffTime = lastDate - currentDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        
        if (diffDays === 1) {
            streak++;
            lastDate = currentDate;
        } else if (diffDays > 1) {
            break;
        }
    }
    
    streakElement.textContent = streak;
}

function updateCharts() {
    const records = JSON.parse(localStorage.getItem('moodRecords') || '[]');
    
    // Destruir gráficos existentes si los hay
    if (lineChart) {
        lineChart.destroy();
    }
    if (pieChart) {
        pieChart.destroy();
    }
    
    if (records.length > 0) {
        // Calcular promedio mensual
        const lastMonthRecords = records.filter(record => {
            const recordDate = new Date(record.date);
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return recordDate > monthAgo;
        });
        
        if (lastMonthRecords.length > 0) {
            const avgMood = lastMonthRecords.reduce((sum, record) => sum + record.mood, 0) / lastMonthRecords.length;
            monthSummary.textContent = `Promedio últimos 30 días: ${avgMood.toFixed(1)}`;
            
            // Datos de ejemplo para comparativa
            comparison.textContent = 'Con ejercicio: 1.5 — Sin ejercicio: 6';
        }
        
        // Gráfico de evolución semanal (ejemplo)
        const ctxLine = document.getElementById('lineChart').getContext('2d');
        lineChart = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Estado de ánimo',
                    data: [3, 4, 5, 4, 3, 6, 5],
                    borderColor: '#4fb89b',
                    tension: 0.3,
                    fill: true,
                    backgroundColor: 'rgba(79, 184, 155, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 6
                    }
                }
            }
        });
        
        // Gráfico de distribución por categoría (ejemplo)
        const ctxPie = document.getElementById('pieChart').getContext('2d');
        pieChart = new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: ['Música', 'Caminar', 'Leer', 'Meditar'],
                datasets: [{
                    data: [45, 30, 15, 10],
                    backgroundColor: [
                        '#4fb89b',
                        '#f2b705',
                        '#6c5ce7',
                        '#e17055'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
        
        // Recomendaciones
        recommendations.textContent = 'Recomendaciones: todo en rango — sigue así';
    } else {
        monthSummary.textContent = 'Promedio últimos 30 días: —';
        comparison.textContent = 'Comparativa por actividad: —';
        recommendations.textContent = 'Recomendaciones: —';
    }
}

// Relación emoji - emoción
const emociones = {
  "😡": { nombre: "Enojo", fondo: "bg-angry" },
  "😀": { nombre: "Felicidad", fondo: "bg-happy" },
  "🙂": { nombre: "Satisfacción", fondo: "bg-satisfaccion" },
  "😐": { nombre: "Neutralidad", fondo: "bg-neutral" },
  "😔": { nombre: "Tristeza leve", fondo: "bg-sad" },
  "😢": { nombre: "Tristeza profunda", fondo: "bg-saddeep" }
};

document.querySelectorAll('.mood-emoji').forEach(emoji => {
  emoji.addEventListener('mouseenter', mostrarTooltip);
  emoji.addEventListener('touchstart', mostrarTooltip);
  emoji.addEventListener('mouseleave', ocultarTooltip);
  emoji.addEventListener('touchend', ocultarTooltip);

  // Cambiar fondo al seleccionar el estado de ánimo
  emoji.parentElement.querySelector('input[type="radio"]').addEventListener('change', function() {
    cambiarFondo(emoji.textContent.trim());
  });
});

function mostrarTooltip(e) {
  const emoji = e.currentTarget.textContent.trim();
  const info = emociones[emoji];
  if (!info) return;
  const tooltip = document.getElementById('estado-animico-tooltip');
  tooltip.textContent = info.nombre;
  tooltip.classList.remove('hidden');
  // Posiciona el tooltip cerca del emoji
  const rect = e.currentTarget.getBoundingClientRect();
  tooltip.style.top = (window.scrollY + rect.bottom + 8) + 'px';
  tooltip.style.left = (window.scrollX + rect.left) + 'px';
}

function ocultarTooltip() {
  const tooltip = document.getElementById('estado-animico-tooltip');
  tooltip.classList.add('hidden');
}

// Cambia el fondo del body según el estado de ánimo seleccionado
function cambiarFondo(emoji) {
  const body = document.body;
  // Quita todas las clases de fondo posibles
  body.classList.remove('bg-happy', 'bg-neutral', 'bg-sad', 'bg-angry');
  // Agrega la clase correspondiente
  if (emociones[emoji]) {
    body.classList.add(emociones[emoji].fondo);
  }
}

// Al cargar, aplica el fondo del seleccionado por defecto
document.addEventListener('DOMContentLoaded', function() {
  const seleccionado = document.querySelector('.mood-option input[type="radio"]:checked + .mood-emoji');
  if (seleccionado) cambiarFondo(seleccionado.textContent.trim());
});

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

<script>
document.addEventListener('DOMContentLoaded', function() {
  const steps = document.querySelectorAll('.form-satisfaccion-step');
  const progressBar = document.getElementById('progress-bar');
  let currentStep = 0;

  function showStep(n) {
    steps.forEach((step, i) => {
      step.style.display = (i === n) ? 'block' : 'none';
    });
    progressBar.style.width = ((n + 1) / steps.length * 100) + '%';
  }

  // Botones Siguiente/Anterior
  document.getElementById('next-step-1').onclick = () => { currentStep = 1; showStep(currentStep); };
  document.getElementById('next-step-2').onclick = () => { currentStep = 2; showStep(currentStep); };
  document.getElementById('prev-step-2').onclick = () => { currentStep = 0; showStep(currentStep); };
  document.getElementById('prev-step-3').onclick = () => { currentStep = 1; showStep(currentStep); };

  showStep(currentStep);
});
</script>