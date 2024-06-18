import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const AdminPanel: React.FC = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { question: '', options: ['', '', '', ''], correctAnswer: 0 },
  ]);
  const [inputValue, setInputValue] = useState<string>('');

  const [isQuizSaved, setIsQuizSaved] = useState(false);

  

 
  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const handleInputChange = (index: number, field: keyof Question, value: string | number | string[]) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  const handleSaveQuiz = () => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    quizzes.push({ title: quizTitle, questions });
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    setIsQuizSaved(true);
  };

  if (isQuizSaved) {
    return <Navigate to="/" />;
  }
  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-bold mb-4">Create a Quiz</h2>
      <input
        type="text"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="Quiz Title"
        className="mb-4  p-2 border border-gray-300"
      />
     
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleInputChange(index, 'question', e.target.value)}
            placeholder="Question"
            className="mb-2 p-2 border  border-gray-300 w-1/2"
          />
          {question.options.map((option, optIndex) => (
            <input
              key={optIndex}
              type="text"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...question.options];
                updatedOptions[optIndex] = e.target.value;
                handleInputChange(index, 'options', updatedOptions);
              }}
              placeholder={`Option ${optIndex + 1}`}
              className="mb-2 p-2 border border-gray-300 w-1/2 flex "
            />
          ))}
            <label className='  p-2' >Choose Correct Option</label>
          <select
            value={question.correctAnswer}
            onChange={(e) => handleInputChange(index, 'correctAnswer', +e.target.value)}
            className="p-2 border border-gray-300"
          >
            {question.options.map((_, optIndex) => (
              <option key={optIndex} value={optIndex}> Option {optIndex + 1}</option>
            ))}
             </select>
        </div>
      ))}
      <button onClick={handleAddQuestion} className="bg-blue-500 text-white p-2 rounded">Add Question</button>
      <button onClick={handleSaveQuiz} className="bg-green-500 text-white p-2 rounded ml-2">Save Quiz</button>
    </div>
  );
};

export default AdminPanel;
