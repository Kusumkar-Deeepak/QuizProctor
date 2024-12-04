import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAdminContext } from '../Context/AdminContext';  // Import the context
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  // Get updateAdmin function from context
  const { updateAdmin } = useAdminContext();

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request with email and password
      const response = await axios.post(`${API_BASE_URL}/login`, formData);

      if (response.status === 200 && response.data.success) {
        // Store JWT token and admin details in localStorage
        const { token, admin } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("adminData", JSON.stringify(admin)); // Store admin info in localStorage
        localStorage.setItem("admin", response.data.type); // Store admin info in localStorage

        // Update context with the admin data
        updateAdmin(admin);

        // Show success toast with a 3-second auto-close
        toast.success("Login successful!");

        // Navigate to admin dashboard if login is successful
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 3000);
      } else {
        // Display backend error message in case of failure
        toast.error(response.data.message || "Invalid credentials. Please try again.", {
          autoClose: 5000, // 5 seconds
        });
      }
    } catch (error) {
      console.error("Error during admin login:", error);

      // Check for specific error messages from backend and display them
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, {
          autoClose: 5000, // 5 seconds
        });
      } else {
        // Default error message for any other error
        toast.error("An error occurred while trying to log in. Please try again later.", {
          autoClose: 5000, // 5 seconds
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6 m-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-200">
          Admin Login
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-gray-200"
              required
              placeholder="e.g. mail@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-gray-200"
              required
              placeholder="********"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 border rounded-md mt-2 px-2 py-1 text-xs"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Register Now
          </button>
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
