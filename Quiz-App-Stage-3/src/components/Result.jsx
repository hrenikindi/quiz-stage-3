import React from "react";
import { useLocation, Link } from "react-router-dom";
import './Quiz.css'

const Result = () => {
  const location = useLocation();
  const { score, percentage, attemptedQuestions, correctAnswers, wrongAnswers } = location.state;

  return (
    <div className="result">
      <h2>You Scored {score} out of {attemptedQuestions} questions ({percentage}%)</h2>
      <p>Total Number of Questions: {attemptedQuestions}</p>
      <p>Total Number of Attempted Questions: {attemptedQuestions}</p>
      <p>Total Number of Correct Answers: {correctAnswers}</p>
      <p>Total Number of Wrong Answers: {wrongAnswers}</p>
      <Link to="/">
        <button className="btn">Play Again</button>
      </Link>
    </div>
  );
};

export default Result;
