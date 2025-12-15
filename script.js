const TIME_LIMIT = 10; // seconds per question
const MAX_Q = 10;      // total questions per quiz

let subject = "";
let level = "Easy";
let index = 0;
let score = 0;
let levelScore = 0;
let currentQuestions = [];
let timer;
let timeLeft;

// ===== QUESTIONS =====
const questions = [
  // Math Easy
  {level:"Easy",subject:"Maths",q:"2 + 2?",o:["3","4","5","6"],a:"4"},
  {level:"Easy",subject:"Maths",q:"5 + 1?",o:["6","4","7","8"],a:"6"},
  {level:"Easy",subject:"Maths",q:"10 - 5?",o:["3","5","6","7"],a:"5"},
  {level:"Easy",subject:"Maths",q:"3 + 1?",o:["3","4","5","6"],a:"4"},
  {level:"Easy",subject:"Maths",q:"7 - 3?",o:["3","4","5","6"],a:"4"},
  // Math Medium
  {level:"Medium",subject:"Maths",q:"6 ÷ 2?",o:["1","2","3","4"],a:"3"},
  {level:"Medium",subject:"Maths",q:"9 + 8?",o:["15","16","17","18"],a:"17"},
  {level:"Medium",subject:"Maths",q:"12 - 7?",o:["5","4","6","3"],a:"5"},
  {level:"Medium",subject:"Maths",q:"3 × 4?",o:["12","10","11","13"],a:"12"},
  {level:"Medium",subject:"Maths",q:"15 ÷ 3?",o:["4","5","6","3"],a:"5"},
  // Math Hard
  {level:"Hard",subject:"Maths",q:"12 × 2?",o:["22","24","26","28"],a:"24"},
  {level:"Hard",subject:"Maths",q:"25 × 3?",o:["70","75","65","60"],a:"75"},
  {level:"Hard",subject:"Maths",q:"144 ÷ 12?",o:["10","12","11","13"],a:"12"},
  {level:"Hard",subject:"Maths",q:"18 ÷ 3?",o:["5","6","7","8"],a:"6"},
  {level:"Hard",subject:"Maths",q:"7 × 8?",o:["54","56","58","52"],a:"56"},
  // English Easy
  {level:"Easy",subject:"English",q:"Animal says meow?",o:["Dog","Cat","Cow","Lion"],a:"Cat"},
  {level:"Easy",subject:"English",q:"First letter of 'Apple'?",o:["A","B","C","D"],a:"A"},
  {level:"Easy",subject:"English",q:"Opposite of big?",o:["Small","Tall","Long","High"],a:"Small"},
  {level:"Easy",subject:"English",q:"How do you greet in morning?",o:["Good morning","Good night","Hello","Bye"],a:"Good morning"},
  {level:"Easy",subject:"English",q:"Which word is color?",o:["Dog","Red","Car","Cat"],a:"Red"},
  // English Medium
  {level:"Medium",subject:"English",q:"I ___ happy",o:["is","am","are","be"],a:"am"},
  {level:"Medium",subject:"English",q:"Make sentence with cat",o:["Cat runs","I have cat","The cat is sleeping","All correct"],a:"All correct"},
  {level:"Medium",subject:"English",q:"Choose correct: He go school",o:["He goes","He go","He going","He goed"],a:"He goes"},
  {level:"Medium",subject:"English",q:"Which word is fruit?",o:["Carrot","Mango","Potato","Onion"],a:"Mango"},
  {level:"Medium",subject:"English",q:"Which word is animal?",o:["Apple","Cat","Table","Mango"],a:"Cat"},
  // English Hard
  {level:"Hard",subject:"English",q:"Correct past tense: I ___ yesterday",o:["go","went","gone","goed"],a:"went"},
  {level:"Hard",subject:"English",q:"Choose correct: There/Their/They’re",o:["There","Their","They’re","They"],a:"They’re"},
  {level:"Hard",subject:"English",q:"Which is adjective: happy, run, cat, table?",o:["run","happy","cat","table"],a:"happy"},
  {level:"Hard",subject:"English",q:"Correct: She don’t like ice cream",o:["She doesn’t like","She not like","She do like","She likes not"],a:"She doesn’t like"},
  {level:"Hard",subject:"English",q:"I have two ___ (dogs/dog)",o:["dog","dogs","doges","dogg"],a:"dogs"},
  // GK Easy
  {level:"Easy",subject:"GK",q:"Planet we live on?",o:["Mars","Earth","Moon","Venus"],a:"Earth"},
  {level:"Easy",subject:"GK",q:"How many days in week?",o:["5","6","7","8"],a:"7"},
  {level:"Easy",subject:"GK",q:"King of jungle?",o:["Tiger","Lion","Elephant","Dog"],a:"Lion"},
  {level:"Easy",subject:"GK",q:"Color of banana?",o:["Red","Blue","Yellow","Green"],a:"Yellow"},
  {level:"Easy",subject:"GK",q:"Used to write on paper?",o:["Pencil","Spoon","Plate","Book"],a:"Pencil"},
  // GK Medium
  {level:"Medium",subject:"GK",q:"Month after May?",o:["June","July","April","March"],a:"June"},
  {level:"Medium",subject:"GK",q:"Animal gives milk?",o:["Cow","Dog","Cat","Goat"],a:"Cow"},
  {level:"Medium",subject:"GK",q:"Legs of spider?",o:["6","8","4","10"],a:"8"},
  {level:"Medium",subject:"GK",q:"National fruit India?",o:["Mango","Apple","Banana","Orange"],a:"Mango"},
  {level:"Medium",subject:"GK",q:"Sun rises from?",o:["West","East","North","South"],a:"East"},
  // GK Hard
  {level:"Hard",subject:"GK",q:"Father of Nation?",o:["Nehru","Gandhi","Bose","Subhash"],a:"Gandhi"},
  {level:"Hard",subject:"GK",q:"Largest ocean?",o:["Atlantic","Indian","Pacific","Arctic"],a:"Pacific"},
  {level:"Hard",subject:"GK",q:"Gas we breathe?",o:["CO2","Oxygen","Nitrogen","Hydrogen"],a:"Oxygen"},
  {level:"Hard",subject:"GK",q:"Capital of India?",o:["Mumbai","Delhi","Kolkata","Chennai"],a:"Delhi"},
  {level:"Hard",subject:"GK",q:"5 × 5?",o:["20","25","30","15"],a:"25"}
];

