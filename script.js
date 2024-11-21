const output = document.getElementById("output");
const userInput = document.getElementById("user-input");

const conversation = [
  { question: "Did you find it?", expectedAnswer: "El asesino?" },
  { question: "Yes", expectedAnswer: "Maybe. Is it Hana?" },
  { question: "I see", expectedAnswer: null, delayAfter: 3000 },
  { question: "You don't see the bigger picture", expectedAnswer: null, delayAfter: 3000 },
  { question: "Maybe this will help", expectedAnswer: null, delayAfter: 3000 },
  { 
    question: "I’m young but ahead of my years\nMy mind is sharp, my ideas flow wild, they call me unique\nWhat am I?", 
    expectedAnswer: "A gifted child?" 
  },
  { question: "Goodbye", expectedAnswer: null }
];

let step = 0;

// Function for simulating the hacker typing effect before the first message
function hackerSimulation(callback) {
  const hackerMessages = [
    "Accessing system...\n",
    "Decrypting files...\n",
    "Bypassing firewall...\n",
    "Connection established...\n",
    "Running diagnostics...\n",
    "Initiating command sequence...\n"
  ];
  let i = 0;
  const hackerInterval = setInterval(() => {
    output.textContent += hackerMessages[i];
    i++;
    if (i >= hackerMessages.length) {
      clearInterval(hackerInterval);
      callback();  // Proceed to the first message after hacker simulation is done
    }
  }, 300); // Delay between hacker lines
}

function typeEffect(text, callback) {
  let i = 0;
  const interval = setInterval(() => {
    output.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 50);
}

function askQuestion() {
  if (step < conversation.length) {
    const currentStep = conversation[step];
    setTimeout(() => {
      typeEffect(currentStep.question + "\n", () => {
        if (currentStep.expectedAnswer === null && currentStep.delayAfter) {
          setTimeout(() => {
            step++;
            askQuestion();
          }, currentStep.delayAfter);
        } else {
          userInput.disabled = false;
          userInput.focus();
        }
      });
    }, 2000 + Math.random() * 1000); // Add 2-3 seconds delay
  } else {
    userInput.style.display = "none";
  }
}

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const userAnswer = userInput.value.trim();
    userInput.value = "";
    userInput.disabled = true;

    const currentStep = conversation[step];

    // Display the user's input
    output.textContent += `> ${userAnswer}\n`;

    // Check user's answer
    if (currentStep.expectedAnswer === null || userAnswer === currentStep.expectedAnswer) {
      step++;
      askQuestion();
    } else {
      typeEffect("\nIncorrect. Try again.\n", askQuestion);
    }
  }
});

// Start the hacker simulation, then the conversation
hackerSimulation(() => {
  // Start the conversation after hacker simulation finishes
  askQuestion();
});
