// Variables globales
let elapsed = 0;
let timerId = null;
let breathingActive = false;

// Elementos del DOM
const timerDisplay = document.getElementById('timerDisplay2');
const startBtn = document.getElementById('startBtn2');
const stopBtn = document.getElementById('stopBtn2');
const resetBtn = document.getElementById('resetBtn2');
const breathCircle = document.getElementById('breathCircle');
const breathBtn = document.getElementById('breathBtn');
const breathSpeed = document.getElementById('breathSpeed');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const selfcareNotes = document.getElementById('selfcareNotes');
const selfcareList = document.getElementById('selfcareList');
const guardarSaludableBtn = document.getElementById('guardarSaludableBtn');
const saludableConfirmacion = document.getElementById('saludableConfirmacion');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initSelfCareApp();
});

function initSelfCareApp() {
    // Configurar event listeners
    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);
    breathBtn.addEventListener('click', toggleBreathing);
    saveNoteBtn.addEventListener('click', guardarNota);
    guardarSaludableBtn.addEventListener('click', guardarRegistroSaludable);
    
    // Configurar botones de ver más
    document.querySelectorAll('.toggle-more').forEach(btn => {
        btn.addEventListener('click', function() {
            const moreSection = this.parentElement.parentElement.querySelector('.more');
            moreSection.classList.toggle('open');
            this.textContent = moreSection.classList.contains('open') ? 'Ver menos' : 'Ver más';
        });
    });
    
    // Cargar checklists guardados
    loadChecklists();
    
    // Inicializar gráfico
    updateHabitsChart();
    
    // Cargar notas
    loadNotes();
}

// Funciones del temporizador
function startTimer() {
    if (timerId) return;
    // Iniciar temporizador y respiración sincronizados
    timerId = setInterval(() => {
        elapsed++;
        updateTimerDisplay();
    }, 1000);
    if (!breathingActive) {
        startBreathing();
    }
}

function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

function resetTimer() {
    stopTimer();
    elapsed = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
    
    const cycle = (parseInt(breathSpeed.value, 10) || 14) + 's';
    breathCircle.style.setProperty('--breathe-cycle', cycle);
    breathCircle.classList.add('breathing');
}

function stopBreathing() {
    breathingActive = false;
    breathBtn.textContent = 'Iniciar respiración';
    breathCircle.classList.remove('breathing');
}

// Funciones de checklists
function loadChecklists() {
    const savedChecklists = JSON.parse(localStorage.getItem('selfcareChecklists') || '{}');
    
    // Aplicar estados guardados a los checkboxes
    document.querySelectorAll('.checklist input[type="checkbox"]').forEach(checkbox => {
        const key = checkbox.dataset.key;
        const today = new Date().toDateString();
        const savedData = savedChecklists[key];
        
        if (savedData && savedData.date === today) {
            checkbox.checked = savedData.checked;
        }
    });
}

function saveChecklists() {
    const checklistsData = {};
    const today = new Date().toDateString();
    
    document.querySelectorAll('.checklist input[type="checkbox"]').forEach(checkbox => {
        const key = checkbox.dataset.key;
        checklistsData[key] = {
            checked: checkbox.checked,
            date: today
        };
    });
    
    localStorage.setItem('selfcareChecklists', JSON.stringify(checklistsData));
}

// Funciones de notas
function guardarNota() {
    const noteText = selfcareNotes.value.trim();
    if (!noteText) {
        alert('Por favor, escribe algo antes de guardar.');
        return;
    }
    
    const note = {
        id: Date.now(),
        date: new Date().toISOString(),
        text: noteText
    };
    
    // Guardar en localStorage
    const existingNotes = JSON.parse(localStorage.getItem('selfcareNotes') || '[]');
    existingNotes.push(note);
    localStorage.setItem('selfcareNotes', JSON.stringify(existingNotes));
    
    // Actualizar UI
    addNoteToUI(note);
    selfcareNotes.value = '';
    
    // Mostrar mensaje de confirmación
    showConfirmation('Nota guardada correctamente');
}

function addNoteToUI(note) {
    const li = document.createElement('li');
    li.className = 'record';
    
    const date = new Date(note.date);
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString();
    
    li.innerHTML = `
        <div><strong>${dateStr} ${timeStr}</strong></div>
        <div>${escapeHtml(note.text)}</div>
    `;
    
    selfcareList.appendChild(li);
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('selfcareNotes') || '[]');
    selfcareList.innerHTML = '';
    
    notes.forEach(note => {
        addNoteToUI(note);
    });
}

// Función para guardar registro saludable
function guardarRegistroSaludable() {
    // Guardar todos los checklists
    saveChecklists();
    saveChecklistById('creativeChecklist');
    saveChecklistById('socialChecklist');
    saveChecklistById('envChecklist');

    // Mostrar confirmación al final de la sección ambiental
    const ambientalSection = document.querySelector('section:last-of-type');
    if (ambientalSection) {
        let confirm = document.getElementById('saludableConfirmacionFinal');
        if (!confirm) {
            confirm = document.createElement('div');
            confirm.id = 'saludableConfirmacionFinal';
            confirm.className = 'registro-confirmacion show';
            confirm.textContent = '✅ Registro saludable guardado';
            ambientalSection.appendChild(confirm);
        } else {
            confirm.classList.remove('hidden');
        }
        setTimeout(() => {
            confirm.classList.add('hidden');
        }, 3000);
    }
    // Actualizar gráfico
    updateHabitsChart();
}

function saveChecklistById(id) {
    const checklistsData = JSON.parse(localStorage.getItem('selfcareChecklists') || '{}');
    const today = new Date().toDateString();
    const checklist = document.getElementById(id);
    if (!checklist) return;
    checklist.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        const key = checkbox.dataset.key;
        checklistsData[key] = {
            checked: checkbox.checked,
            date: today
        };
    });
    localStorage.setItem('selfcareChecklists', JSON.stringify(checklistsData));
}

// Función para actualizar el gráfico de hábitos
function updateHabitsChart() {
    const ctx = document.getElementById('habitsPieChart').getContext('2d');
    const checklistsData = JSON.parse(localStorage.getItem('selfcareChecklists') || '{}');
    const today = new Date().toDateString();
    
    // Contar hábitos completados hoy
    let completed = 0;
    let total = 0;
    
    document.querySelectorAll('.checklist input[type="checkbox"]').forEach(checkbox => {
        total++;
        const key = checkbox.dataset.key;
        const savedData = checklistsData[key];
        
        if (savedData && savedData.date === today && savedData.checked) {
            completed++;
        }
    });
    
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Actualizar texto
    document.getElementById('habitsPieChartLabel').textContent = 
        `${completed}/${total} hábitos completados (${percentage}%)`;
    
    // Crear o actualizar gráfico
    if (window.habitsChart) {
        window.habitsChart.data.datasets[0].data = [completed, total - completed];
        window.habitsChart.update();
    } else {
        window.habitsChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completados', 'Pendientes'],
                datasets: [{
                    data: [completed, total - completed],
                    backgroundColor: ['#4fb89b', '#e0e0e0'],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }
}

// Utilidades
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showConfirmation(message) {
    const confirmation = document.createElement('div');
    confirmation.className = 'registro-confirmacion show';
    confirmation.textContent = '✅ ' + message;
    
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        confirmation.classList.remove('show');
        setTimeout(() => {
            confirmation.remove();
        }, 400);
    }, 3000);
}