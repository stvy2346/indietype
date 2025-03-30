import { useState, useEffect } from "react";
import Cursor from './Cursor'

const Gameboard = (props) => {
  const { wordList, currentWordIndex, setCurrentWordIndex, currentLetterIndex, setCurrentLetterIndex,theme,startTimer,letterStates,setLetterStates,time,correct,setCorrect,incorrect,setIncorrect} = props;
  
  const [cursorPosition, setCursorPosition] = useState({ left: 135, top: 270 });


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentWordIndex, currentLetterIndex, letterStates]);

  useEffect(()=>{
    updateCursorPosition();
  },[currentLetterIndex,currentWordIndex]);


  const isWordCorrect = (wordIndex) => {
    if (!letterStates[wordIndex]) return false;
    
    const word = wordList[wordIndex].split("");
    return word.every((letter, index) => letterStates[wordIndex][index] === "correct");
  };

  function handleKeyDown(e) {
    if (!wordList.length || currentWordIndex >= wordList.length || time <= 0) return;

    const functionalKeys = [
      "Shift", "Control", "Alt", "Tab", "CapsLock", "Escape", "Meta","ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight","Backspace", "Delete", "NumLock"
    ];
    

    const isFirst = document.querySelector('.firstLetter');
    if(isFirst && !functionalKeys.includes(e.key)){
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
        newLetterStates[currentWordIndex][currentLetterIndex] = e.key === expectedLetter ? "correct" : "incorrect";
        setCurrentLetterIndex((prev) => prev + 1);
      } else {
        newLetterStates[currentWordIndex].push("incorrect");
      }
    }

    if (isSpace && currentLetterIndex>0) {
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
        // ?? use a variable to toggle this behaviour if require
        const prevWordCorrect = isWordCorrect(currentWordIndex-1);
        if(prevWordCorrect) return;

        const currentWordElement = document.querySelectorAll('.word')[currentWordIndex];
        const previousWordElement = document.querySelectorAll('.word')[currentWordIndex-1];


        if(previousWordElement){
          const currentTop = currentWordElement.getBoundingClientRect().top;
          const previousTop = previousWordElement.getBoundingClientRect().top;

          if(currentTop === previousTop){
            setCurrentWordIndex((prev) => prev - 1);
            setCurrentLetterIndex(wordList[currentWordIndex - 1].length);
          }
        }
      }
    }

    setLetterStates(newLetterStates);

    if(e.key === expectedLetter) setCorrect(correct+1);
    else setIncorrect(incorrect+1);

    moveGameBox();
  }

  function updateCursorPosition(){
    const wordElement = document.querySelector(".word.current");
    const letterElement = document.querySelector(".letter.current");

    if(letterElement){
      const rect = letterElement.getBoundingClientRect();
      //console.log(rect);
      setCursorPosition({top: rect.top,left: rect.left});
    }else if(wordElement){
      const rect = wordElement.getBoundingClientRect();
      setCursorPosition({top: rect.top,left: rect.right});
    }else return;
  }

  function moveGameBox() {
    const wordElement = document.querySelector(".word.current");
    if (!wordElement) return;
  
    const wordBox = document.getElementById('words');
    if (!wordBox) return;
  
    if (wordElement.getBoundingClientRect().top > 380) {
      const margin = parseInt(wordBox.style.marginTop || '0', 10);
      wordBox.style.marginTop = (margin - 57) + 'px';
    }
  }
  

  return (
    <div id="game" className="p-4 text-zinc-500 rounded-lg mx-16 mb-10 py-2 overflow-hidden min-h-[10.50rem]">
      <div id="words" className="relative min-h-[10.25rem] max-h-[10.25rem] text-4xl">
        <Cursor left={cursorPosition.left} top={cursorPosition.top} isActive={time>0} theme={theme}/>
        {wordList.map((word, wordIndex) => (
          <div className={`word inline-block mr-3 my-2 ${wordIndex === currentWordIndex ? "current" : ""}`} key={wordIndex}>
            {word.split("").map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className={`letter ${
                  letterStates[wordIndex]?.[letterIndex] === "correct"
                    ? theme === "Dark" ? "text-white" : "text-stone-700"
                    : letterStates[wordIndex]?.[letterIndex] === "incorrect"
                    ? theme === "Dark" ? "text-red-500" : "text-red-600"
                    : theme === "Dark" ? "text-zinc-500" : "text-stone-400"
                } ${wordIndex === currentWordIndex && letterIndex === currentLetterIndex ? "current" : ""}
                  ${wordIndex === 0 && letterIndex === 0 ? "firstLetter" : ""}`}
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
