// import React from 'react';
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const ThankYouComponent = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 w-full max-w-lg text-center">
        <h1 className="text-4xl font-semibold text-green-500 mb-6">
          Thank You!
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Your quiz has been successfully submitted.
        </p>

        <Button
          onClick={handleButton}
          color="light"
          className="bg-green-500 text-white hover:bg-green-400 focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 transition duration-300"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ThankYouComponent;
