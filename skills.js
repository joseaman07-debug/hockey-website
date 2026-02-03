const drills = [
  {
    id: "route-16-outlet",
    name: "16-yard outlet route",
    skill: "Press break",
    level: "Intermediate",
    time: 20,
    focus: "Routes from the 16', faster decision-making",
    objective: "Exit the 16 with speed while keeping the ball on our side.",
    setup: "Half field, 6 cones, 6 players. Two defenders press from the top.",
    steps: [
      "Start with the goalie or defender at the 16.",
      "Press into the first defender to commit them.",
      "Create a passing lane between defenders with a bounce pass.",
      "Move the ball to the wide-middle channel for release."
    ],
    cues: "Scan before the first touch, open hips early, keep the outlet on our side.",
    progression: "Add a third presser and limit touches to two.",
    mistakes: "Forcing through the middle without shifting the press first."
  },
  {
    id: "press-connect",
    name: "Backline connection under press",
    skill: "Passing",
    level: "Advanced",
    time: 20,
    focus: "Connecting defenders under pressure",
    objective: "Hold composure and connect passes under a two-player press.",
    setup: "Quarter field, 5 defenders, 2 pressing forwards, 1 target gate.",
    steps: [
      "Defenders circulate the ball in a back-three shape.",
      "Pressers apply angled pressure to block the central lane.",
      "Find the third defender on the weak side.",
      "Play through the gate to finish."
    ],
    cues: "Shoulders open, soft first touch away from pressure.",
    progression: "Reduce space and add a time limit.",
    mistakes: "Standing flat and telegraphing the next pass."
  },
  {
    id: "patient-shift",
    name: "Patient press shift",
    skill: "Scanning",
    level: "Beginner",
    time: 10,
    focus: "Moving the press with patience",
    objective: "Move the press laterally before breaking forward.",
    setup: "Half field, 4 cones, 4 players in a box.",
    steps: [
      "Maintain possession in the box with a 3v1.",
      "Count three passes before attempting the exit.",
      "Exit through the open gate after the press shifts."
    ],
    cues: "Scan between passes, let the press commit.",
    progression: "Add another defender for a 4v2.",
    mistakes: "Rushing the exit without drawing pressure."
  },
  {
    id: "wide-middle-release",
    name: "Wide-middle release",
    skill: "Wide-middle",
    level: "Intermediate",
    time: 20,
    focus: "Finding the wide-middle space",
    objective: "Recognize and exploit the wide-middle channel.",
    setup: "Half field with two wide channels marked.",
    steps: [
      "Start with a backline possession triangle.",
      "Move the press with two short passes.",
      "Release into the wide-middle runner.",
      "Finish with a carry to the circle."
    ],
    cues: "Timing of the run, pass on the run, stay on our side.",
    progression: "Add a recovering defender in the wide-middle lane.",
    mistakes: "Pass too early before the press shifts."
  },
  {
    id: "press-break-switch",
    name: "Press break switch",
    skill: "Press break",
    level: "Advanced",
    time: 30,
    focus: "Moving the press with patience",
    objective: "Switch play to escape a high press.",
    setup: "Half field, 7 players, two neutral outlets.",
    steps: [
      "Play through the backline with one-touch support.",
      "Draw the press toward the strong side.",
      "Switch to the weak-side outlet.",
      "Carry through the midfield gate."
    ],
    cues: "Fake the line pass, reset the angle, switch quickly.",
    progression: "Allow pressers to trap the sideline.",
    mistakes: "Hitting the switch without moving the press."
  },
  {
    id: "receive-turn",
    name: "Receive and turn",
    skill: "Receiving",
    level: "Beginner",
    time: 10,
    focus: "First touch under pressure",
    objective: "Receive on the move and turn into space.",
    setup: "Grid with 4 cones, 3 players, 1 passive defender.",
    steps: [
      "Check away then back to receive.",
      "Take the first touch into space.",
      "Complete the exit pass to the opposite cone."
    ],
    cues: "Scan before checking, stick out early.",
    progression: "Make the defender active.",
    mistakes: "Receiving flat and stopping the ball."
  },
  {
    id: "channel-support",
    name: "Channel support chain",
    skill: "Passing",
    level: "Intermediate",
    time: 20,
    focus: "Connecting defenders under press",
    objective: "Create a reliable passing chain in the defensive third.",
    setup: "Defensive third, 5 players, 2 pressers, 2 channel gates.",
    steps: [
      "Start with a center back and two wide backs.",
      "Pressers force play to one side.",
      "Use a center outlet to recycle.",
      "Find the far channel gate."
    ],
    cues: "Support in a triangle, keep the ball on our side.",
    progression: "Add a midfielder who must check into space.",
    mistakes: "Passing into pressure without an escape angle."
  },
  {
    id: "wide-middle-punch",
    name: "Wide-middle punch",
    skill: "Wide-middle",
    level: "Advanced",
    time: 30,
    focus: "Finding the wide-middle space",
    objective: "Break the line into the wide-middle pocket at speed.",
    setup: "Half field, 6 attackers, 3 defenders.",
    steps: [
      "Circulate in a U-shape to move the press.",
      "Trigger the wide-middle run after the third pass.",
      "Play a firm pass into the pocket.",
      "Finish with a layoff to the circle."
    ],
    cues: "Pass with pace, run between defenders.",
    progression: "Add a recovering midfielder.",
    mistakes: "Slow trigger allowing defenders to recover."
  },
  {
    id: "scan-release",
    name: "Scan and release",
    skill: "Scanning",
    level: "Intermediate",
    time: 10,
    focus: "Moving the press with patience",
    objective: "Use early scanning to switch the point of attack.",
    setup: "Square grid, 4 players, 1 defender.",
    steps: [
      "Play two-touch rondo in the square.",
      "Scan for the open gate.",
      "Release the ball through the gate."
    ],
    cues: "Eyes up before receiving, communicate early.",
    progression: "Reduce the grid size for faster decisions.",
    mistakes: "Looking down and missing the open gate."
  }
];

