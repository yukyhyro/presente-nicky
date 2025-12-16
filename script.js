// REVEAL
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("is-visible");
  });
},{threshold:.15});

document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

// CONTADOR
const counter = document.getElementById("counter");
const start = new Date("2025-11-15T16:30:00");

setInterval(()=>{
  const diff = new Date() - start;
  const d = Math.floor(diff/86400000);
  const h = Math.floor(diff/3600000)%24;
  counter.textContent = `${d} dias • ${h}h`;
},1000);

// MÚSICA
const music = document.getElementById("music");
const btnMusic = document.getElementById("btnMusic");
let playing=false;

btnMusic.onclick=()=>{
  playing ? music.pause() : music.play();
  btnMusic.textContent = playing ? "▶ Música" : "⏸ Música";
  playing=!playing;
};

// CARROSSEL
const track=document.getElementById("track");
let idx=0;
document.getElementById("next").onclick=()=>{idx=(idx+1)%5;track.style.transform=`translateX(-${idx*100}%)`};
document.getElementById("prev").onclick=()=>{idx=(idx+4)%5;track.style.transform=`translateX(-${idx*100}%)`};

// MOTIVOS
const motivos=[
  "Seu sorriso",
  "Seu carinho",
  "Seu jeito",
  "Seu abraço",
  "Você por inteiro"
];
function sortearMotivo(){
  document.getElementById("motivoSorteado").textContent =
    motivos[Math.floor(Math.random()*motivos.length)];
}
