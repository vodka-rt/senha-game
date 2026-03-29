const input = document.getElementById("password");
const rules = document.getElementById("rules");

let fireActive = false;
let country = "brazil";

// 🌍 Inicializar mapa
function initMap() {
  const randomLocation = {
    lat: (Math.random() * 140) - 70,
    lng: (Math.random() * 360) - 180
  };

  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("map"),
    {
      position: randomLocation,
      pov: { heading: 165, pitch: 0 },
      zoom: 1
    }
  );
}

// 🔥 fogo aleatório
setInterval(() => {
  if (!input.value) return;

  fireActive = true;
  input.value += "🔥";
}, 5000);

// 🧠 validar senha
input.addEventListener("input", () => {
  let value = input.value;

  // 🥚 regra do ovo
  if (!value.includes("🥚")) {
    rules.innerText = "❌ Precisa ter um 🥚";
    return;
  }

  // 🔥 perdeu se fogo tocar no ovo
  if (value.includes("🔥🥚") || value.includes("🥚🔥")) {
    alert("💀 O ovo queimou!");
    input.value = "";
    return;
  }

  // 🔢 regra do tamanho
  const length = value.length;
  if (!value.includes(length.toString())) {
    rules.innerText = `❌ Precisa conter o número ${length}`;
    return;
  }

  // 🌍 país
  if (!value.toLowerCase().includes(country)) {
    rules.innerText = `❌ Precisa conter o país: ${country}`;
    return;
  }

  rules.innerText = "✅ Tá válido... por enquanto 😈";
});
