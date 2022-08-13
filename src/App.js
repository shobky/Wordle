import { useEffect, useState } from "react";
import Guess from "./components/Guess";
import { wordAPI } from "./utils/wordAPI";
const App = () => {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(0));
  const [crrGuesses, setCrrGuesses] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleType = (event) => {
      if (isGameOver) {
        return;
      }
      if (event.key === "Enter") {
        if (crrGuesses.length !== 5) {
          return;
        }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == 0)] = crrGuesses;
        setGuesses(newGuesses);
        setCrrGuesses("");

        const isCorrect = solution === crrGuesses;
        if (isCorrect) {
          setIsGameOver(true);
        }
      }
      if (crrGuesses.length >= 5) {
       
          return;
      }

      if (event.key === "Backspace") {
        setCrrGuesses(crrGuesses.slice(0, -1));
        return;
      }
      setCrrGuesses((oldGuess) => oldGuess + event.key);
    };
    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [crrGuesses, isGameOver, solution]);
  useEffect(() => {
    const fetchWord = async () => {
      const randomWord = wordAPI[Math.floor(Math.random() * wordAPI.length)];
      setSolution(randomWord);
    };
    fetchWord();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {guesses.map((guess, i) => {
        const isCrrGuess = i === guesses.findIndex((val) => val == 0);
        return (
          <Guess
            guess={isCrrGuess ? crrGuesses : guess}
            isFinal={!isCrrGuess && guess != null}
            solution={solution}
          />
        );
      })}
      {guesses[5] ? solution : "HI"}
    </div>
  );
};
export default App;
