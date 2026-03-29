const input = document.getElementById("password");
const rulesList = document.getElementById("rules");
const mapDiv = document.getElementById("map");

let rules = [];
let currentRuleIndex = 0;
let country = "";

// 🌍 países
const countries = [
  "brazil","japan","canada","france","germany",
  "india","china","mexico","italy","spain"
];

// 🌍 MAPA
function initMap() {
  const randomLocation = {
    lat: (Math.random() * 140) - 70,
    lng: (Math.random() * 360) - 180
  };

  country = countries[Math.floor(Math.random() * countries.length)];

  new google.maps.StreetViewPanorama(
    mapDiv,
    {
      position: randomLocation,
      pov: { heading: 165, pitch: 0 },
      zoom: 1
    }
  );
}

// 🔥 fogo
function spreadFire() {
  if (!input.value) return;

  let value = input.value.split("");

  if (Math.random() < 0.5) {
    value.splice(Math.floor(Math.random() * value.length), 0, "🔥");
  }

  for (let i = 0; i < value.length; i++) {
    if (value[i] === "🔥") {
      if (Math.random() < 0.3 && i > 0) value[i - 1] = "🔥";
      if (Math.random() < 0.3 && i < value.length - 1) value[i + 1] = "🔥";
    }
  }

  input.value = value.join("");
}

// 📜 REGRAS EM ORDEM
function generateRules() {
  rules = [
    {
      text: "Mínimo de 5 caracteres",
      check: () => input.value.length >= 5
    },
    {
      text: "Deve conter número",
      check: () => /\d/.test(input.value)
    },
    {
      text: "Deve conter letra maiúscula",
      check: () => /[A-Z]/.test(input.value)
    },
    {
      text: "Deve conter 🥚",
      check: () => input.value.includes("🥚")
    },
    {
      text: "O 🥚 não pode encostar no 🔥",
      check: () =>
        !input.value.includes("🔥🥚") &&
        !input.value.includes("🥚🔥")
    },
    {
      text: "Descubra o país no mapa 🌍",
      check: () => input.value.toLowerCase().includes(country),
      onStart: () => {
        mapDiv.style.display = "block";
        initMap();
      },
      onComplete: () => {
        mapDiv.style.display = "none";
      }
    },
    {
      text: "A senha deve conter o tamanho dela mesma",
      check: () => input.value.includes(input.value.length.toString())
    }
  ];

  // completar até 50
  for (let i = rules.length; i < 50; i++) {
    rules.push({
      text: `Senha > ${i} caracteres`,
      check: () => input.value.length > i
    });
  }
}

// 🎨 render
function renderRules() {
  rulesList.innerHTML = "";

  for (let i = 0; i <= currentRuleIndex; i++) {
    const li = document.createElement("li");

    if (i < currentRuleIndex) {
      li.innerText = `✅ ${rules[i].text}`;
      li.style.color = "lightgreen";
    } else {
      li.innerText = `❌ ${rules[i].text}`;
      li.style.color = "red";
    }

    rulesList.appendChild(li);
  }
}

// 🧠 lógica principal
function checkRules() {
  const currentRule = rules[currentRuleIndex];

  if (!currentRule) return;

  if (currentRule.check()) {

    if (currentRule.onComplete) {
      currentRule.onComplete();
    }

    currentRuleIndex++;

    if (rules[currentRuleIndex]?.onStart) {
      rules[currentRuleIndex].onStart();
    }

    renderRules();

    if (currentRuleIndex >= rules.length) {
      alert("🎉 Você venceu!");
    }
  } else {
    renderRules();
  }
}

// ⏱ loop
setInterval(() => {
  spreadFire();
  checkRules();
}, 2000);

// ⌨ input
input.addEventListener("input", checkRules);

// 🚀 start
generateRules();
renderRules();
