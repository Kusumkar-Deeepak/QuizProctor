import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

const ThankYouComponent = () => {
  const location = useLocation();
  const navigate = useNavigate(); // For navigation

  // Destructuring state from location
  const { quizTitle, studentName, submittedAt } = location.state || {};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 w-full max-w-lg text-center">
        <h1 className="text-4xl font-semibold text-green-500 mb-6">
          Thank You!
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          Your quiz <span className="font-semibold">{quizTitle}</span> has been
          successfully submitted.
        </p>
        <p className="text-gray-500 mb-6">
          Submitted by: {studentName}
          <br />
          Time: {submittedAt}
        </p>
        <div className="flex justify-center">
          <Button
            onClick={() => navigate("/")} // Use navigate to route to QuizProctor
            color="light"
            className="bg-green-500 text-white hover:bg-green-400 focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 transition duration-300"
          >
            Want To View QuizProctor?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouComponent;
