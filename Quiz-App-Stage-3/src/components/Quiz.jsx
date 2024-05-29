import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";
import data from "../assets/data1.json";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  let navigate = useNavigate();

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
        alert("Correct answer");
      } else {
        e.target.classList.add("wrong");
        alert("Wrong answer");
        if (option_array[question.ans - 1].current) {
          option_array[question.ans - 1].current.classList.add("correct");
        }
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      option_array.forEach((option) => {
        if (option.current) {
          option.current.classList.remove("correct", "wrong");
        }
      });
      setIndex(index + 1);
      setQuestion(data[index + 1]);
      setLock(false);
    }
  };

  const prev = () => {
    if (lock && index > 0) {
      option_array.forEach((option) => {
        if (option.current) {
          option.current.classList.remove("correct", "wrong");
        }
      });
      setIndex(index - 1);
      setQuestion(data[index - 1]);
      setLock(false);
    }
  };

  const finishQuiz = () => {
    setResult(true);
  };

  const percentage = ((score / data.length) * 100).toFixed(1);
  const attemptedQuestions = index + 1;
  const correctAnswers = score;
  const wrongAnswers = attemptedQuestions - correctAnswers;

  if (result) {
    navigate("/result", {
      state: { score, percentage, attemptedQuestions, correctAnswers, wrongAnswers },
    });
    return null;
  }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      <>
        <h2>
          {index + 1}. {question.question}
        </h2>
        <ul>
          <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
            {question.option1}
          </li>
          <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
            {question.option2}
          </li>
          <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
            {question.option3}
          </li>
          <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
            {question.option4}
          </li>
        </ul>
        <div className="btn-group">
          <button onClick={next}>Next</button>
          <button onClick={prev}>Previous</button>
          <button onClick={finishQuiz}>Finish</button>
          <button onClick={() => navigate("/")}>Quit</button>
        </div>
        <div className="index">
          {index + 1} of {data.length} Questions
        </div>
      </>
    </div>
  );
};

export default Quiz;
