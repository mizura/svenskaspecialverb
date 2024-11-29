// 動詞リスト（過去形のみ）
const strongVerbs = [
     { infinitive: "måste", preterite: "måste" },
    { infinitive: "njuta", preterite: "njöt" },
    { infinitive: "rinna", preterite: "rann" },
    { infinitive: "riva", preterite: "rev" },
    { infinitive: "säga", preterite: "sa, sade" },
    { infinitive: "sälja", preterite: "sålde" },
    { infinitive: "sätta", preterite: "satte" },
    { infinitive: "se", preterite: "såg" },
    { infinitive: "sitta", preterite: "satt" },
    { infinitive: "sjunga", preterite: "sjöng" },
    { infinitive: "sjunka", preterite: "sjönk" },
    { infinitive: "skära", preterite: "skar" },
    { infinitive: "skina", preterite: "sken" },
    { infinitive: "skjuta", preterite: "sköt" },
    { infinitive: "skola", preterite: "skulle" },
    { infinitive: "skrika", preterite: "skrek" },
    { infinitive: "skriva", preterite: "skrev" },
    { infinitive: "slå", preterite: "slog" },
    { infinitive: "slåss", preterite: "slogs" },
    { infinitive: "slippa", preterite: "slapp" },
    { infinitive: "slita", preterite: "slet" },
    { infinitive: "sova", preterite: "sov" },
    { infinitive: "spricka", preterite: "sprack" },
    { infinitive: "springa", preterite: "sprang" },
    { infinitive: "stå", preterite: "stod" },
    { infinitive: "sticka", preterite: "stack" },
    { infinitive: "stiga", preterite: "steg" },
    { infinitive: "stjäla", preterite: "stal" },
    { infinitive: "stryka", preterite: "strök" },
    { infinitive: "svälja", preterite: "svalde" },
    { infinitive: "svika", preterite: "svek" },
    { infinitive: "ta", preterite: "tog" },
    { infinitive: "tiga", preterite: "teg" },
    { infinitive: "töras", preterite: "tordes" },
    { infinitive: "välja", preterite: "valde" },
    { infinitive: "vänja", preterite: "vande" },
    { infinitive: "vara", preterite: "var" },
    { infinitive: "veta", preterite: "visste" },
    { infinitive: "vika", preterite: "vek" },
    { infinitive: "vilja", preterite: "ville" },
    { infinitive: "vinna", preterite: "vann" },
    { infinitive: "vrida", preterite: "vred" },
    { infinitive: "äta", preterite: "åt" }
];

let questionQueue = shuffleArray([...strongVerbs]); // ランダムにシャッフル
let mistakesQueue = [];
let currentVerb;
let correctCount = 0;
let wrongCount = 0;
let mistakes = [];

// 必要なHTML要素
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const feedbackElement = document.getElementById("feedback");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next-button");
const correctCountElement = document.getElementById("correct-count");
const wrongCountElement = document.getElementById("wrong-count");
const showMistakesButton = document.getElementById("show-mistakes");
const mistakesContainer = document.getElementById("mistakes-container");
const mistakesList = document.getElementById("mistakes-list");
const completionMessage = document.getElementById("completion-message");
const retryMistakesButton = document.getElementById("retry-mistakes");

// 配列をシャッフルする関数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 問題を生成
function generateQuestion() {
console.log("generateQuestionが呼び出されました")
    if (questionQueue.length === 0) {
        endQuiz();
        return;
    }
    currentVerb = questionQueue.pop(); // 最後の要素を取り出す
    questionElement.textContent = `動詞「${currentVerb.infinitive}」の過去形は？`;
    answerElement.value = "";
    feedbackElement.textContent = "";
    nextButton.style.display = "none";
    submitButton.style.display = "block";
}

// 回答をチェック
function checkAnswer() {
    const userAnswer = answerElement.value.trim();
    if (userAnswer === currentVerb.preterite) {
        correctCount++;
        feedbackElement.textContent = "正解！";
        feedbackElement.style.color = "green";
    } else {
        wrongCount++;
        feedbackElement.textContent = `不正解！正しい答えは「${currentVerb.preterite}」です。`;
        feedbackElement.style.color = "red";
        mistakes.push({
            infinitive: currentVerb.infinitive,
            correctAnswer: currentVerb.preterite
        });
        mistakesQueue.push(currentVerb); // 間違えた問題を再挑戦用に追加
    }

    correctCountElement.textContent = correctCount;
    wrongCountElement.textContent = wrongCount;

    if (mistakes.length > 0) {
        showMistakesButton.style.display = "block";
    }

    submitButton.style.display = "none";
    nextButton.style.display = "block";
}

// 間違えた問題を表示
function showMistakes() {
    mistakesList.innerHTML = "";
    mistakes.forEach(mistake => {
        const listItem = document.createElement("li");
        listItem.textContent = `動詞「${mistake.infinitive}」: 正しい過去形は「${mistake.correctAnswer}」`;
        mistakesList.appendChild(listItem);
    });
    mistakesContainer.style.display = "block";
}

// クイズ終了
function endQuiz() {
    questionElement.textContent = "";
    answerElement.style.display = "none";
    submitButton.style.display = "none";
    nextButton.style.display = "none";
    completionMessage.style.display = "block";
    if (mistakesQueue.length > 0) {
        retryMistakesButton.style.display = "block";
    }
}

// 間違えた問題を再挑戦
function retryMistakes() {
    questionQueue = shuffleArray([...mistakesQueue]); // シャッフルして新しいキューに
    mistakesQueue = [];
    mistakes = [];
    mistakesContainer.style.display = "none";
    completionMessage.style.display = "none";
    answerElement.style.display = "block";
    correctCount = 0;
    wrongCount = 0;
    correctCountElement.textContent = correctCount;
    wrongCountElement.textContent = wrongCount;
    generateQuestion();
}

// イベントリスナーの設定
submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", generateQuestion);
showMistakesButton.addEventListener("click", showMistakes);
retryMistakesButton.addEventListener("click", retryMistakes);

// 初期化
generateQuestion();