const drillGrid = document.getElementById("drill-grid");
const skillFilter = document.getElementById("skill-filter");
const levelFilter = document.getElementById("level-filter");
const timeFilter = document.getElementById("time-filter");
const searchInput = document.getElementById("search");
const randomButton = document.getElementById("random-drill");
const sessionList = document.getElementById("session-list");
const sessionTotal = document.getElementById("session-total");
const clearSessionButton = document.getElementById("clear-session");
const printSessionButton = document.getElementById("print-session");

const SESSION_STORAGE_KEY = "northline-session";
let session = [];
let timerInterval = null;
let remainingSeconds = 20 * 60;
let isRunning = false;

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const renderDrills = (filteredDrills) => {
  drillGrid.innerHTML = "";
  if (filteredDrills.length === 0) {
    drillGrid.innerHTML = "<p class=\"notice\">No drills match the selected filters.</p>";
    return;
  }

  filteredDrills.forEach((drill) => {
    const card = document.createElement("article");
    card.className = "drill-card";
    card.dataset.id = drill.id;

    card.innerHTML = `
      <div>
        <p class="eyebrow">${drill.focus}</p>
        <h3>${drill.name}</h3>
        <div class="tag-row">
          <span class="tag">${drill.skill}</span>
          <span class="tag">${drill.level}</span>
          <span class="tag">${drill.time} min</span>
        </div>
      </div>
      <p class="subtle">${drill.objective}</p>
      <div class="button-row">
        <button class="btn btn-ghost" data-action="toggle">View details</button>
        <button class="btn btn-primary" data-action="add">Add to session</button>
      </div>
      <div class="details">
        <div class="detail-block"><strong>Setup</strong>${drill.setup}</div>
        <div class="detail-block"><strong>Steps</strong>${drill.steps.map((step) => `<div>• ${step}</div>`).join("")}</div>
        <div class="detail-block"><strong>Coaching cues</strong>${drill.cues}</div>
        <div class="detail-block"><strong>Progression</strong>${drill.progression}</div>
        <div class="detail-block"><strong>Common mistakes</strong>${drill.mistakes}</div>
      </div>
    `;

    drillGrid.appendChild(card);
  });
};

const applyFilters = () => {
  const skill = skillFilter.value;
  const level = levelFilter.value;
  const time = timeFilter.value;
  const search = searchInput.value.trim().toLowerCase();

  const filtered = drills.filter((drill) => {
    const matchesSkill = skill === "all" || drill.skill === skill;
    const matchesLevel = level === "all" || drill.level === level;
    const matchesTime = time === "all" || drill.time === Number(time);
    const matchesSearch =
      drill.name.toLowerCase().includes(search) ||
      drill.focus.toLowerCase().includes(search) ||
      drill.objective.toLowerCase().includes(search);

    return matchesSkill && matchesLevel && matchesTime && matchesSearch;
  });

  renderDrills(filtered);
};

const saveSession = () => {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
};

const loadSession = () => {
  const stored = localStorage.getItem(SESSION_STORAGE_KEY);
  session = stored ? JSON.parse(stored) : [];
};

