// CONFIGURACIÓN
// Cambia esto por la fecha de inicio de su relación: Año, Mes (0-11), Día
const startDate = new Date(2023, 6, 12); // Ejemplo: 12 de Julio de 2023

// ELEMENTOS DEL DOM
const screens = {
    1: document.getElementById('screen-1'),
    2: document.getElementById('screen-2'),
    3: document.getElementById('screen-3')
};

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const timerDisplay = document.getElementById('timer');

// FLUJO DE PANTALLAS
function switchScreen(from, to) {
    screens[from].classList.remove('active');
    screens[from].classList.add('hidden');
    
    setTimeout(() => {
        screens[to].classList.remove('hidden');
        screens[to].classList.add('active');
    }, 500);
}

startBtn.addEventListener('click', () => switchScreen(1, 2));
nextBtn.addEventListener('click', () => switchScreen(2, 3));

// CONTADOR DE TIEMPO (Estilo Analista)
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerDisplay.innerHTML = `
        ${days} Días <br>
        ${hours} Horas <br>
        ${minutes} Min <br>
        ${seconds} Seg
    `;
}
setInterval(updateTimer, 1000);

// BOTÓN "NO" IMPOSIBLE (Mobile & Desktop friendly)
function moveButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 40);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 40);
    
    noBtn.style.position = 'fixed'; // Para que flote libre
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

noBtn.addEventListener('mouseover', moveButton); // Para PC
noBtn.addEventListener('touchstart', (e) => { // Para Celular
    e.preventDefault(); // Evita el click
    moveButton();
});

// RESPUESTA "SÍ" + CONFETI + NOTIFICACIÓN
yesBtn.addEventListener('click', () => {
    // 1. Lanzar confeti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    // 2. Cambiar mensaje final
    document.querySelector('#screen-3 .glass-card').innerHTML = `
        <h1>¡Sabía que dirías que SÍ! ❤️</h1>
        <p>Paso por ti a las 7:00 PM.</p>
        <p style="font-size:3rem;">💑</p>
    `;

    // 3. (Opcional) Redirigir a WhatsApp para que te avise
    setTimeout(() => {
        const mensaje = encodeURIComponent("¡Hola Santiago! El sistema reporta que acepté ser tu Valentine ❤️");
        window.location.href = `https://wa.me/57[TU_NUMERO]?text=${mensaje}`;
    }, 3000);
});