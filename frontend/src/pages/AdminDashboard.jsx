import { Tab } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Button } from "flowbite-react";
import DarkToggler from "../components/DarkToggler"; // Custom dark mode toggler
import { useAdminContext } from "../Context/AdminContext"; // Context for admin data
import RecentQuizzes from "./AdminTabs/RecentQuizzes"; // Import RecentQuizzes component
import CreateQuizTab from "./AdminTabs/CreateQuizTab";
import HomeTab from "./AdminTabs/HomeTab"; // Import the HomeTab component

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, updateAdmin } = useAdminContext(); // Extract admin data from context
  const { fullName, email } = admin || {}; // Use default empty object in case admin is null or undefined

  const [isQuizCreating, setIsQuizCreating] = useState(false); // State to toggle CreateQuizTab visibility

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminType = localStorage.getItem("admin");
    const adminData = JSON.parse(localStorage.getItem("adminData"));

    if (!token || !adminData || adminType !== "admin") {
      navigate("/admin-login"); // Redirect to login if conditions are not met
    } else {
      updateAdmin(adminData); // If valid, update context with the admin data from localStorage
    }
  }, [navigate, updateAdmin]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Navbar */}
      <Navbar
        fluid
        className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-4 px-6 sm:px-8"
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          {/* Left Section: Project Name */}
          <Navbar.Brand href="/">
            <span className="text-3xl font-extrabold dark:text-white">
              QuizProctor
            </span>
          </Navbar.Brand>

          {/* Right Section: Profile Info and Dark Mode Toggle */}
          <div className="mt-4 sm:mt-0 flex items-center space-x-6">
            {/* Profile Info */}
            <div className="flex items-center space-x-3">
              <div className="flex flex-col text-right">
                <span className="text-sm font-semibold text-gray-800 dark:text-white">
                  {fullName || "Admin"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {email || "admin@example.com"}
                </span>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <DarkToggler />
          </div>
        </div>
      </Navbar>

      {/* Tabs */}
      <div className="container mx-auto mt-6 sm:mt-8 px-4 sm:px-6 lg:px-8">
        <Tab.Group>
          <Tab.List className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-1 bg-blue-100 rounded-xl dark:bg-gray-700">
            <Tab
              className={({ selected }) =>
                `w-full sm:w-1/3 text-center py-2 text-sm font-medium rounded-lg 
                ${
                  selected
                    ? "bg-white shadow text-blue-700 dark:bg-gray-800 dark:text-white"
                    : "text-blue-500 hover:bg-blue-200 dark:hover:bg-gray-600"
                }`
              }
            >
              Home
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full sm:w-1/3 text-center py-2 text-sm font-medium rounded-lg
                ${
                  selected
                    ? "bg-white shadow text-blue-700 dark:bg-gray-800 dark:text-white"
                    : "text-blue-500 hover:bg-blue-200 dark:hover:bg-gray-600"
                }`
              }
            >
              Recent Quizzes
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full sm:w-1/3 text-center py-2 text-sm font-medium rounded-lg
                ${
                  selected
                    ? "bg-white shadow text-blue-700 dark:bg-gray-800 dark:text-white"
                    : "text-blue-500 hover:bg-blue-200 dark:hover:bg-gray-600"
                }`
              }
            >
              Create New Quiz
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-4">
            {/* Home Tab */}
            <Tab.Panel>
              <HomeTab fullName={fullName} />{" "}
              {/* Replace with HomeTab component */}
            </Tab.Panel>

            {/* Recent Quizzes Tab */}
            <Tab.Panel className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-4">
                Recent Quizzes
              </h2>
              <RecentQuizzes quizzes={admin?.quizzes} fullName={fullName} />
            </Tab.Panel>

            {/* Create New Quiz Tab */}
            <Tab.Panel className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-4">
                Create New Quiz
              </h2>
              <div className="space-y-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Fill in the details to create a new quiz. Add questions,
                  options, and set timings for the quiz.
                </p>
                <Button
                  onClick={() => setIsQuizCreating(!isQuizCreating)}
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                >
                  Start Creating Quiz
                </Button>
              </div>
              {isQuizCreating && (
                <div className="mt-6">
                  <CreateQuizTab />
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Sign Out Button */}
      <div className="fixed bottom-4 right-4">
        <Button
          onClick={() => {
            // Remove the token and admin data from localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("admin");
            localStorage.removeItem("adminData");

            // Redirect to home page
            navigate("/"); // This will navigate to the home page
          }}
          className="w-full sm:w-auto py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
