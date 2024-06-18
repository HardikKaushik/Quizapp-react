import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  title: string;
  questions: Question[];
}

const Results: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (id) {
      const savedQuizzes: Quiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
      const quiz = savedQuizzes[+id];
      setQuiz(quiz);
  
      const savedAnswers = JSON.parse(localStorage.getItem(`quiz-${id}-answers`) || '[]');
      setAnswers(savedAnswers);
      console.log(savedAnswers)
      let calculatedScore = 0;

      
  
      quiz.questions.forEach((question, index) => {
        // Compare user's answer index with correct answer index
        if (savedAnswers[index] === question.correctAnswer) {
          calculatedScore++;
        }
      }
    );
  
      setScore(calculatedScore); // Update the score state
    }
  }, [id]);
  
  

  return (
    <div className="p-4 ">
      {quiz && (
        <>
          <h2 className="text-2xl font-bold mb-4 ">Results for: {quiz.title}</h2>
          <p className="mb-4 font-bold">Your score: {score} / {quiz.questions.length}</p>
          <div>
            {quiz.questions.map((question, qIndex) => (
              <div key={qIndex} className="mb-4   flex items-center flex-col  justify-center">
                <h3 className="mb-4 w-1/2 p-2 border-2 bg-gray-200 sm:font-bold font-semibold">{qIndex+1}. {question.question}</h3>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className={`p-2 border w-1/2 mb-2  rounded cursor-pointer ${answers[qIndex] === oIndex ? oIndex === question.correctAnswer ? ' bg-green-200' :  'p-2  bg-red-200':""}`}>
                    {option}
                  </div>
                ))}
                <div className="mt-4 p-2 border w-1/2 mb-2  font-semibold bg-blue-200 rounded cursor-pointer">
                  Correct Answer:  {question.options[question.correctAnswer]}
                </div>
              </div>
            ))}
          </div>
          <div className='flex items-center justify-center'>
          <Link to="/" className="bg-blue-500 text-white p-2 rounded">
            Back to Quizzes
          </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Results;
