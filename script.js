function CountdownTimer() {
  const timerEl = document.getElementById("timer");
  const statusEl = document.getElementById("status");

  let totalSeconds = 30 * 60;
  let interval = null;

  function fmt(n) {
    return n.toString().padStart(2, "0");
  }

  function updateDisplay() {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    timerEl.textContent = fmt(m) + ":" + fmt(s);

    // Warning colour in last 5 minutes while running
    if (totalSeconds <= 5 * 60 && totalSeconds > 0 && interval) {
      timerEl.classList.add("warning");
    } else {
      timerEl.classList.remove("warning");
    }
  }

  function startTimer() {
    if (interval) return;
    interval = setInterval(function () {
      if (totalSeconds <= 0) {
        stopTimer();
        statusEl.textContent = "Time's up!";
        return;
      }
      totalSeconds--;
      updateDisplay();
    }, 1000);
    statusEl.textContent = " ";
  }

  function stopTimer() {
    clearInterval(interval);
    interval = null;
    timerEl.classList.remove("warning");
    statusEl.textContent = "";
  }

  function resetTimer() {
    stopTimer();
    totalSeconds = 30 * 60;
    updateDisplay();
    statusEl.textContent = " ";
  }

  function toggleTimer() {
    if (interval) {
      stopTimer();
    } else {
      startTimer();
    }
  }

  document.getElementById("timer-wrap").addEventListener("click", toggleTimer);
  document
    .getElementById("timer-wrap")
    .addEventListener("dblclick", resetTimer);

  updateDisplay();
}

document.addEventListener("DOMContentLoaded", CountdownTimer);
