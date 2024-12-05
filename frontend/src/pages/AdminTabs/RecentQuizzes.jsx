import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns"; // Import date formatting library

const RecentQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_BASE_URL_FRONTEND = import.meta.env.VITE_API_BASE_URL_FRONTEND;


  // Fetch all quizzes when the component mounts
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/quizzes`);
        console.log(response.data); // Log quiz data
        setQuizzes(response.data); // Set the fetched quizzes in state
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  // Helper function to format date in a professional way
  const formatDate = (date) => {
    return format(new Date(date), "MM/dd/yyyy, hh:mm a");
  };

  return (
    <div className="space-y-4">
      {quizzes.length > 0 ? (
        quizzes.map((quiz, index) => {
          return (
            <div
              key={index}
              className="relative flex justify-between items-start p-4 border rounded-lg dark:border-gray-700"
            >
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-100">
                  {quiz.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Created by Professor {quiz.teacherName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Access Token:{" "}
                  <span className="font-bold">{quiz.accessToken}</span>
                </p>
                {/* Display the quiz link */}
                <a
                  href={`${API_BASE_URL_FRONTEND}/quiz/${quiz.quizLink}`}
                  className="text-sm text-blue-500 dark:text-blue-400 hover:underline"
                >
                  {`${API_BASE_URL_FRONTEND}/quiz/${quiz.quizLink}`}
                </a>

                {/* Display Start Time */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Start Time:{" "}
                  <span className="font-bold">
                    {formatDate(quiz.startTime)}
                  </span>
                </p>

                {/* Display End Time */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  End Time:{" "}
                  <span className="font-bold">{formatDate(quiz.endTime)}</span>
                </p>
              </div>

              {/* Container div for the link */}
              <div className="space-y-3 flex flex-col justify-start items-start">
                {/* Always show "View Scores" link */}
                <a
                  href={`/view-scores/${quiz.quizLink}`}
                  className="text-blue-500 dark:text-blue-400 hover:underline"
                >
                  {quiz.endTime && new Date(quiz.endTime) < new Date()
                    ? "View Scores"
                    : "Quiz Ongoing (Scores not available yet)"}
                </a>
              </div>

              {/* End Quiz Button - Positioned at the bottom right */}
              <button
                className="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={() => alert("Ending quiz: " + quiz.title)}
              >
                End Quiz
              </button>
            </div>
          );
        })
      ) : (
        <p className="text-gray-600 dark:text-gray-300">No quizzes found.</p>
      )}
    </div>
  );
};

export default RecentQuizzes;
