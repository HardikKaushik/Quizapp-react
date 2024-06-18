import React, { useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;

}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  if (!isOpen) {
    return null;
  }


  
  

  const handleSubmit = () => {
    const pass = localStorage.getItem('inputValue');
    setStoredValue(pass);
    console.log(storedValue)
        if (storedValue === inputValue) {
          alert('Values match!');
          navigate(`/quiz/${id}`)
        } else {
          
          alert('Values do not match.');
        }
      
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Enter Value</h2>
        <input
          type="text"
          
          onChange={(e)=>setInputValue(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          placeholder="Enter value..."
        />
        {storedValue}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
