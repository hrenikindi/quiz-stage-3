import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css'

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="home">
      <h1>Welcome to the Quiz App</h1>
      <button className="btn" onClick={startQuiz}>
        Play
      </button>
    </div>
  );
};

export default Home;
