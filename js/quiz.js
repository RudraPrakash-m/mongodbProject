const quizData = [
  {
    question: "What does the db.collection.distinct() method return?",
    options: [
      "All documents",
      "Unique values for a specified field",
      "Duplicate entries",
      "Sorted values",
    ],
    answer: "Unique values for a specified field",
  },
  {
    question: "Which of the following is a valid data type in BSON?",
    options: ["String", "Date", "Binary", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "What is the purpose of ObjectId in MongoDB?",
    options: [
      "Hashing index",
      "Primary key generation",
      "Sorting data",
      "Encrypting fields",
    ],
    answer: "Primary key generation",
  },
  {
    question:
      "Which of the following operators is used to specify logical OR in queries?",
    options: ["$and", "$or", "||", "or"],
    answer: "$or",
  },
  {
    question: "How do you remove all documents from a collection?",
    options: [
      "db.collection.drop()",
      "db.collection.delete()",
      "db.collection.remove({})",
      "db.collection.removeAll()",
    ],
    answer: "db.collection.remove({})",
  },
  {
    question:
      "Which function returns a single matching document from a collection?",
    options: [
      "db.collection.find()",
      "db.collection.findAll()",
      "db.collection.findOne()",
      "db.collection.search()",
    ],
    answer: "db.collection.findOne()",
  },
  {
    question: "Which of the following is not a valid index type in MongoDB?",
    options: ["Compound", "Text", "Spatial", "UniqueHash"],
    answer: "UniqueHash",
  },
  {
    question: "What does the $inc operator do?",
    options: [
      "Increments a field by a specified value",
      "Inserts a new document",
      "Includes new fields",
      "Initiates a transaction",
    ],
    answer: "Increments a field by a specified value",
  },
  {
    question: "Which MongoDB component manages data replication?",
    options: ["Config server", "Shard", "Mongos", "Replica set"],
    answer: "Replica set",
  },
  {
    question: "What command lists all the databases in MongoDB?",
    options: ["show all", "list dbs", "show dbs", "db.list()"],
    answer: "show dbs",
  },
  {
    question: "What is the function of mongod?",
    options: [
      "MongoDB client",
      "MongoDB daemon (server process)",
      "Indexing utility",
      "Configuration shell",
    ],
    answer: "MongoDB daemon (server process)",
  },
  {
    question:
      "Which operator is used for pattern matching (similar to SQL LIKE)?",
    options: ["$match", "$regex", "$like", "$search"],
    answer: "$regex",
  },
  {
    question:
      'Which of the following will return documents where the "age" is greater than 25?',
    options: [
      "{ age: { $gt: 25 } }",
      "{ age: > 25 }",
      "{ age: { greater: 25 } }",
      "{ age > 25 }",
    ],
    answer: "{ age: { $gt: 25 } }",
  },
  {
    question: "What does the $project stage do in aggregation?",
    options: [
      "Filters documents",
      "Sorts documents",
      "Reshapes each document (includes/excludes fields)",
      "Groups documents",
    ],
    answer: "Reshapes each document (includes/excludes fields)",
  },
  {
    question: "How can you ensure that a field is unique in MongoDB?",
    options: [
      "Use $unique operator",
      "Apply a unique index",
      "Use _id only",
      "Use ensureUnique() function",
    ],
    answer: "Apply a unique index",
  },
  {
    question: "How is data stored in MongoDB?",
    options: ["Tables", "Collections of documents", "CSV files", "Arrays only"],
    answer: "Collections of documents",
  },
  {
    question: "What command is used to check the current database?",
    options: ["db.getDatabase()", "show current", "print(db)", "db"],
    answer: "db",
  },
  {
    question: "What does db.collection.updateOne() do?",
    options: [
      "Updates all documents",
      "Updates only one matching document",
      "Replaces the entire collection",
      "Creates a new collection",
    ],
    answer: "Updates only one matching document",
  },
  {
    question:
      "What is the command to switch to a different database in MongoDB shell?",
    options: [
      "use dbname",
      "switch dbname",
      "db.set(dbname)",
      "connect dbname",
    ],
    answer: "use dbname",
  },
  {
    question: "What is the role of mongos in sharded clusters?",
    options: [
      "Stores the data",
      "Balances the replica sets",
      "Acts as a query router",
      "Hosts the configuration database",
    ],
    answer: "Acts as a query router",
  },
];

// Shuffle questions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(quizData);

const questionElement = document.querySelector(".question-text");
const optionsElement = document.querySelector(".options");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.querySelector(".result");
const reviewDiv = document.querySelector(".answer-review");
const timerElement = document.getElementById("timer");

let currentIndex = 0;
const userAnswers = new Array(quizData.length).fill(null);
let timer;
let timeLeft = 300; // 5 minutes in seconds

function startTimer() {
  timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `Time Left: ${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      finishQuiz();
    }
    timeLeft--;
  }, 1000);
}

function loadQuestion(index) {
  if (index === 0 && timeLeft === 300) startTimer(); // Start timer on first question load only

  const q = quizData[index];
  questionElement.textContent = q.question;
  optionsElement.innerHTML = "";

  q.options.forEach((option, i) => {
    const li = document.createElement("li");
    const radioId = `option-${index}-${i}`;

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.id = radioId;
    input.value = option;

    if (userAnswers[index] === option) {
      input.checked = true;
    }

    const label = document.createElement("label");
    label.htmlFor = radioId;
    label.textContent = option;

    li.appendChild(input);
    li.appendChild(label);
    optionsElement.appendChild(li);
  });

  // Update question count
  document.querySelector(".question-count").textContent = `Question ${
    index + 1
  } of ${quizData.length}`;

  // Enable/disable navigation buttons
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === quizData.length - 1;
  submitBtn.style.display = index === quizData.length - 1 ? "block" : "none";
}

function saveAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    userAnswers[currentIndex] = selectedOption.value;
  }
}

function finishQuiz() {
  saveAnswer(); // Save last answer
  clearInterval(timer);
  document.querySelector(".question-text").style.display = "none";
  document.querySelector(".options").style.display = "none";
  document.querySelector(".buttons").style.display = "none";
  document.querySelector(".question-count").style.display = "none";
  document.getElementById("timer").style.display = "none";

  const correctCount = quizData.reduce(
    (count, q, i) => (q.answer === userAnswers[i] ? count + 1 : count),
    0
  );

  document.querySelector(".result").style.display = "block";
  document.querySelector(
    ".result"
  ).textContent = `You scored ${correctCount} out of ${quizData.length}`;

  const reviewDiv = document.querySelector(".answer-review");
  reviewDiv.style.display = "block";
  reviewDiv.innerHTML = "<h3>Answer Review</h3>";

  quizData.forEach((q, i) => {
    const div = document.createElement("div");
    div.classList.add("answer-item");
    if (userAnswers[i] === q.answer) {
      div.classList.add("correct");
      div.textContent = `Q${i + 1}: Correct - ${q.question}`;
    } else {
      div.classList.add("incorrect");
      div.textContent = `Q${i + 1}: Incorrect - ${q.question}\nYour answer: ${
        userAnswers[i] || "No answer"
      }\nCorrect answer: ${q.answer}`;
    }
    reviewDiv.appendChild(div);
  });
}

// Button Listeners
prevBtn.addEventListener("click", () => {
  saveAnswer();
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion(currentIndex);
  }
});

nextBtn.addEventListener("click", () => {
  saveAnswer();
  if (currentIndex < quizData.length - 1) {
    currentIndex++;
    loadQuestion(currentIndex);
  }
});

submitBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to submit the quiz?")) {
    finishQuiz();
  }
});

// Load first question
window.addEventListener("DOMContentLoaded", () => {
  loadQuestion(currentIndex);
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
} else {
  document.body.classList.add("dark");
}
