import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Cursor from "./Cursor";

const Gameboard = (props) => {
    const {
        wordList,
        currentWordIndex,
        setCurrentWordIndex,
        currentLetterIndex,
        setCurrentLetterIndex,
        theme,
        startTimer,
        letterStates,
        setLetterStates,
        time,
        correct,
        setCorrect,
        incorrect,
        setIncorrect,
        timerRunning,
        animate,
    } = props;

    const lastExecutionTime = useRef(0);
    const wordsContainerRef = useRef(null);
    const gameRef = useRef(null);

    const [fontSize, setFontSize] = useState("text-2xl");
    const [containerPadding, setContainerPadding] = useState("mx-4");
    const [gameHeight, setGameHeight] = useState("min-h-[8rem]");
    const [wordsHeight, setWordsHeight] = useState(
        "min-h-[7.75rem] max-h-[7.75rem]"
    );



    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentWordIndex, currentLetterIndex, letterStates]);

    const isWordCorrect = (wordIndex) => {
        if (!letterStates[wordIndex]) return false;

        const word = wordList[wordIndex].split("");
        return word.every(
            (letter, index) => letterStates[wordIndex][index] === "correct"
        );
    };

    // useEffect(()=>{
    //   updateCursorPosition();
    // },[currentLetterIndex,currentWordIndex]);

    useEffect(() => {
        const now = Date.now();
        if (now - lastExecutionTime.current > 200) {
            adjustWordsPosition();
            lastExecutionTime.current = now;
        }
    }, [currentWordIndex]);

    useEffect(() => {
        setTimeout(resetPositionOnResize, 100);
    }, [fontSize]);

    useLayoutEffect(() => {
        function handleResize() {
            let oldFontSize = fontSize;
            if (window.innerWidth >= 1280) {
                // xl breakpoint
                setFontSize("text-4xl");
                setContainerPadding("mx-16");
                setGameHeight("min-h-[10.50rem]");
                setWordsHeight("min-h-[10.25rem] max-h-[10.25rem]");
            } else if (window.innerWidth >= 1024) {
                // lg breakpoint
                setFontSize("text-3xl");
                setContainerPadding("mx-12");
                setGameHeight("min-h-[9.50rem]");
                setWordsHeight("min-h-[9.25rem] max-h-[9.25rem]");
            } else if (window.innerWidth >= 768) {
                // md breakpoint
                setFontSize("text-2xl");
                setContainerPadding("mx-8");
                setGameHeight("min-h-[8.50rem]");
                setWordsHeight("min-h-[8.25rem] max-h-[8.25rem]");
            } else {
                // sm breakpoint
                setFontSize("text-xl");
                setContainerPadding("mx-4");
                setGameHeight("min-h-[7.50rem]");
                setWordsHeight("min-h-[7.25rem] max-h-[7.25rem]");
            }
            if (oldFontSize !== fontSize) {
                setTimeout(resetPositionOnResize, 100);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function resetPositionOnResize() {
        if (!wordsContainerRef.current) return;

        wordsContainerRef.current.style.marginTop = "0px";

        const currentWord = document.querySelector(".word.current");
        if (currentWord) {
            setTimeout(() => {
                const gameRect = gameRef.current.getBoundingClientRect();
                const wordRect = currentWord.getBoundingClientRect();

                if (wordRect.top < gameRect.top) {
                    const offset = gameRect.top - wordRect.top + 20;
                    wordsContainerRef.current.style.marginTop = `${offset}px`;
                }

                if (wordRect.bottom > gameRect.bottom) {
                    const offset = gameRect.bottom - wordRect.bottom - 20;
                    wordsContainerRef.current.style.marginTop = `${offset}px`;
                }
            }, 50);
        }
    }

    function handleKeyDown(e) {
        if (
            !wordList.length ||
            currentWordIndex >= wordList.length ||
            time <= 0
        )
            return;

        const functionalKeys = [
            "Shift",
            "Control",
            "Alt",
            "Tab",
            "CapsLock",
            "Escape",
            "Meta",
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "Backspace",
            "Delete",
            "NumLock",
        ];

        const isFirst = document.querySelector(".firstLetter");
        if (isFirst && !functionalKeys.includes(e.key)) {
            startTimer();
        }

        const currentWord = wordList[currentWordIndex].split("");
        const currentLetter = currentWord[currentLetterIndex];
        const expectedLetter = currentLetter || " ";
        const isLetter = e.key.length === 1 && e.key !== " ";
        const isSpace = e.key === " ";
        const isBackspace = e.key === "Backspace";

        let newLetterStates = [...letterStates];
        if (!newLetterStates[currentWordIndex]) {
            newLetterStates[currentWordIndex] = [];
        }

        if (isLetter) {
            if (currentLetter) {
                newLetterStates[currentWordIndex][currentLetterIndex] =
                    e.key === expectedLetter ? "correct" : "incorrect";
                setCurrentLetterIndex((prev) => prev + 1);
            } else {
                newLetterStates[currentWordIndex].push("incorrect");
            }
        }

        if (isSpace && currentLetterIndex > 0) {
            if (expectedLetter !== " ") {
                newLetterStates[currentWordIndex] = currentWord.map(
                    (_, index) =>
                        newLetterStates[currentWordIndex][index] === "correct"
                            ? "correct"
                            : newLetterStates[currentWordIndex][index] ===
                              "incorrect"
                            ? "incorrect"
                            : "skipped"
                );
            }
            setCurrentWordIndex((prev) => prev + 1);
            setCurrentLetterIndex(0);
        }

        if (isBackspace) {
            if (currentLetterIndex > 0) {
                setCurrentLetterIndex((prev) => prev - 1);
                newLetterStates[currentWordIndex][currentLetterIndex - 1] = "";
            } else if (currentWordIndex > 0) {
                const prevWordCorrect = isWordCorrect(currentWordIndex - 1);
                if (prevWordCorrect) return;

                const currentWordElement =
                    document.querySelectorAll(".word")[currentWordIndex];
                const previousWordElement =
                    document.querySelectorAll(".word")[currentWordIndex - 1];

                if (previousWordElement && currentWordElement) {
                    const gameBoxRect = gameRef.current.getBoundingClientRect();
                    const previousWordRect =
                        previousWordElement.getBoundingClientRect();

                    const isPreviousWordVisible =
                        previousWordRect.bottom >= gameBoxRect.top &&
                        previousWordRect.top <= gameBoxRect.bottom;

                    const currentTop =
                        currentWordElement.getBoundingClientRect().top;
                    const previousTop = previousWordRect.top;
                    const isOnSameLine = currentTop === previousTop;
                    const isPreviousLineVisible =
                        isPreviousWordVisible && !isOnSameLine;

                    if (isOnSameLine || isPreviousLineVisible) {
                        setCurrentWordIndex((prev) => prev - 1);
                        setCurrentLetterIndex(
                            wordList[currentWordIndex - 1].length
                        );
                    }
                }
            }
        }
        // console.log(newLetterStates);

        setLetterStates(newLetterStates);

        if (e.key === expectedLetter) setCorrect(correct + 1);
        else setIncorrect(incorrect + 1);
    }

    // function updateCursorPosition(){
    //   const wordElement = document.querySelector(".word.current");
    //   const letterElement = document.querySelector(".letter.current");

    //   if(letterElement){
    //     const rect = letterElement.getBoundingClientRect();
    //     //console.log(rect);
    //     setCursorPosition({top: rect.top,left: rect.left});
    //   }else if(wordElement){
    //     const rect = wordElement.getBoundingClientRect();
    //     setCursorPosition({top: rect.top,left: rect.right});
    //   }else return;
    // }

    function adjustWordsPosition() {
        if (!wordsContainerRef.current) return;

        const wordElement = document.querySelector(".word.current");
        if (!wordElement) return;

        const wordBox = wordsContainerRef.current;
        if (!wordBox) return;

        let threshold = 380;
        let scrollAmount = 57;

        // ?? not properly working in
        if (fontSize === "text-xl") {
            scrollAmount = 48;
        } else if (fontSize === "text-2xl") {
            scrollAmount = 50;
        } else if (fontSize === "text-3xl") {
            scrollAmount = 52;
        }

        if (wordElement.getBoundingClientRect().top > threshold) {
            const margin = parseInt(
                getComputedStyle(wordBox).marginTop || "0",
                10
            );
            wordBox.style.marginTop = margin - scrollAmount + "px";
        }
    }

    const getTextClasses = (status) => {
        if (status === "correct")
            return theme === "Dark" ? "text-white" : "text-stone-700";
        if (status === "incorrect")
            return theme === "Dark" ? "text-red-500" : "text-red-600";
        if (status === "skipped")
            return `${
                theme === "Dark" ? "text-zinc-500" : "text-stone-400"
            } underline decoration-red-400 decoration-[2px] underline-offset-4`;
        return theme === "Dark" ? "text-zinc-500" : "text-stone-400";
    };

    return (
        <div
            id="game"
            ref={gameRef}
            className={`p-4 text-zinc-500 rounded-lg ${containerPadding} mb-10 py-2 overflow-hidden ${gameHeight}
transition-opacity duration-100 ease-out ${
                animate ? "opacity-0" : "opacity-100"
            }
                `}
        >
            <div
                id="words"
                ref={wordsContainerRef}
                className={`relative ${wordsHeight} ${fontSize}`}
                style={{ transition: "margin-top 0.2s ease-out" }}
            >
                {wordList.map((word, wordIndex) => (
                    <div
                        className={`word inline-block mr-3 my-2 ${
                            wordIndex === currentWordIndex ? "current" : ""
                        }`}
                        key={wordIndex}
                    >
                        {word.split("").map((letter, letterIndex) => (
                            <span
                                key={letterIndex}
                                className={`letter relative ${getTextClasses(
                                    letterStates[wordIndex]?.[letterIndex] || ""
                                )} ${
                                    wordIndex === currentWordIndex &&
                                    letterIndex === currentLetterIndex
                                        ? "current"
                                        : ""
                                }
                  ${wordIndex === 0 && letterIndex === 0 ? "firstLetter" : ""}`}
                            >
                                {letter}
                                {wordIndex === currentWordIndex &&
                                    letterIndex === currentLetterIndex && (
                                        <Cursor
                                            timerRunning={timerRunning}
                                            theme={theme}
                                        />
                                    )}
                            </span>
                        ))}
                        {wordIndex === currentWordIndex &&
                            currentLetterIndex === word.length && (
                                <span className="letter relative">
                                    <Cursor
                                        timerRunning={timerRunning}
                                        theme={theme}
                                    />
                                </span>
                            )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gameboard;
