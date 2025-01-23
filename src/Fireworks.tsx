// Fireworks with Audio and Visuals in TypeScript
function startFireworksWithAudio(): void {
    // Apply Fireworks CSS (uses your provided CSS styles)
    const style = document.createElement('style');
    style.textContent = `
        .canvas-container canvas {
            position: absolute;
            mix-blend-mode: lighten;
            transform: translateZ(0);
        }
    `;
    document.head.appendChild(style);

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.classList.add('canvas-container');
    document.body.appendChild(canvas);
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';

    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load firework sound
    const audio = new Audio('https://www.soundjay.com/misc/sounds/fireworks-1.mp3');
    audio.loop = true; // Continuous play
    audio.volume = 0.5;
    audio.play();

    // Firework particle type
    interface Particle {
        x: number;
        y: number;
        angle: number;
        speed: number;
        radius: number;
        color: string;
        opacity: number;
        fadeRate: number;
    }

    const particles: Particle[] = [];
    const colors = ['#00FF00', '#FF00FF', '#FFFF00', '#FF4500', '#00FFFF'];

    // Create a single firework burst
    function createFirework(x: number, y: number): void {
        const numParticles = 50 + Math.random() * 50;
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x,
                y,
                angle: Math.random() * 2 * Math.PI,
                speed: Math.random() * 4 + 2,
                radius: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: 1,
                fadeRate: Math.random() * 0.02 + 0.01,
            });
        }
    }

    // Update particles
    function updateParticles(): void {
        particles.forEach((particle, index) => {
            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed;
            particle.opacity -= particle.fadeRate;

            if (particle.opacity <= 0) {
                particles.splice(index, 1);
            }
        });
    }

    // Draw particles
    function drawParticles(): void {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.opacity})`;
            ctx.fill();
        });
    }

    // Convert hex to RGB
    function hexToRgb(hex: string): string {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    }

    // Trigger random fireworks
    function triggerFireworks(): void {
        createFirework(
            Math.random() * canvas.width,
            Math.random() * canvas.height * 0.8 // Avoid bottom edge
        );
    }

    // Animation loop
    function animate(): void {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    // Start the fireworks and trigger bursts at intervals
    animate();
    setInterval(triggerFireworks, 800);

    // Stop fireworks (if needed)
    window.addEventListener('beforeunload', () => {
        audio.pause();
        audio.currentTime = 0;
        canvas.remove();
    });
}


export default startFireworksWithAudio