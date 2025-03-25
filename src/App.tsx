import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PlusCircle, ListChecks } from 'lucide-react';
import { TestList } from './components/TestList';
import { CreateTest } from './components/CreateTest';
import { TakeTest } from './components/TakeTest';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                  <ListChecks className="w-6 h-6 mr-2" />
                  <span className="font-medium">Test Platform</span>
                </Link>
              </div>
              <div className="flex items-center">
                <Link
                  to="/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Create Test
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<TestList />} />
            <Route path="/create" element={<CreateTest />} />
            <Route path="/test/:id" element={<TakeTest />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;