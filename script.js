const passwordInput = document.getElementById("password");
const rulesList = document.getElementById("rules");

let playerName = "";
let currentRuleIndex = 0;
let rules = [];

// 🧠 regras tipo IA
function generateRandomRule() {
  const types = [
    {
      text: "Deve conter número",
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
      text: "Mínimo 8 caracteres",
      check: (v) => v.length >= 8
    },
    {
      text: "Deve conter símbolo (!@#)",
      check: (v) => /[!@#]/.test(v)
    },
    {
      text: "Não pode conter 'a'",
      check: (v) => !v.includes("a")
    }
  ];

  return types[Math.floor(Math.random() * types.length)];
}

function generateRules() {
  rules = [];
  for (let i = 0; i < 500; i++) {
    rules.push(generateRandomRule());
  }
}

// START
function startGame() {
  playerName = document.getElementById("playerName").value;

  if (!playerName) return alert("Digite um nome!");

  localStorage.setItem("currentPlayer", playerName);

  document.getElementById("start").style.display = "none";
  document.getElementById("game").style.display = "block";

  document.getElementById("playerDisplay").innerText = "👤 " + playerName;

  generateRules();
  renderRules();
}

// RENDER
function renderRules() {
  rulesList.innerHTML = "";

  for (let i = 0; i <= currentRuleIndex; i++) {
    const li = document.createElement("li");

    if (i < currentRuleIndex) {
      li.innerText = `✅ ${rules[i].text}`;
      li.style.color = "#7CFC00";
    } else {
      li.innerText = `❌ ${rules[i].text}`;
      li.style.color = "#ff4d4d";
    }

    rulesList.appendChild(li);
  }
}

// CHECK
function checkRules() {
  const rule = rules[currentRuleIndex];
  if (!rule) return;

  if (rule.check(passwordInput.value)) {
    currentRuleIndex++;
    renderRules();
  }
}

passwordInput.addEventListener("input", checkRules);

// MENU
function toggleMenu() {
  const d = document.getElementById("dropdown");
  d.style.display = d.style.display === "block" ? "none" : "block";
}

// IR RANKING
function goRanking() {
  window.location.href = "ranking.html";
}
