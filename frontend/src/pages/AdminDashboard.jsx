import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token and admin details from localStorage
    const token = localStorage.getItem("token");
    const adminType = localStorage.getItem("admin");  // Get admin type directly
    const adminData = JSON.parse(localStorage.getItem("adminData")); // Get admin details

    // Check if the token exists and if the admin type is "admin"
    if (!token || !adminData || adminType !== "admin") {
      // Redirect to the home page if the user is not an admin
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Add additional admin dashboard content here */}
    </div>
  );
};

export default AdminDashboard;
