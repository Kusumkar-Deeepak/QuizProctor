import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns"; // Import date formatting library

const RecentQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_BASE_URL_FRONTEND = import.meta.env.VITE_API_BASE_URL_FRONTEND;

  // Retrieve teacher's email from local storage
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const teacherEmail = adminData?.email;

  useEffect(() => {
    if (!teacherEmail) return; // Prevent unnecessary API calls

    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/quizzes?email=${teacherEmail}`);
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [teacherEmail]);

  const formatDate = (date) => format(new Date(date), "MM/dd/yyyy, hh:mm a");


  // Function to handle ending a quiz
const handleEndQuiz = async (quizTitle) => {
  const currentTime = new Date().toISOString();
  console.log(quizTitle, "quizTitle"); // Log quiz title for debugging
  try {
    // Send POST request to update the endTime for the quiz by only passing title
    const response = await axios.post(`${API_BASE_URL}/quizzes/end`, {
      title: quizTitle,  // Only passing the quiz title to the backend
      endTime: currentTime // Send current time as the end time
    });

    console.log("Quiz ended successfully:", response.data);

    // Update the quiz in the local state
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) =>
        quiz.title === quizTitle ? { ...quiz, endTime: currentTime } : quiz
      )
    );
  } catch (error) {
    console.error("Error ending quiz:", error);
    alert("Failed to end the quiz. Please try again.");
  }
};

  
  
  

return (
  <div className="space-y-4">
    {quizzes.length > 0 ? (
      quizzes.map((quiz, index) => {
        return (
          <div
            key={index}
            className="relative flex flex-col md:flex-row justify-between items-start p-4 border rounded-lg dark:border-gray-700 space-y-4 md:space-y-0"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-100">
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
                <span className="font-bold">
                  {quiz.endTime ? formatDate(quiz.endTime) : "Ongoing"}
                </span>
              </p>
            </div>

            {/* Container div for the link */}
            <div className="space-y-3 flex flex-col justify-start items-start md:items-end">
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

            {/* End Quiz Button */}
            <button
              className="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              onClick={() => handleEndQuiz(quiz.title)} // Pass quiz.accessToken
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
