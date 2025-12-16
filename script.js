// =====================
// Fundo de corações
// =====================
const hearts = document.querySelector(".hearts");
const heartEmojis = ["💗","💖","💕","💘","❤️","🌸"];

function spawnHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];

  const left = Math.random()*100;
  const size = 14 + Math.random()*18;
  const duration = 6 + Math.random()*6;
  const drift = (Math.random()*140 - 70) + "px";
  const scale = (0.7 + Math.random()*0.9).toFixed(2);

  h.style.left = left + "vw";
  h.style.fontSize = size + "px";
  h.style.animationDuration = duration + "s";
  h.style.setProperty("--drift", drift);
  h.style.setProperty("--scale", scale);

  hearts.appendChild(h);
  setTimeout(() => h.remove(), duration*1000);
}
setInterval(spawnHeart, 360);

// =====================
// Tema (claro/escuro) - sem salvar
// =====================
const btnTheme = document.getElementById("btnTheme");
const root = document.documentElement;

function refreshThemeIcon(){
  btnTheme.textContent = root.classList.contains("dark") ? "☀️" : "🌙";
}
refreshThemeIcon();

btnTheme.addEventListener("click", () => {
  root.classList.toggle("dark");
  refreshThemeIcon();
});

// =====================
// Música
// =====================
const music = document.getElementById("music");
const btnMusic = document.getElementById("btnMusic");

btnMusic.addEventListener("click", async () => {
  try{
    if (music.paused){
      await music.play();
      btnMusic.textContent = "⏸ Música";
    } else {
      music.pause();
      btnMusic.textContent = "▶ Música";
    }
  } catch {
    alert("O navegador bloqueou o áudio. Clica no botão novamente 🙂");
  }
});

// =====================
// Contador + Progresso 1 ano
// =====================
const counter = document.getElementById("counter");
const progressBar = document.getElementById("progressBar");
const progressLabel = document.getElementById("progressLabel");

const inicio = new Date("2025-11-15T16:30:00");
const umAno = 365 * 24 * 60 * 60 * 1000;

function pad2(n){ return String(n).padStart(2, "0"); }

function formatTempo(ms){
  const total = Math.max(0, Math.floor(ms/1000));
  const d = Math.floor(total/(3600*24));
  const h = Math.floor((total%(3600*24))/3600);
  const m = Math.floor((total%3600)/60);
  return `${d} dias, ${h}h e ${pad2(m)}min`;
}

function atualizarContador(){
  const diff = new Date() - inicio;

  if (diff >= 0){
    counter.textContent = formatTempo(diff);
    const pct = Math.min(100, (diff / umAno) * 100);
    progressBar.style.width = pct.toFixed(2) + "%";
    progressLabel.textContent = pct.toFixed(1) + "%";
  } else {
    counter.textContent = "Falta pouco… 💘";
    progressBar.style.width = "0%";
    progressLabel.textContent = "0%";
  }
}
setInterval(atualizarContador, 1000);
atualizarContador();

// =====================
// Carrossel + autoplay + lightbox
// =====================
const track = document.getElementById("track");
const slides = Array.from(track.querySelectorAll("img"));
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const dotsWrap = document.getElementById("dots");

const modalLightbox = document.getElementById("modalLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");
const btnOpenLightbox = document.getElementById("btnOpenLightbox");

let index = 0;
let autoplay = false;
let autoplayTimer = null;

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

function openLightbox(src){
  lightboxImg.src = src;
  modalLightbox.classList.remove("hidden");
}
function closeLB(){
  modalLightbox.classList.add("hidden");
  lightboxImg.src = "";
}

btnOpenLightbox.addEventListener("click", () => openLightbox(slides[index].src));
closeLightbox.addEventListener("click", closeLB);
modalLightbox.addEventListener("click", (e) => { if (e.target === modalLightbox) closeLB(); });

