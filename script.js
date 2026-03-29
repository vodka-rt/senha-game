const passwordInput = document.getElementById("password");
const rulesList = document.getElementById("rules");

let playerName = "";
let currentRuleIndex = 0;
let rules = [];

// 🧠 regras
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
      text: "Senha mínima 8 caracteres",
      check: (v) => v.length >= 8
    },
    {
      text: "Não pode ter letra 'a'",
      check: (v) => !v.includes("a")
    }
  ];

  return types[Math.floor(Math.random() * types.length)];
}

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

  localStorage.setItem("currentPlayer", playerName);

  document.getElementById("start").style.display = "none";
  document.getElementById("game").style.display = "block";

  document.getElementById("playerDisplay").innerText = "👤 " + playerName;

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
}

// 📂 menu
function toggleMenu() {
  const d = document.getElementById("dropdown");
  d.style.display = d.style.display === "block" ? "none" : "block";
}

// 🔗 ir ranking
function goRanking() {
  window.location.href = "ranking.html";
}
