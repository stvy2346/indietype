import { useEffect } from "react";

const Gameboard = ({ wordList, currentWordIndex, setCurrentWordIndex, currentLetterIndex, setCurrentLetterIndex, startNewGame }) => {

  useEffect(() => {
    startNewGame();
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  function handleKeyDown(e) {
    console.log(e.key);
    if (!wordList.length || currentWordIndex >= wordList.length) return;

    const currentWord = wordList[currentWordIndex];
    console.log(currentWord);
    const expectedLetter = currentWord[currentLetterIndex] || " ";
    const isLetter = e.key.length === 1 && e.key !== " ";
    const isSpace = e.key === " ";
    const isBackspace = e.key === "Backspace";

    if(isBackspace) console.log("hoyeaaa");
  }

  return (
    <div className="p-4 text-zinc-500 rounded-lg mx-24">
      <div className="relative max-h-[8rem] overflow-hidden text-3xl">
        {wordList.map((word, wordIndex) => (
          <div className="word inline-block mx-1 my-1" key={wordIndex}>
            {word.split("").map((letter, letterIndex) => (
              <span key={letterIndex} className="letter">{letter}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gameboard;