const btnAuto = document.getElementById("btnAuto");
btnAuto.addEventListener("click", () => {
  autoplay = !autoplay;
  btnAuto.textContent = autoplay ? "⏸️ Auto-play" : "⏯️ Auto-play";
  if (autoplay){
    autoplayTimer = setInterval(() => goTo(index + 1), 3200);
  } else {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
});

// Swipe no celular
let startX = 0;
let dragging = false;
track.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; dragging = true; }, {passive:true});
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

// =====================
// Modal do poema
// =====================
const modalPoem = document.getElementById("modalPoem");
const btnOpenPoem = document.getElementById("btnOpenPoem");
const closePoem = document.getElementById("closePoem");

btnOpenPoem.addEventListener("click", () => modalPoem.classList.remove("hidden"));
closePoem.addEventListener("click", () => modalPoem.classList.add("hidden"));
modalPoem.addEventListener("click", (e) => { if (e.target === modalPoem) modalPoem.classList.add("hidden"); });

// =====================
// Motivos fixos + sorteio
// =====================
const motivos = [
  "Porque seu riso deixa meu mundo mais leve.",
  "Porque com você eu me sinto em casa.",
  "Porque você me inspira a ser melhor.",
  "Porque seu abraço conserta o meu dia.",
  "Porque até o silêncio com você é bom.",
  "Porque você tem um jeito único de amar.",
  "Porque eu amo o jeito como você existe.",
  "Porque eu escolho você — todo dia.",
  "Porque você é minha paz no meio do caos.",
  "Porque amar você é fácil."
];

const reasonsWrap = document.getElementById("reasons");
const motivoSorteado = document.getElementById("motivoSorteado");
const motivoNumero = document.getElementById("motivoNumero");
const btnRandom = document.getElementById("btnRandom");

function renderReasons(){
  reasonsWrap.innerHTML = "";
  motivos.forEach((txt, i) => {
    const card = document.createElement("div");
    card.className = "reason";
    card.innerHTML = `
      <div class="idx">${i+1}</div>
      <div class="txt">${txt}</div>
    `;
    reasonsWrap.appendChild(card);
  });
}
renderReasons();

btnRandom.addEventListener("click", () => {
  const i = Math.floor(Math.random() * motivos.length);
  motivoSorteado.textContent = motivos[i];
  motivoNumero.textContent = `Motivo #${i+1}`;
});

// =====================
// Cartinhas fixas (modal)
// =====================
const cartinhas = {
  1: {
    title: "💌 Cartinha 1",
    body: "Nicky, desde que você chegou, tudo ganhou cor. Obrigado por ser minha paz nos dias difíceis e meu riso nos dias felizes. Eu te amo."
  },
  2: {
    title: "💌 Cartinha 2",
    body: "Amar você é leve. É escolher ficar, cuidar, respeitar e sonhar junto. Obrigado por ser você."
  },
  3: {
    title: "💌 Cartinha 3",
    body: "Prometo continuar te escolhendo, mesmo quando o mundo estiver bagunçado. Você é meu lar."
  }
};

const modalLetter = document.getElementById("modalLetter");
const closeLetter = document.getElementById("closeLetter");
const letterTitle = document.getElementById("letterTitle");
const letterBody = document.getElementById("letterBody");

document.querySelectorAll(".letter").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.letter;
    const data = cartinhas[id];
    letterTitle.textContent = data.title;
    letterBody.textContent = data.body;
    modalLetter.classList.remove("hidden");
  });
});

function closeLetterModal(){
  modalLetter.classList.add("hidden");
}
closeLetter.addEventListener("click", closeLetterModal);
modalLetter.addEventListener("click", (e) => {
  if (e.target === modalLetter) closeLetterModal();
});

// =====================
// Galeria (abre no lightbox)
// =====================
document.querySelectorAll(".gimg").forEach(btn => {
  btn.addEventListener("click", () => openLightbox(btn.dataset.src));
});

// =====================
// Reveal (aparecer/sumir ao rolar)
// =====================
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
    else entry.target.classList.remove("is-visible");
  });
}, { threshold: 0.55 });
revealEls.forEach(el => observer.observe(el));
