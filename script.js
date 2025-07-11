document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startButton");
    const startContainer = document.getElementById("startContainer");
    const betModal = document.getElementById("betModal");
    const closeBetBtn = document.getElementById("closeBetBtn");
    const confirmBet = document.getElementById("confirmBet");
    const betAmount = document.getElementById("betAmount");
    const analysisProgress = document.getElementById("analysisProgress");
    const progressFill = document.getElementById("progressFill");
    const progressPercentage = document.getElementById("progressPercentage");
    const resultModal = document.getElementById("resultModal");
    const closeResultBtn = document.getElementById("closeResultBtn");
    const closeBtn = document.getElementById("closeBtn");
    const restartBtn = document.getElementById("restartBtn");
    const dataPoints = document.getElementById("dataPoints");
    const accuracy = document.getElementById("accuracy");
    const resultText = document.getElementById("resultText");

    let lang = "ru"; // Язык по умолчанию

    // START button click
    startBtn.addEventListener("click", () => {
        startContainer.classList.add("hidden");
        betModal.classList.add("show");
    });

    // Close Bet Modal
    closeBetBtn.addEventListener("click", () => {
        betModal.classList.remove("show");
        startContainer.classList.remove("hidden");
    });

    // Confirm Bet
    confirmBet.addEventListener("click", () => {
        const bet = parseInt(betAmount.value);
        if (!bet || bet <= 0) {
            alert(lang === "ru" ? "Введите корректную сумму ставки!" : "Enter a valid bet amount!");
            return;
        }

        betModal.classList.remove("show");
        startAnalysis(bet);
    });

    // Start Analysis
    function startAnalysis(bet) {
        analysisProgress.classList.add("show");
        let percent = 0;
        const interval = setInterval(() => {
            percent += Math.random() * 10;
            if (percent >= 100) {
                percent = 100;
                clearInterval(interval);
                setTimeout(() => {
                    analysisProgress.classList.remove("show");
                    showResult(bet);
                }, 500);
            }
            progressFill.style.width = percent + "%";
            progressPercentage.textContent = Math.round(percent) + "%";
        }, 300);
    }

    // Show Result Modal
    function showResult(bet) {
        resultModal.classList.add("show");

        const randomDataPoints = Math.floor(Math.random() * 300 + 700);
        const randomAccuracy = (Math.random() * 15 + 85).toFixed(0) + "%";
        const randomStakes = Math.floor(Math.random() * (19 - 7 + 1)) + 7;
        const randomMultiplier = Math.floor(Math.random() * (35 - 10 + 1)) + 10;
        const randomChance = Math.floor(Math.random() * (89 - 69 + 1)) + 69;

        dataPoints.textContent = randomDataPoints;
        accuracy.textContent = randomAccuracy;

        const isUnfavorable = randomMultiplier < randomStakes;

        if (lang === "ru") {
            if (isUnfavorable) {
                resultText.innerHTML = `
                    <p>Попробуйте через 5 минут!</p>
                    <p>Анализ показал, что сейчас неблагоприятное время для ставок.</p>
                `;
            } else {
                resultText.innerHTML = `
                    <p>На основе анализа полётных данных:</p>
                    <p>
                        Вам осталось <strong>${randomStakes}</strong> ставок со ставкой <strong>${bet}</strong>
                        до заноса <strong>Х${randomMultiplier}</strong> с вероятностью <strong>${randomChance}%</strong>
                    </p>
                `;
            }
        } else {
            if (isUnfavorable) {
                resultText.innerHTML = `
                    <p>Try again in 5 minutes!</p>
                    <p>The analysis showed that now is not a favorable time for betting.</p>
                `;
            } else {
                resultText.innerHTML = `
                    <p>Based on the flight data analysis:</p>
                    <p>
                        You need <strong>${randomStakes}</strong> more bets of <strong>${bet}</strong>
                        to hit <strong>X${randomMultiplier}</strong> with a probability of <strong>${randomChance}%</strong>
                    </p>
                `;
            }
        }
    }

    // Close Result Modal
    closeBtn.addEventListener("click", () => {
        resultModal.classList.remove("show");
        startContainer.classList.remove("hidden");
        betAmount.value = "";
    });

    closeResultBtn.addEventListener("click", () => {
        resultModal.classList.remove("show");
        startContainer.classList.remove("hidden");
        betAmount.value = "";
    });

    restartBtn.addEventListener("click", () => {
        resultModal.classList.remove("show");
        startContainer.classList.remove("hidden");
        betAmount.value = "";
    });

    // Language toggle
    const languageToggle = document.getElementById("languageToggle");
    const languageDropdown = document.getElementById("languageDropdown");
    const currentLang = document.getElementById("currentLang");
    const currentFlag = document.getElementById("currentFlag");
    const langButtons = document.querySelectorAll(".language-option");

    const translations = {
        ru: {
            start: "СТАРТ",
            back: "Назад",
            bet_title: "Введите сумму ставки",
            bet_amount: "Сумма ставки:",
            confirm: "ПОДТВЕРДИТЬ",
            analysis: "Анализ полёта...",
            result_title: "Результат анализа",
            data_points: "Точек данных:",
            accuracy: "Точность прогноза:",
            close: "ЗАКРЫТЬ",
            restart: "НАЧАТЬ ЗАНОВО",
            checking_strategy: "Проверка стратегии..."
        },
        en: {
            start: "START",
            back: "Back",
            bet_title: "Enter Bet Amount",
            bet_amount: "Bet Amount:",
            confirm: "CONFIRM",
            analysis: "Flight Analysis...",
            result_title: "Analysis Result",
            data_points: "Data Points:",
            accuracy: "Prediction Accuracy:",
            close: "CLOSE",
            restart: "RESTART",
            checking_strategy: "Checking strategy..."
        }
    };

    function updateLanguage() {
        document.querySelectorAll("[data-lang-key]").forEach(el => {
            const key = el.getAttribute("data-lang-key");
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        currentLang.textContent = lang.toUpperCase();
        currentFlag.innerHTML = lang === "ru"
            ? `<rect width="32" height="8" fill="#ffffff"/><rect width="32" height="8" y="8" fill="#0052b4"/><rect width="32" height="8" y="16" fill="#d90012"/>`
            : `<rect width="32" height="24" fill="#012169"/>
               <path d="M0 0l32 24M32 0L0 24" stroke="#ffffff" stroke-width="2"/>
               <path d="M16 0v24M0 12h32" stroke="#ffffff" stroke-width="4"/>
               <path d="M0 0l32 24M32 0L0 24" stroke="#c8102e" stroke-width="1"/>
               <path d="M16 0v24M0 12h32" stroke="#c8102e" stroke-width="2"/>`;
    }

    languageToggle.addEventListener("click", () => {
        languageDropdown.classList.toggle("show");
    });

    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            lang = btn.getAttribute("data-lang");
            updateLanguage();
            languageDropdown.classList.remove("show");
        });
    });

    updateLanguage(); // Применить язык по умолчанию
});
