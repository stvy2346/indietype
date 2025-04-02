import { useState, useEffect } from "react";
import Header from "./components/Header";
import Timerorspeed from "./components/Timerorspeed";
import Restart from "./components/Restart";
import Gameboard from "./components/Gameboard";
import Settingbar from "./components/Settingsbar";
import Results from "./components/Results";
import { loadLanguage } from "./utils/languageUtils";

function App() {
    const getStoredValue = (key, defaultValue) => {
        const stored = localStorage.getItem(key);
        return stored !== null ? JSON.parse(stored) : defaultValue;
    };

    const [wordList, setWordList] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [initialTime, setInitialTime] = useState(
        getStoredValue("initialTime", 30)
    );
    const [time, setTime] = useState(initialTime);
    const [theme, setTheme] = useState(getStoredValue("theme", "Dark"));
    const [language, setLanguage] = useState(
        getStoredValue("language", "english")
    );

    const [languageData, setLanguageData] = useState(null);
    const [timerRunning, setTimerRunning] = useState(false);
    const [letterStates, setLetterStates] = useState([]);
    // ?? timerVisible not implemented?
    const [timerVisible, setTimerVisible] = useState(false);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [animate, setAnimate] = useState(false);
    

    // useEffect(()=>{
    //     startNewGame();
    // },)

    useEffect(() => {
        const loadLanguageData = async () => {
            const data = await loadLanguage(language);
            setLanguageData(data);

            const wordsArray = data.words;
            let newWords;
            if (language === "brainrot") {
                const multiWordPhrases = wordsArray.filter((word) =>
                    word.includes(" ")
                );
                const singleWords = wordsArray.filter(
                    (word) => !word.includes(" ")
                );
                const getRandomWord = () =>
                    Math.random() < 0.2 && multiWordPhrases.length > 0
                        ? multiWordPhrases[
                              Math.floor(
                                  Math.random() * multiWordPhrases.length
                              )
                          ]
                        : singleWords[
                              Math.floor(Math.random() * singleWords.length)
                          ];
                newWords = Array.from({ length: 200 }, getRandomWord);
            } else {
                const getRandomWord = () =>
                    wordsArray[Math.floor(Math.random() * wordsArray.length)];
                newWords = Array.from({ length: 200 }, getRandomWord);
            }
            setWordList(newWords);
        };

        loadLanguageData();
    }, [language]);

    const startNewGame = () => {
        setAnimate(true);

            const wordsArray = languageData.words;
            let newWords1;
            if (language === "brainrot") {
                const multiWordPhrases = wordsArray.filter((word) =>
                    word.includes(" ")
                );
                const singleWords = wordsArray.filter(
                    (word) => !word.includes(" ")
                );
                const getRandomWord = () =>
                    Math.random() < 0.2 && multiWordPhrases.length > 0
                        ? multiWordPhrases[
                              Math.floor(
                                  Math.random() * multiWordPhrases.length
                              )
                          ]
                        : singleWords[
                              Math.floor(Math.random() * singleWords.length)
                          ];
                newWords1 = Array.from({ length: 200 }, getRandomWord);
            } else {
                const getRandomWord = () =>
                    wordsArray[Math.floor(Math.random() * wordsArray.length)];
                newWords1 = Array.from({ length: 200 }, getRandomWord);
            }
            setWordList(newWords1);
            setCurrentWordIndex(0);
            setCurrentLetterIndex(0);
            setLetterStates([]);
            setTimerRunning(false);
            setTimerVisible(false);
            setTime(initialTime);

    };

    const handleRestart = () =>{
        setAnimate(true);
        setTimeout(()=>{
            startNewGame();
        },50)
    }
    useEffect(() => {
        if (animate) {
            const timer = setTimeout(() => {
                setAnimate(false);
            }, 100);
    
            return () => clearTimeout(timer);
        }
    }, [animate]);

    function startTimer() {
        setTimerVisible(true);
        setTimerRunning(true);
    }

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("initialTime", JSON.stringify(initialTime));
    }, [initialTime]);

    // function getWPM(){
    //   const correctWords = letterStates.filter((wordState)=>{
    //       return wordState && wordState.every((letterState) => letterState === "correct");
    //   }).length;
    //   return correctWords > 1 ? Math.round((correctWords) * ((60)/initialTime)) : 0;
    // }

    // function getRawSpeed(){
    //   return currentWordIndex > 1 ? Math.round(currentWordIndex * ((60)/initialTime)) : 0;
    // }

    // function getAccuracy(){
    //   return ((correct/(correct+incorrect))*100).toFixed(2);
    // }

    function getTypingStats() {
        let correctChars = 0;
        let incorrectChars = 0;
        let skippedChars = 0;
        let spaces = 0;

        spaces = currentWordIndex > 0 ? currentWordIndex - 1 : 0;

        letterStates.forEach((wordState) => {
            if (!wordState) return;

            wordState.forEach((letterState) => {
                if (letterState === "correct") {
                    correctChars++;
                } else if (letterState === "incorrect") {
                    incorrectChars++;
                } else if (letterState === "skipped") {
                    skippedChars++;
                }
            });
        });

        const wpm =
            correctChars > 5
                ? Math.round((correctChars / 5) * (60 / initialTime))
                : 0;

        const rawSpeed =
            correctChars + incorrectChars > 5
                ? Math.round(
                      ((correctChars + incorrectChars) / 5) * (60 / initialTime)
                  )
                : 0;

        const totalAttempted = correctChars + incorrectChars;
        const accuracy =
            totalAttempted > 0
                ? ((correctChars / totalAttempted) * 100).toFixed(2)
                : "100.00";

        return {
            wpm,
            rawSpeed,
            accuracy,
            correctChars,
            incorrectChars,
            skippedChars,
            spaces,
        };
    }

    useEffect(() => {
        if (time > 0 && timerRunning) {
            const timer = setInterval(() => {
                setTime((prev) => Math.max(prev - 1, 0));
            }, 1000);
            return () => clearInterval(timer);
        }
        // if(time <= 0){
        //   console.log(wordList);
        //   console.log(letterStates);
        // }
    }, [time, timerRunning]);
    // ?? setinterval is used not recommend with tab is in background.

    useEffect(() => {
        setTime(initialTime);
    }, [initialTime]);

    return (
        <main
            className={`${
                theme === "Dark" ? "bg-zinc-900" : "bg-gray-50"
            } min-h-screen px-15 py-5`}
        >
            <Header theme={theme} startNewGame={startNewGame} />
            <div className="flex justify-center items-center min-h-[6rem]">
                {!timerRunning && (
                    <Settingbar
                        initialTime={initialTime}
                        setInitialTime={setInitialTime}
                        language={language}
                        setLanguage={setLanguage}
                        theme={theme}
                        setTheme={setTheme}
                        startNewGame={startNewGame}
                    />
                )}
            </div>
            <div className="px-20 mb-4 min-h-[40px]">
                {timerVisible && (
                    <Timerorspeed
                        time={time}
                        timerRunning={timerRunning}
                        setTimerRunning={setTimerRunning}
                        theme={theme}
                    />
                )}
            </div>
            {time > 0 ? (
                <Gameboard
                    wordList={wordList}
                    setWordList={setWordList}
                    letterStates={letterStates}
                    setLetterStates={setLetterStates}
                    currentWordIndex={currentWordIndex}
                    currentLetterIndex={currentLetterIndex}
                    setCurrentWordIndex={setCurrentWordIndex}
                    setCurrentLetterIndex={setCurrentLetterIndex}
                    startNewGame={startNewGame}
                    theme={theme}
                    startTimer={startTimer}
                    time={time}
                    correct={correct}
                    setCorrect={setCorrect}
                    incorrect={incorrect}
                    setIncorrect={setIncorrect}
                    timerRunning={timerRunning}
                    animate={animate}
                />
            ) : (
                <Results
                    // getWPM={getWPM}
                    initialTime={initialTime}
                    getTypingStats={getTypingStats}
                    // getRawSpeed={getRawSpeed}
                    theme={theme}
                    // getAccuracy={getAccuracy}
                />
            )}
            <div className="flex flex-col justify-center items-center">
                <Restart onRestart={handleRestart} theme={theme} />
            </div>
        </main>
    );
}

export default App;
