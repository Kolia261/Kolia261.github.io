import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import { CheckCircle, XCircle } from 'lucide-react';

export const TakeTest: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tests } = useTestStore();
  const test = tests.find(t => t.id === id);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  if (!test) {
    return <div>Test not found</div>;
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    test.questions.forEach((question, index) => {
      if (question.correctAnswer === selectedAnswers[index]) {
        correct++;
      }
    });
    return correct;
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / test.questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Test Results</h2>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {percentage.toFixed(0)}%
            </div>
            <p className="text-gray-600">
              You got {score} out of {test.questions.length} questions correct
            </p>
          </div>

          <div className="space-y-4">
            {test.questions.map((question, index) => (
              <div key={index} className="border-t pt-4">
                <div className="flex items-start">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-1 mr-2" />
                  )}
                  <div>
                    <p className="font-medium">{question.text}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Correct answer: {question.options[question.correctAnswer]}
                    </p>
                    {selectedAnswers[index] !== question.correctAnswer && (
                      <p className="text-sm text-red-500 mt-1">
                        Your answer: {question.options[selectedAnswers[index]]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  const question = test.questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{test.title}</h2>
            <span className="text-gray-500">
              Question {currentQuestion + 1} of {test.questions.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{
                width: `${((currentQuestion + 1) / test.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{question.text}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-3 rounded-lg border ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className={`w-full py-2 px-4 rounded-md ${
            selectedAnswers[currentQuestion] === undefined
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {currentQuestion === test.questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};