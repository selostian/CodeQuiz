
const elements = {
    questionTitle: document.getElementById("question-title"),
    questionsEl: document.getElementById("questions"),
    timerEl: document.getElementById("time"),
    choicesEl: document.getElementById("choices"),
    submitBtn: document.getElementById("submit"),
    startBtn: document.getElementById("start"),
    initialsEl: document.getElementById("initials"),
    feedbackEl: document.getElementById("feedback"),
    startScreenEl: document.getElementById("start-screen"),
    endScreenEl: document.getElementById("end-screen"),
    finalScore: document.getElementById("final-score"),
  };
  
  // Audio objects
  const sfxRight = new Audio("assets/sfx/correct.wav");
  const sfxWrong = new Audio("assets/sfx/incorrect.wav");
  
  const quizState = {
    currentQuestionIndex: 0,
    secondsLeft: 75,
    record: { initials: "", score: 0 },
  };
  
  function startTimer() {
    const timerInterval = setInterval(() => {
      quizState.secondsLeft--;
  
      elements.timerEl.textContent = quizState.secondsLeft;
  
      if (quizState.secondsLeft < 1) {
        clearInterval(timerInterval);
        gotoEndScreen();
      }
    }, 1000);
  }
  
  function hideFeedback() {
    setTimeout(() => {
      elements.feedbackEl.classList.add("hide");
      elements.feedbackEl.innerHTML = "";
    }, 1000);
  }
  
  function correctAnswer() {
    elements.feedbackEl.classList.remove("hide");
    const answerDiv = document.createElement("h2");
    answerDiv.textContent = "Correct!";
    elements.feedbackEl.appendChild(answerDiv);
    quizState.currentQuestionIndex++;
    quizState.record.score++;
    sfxRight.play();
    hideFeedback();
  }
  
  function incorrectAnswer() {
    elements.feedbackEl.classList.remove("hide");
    const answerDiv = document.createElement("h2");
    answerDiv.textContent = "Wrong!";
    elements.feedbackEl.appendChild(answerDiv);
    quizState.secondsLeft -= 15;
    quizState.currentQuestionIndex++;
    sfxWrong.play();
    hideFeedback();
  }
  
  function showQuestion() {
    elements.startScreenEl.classList.add("hide");
    elements.questionsEl.classList.remove("hide");
  }
  
  function gotoEndScreen() {
    elements.questionsEl.classList.add("hide");
    elements.endScreenEl.classList.remove("hide");
    elements.finalScore.textContent = "Your final score is " + quizState.record.score;
  }
  
  function populateQuestionContent() {
    if (quizState.currentQuestionIndex === 5) {
      gotoEndScreen();
    }
  
    const question = questions[quizState.currentQuestionIndex];
    elements.questionTitle.textContent = question.title;
  
    for (let i = 0; i < question.choices.length; i++) {
      const choice = question.choices[i];
      const choiceBtn = document.createElement("button");
      choiceBtn.textContent = choice;
      elements.choicesEl.appendChild(choiceBtn);
  
      choiceBtn.addEventListener("click", () => {
        if (choice === question.answer) {
          correctAnswer();
        } else {
          incorrectAnswer();
        }
  
        elements.choicesEl.innerHTML = "";
        populateQuestionContent();
      });
    }
  }
  
  function startQuiz() {
    startTimer();
    showQuestion();
    populateQuestionContent();
  }
  
  function handleFormSubmit(event) {
    event.preventDefault();
    let allRecords = JSON.parse(localStorage.getItem("allRecords")) || [];
  
    quizState.record.initials = elements.initialsEl.value;
    allRecords.push(quizState.record);
    localStorage.setItem("allRecords", JSON.stringify(allRecords));
  }
  
  elements.startBtn.addEventListener("click", startQuiz);
  elements.submitBtn.addEventListener("click", handleFormSubmit);