const input = document.getElementById("password");
const rulesList = document.getElementById("rules");
const mapDiv = document.getElementById("map");
const mapImage = document.getElementById("mapImage");

let rules = [];
let currentRuleIndex = 0;
let country = "";

// 🌍 imagens por país
const locations = [
  {
    country: "brazil",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Amazon_rainforest.jpg"
  },
  {
    country: "japan",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Tokyo_Tower_and_surrounding_buildings.jpg"
  },
  {
    country: "france",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Eiffel_Tower_Paris.jpg"
  },
  {
    country: "canada",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Moraine_Lake_17092005.jpg"
  },
  {
    country: "india",
    img: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg"
  }
];

// 🔥 fogo que se espalha
function spreadFire() {
  if (!input.value) return;

  let value = input.value.split("");

  // adiciona fogo
  if (Math.random() < 0.5) {
    value.splice(Math.floor(Math.random() * value.length), 0, "🔥");
  }

  // espalha
  for (let i = 0; i < value.length; i++) {
    if (value[i] === "🔥") {
      if (Math.random() < 0.3 && i > 0) value[i - 1] = "🔥";
      if (Math.random() < 0.3 && i < value.length - 1) value[i + 1] = "🔥";
    }
  }

  input.value = value.join("");
}

// 📜 REGRAS
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
      text: "Descubra o país pela imagem 🌍",
      check: () => input.value.toLowerCase().includes(country),
      onStart: () => {
        const random = locations[Math.floor(Math.random() * locations.length)];

        country = random.country;
        mapImage.src = random.img;

        mapDiv.style.display = "block";
      },
      onComplete: () => {
        mapDiv.style.display = "none";
      }
    },
    {
      text: "A senha deve conter o número de caracteres dela mesma",
      check: () => input.value.includes(input.value.length.toString())
    }
  ];

  // até 50 regras
  for (let i = rules.length; i < 50; i++) {
    rules.push({
      text: `Senha deve ter mais de ${i} caracteres`,
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
      alert("🎉 Você venceu o caos!");
    }
  } else {
    renderRules();
  }
}

// ⏱ loop do jogo
setInterval(() => {
  spreadFire();
  checkRules();
}, 2000);

// ⌨ input
input.addEventListener("input", checkRules);

// 🚀 start
generateRules();
renderRules();
