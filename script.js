const input = document.getElementById("password");
const rulesList = document.getElementById("rules");

let rules = [];
let activeRules = [];
let country = "";

// 🌍 lista de países
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
  if (!input.value) return;

  let value = input.value.split("");

  // adicionar fogo aleatório
  if (Math.random() < 0.6) {
    value.splice(Math.floor(Math.random() * value.length), 0, "🔥");
  }

  // espalhar fogo existente
  for (let i = 0; i < value.length; i++) {
    if (value[i] === "🔥") {
      if (Math.random() < 0.4 && i > 0) value[i - 1] = "🔥";
      if (Math.random() < 0.4 && i < value.length - 1) value[i + 1] = "🔥";
    }
  }

  input.value = value.join("");
}

// 📜 GERAR REGRAS
function generateRules() {
  rules = [
    {
      text: "A senha deve ter pelo menos 5 caracteres",
      check: () => input.value.length >= 5
    },
    {
      text: "A senha deve conter um número",
      check: () => /\d/.test(input.value)
    },
    {
      text: "A senha deve conter uma letra maiúscula",
      check: () => /[A-Z]/.test(input.value)
    },
    {
      text: "A senha deve conter um 🥚",
      check: () => input.value.includes("🥚")
    },
    {
      text: "O 🥚 não pode encostar no fogo",
      check: () =>
        !input.value.includes("🔥🥚") &&
        !input.value.includes("🥚🔥")
    },
    {
      text: () => `A senha deve conter o país: ${country}`,
      check: () => input.value.toLowerCase().includes(country)
    },
    {
      text: "A senha deve conter o número de caracteres dela mesma",
      check: () => input.value.includes(input.value.length.toString())
    }
  ];

  // completar até 50 regras
  for (let i = rules.length; i < 50; i++) {
    rules.push({
      text: `A senha deve ter mais de ${i} caracteres`,
      check: () => input.value.length > i
    });
  }

  activeRules = [...rules];
}

// 🎨 RENDER REGRAS
function renderRules() {
  rulesList.innerHTML = "";

  activeRules.forEach((rule, i) => {
    const li = document.createElement("li");

    const text = typeof rule.text === "function"
      ? rule.text()
      : rule.text;

    li.innerText = `❌ Regra ${i + 1}: ${text}`;
    rulesList.appendChild(li);
  });
}

// 🧠 VALIDAR
function checkRules() {
  activeRules = rules.filter(rule => !rule.check());
  renderRules();

  if (activeRules.length === 0) {
    alert("🎉 Você venceu o caos!");
  }
}

// ⏱ LOOP DO JOGO
setInterval(() => {
  spreadFire();
  checkRules();
}, 2000);

// ⌨ INPUT
input.addEventListener("input", () => {
  checkRules();
});

// 🚀 START
generateRules();
renderRules();
