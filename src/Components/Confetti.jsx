import React from "react";
import Confetti from "react-confetti";

function ConfettiComponent({ active }) {
  return active ? (
    <Confetti
      width={window.innerWidth}
      height={window.innerWidth*3/4}
    />
  ) : null;
}

export default ConfettiComponent;