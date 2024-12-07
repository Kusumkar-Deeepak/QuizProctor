// import { useState } from "react";
import { Navbar, Button, Card } from "flowbite-react";
// import { SunIcon, MoonIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import DarkToggler from "../components/DarkToggler";

const HomePage = () => {
  const navigate = useNavigate();
  // State to handle mobile menu open/close
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleButton = () => {
    navigate("/learn-more");
  }

  const handleNavigate = () => {
    navigate("/register");
  };
  const handleNavigateSignup = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar
  fluid
  className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-4 px-4 sm:px-8"
>
  <div className="container mx-auto flex justify-between items-center">
    {/* Left Section: Project Name */}
    <a
      href="/"
      className="text-2xl sm:text-3xl font-extrabold dark:text-white"
    >
      QuizProctor
    </a>

    {/* Right Section */}
    <div className="flex items-center">
      {/* Dark Mode Toggler */}
      <DarkToggler />
    </div>
  </div>
</Navbar>


      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-32 min-h-[70vh] text-center bg-white dark:bg-gray-900">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          Welcome to{" "}
          <span className="text-blue-600 dark:text-blue-400">QuizProctor</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
          A secure online platform for taking quizzes with real-time proctoring
          to ensure fairness and integrity.
        </p>
        <div className="mt-8 flex space-x-4">
          {/* Get Started Button */}
          <Button
            color="primary"
            onClick={handleNavigateSignup}
            className="px-6 py-3 text-lg bg-blue-600 text-white border border-blue-600 dark:bg-blue-500 dark:border-blue-500 dark:text-white hover:bg-blue-700 hover:border-blue-700 dark:hover:bg-blue-600 dark:hover:border-blue-600"
          >
            Get Started
          </Button>
          {/* Learn More Button */}
          <Button
          onClick={handleButton}
            color="light"
            className="px-6 py-3 text-lg bg-white text-gray-900 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:border-gray-400 dark:hover:bg-gray-700 dark:hover:border-gray-600"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-12 text-4xl font-bold text-gray-900 dark:text-white">
            Features of QuizProctor
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="dark:bg-gray-900 p-6">
              <h5 className="text-2xl font-bold dark:text-white">
                Real-Time Proctoring
              </h5>
              <p className="mt-4 text-gray-700 dark:text-gray-400">
                Detect and prevent cheating during tests with advanced
                proctoring technology.
              </p>
            </Card>

            <Card className="dark:bg-gray-900 p-6">
              <h5 className="text-2xl font-bold dark:text-white">
                Admin Control Panel
              </h5>
              <p className="mt-4 text-gray-700 dark:text-gray-400">
                Create and manage quizzes with ease from a user-friendly admin
                interface.
              </p>
            </Card>

            <Card className="dark:bg-gray-900 p-6">
              <h5 className="text-2xl font-bold dark:text-white">
                Secure Test Environment
              </h5>
              <p className="mt-4 text-gray-700 dark:text-gray-400">
                Ensure test integrity with secure links and session monitoring.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
            Why Sign Up as Admin?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            By signing up as an admin, you can:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400">
            <li>Manage and create secure quizzes for students.</li>
            <li>Monitor quizzes with real-time proctoring.</li>
            <li>Ensure test integrity and fairness for all participants.</li>
          </ul>

          {/* Button to navigate to login */}
          <Button
            color="primary"
            onClick={handleNavigate}
            className="mt-6 mx-auto px-4 py-2 text-sm bg-blue-600 text-white border border-blue-600 dark:bg-blue-500 dark:border-blue-500 dark:text-white hover:bg-blue-700 hover:border-blue-700 dark:hover:bg-blue-600 dark:hover:border-blue-600"
          >
            Register as a admin
          </Button>
        </div>
      </section>
      <hr />

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Deepak Kusumkar. All rights reserved.</p>
          <p>This Project Is a Part of My Web Developement Journey!</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