const renderSession = () => {
  sessionList.innerHTML = "";
  const total = session.reduce((sum, drillId) => {
    const drill = drills.find((item) => item.id === drillId);
    return drill ? sum + drill.time : sum;
  }, 0);

  sessionTotal.textContent = total;

  if (session.length === 0) {
    sessionList.innerHTML = "<li class=\"notice\">No drills added yet.</li>";
    return;
  }

  session.forEach((drillId) => {
    const drill = drills.find((item) => item.id === drillId);
    if (!drill) return;

    const item = document.createElement("li");
    item.className = "session-item";
    item.innerHTML = `
      <span>${drill.name} (${drill.time} min)</span>
      <button aria-label="Remove drill" data-id="${drillId}">Remove</button>
    `;
    sessionList.appendChild(item);
  });
};

const addToSession = (drillId) => {
  session.push(drillId);
  saveSession();
  renderSession();
};

const removeFromSession = (drillId) => {
  session = session.filter((id) => id !== drillId);
  saveSession();
  renderSession();
};

const setupTimer = () => {
  const display = document.getElementById("timer-display");
  const startBtn = document.getElementById("start-timer");
  const pauseBtn = document.getElementById("pause-timer");
  const resetBtn = document.getElementById("reset-timer");

  const updateDisplay = () => {
    display.textContent = formatTime(remainingSeconds);
  };

  const startTimer = () => {
    if (isRunning) return;
    isRunning = true;
    timerInterval = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds -= 1;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
      }
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    isRunning = false;
  };

  const resetTimer = () => {
    pauseTimer();
    remainingSeconds = 20 * 60;
    updateDisplay();
  };

  document.querySelectorAll("[data-minutes]").forEach((button) => {
    button.addEventListener("click", () => {
      remainingSeconds = Number(button.dataset.minutes) * 60;
      updateDisplay();
    });
  });

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
  updateDisplay();
};

const handleDrillActions = (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const card = event.target.closest(".drill-card");
  if (!card) return;

  const drillId = card.dataset.id;
  if (button.dataset.action === "toggle") {
    const details = card.querySelector(".details");
    details.classList.toggle("active");
    button.textContent = details.classList.contains("active")
      ? "Hide details"
      : "View details";
  }

  if (button.dataset.action === "add") {
    addToSession(drillId);
  }
};

const handleSessionActions = (event) => {
  if (event.target.tagName !== "BUTTON") return;
  const drillId = event.target.dataset.id;
  if (drillId) {
    removeFromSession(drillId);
  }
};

const handleRandomDrill = () => {
  applyFilters();
  const cards = Array.from(document.querySelectorAll(".drill-card"));
  if (cards.length === 0) return;

  cards.forEach((card) => card.classList.remove("random-highlight"));
  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  randomCard.classList.add("random-highlight");
  randomCard.scrollIntoView({ behavior: "smooth", block: "center" });
};

const handlePrintSession = () => {
  const sessionItems = session
    .map((drillId, index) => {
      const drill = drills.find((item) => item.id === drillId);
      if (!drill) return "";
      return `
        <li>
          <strong>${index + 1}. ${drill.name}</strong> (${drill.time} min)
          <p>${drill.objective}</p>
        </li>
      `;
    })
    .join("");

  const printable = `
    <html>
      <head>
        <title>Northline Session Plan</title>
        <style>
          body { font-family: "Manrope", Arial, sans-serif; padding: 2rem; color: #1b1b1d; }
          h1 { margin-bottom: 0.5rem; }
          ul { padding-left: 1.2rem; }
          li { margin-bottom: 1rem; }
          p { margin: 0.3rem 0 0; color: #5f6064; }
        </style>
      </head>
      <body>
        <h1>Session Plan</h1>
        <p>Total time: ${sessionTotal.textContent} minutes</p>
        <ul>${sessionItems || "<li>No drills selected yet.</li>"}</ul>
      </body>
    </html>
  `;

  const printWindow = window.open("", "", "width=800,height=600");
  if (!printWindow) return;
  printWindow.document.write(printable);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

skillFilter.addEventListener("change", applyFilters);
levelFilter.addEventListener("change", applyFilters);
timeFilter.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);
randomButton.addEventListener("click", handleRandomDrill);

drillGrid.addEventListener("click", handleDrillActions);
sessionList.addEventListener("click", handleSessionActions);
clearSessionButton.addEventListener("click", () => {
  session = [];
  saveSession();
  renderSession();
});
printSessionButton.addEventListener("click", handlePrintSession);

loadSession();
renderSession();
applyFilters();
setupTimer();
