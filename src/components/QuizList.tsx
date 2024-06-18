import React, { useEffect, useState } from 'react';
import { Link ,useNavigate , useParams} from 'react-router-dom';


interface Quiz {
  title: string;
  questions: { question: string; options: string[]; correctAnswer: number }[];
}

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const savedQuizzes: Quiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
    setQuizzes(savedQuizzes);

   
  }, []);
  
 
  return (
    <div className="p-4  items-center text-center">
      <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>
      <ul>
      
        {quizzes.map((quiz, index) => (
             <>
            <Link  key={index} to={ `/quiz/${index}`}>
          <div    className='border-2 mx-auto text-gray-800 font-semibold w-1/2 p-2 mb-4  cursor-pointer hover:bg-gray-300'>
              
                 Quiz Title : {quiz.title}  
              
                 </div>
            </Link>
     
            
             </>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
