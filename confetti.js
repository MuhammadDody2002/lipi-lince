// Sakura (bunga) falling animation for wedding invitation
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

// Responsive settings based on device type
const isMobile = window.innerWidth <= 768;
const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

// Dynamic settings based on screen size
const settings = {
  petalCount: isMobile ? 15 : isTablet ? 25 : 40,
  fallSpeed: isMobile ? 0.5 : isTablet ? 0.7 : 1,
  windStrength: isMobile ? 0.8 : 1,
  petalSize: isMobile ? { min: 8, max: 16 } : { min: 10, max: 22 }
};

const petalColors = [
  '#f9c5d1', '#f7b7c2', '#fbb1b1', '#f7e1e3', '#fbeee6'
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Petal() {
  this.x = randomInt(0, W);
  this.y = randomInt(-H, 0);
  this.r = randomInt(settings.petalSize.min, settings.petalSize.max);
  this.d = randomInt(2, 6);
  this.color = petalColors[randomInt(0, petalColors.length - 1)];
  this.tilt = randomInt(-10, 10);
  this.tiltAngleIncremental = (Math.random() * 0.04) + .02;
  this.tiltAngle = 0;
  this.opacity = Math.random() * 0.7 + 0.3;
  // Add individual speed multiplier for more natural variation
  this.speedMultiplier = Math.random() * 0.5 + 0.7; // 0.7 to 1.2
}

let petals = [];
function initPetals() {
  petals = [];
  for (let i = 0; i < settings.petalCount; i++) {
    petals.push(new Petal());
  }
}

function drawPetal(p) {
  ctx.save();
  ctx.globalAlpha = p.opacity;
  ctx.translate(p.x, p.y);
  ctx.rotate(p.tilt * Math.PI / 180);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(p.r / 2, -p.r / 2, p.r, p.r / 3, 0, p.r);
  ctx.bezierCurveTo(-p.r, p.r / 3, -p.r / 2, -p.r / 2, 0, 0);
  ctx.fillStyle = p.color;
  ctx.fill();
  ctx.restore();
}

function drawPetals() {
  ctx.clearRect(0, 0, W, H);
  petals.forEach(function(petal) {
    drawPetal(petal);
  });
  updatePetals();
}

function updatePetals() {
  for (let i = 0; i < petals.length; i++) {
    let p = petals[i];
    // Responsive fall speed calculation
    const fallSpeed = (Math.cos(p.d) + 2 + p.r / 8) / 2 * settings.fallSpeed * p.speedMultiplier;
    const windEffect = (Math.sin(0.01 * p.d) + Math.sin(p.tiltAngle) * 1.2) * settings.windStrength;
    
    p.y += fallSpeed;
    p.x += windEffect;
    p.tiltAngle += p.tiltAngleIncremental;
    
    // Reset petal position when it goes off screen
    if (p.y > H + 20 || p.x < -40 || p.x > W + 40) {
      petals[i] = new Petal();
      petals[i].x = randomInt(0, W);
      petals[i].y = -10;
    }
  }
}

// Performance optimization for mobile
let lastTime = 0;
const targetFPS = isMobile ? 30 : 60; // Lower FPS on mobile for better performance
const interval = 1000 / targetFPS;

function animatePetals(currentTime) {
  if (currentTime - lastTime >= interval) {
    drawPetals();
    lastTime = currentTime;
  }
  requestAnimationFrame(animatePetals);
}

window.addEventListener('resize', function() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  
  // Update settings based on new screen size
  const newIsMobile = window.innerWidth <= 768;
  const newIsTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
  
  // Recalculate settings
  settings.petalCount = newIsMobile ? 15 : newIsTablet ? 25 : 40;
  settings.fallSpeed = newIsMobile ? 0.5 : newIsTablet ? 0.7 : 1;
  settings.windStrength = newIsMobile ? 0.8 : 1;
  settings.petalSize = newIsMobile ? { min: 8, max: 16 } : { min: 10, max: 22 };
  
  // Reinitialize petals with new count
  initPetals();
});

// Initialize petals
initPetals();
animatePetals(); 