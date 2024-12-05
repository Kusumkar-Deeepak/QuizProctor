import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizComponent = () => {
  const { quizLink } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [studentInfo, setStudentInfo] = useState({ name: "", email: "" });
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [showTokenPopup, setShowTokenPopup] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!accessToken) return;

    // Fetch quiz details with token validation
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/quiz/${quizLink}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setQuiz(response.data);
        setAnswers(new Array(response.data.questions.length).fill(""));
        setShowTokenPopup(false);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
        alert("Invalid access token or quiz not found.");
        setShowTokenPopup(true);
      }
    };

    fetchQuizDetails();
  }, [quizLink, accessToken]);

  useEffect(() => {
    let countdown;
    if (quizStarted && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [quizStarted, timer]);

  const handleStartQuiz = () => {
    if (!studentInfo.name || !studentInfo.email) {
      alert("Please enter both your name and email.");
      return;
    }
    setQuizStarted(true);
    setTimer(quiz.duration * 60); // Set timer based on quiz duration (in minutes)
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleOptionChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    if (answers.includes("")) {
      alert("Please answer all questions before submitting.");
      return;
    }
    alert("Quiz submitted successfully!");
    navigate("/");
  };

  if (!quiz && !showTokenPopup) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      {showTokenPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Enter Access Token</h2>
            <input
              type="text"
              placeholder="Enter Access Token"
              className="w-full p-2 border rounded mb-4"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
            />
            <button
              onClick={() => setShowTokenPopup(false)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Validate Token
            </button>
          </div>
        </div>
      )}

      {quiz && (
        <>
          <h2 className="text-2xl font-bold text-center mb-2">{quiz.title}</h2>
          <p className="text-center">{quiz.description}</p>
          <p className="text-center mt-2">Subject: {quiz.subject}</p>
          <p className="text-center mb-4">Teacher: {quiz.teacherName}</p>

          {!quizStarted && (
            <>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 border rounded mb-4"
                value={studentInfo.name}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded mb-4"
                value={studentInfo.email}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, email: e.target.value })
                }
              />
              <button
                onClick={handleStartQuiz}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Start Exam
              </button>
            </>
          )}

          {quizStarted && (
            <div className="mt-10">
              <div className="flex justify-between mb-4">
                <p>Time Remaining: {`${Math.floor(timer / 60)}:${timer % 60}`}</p>
                <p>
                  Question {step + 1} of {quiz.questions.length}
                </p>
              </div>
              <h3 className="mb-4">{quiz.questions[step].question}</h3>
              <div className="space-y-2">
                {quiz.questions[step].options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name={`question-${step}`}
                      value={option}
                      className="mr-2"
                      checked={answers[step] === option}
                      onChange={() => handleOptionChange(step, option)}
                    />
                    {option}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handlePrev}
                  disabled={step === 0}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={step === quiz.questions.length - 1}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleSubmitQuiz}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizComponent;
