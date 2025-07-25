// Sakura (bunga) falling animation for wedding invitation
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

const petalColors = [
  '#f9c5d1', '#f7b7c2', '#fbb1b1', '#f7e1e3', '#fbeee6'
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Petal() {
  this.x = randomInt(0, W);
  this.y = randomInt(-H, 0);
  this.r = randomInt(10, 22);
  this.d = randomInt(2, 6);
  this.color = petalColors[randomInt(0, petalColors.length - 1)];
  this.tilt = randomInt(-10, 10);
  this.tiltAngleIncremental = (Math.random() * 0.04) + .02;
  this.tiltAngle = 0;
  this.opacity = Math.random() * 0.7 + 0.3;
}

let petals = [];
for (let i = 0; i < 40; i++) {
  petals.push(new Petal());
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
    p.y += (Math.cos(p.d) + 2 + p.r / 8) / 2;
    p.x += Math.sin(0.01 * p.d) + Math.sin(p.tiltAngle) * 1.2;
    p.tiltAngle += p.tiltAngleIncremental;
    if (p.y > H + 20 || p.x < -40 || p.x > W + 40) {
      petals[i] = new Petal();
      petals[i].x = randomInt(0, W);
      petals[i].y = -10;
    }
  }
}

function animatePetals() {
  drawPetals();
  requestAnimationFrame(animatePetals);
}

window.addEventListener('resize', function() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
});

animatePetals(); 