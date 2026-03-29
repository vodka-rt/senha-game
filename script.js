const input = document.getElementById("password");
const rulesList = document.getElementById("rules");
const eggLifeText = document.getElementById("eggLife");

let eggLife = 3;
let fireInterval;
let country = "";
let rules = [];
let activeRules = [];

// 🌍 lista de países simples
const countries = [
  "brazil", "japan", "canada", "france", "germany",
  "india", "china", "mexico", "italy", "spain"
];

// 🌍 MAPA
function initMap() {
  const randomLocation = {
    lat: (Math.random() * 140) - 70,
    lng: (Math.random() * 360) - 180
  };

  country = countries[Math.floor(Math.random() * countries.length)];

  new google.maps.StreetViewPanorama(
    document.getElementById("map"),
    {
      position: randomLocation,
      pov: { heading: 165, pitch: 0 },
      zoom: 1
    }
  );
}

// 🔥 fogo que se espalha
function spreadFire() {
  let value = input.value.split("");

  // chance de adicionar fogo
  if (Math.random() < 0.5) {
    value.splice(Math.floor(Math.random() * value.length), 0, "🔥");
  }

  // espalhar fogo existente
  for (let i = 0; i < value.length; i++) {
    if (value[i] === "🔥") {
      if (Math.random() < 0.3 && i > 0) value[i - 1] = "🔥";
      if (Math.random() < 0.3 && i < value.length - 1) value[i + 1] = "🔥";
    }
  }

  input.value = value.join("");
}

// 🥚 vida do ovo
function checkEgg() {
  if (input.value.includes("🔥🥚") || input.value.includes("🥚🔥")) {
    eggLife--;
    eggLifeText.innerText = `🥚 Vida: ${eggLife}`;
    alert("🔥 O ovo queimou!");

    if (eggLife <= 0) {
      alert("💀 Game Over");
      location.reload();
    }
  }

  if (!input.value.includes("🥚")) {
    alert("💀 Você perdeu o ovo!");
    location.reload();
  }
}

// 📜 criar regras
function generateRules() {
  rules = [
    () => input.value.includes("🥚"),
    () => input.value.length > 5,
    () => /\d/.test(input.value),
    () => input.value.toLowerCase().includes(country),
    () => input.value.includes(input.value.length.toString())
  ];

  // até 50 regras (simples extras)
  for (let i = 5; i < 50; i++) {
    rules.push(() => input.value.length > i);
  }

  activeRules = [...rules];
}

// 📜 atualizar lista visual
function renderRules() {
  rulesList.innerHTML = "";

  activeRules.forEach((rule, i) => {
    const li = document.createElement("li");
    li.innerText = `Regra ${i + 1}`;
    rulesList.appendChild(li);
  });
}

// 🧠 validar regras
function checkRules() {
  activeRules = activeRules.filter(rule => !rule());
  renderRules();
}

// ⏱ loops
setInterval(() => {
  if (input.value.length > 0) spreadFire();
  checkEgg();
}, 2000);

input.addEventListener("input", () => {
  checkRules();
});

// iniciar
generateRules();
renderRules();
