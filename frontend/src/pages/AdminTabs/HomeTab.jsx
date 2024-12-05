import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const HomeTab = ({ fullName }) => {
  const [recentQuiz, setRecentQuiz] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_BASE_URL_FRONTEND = import.meta.env.VITE_API_BASE_URL_FRONTEND;

  // Fetch the most recent quiz on component mount
  useEffect(() => {
    const fetchRecentQuiz = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/quizzes`);
        const quizzes = response.data;
        const sortedQuizzes = quizzes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentQuiz(sortedQuizzes[0]); // Set the most recent quiz
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchRecentQuiz();
  }, []);

  if (!recentQuiz) return <div>Loading...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-4">
        Welcome to QuizProctor
      </h2>
      <div className="mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hello, {fullName || 'Admin'}! You are logged in as an admin. You can create new quizzes and view recent quizzes here.
        </p>
      </div>

      {/* Display the most recent quiz */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Recently Created Quiz</h3>
        <div className="flex justify-between items-center p-4 border rounded-lg dark:border-gray-700">
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-100">{recentQuiz.title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Created by Professor {recentQuiz.teacherName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Start Time: {new Date(recentQuiz.startTime).toLocaleString()}</p>
            {/* Display the quiz link */}
            <a
                  href={`${API_BASE_URL_FRONTEND}/quiz/${recentQuiz.quizLink}`}
                  className="text-sm text-blue-500 dark:text-blue-400 hover:underline"
                >
                  {`${API_BASE_URL_FRONTEND}/quiz/${recentQuiz.quizLink}`}
                </a>
            {/* Display the access token */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Access Token: <span className="font-bold">{recentQuiz.accessToken}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes for validation
HomeTab.propTypes = {
  fullName: PropTypes.string, // fullName should be a string, and it's optional
};

export default HomeTab;
