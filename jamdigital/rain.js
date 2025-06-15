// Variabel global untuk kontrol hujan
let isRaining = false;
let rainAnimationId;

// Inisialisasi canvas
const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Tetesan hujan
class RainDrop {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.speed = 2 + Math.random() * 5;
        this.length = 10 + Math.random() * 20;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = 'rgba(174, 194, 224, 0.7)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = Math.random() * canvas.height - canvas.height;
            this.x = Math.random() * canvas.width;
        }
        this.draw();
    }
}

// Buat 100 tetesan hujan
const rainDrops = Array(1100).fill().map(() => new RainDrop());

// Animasi hujan
function animateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rainDrops.forEach(drop => drop.update());
    rainAnimationId = requestAnimationFrame(animateRain);
}

// Toggle efek hujan
document.getElementById('rain-toggle').addEventListener('click', () => {
    isRaining = !isRaining;
    canvas.classList.toggle('active', isRaining);
    
    if (isRaining) {
        animateRain();
    } else {
        cancelAnimationFrame(rainAnimationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

// Handle resize window
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});