const hearts = document.querySelector(".hearts");
const heartEmojis = ["💗","💖","💕","💘","❤️"];

function spawnHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];

  const left = Math.random()*100;
  const size = 14 + Math.random()*18;
  const duration = 6 + Math.random()*6;
  const drift = (Math.random()*120 - 60) + "px";
  const scale = (0.7 + Math.random()*0.9).toFixed(2);

  h.style.left = left + "vw";
  h.style.fontSize = size + "px";
  h.style.animationDuration = duration + "s";
  h.style.setProperty("--drift", drift);
  h.style.setProperty("--scale", scale);

  hearts.appendChild(h);
  setTimeout(() => h.remove(), duration*1000);
}
setInterval(spawnHeart, 380);

const music = document.getElementById("music");
const btnMusic = document.getElementById("btnMusic");
const btnSurpresa = document.getElementById("btnSurpresa");
const modal = document.getElementById("modal");
const btnClose = document.getElementById("btnClose");

btnMusic.addEventListener("click", async () => {
  try{
    if (music.paused){
      await music.play();
      btnMusic.textContent = "⏸ Pausar música";
    } else {
      music.pause();
      btnMusic.textContent = "▶ Tocar nossa música";
    }
  } catch {
    alert("O navegador bloqueou o áudio. Clica no botão novamente 🙂");
  }
});

btnSurpresa.addEventListener("click", () => modal.classList.remove("hidden"));
btnClose.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });

const counter = document.getElementById("counter");
const inicio = new Date("2025-11-15T16:30:00");

function formatTempo(ms){
  const total = Math.floor(ms/1000);
  const d = Math.floor(total/(3600*24));
  const h = Math.floor((total%(3600*24))/3600);
  const m = Math.floor((total%3600)/60);
  return `${d} dias, ${h}h e ${m}min`;
}

function atualizarContador(){
  const diff = new Date() - inicio;
  counter.textContent = diff >= 0
    ? `Namorando há ${formatTempo(diff)} 💞`
    : `Falta pouco… 💘`;
}
setInterval(atualizarContador, 1000);
atualizarContador();

const track = document.getElementById("track");
const slides = Array.from(track.querySelectorAll("img"));
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const dotsWrap = document.getElementById("dots");

let index = 0;

function renderDots(){
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "dot" + (i === index ? " active" : "");
    b.ariaLabel = `Ir para foto ${i+1}`;
    b.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(b);
  });
}

function goTo(i){
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(${-index * 100}%)`;
  renderDots();
}

prev.addEventListener("click", () => goTo(index - 1));
next.addEventListener("click", () => goTo(index + 1));
renderDots();

let startX = 0;
let dragging = false;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  dragging = true;
}, {passive:true});

track.addEventListener("touchend", (e) => {
  if (!dragging) return;
  dragging = false;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  if (Math.abs(diff) > 40){
    if (diff < 0) goTo(index + 1);
    else goTo(index - 1);
  }
}, {passive:true});

const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
    else entry.target.classList.remove("is-visible");
  });
}, {
  threshold: 0.55
});

revealEls.forEach(el => observer.observe(el));
