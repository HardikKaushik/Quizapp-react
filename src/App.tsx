import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import QuizList from './components/QuizList';
import Quiz from './components/Quiz';
import Results from './components/Results';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 p-4 text-white">
          <nav className="container mx-auto flex justify-between">
            <Link to="/" className="text-xl font-bold">Quiz Platform</Link>
            <div>
              <Link to="/admin" className="mr-4 font-semibold">Create Quiz</Link>
              <Link to="/" className='font-semibold ' >Quizzes</Link>
            </div>
          </nav>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/results/:id" element={<Results />} />
            <Route path="/" element={<QuizList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
