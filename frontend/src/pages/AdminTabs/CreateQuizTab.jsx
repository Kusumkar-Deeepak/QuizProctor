import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify

const CreateQuizTab = () => {
  const [blink, setBlink] = useState(true);
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    email: "",
    duration: "",
    teacherName: "",
    subject: "",
    accessToken: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 900); // Toggle visibility every 500ms

    return () => clearInterval(interval);
  }, []);

  

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);

  // Handle change in quiz details
  const handleQuizChange = (e) => {
    setQuizData({
      ...quizData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle change in question and options
  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][e.target.name] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const validateForm = () => {
    // Check if all required fields in quizData are filled
    if (
      !quizData.title ||
      !quizData.description ||
      !quizData.email ||
      !quizData.duration ||
      !quizData.teacherName ||
      !quizData.subject ||
      !quizData.startTime ||
      !quizData.endTime
    ) {
      toast.error("Please fill all the quiz details!");
      return false;
    }
  
    // Date validation: ensure startTime is today or in the future and endTime is after startTime
    const currentDate = new Date();
    const startTime = new Date(quizData.startTime);
    const endTime = new Date(quizData.endTime);
  
    if (startTime < currentDate) {
      toast.error("Start time must be today or in the future!");
      return false;
    }
  
    if (endTime <= startTime) {
      toast.error("End time must be after the start time!");
      return false;
    }
  
    // Check if all questions and their options are filled
    for (const question of questions) {
      if (!question.question || question.options.some(option => option.trim() === "") || !question.correctAnswer) {
        toast.error("Please complete all questions and options!");
        return false;
      }
    }
  
    return true;
  };
  

  // Submit quiz and questions to the backend
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // Combine quizData and questions into one object
      const quizPayload = {
        ...quizData,
        questions, // Add the questions array to the payload
      };

      const response = await axios.post(`${API_BASE_URL}/quiz`, quizPayload);

      if (response.status === 201) {
        console.log("Quiz Generated : ", response.data)
        toast.success("Quiz submitted successfully!");
      } else {
        toast.error("Failed to submit quiz!");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("An error occurred while submitting the quiz.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <ToastContainer/>
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-100 mb-6">
        Create a New Quiz
      </h2>

      {/* Quiz Details Section */}
      <div className="space-y-6">
        {/* Quiz Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Quiz Title
          </label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleQuizChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter quiz title"
          />
        </div>

        {/* Quiz Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={quizData.description}
            onChange={handleQuizChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter quiz description"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Duration (minutes)
          </label>
          <input
            type="number"
            name="duration"
            value={quizData.duration}
            onChange={handleQuizChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter quiz duration"
          />
        </div>

        {/* Email */}
        <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={quizData.email}
        onChange={handleQuizChange}
        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
        placeholder="Enter Teacher Email"
      />
      <p
        className={`mt-1 text-xs text-red-500 ${
          blink ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      >
        Use the email you registered with [Also displyed at the top]
      </p>
    </div>

        {/* Teacher Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Teacher Name
          </label>
          <input
            type="text"
            name="teacherName"
            value={quizData.teacherName}
            onChange={handleQuizChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter teacher's name"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={quizData.subject}
            onChange={handleQuizChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter subject"
          />
        </div>

        {/* Access Token */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Access Token
          </label>
          <input
            type="text"
            name="accessToken"
            value={quizData.accessToken}
            onChange={handleQuizChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter Access Token"
          />
        </div>

        {/* Quiz Timings */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Time
            </label>
            <input
              type="datetime-local"
              name="startTime"
              value={quizData.startTime}
              onChange={handleQuizChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              End Time
            </label>
            <input
              type="datetime-local"
              name="endTime"
              value={quizData.endTime}
              onChange={handleQuizChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="mt-8 space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Question {index + 1}
            </label>
            <input
              type="text"
              name="question"
              value={question.question}
              onChange={(e) => handleQuestionChange(index, e)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter question"
            />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                  placeholder={`Option ${optionIndex + 1}`}
                />
              </div>
            ))}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Correct Answer
              </label>
              <select
                name="correctAnswer"
                value={question.correctAnswer}
                onChange={(e) => handleQuestionChange(index, e)}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
              >
                {question.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Remove Question Button */}
            <Button
              onClick={() => removeQuestion(index)}
              size="sm"
              className={`mt-2 text-white ${
                localStorage.theme === "dark"
                  ? "px-4 py-2 text-lg bg-red-600 border border-red-600 dark:bg-red-500 dark:border-red-500 dark:text-white hover:bg-red-700 hover:border-red-700 dark:hover:bg-red-600 dark:hover:border-red-600"
                  : "px-4 py-2 text-lg bg-red-600 border border-red-600 text-white hover:bg-red-700 hover:border-red-700"
              }`}
            >
              Remove Question
            </Button>
          </div>
        ))}

        {/* Add Question Button */}
        <Button
          onClick={addQuestion}
          size="sm"
          className={`w-full mt-4 text-white ${
            localStorage.theme === "dark"
              ? "px-6 py-3 text-lg bg-blue-600 border border-blue-600 dark:bg-blue-500 dark:border-blue-500 dark:text-white hover:bg-blue-700 hover:border-blue-700 dark:hover:bg-blue-600 dark:hover:border-blue-600"
              : "px-6 py-3 text-lg bg-blue-600 border border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700"
          }`}
        >
          Add Question
        </Button>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleSubmit}
          className={`w-full mt-4 text-white ${
            localStorage.theme === "dark"
              ? "px-4 py-2 text-lg bg-green-500 border border-green-500 dark:bg-green-400 dark:border-green-400 dark:text-white hover:bg-green-600 hover:border-green-600 dark:hover:bg-green-500 dark:hover:border-green-500"
              : "px-4 py-2 text-lg bg-green-600 border border-green-600 text-white hover:bg-green-700 hover:border-green-700"
          }`}
        >
          Submit Quiz
        </Button>
      </div>
    </div>
  );
};

export default CreateQuizTab;
