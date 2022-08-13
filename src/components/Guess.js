import { useState } from "react";
import "../Styles.css";
const Guess = ({ guess, isFinal, solution }) => {
  const wordLength = 5;
  const tiles = [];
  console.log(solution);
  for (let i = 0; i < wordLength; i++) {
    const letter = guess[i];
    let className = "tile";
    if (isFinal) {
      if (letter === solution[i]) {
        className += " correct";
      } else if (solution.includes(letter)) {
        className += " close";
      } else {
        className += " incorrect";
      }
    }
    tiles.push(
      <div
        style={{
          border: "1px solid black",
          width: "20px",
          height: "20px",
          padding: "5px",
          margin: "2px",
        }}
        key={i}
        className={className}
      >
        {letter}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}> {tiles} </div>
    </div>
  );
};

export default Guess;
