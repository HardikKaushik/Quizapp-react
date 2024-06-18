import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  title: string;
  questions: Question[];
}

const Quiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [totalTimeLeft, setTotalTimeLeft] = useState(0);

  useEffect(() => {
    if (id) {
      const savedQuizzes: Quiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
      const quiz = savedQuizzes[+id];
      setQuiz(quiz);
      const savedAnswers = JSON.parse(localStorage.getItem(`quiz-${id}-answers`) || '[]');
      console.log(savedAnswers)
      setAnswers(savedAnswers.length ? savedAnswers : new Array(quiz.questions.length).fill(null));
      setTotalTimeLeft(30 * quiz.questions.length); 
    }
  }, [id]);

  useEffect(() => {
    if (quiz) {
      if (totalTimeLeft === 0) {
        handleSubmit();
        navigate(`/results/${id}`)
      }
      const timer = setInterval(() => {
        setTotalTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [totalTimeLeft, quiz]);

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
     
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = answerIndex;
    setSelectedOptions(updatedSelectedOptions);

    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answerIndex;
    setAnswers(updatedAnswers);
    localStorage.setItem(`quiz-${id}-answers`, JSON.stringify(updatedAnswers));
   
  };

  const handleSubmit = () => {
    

      setSubmitted(true);
      
    
    
  };

  return (
    <div className="p-4 ">
      {quiz && (
        <>
          <h2 className="text-2xl text-center font-bold mb-4">{quiz.title}</h2>
          <div className="mt-2 mb-2 sm:text-lg sm:fixed  text-blue-500">
              <p>Time left: {Math.floor(totalTimeLeft / 60)}:{totalTimeLeft % 60 < 10 ? '0' : ''}{totalTimeLeft % 60} minutes</p>
            </div>
          {quiz.questions.map((question: Question, qIndex: number) => (
            <div key={qIndex} className="mb-6  flex items-center flex-col  justify-center ">
              <h3 className="mb-2 w-1/2 p-2 border-2 bg-gray-200 sm:font-bold font-semibold">{qIndex+1}. {question.question}</h3>
              {question.options.map((option: string, oIndex: number) => (
                <div key={oIndex}  onClick={() => handleAnswerChange(qIndex, oIndex) } className={`p-2 border w-1/2 mb-2  rounded cursor-pointer ${selectedOptions[qIndex] === oIndex ? 'bg-blue-300 text-black' : 'bg-white text-black'}`}>
                 
                    {option}
                </div>
              ))}
            </div>
          ))}
          {!submitted && (
            <div className='flex items-center justify-center'>
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-2  rounded">
              Submit Quiz
            </button>
            </div>
          )}
          {submitted && (
            <div className='flex items-center justify-center'> 
            <button onClick={() => navigate(`/results/${id}`)} className="bg-green-500 text-white p-2 rounded">
              View Results
            </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
