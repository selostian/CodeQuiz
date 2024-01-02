let highscores = document.getElementById("highscores");

let clearBtn = document.getElementById("clear");

function renderallRecords() {
  let allRecords = JSON.parse(localStorage.getItem("allRecords"));

  allRecords.sort((a, b) => b.score - a.score);

  if (allRecords) {
    for (let i = 0; i < allRecords.length; i++) {
      let scoreInitials = allRecords[i].initials;

      let scoreValue = allRecords[i].score;

      let recentRecords = document.createElement("li");

      recentRecords.textContent = scoreInitials + " - " + scoreValue;

      highscores.appendChild(recentRecords);
    }
  } else {
    return;
  }
}

renderallRecords();

clearBtn.addEventListener("click", function () {
  highscores.innerHTML = "";

  localStorage.clear();
});