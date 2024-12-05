import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AdminContext = createContext();

// Custom hook to use AdminContext
export const useAdminContext = () => useContext(AdminContext);

// Context provider component
// eslint-disable-next-line react/prop-types
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // Admin state

  // Function to update admin data
  const updateAdmin = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem("adminData", JSON.stringify(adminData)); // Update localStorage when admin is updated
  };

  // Rehydrate admin data from localStorage on initial load
  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("adminData"));
    if (storedAdmin) {
      setAdmin(storedAdmin); // Set the admin data from localStorage
    }
  }, []);

  return (
    <AdminContext.Provider value={{ admin, updateAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