// ===== LOGIN =====
function login() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  if(!name || !email || !age){ alert("Fill all fields"); return; }
  document.getElementById("loginDiv").style.display="none";
  document.getElementById("subjectDiv").style.display="block";
}

// ===== SELECT SUBJECT =====
function selectSubject(s){
  subject = s;
  currentQuestions = shuffle(questions.filter(q => q.subject === subject));
  document.getElementById("subjectDiv").style.display="none";
  document.getElementById("quizDiv").style.display="block";
  index = 0;
  score = 0;
  level = "Easy";
  levelScore = 0;
  loadQuestion();
}

// ===== LOAD QUESTION =====
function loadQuestion(){
  if(index >= MAX_Q || index >= currentQuestions.length){ showResult(); return; }
  const q = currentQuestions[index];

  document.getElementById("levelText").innerText = 'Level:' + level;
  document.getElementById("countText").innerText = 'Question:' +index+"/10";
  document.getElementById("questionText").innerText = q.q;

  const opts = shuffle([...q.o]);
  ["a","b","c","d"].forEach((id,i) => document.getElementById(id).innerText = opts[i]);

  updateProgress();
  speak(q.q);
  startTimer();
}

// ===== TIMER =====
function startTimer(){
  clearInterval(timer);
  timeLeft = TIME_LIMIT;
  document.getElementById("timerText").innerText = 'Time:'+ timeLeft;
  timer = setInterval(()=>{
    timeLeft--;
    document.getElementById("timerText").innerText = 'Time:'+ timeLeft;
    if(timeLeft <= 0){
      clearInterval(timer);
      showAnswer(false);
    }
  },1000);
}

// ===== ANSWER =====
function answer(opt){
  clearInterval(timer);
  const chosen = document.getElementById(opt).innerText;
  const q = currentQuestions[index];

  if(chosen === q.a){ score++; levelScore++; showAnswer(true); }
  else { showAnswer(false); }
}

// ===== SHOW CORRECT ANSWER =====
function showAnswer(correct){
  const q = currentQuestions[index];
  document.getElementById("feedback").innerText = correct ? "Correct ✅" :'Wrong ❌ Correct:' + q.a;
  speak(document.getElementById("feedback").innerText);

  setTimeout(()=>{
    if(levelScore >= 3){
      level = level === "Easy" ? "Medium" : level === "Medium" ? "Hard" : "Hard";
      levelScore = 0;
    }
    index++;
    document.getElementById("feedback").innerText = "";
    loadQuestion();
  }, 1500);
}

// ===== SHOW RESULT =====
function showResult(){
  document.getElementById("quizDiv").style.display="none";
  document.getElementById("resultDiv").style.display="block";
  document.getElementById("resultEmoji").innerText = score > 5 ? "😊🎉" : "😢 Keep Trying!";
  document.getElementById("scoreText").innerText = 'Score:' +score + "/10" ;
}

// ===== UTILS =====
function shuffle(arr){ return arr.sort(()=>Math.random() - 0.5); }
function speak(text){ window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(text)); }
function updateProgress(){ document.getElementById("progressBar").style.width = '${((index+1)/MAX_Q)*100}%'; }