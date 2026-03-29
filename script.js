const passwordInput = document.getElementById("password");
const rulesList = document.getElementById("rules");
const rankingList = document.getElementById("ranking");

let playerName = "";
let currentRuleIndex = 0;
let rules = [];

// 🧠 GERADOR DE REGRAS (IA fake)
function generateRandomRule() {
  const types = [
    {
      text: "Deve conter um número",
      check: (v) => /\d/.test(v)
    },
    {
      text: "Deve conter letra maiúscula",
      check: (v) => /[A-Z]/.test(v)
    },
    {
      text: "Deve conter 🥚",
      check: (v) => v.includes("🥚")
    },
    {
      text: "Senha deve ter pelo menos 8 caracteres",
      check: (v) => v.length >= 8
    },
    {
      text: "Deve conter um símbolo (!@#)",
      check: (v) => /[!@#]/.test(v)
    },
    {
      text: "Não pode conter a letra 'a'",
      check: (v) => !v.includes("a")
    },
    {
      text: "Deve conter o tamanho da senha",
      check: (v) => v.includes(v.length.toString())
    }
  ];

  return types[Math.floor(Math.random() * types.length)];
}

// 📜 iniciar regras
function generateRules() {
  rules = [];

  for (let i = 0; i < 1000; i++) {
    rules.push(generateRandomRule());
  }
}

// 🎮 start
function startGame() {
  playerName = document.getElementById("playerName").value;

  if (!playerName) {
    alert("Digite um nome!");
    return;
  }

  document.getElementById("start").style.display = "none";
  document.getElementById("game").style.display = "block";

  generateRules();
  renderRules();
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

// 🧠 check
function checkRules() {
  const rule = rules[currentRuleIndex];

  if (!rule) return;

  if (rule.check(passwordInput.value)) {
    currentRuleIndex++;
    renderRules();
  }
}

// ⌨ input
passwordInput.addEventListener("input", checkRules);

// 💾 salvar ranking
function saveScore() {
  let scores = JSON.parse(localStorage.getItem("ranking") || "[]");

  scores.push({
    name: playerName,
    score: currentRuleIndex
  });

  scores.sort((a, b) => b.score - a.score);
  scores = scores.slice(0, 10);

  localStorage.setItem("ranking", JSON.stringify(scores));

  renderRanking();
}

// 🏆 render ranking
function renderRanking() {
  let scores = JSON.parse(localStorage.getItem("ranking") || "[]");

  rankingList.innerHTML = "";

  scores.forEach((s, i) => {
    const li = document.createElement("li");
    li.innerText = `#${i + 1} ${s.name} - Regra ${s.score}`;
    rankingList.appendChild(li);
  });
}

// ⏱ detectar derrota (simples)
setInterval(() => {
  if (passwordInput.value.length > 100) {
    alert("💀 Você perdeu!");
    saveScore();
    location.reload();
  }
}, 1000);

// carregar ranking
renderRanking();
