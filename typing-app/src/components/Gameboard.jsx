import { useState, useEffect } from "react";
import Cursor from './Cursor'

const Gameboard = (props) => {
  const { wordList, currentWordIndex, setCurrentWordIndex, currentLetterIndex, setCurrentLetterIndex, startNewGame } = props;
  const [letterStates, setLetterStates] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ left: 135 });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentWordIndex, currentLetterIndex, letterStates]);

  useEffect(()=>{
    updateCursorPosition();
  },[currentLetterIndex,currentWordIndex]);

  function handleKeyDown(e) {
    if (!wordList.length || currentWordIndex >= wordList.length) return;

    const currentWord = wordList[currentWordIndex].split("");
    const currentLetter = currentWord[currentLetterIndex];
    const expectedLetter = currentLetter || " ";
    const isLetter = e.key.length === 1 && e.key !== " ";
    const isSpace = e.key === " ";
    const isBackspace = e.key === "Backspace";
    const isFirstLetter = currentLetterIndex === 0;

    let newLetterStates = [...letterStates];
    if (!newLetterStates[currentWordIndex]) {
      newLetterStates[currentWordIndex] = [];
    }

    if (isLetter) {
      if (currentLetter) {
        newLetterStates[currentWordIndex][currentLetterIndex] = e.key === expectedLetter ? "correct" : "incorrect";
        setCurrentLetterIndex((prev) => prev + 1);
      } else {
        newLetterStates[currentWordIndex].push("incorrect");
      }
    }

    if (isSpace) {
      if (expectedLetter !== " ") {
        newLetterStates[currentWordIndex] = currentWord.map((_, index) => (newLetterStates[currentWordIndex][index] === "correct" ? "correct" : "incorrect"));
      }
      setCurrentWordIndex((prev) => prev + 1);
      setCurrentLetterIndex(0);
    }

    if (isBackspace) {
      if (currentLetterIndex > 0) {
        setCurrentLetterIndex((prev) => prev - 1);
        newLetterStates[currentWordIndex][currentLetterIndex - 1] = "";
      } else if (currentWordIndex > 0) {
        setCurrentWordIndex((prev) => prev - 1);
        setCurrentLetterIndex(wordList[currentWordIndex - 1].length);
      }
    }

    setLetterStates(newLetterStates);
  }

  function updateCursorPosition(){
    const wordElements = document.querySelectorAll(".word");
    const letterElements = wordElements[currentWordIndex].querySelectorAll(".letter");
      if (letterElements[currentLetterIndex]) {
        const rect = letterElements[currentLetterIndex].getBoundingClientRect();
        setCursorPosition({ left: rect.left });
      }
      else{
        const rect = wordElements[currentWordIndex].getBoundingClientRect();
        setCursorPosition({left: rect.right})
      }
  }

  return (
    <div id="game" className="p-4 text-zinc-500 rounded-lg mx-16 mb-10">
      <div className="relative max-h-[11rem] overflow-hidden text-4xl">
        <Cursor left={cursorPosition.left} isActive={true}/>
        {wordList.map((word, wordIndex) => (
          <div className={`word inline-block mr-3 my-2 ${wordIndex === currentWordIndex ? "current" : ""}`} key={wordIndex}>
            {word.split("").map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className={`letter ${
                  letterStates[wordIndex]?.[letterIndex] === "correct"
                    ? "text-white"
                    : letterStates[wordIndex]?.[letterIndex] === "incorrect"
                    ? "text-red-500"
                    : "text-zinc-500"
                } ${wordIndex === currentWordIndex && letterIndex === currentLetterIndex ? "current" : ""}`}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gameboard;
