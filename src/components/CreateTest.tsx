import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useTestStore } from '../store/testStore';
import { useNavigate } from 'react-router-dom';

export const CreateTest: React.FC = () => {
  const navigate = useNavigate();
  const { addTest } = useTestStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{
    id: '1',
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  }]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTest = {
      id: Date.now().toString(),
      title,
      description,
      questions,
      createdAt: new Date()
    };
    addTest(newTest);
    navigate('/');
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      id: Date.now().toString(),
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }]);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Test Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="space-y-4">
        {questions.map((question, qIndex) => (
          <div key={question.id} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Question {qIndex + 1}</h3>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => setQuestions(questions.filter((_, i) => i !== qIndex))}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <input
              type="text"
              value={question.text}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[qIndex].text = e.target.value;
                setQuestions(newQuestions);
              }}
              placeholder="Enter question"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4"
              required
            />

            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  name={`correct-${question.id}`}
                  checked={question.correctAnswer === oIndex}
                  onChange={() => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].correctAnswer = oIndex;
                    setQuestions(newQuestions);
                  }}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].options[oIndex] = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  placeholder={`Option ${oIndex + 1}`}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={addQuestion}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Question
        </button>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Create Test
        </button>
      </div>
    </form>
  );
};