import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const HomeTab = ({ fullName }) => {
  const [recentQuiz, setRecentQuiz] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_BASE_URL_FRONTEND = import.meta.env.VITE_API_BASE_URL_FRONTEND;

  // Retrieve logged-in teacher's email from localStorage
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const teacherEmail = adminData?.email;

  useEffect(() => {
    if (!teacherEmail) return; // Prevent unnecessary API calls

    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/quizzes?email=${teacherEmail}`);
        const sortedQuizzes = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQuizzes(sortedQuizzes);
        if (sortedQuizzes.length > 0) {
          setRecentQuiz(sortedQuizzes[0]);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [teacherEmail]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-4">
        Welcome to QuizProctor
      </h2>

      {/* Display guide for Admin */}
      <div className="mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hello, {fullName || 'Admin'}! You are logged in as an admin. You can create new quizzes and view recent quizzes here.
        </p>
      </div>

      {/* If quizzes are found, display the most recent quiz */}
      {quizzes.length > 0 ? (
        <div className="mt-6">
          {/* Display most recent quiz */}
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Recently Created Quiz</h3>
          <div className="flex justify-between items-center p-4 border rounded-lg dark:border-gray-700">
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-100">{recentQuiz.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Created by Professor {recentQuiz.teacherName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Start Time: {new Date(recentQuiz.startTime).toLocaleString()}</p>
              <a
                href={`${API_BASE_URL_FRONTEND}/quiz/${recentQuiz.quizLink}`}
                className="text-sm text-blue-500 dark:text-blue-400 hover:underline"
              >
                {`${API_BASE_URL_FRONTEND}/quiz/${recentQuiz.quizLink}`}
              </a>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Access Token: <span className="font-bold">{recentQuiz.accessToken}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No quizzes found. Please create a quiz to get started.
          </p>
        </div>
      )}

      {/* Display detailed guide below the quiz information */}
      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Admin Guide</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          This section is dedicated to guiding you through the quiz creation and management process. Follow these steps to create a successful quiz:
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 mt-4">
          <li><strong>Step 1:</strong> Provide a clear and concise title and description for the quiz.</li>
          <li><strong>Step 2:</strong> Add questions, making sure they are relevant to the learning objectives.</li>
          <li><strong>Step 3:</strong> Set the duration of the quiz, and ensure that the quiz is available to the intended students.</li>
          <li><strong>Step 4:</strong> Create an access token to allow students to participate securely.</li>
          <li><strong>Step 5:</strong> Monitor the quiz results and analyze student performance to improve future quizzes.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Ensure that all information is accurate and complete before publishing the quiz. You can edit quizzes anytime after creation.
        </p>
      </div>
    </div>
  );
};

// Add PropTypes for validation
HomeTab.propTypes = {
  fullName: PropTypes.string, // fullName should be a string, and it's optional
};

export default HomeTab;
