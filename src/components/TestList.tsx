import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock } from 'lucide-react';
import { useTestStore } from '../store/testStore';

export const TestList: React.FC = () => {
  const { tests, setCurrentTest } = useTestStore();
  const navigate = useNavigate();

  const handleTestClick = (test: any) => {
    setCurrentTest(test);
    navigate(`/test/${test.id}`);
  };

  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <div
          key={test.id}
          onClick={() => handleTestClick(test)}
          className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-lg">{test.title}</h3>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>{test.questions.length} questions</span>
            </div>
          </div>
          <p className="mt-2 text-gray-600">{test.description}</p>
        </div>
      ))}
    </div>
  );
};