const screens = [...document.querySelectorAll("[data-screen]")];
const starInputs = [...document.querySelectorAll('input[name="star"]')];
const finishStarButton = document.querySelector('[data-action="finish-star"]');
const starInstruction = document.querySelector("#star-instruction p");
const resultScreen = document.querySelector('[data-screen="result"]');
const countdownElement = document.querySelector("#countdown");
const countdownNotice = document.querySelector(".countdown");

let selectedStar = "";
let countdownTimer;
let currentScreen = "start";

function showScreen(name) {
  clearInterval(countdownTimer);
  currentScreen = name;

  screens.forEach((screen) => {
    const isTarget = screen.dataset.screen === name;
    screen.hidden = !isTarget;
    screen.classList.toggle("is-active", isTarget);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  const heading = name === "start"
    ? document.querySelector(".start-trigger")
    : document.querySelector(`[data-screen="${name}"] h1`);
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    requestAnimationFrame(() => heading.focus({ preventScroll: true }));
  }
}

function resetCalibration() {
  selectedStar = "";
  starInputs.forEach((input) => { input.checked = false; });
  finishStarButton.disabled = true;
  starInstruction.textContent = "Wähle oben einen Referenzstern aus.";
  resultScreen.classList.remove("screen--error");
  countdownNotice.hidden = true;
  showScreen("start");
}

function goBack() {
  if (currentScreen === "star" || currentScreen === "geo") showScreen("method");
  else if (currentScreen === "method") showScreen("start");
}

function showResult(success = true) {
  const symbol = resultScreen.querySelector(".result-symbol-inner");
  const eyebrow = document.querySelector("#result-eyebrow");
  const title = document.querySelector("#result-title");
  const message = document.querySelector("#result-message");
  const quaternion = document.querySelector("#quaternion-card");

  resultScreen.classList.toggle("screen--error", !success);
  symbol.textContent = success ? "✓" : "×";
  eyebrow.textContent = success ? "KALIBRIERUNG ABGESCHLOSSEN" : "KALIBRIERUNG FEHLGESCHLAGEN";
  title.innerHTML = success ? "Bereit für<br>die Sterne." : "Bitte erneut<br>versuchen.";
  message.textContent = success
    ? "Die Kalibrierung war erfolgreich. Dein Teleskop ist jetzt ausgerichtet."
    : "Die Kalibrierung konnte nicht gespeichert werden. Bitte wiederhole den Vorgang.";
  quaternion.hidden = !success;
  countdownNotice.hidden = success;

  showScreen("result");
  if (!success) startCountdown();
}

function startCountdown() {
  let seconds = 12;
  countdownElement.textContent = seconds;
  countdownTimer = window.setInterval(() => {
    seconds -= 1;
    countdownElement.textContent = seconds;
    if (seconds <= 0) resetCalibration();
  }, 1000);
}

starInputs.forEach((input) => {
  input.addEventListener("change", () => {
    selectedStar = input.value;
    finishStarButton.disabled = false;
    starInstruction.innerHTML = `Richte dein Teleskop nun präzise auf <strong>${selectedStar}</strong> aus.`;
  });
});

document.addEventListener("click", (event) => {
  const control = event.target.closest("[data-action]");
  if (!control) return;

  event.preventDefault();
  const action = control.dataset.action;
  if (currentScreen === "result" && action !== "restart") return;

  if (action === "begin") showScreen("method");
  if (action === "back") goBack();
  if (action === "restart") resetCalibration();
  if (action === "choose-method") showScreen(control.dataset.method);
  if (action === "finish-star" && selectedStar) showResult(true);
  if (action === "finish-geo") showResult(true);
});

// Kleine Schnittstelle für die spätere ESP-Anbindung. Ein Backend kann damit
// nach Abschluss der echten Sensorkalibrierung Erfolg oder Fehler anzeigen.
window.PolarisCalibration = {
  complete(success) {
    showResult(Boolean(success));
  },
  restart: resetCalibration,
};
