const quizData = [
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Control Style Sheets", "Creative Style System"],
        correct: 1
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correct: 3
    },
    {
        question: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language", "Hypertext Machine Language"],
        correct: 0
    },
    {
        question: "What year was JavaScript launched?",
        options: ["1996", "1995", "1994", "None of the above"],
        correct: 1
    },
    {
        question: "Which of these is a CSS framework?",
        options: ["React", "Django", "Tailwind", "Node.js"],
        correct: 2
    },
    {
        question: "What does DOM stand for?",
        options: ["Data Object Model", "Document Object Model", "Dynamic Output Management", "Digital Ordinance Mode"],
        correct: 1
    },
    {
        question: "Which HTTP method is typically used to submit form data?",
        options: ["GET", "PUT", "POST", "DELETE"],
        correct: 2
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: ["var colors = (1:'red', 2:'blue', 3:'green')", "var colors = ['red', 'green', 'blue']", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", "var colors = 'red', 'green', 'blue'"],
        correct: 1
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: ["color", "bgcolor", "background-color", "selection-color"],
        correct: 2
    },
    {
        question: "How do you call a function named 'myFunction'?",
        options: ["call myFunction()", "myFunction()", "call function myFunction()", "execute myFunction()"],
        correct: 1
    },
    {
        question: "Which of these is NOT a valid JavaScript variable name?",
        options: ["my_variable", "$myVariable", "2myVariable", "_myVariable"],
        correct: 2
    },
    {
        question: "Which CSS property is used for text shadow?",
        options: ["font-shadow", "text-shadow", "shadow-text", "glow"],
        correct: 1
    },
    {
        question: "What is the result of '2' + 2 in JavaScript?",
        options: ["4", "NaN", "22", "undefined"],
        correct: 2
    },
    {
        question: "Which operator is used to compare both value and type in JS?",
        options: ["==", "===", "=", "!="],
        correct: 1
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<css>", "<script>", "<style>", "<link>"],
        correct: 2
    },
    {
        question: "Which event occurs when a user clicks on an HTML element?",
        options: ["onmouseclick", "onchange", "onclick", "onmouseover"],
        correct: 2
    },
    {
        question: "How do you add a comment in CSS?",
        options: ["// comment", "<!-- comment -->", "/* comment */", "' comment"],
        correct: 2
    },
    {
        question: "Which property is used to change the font of an element?",
        options: ["font-style", "font-weight", "font-family", "font-size"],
        correct: 2
    },
    {
        question: "Which property is used to make the text bold?",
        options: ["font-weight: bold", "style: bold", "font: bold", "text-decoration: bold"],
        correct: 0
    }
];

let currentQuiz = 0;
let score = 0;
let canAnswer = true;

const splashScreen = document.getElementById('splash-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const questionEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumberEl = document.getElementById('question-number');
const progressBar = document.getElementById('progress-bar');
const nextBtn = document.getElementById('next-btn');
const finalScoreEl = document.getElementById('final-score');
const resultMessageEl = document.getElementById('result-message');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);
nextBtn.addEventListener('click', loadNextQuestion);

function startQuiz() {
    splashScreen.classList.remove('active');
    quizScreen.classList.add('active');
    loadQuiz();
}

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    canAnswer = true;
    nextBtn.disabled = true;

    // Update Progress
    const progress = ((currentQuiz) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    questionNumberEl.innerText = `Question ${currentQuiz + 1}/${quizData.length}`;

    // Load Question
    questionEl.innerText = currentQuizData.question;

    // Clear & Load Options
    optionsContainer.innerHTML = '';
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.innerText = option;
        button.addEventListener('click', () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

function selectOption(index, button) {
    if (!canAnswer) return;

    const correct = quizData[currentQuiz].correct;
    canAnswer = false;
    nextBtn.disabled = false;

    if (index === correct) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('wrong');
        // Show correct answer
        optionsContainer.children[correct].classList.add('correct');
    }

    // Auto progress if it's the last question? No, let user click next.
}

function loadNextQuestion() {
    currentQuiz++;

    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    progressBar.style.width = '100%';
    finalScoreEl.innerText = `${score}/${quizData.length}`;

    const percentage = (score / quizData.length) * 100;
    if (percentage >= 75) {
        resultMessageEl.innerText = "Exceptional! You're a true expert! 👑";
        startCelebration();
    } else if (percentage >= 60) {
        resultMessageEl.innerText = "Great job! You know your stuff. ✨";
    } else {
        resultMessageEl.innerText = "Keep practicing! You'll get there. 💪";
    }
}

function startCelebration() {
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');

    // Random properties
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(confetti);

    // Remove after animation
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

function restartQuiz() {
    currentQuiz = 0;
    score = 0;
    resultScreen.classList.remove('active');
    splashScreen.classList.add('active');
    // Remove any lingering confetti
    document.querySelectorAll('.confetti').forEach(c => c.remove());
}
